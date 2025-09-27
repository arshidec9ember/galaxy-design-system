# Creating Theme

The `@zeta-gds/components` library provides the `z-config-provider` component to customize the theme.

By default, all components have a **Default theme (black/white)**. However, you can create your own theme using the **theme editor** or by building a [**package**](https://bitbucket.org/zetaengg/galaxy-design-system/src/main/themes/olympus/) that exports `ThemeConfigProvider` which extends `ZConfigProvider` with overrides.

There are multiple ways to create a theme:

- [Theme Editor](#theme-editor)
- [Creating a Package (Design Tokens)](#creating-a-package-design-tokens)

## Theme Editor

No CSS (Scss, Less) needed.

The Theme Editor exports a `zeta-gds-theme-overrides.json` file of `GlobalThemeOverrides` type.

This file can be passed to `z-config-provider` as a prop to customize the theme. It can also be used to create a new `ThemeConfigProvider` object.

#### **Example Steps:**

- Open the Theme Editor.
- Go to Button component.
- Change the `textColor` to `#FF0000`.
- Click on the `Download` button to download the `zeta-gds-theme-overrides.json` file.
- Use the `zeta-gds-theme-overrides.json` file in your application.
- Pass the `zeta-gds-theme-overrides.json` file to `z-config-provider` as a prop in theme-overrides.

![Theme Editor](/assets/images/themeeditor.png) <z-theme-editor style="position: inherit;" popover-placement="bottom-start" />

Example of `zeta-gds-theme-overrides.json`:

```json
{
  "Button": {
    "textColor": "#5E74F4"
  }
}
```

## Creating a package (Design Tokens)

To customize the theme using variables, you need to build a theme [package](https://bitbucket.org/zetaengg/galaxy-design-system/src/main/themes/olympus/) that exports `ThemeConfigProvider` as `ZConfigProvider` and `GlobalThemeOverrides`. This package can then be used in your application.

**The directory structure of the [**package**](https://bitbucket.org/zetaengg/galaxy-design-system/src/main/themes/olympus/) is as follows:**

Also to understand how themes are mapped to components, refer to [How Theming Works](../docs/how-theming-works).

Start with adding the following files:

- `ThemeConfigProvider.tsx`
- `theme-overrides-light.ts`
- `theme-overrides-dark.ts`

#### `theme-overrides-light.ts`

Your light mode tokens will go here.

```ts
export const themeOverridesDark: GlobalThemeOverrides = {
  common: {
    // global variables
  },
  Switch: {
    opacityDisabled: '40%',
    railColor: 'green',
    railColorActive: 'orange',
    railColorHover: 'green',
    railColorActiveHover: 'orange',
    buttonBoxShadow: `0px 4px 8px -2px hsla(231, 95%, 15%, 0.25),
    0px 0px 1px 0px hsla(231, 95%, 15%, 0.3)`
  }
  // other components
}
```

#### `theme-overrides-dark.ts`

Your Dark mode tokens will go here.

```ts
export const themeOverridesDark: GlobalThemeOverrides = {
  common: {
    // global variables
  },
  Switch: {
    opacityDisabled: '40%',
    railColor: 'green',
    railColorActive: 'orange',
    railColorHover: 'green',
    railColorActiveHover: 'orange',
    buttonBoxShadow: `0px 4px 8px -2px hsla(231, 95%, 15%, 0.25),
    0px 0px 1px 0px hsla(231, 95%, 15%, 0.3)`
  }
  // other components
}
```

## Usage

The following example shows how to customize the theme in your application. The `themeOverrides` object contains the theme variables you want to customize.

`themeOverrides` is passed to `z-config-provider` as a prop to allow external developers to customize the theme, though it is optional and will override the default theme.

```html
<script>
  import { ThemeConfigProvider as ZConfigProvider } from '@zeta-gds/themes.{theme-name}'
</script>

<template>
  <z-config-provider>
    <my-app />
  </z-config-provider>
</template>
```
