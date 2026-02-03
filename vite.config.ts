import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pages: в workflow передаётся --base ./, локально — /
  base: process.env.BASE_PATH ?? '/',
})
