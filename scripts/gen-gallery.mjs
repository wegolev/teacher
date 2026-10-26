#!/usr/bin/env node
// Генерирует docs/gallery/index.md со списком альбома.
// Запуск: node scripts/gen-gallery.mjs

import { readdirSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ALBUM = join(process.cwd(), 'docs/public/images/album')
const OUT   = join(process.cwd(), 'docs/gallery/index.md')

function humanLabel(name) {
  const base = name.replace(/\.[^.]+$/, '')
  // «9.05.2026 гАкция Бессмертный полк,.jpg» → «9.05.2026 г. — Акция Бессмертный полк»
  return base
    .replace(/\s*г(?=\S)/g, ' г. ')
    .replace(/_/g, ' ')
    .replace(/,\s*$/, '')
    .trim()
}

const files = readdirSync(ALBUM)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, 'ru'))

const items = files.map((f) => {
  const safeName = encodeURIComponent(f)
  return `  { src: '/images/album/${safeName}', alt: '${humanLabel(f).replace(/'/g, "\\'")}' }`
})

const md = `# Фотогалерея

Фотографии с уроков, внеклассных мероприятий, экскурсий и защиты проектов.
Нажмите на миниатюру, чтобы открыть фотографию на весь экран.

<Gallery :images="[
${items.join(',\n')}
]" />

## Проектные работы учащихся

Список файлов (DOCX, PDF) с проектами учащихся — на отдельной странице:

[Проектные работы учащихся](./projects)
`

writeFileSync(OUT, md, 'utf8')
console.log(`✔ ${OUT} — ${files.length} изображений`)