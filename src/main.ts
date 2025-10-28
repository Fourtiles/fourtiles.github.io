import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Sentry from '@sentry/vue'
import { createSentryPiniaPlugin } from '@sentry/vue'

import 'normalize.css/normalize.css'

import './assets/styles/global.css'
import './assets/styles/layout.css'
import './assets/styles/unicorn.css'

import App from './App.vue'

const app = createApp(App)

const sentryDSN = import.meta.env.VITE_SENTRY_DSN
Sentry.init({
  app,
  dsn: sentryDSN,
  sendDefaultPii: true,
  integrations: [
    Sentry.vueIntegration({
      tracingOptions: {
        trackComponents: true
      }
    }),
    Sentry.replayIntegration()
  ],
  tracesSampleRate: 1.0,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
})

const pinia = createPinia()
pinia.use(createSentryPiniaPlugin())
app.use(pinia)

app.mount('#app')
