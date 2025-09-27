/* eslint-disable space-before-function-paren */
// rubbish code here

import { h } from 'vue'
import { RouterLink } from 'vue-router'

export const renderMenuLabel = (option) => {
  if (!('path' in option) || option.label === '--Debug') {
    return option.label
  }
  return h(
    RouterLink,
    {
      to: option.path
    },
    { default: () => option.label }
  )
}

const appendCounts = (item) => {
  if (!item.children) {
    item.count = 1
    return item
  }
  if (item.children) {
    item.children.forEach(appendCounts)
    item.count = item.children.reduce((sum, item) => sum + item.count, 0)
    if (item.type === 'group') {
      item.en += ` (${item.count})`
    }
    return item
  }
}

function createItems(lang, theme, prefix, items) {
  const langKey = 'en'
  return items.map((rawItem) => {
    const item = {
      ...rawItem,
      key: rawItem.en,
      label: rawItem[langKey] || rawItem.en,
      path: rawItem.path
        ? `/${lang}/${theme}` + prefix + rawItem.path
        : undefined
    }
    // remove path from item object if rawItem.path is not defined
    if (!rawItem.path) {
      delete item.path
    }
    if (rawItem.children) {
      item.children = createItems(lang, theme, prefix, rawItem.children)
    }
    return item
  })
}

export function createFoundationMenuOptions({ lang, theme, mode }) {
  return createItems(lang, theme, '/foundation', [
    {
      en: 'Color',
      path: '/color'
    },
    {
      en: 'Design Tokens',
      path: '/design-tokens'
    },
    {
      en: 'Typography',
      path: '/typography'
    },
    {
      en: 'Spacing',
      path: '/spacing'
    },
    {
      en: 'Opacity',
      path: '/opacity'
    },
    {
      en: 'Radius',
      path: '/radius'
    },
    {
      en: 'Iconography',
      path: '/iconography'
    },
    {
      en: 'Layout',
      path: '/layout'
    },
    {
      en: 'States Naming',
      path: '/states-naming'
    }
  ])
}

export function createPatternMenuOptions({ lang, theme, mode }) {
  return createItems(lang, theme, '/pattern', [
    {
      en: 'Empty States',
      path: '/empty-states'
    },
    {
      en: 'Error States',
      path: '/error-states'
    },
    {
      en: 'Loading',
      path: '/loading'
    },
    {
      en: 'Navigation',
      path: '/navigation'
    },
    {
      en: 'Negative Actions',
      path: '/negative-actions'
    },
    {
      en: 'Timestamp',
      path: '/timestamp'
    }
  ])
}

export function createGettingStartedMenuOptions({ lang, theme, mode }) {
  return createItems(lang, theme, '/getting-started', [
    {
      en: 'Introduction',
      path: '/introduction'
    },
    {
      en: 'For Designers',
      path: '/for-designers'
    },
    {
      en: 'For Developers',
      children: [
        {
          en: 'Galaxy Design Components',
          path: '/for-developers'
        },
        {
          en: 'Installation',
          path: '/installation'
        },
        {
          en: 'Usage in SFC',
          path: '/usage-sfc'
        },
        {
          en: 'Import on Demand',
          path: '/import-on-demand'
        },
        {
          en: 'Supported Platforms',
          path: '/supported-platforms'
        },
        {
          en: 'Common Issues',
          path: '/common-issues'
        },
        {
          en: 'Controlled & Uncontrolled',
          path: '/controlled-uncontrolled'
        },
        {
          en: 'JSX/TSX',
          path: '/jsx'
        }
      ]
    },
    {
      en: 'Theming',
      children: [
        {
          en: 'Config Provider',
          path: '/config-provider'
        },
        {
          en: 'How Theming Works',
          path: '/how-theming-works'
        },
        {
          en: 'Customize Theme',
          path: '/customize-theme'
        },
        {
          en: 'Creating Theme',
          path: '/theme-creation'
        }
      ]
    },
    {
      en: 'Change Log',
      path: '/changelog'
    }
    // {
    //   en: 'Tech Architecture',
    //   path: '/tech-architecture'
    // },
    // {
    //   en: 'All Resources',
    //   path: '/all-resources'
    // },
    // {
    //   en: 'Community',
    //   path: '/community'
    // },
    // {
    //   en: 'i18n',
    //   path: '/i18n'
    // },
    // {
    //   en: 'Contributions',
    //   children: [
    //     {
    //       en: 'Designers',
    //       path: '/contributions-for-designers'
    //     },
    //     {
    //       en: 'Developers',
    //       path: '/contributions-for-developers'
    //     }
    //   ]
    // }
  ])
}

