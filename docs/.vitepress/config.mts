import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  title: 'Катович Елена Владимировна',
  description: 'Личный сайт учителя истории и обществознания',
  lang: 'ru-RU',
  base: '/teacher/',
  cleanUrls: true,
  lastUpdated: true,

  // fix(home): главная страница через rewrites (01_home/index.md → index.md)
  rewrites: {
    '01_home/index.md': 'index.md',
  },

  head: [
    ['link', { rel: 'icon', href: '/teacher/01_home/teacher.jpg' }],
    ['meta', { name: 'theme-color', content: '#2c3e50' }],
  ],

  themeConfig: {
    logo: '/01_home/teacher.jpg',
    siteTitle: 'Е. В. Катович',

    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Обо мне', link: '/02_about/' },
      { text: 'Историческое краеведение', link: '/03_historical/0301_overview/' },
      { text: 'Ученикам', link: '/04_students/' },
      { text: 'Родителям', link: '/05_parents/' },
      { text: 'Коллегам', link: '/06_colleagues/' },
      { text: 'Новости', link: '/07_news/' },
      { text: 'Галерея', link: '/08_gallery/' },
    ],

    sidebar: {
      '/03_historical/': [
        {
          text: 'Историческое краеведение',
          items: [
            { text: 'Обзор', link: '/03_historical/0301_overview/' },
            { text: 'Банк тестовых заданий', link: '/03_historical/0302_tests/' },
            { text: 'Конспекты уроков', link: '/03_historical/0303_lessons/' },
            { text: 'Рабочие программы', link: '/03_historical/0304_programs/' },
            { text: 'Творческие работы учащихся', link: '/03_historical/0305_creative/' },
            { text: 'Публикации', link: '/03_historical/0306_publications/' },
            { text: 'Методические разработки', link: '/03_historical/0307_method/' },
          ],
        },
      ],
      '/04_students/': [
        {
          text: 'Ученикам',
          items: [
            { text: 'Обзор', link: '/04_students/0401_overview/' },
            { text: 'Домашнее задание', link: '/04_students/0402_homework/' },
            { text: 'Олимпиады и конкурсы', link: '/04_students/0403_olympiads/' },
            { text: 'Подготовка к ОГЭ, ЕГЭ', link: '/04_students/0404_exams/' },
            { text: 'Проектная деятельность', link: '/04_students/0405_projects/' },
            { text: 'Полезные ссылки', link: '/04_students/0406_links/' },
          ],
        },
      ],
      '/05_parents/': [
        {
          text: 'Родителям',
          items: [
            { text: 'Памятки', link: '/05_parents/0501_memos/' },
            { text: 'Родительские собрания', link: '/05_parents/0502_meetings/' },
            { text: 'Нормативные документы', link: '/05_parents/0503_normative/' },
          ],
        },
      ],
      '/06_colleagues/': [
        {
          text: 'Коллегам',
          items: [
            { text: 'Методические разработки', link: '/06_colleagues/0601_method/' },
            { text: 'Материалы МО', link: '/06_colleagues/0602_mo/' },
            { text: 'Музей', link: '/06_colleagues/0603_museum/' },
            { text: 'Публикации', link: '/06_colleagues/0604_publications/' },
            { text: 'Ссылки', link: '/06_colleagues/0605_links/' },
          ],
        },
      ],
      '/07_news/': [
        {
          text: 'Новости',
          items: [
            { text: 'Обзор', link: '/07_news/' },
            { text: '4 ноября', link: '/07_news/this_day_in_history/2026-11-04' },
            { text: 'Календарь дат', link: '/07_news/this_day_in_history/calendar' },
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

    footer: {
      message: 'Личный сайт учителя истории и обществознания',
      copyright: '© 2026 Катович Е. В.',
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
})