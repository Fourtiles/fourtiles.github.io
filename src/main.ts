import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'normalize.css/normalize.css'

import './assets/styles/global.css'
import './assets/styles/layout.css'
import './assets/styles/unicorn.css'

import App from './App.vue'
import { bugsnagVue } from '@/config/bugsnag'

const app = createApp(App)

app.use(createPinia())
if (bugsnagVue) app.use(bugsnagVue)

app.mount('#app')
