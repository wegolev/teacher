import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  title: 'Катович Елена Владимировна',
  description: 'Личный сайт учителя истории и обществознания',
  lang: 'ru-RU',

  // ⚠️ Это должно совпадать с названием GitHub-репозитория.
  // Если репозиторий называется "teacher", оставьте '/teacher/'.
  base: '/teacher/',
  ignoreDeadLinks: [
    /^\/files\//, // Игнорировать любые ссылки, начинающиеся с /files/
  ],

  // Чистые URL: /about/index.html -> /about/
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/teacher/images/teacher.jpg' }],
    ['meta', { name: 'theme-color', content: '#2c3e50' }],
  ],

  themeConfig: {
    logo: '/images/teacher.jpg',
    siteTitle: 'Е. В. Катович',

    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Обо мне', link: '/about/' },
      { text: 'Историческое краеведение', link: '/historical/' },
      { text: 'Ученикам', link: '/students/' },
      { text: 'Родителям', link: '/parents/' },
      { text: 'Коллегам', link: '/colleagues/' },
      { text: 'Новости', link: '/news/' },
      { text: 'Галерея', link: '/gallery/' },
      { text: 'Обратная связь', link: '/contact/' },
    ],

    sidebar: {
      '/about/': [
        {
          text: 'Обо мне',
          items: [
            { text: 'Визитная карточка', link: '/about/' },
          ],
        },
      ],
      '/students/': [
        {
          text: 'Ученикам',
          items: [
            { text: 'Обзор', link: '/students/' },
            { text: 'Домашние задания', link: '/students/homework' },
            { text: 'Подготовка к ОГЭ/ЕГЭ', link: '/students/oge-ege' },
            { text: 'Олимпиады и конкурсы', link: '/students/olympiads' },
            { text: 'Проектная деятельность', link: '/students/projects' },
            { text: 'Полезные ссылки', link: '/students/links' },
          ],
        },
      ],
      '/parents/': [
        {
          text: 'Родителям',
          items: [
            { text: 'Обзор', link: '/parents/' },
            { text: 'Памятки и рекомендации', link: '/parents/memos' },
            { text: 'Родительские собрания', link: '/parents/meetings' },
            { text: 'Нормативные документы', link: '/parents/normative' },
          ],
        },
      ],
      '/colleagues/': [
        {
          text: 'Коллегам',
          items: [
            { text: 'Обзор', link: '/colleagues/' },
            { text: 'Методические разработки', link: '/colleagues/method' },
            { text: 'Материалы МО', link: '/colleagues/mo' },
            { text: 'Музей села Орловки', link: '/colleagues/museum' },
            { text: 'Публикации и статьи', link: '/colleagues/publications' },
            { text: 'Полезные ссылки', link: '/colleagues/links' },
          ],
        },
      ],
      '/historical/': [
        {
          text: 'Историческое краеведение',
          items: [
            { text: 'Обзор', link: '/historical/' },
            { text: 'Банк тестовых заданий', link: '/historical/tests' },
            { text: 'Конспекты уроков', link: '/historical/lessons' },
            { text: 'Конкурс «Учитель истории Ставрополья»', link: '/historical/contest' },
          ],
        },
      ],
      '/news/': [
        {
          text: 'Новости',
          items: [
            { text: 'Лента новостей', link: '/news/' },
            { text: '4 ноября', link: '/news/2026-11-04' },
            { text: 'Календарь дат', link: '/news/calendar' },
          ],
        },
      ],
    },

    outline: { level: [2, 3], label: 'Содержание' },
    docFooter: { prev: 'Назад', next: 'Вперёд' },
    lastUpdatedText: 'Обновлено',
    returnToTopLabel: 'Наверх',
    sidebarMenuLabel: 'Меню',
    darkModeSwitchLabel: 'Тема',
    langMenuLabel: 'Язык',

    socialLinks: [
      // замените на свой профиль при желании
      // { icon: 'github', link: 'https://github.com/username' },
    ],

    footer: {
      message: 'Личный сайт учителя истории и обществознания',
      copyright: '© 2026 Катович Е. В.',
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
})