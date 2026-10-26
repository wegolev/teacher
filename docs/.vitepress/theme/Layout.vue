<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <AccessibilityToggle />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import AccessibilityToggle from './components/AccessibilityToggle.vue'
</script>