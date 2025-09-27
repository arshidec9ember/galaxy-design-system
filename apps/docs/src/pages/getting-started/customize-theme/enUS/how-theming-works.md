# How Theming Works

## Anatomy of a Component Theme

Let's see how an individual [Alert component](https://bitbucket.org/zetaengg/galaxy-design-system/src/main/packages/components/src/alert/) is themed.

```text
├── index.ts
├── src
│   ├── Alert.tsx
│   └── styles
│       ├── index.cssr.ts
│       └── rtl.cssr.ts
└── styles
    ├── _common.ts
    ├── dark.ts
    ├── index.ts
    ├── light.ts
    └── rtl.ts
```

By default, the component is themed with the default theme variables or the Default theme.

- `_common.ts` contains default theme variables that are not color-based, such as padding and sizing configurations.
- `light.ts` contains light theme variables that are color-based, such as background color, text color, and border color.
- `dark.ts` inherits some light colors and overrides them with dark colors.

## Anatomy of a Theme Package

Lets see how a [theme package](https://bitbucket.org/zetaengg/galaxy-design-system/src/main/themes/aphrodite/) is structured.

```text
├── CHANGELOG.md
├── README.md
├── package.json
├── src
│   ├── ThemeConfigProvider.tsx
│   ├── index.ts
│   ├── theme-overrides-dark.ts
│   ├── theme-overrides-light.ts
│   ├── unconfigurable-style-dark.ts
│   ├── unconfigurable-style-light.ts
│   └── vars.ts
└── tsconfig.json
```

### `theme-overrides-light.ts`

This is primarily used to override the default theme variables for each component.

```ts
export const themeOverridesLight: GlobalThemeOverrides = {
  common: {
    // global variables
  },
  Alert: {
    borderNeutral: '1px solid #D4DBE3',
    colorNeutral: '#fafafc',
    titleTextColorNeutral: '#02284D',
    iconColorNeutral: '#30396d'
    // ... more variables
  },
  Avatar: {
    border: '2px solid #F0F3F7',
    iconColor: '#7D8E9F',
    textColor: '#FFF',
    color: '#F0F3F7'
  }
  // ... more components
}
```

### `theme-overrides-dark.ts`

This is used to override the default theme variables for each component with dark colors.

```ts
export const themeOverridesDark: GlobalThemeOverrides = {
  common: {
    // global variables
  },
  Alert: {
    borderNeutral: '1px solid #D4DBE3',
    colorNeutral: '#fafafc',
    titleTextColorNeutral: '#02284D',
    iconColorNeutral: '#30396d'
    // ... more variables
  },
  Avatar: {
    border: '2px solid #F0F3F7',
    iconColor: '#7D8E9F',
    textColor: '#FFF',
    color: '#F0F3F7'
  }
  // ... more components
}
```

### `unconfigurable-style-light.ts`

The following uses [css-render](https://www.npmjs.com/package/@css-render/plugin-bem) syntax to overrides entire css of a element block and its modifiers.

All the components follow [BEM](https://getbem.com/) (Block Element Modifier) methodology.

To configure the parts of a component, that cannot be configured using tokens and must be done using css overrides we create the following file.

```ts
import { changeColor } from 'seemly'
import { c, cB, cE, cM, cNotM } from '@zeta-gds/components'

export const unconfigurableStyle = c([
  // button styles css overrides
  cB(
    'button',
    `
  `
  )
])

export default unconfigurableStyle
```

### `unconfigurable-style-dark.ts`

Same as above but with dark colors.

```ts
import { changeColor } from 'seemly'
import { c, cB, cE, cM, cNotM } from '@zeta-gds/components'

export const unconfigurableStyle = c([
  // button styles css overrides
  cB(
    'button',
    `
  `
  )
])

export default unconfigurableStyle
```
