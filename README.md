# Личный сайт учителя истории и обществознания

Статический сайт-визитка **Катович Елены Владимировны** — учителя истории и обществознания.

- **Публичный URL:** https://wegolev.github.io/teacher/
- **Стек:** VitePress 1.6 · Vue 3 · Tailwind CSS 4 · PhotoSwipe 5
- **Хостинг:** GitHub Pages (через GitHub Actions)
- **Хранилище контента:** Яндекс.Диск (`/media/storage/yadisk/atmp/site/`)

---

## Архитектура: контент отдельно от кода

Главная особенность проекта — **разделение контента и кода**.

| Кто | Что делает | Где работает |
|---|---|---|
| **Учитель** | Пишет текст, кладёт картинки, вставляет ссылки на файлы | Яндекс.Диск (`content.md`, `*.jpg`) |
| **Разработчик** | Запускает синхронизацию, собирает и публикует сайт | Git-репозиторий `~/aproj/teacher/` |
| **CI** | Собирает сайт из закоммиченных `docs/` | GitHub Actions |

```
┌──────────────────────────┐       ┌──────────────────────────┐
│  Хранилище (Яндекс.Диск) │       │   Git-репозиторий        │
│  /media/storage/.../site │ sync  │   ~/aproj/teacher/       │
│                          │ ────► │                          │
│  01_Главная/content.md   │       │  docs/01_home/index.md   │
│  01_Главная/teacher.jpg  │       │  docs/01_home/teacher.jpg│
└──────────────────────────┘       └──────────────────────────┘
                                             │ git push
                                             ▼
                                    ┌──────────────────┐
                                    │  GitHub Actions  │
                                    │  docs:build      │
                                    └────────┬─────────┘
                                             ▼
                                    ┌──────────────────┐
                                    │  GitHub Pages    │
                                    └──────────────────┘
```

> **Правило:** `build:sync` запускается **только локально**. В CI — только `docs:build` (на сервере нет Яндекс.Диска).

---

## Быстрый старт

```bash
# 1. Клонировать
git clone https://github.com/wegolev/teacher.git
cd teacher

# 2. Установить зависимости
npm install

# 3. Синхронизировать контент из хранилища и запустить dev-сервер
npm run build:sync
npm run docs:dev
```

Сайт: http://localhost:5173/teacher/

---

## Команды

| Команда | Что делает |
|---|---|
| `npm install` | Установка зависимостей |
| `npm run build:sync` | Копирует контент из Яндекс.Диска в `docs/` (маппинг, `content.md` → `index.md`, галерея → `public/images/album/`) |
| `npm run docs:dev` | Dev-сервер VitePress (`http://localhost:5173/teacher/`) |
| `npm run docs:build` | Сборка статики в `docs/.vitepress/dist/` (без синхронизации, для CI) |
| `npm run docs:preview` | Локальный просмотр собранного сайта |

---

## Структура репозитория

```
~/aproj/teacher/
├── docs/                          ← проект сайта (генерируется build:sync)
│   ├── 01_home/                   ← Главная (rewrites → '/')
│   ├── 02_about/
│   ├── 03_historical/             ← 0301_overview … 0307_method/konkurs_2026
│   ├── 04_students/               ← 0401_overview … 0406_links
│   ├── 05_parents/                ← 0501_memos, 0502_meetings, 0503_normative
│   ├── 06_colleagues/             ← 0601_method … 0605_links
│   ├── 07_news/                   ← this_day_in_history/
│   ├── 08_gallery/                ← photogallery/, projects/
│   ├── public/
│   │   └── images/
│   │       ├── album/             ← фото галереи (копируются скриптом)
│   │       ├── teacher.jpg
│   │       └── school.jpg
│   ├── .vitepress/
│   │   ├── config.mts             ← nav, sidebar, rewrites, base
│   │   └── theme/
│   │       ├── index.ts           ← регистрация Gallery, AccessibilityToggle
│   │       ├── Layout.vue         ← вставка кнопки «Слабовидящим»
│   │       ├── custom.css         ← large-text-theme, .about-hero, .pswp__custom-caption
│   │       └── components/
│   │           ├── Gallery.vue
│   │           └── AccessibilityToggle.vue
│   └── _docs/                     ← документация разработчика (VitePress игнорирует _*)
├── scripts/
│   └── build-from-yadisk.mjs      ← скрипт синхронизации
├── .github/workflows/deploy.yml   ← CI/CD
├── package.json
└── README.md
```

---

## Синхронизация (`scripts/build-from-yadisk.mjs`)

Что делает `build:sync`:

1. Очищает `docs/` (кроме `.vitepress/`, `public/`, `index.md`).
2. Читает `/media/storage/yadisk/atmp/site/` рекурсивно.
3. Маппит кириллические папки → латиницу по таблице `MAP` (в коде скрипта).
4. `content.md` → `index.md`.
5. Копирует локальные картинки рядом с `index.md`.
6. Игнорирует `.docx`, `.pdf`, `.doc` (они живут на Яндекс.Диске).
7. Для `08_Галерея/0801_Фотогалерея/` копирует `*.jpg` в `docs/public/images/album/`.

