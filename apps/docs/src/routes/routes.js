export const enFoundationRoutes = [
  {
    path: 'design-tokens',
    component: () => import('../pages/foundation/design-tokens/enUS/index.md')
  },
  {
    path: 'color',
    component: () => import('../pages/foundation/color/enUS/index.md')
  },
  {
    path: 'typography',
    component: () => import('../pages/foundation/typography/enUS/index.md')
  },
  {
    path: 'spacing',
    component: () => import('../pages/foundation/spacing/enUS/index.md')
  },
  {
    path: 'opacity',
    component: () => import('../pages/foundation/opacity/enUS/index.md')
  },
  {
    path: 'radius',
    component: () => import('../pages/foundation/radius/enUS/index.md')
  },
  {
    path: 'iconography',
    component: () => import('../pages/foundation/iconography/enUS/index.md')
  },
  {
    path: 'layout',
    component: () => import('../pages/foundation/layout/enUS/index.md')
  },
  {
    path: 'states-naming',
    component: () => import('../pages/foundation/states-naming/enUS/index.md')
  }
]

export const enGettingStartedRoutes = [
  {
    path: 'introduction',
    component: () => import('../pages/getting-started/index.md')
  },
  {
    path: 'jsx',
    component: () => import('../pages/getting-started/jsx/enUS/index.md')
  },
  {
    path: 'customize-theme',
    component: () =>
      import('../pages/getting-started/customize-theme/enUS/index.md')
  },
  {
    path: 'config-provider',
    component: () =>
      import('../pages/getting-started/customize-theme/enUS/config-provider.md')
  },
  {
    path: 'how-theming-works',
    component: () =>
      import(
        '../pages/getting-started/customize-theme/enUS/how-theming-works.md'
      )
  },
  {
    path: 'theme-creation',
    component: () =>
      import('../pages/getting-started/customize-theme/enUS/create-theme.md')
  },
  {
    path: 'community',
    component: () => import('../pages/getting-started/community/enUS/index.md')
  },
  {
    path: 'i18n',
    component: () => import('../pages/getting-started/i18n/enUS/index.md')
  },
  {
    path: 'changelog',
    component: () => import('@zeta-gds/components/../CHANGELOG.md')
  },
  {
    path: 'installation',
    component: () =>
      import('../pages/getting-started/installation/enUS/index.md')
  },
  {
    path: 'usage-sfc',
    component: () => import('../pages/getting-started/usage-sfc/enUS/index.md')
  },
  {
    path: 'import-on-demand',
    component: () =>
      import('../pages/getting-started/import-on-demand/enUS/index.md')
  },
  {
    path: 'supported-platforms',
    component: () =>
      import('../pages/getting-started/supported-platforms/enUS/index.md')
  },
  {
    path: 'common-issues',
    component: () =>
      import('../pages/getting-started/common-issues/enUS/index.md')
  },
  {
    path: 'controlled-uncontrolled',
    component: () =>
      import('../pages/getting-started/controlled-uncontrolled/enUS/index.md')
  },
  {
    path: 'tech-architecture',
    component: () =>
      import('../pages/getting-started/tech-architecture/enUS/index.md')
  },
  {
    path: 'for-designers',
    component: () =>
      import('../pages/getting-started/for-designers/enUS/index.md')
  },
  {
    path: 'for-developers',
    component: () =>
      import('../pages/getting-started/for-developers/enUS/index.md')
  },
  {
    path: 'contributions-for-designers',
    component: () =>
      import(
        '../pages/getting-started/contributions-for-designers/enUS/index.md'
      )
  },
  {
    path: 'contributions-for-developers',
    component: () =>
      import(
        '../pages/getting-started/contributions-for-developers/enUS/index.md'
      )
  }
]

export const enPatternRoutes = [
  {
    path: 'empty-states',
    component: () => import('../pages/pattern/empty-states/enUS/index.md')
  },
  {
    path: 'error-states',
    component: () => import('../pages/pattern/error-states/enUS/index.md')
  },
  {
    path: 'loading',
    component: () => import('../pages/pattern/loading/enUS/index.md')
  },
  {
    path: 'navigation',
    component: () => import('../pages/pattern/navigation/enUS/index.md')
  },
  {
    path: 'negative-actions',
    component: () => import('../pages/pattern/negative-actions/enUS/index.md')
  },
  {
    path: 'timestamp',
    component: () => import('../pages/pattern/timestamp/enUS/index.md')
  }
]

