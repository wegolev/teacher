// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import AccessibilityToggle from './components/AccessibilityToggle.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('AccessibilityToggle', AccessibilityToggle)
  },
}