**Добавить новую папку:** обновить `MAP` в скрипте и, если нужно, `config.mts` (nav/sidebar).

---

## Конвенции

| Объект | В хранилище | В проекте |
|---|---|---|
| Папки | `NN_Название/` | `NN_latin_name/` (тот же префикс) |
| Текст страницы | `content.md` | `index.md` |
| Картинки страницы | рядом с `content.md` | рядом с `index.md` |
| Фото галереи | `08_Галерея/0801_Фотогалерея/*.jpg` | `docs/public/images/album/*.jpg` |
| Файлы для скачивания | Яндекс.Диск | — (только ссылка в `.md`) |
| Шаблоны / черновики | `_template.md`, `_*` | VitePress не публикует |

---

## base и пути

Сайт живёт по адресу `https://wegolev.github.io/teacher/`, поэтому `base: '/teacher/'`.

- **Vue-компоненты:** пути к ассетам оборачивать в `withBase()` из **`vitepress`**:
  ```ts
  import { withBase } from 'vitepress'   // ❗ НЕ из 'vue'
  ```
- **Markdown:** абсолютные пути от корня сайта (`/images/...`) — VitePress сам добавит `base`.

> ⚠️ **Классическая ошибка:** `import { withBase } from 'vue'` → `SyntaxError` при импорте `Gallery.vue` → глобальная регистрация в `theme/index.ts` валит **всю тему** → все страницы белые.

---

## Ключевые компоненты

### `<Gallery>` (`theme/components/Gallery.vue`)

- Сетка миниатюр из массива `images`.
- Клик → полноэкранный **PhotoSwipe 5**.
- **Русская подпись** показывается:
  - на миниатюре при наведении (`.vp-gallery__caption`);
  - в полноэкранном режиме внизу (`.pswp__custom-caption`, из `alt`).
- API PhotoSwipe 5: `pswp.ui.registerElement(...)` возвращает DOM-элемент, обновление подписи — через `pswp.on('change')` + `pswp.on('afterInit')`, **не** через `onInit`.

Пример в `content.md`:

```md
<Gallery :images="[
  { src: '/images/album/georgievskaya_lenta.jpg', alt: 'Акция Георгиевская лента' },
  { src: '/images/album/vozvozhenie_cvetov.jpg', alt: 'Возложение цветов к Памятнику' }
]" />
```

### `<AccessibilityToggle>` (`theme/components/AccessibilityToggle.vue`)

- Кнопка «Слабовидящим» в шапке (вставка через `Layout.vue` в `#nav-bar-content-after`).
- Переключает класс `large-text-theme` на `<html>`, состояние — в `localStorage` (ключ `a11y-large-text`).
- Стили режима — в `custom.css`.

---

## CI/CD

`.github/workflows/deploy.yml`:

1. `npm ci`
2. `npm run docs:build` (**без** `build:sync`)
3. Публикация `docs/.vitepress/dist/` на GitHub Pages.

Триггер: push в `main`.

---

## Типичные проблемы

| Симптом | Причина | Решение |
|---|---|---|
| **Все страницы белые** | Ошибка импорта в глобально зарегистрированном компоненте (`Gallery`, `AccessibilityToggle`) | Проверить `withBase` (`vitepress`, не `vue`), синтаксис PhotoSwipe 5 |
| Фото в галерее не грузятся | Нет `withBase()` в путях | Обернуть `src` в `withBase()` в `Gallery.vue` |
| Ссылки на DOCX/PDF «битые» | Относительные пути, файлов нет в проекте | Планируется `links.json` → публичные URL Яндекс.Диска |
| Новая папка не появилась | Не обновлён `MAP` | Добавить в `scripts/build-from-yadisk.mjs` |
| Правки в `docs/` пропали | `docs/` перезаписывается `build:sync` | Править `content.md` **в хранилище** |
| GitHub Actions падает на билде | Битые ссылки/картинки | `ignoreDeadLinks` в `config.mts`; удалить битую картинку из `.md` |

> **При «не работает» — сначала пришлите текст ошибки** из терминала или консоли браузера, а не только симптом.

---

## Что дальше (roadmap)

1. **`links.json` для Яндекс.Диска** — подмена относительных ссылок (`./test01.pdf`) на публичные URL на этапе сборки.
2. **Автогенерация индекса `07_news/this_day_in_history/`** — сканирование `YYYY-MM-DD.md`.
3. **Автосборка галереи** — data loader читает `docs/public/images/album/`, массив в `content.md` не нужен.
4. **Аудит `MAP`** по мере добавления папок учителем.

---

## Полезные ссылки

- [VitePress](https://vitepress.dev/)
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PhotoSwipe 5](https://photoswipe.com/)
- [GitHub Pages](https://pages.github.com/)

---

## Лицензия

См. `LICENSE`. Контент сайта — © Катович Е. В., 2026.