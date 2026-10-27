#!/usr/bin/env node
import { cp, mkdir, readdir, stat } from 'node:fs/promises'
import { join, relative, dirname } from 'node:path'

const SRC = '/media/storage/yadisk/atmp/site'
const DST = join(process.cwd(), 'docs')

// Карта маппинга: Ключ — путь в хранилище, Значение — путь в проекте.
// Используем префиксы для сортировки, но на латинице.
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
  '08_Галерея/Проектные работы': '08_gallery/projects',
}

// Функция рекурсивного копирования
async function syncDir(srcRel) {
  const srcPath = join(SRC, srcRel)
  const dstRel = MAP[srcRel] || srcRel.replace(/\s+/g, '_').toLowerCase() // fallback
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
        // Если это вложенная папка, проверяем маппинг, иначе просто копируем
        await syncDir(srcEntryRel)
      } else {
        // Пропускаем служебные файлы и файлы для скачивания (оставляем только md и картинки)
        if (entry.endsWith('.docx') || entry.endsWith('.pdf') || entry.endsWith('.doc') || entry === 'tree-site.txt') {
          continue
        }

        // Если это картинка для галереи, копируем её в public/images/album
        if (srcEntryRel.includes('08_Галерея') && (entry.endsWith('.jpg') || entry.endsWith('.jpeg') || entry.endsWith('.png'))) {
           const galleryDst = join(DST, 'public/images/album', entry)
           await mkdir(dirname(galleryDst), { recursive: true })
           await cp(srcEntryFull, galleryDst)
           console.log(`🖼  Галерея: ${entry} -> public/images/album/`)
        } else {
           // Обычные файлы (md, картинки для контента) копируем в папку страницы
           // Если это content.md, переименовываем в index.md для VitePress
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

// Запуск для корневых папок
async function main() {
  console.log('🚀 Синхронизация контента из Яндекс.Диска...')
  
  // Очищаем папку docs от старого контента (кроме .vitepress и public)
  // Это делается, чтобы удаленные файлы исчезали и из проекта
  const entries = await readdir(DST)
  for (const entry of entries) {
    if (entry !== '.vitepress' && entry !== 'public' && entry !== 'index.md') {
      await cp(join(DST, entry), join('/tmp', entry), { recursive: true, force: true }).catch(()=>{})
    }
  }

  for (const key of Object.keys(MAP)) {
    // Проверяем только корневые элементы (у которых нет слеша в ключе, кроме подпапок, их обработает рекурсия)
    if (!key.includes('/')) {
       await syncDir(key)
    }
  }
  
  console.log('✅ Синхронизация завершена.')
}

main()