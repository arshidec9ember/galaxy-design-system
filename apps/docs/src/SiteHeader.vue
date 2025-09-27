<template>
  <z-layout-header bordered :inverted="isInverted" class="nav" :style="style">
    <z-text tag="div" class="ui-logo-wrapper" :depth="1">
      <z-text tag="div" class="ui-logo" @click="handleLogoClick">
        <img src="/assets/images/gdslogo.png" alt="logo">
        <z-icon
          v-if="!isMobile"
          size="58"
          :color="isInverted ? 'var(--z-code-color)' : undefined"
        >
          <GDSTextLogo />
        </z-icon>
      </z-text>
      <z-popover placement="right" trigger="hover">
        <template #trigger>
          <z-text
            tag="div"
            :style="isInverted ? invertedStyle : ''"
            class="nav-picker padded"
            @click="router.push(`/en-US/os-theme/getting-started/changelog`)"
          >
            Version {{ version }}
          </z-text>
        </template>
        <div class="version-popover">
          {{ "What's New" }}
        </div>
      </z-popover>
    </z-text>
    <div :style="!isMobile ? 'display: flex; align-items: center;' : ''">
      <div v-if="!(isMobile || isTablet)" class="nav-menu" style="flex: 1">
        <z-menu
          ref="menuInstRef"
          :inverted="isInverted"
          mode="horizontal"
          :responsive="true"
          :model-value="menuValue"
          :options="menuOptions"
          :render-label="renderMenuLabel"
        />
      </div>
      <z-select
        :model-value="selectedValue"
        :style="!isMobile ? 'width: 216px; margin-left: 24px' : undefined"
        :placeholder="t('searchPlaceholder')"
        :show="showDropdown"
        :options="searchOptions"
        filterable
        remote
        :show-arrow="false"
        :show-checkmark="false"
        @blur="showDropdown = false"
        @search="handleSearch"
        @update:model-value="handleSearchItemClick"
      />
      <!-- TODO: add it -->
      <!-- template #suffix>
        <span style="color: var(--placeholder-color)">⌘ + K</span>
      </template -->
    </div>
    <z-popover
      v-if="isMobile || isTablet"
      ref="mobilePopoverRef"
      style="padding: 0; width: 288px"
      placement="bottom-end"
      display-directive="show"
      trigger="click"
    >
      <template #trigger>
        <z-icon size="20" style="margin-left: 12px">
          <menu-outline />
        </z-icon>
      </template>
      <div style="overflow: auto; max-height: 79vh">
        <z-menu
          :model-value="mobileMenuValue"
          :options="mobileMenuOptions"
          :indent="18"
          :render-label="renderMenuLabel"
          @update:model-value="handleUpdateMobileMenu"
        />
      </div>
    </z-popover>
    <div v-else class="nav-end">
      <z-button
        :style="isInverted ? invertedStyle : ''"
        size="medium"
        variant="subtle"
        class="nav-picker"
        @click="handleThemeUpdate"
      >
        {{ themeLabelMap[theme] }}
      </z-button>
      <z-button
        :style="isInverted ? invertedStyle : ''"
        size="medium"
        variant="subtle"
        class="nav-picker"
        @click="navigateToBaseRepo"
      >
        Bitbucket
      </z-button>

      <z-popselect
        v-if="dev"
        v-model="displayMode"
        :options="displayModeOptions"
        :show-checkmark="false"
      >
        <template #default="{ option }">
          <z-button
            size="medium"
            :style="isInverted ? invertedStyle : ''"
            variant="subtle"
          >
            {{ option?.label }}
          </z-button>
        </template>
      </z-popselect>
      <z-popselect
        v-model="themeProvider"
        :options="themeProviderOptions"
        :show-checkmark="false"
      >
        <template #default="{ option }">
          <z-button>
            {{ option?.label }}
          </z-button>
        </template>
      </z-popselect>
    </div>
  </z-layout-header>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage, version } from '@zeta-gds/components'
import { MenuOutline } from '@vicons/ionicons5'
import { repoUrl } from './utils/bitbucket-url'
import { i18n, useIsMobile, useIsTablet } from './utils/composables'
import { findMenuValue } from './utils/route'
import {
  useThemeName,
  useLocaleName,
  useDisplayMode,
  useFlattenedDocOptions,
  useConfigProviderName,
  useComponentOptions
} from './store'
import { renderMenuLabel } from './store/menu-options'
import { useStorage } from '@vueuse/core'
import GDSTextLogo from './utils/GDSTextLogo'

// match substr
function match (pattern, string) {
  if (!pattern.length) return true
  if (!string.length) return false
  if (pattern[0] === string[0]) return match(pattern.slice(1), string.slice(1))
  return match(pattern, string.slice(1))
}

