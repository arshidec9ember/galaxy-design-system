<!--anchor:on-->

# Installation

> Please note that @zeta-gds/components only supports Vue3. If you are using Vue2, you may look at other libraries.

## Setting up registry configuration

<z-alert type="warning">
    All packages related to GDS will only be installed if you have set up the registry correctly in .npmrc file.
</z-alert>

Make sure to add the below lines:-

```bash
@zeta-gds:registry="https://verdaccio.internal.olympus-world.zetaapps.in"
@zeta:registry="https://verdaccio.internal.olympus-world.zetaapps.in"
```

## npm

Use npm to install.

```bash
npm i @zeta-gds/components
```

## Fonts

GDS uses few variants of IBM Plex Sans and IBM Plex Mono fonts. Required font css file is already present in common assets which can be imported so that the components of GDS pick the correct fonts.

```bash
<link rel="stylesheet" href="https://hercules-assets.olympus-world.zetaapps.in/common-assets/3.0.159/fonts.css" />
```

## Icons

It is recommended to use [icones](https://icones.js.org) as it has many icons convering wide use cases.

If any icons are not present in the above link, Design defined icon package can be installed and used as well. Icons are listed [here](https://zeta-icons-docs0zetaapps.mum1-pp.zetaapps.in/#/).

```bash
npm i @zeta/icons
```

## Themes

Theme packages are already in place which can be installed to make use of aphrodite or any other available themes.

```bash
npm i @zeta-gds/themes.aphrodite
npm i @zeta-gds/themes.olympus
npm i @zeta-gds/themes.optum
```

<z-alert type="info"> ThemeConfigProvider can be used in the root to set the aphrodite theme globally. There is no need to set this for every component individually.</z-alert>

Example to initialize gds with the desired theme is stated below :-

```bash
<template>
  <div class="root">
    <ThemeConfigProvider>
      <!-- Any GDS components can be used here -->
      <z-input />
    </ThemeConfigProvider>
  </div>
</template>

<script setup>
import { ThemeConfigProvider } from '@zeta-gds/themes.aphrodite';
import { ZInput } from '@zeta-gds/components';

</script>
```

## Reference PR for consumption of GDS

To see the reference PR to set up GDS, Kindly [click here](https://bitbucket.org/zetaengg/vue-3-gds/pull-requests/1)
