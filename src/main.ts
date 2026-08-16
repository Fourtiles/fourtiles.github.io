import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Sentry from '@sentry/vue'
import { createSentryPiniaPlugin } from '@sentry/vue'

import 'normalize.css/normalize.css'

import './assets/styles/global.css'
import './assets/styles/layout.css'
import './assets/styles/unicorn.css'

import App from './App.vue'
import { recoverFromPreloadErrors } from '@/utils/preloadRecovery'

recoverFromPreloadErrors()

/**
 * Installs the Workbox service worker that backs offline use.
 *
 * A failed registration costs offline caching and nothing else, so the
 * rejection is logged rather than left to surface as an unhandled error.
 */
function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator)) return

  window.addEventListener('load', () => {
    const swURL = `${import.meta.env.BASE_URL}sw.js`
    navigator.serviceWorker
      .register(swURL, { scope: import.meta.env.BASE_URL })
      .catch((error: unknown) => {
        Sentry.logger.warn('Service worker registration failed', {
          reason: error instanceof Error ? error.message : String(error),
        })
      })
  })
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App)

const sentryDSN = import.meta.env.VITE_SENTRY_DSN as string | undefined
Sentry.init({
  app,
  dsn: sentryDSN,
  release: import.meta.env.VITE_SENTRY_RELEASE || undefined,
  environment: import.meta.env.PROD ? 'production' : 'development',
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.vueIntegration({
      tracingOptions: {
        trackComponents: true,
      },
    }),
    Sentry.replayIntegration({ maskAllText: true, blockAllMedia: true }),
  ],
  tracesSampleRate: 1.0,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  ignoreErrors: [
    // Browser-extension content scripts inject WebExtension messaging into
    // the page; their failures are not our code and are unfixable here.
    // Sentry TIM-DOT-CODES-6.
    /runtime\.sendMessage/u,
    // vite-plugin-pwa's injected SW registration throws InvalidStateError
    // when Chrome registers during prerender. No elegant in-plugin or
    // newer-version fix exists, so we filter the noise. Sentry
    // TIM-DOT-CODES-5.
    /Failed to register a ServiceWorker/u,
    // Native in-app browsers (WKWebView wrappers) inject a bridge script that
    // calls `window.webkit.messageHandlers`; it throws when that handler is
    // absent. Not our code and unfixable here. Sentry TIM-DOT-CODES-8.
    /messageHandlers/u,
    // Android WebView tears down its JS bridge mid-post, so a `postMessage`
    // from the injected bridge rejects with "Java object is gone". Not our
    // code and unfixable here. Sentry RACCOONBETS-FRONTEND-D.
    /Java object is gone/u,
    // Microsoft's Outlook SafeLinks crawler rejects a promise from its own
    // injected instrumentation while previewing a link. It arrives without a
    // stacktrace from an Azure address, never from a visitor. Sentry
    // TIM-DOT-CODES-C.
    /Object Not Found Matching Id/u,
  ],
})

const pinia = createPinia()
pinia.use(createSentryPiniaPlugin())
app.use(pinia)

app.mount('#app')

// Only a production build emits `sw.js`.
if (import.meta.env.PROD) registerServiceWorker()
