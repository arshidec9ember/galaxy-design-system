import { createApp } from 'vue'
import components, { ZThemeEditor } from '@zeta-gds/components'
import { installDemoComponents } from './setup'
import SiteRoot from './SiteRoot.vue'
import { routes } from './routes/routes'
import createDemoRouter from './routes/router'
import Particles from '@tsparticles/vue3'
import { loadStarsPreset } from '@tsparticles/preset-stars'
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(SiteRoot)

const router = createDemoRouter(app, routes)

app.use(router)
app.use(components)
app.use(MotionPlugin)
app.use(Particles, {
  init: async (engine) => {
    await loadStarsPreset(engine)
  }
})
app.component('ZThemeEditor', ZThemeEditor)
installDemoComponents(app)

router.isReady().then(() => {
  app.mount('#app')
})
