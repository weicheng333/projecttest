import { createApp } from 'vue'

import { PiniaStoragePlugin } from 'pinia-storage-plugin'
import { createPinia } from 'pinia'

import router from './router/router'
import App from './App.vue'

const pinia = createPinia()
pinia.use(PiniaStoragePlugin)

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
