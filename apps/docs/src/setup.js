import ComponentDemo from './utils/ComponentDemo.vue'
import ComponentDemos from './utils/ComponentDemos'
import EditOnGithubHeader from './utils/EditOnGithubHeader.vue'
import EditOnBitbucketHeader from './utils/EditOnBitbucketHeader.vue'
import './styles/demo.css'
import 'katex/dist/katex.css'
import 'vue-json-pretty/lib/styles.css'

export function installDemoComponents (app) {
  app.component('ComponentDemo', ComponentDemo)
  app.component('ComponentDemos', ComponentDemos)
  app.component('EditOnGithubHeader', EditOnGithubHeader)
  app.component('EditOnBitbucketHeader', EditOnBitbucketHeader)
}
