import BugsnagPerformance from '@bugsnag/browser-performance'
import Bugsnag, { type Plugin } from '@bugsnag/js'
import BugsnagPluginVue, { type BugsnagPluginVueResult } from '@bugsnag/plugin-vue'

let bugsnagVue: BugsnagPluginVueResult | null

if (import.meta.env.VUE_APP_BUGSNAG_API_KEY) {
  Bugsnag.start({
    apiKey: import.meta.env.VUE_APP_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginVue() as Plugin]
  })
  BugsnagPerformance.start({ apiKey: import.meta.env.VUE_APP_BUGSNAG_API_KEY })

  bugsnagVue = Bugsnag.getPlugin('vue')
} else {
  bugsnagVue = null
}

export { bugsnagVue }
