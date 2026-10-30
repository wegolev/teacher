#!/usr/bin/env node
import { cp, mkdir, readdir, stat } from 'node:fs/promises'
import { join, relative, dirname } from 'node:path'

const SRC = '/media/storage/yadisk/atmp/site'
const DST = join(process.cwd(), 'docs')

// Карта маппинга: Ключ — путь в хранилище, Значение — путь в проекте.
const MAP = {
  '01_Главная': '01_home',
  '02_Обо мне': '02_about',
  '03_Историческое краеведение': '03_historical',
  '04_Ученикам': '04_students',
  '05_Родителям': '05_parents',
  '06_Коллегам': '06_colleagues',
  '07_Новости': '07_news',
  '08_Галерея': '08_gallery',
  
  // Подпапки 03
  '03_Историческое краеведение/0301_Обзор': '03_historical/0301_overview',
  '03_Историческое краеведение/0302_Банк тестовых заданий': '03_historical/0302_tests',
  '03_Историческое краеведение/0303_Конспекты уроков': '03_historical/0303_lessons',
  '03_Историческое краеведение/0304_Рабочие программы': '03_historical/0304_programs',
  '03_Историческое краеведение/0305_Творческие работы учащихся': '03_historical/0305_creative',
  '03_Историческое краеведение/0306_Публикации': '03_historical/0306_publications',
  '03_Историческое краеведение/0307_Методические разработки': '03_historical/0307_method',
  
  // ВАЖНО: Точный путь с пробелом в начале (как в tree-site.txt)
  '03_Историческое краеведение/0307_Методические разработки/ Конкурс "Учитель истории Ставрополья - 2026"': '03_historical/0307_method/konkurs_2026',

  // Подпапки 04
  '04_Ученикам/0401_Обзор': '04_students/0401_overview',
  '04_Ученикам/0402_Домашнее задание': '04_students/0402_homework',
  '04_Ученикам/0403_Олимпиады и конкурсы': '04_students/0403_olympiads',
  '04_Ученикам/0404_Подготовка к ОГЭ, ЕГЭ': '04_students/0404_exams',
  '04_Ученикам/0405_Проектная деятельность': '04_students/0405_projects',
  '04_Ученикам/0406_Полезные ссылки': '04_students/0406_links',

  // Подпапки 05
  '05_Родителям/0501_Памятки': '05_parents/0501_memos',
  '05_Родителям/0502_Родительские собрания': '05_parents/0502_meetings',
  '05_Родителям/0503_Нормативные документы': '05_parents/0503_normative',

  // Подпапки 06
  '06_Коллегам/0601_Методические разработки': '06_colleagues/0601_method',
  '06_Коллегам/0602_Материалы МО': '06_colleagues/0602_mo',
  '06_Коллегам/0603_Музей': '06_colleagues/0603_museum',
  '06_Коллегам/0604_Публикации': '06_colleagues/0604_publications',
  '06_Коллегам/0605_Ссылки': '06_colleagues/0605_links',

  // Подпапки 07
  '07_Новости/Этот день в истории': '07_news/this_day_in_history',

  // Подпапки 08
  '08_Галерея': '08_gallery',
  '08_Галерея/0801_Фотогалерея': '08_gallery/photogallery',
  '08_Галерея/0802_Проектные работы учащихся': '08_gallery/projects',
}

// Транслитерация (fallback для папок, которых нет в MAP)
const TRANSLIT = {
  а:'a', б:'b', в:'v', г:'g', д:'d', е:'e', ё:'e', ж:'zh', з:'z', и:'i',
  й:'y', к:'k', л:'l', м:'m', н:'n', о:'o', п:'p', р:'r', с:'s', т:'t',
  у:'u', ф:'f', х:'h', ц:'c', ч:'ch', ш:'sh', щ:'sch', ъ:'', ы:'y', ь:'',
  э:'e', ю:'yu', я:'ya',
}

function translit(str) {
  return str
    .toLowerCase()
    .split('')
    .map((ch) => TRANSLIT[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9_\-]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function getDstPath(srcRel) {
  if (MAP[srcRel]) return MAP[srcRel];
  
  const parent = dirname(srcRel);
  if (MAP[parent]) {
    const folderName = srcRel.split('/').pop();
    return `${MAP[parent]}/${translit(folderName)}`;
  }
  
  return translit(srcRel);
}

async function syncDir(srcRel) {
  const srcPath = join(SRC, srcRel)
  const dstRel = getDstPath(srcRel)
  const dstPath = join(DST, dstRel)

  try {
    const stats = await stat(srcPath)
    if (!stats.isDirectory()) return

    await mkdir(dstPath, { recursive: true })
    const entries = await readdir(srcPath)

    for (const entry of entries) {
      const srcEntryRel = join(srcRel, entry)
      const srcEntryFull = join(srcPath, entry)
      const statEntry = await stat(srcEntryFull)

      if (statEntry.isDirectory()) {
        await syncDir(srcEntryRel)
      } else {
        if (entry.endsWith('.docx') || entry.endsWith('.pdf') || entry.endsWith('.doc') || entry === 'tree-site.txt') {
          continue
        }

        if (srcEntryRel.includes('08_Галерея') && (entry.endsWith('.jpg') || entry.endsWith('.jpeg') || entry.endsWith('.png'))) {
           const galleryDst = join(DST, 'public/images/album', entry)
           await mkdir(dirname(galleryDst), { recursive: true })
           await cp(srcEntryFull, galleryDst)
           console.log(`🖼  Галерея: ${entry} -> public/images/album/`)
        } else {
            let finalEntry = entry
            if (entry === 'content.md') finalEntry = 'index.md'

            const dstEntryFull = join(dstPath, finalEntry)
            await cp(srcEntryFull, dstEntryFull)
            console.log(`✔ ${srcEntryRel} -> ${dstRel}/${finalEntry}`)
        }
      }
    }
  } catch (e) {
    console.error(`❌ Ошибка при обработке ${srcRel}:`, e.message)
  }
}

async function main() {
  console.log('🚀 Синхронизация контента из Яндекс.Диска...')

  // Удаляем старые/битые папки
  for (const stale of ['08_gallery/проектные_работы_учащихся']) {
    await rm(join(DST, stale), { recursive: true, force: true })
  }

  // Обрабатываем только корневые папки (01_, 02_, …) — вложенные обойдутся рекурсивно
  const roots = Object.keys(MAP).filter((k) => !k.includes('/'))
  for (const key of roots) {
    await syncDir(key)
  }

  console.log('✅ Синхронизация завершена.')
}

main()