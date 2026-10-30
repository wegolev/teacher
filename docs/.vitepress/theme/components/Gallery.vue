<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { withBase } from 'vitepress'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

interface GalleryImage {
  src: string
  alt?: string
  width?: number
  height?: number
}

const props = defineProps<{
  images: GalleryImage[]
}>()

const galleryRef = ref<HTMLElement | null>(null)
let lightbox: PhotoSwipeLightbox | null = null

/** Учитываем base: '/teacher/' */
function resolveSrc(src: string): string {
  if (/^(https?:)?\/\//.test(src)) return src
  return withBase(src)
}

onMounted(() => {
  if (!galleryRef.value) return

  lightbox = new PhotoSwipeLightbox({
    gallery: galleryRef.value,
    children: 'a',
    pswpModule: () => import('photoswipe'),
    showHideAnimationType: 'zoom',
    bgOpacity: 0.9,
  })

  // Регистрируем кастомный UI-элемент для подписи.
  // В PhotoSwipe 5 appendTo — это селектор ('.pswp__root' или 'root'),
  // а обновление содержимого делаем через pswp.on('change').
  lightbox.on('uiRegister', () => {
    const pswp = lightbox?.pswp
    if (!pswp) return

    const captionEl = pswp.ui?.registerElement({
      name: 'custom-caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      html: '',
    }) as HTMLElement | undefined

    if (!captionEl) return
    captionEl.classList.add('pswp__custom-caption')

    const updateCaption = () => {
      const el = pswp.currSlide?.data?.element as HTMLElement | undefined
      const caption = el?.getAttribute('data-caption') || ''
      captionEl.textContent = caption
      captionEl.style.display = caption ? 'block' : 'none'
    }

    pswp.on('change', updateCaption)
    // Первый слайд — обновим после инициализации
    pswp.on('afterInit', updateCaption)
  })

  lightbox.init()
})

onBeforeUnmount(() => {
  lightbox?.destroy()
  lightbox = null
})
</script>

<template>
  <div ref="galleryRef" class="vp-gallery">
    <a
      v-for="(img, i) in images"
      :key="i"
      :href="resolveSrc(img.src)"
      :data-caption="img.alt || ''"
      :data-pswp-width="img.width || 1600"
      :data-pswp-height="img.height || 1200"
      target="_blank"
      rel="noopener"
      class="vp-gallery__item"
      :title="img.alt || ''"
    >
      <img
        :src="resolveSrc(img.src)"
        :alt="img.alt || ''"
        loading="lazy"
        class="vp-gallery__img"
      />
      <span v-if="img.alt" class="vp-gallery__caption">{{ img.alt }}</span>
    </a>
  </div>
</template>

<style scoped>
.vp-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin: 16px 0;
}
.vp-gallery__item {
  position: relative;
  display: block;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  background: var(--vp-c-bg-soft);
}
.vp-gallery__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4 / 3;
  transition: transform 0.3s ease;
}
.vp-gallery__item:hover .vp-gallery__img {
  transform: scale(1.03);
}
.vp-gallery__caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 6px 8px;
  font-size: 12px;
  line-height: 1.3;
  color: #fff;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
  opacity: 0;
  transition: opacity 0.2s ease;
}
.vp-gallery__item:hover .vp-gallery__caption {
  opacity: 1;
}
</style>