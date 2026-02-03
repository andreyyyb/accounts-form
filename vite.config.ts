import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Для GitHub Pages: сайт открывается по адресу https://USERNAME.github.io/REPO_NAME/
  base: process.env.BASE_PATH || '/',
})
