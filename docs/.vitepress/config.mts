import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  title: 'Катович Елена Владимировна',
  description: 'Личная страница учителя истории и обществознания',
  base: '/teacher/', // название репозитория!
  themeConfig: {
    logo: '/images/logo.png', // позже добавим
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Обо мне', link: '/about/' },
      { text: 'Ученикам', link: '/students/' },
      { text: 'Родителям', link: '/parents/' },
      { text: 'Коллегам', link: '/colleagues/' },
      { text: 'Новости', link: '/news/' },
      { text: 'Галерея', link: '/gallery/' },
      { text: 'Обратная связь', link: '/contact/' },
    ],
    sidebar: { /* настроим позже */ },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ваш-профиль/teacher' }
    ]
  },
  vite: {
    plugins: [tailwindcss()]
  }
})