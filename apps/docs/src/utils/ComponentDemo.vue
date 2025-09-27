<template>
  <z-card-standard
    v-if="showDemo"
    :id="demoFileName"
    size="large"
    :class="[
      'demo-card',
      {
        'demo-card--custom-element': showCustomElement
      }
    ]"
    :divider="{
      footer: true
    }"
    footer-style="padding: 0;"
  >
    <template #header>
      <span style="cursor: pointer" @click="handleTitleClick">
        <slot name="title" />
      </span>
    </template>
    <template #header-end>
      <z-tooltip v-if="figmaUrl">
        <template #trigger>
          <figma-button
            v-if="figmaUrl"
            :relative-url="figmaUrl"
            style="padding: 0; margin-right: 6px"
            size="x-small"
          />
        </template>
        {{ t('figmaUrl') }}
      </z-tooltip>
      <z-tooltip>
        <template #trigger>
          <edit-in-code-sandbox-button
            style="padding: 0; margin-right: 6px"
            size="x-small"
            :code="showTs ? sfcTsCode : sfcJsCode"
          />
        </template>
        {{ t('editInCodeSandbox') }}
      </z-tooltip>
      <z-tooltip>
        <template #trigger>
          <edit-on-bitbucket-button
            depth="3"
            style="padding: 0; margin-right: 6px"
            size="x-small"
            :relative-url="relativeUrl"
          />
        </template>
        {{ t('editOnBitbucket') }}
      </z-tooltip>
      <z-tooltip v-if="false">
        <template #trigger>
          <edit-on-github-button
            depth="3"
            style="padding: 0; margin-right: 6px"
            size="x-small"
            :relative-url="relativeUrl"
          />
        </template>
        {{ t('editOnGithub') }}
      </z-tooltip>
      <z-tooltip>
        <template #trigger>
          <copy-code-button
            depth="3"
            style="padding: 0; margin-right: 6px"
            size="x-small"
            :code="showTs ? sfcTsCode : sfcJsCode"
            :success-text="t('copySuccess')"
          />
        </template>
        {{ t('copyCode') }}
      </z-tooltip>
      <z-tooltip ref="expandCodeButtonRef">
        <template #trigger>
          <z-button
            style="padding: 0"
            size="x-small"
            variant="text"
            depth="3"
            @click="toggleCodeDisplay"
          >
            <template #icon>
              <z-icon>
                <code-outline />
              </z-icon>
            </template>
          </z-button>
        </template>
        {{ !showCode ? t('show') : t('hide') }}
      </z-tooltip>
    </template>
    <slot name="content" />

    <custom-element-builder v-if="showCustomElement">
      <slot name="demo" />
    </custom-element-builder>
    <slot v-else name="demo" />

    <template v-if="showCode" #footer>
      <z-tabs
        v-if="languageType === 'ts'"
        size="small"
        variant="segment"
        style="padding: 12px 24px 0 24px"
        :value="showTs ? 'ts' : 'js'"
        @update:model-value="($e) => (showTs = $e === 'ts')"
      >
        <z-tab name="ts">
          TypeScript
        </z-tab>
        <z-tab name="js">
          JavaScript
        </z-tab>
      </z-tabs>
      <z-scrollbar
        x-scrollable
        content-style="padding: 20px 24px;"
        style="height: auto"
      >
        <z-code v-if="showTs" language="html" :code="sfcTsCode" />
        <z-code v-else language="html" :code="sfcJsCode" />
      </z-scrollbar>
    </template>
  </z-card-standard>
</template>

<script lang="ts">
import { defineComponent, computed, nextTick, ref, watch } from 'vue'
import { CodeOutline } from '@vicons/ionicons5'
import { useDisplayMode } from '../store'
import { i18n } from '../utils/composables'
import EditOnGithubButton from './EditOnGithubButton.vue'
import EditOnBitbucketButton from './EditOnBitbucketButton.vue'
import EditInCodeSandboxButton from './EditInCodeSandboxButton.vue'
import CopyCodeButton from './CopyCodeButton.vue'
import FigmaButton from './FigmaButton.vue'
import CustomElementBuilder from './CustomElementBuilder.vue'

export default defineComponent({
  components: {
    CodeOutline,
    EditOnGithubButton,
    EditOnBitbucketButton,
    EditInCodeSandboxButton,
    CopyCodeButton,
    CustomElementBuilder,
    FigmaButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    tsCode: {
      type: String,
      required: true
    },
    demoFileName: {
      type: String,
      required: true
    },
    relativeUrl: {
      type: String,
      required: true
    },
    jsCode: {
      type: String,
      required: true
    },
    languageType: {
      type: String,
      default: 'js'
    },
    figmaUrl: {
      type: String,
      required: false
    }
  },
  setup (props) {
    const displayModeRef = useDisplayMode()
    const isDebugDemo = /(d|D)ebug/.test(props.demoFileName)
    const showDemoRef = computed(() => {
      return !(isDebugDemo && displayModeRef.value !== 'debug')
    })
    const showCustomElementRef = computed(() => {
      return displayModeRef.value === 'custom-elements'
    })
    const showGithubRef = ref(false) // TODO: use github when ready
    const showCodeRef = ref(false)
    const showTsRef = ref(props.languageType === 'ts')
    const expandCodeButtonRef = ref(null)
    watch(showCodeRef, () => {
      nextTick(() => {
        expandCodeButtonRef.value.syncPosition()
      })
    })
    return {
      showGithubRef,
      expandCodeButtonRef,
      showDemo: showDemoRef,
      showCustomElement: showCustomElementRef,
      showCode: showCodeRef,
      showTs: showTsRef,
      sfcTsCode: decodeURIComponent(props.tsCode),
      sfcJsCode: decodeURIComponent(props.jsCode),
      toggleCodeDisplay () {
        showCodeRef.value = !showCodeRef.value
      },
      handleTitleClick: () => {
        window.location.hash = `#${props.demoFileName}`
      },
      toggleLanguageChange () {
        showTsRef.value = !showTsRef.value
      },
      ...i18n({
        'en-US': {
          show: 'Show Code',
          hide: 'Hide Code',
          editOnGithub: 'Edit on GitHub',
          editOnBitbucket: 'Edit on Bitbucket',
          figmaUrl: 'Figma URL',
          editInCodeSandbox: 'Edit in CodeSandbox',
          copyCode: 'Copy Code',
          copySuccess: 'Successfully Copied'
        }
      })
    }
  }
})
</script>
