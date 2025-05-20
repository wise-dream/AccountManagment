import { createApp } from 'vue'
import App from './App.vue'
import router from './index'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import '@/app/style.scss'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: { preset: Aura }
})

app.mount('#app')