const locales = {
  'en-US': {
    dark: 'Dark',
    light: 'Light',
    searchPlaceholder: 'Search',
    home: 'Home',
    gettingStarted: 'Getting Started',
    foundation: 'Foundations',
    pattern: 'Patterns',
    status: 'Status',
    component: 'Components',
    common: 'Common',
    debug: 'Debug',
    alreadyHome: 'You are already in home page. No clicking anymore.',
    aphroditeTheme: 'Aphrodite Theme',
    olympusTheme: 'Olympus Theme',
    optumTheme: 'Optum Theme',
    defaultTheme: 'Default Theme'
  }
}

export default defineComponent({
  name: 'SiteHeader',
  components: {
    MenuOutline,
    GDSTextLogo
  },
  setup () {
    const message = useMessage()
    const route = useRoute()
    const router = useRouter()

    const mobilePopoverRef = ref(null)
    const themeAndLocaleReg = /^(\/[^/]+){2}/
    const isInverted = computed(() => {
      return /^(\/[^/]+){2}$/.test(route.path)
    })
    // i18n
    const { t } = i18n(locales)

    // menu
    const menuOptionsRef = computed(() => {
      return [
        {
          key: 'gettingStarted',
          label: t('gettingStarted'),
          path:
            themeAndLocaleReg.exec(route.path)?.[0] +
            '/getting-started/introduction'
        },
        {
          key: 'foundation',
          label: t('foundation'),
          path: themeAndLocaleReg.exec(route.path)?.[0] + '/foundation/color'
        },
        {
          key: 'pattern',
          label: t('pattern'),
          path:
            themeAndLocaleReg.exec(route.path)?.[0] + '/pattern/empty-states'
        },
        {
          key: 'component',
          label: t('component'),
          path: themeAndLocaleReg.exec(route.path)?.[0] + '/components/button'
        },
        {
          key: 'status',
          label: t('status'),
          path: themeAndLocaleReg.exec(route.path)?.[0] + '/status'
        }
      ]
    })
    const menuValueRef = computed(() => {
      if (/\/components\//.test(route.path)) return 'component'
      else if (/\/foundation\//.test(route.path)) return 'foundation'
      else if (/\/pattern\//.test(route.path)) return 'pattern'
      else if (/\/getting-started/.test(route.path)) return 'gettingStarted'
      else if (/\/status/.test(route.path)) return 'status'
      else if (route.name === 'home') return 'home'
      return null
    })

    // mobile options
    const componentOptionsRef = useComponentOptions()
    const mobileMenuOptionsRef = computed(() => {
      return [
        {
          key: 'theme',
          label: themeLabelMapRef.value[themeNameRef.value]
        },
        {
          key: 'locale',
          label: 'English'
        },
        {
          key: 'home',
          label: t('home'),
          path: themeAndLocaleReg.exec(route.path)?.[0]
        },
        {
          key: 'component',
          label: t('component'),
          path: themeAndLocaleReg.exec(route.path)?.[0] + '/components/button',
          children: componentOptionsRef.value
        },
        {
          key: 'github',
          label: 'GitHub'
        }
      ]
    })
    const mobileMenuValueRef = computed(() => {
      if (route.name === 'home') return 'home'
      return findMenuValue(mobileMenuOptionsRef.value, route.path)
    })
    function handleUpdateMobileMenu (value, { path }) {
      if (value === 'theme') {
        handleThemeUpdate()
      } else if (path) {
        router.push(path)
      } else {
        window.open(repoUrl, '_blank')
      }
      mobilePopoverRef.value.setShow(false)
    }

    // theme
    const themeNameRef = useThemeName()
    const themeLabelMapRef = computed(() => ({
      dark: t('light'),
      light: t('dark')
    }))

    function navigateToBaseRepo () {
      window.open(repoUrl, '_blank')
    }

    function handleThemeUpdate () {
      if (themeNameRef.value === 'dark') {
        themeNameRef.value = 'light'
      } else {
        themeNameRef.value = 'dark'
      }
    }

    // locale
    const localeNameRef = useLocaleName()

    // display mode
    const displayModeRef = useDisplayMode<
      'prod' | 'debug' | 'custom-elements'
    >()
    const displayModeOptionsRef = ref([
      {
        label: 'Debug',
        value: 'debug'
      },
      {
        label: 'Prod',
        value: 'common'
      },
      {
        label: 'Custom Elements',
        value: 'custom-elements'
      }
    ])

    // config provider
    const themeProviderRef = useConfigProviderName()
    const themeProviderOptionsRef = ref([
      {
        label: 'Aphrodite Theme',
        value: 'aphrodite'
      },
      {
        label: 'Olympus Theme',
        value: 'olympus'
      },
      {
        label: 'Optum Theme',
        value: 'optum'
      },
      {
        label: 'Default Theme',
        value: 'default'
      }
    ])

    const devRef = __DEV__ || useStorage('CUSTOM_ELEMENT')

    // search
    const searchableOptionsRef = useFlattenedDocOptions()
    const searchPatternRef = ref<string | null>(null)
    const selectedValue = ref(null)
    const showDropdownRef = ref(false)
    const searchOptionsRef = computed(() => {
      function getLabel (item) {
        if (item.label) {
          return item.label + (item.extra ? ' ' + item.extra : '')
        }
        return item.key
      }
      if (!searchPatternRef.value) return []
      const replaceRegex = / |-/g
      return searchableOptionsRef.value
        .filter((item) => {
          const pattern = searchPatternRef.value
            .toLowerCase()
            .replace(replaceRegex, '')
            .slice(0, 20)
          const label = getLabel(item).toLowerCase().replace(replaceRegex, '')
          return match(pattern, label)
        })
        .map((item) => ({
          label: getLabel(item),
          value: item.path
        }))
    })

    function handleSearchItemClick (value) {
      if (value) {
        router.push(value)
        showDropdownRef.value = false
      }
    }

    function handleSearch (value) {
      searchPatternRef.value = value
      if (!value && value === '') {
        showDropdownRef.value = false
      } else {
        showDropdownRef.value = true
      }
    }

    // common
    const isMobileRef = useIsMobile()
    const isTabletRef = useIsTablet()
    function handleLogoClick () {
      if (/^(\/[^/]+){2}$/.test(route.path)) {
        message.info(t('alreadyHome'))
        return
      }
      router.push(/^(\/[^/]+){2}/.exec(route.path)[0])
    }

    // responsive menu
    const menuInstRef = ref()
    let lastWindowInnerWidth = window.innerWidth
    window.addEventListener('resize', () => {
      if (window.innerWidth > lastWindowInnerWidth) {
        menuInstRef.value?.deriveResponsiveState()
      }
      lastWindowInnerWidth = window.innerWidth
    })

    return {
      renderMenuLabel,
      mobilePopoverRef,
      aphrodite: process.env.APHRODITE,
      dev: devRef,
      message,
      t,
      version,
      isMobile: isMobileRef,
      isTablet: isTabletRef,
      repoUrl,
      router,
      // theme
      theme: themeNameRef,
      handleThemeUpdate,
      navigateToBaseRepo,
      themeLabelMap: themeLabelMapRef,
      // displayMode
      displayMode: displayModeRef,
      displayModeOptions: displayModeOptionsRef,
      // locale
      locale: localeNameRef,
      // configProvider
      themeProvider: themeProviderRef,
      themeProviderOptions: themeProviderOptionsRef,
      // search
      showDropdown: showDropdownRef,
      searchPattern: searchPatternRef,
      searchOptions: searchOptionsRef,
      handleSearch,
      handleSearchItemClick,
      selectedValue,
      // menu
      menuOptions: menuOptionsRef,
      menuValue: menuValueRef,
      // mobile & tablet menu
      mobileMenuOptions: mobileMenuOptionsRef,
      handleUpdateMobileMenu,
      mobileMenuValue: mobileMenuValueRef,
      // common
      handleLogoClick,
      isInverted,
      invertedStyle: {
        color: 'var(--z-code-color)'
      },
      style: computed(() => {
        return isMobileRef.value
          ? {
              '--side-padding': '16px',
              'grid-template-columns': 'auto 1fr auto'
            }
          : {
              '--side-padding': '32px',
              'grid-template-columns':
                'calc(300px - var(--side-padding)) 1fr auto'
            }
      })
    }
  }
})
</script>

<style scoped>
.nav {
  position: relative;
  display: grid;
  grid-template-rows: calc(var(--header-height) - 1px);
  align-items: center;
  padding: 0 var(--side-padding);
  position: relative;
  z-index: 1;
}
.ui-logo-wrapper {
  width: var(--logo-width);
  display: flex;
  align-items: center;
}

.ui-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 18px;
  letter-spacing: 2.2px;
  text-transform: uppercase;
}
.version-popover {
  font-size: 12px;
}

.ui-logo > img {
  margin-right: 12px;
  height: 52px;
  width: 52px;
}

.nav-menu {
  padding-left: 36px;
  min-width: 200px;
  width: calc(100vw - var(--logo-width) - var(--header-end) - 216px);
}

.nav-picker {
  margin-right: 4px;
}

.nav-picker.padded {
  padding: 0 10px;
  font-size: 16px;
  text-wrap: nowrap;
  letter-spacing: 0.2px;
  cursor: pointer;
}

.nav-picker.padded:before {
  content: '•';
  margin-right: 4px;
}

.nav-picker:last-child {
  margin-right: 0;
}

.nav-end {
  display: flex;
  align-items: center;
  width: var(--header-end);
  button:hover {
    background-color: var(--gds-color-bg-nav-dark-light2);
  }
}
</style>
