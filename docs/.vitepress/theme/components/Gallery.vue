<template>
  <div ref="galleryRoot" class="pswp-gallery">
    <a
      v-for="(img, i) in images"
      :key="i"
      :href="img.src"
      :data-pswp-width="img.width"
      :data-pswp-height="img.height"
      :data-pswp-alt="img.alt"
      class="pswp-item"
      target="_blank"
      rel="noopener"
    >
      <img :src="img.src" :alt="img.alt" loading="lazy" class="pswp-thumb" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

const props = defineProps<{ images: GalleryImage[] }>()

const galleryRoot = ref<HTMLElement | null>(null)
let lightbox: PhotoSwipeLightbox | null = null

onMounted(async () => {
  // Подгружаем реальные размеры из изображений, чтобы PhotoSwipe
  // не открывал миниатюру, а показывал полноценную картинку.
  await Promise.all(
    props.images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.width && img.height) return resolve()
          const probe = new Image()
          probe.onload = () => {
            img.width = probe.naturalWidth
            img.height = probe.naturalHeight
            resolve()
          }
          probe.onerror = () => resolve()
          probe.src = img.src
        })
    )
  )

  if (!galleryRoot.value) return

  lightbox = new PhotoSwipeLightbox({
    gallery: galleryRoot.value,
    children: 'a.pswp-item',
    pswpModule: () => import('photoswipe'),
    bgOpacity: 0.92,
    showHideAnimationType: 'fade',
  })
  lightbox.init()
})

onBeforeUnmount(() => {
  lightbox?.destroy()
  lightbox = null
})
</script>

<style scoped>
.pswp-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin: 1.5rem 0;
}

.pswp-item {
  display: block;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.pswp-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.pswp-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 640px) {
  .pswp-gallery {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
  }
}
</style>