export const enComponentRoutes = [
  // components
  {
    path: 'layout',
    component: () =>
      import('@zeta-gds/components/layout/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'gradient-text',
    component: () =>
      import(
        '@zeta-gds/components/gradient-text/demos/enUS/index.demo-entry.md'
      )
  },
  {
    path: 'icon',
    component: () =>
      import('@zeta-gds/components/icon/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'checkbox',
    component: () =>
      import('@zeta-gds/components/checkbox/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'button',
    component: () =>
      import('@zeta-gds/components/button/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'link',
    component: () =>
      import('@zeta-gds/components/link/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'switch',
    component: () =>
      import('@zeta-gds/components/switch/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'panel',
    component: () =>
      import('@zeta-gds/components/panel/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'floating-panel',
    component: () =>
      import(
        '@zeta-gds/components/floating-panel/demos/enUS/index.demo-entry.md'
      )
  },
  {
    path: 'data-table',
    component: () =>
      import('@zeta-gds/components/data-table/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'data-table-settings',
    component: () =>
      import(
        '@zeta-gds/components/data-table-settings/demos/enUS/index.demo-entry.md'
      )
  },
  {
    path: 'details-view',
    component: () =>
      import('@zeta-gds/components/detail-view/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'filter',
    component: () =>
      import('@zeta-gds/components/filter/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'input',
    component: () =>
      import('@zeta-gds/components/input/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'select',
    component: () =>
      import('@zeta-gds/components/select/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'cascader',
    component: () =>
      import('@zeta-gds/components/cascader/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'dynamic-input',
    component: () =>
      import(
        '@zeta-gds/components/dynamic-input/demos/enUS/index.demo-entry.md'
      )
  },
  {
    path: 'modal',
    component: () =>
      import('@zeta-gds/components/modal/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'message',
    component: () =>
      import('@zeta-gds/components/message/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'tooltip',
    component: () =>
      import('@zeta-gds/components/tooltip/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'popover',
    component: () =>
      import('@zeta-gds/components/popover/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'notification',
    component: () =>
      import('@zeta-gds/components/notification/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'pagination',
    component: () =>
      import('@zeta-gds/components/pagination/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'alert',
    component: () =>
      import('@zeta-gds/components/alert/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'date-picker',
    component: () =>
      import('@zeta-gds/components/date-picker/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'super-date-picker',
    component: () =>
      import(
        '@zeta-gds/components/super-date-picker/demos/enUS/index.demo-entry.md'
      )
  },
  {
    path: 'input-number',
    component: () =>
      import('@zeta-gds/components/input-number/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'radio',
    component: () =>
      import('@zeta-gds/components/radio/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'form',
    component: () =>
      import('@zeta-gds/components/form/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'tabs',
    component: () =>
      import('@zeta-gds/components/tabs/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'time-picker',
    component: () =>
      import('@zeta-gds/components/time-picker/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'text-editor',
    component: () =>
      import('@zeta-gds/components/text-editor/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'dialog',
    component: () =>
      import('@zeta-gds/components/dialog/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'badge',
    component: () =>
      import('@zeta-gds/components/badge/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'stepper',
    component: () =>
      import('@zeta-gds/components/stepper/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'wizard',
    component: () =>
      import('@zeta-gds/components/wizard/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'accordion',
    component: () =>
      import('@zeta-gds/components/accordion/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'progress',
    component: () =>
      import('@zeta-gds/components/progress/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'tag',
    component: () =>
      import('@zeta-gds/components/tag/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'menu',
    component: () =>
      import('@zeta-gds/components/menu/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'timeline',
    component: () =>
      import('@zeta-gds/components/timeline/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'back-to-top',
    component: () =>
      import('@zeta-gds/components/back-to-top/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'divider',
    component: () =>
      import('@zeta-gds/components/divider/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'popconfirm',
    component: () =>
      import('@zeta-gds/components/popconfirm/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'anchor',
    component: () =>
      import('@zeta-gds/components/anchor/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'dropdown',
    component: () =>
      import('@zeta-gds/components/dropdown/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'popselect',
    component: () =>
      import('@zeta-gds/components/popselect/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'config-provider',
    component: () =>
      import(
        '@zeta-gds/components/config-provider/demos/enUS/index.demo-entry.md'
      )
  },
  {
    path: 'transfer',
    component: () =>
      import('@zeta-gds/components/transfer/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'spinner',
    component: () =>
      import('@zeta-gds/components/spinner/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'drawer',
    component: () =>
      import('@zeta-gds/components/drawer/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'loading-bar',
    component: () =>
      import('@zeta-gds/components/loading-bar/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'time',
    component: () =>
      import('@zeta-gds/components/time/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'slider',
    component: () =>
      import('@zeta-gds/components/slider/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'tree',
    component: () =>
      import('@zeta-gds/components/tree/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'affix',
    component: () =>
      import('@zeta-gds/components/affix/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'row-column',
    component: () =>
      import('@zeta-gds/components/row-column/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'grid',
    component: () =>
      import('@zeta-gds/components/grid/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'breadcrumb',
    component: () =>
      import('@zeta-gds/components/breadcrumb/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'details',
    component: () =>
      import('@zeta-gds/components/details/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'list',
    component: () =>
      import('@zeta-gds/components/list/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'card',
    component: () =>
      import('@zeta-gds/components/card/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'card/card-action',
    component: () =>
      import('@zeta-gds/components/card/demos/enUS/card-action.demo-entry.md')
  },
  {
    path: 'card/action-area',
    component: () =>
      import(
        '@zeta-gds/components/card/demos/enUS/card-action-area.demo-entry.md'
      )
  },
  {
    path: 'card/card-content',
    component: () =>
      import('@zeta-gds/components/card/demos/enUS/card-content.demo-entry.md')
  },
  {
    path: 'card/card-footer',
    component: () =>
      import('@zeta-gds/components/card/demos/enUS/card-footer.demo-entry.md')
  },
  {
    path: 'card/card-header',
    component: () =>
      import('@zeta-gds/components/card/demos/enUS/card-header.demo-entry.md')
  },
  {
    path: 'card/card-media',
    component: () =>
      import('@zeta-gds/components/card/demos/enUS/card-media.demo-entry.md')
  },
  {
    path: 'card/card-selector',
    component: () =>
      import('@zeta-gds/components/card/demos/enUS/card-selector.demo-entry.md')
  },
  {
    path: 'card-standard',
    component: () =>
      import(
        '@zeta-gds/components/card-standard/demos/enUS/index.demo-entry.md'
      )
  },
  {
    path: 'avatar',
    component: () =>
      import('@zeta-gds/components/avatar/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'result',
    component: () =>
      import('@zeta-gds/components/result/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'section-header',
    component: () =>
      import('@zeta-gds/components/section/demos/enUS/header.demo-entry.md')
  },
  {
    path: 'section-footer',
    component: () =>
      import('@zeta-gds/components/section/demos/enUS/footer.demo-entry.md')
  },
  {
    path: 'section-container',
    component: () =>
      import('@zeta-gds/components/section/demos/enUS/container.demo-entry.md')
  },
  {
    path: 'facade',
    component: () =>
      import('@zeta-gds/components/facade/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'empty',
    component: () =>
      import('@zeta-gds/components/empty/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'code',
    component: () =>
      import('@zeta-gds/components/code/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'json-viewer',
    component: () =>
      import('@zeta-gds/components/json-viewer/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'typography',
    component: () =>
      import('@zeta-gds/components/typography/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'upload',
    component: () =>
      import('@zeta-gds/components/upload/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'table',
    component: () =>
      import('@zeta-gds/components/table/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'space',
    component: () =>
      import('@zeta-gds/components/space/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'rating',
    component: () =>
      import('@zeta-gds/components/rating/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'dynamic-tags',
    component: () =>
      import('@zeta-gds/components/dynamic-tags/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'ellipsis',
    component: () =>
      import('@zeta-gds/components/ellipsis/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'mention',
    component: () =>
      import('@zeta-gds/components/mention/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'page-header',
    component: () =>
      import('@zeta-gds/components/page-header/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'global-style',
    component: () =>
      import('@zeta-gds/components/global-style/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'image',
    component: () =>
      import('@zeta-gds/components/image/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'skeleton',
    component: () =>
      import('@zeta-gds/components/skeleton/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'calendar',
    component: () =>
      import('@zeta-gds/components/calendar/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'color-picker',
    component: () =>
      import('@zeta-gds/components/color-picker/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'tree-select',
    component: () =>
      import('@zeta-gds/components/tree-select/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'carousel',
    component: () =>
      import('@zeta-gds/components/carousel/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'collapse-transition',
    component: () =>
      import(
        '@zeta-gds/components/collapse-transition/demos/enUS/index.demo-entry.md'
      )
  },
  {
    path: 'scrollbar',
    component: () =>
      import('@zeta-gds/components/scrollbar/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'countdown',
    component: () =>
      import('@zeta-gds/components/countdown/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'number-animation',
    component: () =>
      import(
        '@zeta-gds/components/number-animation/demos/enUS/index.demo-entry.md'
      )
  },
  {
    path: 'watermark',
    component: () =>
      import('@zeta-gds/components/watermark/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'equation',
    component: () =>
      import('@zeta-gds/components/equation/demos/enUS/index.demo-entry.md')
  }
]

export const routes = [
  {
    name: 'home',
    path: '/:lang/:theme',
    component: () => import('../pages/home/index.vue')
  },
  {
    name: 'enGettingStarted',
    path: '/en-US/:theme/getting-started',
    component: () => import('../pages/Layout.vue'),
    children: enGettingStartedRoutes
  },
  {
    name: 'enFoundation',
    path: '/en-US/:theme/foundation',
    component: () => import('../pages/Layout.vue'),
    children: enFoundationRoutes
  },
  {
    name: 'enPatterns',
    path: '/en-US/:theme/pattern',
    component: () => import('../pages/Layout.vue'),
    children: enPatternRoutes
  },
  {
    name: 'enComponents',
    path: '/en-US/:theme/components',
    component: () => import('../pages/Layout.vue'),
    children: enComponentRoutes
  },
  {
    name: 'enStatus',
    path: '/en-US/:theme/status',
    component: () => import('../pages/Status.md')
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
      params: {
        lang: navigator.language === 'zh-CN' ? 'zh-CN' : 'en-US',
        theme: 'os-theme'
      }
    }
  }
]
