<template>
  <component
    :is="configProvider"
    class="demo"
    namespace="gds-component-doc"
    preflight-style-disabled
    :theme-name="themeName"
    :theme="theme"
    :locale="locale"
    :date-locale="dateLocale"
    :hljs="hljs"
  >
    <z-theme-editor :style="themeEditorStyle">
      <z-loading-bar-provider>
        <z-message-provider>
          <z-notification-provider>
            <z-floating-panel-provider>
              <z-dialog-provider>
                <Site />
              </z-dialog-provider>
            </z-floating-panel-provider>
          </z-notification-provider>
        </z-message-provider>
      </z-loading-bar-provider>
      <z-global-style />
    </z-theme-editor>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { initRouter, siteSetup } from './store'
import Site from './Site.vue'

export default defineComponent({
  name: 'SiteProvider',
  components: {
    Site
  },
  setup () {
    initRouter(useRouter(), useRoute())
    return siteSetup()
  }
})
</script>
