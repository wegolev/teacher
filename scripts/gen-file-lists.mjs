#!/usr/bin/env node
// Генерирует .md-страницы со ссылками на файлы из docs/public/files/.
// Каждая папка → docs/<...>/<name>.md с заголовком и списком ссылок.
//
// Запуск: node scripts/gen-file-lists.mjs

import { readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, relative, extname, basename } from 'node:path'

const ROOT = process.cwd()
const PUBLIC = join(ROOT, 'docs/public/files')
const DOCS = join(ROOT, 'docs')

// карта: папка в public/files -> целевой .md
// ['about', 'about/index.md'] НЕ включаем — там ручной текст.
const MAP = [
  ['historical/tests',        'historical/tests.md'],
  ['historical/lessons',      'historical/lessons.md'],
  ['historical/contest',      'historical/contest.md'],
  ['colleagues/method',       'colleagues/method.md'],
  ['colleagues/mo',           'colleagues/mo.md'],
  ['colleagues/museum',       'colleagues/museum.md'],
  ['colleagues/publications', 'colleagues/publications.md'],
  ['colleagues/links',        'colleagues/links.md'],
  ['parents/memos',           'parents/memos.md'],
  ['parents/meetings',        'parents/meetings.md'],
  ['parents/normative',       'parents/normative.md'],
  ['students/homework',       'students/homework.md'],
  ['students/oge-ege',        'students/oge-ege.md'],
  ['students/olympiads',      'students/olympiads.md'],
  ['students/projects',       'students/projects.md'],
  ['students/links',          'students/links.md'],
  ['gallery/projects',        'gallery/projects.md'],
]

const TITLES = {
  'historical/tests':        'Банк тестовых заданий по истории Ставрополья',
  'historical/lessons':      'Конспекты уроков и технологические карты',
  'historical/contest':      'Конкурс «Учитель истории Ставрополья — 2026»',
  'colleagues/method':       'Методические разработки для обмена опытом',
  'colleagues/mo':           'Материалы методических объединений',
  'colleagues/museum':       'Музей «История села Орловки»',
  'colleagues/publications': 'Публикации и статьи',
  'colleagues/links':        'Ссылки на профессиональные сообщества',
  'parents/memos':           'Памятки и рекомендации для родителей',
  'parents/meetings':        'Родительские собрания',
  'parents/normative':       'Нормативные документы',
  'students/homework':       'Домашние задания',
  'students/oge-ege':        'Подготовка к ОГЭ и ЕГЭ',
  'students/olympiads':      'Олимпиады и конкурсы',
  'students/projects':       'Проектная деятельность',
  'students/links':          'Полезные ссылки для подготовки',
  'gallery/projects':        'Проектные работы учащихся',
}

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir).sort((a, b) => a.localeCompare(b, 'ru'))) {
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

function escapeMd(s) {
  return s.replace(/([\\`*_{}[\]()#+\-.!])/g, '\\$1')
}

function humanSize(bytes) {
  if (bytes < 1024) return `${bytes} Б`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`
}

function fileUrl(absPath) {
  // /teacher/files/... — base '/teacher/'.
  // Внутри Markdown ссылка должна начинаться с '/teacher/files/...' или просто '/files/...'
  // VitePress корректно подставит base, если писать /files/...
  const rel = relative(PUBLIC, absPath).split('\\').join('/')
  return '/files/' + rel.split('/').map(encodeURIComponent).join('/')
}

function fileLabel(absPath) {
  const name = basename(absPath)
  const ext = extname(name).toLowerCase()
  return { name, ext: ext.replace('.', '').toUpperCase() }
}

let total = 0
for (const [folder, target] of MAP) {
  const src = join(PUBLIC, folder)
  let entries = []
  try {
    const st = statSync(src)
    if (st.isDirectory()) entries = walk(src)
  } catch {
    console.warn(`⚠  нет папки ${folder}, создаю пустую страницу`)
  }

  const title = TITLES[folder] || folder
  const lines = []
  lines.push(`# ${title}`)
  lines.push('')
  if (!entries.length) {
    lines.push('_Материалы готовятся к публикации._')
  } else {
    const byExt = {}
    for (const f of entries) {
      const { ext } = fileLabel(f)
      ;(byExt[ext] ||= []).push(f)
    }
    for (const ext of Object.keys(byExt).sort()) {
      lines.push(`## ${ext}`)
      lines.push('')
      for (const f of byExt[ext]) {
        const { name } = fileLabel(f)
        const url = fileUrl(f)
        const size = humanSize(statSync(f).size)
        lines.push(`- [${escapeMd(name)}](${url}) _(${size})_`)
      }
      lines.push('')
    }
  }

  const outPath = join(DOCS, target)
  mkdirSync(join(DOCS, target.split('/').slice(0, -1).join('/')), { recursive: true })
  writeFileSync(outPath, lines.join('\n') + '\n', 'utf8')
  console.log(`✔ ${target} (${entries.length} файлов)`)
  total += entries.length
}

console.log(`\nГотово. Всего файлов: ${total}`)