# Фотогалерея

Фотографии с уроков, внеклассных мероприятий, экскурсий и защиты проектов.
Нажмите на миниатюру, чтобы открыть фотографию на весь экран.

<Gallery :images="[
  { src: '/images/album/02.-2.jpg', alt: '02.-2' },
  { src: '/images/album/02.05.jpg', alt: '02.05' },
  { src: '/images/album/04.05.jpg', alt: '04.05' },
  { src: '/images/album/05.05.jpg', alt: '05.05' },
  { src: '/images/album/06.02.jpg', alt: '06.02' },
  { src: '/images/album/06.03.jpg', alt: '06.03' },
  { src: '/images/album/07.02.jpg', alt: '07.02' },
  { src: '/images/album/07.05.jpg', alt: '07.05' },
  { src: '/images/album/10.04.jpg', alt: '10.04' },
  { src: '/images/album/13.02.jpg', alt: '13.02' },
  { src: '/images/album/14.03.jpg', alt: '14.03' },
  { src: '/images/album/18.02.jpg', alt: '18.02' },
  { src: '/images/album/18.05.jpg', alt: '18.05' },
  { src: '/images/album/18.jpg', alt: '18' },
  { src: '/images/album/19.jpg', alt: '19' },
  { src: '/images/album/20.02.jpg', alt: '20.02' },
  { src: '/images/album/21.02.2026%20%D0%B3%20%D0%97%D0%B0%D1%89%D0%B8%D1%82%D0%B0%20%D0%BF%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0%20%D0%9C%D0%B0%D0%BB%D0%B0%D1%85%D0%BE%D0%B2%20%D0%BA%D1%83%D1%80%D0%B3%D0%B0%D0%BD.jpg', alt: '21.02.2026 г Защита ппроекта Малахов кур г. ан' },
  { src: '/images/album/24.01.jpg', alt: '24.01' },
  { src: '/images/album/27.01.jpg', alt: '27.01' },
  { src: '/images/album/27.03.jpg', alt: '27.03' },
  { src: '/images/album/27.04.jpg', alt: '27.04' },
  { src: '/images/album/3.05.jpg', alt: '3.05' },
  { src: '/images/album/3.09.2026.jpg', alt: '3.09.2026' },
  { src: '/images/album/6.05.jpg', alt: '6.05' },
  { src: '/images/album/9.05.2026%20%D0%B3%D0%90%D0%BA%D1%86%D0%B8%D1%8F%20%D0%91%D0%B5%D1%81%D1%81%D0%BC%D0%B5%D1%80%D1%82%D0%BD%D1%8B%D0%B9%20%D0%BF%D0%BE%D0%BB%D0%BA%2C.jpg', alt: '9.05.2026 г. Акция Бессмертный полк' },
  { src: '/images/album/%D0%90%D0%BA%D1%86%D0%B8%D1%8F%20%D0%A1%D0%BA%D0%B0%D0%B6%D0%B5%D0%BC%20%D1%82%D0%B5%D1%80%D1%80%D0%BE%D1%80%D0%B8%D0%B7%D0%BC%D1%83%20%D0%BD%D0%B5%D1%82.jpg', alt: 'Акция Скажем терроризму нет' },
  { src: '/images/album/%D0%92%D1%81%D0%B5%D1%80%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F%20%D0%B0%D0%BA%D1%86%D0%B8%D1%8F%20%D0%93%D0%B5%D0%BE%D1%80%D0%B3%D0%B8%D0%B5%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BB%D0%B5%D0%BD%D1%82%D0%B0%2C%20%D0%B0%D0%BF%D1%80%D0%B5%D0%BB%D1%8C%202026%20%D0%B3.jpg', alt: 'Всероссийская акция Геор г. иевская лента, апрель 2026 г' },
  { src: '/images/album/%D0%92%D1%81%D0%B5%D1%80%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B4%D0%B8%D0%BA%D1%82%D0%B0%D0%BD%D1%82%2C%2008.-9.jpg', alt: 'Всероссийский диктант, 08.-9' },
  { src: '/images/album/%D0%94%D0%B5%D0%BD%D1%8C%20%D1%81%D0%BE%D0%BB%D0%B8%D0%B4%D0%B0%D1%80%D0%BD%D0%BE%D1%81%D1%82%D0%B8%20%D0%B2%20%D0%B1%D0%BE%D1%80%D1%8C%D0%B1%D0%B5%20%D1%81%20%D1%82%D0%B5%D1%80%D0%BE%D1%80%D0%B8%D0%B7%D0%BC%D0%BE%D0%BC%20%2C3.09.jpg', alt: 'День солидарности в борьбе с тероризмом ,3.09' },
  { src: '/images/album/%D0%9A%D0%B2%D0%B5%D1%81%D1%82-%D0%B8%D0%B3%D1%80%D0%B0%2C%D0%BF%D0%BE%D1%81%D0%B2%D1%8F%D1%89%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F%20%D0%94%D0%BD%D1%8E%20%D0%9F%D0%BE%D0%B1%D0%B5%D0%B4%D1%8B%2C7.09.jpg', alt: 'Квест-и г. ра,посвященная Дню Победы,7.09' },
  { src: '/images/album/%D0%9A%D1%80%D0%B0%D0%B5%D0%B2%D0%BE%D0%B9%20%D0%B0%D0%B2%D1%82%D0%BE%D0%BF%D1%80%D0%BE%D0%B1%D0%B5%D0%B3%20%D0%90%D1%85%20%D0%BF%D1%83%D1%82%D1%8C%20%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BA%D0%B0%20%D1%84%D1%80%D0%BE%D0%BD%D1%82%D0%BE%D0%B2%D0%B0%D1%8F%20%D0%BC%D0%B0%D0%B9%2C2026%20%D0%B3.jpg', alt: 'Краевой автопробег Ах путь дорожка фронтовая май,2026 г' }
]" />

## Проектные работы учащихся

Список файлов (DOCX, PDF) с проектами учащихся — на отдельной странице:

[Проектные работы учащихся](./projects)
