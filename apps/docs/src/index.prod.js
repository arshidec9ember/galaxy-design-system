import { createApp } from 'vue'
import components, { ZThemeEditor } from '@zeta-gds/components'
import { installDemoComponents } from './setup'
import SiteRoot from './SiteRoot.vue'
import { routes } from './routes/routes'
import createDemoRouter from './routes/router'

const app = createApp(SiteRoot)

const router = createDemoRouter(app, routes)

app.use(router)
app.use(components)
app.component('ZThemeEditor', ZThemeEditor)
installDemoComponents(app)

router.isReady().then(() => {
  app.mount('#app')
})