export function createComponentMenuOptions({ lang, theme, mode }) {
  return createItems(lang, theme, '/components', [
    appendCounts({
      en: 'Common Components',
      type: 'group',
      children: [
        {
          en: 'Avatar',
          enSuffix: true,
          path: '/avatar'
        },
        {
          en: 'Button',
          enSuffix: true,
          path: '/button'
        },
        {
          en: 'Link',
          enSuffix: true,
          path: '/link'
        },
        {
          en: 'Carousel',
          enSuffix: true,
          path: '/carousel'
        },
        {
          en: 'Accordion',
          enSuffix: true,
          path: '/accordion'
        },
        {
          en: 'Divider',
          enSuffix: true,
          path: '/divider'
        },
        {
          en: 'Dropdown',
          enSuffix: true,
          path: '/dropdown'
        },
        {
          en: 'Ellipsis',
          enSuffix: true,
          path: '/ellipsis'
        },
        {
          en: 'Gradient Text',
          enSuffix: true,
          path: '/gradient-text'
        },
        {
          en: 'Icon',
          enSuffix: true,
          path: '/icon'
        },
        {
          en: 'Page Header',
          enSuffix: true,
          path: '/page-header'
        },
        {
          en: 'Tag',
          enSuffix: true,
          path: '/tag'
        },
        {
          en: 'Typography',
          enSuffix: true,
          path: '/typography'
        },
        {
          en: 'Watermark',
          enSuffix: true,
          path: '/watermark'
        }
      ]
    }),
    appendCounts({
      en: 'Card Components',
      type: 'group',
      children: [
        {
          en: 'Card',
          enSuffix: true,
          path: '/card'
        },
        {
          en: 'Standard Card Template',
          enSuffix: true,
          path: '/card-standard'
        }
      ]
    }),
    appendCounts({
      en: 'Data Input Components',
      type: 'group',
      children: [
        {
          en: 'Cascader',
          enSuffix: true,
          path: '/cascader'
        },
        {
          en: 'Color Picker',
          enSuffix: true,
          path: '/color-picker'
        },
        {
          en: 'Checkbox',
          enSuffix: true,
          path: '/checkbox'
        },
        {
          en: 'Date Picker',
          enSuffix: true,
          path: '/date-picker'
        },
        {
          en: 'Super Date Picker',
          enSuffix: true,
          path: '/super-date-picker'
        },
        {
          en: 'Dynamic Input',
          enSuffix: true,
          path: '/dynamic-input'
        },
        {
          en: 'Dynamic Tags',
          enSuffix: true,
          path: '/dynamic-tags'
        },
        {
          en: 'Form',
          enSuffix: true,
          path: '/form'
        },
        {
          en: 'Input',
          enSuffix: true,
          path: '/input'
        },
        {
          en: 'Input Number',
          enSuffix: true,
          path: '/input-number'
        },
        {
          en: 'Mention',
          enSuffix: true,
          path: '/mention'
        },
        {
          en: 'Radio',
          enSuffix: true,
          path: '/radio'
        },
        {
          en: 'Rating',
          enSuffix: true,
          path: '/rating'
        },
        {
          en: 'Select',
          enSuffix: true,
          path: '/select'
        },
        {
          en: 'Slider',
          enSuffix: true,
          path: '/slider'
        },
        {
          en: 'Switch',
          enSuffix: true,
          path: '/switch'
        },
        {
          en: 'Time Picker',
          enSuffix: true,
          path: '/time-picker'
        },
        {
          en: 'Transfer',
          enSuffix: true,
          path: '/transfer'
        },
        {
          en: 'Tree Select',
          enSuffix: true,
          path: '/tree-select'
        },
        {
          en: 'Text Editor',
          enSuffix: true,
          path: '/text-editor'
        },
        {
          en: 'Upload',
          enSuffix: true,
          path: '/upload'
        }
      ]
    }),
    appendCounts({
      en: 'Data Display Components',
      type: 'group',
      children: [
        {
          en: 'Calendar',
          enSuffix: true,
          path: '/calendar'
        },
        {
          en: 'Countdown',
          enSuffix: true,
          path: '/countdown'
        },
        {
          en: 'Code',
          enSuffix: true,
          path: '/code'
        },
        {
          en: 'Json Viewer',
          enSuffix: true,
          path: '/json-viewer'
        },
        {
          en: 'Data Table',
          enSuffix: true,
          path: '/data-table'
        },
        {
          en: 'Details View',
          enSuffix: true,
          path: '/details-view'
        },
        {
          en: 'Filter',
          enSuffix: true,
          path: '/filter'
        },
        {
          en: 'Empty',
          enSuffix: true,
          path: '/empty'
        },
        {
          en: 'Equation',
          enSuffix: true,
          path: '/equation'
        },
        {
          en: 'Image',
          enSuffix: true,
          path: '/image'
        },
        {
          en: 'List',
          enSuffix: true,
          path: '/list'
        },
        {
          en: 'Number Animation',
          enSuffix: true,
          path: '/number-animation'
        },
        {
          en: 'Table',
          enSuffix: true,
          path: '/table'
        },
        {
          en: 'Facade',
          enSuffix: true,
          path: '/facade'
        },
        {
          en: 'Time',
          enSuffix: true,
          path: '/time'
        },
        {
          en: 'Timeline',
          enSuffix: true,
          path: '/timeline'
        },
        {
          en: 'Tree',
          enSuffix: true,
          path: '/tree'
        }
      ]
    }),
    appendCounts({
      en: 'Navigation Components',
      type: 'group',
      children: [
        {
          en: 'Affix',
          enSuffix: true,
          path: '/affix'
        },
        {
          en: 'Anchor',
          enSuffix: true,
          path: '/anchor'
        },
        {
          en: 'Back To Top',
          enSuffix: true,
          path: '/back-to-top'
        },
        {
          en: 'Breadcrumb',
          enSuffix: true,
          path: '/breadcrumb'
        },
        {
          en: 'Loading Bar',
          enSuffix: true,
          path: '/loading-bar'
        },
        {
          en: 'Menu',
          enSuffix: true,
          path: '/menu'
        },
        {
          en: 'Pagination',
          enSuffix: true,
          path: '/pagination'
        },
        {
          en: 'Stepper',
          enSuffix: true,
          path: '/stepper'
        },

        {
          en: 'Tabs',
          enSuffix: true,
          path: '/tabs'
        }
      ]
    }),
    appendCounts({
      en: 'Feedback Components',
      type: 'group',
      children: [
        {
          en: 'Alert',
          enSuffix: true,
          path: '/alert'
        },
        {
          en: 'Badge',
          enSuffix: true,
          path: '/badge'
        },
        {
          en: 'Dialog',
          enSuffix: true,
          path: '/dialog'
        },
        {
          en: 'Drawer',
          enSuffix: true,
          path: '/drawer'
        },
        {
          en: 'Message',
          enSuffix: true,
          path: '/message'
        },
        {
          en: 'Modal',
          enSuffix: true,
          path: '/modal'
        },
        {
          en: 'Notification',
          enSuffix: true,
          path: '/notification'
        },
        {
          en: 'Popconfirm',
          enSuffix: true,
          path: '/popconfirm'
        },
        {
          en: 'Popover',
          enSuffix: true,
          path: '/popover'
        },
        {
          en: 'Popselect',
          enSuffix: true,
          path: '/popselect'
        },
        {
          en: 'Progress',
          enSuffix: true,
          path: '/progress'
        },
        {
          en: 'Result',
          enSuffix: true,
          path: '/result'
        },
        {
          en: 'Skeleton',
          enSuffix: true,
          path: '/skeleton'
        },
        {
          en: 'Spinner',
          enSuffix: true,
          path: '/spinner'
        },
        {
          en: 'Tooltip',
          enSuffix: true,
          path: '/tooltip'
        },
        {
          en: 'Panel',
          enSuffix: true,
          path: '/panel'
        },
        {
          en: 'Floating Panel',
          enSuffix: true,
          path: '/floating-panel'
        }
      ]
    }),
    appendCounts({
      en: 'Layout Components',
      type: 'group',
      children: [
        {
          en: 'Layout',
          enSuffix: true,
          path: '/layout'
        },
        {
          en: 'Row Column',
          enSuffix: true,
          path: '/row-column'
        },
        {
          en: 'Grid',
          enSuffix: true,
          path: '/grid'
        },
        {
          en: 'Space',
          enSuffix: true,
          path: '/space'
        }
      ]
    }),
    appendCounts({
      en: 'Templates',
      type: 'group',
      children: [
        {
          en: 'Wizard',
          enSuffix: true,
          path: '/wizard'
        },
        {
          en: 'Section Header',
          enSuffix: true,
          path: '/section-header'
        },
        {
          en: 'Section Footer',
          enSuffix: true,
          path: '/section-footer'
        },
        {
          en: 'Section Container',
          enSuffix: true,
          path: '/section-container'
        }
      ]
    }),
    appendCounts({
      en: 'Utility Components',
      type: 'group',
      children: [
        {
          en: 'Collapse Transition',
          enSuffix: true,
          path: '/collapse-transition'
        },
        {
          en: 'Scrollbar',
          enSuffix: true,
          path: '/scrollbar'
        }
      ]
    }),
    appendCounts({
      en: 'Config Components',
      type: 'group',
      children: [
        {
          en: 'Config Provider',
          enSuffix: true,
          path: '/config-provider'
        },
        {
          en: 'Global Style',
          enSuffix: true,
          path: '/global-style'
        }
      ]
    })
  ])
}
