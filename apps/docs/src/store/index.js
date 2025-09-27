/* eslint-disable space-before-function-paren */
import { computed } from 'vue'
import { useMemo } from '@zeta-gds/components/_external-dependencies/vooks'
import {
  ZConfigProvider,
  darkTheme,
  enUS,
  dateEnUS
} from '@zeta-gds/components'
import { ThemeConfigProvider } from '@zeta-gds/themes.aphrodite'
import { ThemeConfigProvider as ThemeConfigProviderOlympus } from '@zeta-gds/themes.olympus'
import { ThemeConfigProvider as ThemeConfigProviderOptum } from '@zeta-gds/themes.optum'
import { i18n, useIsMobile } from '../utils/composables'
import {
  createComponentMenuOptions,
  createFoundationMenuOptions,
  createPatternMenuOptions,
  createGettingStartedMenuOptions
} from './menu-options'
import hljs from './hljs'
import { useStorage } from '@vueuse/core'

let route = null
let router = null

export function initRouter(_router, _route) {
  route = _route
  router = _router
  localeNameRef = useMemo({
    get() {
      return 'en-US'
    },
    set(locale) {
      router.push(changeLangInPath(route.fullPath, locale))
    }
  })
  dateLocaleRef = useMemo(() => {
    return dateEnUS
  })
  rawThemeNameRef = useMemo(() => route.params.theme)
  themeNameRef = useMemo({
    get() {
      switch (route.params.theme) {
        // FIXME: os-theme is not fully supported yet for dark theme. So no point in having it as of now
        // case 'os-theme':
        //   return osThemeRef.value
        case 'dark':
          return 'dark'
        default:
          return 'light'
      }
    },
    set(theme) {
      router.push(changeThemeInPath(route.fullPath, theme))
    }
  })
}

// display mode
const displayModeRef = useStorage('mode', 'debug')

// locale
let localeNameRef = null
const localeRef = computed(() => {
  return enUS
})

// useMemo
let dateLocaleRef = null

// theme
// FIXME: os-theme is not fully supported yet for dark theme. So no point in having it as of now
// const osThemeRef = useOsTheme()
let themeNameRef = null
let rawThemeNameRef = null // could be `os-theme`
const themeRef = computed(() => {
  const { value } = themeNameRef
  return value === 'dark' ? darkTheme : null
})

// config provider
const configProviderNameRef = useStorage(
  'theme',
  typeof process.env.DEFAULT_THEME !== 'undefined' && process.env.DEFAULT_THEME
    ? 'default'
    : 'aphrodite'
)

const configProviderRef = computed(() => {
  if (configProviderNameRef.value === 'olympus') {
    return ThemeConfigProviderOlympus
  }
  if (configProviderNameRef.value === 'aphrodite') {
    return ThemeConfigProvider
  }
  if (configProviderNameRef.value === 'optum') {
    return ThemeConfigProviderOptum
  }
  return ZConfigProvider
})

// options
const componentOptionsRef = computed(() =>
  createComponentMenuOptions({
    theme: rawThemeNameRef.value,
    lang: localeNameRef.value,
    mode: displayModeRef.value
  })
)
const foundationOptionsRef = computed(() =>
  createFoundationMenuOptions({
    theme: rawThemeNameRef.value,
    lang: localeNameRef.value,
    mode: displayModeRef.value
  })
)
const patternOptionsRef = computed(() =>
  createPatternMenuOptions({
    theme: rawThemeNameRef.value,
    lang: localeNameRef.value,
    mode: displayModeRef.value
  })
)
const gettingStartedOptionsRef = computed(() =>
  createGettingStartedMenuOptions({
    theme: rawThemeNameRef.value,
    lang: localeNameRef.value,
    mode: displayModeRef.value
  })
)

const flattenedDocOptionsRef = computed(() => {
  const flattenedItems = []
  const traverse = (items) => {
    if (!items) return
    items.forEach((item) => {
      if (item.children) traverse(item.children)
      else flattenedItems.push(item)
    })
  }
  traverse(componentOptionsRef.value)
  traverse(foundationOptionsRef.value)
  traverse(patternOptionsRef.value)
  traverse(gettingStartedOptionsRef.value)
  return flattenedItems
})

export function siteSetup() {
  i18n.provide(computed(() => localeNameRef.value))
  const isMobileRef = useIsMobile()
  return {
    themeEditorStyle: computed(() => {
      return isMobileRef.value ? 'right: 18px; bottom: 24px;' : undefined
    }),
    configProvider: configProviderRef,
    hljs,
    themeName: themeNameRef,
    theme: themeRef,
    locale: localeRef,
    dateLocale: dateLocaleRef
  }
}

function changeLangInPath(path, lang) {
  const langReg = /^\/(en-US)\//
  return path.replace(langReg, `/${lang}/`)
}

function changeThemeInPath(path, theme) {
  const themeReg = /(^\/[^/]+\/)([^/]+)/
  return path.replace(themeReg, '$1' + theme)
}

export function push(partialPath) {
  const { fullPath } = route
  router.push(
    fullPath.replace(/(^\/[^/]+\/[^/]+)((\/.*)|$)/, '$1' + partialPath)
  )
}

export function useDisplayMode() {
  return displayModeRef
}

export function useLocaleName() {
  return localeNameRef
}

export function useThemeName() {
  return themeNameRef
}

export function useComponentOptions() {
  return componentOptionsRef
}

export function useFoundationOptions() {
  return foundationOptionsRef
}

export function usePatternOptions() {
  return patternOptionsRef
}

export function useGettingStartedOptions() {
  return gettingStartedOptionsRef
}

export function useFlattenedDocOptions() {
  return flattenedDocOptionsRef
}

export function useConfigProviderName() {
  return configProviderNameRef
}
