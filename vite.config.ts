import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Для GitHub Pages: base задаётся в workflow через --base, локально по умолчанию /
  base: process.env.BASE_PATH ?? '/',
})
