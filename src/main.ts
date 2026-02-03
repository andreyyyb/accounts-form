import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import { useAccountsStore } from './stores/accounts'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(ElementPlus)

// Загрузка данных до монтирования; ошибки localStorage не должны ломать старт приложения
try {
  useAccountsStore().loadFromStorage()
} catch {
  // данные останутся пустыми
}

app.mount('#app')
