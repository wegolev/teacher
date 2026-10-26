<template>
  <button
    class="a11y-btn"
    :class="{ 'a11y-btn--active': isActive }"
    :aria-pressed="isActive"
    :title="isActive ? 'Обычная версия' : 'Версия для слабовидящих'"
    @click="toggle"
  >
    <span class="a11y-btn__icon" aria-hidden="true">👁</span>
    <span class="a11y-btn__label">{{ isActive ? 'Обычная' : 'Слабовидящим' }}</span>
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const STORAGE_KEY = 'a11y-large-text'
const CLASS_NAME = 'large-text-theme'

const isActive = ref(false)

function apply(active: boolean) {
  isActive.value = active
  document.documentElement.classList.toggle(CLASS_NAME, active)
  localStorage.setItem(STORAGE_KEY, active ? '1' : '0')
}

function toggle() {
  apply(!isActive.value)
}

onMounted(() => {
  if (localStorage.getItem(STORAGE_KEY) === '1') {
    apply(true)
  }
})
</script>

<style scoped>
.a11y-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  padding: 0.35em 0.75em;
  margin-left: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.a11y-btn:hover {
  border-color: var(--vp-c-brand-1);
}

.a11y-btn--active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.a11y-btn__icon {
  font-size: 16px;
  line-height: 1;
}

.a11y-btn__label {
  white-space: nowrap;
}

@media (max-width: 768px) {
  .a11y-btn__label {
    display: none;
  }
  .a11y-btn {
    padding: 0.35em 0.5em;
  }
}
</style>