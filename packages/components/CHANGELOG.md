# @zeta-gds/components

## 2.6.0

### Minor Changes

- adding date picker comp

## 2.5.6

### Patch Changes

- adding side panel new functionality

## 2.5.5

### Patch Changes

- e51bcfc: filter comp changes

## 2.5.4

### Patch Changes

- eed4160: updating link, tag and json viewer comp

## 2.5.3

### Patch Changes

- 3fdf20a: floating panel changes

## 2.5.2

### Patch Changes

- 3b56472: changed the assests from pp to olympusn world

## 2.5.1

### Patch Changes

- 7ab5ed3: increasing timeout for build

## 2.5.0

### Minor Changes

- a244a99: typography tokenisation

## 2.4.1

### Patch Changes

- 85087b1: theme update for data table

## 2.4.0

### Minor Changes

- 77cc472: data table new feature added and fixed issues related to dropdown and switch

## 2.3.2

### Patch Changes

- 9ce038a: adding sidebar fixes and adding babel plugin

## 2.3.1

### Patch Changes

- affbbe1: menu comp changes

## 2.3.0

### Minor Changes

- 6341ffc: adding text editor componant and making component bug fixes

## 2.2.2

### Patch Changes

- Support for pagination when item count and page count are not present

## 2.2.1

### Patch Changes

- 07537b7: bugfix: handle nested filter keys when key has . in the field

## 2.2.0

### Minor Changes

- 48aa24a: changeset added

## 2.1.0

### Minor Changes

- e9c53b3: added optum theme

## 2.0.0

### Major Changes

- d787a4d: GDS tokenisation and grey to white theme changes

## 1.11.0

### Minor Changes

- 8adf64f: gds new view changes

## 1.10.3

### Patch Changes

- 2709f72: navigation, divider VD changes
- 2db5ac0: change made in input and tags

## 1.10.2

### Patch Changes

- a868c41: form checkbox changes

## 1.10.1

### Patch Changes

- 8433f41: empty comp audit issues

## 1.10.0

### Minor Changes

- ab9f541: remove the css from the root

## 1.9.3

### Patch Changes

- 00838f9: adding changeset for release

## 1.9.2

### Patch Changes

- List and link audit issues fixed

## 1.9.1

### Patch Changes

- fb259bb: patching themes for demoing release process

## 1.9.0

### Minor Changes

- aa1953b: Added additional data to render functions in Details View component

## 1.8.6

### Patch Changes

- 0831773: fixed columns shodow mounting issue in the datatable

## 1.8.5

### Patch Changes

- f57822c: issue while minimising from mulitple places has some issues

## 1.8.4

### Patch Changes

- 7d9dd92: TCH-33132: floating panel toggle added programatically

## 1.8.3

### Patch Changes

- 4257ac4: value and label cell span issue in details vuew

## 1.8.2

### Patch Changes

- 2f30ffb: fix: when date changes in date time range picker now reset to 00:00:00

## 1.8.1

### Patch Changes

- semver-version for gds created

## 1.8.0

### Minor Changes

- 3517d07: added support for tokenization

## 1.7.1

### Patch Changes

- 1a844e3: fixed for disabled daterange issue in the filter

## 1.7.0

### Minor Changes

- 34e8f18: audit fixes for floating panel and height overflow for filters

## 1.6.1

### Patch Changes

- b39c12c: filter reset issue fixes and css enhancement for tag component as well

## 1.6.0

### Minor Changes

- fe79e7f: replace slots as header-> navigation and extras->actions
- 247c0f6: Added support for box shadow in scrollbar component

### Patch Changes

- b9cae6a: Audit fix in details view

## 1.5.1

### Patch Changes

- a66ff38: support for shortcuts in Data Filter component
- d5f4097: side panel audit fixes done
- 8ee2a8a: Added new component CheckboxButton and support for segmented group

## 1.5.0

### Minor Changes

- bc42688: Add compose-box aka floating-panel to the system

### Patch Changes

- 4cc8c30: fix: [WIR-902](https://zeta-tm.atlassian.net/browse/WIR-902) filter issue fixes

## 1.4.1

### Patch Changes

- bea8a4a: Added feature for responsive in the menu for the horizontal variant
- bea8a4a: fix bugs for the docs site realignment and broken images

## 1.4.0

### Minor Changes

- c479254: - Filter Feature Addition

  - Support for data-filter using `v-model:data`
  - Support for custom filter
  - Reactivity fixes for filter at multiple levels
  - Enhanced user experiences for the filter
  - Support for `on-reset`, `on-apply`, `on-cancel` for the filter item
  - Support for `on-reset` for filters
  - Fixed `reset` feature

  ## Breaking Changes

  - `v-model:value` is replaced with `v-model` for the filter component

- f0021fd: Revamp galaxy design system site with new design. added support for design docs.

### Patch Changes

- eeb3ba7: fixed accordion v-show issues

## 1.3.1

### Patch Changes

- popover issue fixes for web components
- cd8cdc6: date picker shortcut orientation added support for default shortcut
- BUGFIX: table settings show-hide realignment fixes

## 1.3.0

### Minor Changes

- cf18c7a: table setting is added to the library

### Patch Changes

- 89e6d49: Horiontal scroll issue in jsonviewer

## 1.2.4

### Patch Changes

- 257e5f0: Add coverage for all the components
- d65399e: Details-view show and hide feature added with the help of height props
- 1b72dc3: Added page header demo templates

## 1.2.3

### Patch Changes

- de89884: upload file deletion issue fixes and remove warnings.

## 1.2.2

### Patch Changes

- 5f5c3f0: in tsconfig reverted jsx from preserve to react

## 1.2.1

### Patch Changes

- 8640c43: Added testcases for jest and html report
- 84e2d63: `data-table` unmount issue fixes
- 2465f9f: audit point fixes for details view and bug fixes for datatable

## 1.2.0

### Minor Changes

- 28289f3: creation of new filter component supporting list and date time filters.

### Patch Changes

- 2d6ecb3: replaced n-details-view -> z-details-view and fix other minor issues

## 1.1.0

### Minor Changes

- effbffd: sider-placement prop removed from layout component.alignment, resizable and overlay feature added to layout sider. panel component introduced.
- c25f953: `details-view` component introduced. which is similar to view-content 🎉🎉🎉

## 1.0.3

### Patch Changes

- a7332a9: Support for navigation in web component for anchor using a composable

## 1.0.2

### Patch Changes

- 1e03a7b: Usage commitizen and commitlint for standarization & sanitization of the commits
- 2afd1b5: Change value variable in json viewer for default value
- fce97a2: Added release script for streamlining packages release process
- 61f952d: Code Component theme changes according to the GDS Compliance.

## 1.0.1

### Patch Changes

- releasing 1.0.1

## 1.0.0

### Major Changes

- 850cbdf: Initial GDS Release

### Patch Changes

- 850cbdf: ShadowRoot support and component improvement
- 850cbdf: fixed issues for shadowRoot, **DEV**, global styles

## 1.0.0-beta.2

### Patch Changes

- 0a5add5: fixed issues for shadowRoot, **DEV**, global styles

## 1.0.0-beta.1

### Patch Changes

- af7dc01: ShadowRoot support and component improvement

## 1.0.0-beta.0

### Major Changes

- Initial GDS Release
