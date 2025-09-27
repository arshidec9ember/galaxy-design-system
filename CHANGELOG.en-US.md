# CHANGELOG

## NEXT_VERSION

### Breaking Changes

- `z-input`'s `suffix` to the back of `loading`, close [#4685](https://github.com/tusen-ai/naive-ui/issues/4685).
- Fix `z-log`'s `silent` attribute spelling problem, closes [#4875](https://github.com/tusen-ai/naive-ui/issues/4875).

### Fixes

- Fix `z-radio` export `radioProps` dosen't not includes `theme-overrides`.
- Fix `z-description-item`'s `span` doesn't work when `z-descriptions`'s `label-placement` is `'top'` if there's only single line, closes [#4874](https://github.com/tusen-ai/naive-ui/issues/4874).
- Fix `z-upload`'s `data` prop type can't include `Blob` element.
- Fix `z-select` allows option to be created with existed label, closes [#4703](https://github.com/tusen-ai/naive-ui/issues/4703)
- Fix `z-upload`'s `render-icon` prop's type.
- Fix `z-auto-complete`'s `onSelect` type, closes [#4617](https://github.com/tusen-ai/naive-ui/issues/4617).
- Fix `z-grid-item`'s suffix prop won't work with responsive config, closes [#4635](https://github.com/tusen-ai/naive-ui/issues/4635)
- Fix `z-tabs`'s `paneWrapperStyle` prop missing height after animation
- Fix `z-tree` should check all items instead of uncheck all if indeterminate checkbox is clicked, closes [#4941](https://github.com/tusen-ai/naive-ui/issues/4941).
- Fix the Popover was not displayed when the `z-internal-selection` was disabled and the mouse was moved over the '+n' tag. closes [#4789](https://github.com/tusen-ai/naive-ui/issues/4789)
- Fix `z-input` doesn't display the horizontal scroll bar when `type` is `textarea`, closes [#4570](https://github.com/tusen-ai/naive-ui/issues/4570).
- Fix `z-alert`'s content style problem, when there is no title and use closable, closes [#4588](https://github.com/tusen-ai/naive-ui/issues/4588).
- Fix `z-select`'s `empty` slot action then it is an interactive component, closes [#4700](https://github.com/tusen-ai/naive-ui/issues/4700).
- Fix `z-data-table` header and body's scrolling are not sync when using the keyboard, closes [#3941](https://github.com/tusen-ai/naive-ui/issues/3941).
- Fix `z-data-table` drag column causing text selection in Safari, closes [#4957](https://github.com/tusen-ai/naive-ui/issues/4957).
- Fix `z-data-table` ellipsis content in table cell would wrap with expand button when using tree data, closes [#3755](https://github.com/tusen-ai/naive-ui/issues/3755).
- Fix `useLoadingBar` can't finish loading when called `finish` method, closes [#4965](https://github.com/tusen-ai/naive-ui/issues/4965).
- Fix `z-select` can still trigger focus and blur event in the disabled state, closes [#4454](https://github.com/tusen-ai/naive-ui/issues/4454).
- Fix `z-steps` may have line wrap issue if step is more than 9.
- Fix `z-grid` v-show reports errors when switching multiple times, closes [#4422](https://github.com/tusen-ai/naive-ui/issues/4422).
- Fix `z-tree`'s `TreeOption`'s `checkboxDisabled` prop doesn't work when `check-on-click` is `true`.
- Fix rapid clicks on `z-date-input`'s buttons triggering a text select for the rest of the website.
- Fix `z-auto-complete`'s autocomplete menu's unexpected open when clicking the clear icon with the input not focused, closes [#4658](https://github.com/tusen-ai/naive-ui/issues/4658).
- Fix `z-input`'s `on-keyup` prop type, closes [#5101](https://github.com/tusen-ai/naive-ui/issues/5101)

### Features

- `z-drawer` adds `max-height`, `min-height`, `max-width` and `max-width` props.
- `z-progress` supports indicator slot when the `indicator-placement` is set to `'inside'` in the `'line'` type, closes [#4888](https://github.com/tusen-ai/naive-ui/issues/4888).
- `z-image-preview` adds `downaload` button, closes [#4302](https://github.com/tusen-ai/naive-ui/issues/4302).
- `z-transfer` adds `select-all-text` and `clear-text` prop, closes [#4910](https://github.com/tusen-ai/naive-ui/issues/4910).
- `z-tree` adds `scrollbar-props` prop, closes [#4021](https://github.com/tusen-ai/naive-ui/issues/4666).
- `z-select` adds `focusInput` `blurInput` methods.
- `z-tree-select` adds `focusInput` `blurInput` methods.
- `z-image-group` adds `on-preview-prev` `on-preview-next` prop
- `z-tree` adds `show-line` prop, closes [#3796](https://github.com/tusen-ai/naive-ui/issues/3796), [#4554](https://github.com/tusen-ai/naive-ui/pull/4554)
- `z-tree` adds node information for `render-switcher-icon` props, closes [#4815](https://github.com/tusen-ai/naive-ui/issues/4815).
- `z-input-number` export the `select` method.
- `z-data-table` adds `z-data-table-tr--expanded` class to expanded rows, and `z-data-table-tr z-data-table-tr--expand` class to the additional row, closes [#4420](https://github.com/tusen-ai/naive-ui/issues/4420).

### i18n

- Update `zhTW` locale.
- Add `svSE` locale.

## 2.34.4

### Fixes

- Fix `z-notification`'s `description` does not wrap when there is English, closes [#4609](https://github.com/tusen-ai/naive-ui/issues/4609).
- Fix `z-dynamic-input` can't access `value[index]` by `index` passed in `on-remove` prop.
- Fix `z-dynamic-input` doesn't return correct `index` in `on-create` callback.
- Fix `trTR` i18n, closes [#4231](https://github.com/tusen-ai/naive-ui/issues/4231).
- Fix `z-input`'s show password icon is offset when use both `password` and `disabled`, closes [#4364](https://github.com/tusen-ai/naive-ui/issues/4364).
- Fix `z-image` set `fallback-src` prop and lazy loading dosen't work, closes[#4480](https://github.com/tusen-ai/naive-ui/issues/4480).
- Fix `z-upload` warning cause by extraneous non-props attributes were passed to vue component `TransitionGroup` but could not be automatically inherited, closes [#4447](https://github.com/tusen-ai/naive-ui/issues/4447).
- Fix `z-menu` `show` `default` attribute spelling problem, closes [#4750](https://github.com/tusen-ai/naive-ui/issues/4750).
- Fix `z-icon-wrapper`'s theme error, closes [#4768](https://github.com/tusen-ai/naive-ui/issues/4768).
- Fix `z-popconfirm`'s action button should not be triggered multiple times，closes [#4687](https://github.com/tusen-ai/naive-ui/issues/4687).

### Feats

- `z-dynamic-input` adds `action` slot, closes [#3981](https://github.com/tusen-ai/naive-ui/issues/3981).
- `z-dynamic-input` add `disabled` prop, closes [#4055](https://github.com/tusen-ai/naive-ui/issues/4055).
- `z-data-table` adds `titleAlign` prop, closes [#3954](https://github.com/tusen-ai/naive-ui/issues/3954).
- `z-rate` exposes `index` in the default slot, closes [#4413](https://github.com/tusen-ai/naive-ui/issues/4413).
- `z-scrollbar` adds `size` prop, closes [#3896](https://github.com/tusen-ai/naive-ui/issues/3896).
- `z-data-table`'s `render-expand-icon` add `expanded` param, closes [#4439](https://github.com/tusen-ai/naive-ui/issues/4439).
- `z-tabs` adds `pane-wrapper-class` `pane-wrapper-style` prop.
- `z-collapse` adds `titlePadding` theme variable, closes [#4728](https://github.com/tusen-ai/naive-ui/issues/4728).
- `z-tabs` adds `placement` prop.
- `z-spin` adds `delay` prop.

### i18n

- Update `zhTW` locale.
- Add `faIR` locale.

## 2.34.3

### Fixes

- Fix `z-progress`'s `indicator-text-color` prop doesn't work when `indicator-placement` is `'inside'`.
- Fix `z-image` error while operating the previewed image, closes [#4157](https://github.com/tusen-ai/naive-ui/issues/4157).
- Fix `z-tree` cannot access `mergedFilterRef` before initialization error, closes [#4134](https://github.com/tusen-ai/naive-ui/issues/4134).
- Fix `z-menu` can't override submenu dropdown's `trigger` by `dropdown-props`, closes [#4147](https://github.com/tusen-ai/naive-ui/issues/4147).
- Fix `z-ellipsis` cannot be closed when using `keep-alive`, closes [#4079](https://github.com/tusen-ai/naive-ui/issues/4079).
- Fix `z-upload` doesn't show thumbnail for file with image type file name, closes [#4198](https://github.com/tusen-ai/naive-ui/issues/4198).
- Fix `z-input` style bug of x-small size with autosize prop, closes [#4167](https://github.com/tusen-ai/naive-ui/issues/4167).
- Fix `z-image` & `z-avatar` in `lazy` mode, after setting the `intersection-observer-options` `rootMargin` attribute, the preload does not take effect.

### Feats

- `z-tree` adds `get-children` prop, closes [#4128](https://github.com/tusen-ai/naive-ui/issues/4128).
- `z-badge` adds `offset` prop, closes [#4149](https://github.com/tusen-ai/naive-ui/issues/4149).
- `z-card` adds `tag` prop.
- demos can now use `<script setup />`.
- `z-pagination` adds `select-props` prop, closes [#4199](https://github.com/tusen-ai/naive-ui/issues/4199).
- `z-select` adds `show-on-focus` prop, closes [#4191](https://github.com/tusen-ai/naive-ui/issues/4191).
- `z-pagination` adds `goto` prop, closes [#4133](https://github.com/tusen-ai/naive-ui/issues/4133).
- `z-upload` won't set `file` field of file info to `null` after file is uploaded, closes [#3868](https://github.com/tusen-ai/naive-ui/issues/3868).
- `z-form` adds `labelFontWeight` theme variable, closes [#3516](https://github.com/tusen-ai/naive-ui/issues/3516).
- `z-radio` adds `labelFontWeight` theme variable, closes [#3516](https://github.com/tusen-ai/naive-ui/issues/3516).
- `z-checkbox` adds `labelFontWeight` theme variable, closes [#3516](https://github.com/tusen-ai/naive-ui/issues/3516).
- `z-tree`'s `on-load` prop allows returned promise to resolve `false` to finish loading effect, closes [#4038](https://github.com/tusen-ai/naive-ui/issues/4038).

### i18n

- Update koKr locale.

## 2.34.2

### Fixes

- Fix `z-config-provider`'s katex type issue.
- Fix `z-image` error in toolbar operation during preview, closes [#4144](https://github.com/tusen-ai/naive-ui/issues/4144).

## 2.34.1

### Fixes

- Fix `z-select` will print useless content in console in multiple select mode.
- Fix `z-tree` misses `getCheckedData` and `getIndeterminateData` methods, closes [#4064](https://github.com/tusen-ai/naive-ui/issues/4064).
- Fix `z-data-table`'s column's `align` doesn't work for table header, closes [#4063](https://github.com/tusen-ai/naive-ui/issues/4063).

## 2.34.0

### Breaking Changes

- Wrap a `div` container around the columns of `z-data-table` to optimize the layout of filter button, closes [#3853](https://github.com/tusen-ai/naive-ui/issues/3853).

### Feats

- 'themeOverRides' provide `labelFontWeight` for `z-form`, `z-radio`, `z-checkbox`, closes[#3516](https://github.com/tusen-ai/naive-ui/issues/3516)
- `z-avatar-group` exports `AvatarGroupOption` type, closes [#3879](https://github.com/tusen-ai/naive-ui/issues/3879).
- `z-transfer` adds `show-selected` prop, closes [#3711](https://github.com/tusen-ai/naive-ui/issues/3711).
- `z-data-table` adds `loading` slot, closes [#3865](https://github.com/tusen-ai/naive-ui/issues/3865).
- `z-mention` adds `on-update:show` prop, closes [#3882](https://github.com/tusen-ai/naive-ui/issues/3882).
- `z-tree` adds trigger node information for `on-update:expanded-keys`, `on-update:checked-keys` and `on-update:selected-keys` props, closes [#3885](https://github.com/tusen-ai/naive-ui/issues/3885).
- `z-tree-select` adds trigger node information for `on-update:expanded-keys` and `on-update:model-value` props, closes [#3885](https://github.com/tusen-ai/naive-ui/issues/3885).
- `z-tree` adds `getCheckedData` method.
- `z-tree` adds `getIndeterminateData` method.
- `z-tree-select` adds `getCheckedData` method.
- `z-tree-select` adds `getIndeterminateData` method.
- `z-tree-select` adds `focus` method.
- `z-tree-select` adds `blur` method.
- `z-cascader` adds `getCheckedData` method.
- `z-cascader` adds `getIndeterminateData` method.
- `z-input` adds `count-graphemes` prop, closes [#3967](https://github.com/tusen-ai/naive-ui/issues/3967).
- `z-cascader` adds `not-found` slot, closes [#3862](https://github.com/tusen-ai/naive-ui/issues/3862).
- `z-avatar` adds `img-props` prop, closes [#3963](https://github.com/tusen-ai/naive-ui/issues/3963).
- `z-data-table` adds `spin-props` prop, closes [#3649](https://github.com/tusen-ai/naive-ui/issues/3649).
- `z-button` adds `render-icon` prop, closes [#4007](https://github.com/tusen-ai/naive-ui/issues/4007).
- Add `z-equation` component.
- `z-image` adds `previewed-img-props` prop.
- `z-data-table` adds `scrollbar-props` prop, closes [#4021](https://github.com/tusen-ai/naive-ui/issues/4021).
- `z-upload` adds `should-use-thumbnail-url` prop, closes [#3861](https://github.com/tusen-ai/naive-ui/issues/3861).
- `z-upload` adds `render-icon` prop.
- `z-tree`'s `render-switcher-icon` prop is passed with `expanded` & `selected` state.
- `useDialog`'s option support `transformOrigin`, closes [#3901](https://github.com/tusen-ai/naive-ui/issues/3901).

### Fixes

- Fix `z-image` can be dragged by any button on mouse in preview mode, closes [#3950](https://github.com/tusen-ai/naive-ui/issues/3950).
- Fix `z-form-item`'s label text is in wrong position when `label-align="left"` and `indicator-placement="left"` and `label-placement="left"`, closes [#3871](https://github.com/tusen-ai/naive-ui/issues/3871).
- Fix `z-tree`'s dragging causes partial white screen in Chrome and Edge with version 106, closes [#3909](https://github.com/tusen-ai/naive-ui/issues/3909).
- Fix `z-select` shows wrong value in select box after `value-field` is set and `max-tag-count="responsive"` and remove selected option in overflow tag's popover, closes [#3869](https://github.com/tusen-ai/naive-ui/issues/3869).
- Fix `z-ellipsis` won't overflow in `z-card`'s title, closes [#3935](https://github.com/tusen-ai/naive-ui/issues/3935).
- Fix `z-timeline-item`'s `line-type="dashed"` not working when `z-timeline`'s `horizontal` is set, closes [#4014](https://github.com/tusen-ai/naive-ui/issues/4014).
- Fix `z-popover` doesn't wrap line if word is too long.
- Fix `z-date-picker` can't delete all input content in some cases, closes [#3922](https://github.com/tusen-ai/naive-ui/issues/3922).
- Fix `z-input`'s `autosize` prop doesn't work properly if there are multiple spaces, closes [#4027](https://github.com/tusen-ai/naive-ui/issues/4027).
- Fix `z-pagination`'s `endIndex` maybe incorrect in last page, closes [#4057](https://github.com/tusen-ai/naive-ui/issues/4057).
- Fix `z-image` doesn't prevent space pressing scroll behavior in preview mode, closes [#3919](https://github.com/tusen-ai/naive-ui/issues/3919).

### i18n

- Add arDZ locale.
- Add trTR locale.

## 2.33.5

### Fixes

- Fix `z-data-table` throws error on tree data check action, closes [#3832](https://github.com/tusen-ai/naive-ui/issues/3832).

## 2.33.4

### Fixes

- Fix `z-timeline-item`'s `title`'s `margin-bottom` can't be set by theme variable, closes [#3722](https://github.com/tusen-ai/naive-ui/issues/3722).
- Fix `z-timeline-item`'s `meta` part's `margin-bottom` is overrided when nested in horizontal and vertical mode.
- Fix `z-tree-select` would remove selected first option if it's clicked when placed in `label` tag, closes [#3715](https://github.com/tusen-ai/naive-ui/issues/3715).
- Fix `z-popover` will show after `disabled` is set to `true` then `false` if it's shown at first.
- Fix `z-select`'s overflow popover won't hide after removing all options in it when `maxTagCount="responsive"`, closes [#3801](https://github.com/tusen-ai/naive-ui/issues/3801).
- Fix `z-upload` may only allow selecting directory in Firefox, closes [#3798](https://github.com/tusen-ai/naive-ui/issues/3798).
- Remove `package.json`'s `exports` field due to its poor compatibility, closes [#3786](https://github.com/tusen-ai/naive-ui/issues/3786).
- Fix `createDiscreteApi` throws error in SSR environment, closes [#3813](https://github.com/tusen-ai/naive-ui/issues/3813).
- Fix `z-tree-select` has wrong focus behavior when `filterable` and in single select mode.
- Fix `z-input-number` may not update input when value is set in `on-blur` callback.

### Feats

- `z-collapse-item`'s `header-extra` & `header` slots support `collapsed` param, closes [#3723](https://github.com/tusen-ai/naive-ui/issues/3723).
- `z-loading-bar-provider` adds `to` prop, closes [#3724](https://github.com/tusen-ai/naive-ui/issues/3724).
- `z-data-table`'s `on-update:checked-row-keys` will pass current row data and state, closes [#3626](https://github.com/tusen-ai/naive-ui/issues/3626).
- `z-data-table` column adds `resizable` prop, closes [#3165](https://github.com/tusen-ai/naive-ui/issues/3165).
- `createDiscreteApi` contains Vue app in returned value.
- Export `LayoutContentInst` type, closes [#3743](https://github.com/tusen-ai/naive-ui/issues/3743).
- Export `CarouselInst` type, closes [#3742](https://github.com/tusen-ai/naive-ui/issues/3742).
- `z-collapse` adds `itemMargin` theme variable, closes [#3788](https://github.com/tusen-ai/naive-ui/issues/3788).
- `z-select` adds `ignore-composition` prop, closes [#3789](https://github.com/tusen-ai/naive-ui/issues/3789).
- `z-card` exports `CardSegmented` type, closes [#3775](https://github.com/tusen-ai/naive-ui/issues/3775).
- `z-date-picker` adds `next-month` slot, closes [#3570](https://github.com/tusen-ai/naive-ui/issues/3570).
- `z-date-picker` adds `next-year` slot, closes [#3570](https://github.com/tusen-ai/naive-ui/issues/3570).
- `z-date-picker` adds `prev-month` slot, closes [#3570](https://github.com/tusen-ai/naive-ui/issues/3570).
- `z-date-picker` adds `prev-year` slot, closes [#3570](https://github.com/tusen-ai/naive-ui/issues/3570).
- `z-pagination` adds `to` prop, closes [#3773](https://github.com/tusen-ai/naive-ui/issues/3773).
- `z-avatar` adds `render-placeholder` prop, closes [#3751](https://github.com/tusen-ai/naive-ui/issues/3751).
- `z-avatar` adds `render-fallback` prop, closes [#3751](https://github.com/tusen-ai/naive-ui/issues/3751).
- `z-avatar` adds `fallback` slot
- `z-transfer` adds `render-target-list` prop.
- `z-select` adds `show-checkmark` prop, closes [#3749](https://github.com/tusen-ai/naive-ui/issues/3749).
- `z-tree` adds `animated` prop, closes [#3784](https://github.com/tusen-ai/naive-ui/issues/3784).
- `z-slider` adds `markFontSize` theme variable, closes [#3820](https://github.com/tusen-ai/naive-ui/issues/3820).
- `z-avatar-group` adds `gap` theme variable, closes [#3819](https://github.com/tusen-ai/naive-ui/issues/3819).

## 2.33.3

### Feats

- `z-dialog` adds `onAfterLeave` in DialogOptions Properties, closes [#3662](https://github.com/tusen-ai/naive-ui/issues/3662).
- `z-dynamic-tags` export `DynamicTagsOption` type, closes [#3677](https://github.com/tusen-ai/naive-ui/issues/3677).
- `z-upload` adds `responseType` prop, closes [#3666](https://github.com/tusen-ai/naive-ui/issues/3666).
- `z-dropdown`'s `DropdownOption` adds `show` prop, closes [#3703](https://github.com/tusen-ai/naive-ui/issues/3703).
- `z-data-table` adds `summary-placement` prop, closes [#3681](https://github.com/tusen-ai/naive-ui/issues/3681).
- `z-tabs` will scroll to active tab, closes [#3683](https://github.com/tusen-ai/naive-ui/issues/3683).

### Performance

- Fix `z-menu`'s `value` will cause useless rendering of menu item, closes [#3670](https://github.com/tusen-ai/naive-ui/issues/3670).

### Fixes

- Fix `z-date-picker`'s style is unexpected in `inline-theme-disabled` mode, closes [#3655](https://github.com/tusen-ai/naive-ui/issues/3655).
- Fix `z-data-table` can't set `z-dropdown`'s `theme-overrides`, closes [#3613](https://github.com/tusen-ai/naive-ui/issues/3613).
- Fix `z-carousel` displays abnoramlly if `transform: scale` style is set, closes [#3684](https://github.com/tusen-ai/naive-ui/issues/3684).
- Fix `z-tree`'s node is disabled after `checkboxDisabled` is set, closes [#3620](https://github.com/tusen-ai/naive-ui/issues/3620).
- Fix `z-tree`'s switcher won't work when `:show-irrelevant-nodes="false"` is set & being searched, closes [#3647](https://github.com/tusen-ai/naive-ui/issues/3647).
- Fix `z-progress`'s graph may overflow if `type="circle"` and `stroke-width` is too large, closes [#3638](https://github.com/tusen-ai/naive-ui/issues/3638).

## 2.33.2

### Fixes

- Fix UMD bundle doesn't work, closes [#3642](https://github.com/tusen-ai/naive-ui/issues/3642).
- Fix `z-calendar`'s displayed month doesn't follow `default-model-value`, closes [#3645](https://github.com/tusen-ai/naive-ui/issues/3645).
- Fix `z-form-item`'s `indicator-placement` prop not working when set to `left`, closes [#3628](https://github.com/tusen-ai/naive-ui/issues/3628).
- Fix `z-upload`'s `OnBeforeUpload` return type can only be `Promise<boolean>`.

### Feats

- `z-radio` adds `colorActive` theme variable, closes [#3610](https://github.com/tusen-ai/naive-ui/issues/3610).

## 2.33.1

### Fixes

- Fix could not resolve "@vicons/ionicons5" error, closes [#3616](https://github.com/tusen-ai/naive-ui/issues/3616).

## 2.33.0

### Breaking Changes

- `z-rate`'s `default-model-value` prop's default value is changed from `0` to `null`.

### Fixes

- Fix `z-select`'s menu missing option check mark in SSR mode, closes <https://github.com/07akioni/naive-ui-nuxt-demo/issues/4>
- Fix `z-card`'s `embedded` prop not work in `z-dialog`, closes [#3592](https://github.com/tusen-ai/naive-ui/issues/3592).
- Fix `z-radio` warning when value prop type is boolean, closes [#3540](https://github.com/tusen-ai/naive-ui/issues/3540).
- Fix `z-tree` content width may overflow container, closes [#3561](https://github.com/tusen-ai/naive-ui/issues/3561).
- Fix `z-form-item` label text may overflow when it's left placement, closes [#3593](https://github.com/tusen-ai/naive-ui/issues/3593).

### Feats

- `z-menu` adds `disabled-field` prop.
- `z-rate` adds `clearable` prop.
- `z-slider` adds `keyboard` prop, closes [#3528](https://github.com/tusen-ai/naive-ui/issues/3528).
- Add `useDialogReactiveList` method, closes [#2041](https://github.com/tusen-ai/naive-ui/issues/2041).
- `DialogReactive` supports `onAfterEnter` prop, closes [#3569](https://github.com/tusen-ai/naive-ui/issues/3569).
- `DialogOptions` supports `class` prop, closes [#3591](https://github.com/tusen-ai/naive-ui/issues/3591).

## 2.32.2

### Fixes

- Fix `z-menu` extra not working in submenu, closes [#3390](https://github.com/tusen-ai/naive-ui/issues/3390).
- Fix `z-tree` can't expand node with `type='group'`, closes [#3388](https://github.com/tusen-ai/naive-ui/issues/3388).
- Fix `z-pagination`'s' `default-page-size` prop doesn't follows `page-sizes` prop, closes [#3369](https://github.com/tusen-ai/naive-ui/issues/3369).
- Added `exports` field in package.json [#3410](https://github.com/tusen-ai/naive-ui/pull/3410).
- Fix `z-dropdown` option prefix & suffix's z-index, closes [#3433](https://github.com/tusen-ai/naive-ui/issues/3433).
- Fix `z-input-number`'s peers theme can't be configured, closes [#3422](https://github.com/tusen-ai/naive-ui/issues/3422).
- Fix `z-tag` pointer should be not allow when disabled, closes [#3494](https://github.com/tusen-ai/naive-ui/issues/3494).
- Fix `z-transfer` throws error if value has no corresponding option, closes [#3406](https://github.com/tusen-ai/naive-ui/issues/3406).
- Fix `z-data-table` column `onSelect`'s type, closes [#3430](https://github.com/tusen-ai/naive-ui/issues/3430).
- Fix `z-pagination` don't trigger quick jumper on quick jumper blur, closes [#3387](https://github.com/tusen-ai/naive-ui/issues/3387).
- Fix some components works abnormally in open mode shadow DOM, closes [#3281](https://github.com/tusen-ai/naive-ui/issues/3281).
- Fix `z-carousel` in `loop='true'` and `effect='slide'`, When there are only two elements, the transition switching effect of the rotation is opposite, closes [#3414](https://github.com/tusen-ai/naive-ui/issues/3413).
- Fix `z-input` can't input value after compositing is interrupted by rerender, closes [#3503](https://github.com/tusen-ai/naive-ui/issues/3503).
- Fix `z-layout`'s `embedded` prop not working after `z-config-provider` has set `inline-theme-disabled`, closes [#3500](https://github.com/tusen-ai/naive-ui/issues/3500).
- Fix `z-input` has duplicate placeholder if disabled, closes [#3467](https://github.com/tusen-ai/naive-ui/issues/3467).
- Fix `z-date-picker`'s `iconColor` theme variable not working, closes [#3501](https://github.com/tusen-ai/naive-ui/issues/3501).
- Fix `z-time-picker`'s `iconColor` theme variable not working, closes [#3501](https://github.com/tusen-ai/naive-ui/issues/3501).
- Fix `z-select`'s `node-props` prop doesn't work.
- Fix Nuxt report `CSSRender is not a function` error on preview, closes [#3506](https://github.com/tusen-ai/naive-ui/issues/3506).
- Fix `z-data-table`'s rows disabled by `column.expandable` can still be expanded, closes [#3373](https://github.com/tusen-ai/naive-ui/issues/3373).
- Fix `z-input-number` click add or minus button quickly may trigger value change loop, closes [#3329](https://github.com/tusen-ai/naive-ui/issues/3329).
- Fix `z-switch` some theme variables can't use non-px value, closes [#2938](https://github.com/tusen-ai/naive-ui/issues/2938).
- Fix `z-input` with `resize` & `type="textarea"` set can't be resized in some cases, closes [#3479](https://github.com/tusen-ai/naive-ui/issues/3479).
- Fix `z-countdown`'s `reset` method doesn't work in `onFinish` callback, closes [#3536](https://github.com/tusen-ai/naive-ui/issues/3536).

### Feats

- `z-menu`'s `MenuOption` add `show` prop to set whether the Menu option is displayed, closes [#3334](https://github.com/tusen-ai/naive-ui/issues/3334).
- `z-alert` adds `bordered` prop, closes [#3358](https://github.com/tusen-ai/naive-ui/issues/3358).
- `z-tag` add `trigger-click-on-close` prop, closes [#3343](https://github.com/tusen-ai/naive-ui/issues/3343).
- `z-cascader` adds `disabled-field` prop, closes [#3338](https://github.com/tusen-ai/naive-ui/issues/3338).
- `z-list` adds `clickable` prop.
- `z-list` adds `hoverable` prop.
- `z-list` adds `show-divider` prop.
- `z-thing` adds `content-style` prop.
- `z-thing` adds `description-style` prop.
- `z-data-table` adds `render-expand-icon` prop.
- `z-tree` adds `disabled-field` prop.
- `z-tree` adds `keyboard` prop, closes [#3438](https://github.com/tusen-ai/naive-ui/issues/3438).
- `z-tree-select` adds `disabled-field` prop.
- `z-collapse-item` adds `disabled` prop, closes [#3408](https://github.com/tusen-ai/naive-ui/issues/3408).
- `z-pagination` adds `simple` prop.
- `z-cascader` adds `arrow` slot, closes [#3459](https://github.com/tusen-ai/naive-ui/issues/3459).
- `z-transfer` adds `source-filterable` prop, closes [#3407](https://github.com/tusen-ai/naive-ui/issues/3407).
- `z-transfer` adds `target-filterable` prop, closes [#3407](https://github.com/tusen-ai/naive-ui/issues/3407).
- `z-transfer`'s `filter` prop adds `from` param.
- `z-list` supports RTL.
- `z-drawer` supports RTL.
- `z-input` adds `render-count` prop.
- `z-input` adds `countTextColorDisabled` theme variable, closes [#3481](https://github.com/tusen-ai/naive-ui/issues/3481).
- `z-statistic` adds `valueFontSize` theme variable, closes [#3510](https://github.com/tusen-ai/naive-ui/issues/3510).
- `z-data-table` adds `sticky-expanded-rows` to allow expanded content remains sticky, closes [#3485](https://github.com/tusen-ai/naive-ui/issues/3485).
- `z-tree` adds `scrollTo` method, closes [#3480](https://github.com/tusen-ai/naive-ui/issues/3480).
- `z-pagination` adds `display-order` prop, closes [#3466](https://github.com/tusen-ai/naive-ui/issues/3466).
- `z-grid` adds `layout-shift-disabled` prop, closes [#3301](https://github.com/tusen-ai/naive-ui/issues/3301).

## 2.32.1

### Fixes

- Fix `z-drawer`'s warning when using `string` in `default-height` prop, closes [#3377](https://github.com/tusen-ai/naive-ui/issues/3377).
- Fix `z-transfer`'s `on-update:model-value` is not triggered when uncheck options, closes [#3393](https://github.com/tusen-ai/naive-ui/issues/3393).

### Feats

- `z-steps` supports RTL.

## 2.32.0

### Breaking Changes

- `z-transfer`'s UI is totally refactored. The original transfer component is renamed as `z-legacy-transfer` and will be removed in next major version.

### Fixes

- Fix `z-date-picker` will cancel selecting in range mode if click at disabled confirm button, closes [#3254](https://github.com/tusen-ai/naive-ui/issues/3254).
- Fix `z-button`'s `focusable` prop doesn't work, closes [#3292](https://github.com/tusen-ai/naive-ui/issues/3292).
- Fix `z-upload`'s `on-error` & `on-finish` props don't allow `() => void` type, closes [#3290](https://github.com/tusen-ai/naive-ui/issues/3290).
- Fix `z-select`'s placeholder may overflow if it's long.
- Fix `z-input` has is no indent at the prefix if `type="textarea"` and `:autosize="true"`, closes [#3238](https://github.com/tusen-ai/naive-ui/issues/3238).
- Fix `z-select` focus loss when click `action` slot in `filterable` and `multiple`, closes [#3247](https://github.com/tusen-ai/naive-ui/issues/3247).
- Fix `z-carousel`'s `autoplay` prop be `true` `hover` can't stop the play, closes [#3304](https://github.com/tusen-ai/naive-ui/issues/3304).
- Fix `z-tree` may throw error on node selection `expanded-keys`, closes [#3319](https://github.com/tusen-ai/naive-ui/issues/3319).
- Fix `z-avatar` shows placeholder after load fails, closes [#3315](https://github.com/tusen-ai/naive-ui/issues/3315).
- Fix `z-input-number` register `mouseup` event multiple times when hold on button.
- Fix all components' exported props type's prop is `readonly`.
- Fix `z-tree`'s `check-on-click` prop sometimes doesn't work.
- Fix `z-progress`'s `offset-degree` prop behaves incorrectly.

### Feats

- `z-checkbox-group`'s `on-update:model-value` prop adds trigger checkbox's value to params, closes [#3277](https://github.com/tusen-ai/naive-ui/issues/3277).
- `z-tree` supports RTL.
- `z-input` adds `scrollTo` method, closes [#3280](https://github.com/tusen-ai/naive-ui/issues/3280).
- `z-legacy-grid` supports RTL.
- `z-statistic` supports RTL.
- `z-thing` supports RTL.
- `z-transfer` add `render-source-label` prop.
- `z-transfer` add `render-target-label` prop.
- `z-transfer` add `render-source-list` prop.
- `z-scrollbar` supports RTL.
- `useDialog` supports `onEsc` prop.
- `z-watermark` adds `global-rotate` prop.
- `z-notification` add `keepAliveOnHover` props to control whether the notification will be closed when mouse hover, closes [#3249](https://github.com/tusen-ai/naive-ui/issues/3249).

## 2.31.0

### Breaking Changes

- `z-date-picker`'s `clearable` will control visibility of clear button if no `action` is set, closes [#1196](https://github.com/tusen-ai/naive-ui/issues/1196).
- `z-button`'s `native-focus-behavior` prop default value is changed to 'not on Safari'.

### Fixes

- Fix `z-data-table`'s column `render` prop's `index` param sequence exception when in expandable row, closes [#3153](https://github.com/tusen-ai/naive-ui/issues/3153).
- Fix `z-data-table` column's `colSpan` doesn't work correctly in virtual scroll mode, closes [#3052](https://github.com/tusen-ai/naive-ui/issues/3052).
- Fix `z-data-table` doesn't show `summary` row in virtual scroll mode, closes [#3202](https://github.com/tusen-ai/naive-ui/issues/3202).
- Fix `z-carousel` has wrong hierarchical relationship between when `effect` is `fade`, closes [#3227](https://github.com/tusen-ai/naive-ui/issues/3227).
- Fix `z-carousel` cannot slide under IOS, closes [#3106](https://github.com/tusen-ai/naive-ui/issues/3106).
- Fix `z-carousel` losing the size of content elements when rendering, closes [#3078](https://github.com/tusen-ai/naive-ui/issues/3078).
- Fix `z-cascader`'s filter menu doesn't show option path, closes [#3220](https://github.com/tusen-ai/naive-ui/issues/3220).
- Fix `z-cascader`'s `filter` prop may not get correct `path`.
- Fix `z-date-picker` menu's quarter text isn't same having `type="quarterrange"` and `type="quarter"`, closes [#3217](https://github.com/tusen-ai/naive-ui/issues/3217).
- Fix `z-notification`'s leave animation if content height overflows screen.
- Fix `z-dropdown`'s disabled option has hover style.
- Fix `z-dropdown`'s menu may shift when it's entering.
- Fix `z-dropdown`'s transform origin may not be correct in Chrome.
- Fix `z-radio-button` may not have correct cursor style, closes [#3243](https://github.com/tusen-ai/naive-ui/issues/3243).
- Fix `z-input`'s text color is too shallow with disabled state in Safari, closes [#3241](https://github.com/tusen-ai/naive-ui/issues/3241).
- Fix `z-input`'s separator may have line wrap.
- Fix all components' `user-select` style prop's effect on Safari.
- Fix `z-data-table` will prevent page scroll in virtual scroll mode.
- Fix `z-button` doesn't have pressed effect on Firefox.

### Feats

- `z-avatar` adds `lazy` prop.
- `z-avatar` adds `intersection-observer-options` prop.
- `z-number-animation` adds `on-finish` prop.
- `z-notification` supports RTL.
- Export all components' props object.
- `z-popover` adds `footer-style` prop.
- `z-popover` adds `footer` slot, closes [#3188](https://github.com/tusen-ai/naive-ui/issues/3188).
- `z-dropdown` adds `menu-props` prop, closes [#2885](https://github.com/tusen-ai/naive-ui/issues/2885).
- `z-data-table` adds `multiple` prop, closes [#3056](https://github.com/tusen-ai/naive-ui/issues/3056).
- `z-date-picker` would disable confirm button if end date is not selected, closes [#3226](https://github.com/tusen-ai/naive-ui/issues/3226).
- `z-tree` adds `check-on-click` prop to control `checked` status, closes [#2968](https://github.com/tusen-ai/naive-ui/issues/2968).
- `z-tree` adds `accrodion` prop, closes [#3129](https://github.com/tusen-ai/naive-ui/issues/3129).
- `z-countdown` adds `reset` method, closes [#3228](https://github.com/tusen-ai/naive-ui/issues/3228).
- `z-drawer` adds `resizable` prop.
- `z-drawer` adds `default-width` prop.
- `z-drawer` adds `default-height` prop.
- `z-drawer` adds `on-update:width` prop.
- `z-drawer` adds `on-update:height` prop.
- Update ukUA locale.
- `z-message` supports RTL.

## 2.30.8

### Fixes

- Fix `z-select`'s menu transition style, closes [#3211](https://github.com/tusen-ai/naive-ui/issues/3211).

## 2.30.7

### Fixes

- Fix `z-tabs`'s `bar-width` props invalid when `0` set, closes [#3171](https://github.com/tusen-ai/naive-ui/issues/3171).
- Fix `z-drawer` has log warnings of console when use `show-mask` prop, closes [#3172](https://github.com/tusen-ai/naive-ui/issues/3172).
- Fix `z-button` doesn't omit content if content is wrapped in ellipsis container, closes [#3178](https://github.com/tusen-ai/naive-ui/issues/3178).
- Fix `z-select` will remove select value in multiple mode in `form` if Enter key is pressed in input element. Closes [#3169](https://github.com/tusen-ai/naive-ui/issues/3169).
- Fix `z-select`'s filter prop not working, closes [#3175](https://github.com/tusen-ai/naive-ui/issues/3175).
- Fix `z-modal`'s mask may overlay over content if no preset is used, closes [#3204](https://github.com/tusen-ai/naive-ui/issues/3204).
- Fix `z-button`'s icon doesn't align correctly if it's too big or small.
- Fix `z-select`'s created options may repeat multiple times in menu, closes [#3206](https://github.com/tusen-ai/naive-ui/issues/3206).

### Feats

- `z-date-picker`'s `type` prop supports `'quarterrange'` and `'yearrange'`.
- `z-tree-select` adds `render-prefix` prop.
- `z-tree-select` adds `render-suffix` prop.
- `z-tree-select` adds `render-switcher-icon` prop.
- `z-tree-select` adds `node-props` prop.
- `z-tree-select` adds `render-label` prop, closes [#3197](https://github.com/tusen-ai/naive-ui/issues/3197).
- `z-tree-select` adds `render-tag` prop.
- `z-notification` adds `titleFontSize`, `metaFontSize`, `descriptionFontSize` theme variables.

## 2.30.6

### Fixes

- Fix `z-color-picker` can't input alpha value correctly manually.
- Fix some components don't work correctly if `__VUE_OPTIONS_API__` is set to `false`, closes [#3146](https://github.com/tusen-ai/naive-ui/issues/3146).
- Fix `z-grid` doesn't adjust it's content to fit responsive config in SSR page, closes [#2462](https://github.com/tusen-ai/naive-ui/issues/2462).
- Fix `z-modal` when many instances are activated at same time, `on-mask-click` will be triggered on every modal even only one mask is clicked [#3147](https://github.com/tusen-ai/naive-ui/issues/3147).
- Fix `z-data-table`'s column `ellipsis` prop's type doesn't allow `style` prop.
- Fix `z-data-table`'s column will lose box shadow when set to `ellipsis` & `fixed` simultaneously, closes [#3145](https://github.com/tusen-ai/naive-ui/issues/3145).
- Fix `z-image`'s `lazy` prop doesn't work on Safari & Firefox.

## 2.30.5

### Fixes

- Fix `z-input-group-label`'s content is abnormal in `z-drawer-content`, closes [#3115](https://github.com/tusen-ai/naive-ui/issues/3115).
- Fix `z-back-top` has log warnings of console when use `show` prop, closes [#3122](https://github.com/tusen-ai/naive-ui/issues/3122).
- Fix `volar.d.ts` components' type is `any`.
- Fix `z-grid-item` may not display correctly if `v-show` is used, closes [#3123](https://github.com/tusen-ai/naive-ui/issues/3123).
- Fix `z-select` clears input value on mouse enter when it's clearable and using IME.

### Feats

- 🌟 `z-image` adds `lazy` prop, closes [#3055](https://github.com/tusen-ai/naive-ui/issues/3055).
- `z-image` adds `intersection-observer-options` prop.
- `z-image` adds `placeholder` slot.
- Exports `NTooltipInst` type.
- `z-data-table` adds `render-cell` prop, closes [#3095](https://github.com/tusen-ai/naive-ui/issues/3095).
- `z-space` adds `wrap-item` prop.
- `z-data-table`'s `on-update:checked-row-keys` will pass row data, closes [#2215](https://github.com/tusen-ai/naive-ui/issues/2215), closes [#2265](https://github.com/tusen-ai/naive-ui/pull/2265)

## 2.30.4

### Fixes

- Fix `z-button` is focused after click with `:focusable="false"`, closes [#3071](https://github.com/tusen-ai/naive-ui/issues/3071).
- Fix `z-data-table` fixed selection may overlap with other fixed columns if it's width is not default, closes [#3067](https://github.com/tusen-ai/naive-ui/issues/3067).
- Fix `z-popselect` doesn't trigger `on-update:show` when it select value then menu is closed.
- Fix `z-popselect`'s width can't be set via `style`.
- Fix `z-date-picker`'s year & month quick jump may be disabled after `is-date-disabled` is set, closes [#3068](https://github.com/tusen-ai/naive-ui/issues/3068).
- Fix `z-layout` won't keep scroll state in `keep-alive` component, closes [#3054](https://github.com/tusen-ai/naive-ui/issues/3054).
- Fix `z-layout-sider` won't keep scroll state in `keep-alive` component.
- Fix `z-tree` may trigger loading multiple times.
- Fix `z-tree` throws error on async expanding data with `:expand-on-click="true"`, closes [#3089](https://github.com/tusen-ai/naive-ui/issues/3089).
- Fix `z-slider`'s tooltip has no enter transition when it's triggered by keyboard.
- Fix `z-slider` mark text's line wrap isn't correct when it appears at right-most position.
- Fix `z-upload`'s inner anchor element may show focus-visible outline style.
- Fix `z-upload` shows slot warning when `list-type="image-card"`.
- Fix `z-upload` image's corner may overflow item when `list-type="image-card"`.
- Fix `z-dynamic-tags`'s `on-create` prop not working.
- Fix virtual scroll stucking issue introduced by Chrome 102, closes [#3048](https://github.com/tusen-ai/naive-ui/issues/3048).
- Fix `z-upload-dragger` is almost transparent if disabled.

### Feats

- 🌟 `z-pagination` adds dropdown menu for fast jump button.
- 🌟 `z-input` adds `allow-input` prop.
- 🌟 `z-data-table` adds `default-expand-all` prop, closes [#3073](https://github.com/tusen-ai/naive-ui/issues/3073).
- 🌟 `z-modal` with inner popup component like `z-select` can handle esc key pressing correctly, closes [#2973](https://github.com/tusen-ai/naive-ui/issues/2973).
- `z-tree-select` adds `arrow` slot, closes [#3084](https://github.com/tusen-ai/naive-ui/issues/3084).
- `z-cascader` will show corresponding submenu after checkbox is clicked, closes [#3079](https://github.com/tusen-ai/naive-ui/issues/3079).
- `z-upload` will disable dragger when maximum number of files was reached.
- `z-select` adds `node-props` prop.
- `z-popselect` adds `node-props` prop.
- `z-popselect` adds `virtual-scroll` prop.
- `z-data-table` adds `scrollTo` method, closes [#2570](https://github.com/tusen-ai/naive-ui/issues/2570).
- `z-slider` adds `thumb` slot.

## 2.30.3

### Fixes

- Fix `z-cascader`'s overflow count tag's popover can't scroll after `filterable` is set, closes [#3061](https://github.com/tusen-ai/naive-ui/issues/3061).
- Fix `z-drawer`'s `show-mask` prop will warn if `'transparent'` is passed.
- Fix `z-calendar` doesn't call `on-panel-change` when date of other months is clicked, closes [#3063](https://github.com/tusen-ai/naive-ui/issues/3063).

### Feats

- 🌟 UMD usage is supported.
- `z-cascader` will expand menu to selected value, closes [#3058](https://github.com/tusen-ai/naive-ui/issues/3058).
- `z-space` will use `gap` CSS property if possible, closes [#3053](https://github.com/tusen-ai/naive-ui/issues/3053).

## 2.30.2

### Fixes

- Fix `z-select` recomputed options on menu close, improves performance.

## 2.30.1

### Feats

- `z-menu` adds `arrowColorChildActiveHover`, `itemIconColorChildActiveHoverHorizontal`, `itemIconColorChildActiveHover`,`itemTextColorChildActiveHoverHorizontal`, `itemTextColorChildActiveHover`, `arrowColorChildActiveHoverInverted`, `itemIconColorChildActiveHoverHorizontalInverted`, `itemIconColorChildActiveHoverInverted`,`itemTextColorChildActiveHoverHorizontalInverted`, `itemTextColorChildActiveHoverInverted` theme variables, closes [#2929](https://github.com/tusen-ai/naive-ui/issues/2929)

### Fixes

- Fix `z-menu` `node-props` is not applied to element with `role="menuitem"` but a inner element.
- Fix `z-menu` `node-props` doesn't work with `type="group"` option.

## 2.30.0

### Breaking Changes

- Theme variable `closeColor`, `closeColorHover`, `closeColorPressed` are renamed to `closeIconColor`, `closeIconColorHover`,`closeIconColorPressed`. `closeColorHover`, `closeColorPressed` still exist, controlling background color of close button.
- `z-tag`'s `colorXxx` theme variables are renamed to `colorBorderedXxx`. `colorXxx` still exists, controlling background color of borderless tag.

### Fixes

- Fix `createDiscreteApi` not working with `'loadingBar'`.
- Fix `z-popover` background color shifts when closed on theme changing.
- Fix `z-select`'s menu position doesn't sync with select box when select box's size is changed.
- Fix `z-scrollbar` can't show horizontal scrollbar, closes [#3047](https://github.com/tusen-ai/naive-ui/issues/3047).
- Fix `z-tree` node's pressed style is prior to selected style when `:block-line="true"` and `:selectable="true"`.
- Fix `z-slider` may leak event handler on edga case.
- Fix `z-data-table` doesn't restore scroll state when it's reactivated inside `keep-alive` component, closes [#2522](https://github.com/tusen-ai/naive-ui/issues/2522).
- Fix `z-image` zoom level doesn't fit ultra large image.
- Fix `z-menu`'s dropdown option text style when some of it's descendants is activated.
- Fix `z-input`'s `input-props` prop's `class` & `style` not working.

### Feats

- 🌟 `z-time-picker` adds `time-zone` prop, closes [#293](https://github.com/tusen-ai/naive-ui/issues/293).
- 🌟 `z-input-number` adds `parse` prop.
- 🌟 `z-input-number` adds `format` prop.
- 🌟 `z-input-number` adds `precision` prop, closes [#2068](https://github.com/tusen-ai/naive-ui/issues/2068), [#1859](https://github.com/tusen-ai/naive-ui/issues/1859)
- 🌟 `z-image` adds a switch to display the original size of the picture, closes [#3023](https://github.com/tusen-ai/naive-ui/issues/3023).
- 🌟 All components' close buttons use new style and are focusable.
- All components' select menu & dropdown menu's options use new style.
- `z-tag` adds `icon` slot.
- `z-tag` adds `strong` prop.
- `z-tag` adds background color in dark theme when `:bordered="false"`, closes [#1699](https://github.com/tusen-ai/naive-ui/issues/1699).
- `z-time` adds `time-zone` prop.
- `z-breadcrumb-item` adds `clickable` prop.
- `z-breadcrumb-item` uses new style, adds `itemLineHeight`, `itemBorderRadius`, `itemColorHover`, `itemColorPressed` theme variables.
- `z-notification` optimizes title style when it's too long.
- `z-drawer` optimizes title style when it's too long.
- `z-dialog` optimizes title style when it's too long.
- `z-card` optimizes title style when it's too long.

## 2.29.1

### Fixes

- Fix `z-tree` throw error when use `pattern` prop filter the tree node, closes [#2960](https://github.com/tusen-ai/naive-ui/issues/2960).
- Fix `z-watermark` not working when `cls-prefix` is set.
- Fix `z-dropdown`'s incorrect render arrow when `:show-arrow="true"` [#2977](https://github.com/tusen-ai/naive-ui/issues/2977)
- Fix `z-upload-dragger` doesn't take full width.
- Fix `z-global-style` doesn't clear body element's padding and margin.
- Fix `z-modal` won't clear document body's overflow style if it's unmounted when it is shown, closes [#3015](https://github.com/tusen-ai/naive-ui/issues/3015).
- Fix keyboard operation doesn't work in some specific old browsers.
- Fix `z-tabs` lacks tab padding when `justify-content` is `'start'`, `'end'` or `'center'`.
- Fix `z-tabs` doesn't update bar's position after `justify-content` or `size` is updated.
- Fix `z-switch` has no transition effect when toggle `disabled`.
- Fix `z-modal` & `z-drawer` will be closed on esc pressed during IME input, closes [#2989](https://github.com/tusen-ai/naive-ui/issues/2989).
- Fix `z-date-picker` can select time when is selecting date in date time range picker, closes [#3004](https://github.com/tusen-ai/naive-ui/issues/3004).
- Fix `z-pagination` has display issue when `:page-count="0"`, closes [#2970](https://github.com/tusen-ai/naive-ui/issues/2970).
- Fix `z-date-picker`'s `shortcuts` will be overrided by `default-time` when `type="datetimerange"`, closes [#3020](https://github.com/tusen-ai/naive-ui/issues/3020).
- Fix `z-image-group` switch pictures doesn't work in SSR mode.
- Fix `z-tabs`'s height transition sometimes not applied when `display-directive="show"` and `:animated="true"`, closes [#3035](https://github.com/tusen-ai/naive-ui/issues/3035).
- Fix `z-select`'s filter font size is a bit small in single select mode.
- Fix `z-select`'s count tag's popover is too high when overflow tag's count is small.
- Fix `z-date-picker`'s first time scroll state of items is not aligned when `type="monthrange"`.
- Fix `z-form-item`'s asterisk in required mode can be selected.
- Fix `z-list`'s color is incorrect inside `z-popover` in dark mode.

### Feats

- 🌟 `z-select` adds `label-field` prop, closes [#3018](https://github.com/tusen-ai/naive-ui/issues/3018).
- 🌟 `z-select` adds `value-field` prop, closes [#3018](https://github.com/tusen-ai/naive-ui/issues/3018).
- 🌟 `z-steps` adds `on-update:current` prop.
- 🌟 `z-date-picker` adds `panel` prop.
- 🌟 `z-data-table` adds `on-scroll` prop, closes [#3025](https://github.com/tusen-ai/naive-ui/issues/3025).
- 🌟 `FormItemRule` adds `renderMessage` prop, closes [#2525](https://github.com/tusen-ai/naive-ui/issues/2525).
- 🌟 Add `createDiscreteApi` to create message, notification, dialog, loading bar outside setup.
- `z-scrollbar` adds `trigger` prop.
- `z-input-number` adds `button-placement` prop.
- `z-select` adds `children-field` prop, closes [#3018](https://github.com/tusen-ai/naive-ui/issues/3018).
- `z-upload` adds `trigger-style` prop.
- `z-dropdown` adds `node-props` prop.
- `z-dropdown` adds `render-option` prop.
- `z-upload` adds `is-error-state` prop, closes [#2975](https://github.com/tusen-ai/naive-ui/issues/2975).
- `z-date-picker`'s `shortcuts` prop supports readonly tuple type.
- `z-step` adds `disabled` prop.
- `z-calendar` adds `header` slot, closes [#3036](https://github.com/tusen-ai/naive-ui/issues/3036).
- `z-tree` adds `expand-on-click` prop， [#2949](https://github.com/tusen-ai/naive-ui/issues/2949).

## 2.29.0

### Breaking Changes

- Since `z-pagination` supports `size` prop, some theme variables of `z-pagination` are changed.

### Fixes

- Fix `z-menu` use `render-icon` function render incorrect when returns `true`.
- Fix `z-tabs`'s `tabFontWeightActive` theme varialbe applies to all tabs, closes [#2926](https://github.com/tusen-ai/naive-ui/issues/2926).
- Fix `z-tree-select`'s `default-expand-all` not working.
- Fix `z-upload`'s `accept` prop doesn't work in drag & drop mode, closes [#2919](https://github.com/tusen-ai/naive-ui/issues/2919)
- Fix `z-calendar`'s `on-panel-change` returning wrong month value when clicking Today.
- Fix `z-time` throws error caused by `getTimezoneOffset` in SSR mode, closes [#2545](https://github.com/tusen-ai/naive-ui/issues/2545).
- Fix `z-transfer`'s search box's box-shadow is truncated.
- Fix `z-time-picker`'s input box's invalid value won't be cleared after blur.

### Feats

- `z-notification-provider`'s `placement` prop supports `'top'` and `'bottom'`, closes [#2930](https://github.com/tusen-ai/naive-ui/issues/2930).
- `z-pagination` add `size` prop, closes [#2888](https://github.com/tusen-ai/naive-ui/issues/2888).
- `z-config-provider` adds `preflight-style-disabled` prop.
- `z-pagination`'s quick jumper only allow integer input, closes [#2928](https://github.com/tusen-ai/naive-ui/issues/2928).
- `z-pagination` will jump to the first / last page when its value is out of range, closes [#2928](https://github.com/tusen-ai/naive-ui/issues/2928).
- `z-color-picker` adds `on-confirm` prop.
- `z-input` adds `clear-icon` slot.
- `z-date-picker` adds `date-icon` slot, closes [#2668](https://github.com/tusen-ai/naive-ui/issues/2668).
- `z-date-picker` adds `separator` slot, closes [#2668](https://github.com/tusen-ai/naive-ui/issues/2668).

### i18n

- Add nlNL locale.

## 2.28.4

### Fixes

- Fix `z-theme-editor`'s content can't be scrolled.

## 2.28.3

### Fixes

- Fix `z-menu`'s `dropdown-props` prop can't override `z-dropdown`'s `size` prop, closes [#2868](https://github.com/tusen-ai/naive-ui/issues/2868).
- Fix `z-switch` abnormal loading animation when switching state, closes [#2870](https://github.com/tusen-ai/naive-ui/issues/2870)
- Fix `z-data-table` doesn't show content when page is more than data's page, closes [#2840](https://github.com/tusen-ai/naive-ui/issues/2840).
- Fix `z-data-table`'s `cellProps` doesn't has correct generic type.
- Fix `z-data-table`'s `work-break` isn't `break-word`.
- Fix `z-list`'s css variable `z-merged-color` is not correct.
- Fix `MessageReactive`'s `destroy` method throws error if message has disappeared.
- Fix `z-ellpisis` can't show tooltip if content width is very close to container width, closes [#1393](https://github.com/tusen-ai/naive-ui/issues/1393), [#2899](https://github.com/tusen-ai/naive-ui/issues/2899).
- Fix `z-tree` can't use `width: fit-content;` style, closes [#2875](https://github.com/tusen-ai/naive-ui/issues/2875).
- Fix `z-dropdown`'s `on-update:show` prop will be triggered twice, closes [#2905](https://github.com/tusen-ai/naive-ui/issues/2905).
- Fix `z-select` can select option by pressing enter after options are cleared.
- Fix `z-data-table`'s `selection` and `expand` column can't set width.
- Fix `z-checkbox` contains selectable whitespace.
- Fix `DescriptionsProps` is misspelled as `DescriptionProps`.
- Fix `z-icon` misses `IconProps`.
- Fix `z-icon-wrapper` misses `IconWrapperProps`.
- Fix `z-countdown`'s display value is 1s faster than actual left time when `precision=0`, closes [#2910](https://github.com/tusen-ai/naive-ui/issues/2910).

### Feats

- `z-menu` adds `node-props` prop.
- `z-switch` adds `rubber-band` prop.
- `z-space`'s `justify` prop supports `'space-evenly'`.
- `z-popover` adds `content-style` prop.
- `z-popover` adds `header-style` prop.
- `z-popover` adds `scrollable` prop.
- `z-select` & `z-cascader` & `z-tree-select`'s overflow count tag's popover is scrollable.
- `z-data-table` adds `pagination-behavior-on-filter` prop.
- `z-date-picker`'s `type` prop supports `monthrange` option.
- `z-date-picker` adds `on-clear` prop.
- `z-date-picker` adds `on-confirm` prop, closes [#2852](https://github.com/tusen-ai/naive-ui/issues/2852).
- `z-data-table`'s `columns`'s element supports `minWidth` prop.
- `z-tree` adds `checkbox-placement` prop.
- `z-tree-select` adds `loading` prop, closes [#2857](https://github.com/tusen-ai/naive-ui/issues/2857).
- `z-modal` adds `block-scroll` prop, closes [#2556](https://github.com/tusen-ai/naive-ui/issues/2556).
- `z-drawer` adds `block-scroll` prop, closes [#2556](https://github.com/tusen-ai/naive-ui/issues/2556).
- `z-drawer` adds `show-mask` prop, closes [#2556](https://github.com/tusen-ai/naive-ui/issues/2846).
- `useDialog().xxx` supports `blockScroll` option, closes [#2556](https://github.com/tusen-ai/naive-ui/issues/2556).
- `useDialog().xxx` supports `autoFocus` option.
- `z-button` adds `native-focus-behavior` prop, closes [#2882](https://github.com/tusen-ai/naive-ui/issues/2882).
- `z-time-picker` adds `on-confirm` prop.
- `z-time-picker` adds `on-clear` prop.
- `z-time-picker` adds `on-update:show` prop.
- `z-time-picker` adds `show` prop.
- `z-date-picker` adds `on-update:show` prop.
- `z-date-picker` adds `show` prop.
- `z-date-picker` adds `default-calendar-start-time` prop, closes [#2732](https://github.com/tusen-ai/naive-ui/issues/2732).
- `z-date-picker` adds `default-calendar-end-time` prop, closes [#2732](https://github.com/tusen-ai/naive-ui/issues/2732).
- `z-date-picker` adds `bind-calendar-months` prop, closes [#2751](https://github.com/tusen-ai/naive-ui/issues/2751).
- `z-upload` adds `directory` prop.
- `z-upload` adds `directory-dnd` prop.
- `UploadFileInfo` adds `fullPath` and `batchId` attrs.
- `DataTableBaseColumn` adds `tree` attr, closes [#2757](https://github.com/tusen-ai/naive-ui/issues/2757).

## 2.28.2

### Fixes

- Fix `date-picker` `actions`'s type can't be `null`.
- Fix `time-picker` `actions`'s type can't be `null`.
- Fix `z-tree-select`'s meaningless warning.
- Fix `z-tree-select`'s `allow-checking-not-loaded` prop doesn't work.
- Fix `z-tree-select`'s menu position may not sync with trigger box if `:allow-checking-not-loaded="true"`.
- Fix `z-cascader`'s menu position may not sync with trigger box if `:allow-checking-not-loaded="true"`.

## 2.28.1

### Fixes

- Fix `notification` icon won't show after first notification is emitted in SSR mode, closes [#2793](https://github.com/tusen-ai/naive-ui/issues/2793).
- Fix `dialog` icon won't show after first dialog is displayed in SSR mode.
- Fix `z-drawer` & `z-modal` may overflow screen on opening if `:autofocus="true"`.
- Fix `z-tree-select`'s filter not working correctly when `children-field` is not set, closed [#2789](https://github.com/tusen-ai/naive-ui/issues/2789).
- Fix `z-tree-select`'s matched style is not cleared after filter value is cleared.
- Fix `z-tree-select`'s parent items in tree are selectable when `check-strategy="child"` and `:cascade="false"`, closes [#2780](https://github.com/tusen-ai/naive-ui/issues/2780).
- Fix `z-select`'s `empty` slot can't let `z-input` focus inside, closes [#2812](https://github.com/tusen-ai/naive-ui/issues/2812).
- Fix `z-select`'s menu is invisible in fullscreen mode, closes [#2722](https://github.com/tusen-ai/naive-ui/issues/2722).
- Fix `z-color-picker`'s `value` prop can't be `null`.
- Fix `z-table`'s border color shifts when switch bewteen different props.

### Feats

- `z-input-number` adds `add-icon` and `minus-icon` slots, closes [#2668](https://github.com/tusen-ai/naive-ui/issues/2668).
- `z-dynamic-input` adds `RTL` support.
- `z-table` adds `RTL` support.
- `z-collapse-transition` adds `RTL` support.
- `z-tree` adds `show-irrelevant-nodes` prop, closes [#2764](https://github.com/tusen-ai/naive-ui/issues/2764).
- `z-tree-select` adds `allow-checking-not-loaded` prop.
- `z-cascader` adds `allow-checking-not-loaded` prop.
- `z-tree` adds `allow-checking-not-loaded` prop.
- `z-button-group` adds `RTL` support.

### i18n

- Add ptBR locale.
- Add koKR locale.

## 2.28.0

### Breaking Changes

- `z-time` uses `formatDistanceStrict` rather than `formatDistance` in `date-fns`, closes [#2703](https://github.com/tusen-ai/naive-ui/issues/2703).

### Fixes

- Fix `z-tabs` has unexpected line animation when nested with `z-tabs`, closes [#2689](https://github.com/tusen-ai/naive-ui/issues/2689).
- Fix `z-popconfirm` with no body content has wrong margin top, closes [#2690](https://github.com/tusen-ai/naive-ui/issues/2690).
- Fix `z-tree-select` unexpected warning.
- Fix `z-calendar`'s disabled cells are clickable, closes [#2686](https://github.com/tusen-ai/naive-ui/issues/2686).
- Fix message icon won't show after first message is emitted in SSR mode, closes [#2721](https://github.com/tusen-ai/naive-ui/issues/2721).
- Fix `z-popconfirm`'s `positive-button-props` and `negative-button-props` props lack reactivity, closes [#2753](https://github.com/tusen-ai/naive-ui/issues/2753).
- Fix `z-step` has unexpected theme variable class.
- Fix `z-steps` displays uncorrectly when nested in vertical & horizontal mode.
- Fix `z-popconfirm`'s `positive-text` & `negetive-text` props don't allow `null` type.
- Fix `z-color-picker` can't be closed if mousedown.stop is set when click outside, closes [#2709](https://github.com/tusen-ai/naive-ui/issues/2709).
- Fix `z-tabs` switch animation is incorrect when `display-directive='show'`, closes [#2718](https://github.com/tusen-ai/naive-ui/issues/2718).

### Feats

- `z-radio` adds `label` prop, closes [#2707](https://github.com/tusen-ai/naive-ui/issues/2707).
- `z-drawer` adds `on-after-enter` and `on-after-leave` props, closes [#2698](https://github.com/tusen-ai/naive-ui/issues/2698).
- `z-data-table` adds `paginate-single-page` prop , closes [#2043](https://github.com/tusen-ai/naive-ui/issues/2043).
- `z-pagination` add `RTL` support.
- `z-alert` add `RTL` support.
- `z-data-table` adds `allow-checking-not-loaded` prop, closes [#2758](https://github.com/tusen-ai/naive-ui/issues/2758).

## 2.27.0

### Breaking Changes

- `z-menu` has some style changes.

### Fixes

- Fix `z-data-table`‘s row disorder when using `expand` type, closes [#2631](https://github.com/tusen-ai/naive-ui/issues/2631).
- Fix `z-popconfirm` doesn't has `setShow` & `syncPosition` methods.
- Fix `z-popselect` doesn't has `setShow` & `syncPosition` methods.
- Fix `z-menu` theme's peers missing `Dropdown`.
- Fix `z-color-picker` can't input 0 as unit's value, closes [#2680](https://github.com/tusen-ai/naive-ui/issues/2680).
- Fix `z-tree`'s scrollbar overflows in virtual scroll mode, closes [#2673](https://github.com/tusen-ai/naive-ui/issues/2673).
- Fix `z-layout-sider`'s `content-style` can't override `overflow: auto` prop, closes [#2671](https://github.com/tusen-ai/naive-ui/issues/2671).
- Fix `z-date-picker` displays panel item abnormally with `month` and `quarter` type in dark mode.
- Fix `z-dropdown` `onUpdateShow` not working.
- Fix `z-auto-complete` `onSelect` is triggered after `onUpdate:value`.
- Fix `z-data-table` `initiatorColumn` in `onUpdate:filters`'s type is an optional parameter.

### Feats

- `z-tree-select` adds `on-load` prop, closes [#2550](https://github.com/tusen-ai/naive-ui/issues/2550).
- `z-data-table` adds `on-load` prop.
- `z-cascader` adds `menu-props` prop, closes [#2600](https://github.com/tusen-ai/naive-ui/issues/2600).
- `z-cascader` adds `filter-menu-props` prop, closes [#2600](https://github.com/tusen-ai/naive-ui/issues/2600).
- `z-badge` adds `value` slot.
- `z-form` adds `validate-messages` prop.
- `z-data-table`'s column supports `cellProps` prop, closes [#2625](https://github.com/tusen-ai/naive-ui/issues/2625).
- `z-step` adds class to distinguish status.
- `z-popconfirm` adds `negative-button-props` props, closes [#2642](https://github.com/tusen-ai/naive-ui/issues/2642).
- `z-popconfirm` adds `positive-button-props` props, closes [#2642](https://github.com/tusen-ai/naive-ui/issues/2642).
- `z-pagination` adds `goto` slot.
- `z-input` adds `password-visible-icon` slot.
- `z-input` adds `password-invisible-icon` slot.
- `z-select` adds `status` prop.
- `z-input-number` adds `status` prop.
- `z-auto-complete` adds `status` prop.
- `z-cascader` adds `status` prop.
- `z-date-picker` adds `status` prop.
- `z-time-picker` adds `status` prop.
- `z-mention` adds `status` prop.
- `z-tree-select` adds `status` prop.
- `z-menu` adds `showOption` method, closes [#2562](https://github.com/tusen-ai/naive-ui/issues/2562).
- `z-dynamic-tags`'s `value` support object typed option.
- `z-dynamic-tags` adds `render-tag` prop, closes [#2526](https://github.com/tusen-ai/naive-ui/issues/2526).
- `z-dynamic-tags` adds `on-create` prop, closes [#2576](https://github.com/tusen-ai/naive-ui/issues/2576).
- `z-date-picker` adds `time-picker-props` props, closes [#2660](https://github.com/tusen-ai/naive-ui/issues/2660).
- `z-tabs` adds `trigger` prop, closes [#2679](https://github.com/tusen-ai/naive-ui/issues/2679).
- `z-menu` adds `itemColorHover`, `itemColorActiveHover`, `itemTextColorActiveHover`, `itemTextColorHorizontal`, `itemTextColorHoverHorizontal`, `itemTextColorActiveHorizontal`, `itemTextColorActiveHoverHorizontal`, `itemTextColorChildActiveHorizontal`, `itemIconColorActiveHover`, `itemIconColorHorizontal`, `itemIconColorHoverHorizontal`, `itemIconColorActiveHorizontal`, `itemIconColorActiveHoverHorizontal`, `itemIconColorChildActiveHorizontal`, `arrowColorActiveHover`, `itemColorHoverInverted`, `itemColorActiveHoverInverted`, `itemTextColorActiveHoverInverted`, `itemTextColorHorizontalInverted`, `itemTextColorHoverHorizontalInverted`, `itemTextColorChildActiveHorizontalInverted`, `itemTextColorActiveHorizontalInverted`, `itemTextColorActiveHoverHorizontalInverted`, `itemIconColorActiveHoverInverted`, `itemIconColorHorizontalInverted`, `itemIconColorHoverHorizontalInverted`, `itemIconColorActiveHorizontalInverted`, `itemIconColorActiveHoverHorizontalInverted`, `itemIconColorChildActiveHorizontalInverted`, `arrowColorActiveHoverInverted` theme variables, closes [#2598](https://github.com/tusen-ai/naive-ui/issues/2598).
- `z-carousel` adds `next-slide-style` and `prev-slide-style` props, closes [#2340](https://github.com/tusen-ai/naive-ui/issues/2340).
- `z-dialog` adds `negative-button-props` prop.
- `z-dialog` adds `positive-button-props` prop.
- `z-tabs` adds `animated` prop.

### i18n

- Add thTH locale.

## 2.26.4

### Fixes

- Fix `z-tree-select`s in `multiple` mode cannot delete options whose `default-model-value` attribute contains parent node, closes [#2605](https://github.com/tusen-ai/naive-ui/issues/2605).
- Fix `z-tree` may throw error when node is removed, closes [#2597](https://github.com/tusen-ai/naive-ui/issues/2597).
- Fix `useDialog` renders component with popup content with unexpected focus management behavior, closes [#2612](https://github.com/tusen-ai/naive-ui/issues/2612).
- Fix `z-tree-select`'s node sometimes can't be clicked when `check-strategy` is `'child'`.
- Fix `z-tree-select`'s emitted value can be not corresponding to `check-strategy` when delete option in select box with `check-strategy` is not `'all'`.

### Feats

- `useDialog` supports `closeOnEsc` prop.
- `z-data-table` exports `DataTableFilterState` type.
- `z-data-table` exports `DataTableSortState` type.

## 2.26.3

### Fixes

- Fix `z-button`'s loading icon shifts.

## 2.26.2

### Fixes

- Fix `z-cascader` arrow's loading animation last for too long time.
- Fix `z-select` menu doesn't follow theme.
- Fix `z-tabs` throws error without child, closes [#809](https://github.com/tusen-ai/naive-ui/issues/809).
- Fix `z-menu`'s font color is not changed after theme is changed in chrome 99, closes [#2563](https://github.com/tusen-ai/naive-ui/issues/2563). This is actual a bug of chrome, however we used a workaround and fixed it.
- Fix `z-date-picker`'s date item click trigger area is as large as cell size only in `'date'` mode.

### Feats

- `z-dynamic-tags` `input` slot add `deactivate` prop, closes [#2575](https://github.com/tusen-ai/naive-ui/issues/2575).
- `z-space` add `RTL` support.
- `z-avatar-group` add `RTL` support.
- `z-badge` add `RTL` support.
- `z-radio` add `RTL` support.
- `z-auto-complete` adds `focus` method.
- `z-auto-complete` adds `blur` method.

## 2.26.1

### Fixes

- Fix `base-loading` use css transition rather than svg animateTrantion to prevent js blocking, close [#2506](https://github.com/tusen-ai/naive-ui/issues/2506).
- Fix `z-time` throws error caused by `getTimezoneOffset`, closes [#2545](https://github.com/tusen-ai/naive-ui/issues/2545).
- Fix `z-modal`'s mask doesn't have enter & leave transition.
- Fix `z-timeline` has style conflict when vertical & horizontal `z-timeline` are nested, closes [#2549](https://github.com/tusen-ai/naive-ui/issues/2549).
- Fix `z-tree`'s arrow & loading switch animation isn't complete.

### Feats

- `z-time-line-item` adds `line-type` prop, closes [#2548](https://github.com/tusen-ai/naive-ui/issues/2548).
- `z-step` adds `icon` slot, closes [#2547](https://github.com/tusen-ai/naive-ui/issues/2547).
- `z-input-number` adds `autofocus` prop, closes [#2551](https://github.com/tusen-ai/naive-ui/issues/2551).
- `z-date-picker`'s date item click trigger area is as large as cell size, closes [#2552](https://github.com/tusen-ai/naive-ui/issues/2552).

## 2.26.0

### Breaking Changes

- Fix `z-tooltip`'s gap between arrow and body. `z-tooltip` can't be translucent anymore.

### Feats

- `z-popover` adds `arrow-point-to-center` prop.
- `z-config-provider` adds `inline-theme-disabled` prop.

## 2.25.8

### Fixes

- Fix `useMessage` loses styles.

## 2.25.7

### Fixes

- Fix `z-time-picker` still shows action bar when `:actions="null"`.
- Fix `z-input`'s content may overflow when `type="text"` and `autosize` is enabled, closes [#2505](https://github.com/tusen-ai/naive-ui/issues/2505).
- Fix `z-upload` put `file` field before other `FormData` fields, closes [#2504](https://github.com/tusen-ai/naive-ui/issues/2504)
- Fix `z-button` rtl support.
- Fix `z-form-item-row` can't call `z-form-item`'s methods.

### Feats

- `z-collapse` add `RTL` support.
- `useMessage` adds `create` methods.
- `useMessage` adds `showIcon` prop, closes [#2495](https://github.com/tusen-ai/naive-ui/issues/2495).
- `useMessage` supports `'default'` `type`.
- `z-checkbox` supports label line wrap, closes [#2419](https://github.com/tusen-ai/naive-ui/issues/2419).
- `z-radio` supports label line wrap, closes [#2419](https://github.com/tusen-ai/naive-ui/issues/2419).
- `z-checkbox` add `RTL` support.
- `z-input` add `RTL` support.
- `z-input-number` add `RTL` support.

## 2.25.5 (2022-02-24)

### Fixes

- Fix `z-col` can't be wrapped correctly when `span=6`, closes [#2497](https://github.com/tusen-ai/naive-ui/issues/2497).
- Fix `z-tabs` doesn't display border-bottom in scroll area on large number of tabs, closes [#2500](https://github.com/tusen-ai/naive-ui/issues/2500).

## 2.25.3 (2022-02-23)

### Fixes

- Fix `z-switch` can't use keyboard operation when checked value is customized.
- Fix `z-data-table`'s fixed column is covered by scroll content when placed inside popover.
- Fix `z-data-table` when the `filterOptions` value is 0, the filter will not take effect, closes [#2392](https://github.com/tusen-ai/naive-ui/issues/2392).
- Fix `z-data-table` cannot click selection checkbox if the selection column is a column's child.
- Fix `z-table`'s `border-color` abnormal style when this added dynamically, closes [#2403](https://github.com/tusen-ai/naive-ui/issues/2403).
- Fix `z-tree`'s `default-expand-all` prop doesn't work for dynamic data.
- Fix `z-form` when `model.xxx` is `undefined`, validator will use `null` as validation value, closes [#2486](https://github.com/tusen-ai/naive-ui/issues/2486).
- Fix `z-input` focus style's priority is lower than hover style, closes [#2480](https://github.com/tusen-ai/naive-ui/issues/2480).
- Fix `z-data-table` display issue when placed inside keep-alive component with virtual scroll, closes [#2183](https://github.com/tusen-ai/naive-ui/issues/2183).
- Fix `notification` enter & leave animation.

### Feats

- `z-tree-select` adds `clear-filter-after-select` prop.
- `z-cascader` adds `clear-filter-after-select` prop.
- `z-switch` adds `icon` slot.
- `z-switch` adds `checked-icon` slot.
- `z-switch` adds `unchecked-icon` slot.
- `z-tabs` uses `n` as CSS vars prefix.
- Add `z-watermark` component, closes [#1745](https://github.com/tusen-ai/naive-ui/issues/1745).
- `z-scrollbar` adds `scrollBy` method, closes [#2435](https://github.com/tusen-ai/naive-ui/issues/2435).
- `z-data-table`'s `summary`'s `value` supports `VNodeChild`, closes [#2339](https://github.com/tusen-ai/naive-ui/issues/2339).
- `z-input-number` adds hold click to increment, closes [#1293](https://github.com/tusen-ai/naive-ui/issues/1293).
- `z-description` adds `titleTextColor` theme variable.

### i18n

- Add skSK locale.
- Fix frFR locale.

## 2.25.2 (2022-02-11)

### Fixes

- Remove useless `console.log` in `resolveSlot`.
- Fix `z-tag` misses background color when `checkable=true`.
- Fix `z-tree` throws `Image` error in `happydom` testing environment.
- Fix `z-select` `max-tag-count` tag size doesn't follow select size.

### Feats

- `z-progress` props `type` add type `dashboard`.
- `z-progress` adds `gap-degree` prop.
- `z-progress` adds `gap-offset-degree` prop.
- `z-select` adds `clear-filter-after-select` prop, closes [#2352](https://github.com/tusen-ai/naive-ui/issues/2352).

### i18n

- Add plPL locale, closes [#2354](https://github.com/tusen-ai/naive-ui/issues/2354).
- Add eo locale.

## 2.25.1 (2022-02-06)

### i18n

- Add enGB locale.
- Fix deDE locale.

## 2.25.0 (2022-02-04)

### Breaking Changes

- Refactor `z-carousel`'s style when `show-arrow` is true.

### Fixes

- Fix `z-color-picker`'s hue & alpha slider handle are influenced by rail's box-shadow.
- Fix `z-form-item` prevent feedback padding when empty.
- Fix `z-button` has extra margin in safari.
- Fix `z-form`'s rules and `z-form-item`'s rule about `validator` and `asyncValidator`'s `rule` type is not `FormItemRule`, closes [#2299](https://github.com/tusen-ai/naive-ui/issues/2299).
- Fix `z-log` doesn't break line when line is too long, closes [#2298](https://github.com/tusen-ai/naive-ui/issues/2298).
- Fix `z-log` doesn't export `LogInst` type.
- Fix `z-popselect` action slot & empty slot now working.
- Fix `z-data-table` can't use percent as column width.
- Fix `z-select` trigger shows blank for a while when `filterable=true` and menu is closing.
- Fix `z-select`'s being created option is not cleared after menu is closed.
- Fix `z-select` can't input content when `show=false` and `filterable=true`, closes [#1723](https://github.com/tusen-ai/naive-ui/issues/1723).
- Fix `z-dropdown` has extra margin when `trigger="manual"`.
- Fix `web-types.json`'s `z-h1` ~ `z-h6` name.
- Fix `z-select` deletes option on backspace pressed while compisiting.
- Fix `z-select` uses disabled option as pending option after menu is opened.

### Feats

- `z-tabs` props `justify-content` add types `start` `center` `end`.
- `z-auto-complete` adds `placement` prop.
- `z-cascader` adds `placement` prop.
- `z-color-picker` adds `placement` prop.
- `z-date-picker` adds `placement` prop.
- `z-mention` adds `placement` prop.
- `z-select` adds `placement` prop.
- `z-slider` adds `placement` prop.
- `z-time-picker` adds `placement` prop.
- `z-tree-select` adds `placement` prop.
- `z-card` adds `header-extra-style` prop.
- `z-popover` adds `keep-alive-on-hover` prop, closes [#2326](https://github.com/tusen-ai/naive-ui/issues/2326).
- `z-input` adds `status` prop.
- Add `z-icon-wrapper` component.
- `z-popover` exports `PopoverPlacement` type.
- `z-drawer` exports `DrawerPlacement` type.
- `z-dynamic-tags` adds `input-props` prop.
- `z-notification-provider` adds `container-style` prop.
- `z-notification-provider` exports `NotificationPlacement` type.
- `z-notification-provider` exports `NotificationType` type.
- `z-tabs` add `bar-width` prop.
- `z-dynamic-input` adds `create-button-props` props.
- `z-dynamic-input` adds `create-button-default` slot.
- `z-dynamic-input` adds `create-button-icon` slot.
- `z-dynamic-input` adds `show-sort-button` prop, closes [#2121](https://github.com/tusen-ai/naive-ui/issues/2121).
- `z-select` can be used as tag input.
- `z-select` exports `SelectRenderLabel` type.
- `z-select` exports `SelectRenderOption` type.
- `z-select` exports `SelectRenderTag` type.
- `z-tree` adds `node-props` prop.

## 2.24.7 (2022-01-28)

### Fixes

- `z-popselect` doesn't work with `width="trigger"`.

### i18n

- Update jaJP locale.
- Update deDE locale.

## 2.24.6 (2022-01-26)

### Feats

- `z-icon` add `component` prop.

### Fixes

- Fix `z-dynamic-input` can add item when max is 0, closes [#2271](https://github.com/tusen-ai/naive-ui/issues/2271).
- Fix `z-dialog` useless `console.log`.

## 2.24.5 (2022-01-25)

### Fixes

- `z-input` placeholder has no line-wrap in `textarea` type.
- `z-date-picker` lacks space between panel year & month.

### Feats

- `z-color-picker` adds `disabled` prop.
- `z-date-picker` adds trigger area for year & month quick jump.

## 2.24.4 (2022-01-24)

### Fixes

- Update vueuc version.

## 2.24.3 (2022-01-24)

### Fixes

- Fix `z-layout-sider` has no border transition.

## 2.24.2 (2022-01-24)

### Fixes

- Fix `z-layout-sider` still occupies 1px after collapsed.
- Fix `z-code` doesn't break word when `word-wrap=true`.
- Fix `z-tab-pane`'s tab label area inherits `attrs`, closes [#2221](https://github.com/tusen-ai/naive-ui/issues/2221).
- Fix `z-image` preview popup background can still be scrolled, closes [#2241](https://github.com/tusen-ai/naive-ui/issues/2241).
- Fix `z-input` shows placeholder when browser auto completes it, closes [#2234](https://github.com/tusen-ai/naive-ui/issues/2234).
- Fix `z-input` placeholder word break issue with `type="textarea"`.
- Fix `z-avatar-group` extra count not correct after `max` is set, closes [#2244](https://github.com/tusen-ai/naive-ui/issues/2244).
- Fix `z-calendar` doesn't trigger `on-panel-change` on today button clicked.
- Fix `z-drawer` can't be closed by esc key when `mask-closable=false`, closes [#2233](https://github.com/tusen-ai/naive-ui/issues/2233).

### Feats

- `z-page-banner` adds `back` slot, closes [#2176](https://github.com/tusen-ai/naive-ui/issues/2176).
- `z-select` adds `reset-menu-on-options-change` prop, closes [#2168](https://github.com/tusen-ai/naive-ui/issues/2168).
- `z-select` adds `arrow` slot, closes [#2201](https://github.com/tusen-ai/naive-ui/issues/2201).
- `z-carousel` effect supports `'card'`.
- `z-input` doesn't use native scrollbar when `type="textarea"`, closes [#2242](https://github.com/tusen-ai/naive-ui/issues/2242), [#1172](https://github.com/tusen-ai/naive-ui/issues/1172).
- `z-number-animation` add `locale` prop, closes [#2181](https://github.com/tusen-ai/naive-ui/issues/2181).
- `z-number-animation`'s locale follows config provider.
- Expose `lightTheme`.
- `z-time-picker` adds `icon` slot, closes [#2228](https://github.com/tusen-ai/naive-ui/issues/2228).
- `z-tab-pane` adds `tab-props` prop, closes [#2221](https://github.com/tusen-ai/naive-ui/issues/2221).
- Add `CustomThemeCommonVars` to customize `useThemeVars`.
- `z-slider` adds `show-tooltip` prop, closes [#2212](https://github.com/tusen-ai/naive-ui/issues/2212).
- `z-select` adds `on-update:show` prop.
- `z-select` adds `focus` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `z-select` adds `blur` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `z-date-picker` adds `focus` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `z-date-picker` adds `blur` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `z-time-picker` adds `focus` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `z-time-picker` adds `blur` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `z-checkbox` adds `focus` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `z-checkbox` adds `blur` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `z-cascader` adds `focus` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `z-cascader` adds `blur` method, closes [#2202](https://github.com/tusen-ai/naive-ui/issues/2202).
- `z-upload` adds `input-props` prop, closes [#2204](https://github.com/tusen-ai/naive-ui/issues/2204).
- `z-data-table` col adds `render-sorter-icon` prop, closes [#1785](https://github.com/tusen-ai/naive-ui/issues/1785).
- `z-data-table` col adds `render-sorter` prop, closes [#1785](https://github.com/tusen-ai/naive-ui/issues/1785).
- `z-date-picker` easy navigation to specific month and year for `date` and `datetime` and `daterange` and `datetimerange` type.
- `z-modal` adds `close-on-esc` prop.
- `z-modal` adds `auto-focus` prop.
- `z-modal` adds `trap-focus` prop.
- `z-modal` adds `on-esc` prop.
- `z-drawer` adds `close-on-esc` prop.
- `z-drawer` adds `auto-focus` prop.
- `z-drawer` adds `trap-focus` prop.
- `z-drawer` adds `on-esc` prop.
- `z-upload` adds `clear` method, closes [#2247](https://github.com/tusen-ai/naive-ui/issues/2247).
- Add volar types.

### i18n

- Add esAR locale.
- Add itIT locale.

## 2.24.1 (2022-01-12)

### Fixes

- Fix install error.

## 2.24.0 (2022-01-12)

### Breaking Changes

- Fix `type PageBannerProps` name. It was mispelled as `PageBannerPorps` before.
- `z-image`'s `iconColor` theme variable is renamed as `toolbarIconColor`.

### Fixes

- Fix `z-carousel` when Carousel is a single picture dot still existence, closes [#1777](https://github.com/tusen-ai/naive-ui/issues/1777).
- Fix `z-upload` `on-finish` prop's `event` parameter type should be `ProgressEvent`.
- Fix `z-upload` doesn't allow 2xx status code except 200.
- Fix `z-form` when `validate` use `validateCallback`, cannot call Promise method.
- Fix `z-input-number` input integer end with 0 cannot update, closes [#2115](https://github.com/tusen-ai/naive-ui/issues/2115).
- Fix `z-back-top` allow document to be passed to `listen-to` prop.
- Fix `z-data-table`'s content can be clicked when loading, closes [#2134](https://github.com/tusen-ai/naive-ui/issues/2134).
- Fix `z-checkbox` doesn't show indeterminate icon in safari.
- Fix `z-progress`'s inner text of `line` type not aligned in center, closes[#2138](https://github.com/tusen-ai/naive-ui/issues/2138).
- Fix `z-message`'s `MessageReactive` type lacks `type` parameter.
- Fix `z-select` has different `padding` with `z-input`, closes [#2149](https://github.com/tusen-ai/naive-ui/issues/2149).
- Fix `z-tooltip` log errors in console when used in `z-select`'s `render-option`, closes [#1436](https://github.com/tusen-ai/naive-ui/issues/1436).
- Fix `z-select` log ResizeObserver errors when using `render-option` in safari, closes [#1671](https://github.com/tusen-ai/naive-ui/issues/1671).
- Fix `z-carousel` can't respond quickly and repeatedly on touch, closes [#1892](https://github.com/tusen-ai/naive-ui/issues/1892).
- Fix `z-carousel` style of boundary, closes [#1866](https://github.com/tusen-ai/naive-ui/issues/1866).
- Fix `z-carousel` cannot be clicked on the touchscreen, closes [#1882](https://github.com/tusen-ai/naive-ui/issues/1882).
- Fix `z-color-picker` default mode can only be rgb is default value is empty.

### Feats

- `z-code` adds `word-wrap` prop, closes [#2111](https://github.com/tusen-ai/naive-ui/issues/2111).
- `z-modal` adds `z-index` prop, closes [#2088](https://github.com/tusen-ai/naive-ui/issues/2088).
- `z-drawer` adds `z-index` closes.
- `z-drawer` adds wai-aria support.
- `useMessage`'s option support `render` prop.
- `z-data-table` `TableColumn` supports `string` typed `width`, closes [#2102](https://github.com/tusen-ai/naive-ui/issues/2102).
- `z-calendar` adds `on-panel-change` prop, closes [#2082](https://github.com/tusen-ai/naive-ui/issues/2082).
- `z-upload` adds `on-error` prop.
- `z-pagination` adds `label` slot.
- `z-tabs` adds `syncBarPosition` method, closes [#2120](https://github.com/tusen-ai/naive-ui/issues/2120).
- `z-form`, `z-form-item`'s `label-width` prop support `auto` option, closes [#2087](https://github.com/tusen-ai/naive-ui/issues/2087).
- `z-result` adds `icon` slot, closes [#2130](https://github.com/tusen-ai/naive-ui/issues/2130).
- `z-date-picker` adds `value-format` prop, closes [#2076](https://github.com/tusen-ai/naive-ui/issues/2076).
- `z-date-picker` adds `formatted-value` prop.
- `z-date-picker` adds `default-formatted-value` prop.
- `z-date-picker` adds `on-update:formatted-value` prop.
- `z-date-picker`'s `on-update:model-value` prop will pass formatted value out.
- `z-image` adds `show-toolbar-tooltip` prop.
- `z-image` adds more theme variables, closes [#1531](https://github.com/tusen-ai/naive-ui/issues/1531).
- `z-upload` adds `image-group-props` prop.
- `z-progress` adds `offset-degree` prop, closes [#2010](https://github.com/tusen-ai/naive-ui/issues/2010).
- `z-form-item` adds `feedback` slot, closes [#1142](https://github.com/tusen-ai/naive-ui/issues/1142).
- `z-form-item`'s `indicator-placement` prop adds `'right-hanging'` option, closes [#2094](https://github.com/tusen-ai/naive-ui/issues/2094).
- `z-cascader` adds `render-label` prop, closes [#2048](https://github.com/tusen-ai/naive-ui/issues/2048).
- `z-auto-complete` adds `render-option` prop, closes [#1629](https://github.com/tusen-ai/naive-ui/issues/1629).
- `z-auto-complete` adds `render-label` prop, closes [#1629](https://github.com/tusen-ai/naive-ui/issues/1629).
- `z-tree` adds `render-switcher-icon` prop, closes [#1551](https://github.com/tusen-ai/naive-ui/issues/1551).
- `z-message` exports `MessageType` type.
- `z-time-picker` adds `value-format` prop.
- `z-time-picker` adds `formatted-value` prop.
- `z-time-picker` adds `on-update:formatted-value` prop.
- `z-time-picker` adds `default-formatted-value` prop.
- `z-carousel` adds `default-index` prop.
- `z-carousel` adds `current-index` prop.
- `z-carousel` adds `show-arrow` prop.
- `z-carousel` adds `dot-type` prop, closes [#1931](https://github.com/tusen-ai/naive-ui/issues/1931).
- `z-carousel` adds `dot-placement` prop, closes [#1462](https://github.com/tusen-ai/naive-ui/issues/1462).
- `z-carousel` adds `slides-per-view` prop.
- `z-carousel` adds `space-between` prop.
- `z-carousel` adds `centered-slides` prop.
- `z-carousel` adds `direction` prop, closes [#1931](https://github.com/tusen-ai/naive-ui/issues/1931).
- `z-carousel` adds `loop` prop.
- `z-carousel` adds `effect` prop, closes [#1159](https://github.com/tusen-ai/naive-ui/issues/1159).
- `z-carousel` adds `transition-props` prop, closes [#1159](https://github.com/tusen-ai/naive-ui/issues/1159).
- `z-carousel` adds `transition-style` prop, closes [#1159](https://github.com/tusen-ai/naive-ui/issues/1159).
- `z-carousel` adds `draggable` prop.
- `z-carousel` adds `touchable` prop.
- `z-carousel` adds `mousewheel` prop.
- `z-carousel` adds `keyboard` prop.
- `z-carousel` adds `show-dots` prop.
- `z-carousel` adds `on-update:current-index` prop.
- `z-carousel` adds `arrow` slot.
- `z-carousel` adds `dots` slot.
- `z-form-item` adds `for` prop.
- `z-color-picker` adds `label` slot.
- `z-color-picker` adds `render-label` prop.
- `z-form-item` adds `label-props` prop.

## 2.23.2 (2021-12-29)

### Feats

- `<meta name="naive-ui-style" />` can be used to controll the component style's position.
- `z-empty` adds `show-icon` prop.
- `z-modal` adds a11y support, closes [#1877](https://github.com/tusen-ai/naive-ui/issues/1877).
- Add `z-avatar-group` component.
- `z-input-number` supports `loading` state.
- Add `z-countdown` component.
- Add `z-number-animation` component, closes [#1465](https://github.com/tusen-ai/naive-ui/issues/1465).
- `z-statistic` adds `tabular-nums` prop.
- `z-pagination` will give `itemCount` a approximate value derived from `pageSize` and `pageCount` if it's not set, closes [#2044](https://github.com/tusen-ai/naive-ui/issues/2044).
- `z-cascader` adds `on-update:show` prop, closes [#2049](https://github.com/tusen-ai/naive-ui/issues/2049).
- `z-scrollbar` uses `n` as CSS vars prefix.
- `z-popconfirm` uses `n` as CSS vars prefix.
- `z-gradient-text` uses `n` as CSS vars prefix.
- `z-form` uses `n` as CSS vars prefix.
- `z-pagination` uses `n` as CSS vars prefix.
- `z-loading-bar` uses `n` as CSS vars prefix.
- `z-empty` uses `n` as CSS vars prefix.
- `z-list` uses `n` as CSS vars prefix.
- `z-layout` uses `n` as CSS vars prefix.
- `z-message` uses `n` as CSS vars prefix.
- `z-mention` uses `n` as CSS vars prefix.
- `z-menu` uses `n` as CSS vars prefix.
- `z-popover` uses `n` as CSS vars prefix.
- `z-transfer` uses `n` as CSS vars prefix.
- `z-table` uses `n` as CSS vars prefix.
- `z-statistic` uses `n` as CSS vars prefix.
- `z-code` uses `n` as CSS vars prefix.
- `z-breadcrumb` uses `n` as CSS vars prefix.
- `z-slider` uses `n` as CSS vars prefix.
- `z-spin` uses `n` as CSS vars prefix.
- `z-select` uses `n` as CSS vars prefix.
- `z-result` uses `n` as CSS vars prefix.
- `z-calendar` uses `n` as CSS vars prefix.
- `z-card` uses `n` as CSS vars prefix.
- `z-cascader` uses `n` as CSS vars prefix.
- `z-color-picker` uses `n` as CSS vars prefix.
- `z-checkbox` uses `n` as CSS vars prefix.
- `z-data-table` uses `n` as CSS vars prefix.
- `z-date-picker` uses `n` as CSS vars prefix.
- `z-descriptions` uses `n` as CSS vars prefix.
- `z-drawer` uses `n` as CSS vars prefix.
- `z-dropdown` uses `n` as CSS vars prefix.
- `z-rate` uses `n` as CSS vars prefix.
- `z-radio` uses `n` as CSS vars prefix.
- `z-progress` uses `n` as CSS vars prefix.
- `z-skeleton` uses `n` as CSS vars prefix.
- `z-collapse` uses `n` as CSS vars prefix.
- `z-collapse-transition` uses `n` as CSS vars prefix.
- `z-thing` uses `n` as CSS vars prefix.
- `z-carousel` uses `n` as CSS vars prefix.
- `z-page-banner` uses `n` as CSS vars prefix.
- `z-image` uses `n` as CSS vars prefix.
- `z-input` uses `n` as CSS vars prefix.
- `z-icon` uses `n` as CSS vars prefix.
- `z-modal` uses `n` as CSS vars prefix.
- `z-notification` uses `n` as CSS vars prefix.

### Fixes

- Fix `z-form-item-gi` 's `validate` doesn't work, closes [#1901](https://github.com/tusen-ai/naive-ui/issues/1901).
- Fix `z-card` action's border-radius style.
- Fix `z-code`'s content is repeatly appended if language is not set, closes [#2034](https://github.com/tusen-ai/naive-ui/issues/2034).
- Fix `z-tabs`'s `tabTextColorActiveSegment` and `tabTextColorHoverSegment` theme variables not working, closes [#2038](https://github.com/tusen-ai/naive-ui/issues/2038).
- Fix `z-image` may keep keyboard handler after mounted.
- Fix `z-image` can't exit preview after esc is pressed when there's only 1 image, closes [#2042](https://github.com/tusen-ai/naive-ui/issues/2042).
- Fix `z-drawer-content`'s content doesn't scroll by default, ref [#2003](https://github.com/tusen-ai/naive-ui/issues/2003).
- Fix `z-popover` log warnings to console when manually set same zindex on multile instances and closes them, closes [#2050](https://github.com/tusen-ai/naive-ui/issues/2050).
- Fix `z-transfer` has no scrollbar in virtual scroll mode.
- Fix `z-input-number` cannot input decimals end with 0.

## 2.23.1 (2021-12-20)

### Fixes

- Fix `z-transfer` list doesn't follow container height when style.height is set, closes [#1879](https://github.com/tusen-ai/naive-ui/issues/1879).
- Fix `z-skeleton` & `z-gradient-text` cause runtime error in some old browsers, closes [#1867](https://github.com/tusen-ai/naive-ui/issues/1867).
- Fix `z-data-table` `ellipsis` prop in column doesn't support all `z-ellipsis`'s props, closes [#1891](https://github.com/tusen-ai/naive-ui/issues/1891).
- Fix `z-form`'s `blankHeightXxx` theme var doesn't follow `common.heightXxx`, closes [#1880](https://github.com/tusen-ai/naive-ui/issues/1880).
- Fix `z-date-picker`'s panel doesn't use `dateFormat` in locale, closes [#1793](https://github.com/tusen-ai/naive-ui/issues/1793).
- Fix `z-log` text color transition in theme switching.

### Feats

- `z-back-top` uses `n` as CSS vars prefix.
- `z-steps` uses `n` as CSS vars prefix.
- `z-switch` uses `n` as CSS vars prefix.
- `z-auto-complete` uses `n` as CSS vars prefix.
- `z-log` uses `n` as CSS vars prefix.
- `z-timeline` uses `n` as CSS vars prefix.
- `z-time-picker` uses `n` as CSS vars prefix.
- `z-avatar` uses `n` as CSS vars prefix.
- `z-dynamic-tags` uses `n` as CSS vars prefix.
- `z-tag` uses `n` as CSS vars prefix.
- `z-dialog` uses `n` as CSS vars prefix.
- `z-upload` uses `n` as CSS vars prefix.
- `z-tree` uses `n` as CSS vars prefix.
- `z-tree-select` uses `n` as CSS vars prefix.

## 2.23.0 (2021-12-17)

### Breaking Changes

- `z-switch` can no longer be clicked under `loading` status, closes [#1853](https://github.com/tusen-ai/naive-ui/issues/1853).

### Fixes

- Fix `z-data-table` 's horizontal scrollbar disappears when max-height is not set, closes [#1857](https://github.com/tusen-ai/naive-ui/issues/1857).
- Fix `z-input-number` cannot input negative decimals value, closes [#1858](https://github.com/tusen-ai/naive-ui/issues/1858).
- Fix `z-dialog` open new dialog again when pressing `enter` key, closes [#1559](https://github.com/tusen-ai/naive-ui/issues/1559).

### Feats

- `z-divider` uses `n` as CSS vars prefix.
- `typography` uses `n` as CSS vars prefix.
- `z-badge` uses `n` as CSS vars prefix.

## 2.22.0 (2021-12-15)

### Breaking Changes

- `z-button` can no longer be clicked under `loading` status, closes [#1628](https://github.com/tusen-ai/naive-ui/issues/1628).

### Fixes

- Fix `z-alert`'s `header` slot unable to display normally.
- Fix `z-data-table`'s pagination `onUpdatePageSize` prop does't trigger, closes [#1774](https://github.com/tusen-ai/naive-ui/issues/1774).
- Fix `z-data-table` can select rows when table is loading, closes [#1812](https://github.com/tusen-ai/naive-ui/issues/1812).
- Fix `z-tag` line-height is too low that clamps the content.
- Fix `z-select` displays with mistake in input if `filterable` is `true`, closes [#1823](https://github.com/tusen-ai/naive-ui/issues/1823).
- Fix `z-page-banner`'s content has margin-top when header is not displayed, closes [#1795](https://github.com/tusen-ai/naive-ui/issues/1795).
- Fix `z-avatar` `color` prop not working.
- Fix `z-avatar`'s inner icon has wrong size.
- Fix `z-image` lacks scoped style's scope-id, closes [#1788](https://github.com/tusen-ai/naive-ui/issues/1788).
- Fix `z-radio` click event will be triggered twice, closes [#1680](https://github.com/tusen-ai/naive-ui/issues/1680).
- Fix `z-data-table` layout display incorrect when the table is empty and min-height set, closes [#1809](https://github.com/tusen-ai/naive-ui/issues/1809).
- Fix `z-data-table`'s summary has hover style.
- Fix `z-data-table` fixed group column box-shadow error and right fixed column order error, closes [#1832](https://github.com/tusen-ai/naive-ui/issues/1832).
- Fix `z-anchor`'s hover & active style.
- Fix `z-data-table`'s header fixed column style on data is empty.

### Feats

- `z-tree-select` adds `menu-props` prop.
- `z-tree-select` adds `action` slot, closes [#1765](https://github.com/tusen-ai/naive-ui/issues/1765).
- `z-tree-select` adds `empty` slot.
- `z-cascader` adds `empty` slot.
- `z-popselect` adds `action` slot.
- `z-popselect` adds `empty` slot.
- `z-data-table` will check all if indeterminate header checkbox is clicked, closes [#1827](https://github.com/tusen-ai/naive-ui/issues/1827).
- `z-button` uses `n` as CSS vars prefix, closes [#1808](https://github.com/tusen-ai/naive-ui/issues/1808).
- `z-date-picker` adds `default-time` prop.
- `z-alert` uses `n` as CSS vars prefix.
- `z-date-picker`'s `type` prop support `quarter` option.
- `z-anchor` uses `n` as CSS vars prefix.

### i18n

- Add zhTW locale.

## 2.21.5 (2021-12-07)

### Fixes

- Fix `z-input` click clear icon does't trigger `change` event, closes [#1754](https://github.com/tusen-ai/naive-ui/issues/1754).
- Fix `z-input-number` the cursor moves when press arrow keys to change value, closes [#1759](https://github.com/tusen-ai/naive-ui/issues/1759).

### Feats

- `z-date-picker`'s default format follows i18n.

### i18n

- Add frFR locale.

## 2.21.4 (2021-12-06)

### Fixes

- Fix `z-date-picker` has no placeholder when `type` is `year`.
- Fix `z-element` doesn't export `ZEl` alias name.
- Fix `z-upload` still shows upload trigger when max limit is reached in `image-card` mode, closes [#1744](https://github.com/tusen-ai/naive-ui/issues/1744).
- Fix `z-form`'s `FormValidate` type lacks `shouldRuleBeApplied` parameter, closes [#1747](https://github.com/tusen-ai/naive-ui/issues/1747).
- Fix `z-upload` is displayed vertically in `z-form` in `image-card` mode, closes [#1746](https://github.com/tusen-ai/naive-ui/issues/1746).
- Fix `z-upload`'s file list's top margin if trigger is hidden.
- Fix `z-upload` shows normal file status when response has 4xx status, closes [#1741](https://github.com/tusen-ai/naive-ui/issues/1741).

### Feats

- `z-upload` adds `show-trigger` prop.
- `z-data-table` will ignore `children` with length 0 in tree data mode, closes [#1703](https://github.com/tusen-ai/naive-ui/issues/1703).

## 2.21.3 (2021-12-03)

### Fixes

- Fix `z-theme-editor` throw error when click button component, closes [#1708](https://github.com/tusen-ai/naive-ui/issues/1708).
- Fix `z-input`'s color is abnormal in Android WeChat, closes [#1705](https://github.com/tusen-ai/naive-ui/issues/1705).
- Fix `z-input` 's `borderHover` theme variable doesn't work, closes [#1704](https://github.com/tusen-ai/naive-ui/issues/1704).
- Fix `z-dialog`'s `content` word-break.
- Fix `z-input-number` cannot input decimals value.
- Fix `z-data-table`'s header & body may have wrong border radius, closes [#1712](https://github.com/tusen-ai/naive-ui/issues/1712).
- Fix `z-button`'s `colorOpacityXxx` theme vars are not string typed.

### Feats

- `z-switch` adds `rail-style` prop, closes [#1718](https://github.com/tusen-ai/naive-ui/issues/1718).
- `z-image` adds `preview-disabled` props, closes [#1647](https://github.com/tusen-ai/naive-ui/issues/1647).
- `z-image` adds `on-load` & `on-error` prop.
- `z-image` adds `fallback-src` prop.
- `z-data-table` adds `on-update:expanded-row-keys` prop.
- `z-tree` adds `watch-props` prop.

## 2.21.2 (2021-11-29)

### Fixes

- Fix `z-slider` disabled tooltip at the wrong time.
- Fix `z-slider` incorrect fill color style, closes [#1670](https://github.com/tusen-ai/naive-ui/issues/1670).
- Fix `z-data-table`'s pagination `onUpdatePage` prop trigger twice, closes [#1666](https://github.com/tusen-ai/naive-ui/issues/1666).
- Fix `z-log`'s `trim` prop not being independent when used.
- Fix `z-slider` processing of step value precision.
- Fix `z-date-picker` throw error when `time-picker` input is empty, closes [#1678](https://github.com/tusen-ai/naive-ui/issues/1678).
- Fix `z-popover` not working when `trigger` is `focus`.
- Fix `z-scrollbar`'s scrollbar will vanish if clicked.
- Fix `z-popover` has an invalid line in style.
- Fix `z-popover` `flip=false` doesn't work.
- Fix `z-input-number` can't accept indeterminate input value when `max` or `min` is set, closes [#1664](https://github.com/tusen-ai/naive-ui/issues/1664).
- Fix `z-input-number`'s input value is not changed to a valid value if it's input exceeds min or max multiple times.

### Feats

- `z-input-number` adds `keyboard` prop.
- Add `tableColorStriped` theme variable, closes [#1686](https://github.com/tusen-ai/naive-ui/issues/1686).
- `z-notification-provider` adds `max` & `placement` prop.
- `z-notification` adds `destroyAll` method, closes [#333](https://github.com/tusen-ai/naive-ui/issues/333).
- `z-layout-sider` adds `on-after-enter` and `on-after-leave` props, closes [#1241](https://github.com/tusen-ai/naive-ui/issues/1241).
- `z-upload` adds `custom-request` prop, closes [#1389](https://github.com/tusen-ai/naive-ui/issues/1389).
- `z-data-table` adds `expanded-row-keys` prop.
- `z-popover` provides better auto position adjustment, closes [#1520](https://github.com/tusen-ai/naive-ui/issues/1520), [#1643](https://github.com/tusen-ai/naive-ui/issues/1643).
- `z-input-number` adds `update-value-on-input` prop, closes [#1662](https://github.com/tusen-ai/naive-ui/issues/1662).
- `z-auto-complete` adds `prefix` & `suffix` slot.

## 2.21.1 (2021-11-23)

### Fixes

- Fix `z-image` drag the picture to move the position incorrectly when the zoom is large.
- Fix `z-data-table` style glitches after some rows are expanded.
- Fix `z-data-table` doesn't expand tree data correctly, closes [#1644](https://github.com/tusen-ai/naive-ui/issues/1644).

## 2.21.0 (2021-11-21)

### Breaking Changes

- `ZButton.fontWeightText` & `ZButton.fontWeightGhost` theme vars are removed. If you want to change font weight, you can use `strong` prop of `z-button` instead.

### Feats

- `z-tag` adds `avatar` slot.
- `z-data-table` adds `striped` prop, closes [#1552](https://github.com/tusen-ai/naive-ui/issues/1552).
- `z-table` adds `striped` prop, closes [#1552](https://github.com/tusen-ai/naive-ui/issues/1552).
- `z-slider` adds `vertical` prop, closes [#1468](https://github.com/tusen-ai/naive-ui/issues/1468).
- `z-slider` adds `reverse` prop.
- `z-slider`'s `step` prop support `mark` option.
- Bypass Vitejs bug on string extrapolation, ref [#636](https://github.com/tusen-ai/naive-ui/issues/636).
- `z-button` adds `strong` prop.
- `z-button` adds `secondary` prop.
- `z-button` adds `tertiary` prop.
- `z-button` adds `quaternary` prop.
- `z-auto-complete` adds `input-props` prop, closes [#1610](https://github.com/tusen-ai/naive-ui/issues/1610).
- `z-avatar` adds `fallback-src` prop, closes [#702](https://github.com/tusen-ai/naive-ui/issues/702).
- `z-avatar` adds `on-error` prop.
- `z-input` adds `select` methods, closes [#1328](https://github.com/tusen-ai/naive-ui/issues/1328).
- Add `z-tab` component, closes [#1630](https://github.com/tusen-ai/naive-ui/issues/1630).
- `z-switch` adds `round` prop, closes [#1469](https://github.com/tusen-ai/naive-ui/issues/1469).
- `z-step` adds `title` slot.
- `z-menu` support `divider` type option.

### Fixes

- Fix the default value of the `suffix` internal component's `loading` property.
- Fix `z-space` is shown when it has no children, closes [#1605](https://github.com/tusen-ai/naive-ui/issues/1605).
- Fix `z-radio` has no `onUpdateChecked` prop.
- Fix `z-dropdown` animation flicker problem, closes [#1600](https://github.com/tusen-ai/naive-ui/issues/1600).
- Fix `z-data-table`’s `clearSorter` method isn't exported properly.
- Fix `z-global-style` throws error in SSR.
- Fix `z-button` will trigger click event twice if pressed, closes [#1626](https://github.com/tusen-ai/naive-ui/issues/1626).

## 2.20.3 (2021-11-15)

### Fixes

- Fix `z-grid` suffix ZGridItem does not set right span when collapsed, closes [#1530](https://github.com/tusen-ai/naive-ui/issues/1530).
- Fix `z-button` to shrink abnormally in certain scenarios when using the `circle` prop, closes [#1557](https://github.com/tusen-ai/naive-ui/issues/1557).
- Fix `input-props` does affect `type` prop, closes [#1553](https://github.com/tusen-ai/naive-ui/issues/1553)

### Feats

- `z-menu` adds a color distinction between selected and unselected arrow, closes [#1535](https://github.com/tusen-ai/naive-ui/issues/1535).
- `z-menu` adds `watch-props` prop, closes [#1536](https://github.com/tusen-ai/naive-ui/issues/1536).
- `z-date-picker`'s `type` prop support `year` option.

### i18n

- Add `createLocale` to make locale customizable, closes [#1525](https://github.com/tusen-ai/naive-ui/issues/1525).

## 2.20.2 (2021-11-05)

### Feats

- `z-modal` adds `transform-origin` prop, closes [#1498](https://github.com/tusen-ai/naive-ui/issues/1498).
- `z-tabs` adds `pane-class` prop, closes [#1500](https://github.com/tusen-ai/naive-ui/issues/1500).

### Fixes

- Fix `z-alert` `contentTextColor` and `titleTextColor` type theme variable not working, closes [#1495](https://github.com/tusen-ai/naive-ui/issues/1495).
- Fix `z-time-picker` not trigger blur event when the panel is closed by ok button, closes [#1499](https://github.com/tusen-ai/naive-ui/issues/1499).
- Fix `z-upload` `UploadFileInfo`'s `thumbnailUrl` field not working, closes [#1495](https://github.com/tusen-ai/naive-ui/issues/1245).
- Fix `z-button` `keyboard` prop does not work, closes [#1508](https://github.com/tusen-ai/naive-ui/issues/1508).
- Fix `z-upload` instance misses `openOpenFileDialog` method.

### i18n

- Add deDE locale.
- Add nbNO locale.

## 2.20.1 (2021-11-01)

### Fixes

- Fix `z-tabs` switch tab does not work when adding a new tab, closes [#1417](https://github.com/tusen-ai/naive-ui/issues/1417).
- Fix `z-tree`'s `filter` prop does not work when assigned `children-field` , closes [#1477](https://github.com/tusen-ai/naive-ui/issues/1477).
- Fix `z-cascader` can't remove options when using customized fields in multiple mode.
- Fix `z-select`'s option created by `on-create` doesn't show correct label in trigger, closes [#1482](https://github.com/tusen-ai/naive-ui/issues/1482)
- Fix `z-select` menu height shifts on close in `filterable` mode.

### Feats

- `z-select` adds `menu-props` prop, closes [#1475](https://github.com/tusen-ai/naive-ui/issues/1475).
- `z-image`'s `toolbar` adds close icon, closes [#1412](https://github.com/tusen-ai/naive-ui/issues/1412).
- `z-tree`'s `on-load` prop is triggered when the `expanded-keys` prop changes in `remote` mode, closes [#1339](https://github.com/tusen-ai/naive-ui/issues/1339).

## 2.20.0 (2021-10-28)

### Breaking Changes

- `z-collapsed-transition`'s `collapsed` prop is deprecated, please use `show` instead, closes [#1407](https://github.com/tusen-ai/naive-ui/issues/1407).

### Fixes

- Fix `z-log` `font-size` prop not working, closes [#1416](https://github.com/tusen-ai/naive-ui/issues/1416).
- Fix `z-loading-bar` will show once even if `start` is not called when `loading-bar-style` is set.
- Fix `z-date-picker` `separator` prop not working, closes [#1456](https://github.com/tusen-ai/naive-ui/issues/1456)

### Feats

- `z-data-table` optimize the logic of underlying rendering and improve component performance.
- `z-date-picker`'s `shortcuts` prop supports functional value.
- `z-tab-pane`'s `display-directive` props supports the `show:lazy` option, closes [#1374](https://github.com/tusen-ai/naive-ui/issues/1374).
- `z-input` of text type supports `count` slots, closes [#1440](https://github.com/tusen-ai/naive-ui/issues/1440).

### i18n

- Add idID locale.

## 2.19.11 (2021-10-21)

### Fixes

- Fix `z-upload`'s file can't be removed when file count limit is reached, closes [#1401](https://github.com/tusen-ai/naive-ui/issues/1401).

### Feats

- `z-tabs` adds `on-before-leave` prop, closes [#1337](https://github.com/tusen-ai/naive-ui/issues/1337).
- `z-color-picker` adds `show-preview` prop, closes [#1281](https://github.com/tusen-ai/naive-ui/issues/1281).
- `z-tab-pane`'s `display-directive` prop support `show:lazy` option, closes [#1374](https://github.com/tusen-ai/naive-ui/issues/1374).

## 2.19.9 (2021-10-18)

### Fixes

- Fix `z-collapse`'s expanded status is lost when using `v-if` with `z-collapse-item`, closes [#1387](https://github.com/tusen-ai/naive-ui/issues/1387).
- Fix `z-dialog`'s close button will be overlayed with content, closes [#1381](https://github.com/tusen-ai/naive-ui/issues/1381).
- Fix `z-upload` file is set to `null` after upload failure, closes [#1316](https://github.com/tusen-ai/naive-ui/issues/1316).
- Fix `z-cascader`'s `filter` prop not working.
- Fix `z-cascader`'s `label-field` prop breaks filter.
- Fix `z-cascader`'s `separator` prop isn't appiled to filter select menu.

### Feats

- `z-menu` adds `dropdown-props` prop, closes [#1345](https://github.com/tusen-ai/naive-ui/issues/1345).
- `z-input` adds `count` slot, closes [#1314](https://github.com/tusen-ai/naive-ui/issues/1314).
- `z-time-picker` adds `use-12-hours` prop, closes [#547](https://github.com/tusen-ai/naive-ui/issues/547).
- `z-input-number` adds `focus` & `blur` methods.

## 2.19.8 (2021-10-14)

### Fixes

- Fix `z-data-table` fixed style does not work in group header table, closes [#1341](https://github.com/tusen-ai/naive-ui/issues/1341).
- Fix `z-data-table` has duplicate right border when it has multiple level headers.
- Fix `z-scrollbar` doesn't support `scrollTo`, closes [#1346](https://github.com/tusen-ai/naive-ui/issues/1346).
- Fix `z-ellipsis`'s `expand-trigger` prop not show `pointer` cursor when content is short when `tooltip = false`, closes [#1299](https://github.com/tusen-ai/naive-ui/issues/1299).
- Fix `z-upload`'s `disabled` prop's style not working, closes [#1237](https://github.com/tusen-ai/naive-ui/issues/1237).
- `z-config-provider` adds `breakpoints` prop, closes [#1379](https://github.com/tusen-ai/naive-ui/issues/1379).

### Feats

- `z-auto-complete` adds `get-show` prop, closes [#1292](https://github.com/tusen-ai/naive-ui/issues/1292).
- `z-select` adds `input-props` prop, closes [#1351](https://github.com/tusen-ai/naive-ui/issues/1351).
- `z-color-picker` adds `swatches` prop, ref [#1281](https://github.com/tusen-ai/naive-ui/issues/1281).
- `z-upload` adds `max` prop.

### i18n

- Add jaJP locale.

## 2.19.7 (2021-10-12)

### Fixes

- Fix `z-ellipsis`'s `expand-trigger` prop not show `pointer` cursor when content is short, closes [#1299](https://github.com/tusen-ai/naive-ui/issues/1299).
- Fix `z-select`'s `fallback-option` prop's type, closes [#1327](https://github.com/tusen-ai/naive-ui/issues/1327).
- Fix `z-modal`'s `on-after-enter` prop not working.

## 2.19.6 (2021-10-10)

### Fixes

- Fix `z-menu`'s incorrect warning on `default-expanded-keys`.
- Fix `useThemeVars` is sometimes unusable, closes [#1309](https://github.com/tusen-ai/naive-ui/issues/1309).
- Fix the `list-style` style of the `<ul>` element.

### Feats

- `z-cascader` provide all options paths in `update:value` callback function, closes [#1235](https://github.com/tusen-ai/naive-ui/issues/1235).
- `z-layout` and `z-layout-sider` adds `on-scroll` prop, closes [#1232](https://github.com/tusen-ai/naive-ui/issues/1232).
- `z-config-provider` adds `preflight-style-disabled` prop.

## 2.19.5 (2021-10-07)

### Fixes

- Fix `z-form-item`'s content is too long and the width is incorrect
- Fix `z-layout-sider`'s `arrow-circle`'s icon style.
- Fix `z-upload`'s `show-preview-button` prop not working, closes [#1238](https://github.com/tusen-ai/naive-ui/issues/1238).
- Fix `z-date-picker`'s `date` type of `action` validate error.
- Fix `z-data-table` throws error when using `selection` and `summary` together, closes [#1276](https://github.com/tusen-ai/naive-ui/issues/1276).
- Fix `z-data-table` selection column's width is collapsed when it is set to fixed, closes [#1283](https://github.com/tusen-ai/naive-ui/issues/1283).
- Fix `z-popconfirm` can't be nested in `z-tooltip`, closes [#872](https://github.com/tusen-ai/naive-ui/issues/872).
- Fix `z-popselect` checkmark overlays on option text, closes [#1282](https://github.com/tusen-ai/naive-ui/issues/1282).
- Fix `z-pagination` `buttonColor` theme variable not working.

### Feats

- `z-breadcrumb-item` adds `href` prop.
- `z-descriptions` adds `separator` prop, closes [#1263](https://github.com/tusen-ai/naive-ui/issues/1263).
- `z-dropdown` adds `key-field` prop.
- `z-dropdown` adds `label-field` prop.
- `z-dropdown` adds `children-field` prop.
- `z-menu` adds `key-field` prop.
- `z-menu` adds `label-field` prop.
- `z-menu` adds `children-field` prop.
- `z-data-table` supports using path of the property to get as column key, closes [#1271](https://github.com/tusen-ai/naive-ui/issues/1271).
- `z-switch` adds `checked-value` prop, closes [#1234](https://github.com/tusen-ai/naive-ui/issues/1234).
- `z-switch` adds `unchecked-value` prop, closes [#1234](https://github.com/tusen-ai/naive-ui/issues/1234).
- `z-checkbox` adds `checked-value` prop, closes [#1234](https://github.com/tusen-ai/naive-ui/issues/1234).
- `z-checkbox` adds `unchecked-value` prop, closes [#1234](https://github.com/tusen-ai/naive-ui/issues/1234).
- Add `z-collapse-transition` component, closes [#829](https://github.com/tusen-ai/naive-ui/issues/829).
- Add `z-scrollbar` component.
- `z-dropdown` support options with `type='render'`.
- `z-data-table` supports multiple column sorting.
- `z-date-picker` adds `first-day-of-week` prop.
- `z-date-picker`'s `type` prop support `month` option.
- `z-popover` adds `to` prop.
- `z-tree`'s `on-update:indeterminateKeys` prop adds option info.
- `z-tree`'s `on-update:expandedKeys` prop adds option info.
- `z-tree`'s `on-update:checkedKeys` prop adds option info.
- `z-tree`'s `on-update:selectedKeys` prop adds option info.

## 2.19.3 (2021-09-28)

### Fixes

- Fix `z-data-table` ellipsis not show when last column not set ellipsis, closes [#934](https://github.com/tusen-ai/naive-ui/issues/934).
- Fix `z-grid-item` won't work with responsive config.
- Fix `z-tabs`'s scroll shadow is not updated when it's resized, closes [#1224](https://github.com/tusen-ai/naive-ui/issues/1224).

### Feats

- `z-grid-item` won't display when `span` is 0, closes [#1220](https://github.com/tusen-ai/naive-ui/issues/1220).
- `z-grid` adds `item-responsive` prop.

## 2.19.2 (2021-09-26)

### i18n

- Add ukUA locale.

### Fixes

- Fix `z-global-style` applies style transition on first mount.
- Fix `z-drawer` border transition, closes [#1211](https://github.com/tusen-ai/naive-ui/issues/1211).
- Fix `z-input-number`'s `value` prop can't be `null` type.
- Fix components with rtl support throws error in SSR.
- Fix components with popover throws error in SSR.
- Fix global theme overrides not working for `z-select` trigger, closes [#1229](https://github.com/tusen-ai/naive-ui/issues/1229).

### Feats

- `z-checkbox` adds aria support.
- `z-alert` aria support.

## 2.19.1 (2021-09-21)

### Fixes

- Fix `DialogReactive` props are readonly.
- Fix `z-tree-select` sets `check-strategy='child'` not working in single select mode.
- Fix `z-upload`'s trigger is compressed in `image-card` mode when it's the only item in the row.
- Fix `z-upload-dragger` has no border transition.
- Fix `z-upload` can't upload files.
- Fix `z-tree`'s `checkable` prop doesn't work when `cascade` is `false`.
- Fix `z-tree-select`'s `checkable` prop doesn't work when `cascade` or `multiple` is `false`.

## 2.19.0 (2021-09-19)

### Breaking Changes

- `z-layout-sider`'s `arrow-circle` trigger is changed into new style.

### Feats

- `z-layout-sider` adds `collapsed-trigger-style` prop.
- `z-menu` adds `accordion` prop , closes [#917](https://github.com/tusen-ai/naive-ui/issues/917).
- `z-input-number` adds `readonly` prop , closes [#1198](https://github.com/tusen-ai/naive-ui/issues/1198).
- `z-spin` adds `description` prop and slot.
- `z-anchor` adds `type` prop.
- `z-upload` adds `abstract` prop, adds `z-upload-trigger` 和 `z-upload-file-list` component, closes [#1102](https://github.com/tusen-ai/naive-ui/issues/1102).
- `z-tree` adds `indeterminate-keys` prop.
- `z-tree-select` adds `indeterminate-keys` prop.
- `z-tree` adds `on-update:indeterminate-keys` prop.
- `z-tree-select` adds `on-update:indeterminate-keys` prop.
- `z-tabs` `type` prop adds `'segment'` option, closes [#1133](https://github.com/tusen-ai/naive-ui/issues/1133).
- `z-popover` adds `z-index` prop, closes [#764](https://github.com/tusen-ai/naive-ui/issues/764).
- `z-modal` adds `on-after-enter` prop.
- `z-modal` adds `on-after-leave` prop.

### Fixes

- Fix `z-select` focus input when closing tag with `filterable` , closes [#1170](https://github.com/tusen-ai/naive-ui/issues/1170).
- Fix `z-button` border on hover conflicts with `z-badge`, closes [#1195](https://github.com/tusen-ai/naive-ui/issues/1195).
- Fix `z-upload` prop `v-model:file-list` dosen't work well when prop `multiple` is `true`, closes [#418](https://github.com/tusen-ai/naive-ui/issues/418).
- Fix `useThemeVars` doesn't apply theme overrides, closes [#1194](https://github.com/tusen-ai/naive-ui/issues/1194), [#1176](https://github.com/tusen-ai/naive-ui/issues/1176).
- Fix `z-tabs`'s left shadow isn't displayed in card type.

## 2.18.2 (2021-09-14)

### Feats

- `z-cascader` show `Empty` component when `options` prop is empty, closes [#1092](https://github.com/tusen-ai/naive-ui/issues/1092).
- `z-cascader`'s `on-update:model-value` prop adds option info.
- `z-tree` adds `check-strategy` prop.
- `z-date-picker` adds `input-readonly` prop, closes [#1120](https://github.com/tusen-ai/naive-ui/issues/1120).
- `z-time-picker` adds `input-readonly` prop, closes [#1120](https://github.com/tusen-ai/naive-ui/issues/1120).
- `z-config-provider` adds global config of the `Empty` component, closes [#1092](https://github.com/tusen-ai/naive-ui/issues/1092).
- `z-select` adds `on-update:show` prop.
- `z-auto-complete` exports `AutoCompleteOption` and `AutoCompleteGroupOption` types.
- `z-page-banner` adds `RTL` support.
- `z-select` support variadic height option rendering.
- `z-tree-select`'s `on-update:model-value` prop adds option info.
- `z-select`'s `on-update:model-value` prop adds option info.
- `z-popselect`'s `on-update:model-value` prop adds option info.
- `z-card` adds `embedded` prop.

### Fixes

- Fix `z-p` warns when `depth` is number.
- Fix `z-date-picker`‘s type of `actions` prop.
- Fix `z-select` can't override `z-empty`'s theme variables.
- Fix `z-dynamic-tags` adds button is not disabled when it is disabled.
- Fix `z-select` closes menu when enter key is pressed in filterable mode without options data.
- Fix `z-auto-complete`'s `children` prop can't use `AutoCompleteOption` type.
- Fix `z-gi`'s `collapsed` does not work in `z-form-item-gi`, closes [#1160](https://github.com/tusen-ai/naive-ui/issues/1160).

## 2.18.1 (2021-09-08)

### Feats

- `useDialog` option adds `style` prop, closes [#1054](https://github.com/tusen-ai/naive-ui/issues/1054).
- `z-timeline` adds `icon` slot, closes [#1096](https://github.com/tusen-ai/naive-ui/issues/1096).
- `z-timeline` adds `icon-size` prop.

### Fixes

- Fix `z-step` doesn't work with `v-for` children.
- Fix `z-input-number` cannot enter decimals when `step` is not a decimal.

## 2.18.0 (2021-09-07)

### Breaking Changes

- `z-form` & `z-form-item` split `show-indicator` into `show-indicator` and `indicator-placement`.

### Feats

- `z-drawer` adds `on-mask-click` prop.
- `z-for` adds `indicator-placement` prop, closes [#1055](https://github.com/tusen-ai/naive-ui/issues/1055).
- `z-form-item` adds `indicator-placement` prop, closes [#1055](https://github.com/tusen-ai/naive-ui/issues/1055).

### Fixes

- Fix `z-step` must be passed with `internal-index`.
- Fix `z-radio-group`'s `on-update:model-value` and `on-update-value` can't be array.
- Fix `z-cascader` `check-strategy="child"` doesn't behaves the same as previous `leaf-only`.

## 2.17.2 (2021-09-06)

### Fixes

- Fix `z-tree-select` shows key not label when `show-path=true`, closes [#1095](https://github.com/tusen-ai/naive-ui/issues/1095).

## 2.17.1 (2021-09-06)

### Fixes

- Fix `z-cascader` menu not showing correct checked keys.

## 2.17.0 (2021-09-05)

### Breaking Changes

- `z-tree-select`'s `leaf-only` prop is deprecated, please use `check-strategy="child"` instead.
- `z-cascader`'s `leaf-only` prop is deprecated, please use `check-strategy="child"` instead.
- `z-input`'s `show-password-toggle` is deprecated, please use `show-password-on="click"` instead.

### Fixes

- Fix `z-cascader` click tag to delete the sub option in multi selection mode, and the tree option is not updated.
- Fix `z-input` chinese input method not correct while mouse leave the input in `clearable` is true, closes [#905](https://github.com/tusen-ai/naive-ui/issues/905).
- Fix `z-description`'s warning caused by `v-if` that should not appear, closes [#1083](https://github.com/tusen-ai/naive-ui/issues/1083).
- Fix `z-layout`'s `sider-placement` doesn't work after build, closes [#978](https://github.com/tusen-ai/naive-ui/issues/978).
- Fix `z-input-number`'s `step` calculate error when the value is decimal, closes [#1007](https://github.com/tusen-ai/naive-ui/issues/1007).
- Fix `z-popselect`' s default placement and padding.
- Fix `z-calendar`'s text color of disabled date.

### Feats

- `z-cascader` adds `onUpdateValue` prop.
- `z-auto-complete` adds `onUpdateValue` prop.
- `z-data-table`'s column's `renderFilterMenu` adds `hide` param.
- `z-tree` adds `key-field` prop.
- `z-tree` adds `label-field` prop.
- `z-tree` adds `children-field` prop.
- `z-tree-select` adds `key-field` prop.
- `z-tree-select` adds `label-field` prop.
- `z-tree-select` adds `children-field` prop.
- `z-cascader` adds `key-field` prop.
- `z-cascader`adds `label-field` prop.
- `z-cascader` adds `children-field` prop.
- `z-dropdown` option adds `props` prop, closes [#813](https://github.com/tusen-ai/naive-ui/issues/813).
- `z-data-table` supports multi-selection by holding down `shift`, closes [#554](https://github.com/tusen-ai/naive-ui/issues/554).
- `z-tree-select` adds `check-strategy` prop, closes [#624](https://github.com/tusen-ai/naive-ui/issues/624).
- `z-cascader` adds `check-strategy` prop.
- `z-message` option adds `keepAliveOnHover`, closes [#1036](https://github.com/tusen-ai/naive-ui/issues/1036).
- `z-message-provider` adds `keep-alive-on-hover` prop, closes [#1036](https://github.com/tusen-ai/naive-ui/issues/1036).
- `z-upload` export `UploadFile` type.
- `z-cascader` export `CascaderOption` type.
- `z-mention` export `MentionOption` type.
- `z-transfer` export `TransferOption` type.
- `z-pagination` export `PaginationInfo` type.
- `z-data-table` export `DataTableCreateSummary` type.
- `z-code` adds `inline` prop, closes [#834](https://github.com/tusen-ai/naive-ui/issues/834)
- `z-collapse` adds `header-extra` slot, closes [#1046](https://github.com/tusen-ai/naive-ui/issues/1046).
- `z-input` adds `show-password-on` prop.
- `z-upload` adds `list-type`, `show-preview-button`, `on-preview` and `create-thumbnail-url` prop.

## 2.16.7 (2021-08-27)

### Feats

- `z-mention` adds `focus` and `blur` methods.

### Fixes

- Fix `z-mention`'s menu is too far from text in input mode.
- Fix `z-tree` node can not expanded.

## 2.16.6 (2021-08-26)

### Feats

- `z-timeline` adds `horizontal` prop, closes [#887](https://github.com/tusen-ai/naive-ui/issues/887).
- `z-image` adds `preview-src` prop, closes [#922](https://github.com/tusen-ai/naive-ui/issues/922)
- `z-dynamic-tags` adds `input` and `add` slot, closes [#499](https://github.com/tusen-ai/naive-ui/issues/499).
- `z-timeline-item` adds `color` prop.

### Fixes

- Fix `z-image` not initializing `rotate` after switching images, closes [#921](https://github.com/tusen-ai/naive-ui/issues/921).
- Fix `z-data-table`'s loading is not centered, closes [#929](https://github.com/tusen-ai/naive-ui/issues/929).
- Fix `z-tree` throws an exception when onLoad callback does not adds children, closes [#772](https://github.com/tusen-ai/naive-ui/issues/772).
- Fix `z-input` will show placeholder and 0 simultaneously while passing `value=ref(0)` in z-input, closes [#914](https://github.com/tusen-ai/naive-ui/issues/914).
- Fix `z-data-table` `flex-height` not working without `scroll-x`, closes [#952](https://github.com/tusen-ai/naive-ui/issues/952).

## 2.16.5 (2021-08-20)

### Feats

- `z-input-number` adds `clearable` prop.
- `z-form` adds `show-label` prop, closes [#858](https://github.com/tusen-ai/naive-ui/issues/858).

### Fixes

- Fix `z-notification`'s exported `NotificationReactive` type is not writable, closes [#876](https://github.com/tusen-ai/naive-ui/issues/876).
- Fix `z-tabs` style glitches when different types tabs are nested, closes [#850](https://github.com/tusen-ai/naive-ui/issues/850).
- Fix `z-dropdown`'s inner link click trigger area is not the entire option, closes [#823](https://github.com/tusen-ai/naive-ui/issues/823).
- Fix `z-popover` arrow's misplacement when placed in nested popovers with different placement, closes [#916](https://github.com/tusen-ai/naive-ui/issues/916).
- Fix `z-ellpisis` doesn't work after content is updated, closes [#776](https://github.com/tusen-ai/naive-ui/issues/776).

## 2.16.4 (2021-08-16)

### Fixes

- Fix ruRU locale exports.

## 2.16.3 (2021-08-16)

### i18n

- Add ruRU locale [#852](https://github.com/tusen-ai/naive-ui/pull/852).

### Feats

- `z-message-provider` adds `container-style` prop.
- `z-message-provider` adds `placement` prop.
- `z-message` adds class to distinguish type.
- `z-date-picker` adds `shortcuts` props, closes [#280](https://github.com/tusen-ai/naive-ui/issues/280).

### Fixes

- Fix `z-rate` half star overlays star background in dark mode.
- Fix `z-menu` renders unexpectly when `render-icon` returns `true`.
- Fix `z-space` render empty placeholder while use `v-if`, closes [#824](https://github.com/tusen-ai/naive-ui/issues/824).

## 2.16.2 (2021-08-09)

### Feats

- `z-message-provider` adds `closable` prop, closes [#795](https://github.com/tusen-ai/naive-ui/issues/795).
- `z-tree-select` adds `show-path` prop, closes[#625](https://github.com/tusen-ai/naive-ui/issues/623).
- `z-layout` adds `sider-placement` prop, closes [#566](https://github.com/tusen-ai/naive-ui/issues/566).

### Fixes

- Fix `z-avatar`'s scale value is incorrect while use v-show, closes [#779](https://github.com/tusen-ai/naive-ui/issues/779).
- Fix `z-menu` show a blue background when click the menu on mobile phone, closes [#799](https://github.com/tusen-ai/naive-ui/issues/799).
- Fix `z-select` filterable select breaks, closes [#510](https://github.com/tusen-ai/naive-ui/issues/510).
- Fix `z-data-table` When selectAll is selected, the state display of selectAll should not contain disabled rows, closes [#778](https://github.com/tusen-ai/naive-ui/issues/778).
- Fix `z-color-picker`'s `on-complete` callback's argument `value` is incorrect, closes [#748](https://github.com/tusen-ai/naive-ui/issues/748).

## 2.16.1 (2021-08-06)

### Feats

- `z-loading-bar-provider` adds `loading-bar-style` props, closes [#457](https://github.com/tusen-ai/naive-ui/issues/457).
- `z-button` adds `text-color` prop.
- `z-form` export `FormValidationError` type.
- `z-popconfirm` support not show action components, closes [#770](https://github.com/tusen-ai/naive-ui/issues/770).

### Fixes

- Fix `z-slider` loss floating point decimal precision, closes [#751](https://github.com/tusen-ai/naive-ui/issues/751).
- Fix `z-data-table` `onUpdatePage` and `onUpdatePageSize` not triggered while using jsx.
- Fix `z-progress`'s `percentage` prop default value doesn't work with different types.
- Fix `z-select` hide close icon when option is disabled.
- Fix `z-modal` can't be closed when using custom content, closes [#788](https://github.com/tusen-ai/naive-ui/issues/788).

## 2.16.0 (2021-08-02)

### Breaking Changes

- `useLoadingBar`'s `finish` method won't work if no `start` is called.
- `z-input`'s `type='input'` is renamed to `type='text'`.

### Feats

- `z-scrollbar` adds `scrollbarWidth`, `scrollbarHeight` and `scrollbarBorderRadius` common theme variables, closes [#649](https://github.com/tusen-ai/naive-ui/issues/649).
- `z-menu` doesn't should icon placeholder when `render-icon` returns falsy value, closes [#722](https://github.com/tusen-ai/naive-ui/issues/722).
- `z-menu` adds `render-extra` prop.
- `z-select` adds `on-clear` prop.
- `z-form` adds `disabled` prop, closes [#538](https://github.com/tusen-ai/naive-ui/issues/538).
- `z-dynamic-tags` adds `max` prop.

### Fixes

- Fix `z-dropdown` click exception when using v-for.
- Fix `z-modal` cannot customize classes when use preset, closes [#744](https://github.com/tusen-ai/naive-ui/issues/744).
- Fix `z-cascader` menu width shifts in virtual scroll mode, closes [#728](https://github.com/tusen-ai/naive-ui/issues/728).

## 2.15.11 (2021-07-29)

### Fixes

- Fix `z-data-table` pagination's error.

## 2.15.10 (2021-07-29)

### Feats

- `z-pagination` adds `prev` and `next` slots, ref [#648](https://github.com/tusen-ai/naive-ui/issues/648).
- `z-tag` adds `color` prop, closes [#693](https://github.com/tusen-ai/naive-ui/issues/693).
- `z-dynamic-tags` adds `color`, closes [#693](https://github.com/tusen-ai/naive-ui/issues/693).
- `z-time-picker` optimization the now button logic, closes [#401](https://github.com/tusen-ai/naive-ui/issues/401).
- `z-pagination` `PaginationInfo` adds `itemCount` prop, closes [#585](https://github.com/tusen-ai/naive-ui/issues/585).
- `z-select` adds `on-clear` prop.

### Fixes

- Fix `z-message`'s `destroyAll` method doesn't work.
- Fix `z-timeline`'s header slot is invalid when using alone.
- Fix `z-select` incorrect style when props has `disabled` and `filterable`, closes [#698](https://github.com/tusen-ai/naive-ui/issues/698).
- Fix `z-upload` operation buttons displayed when has `file-list` & `disabled` props, closes [#668](https://github.com/tusen-ai/naive-ui/issues/668).

## 2.15.9 (2021-07-28)

### Feats

- `z-message` adds `destroyAll` method.
- `z-input-number` adds `prefix`, `suffix` slots, closes [#609](https://github.com/tusen-ai/naive-ui/issues/609).

### Fixes

- Fix `z-message` options' `duration` prop doesn't work.

## 2.15.8 (2021-07-27)

### Feats

- `z-menu` adds `expand-icon` prop, closes [#414](https://github.com/tusen-ai/naive-ui/issues/414).
- `z-descriptions`, `z-descriptions-item` adds `label-style` and `content-style` props, closes [#536](https://github.com/tusen-ai/naive-ui/issues/536).

### Fixes

- Fix `z-data-table` the style penetration of the `z-spin`, closes [#663](https://github.com/tusen-ai/naive-ui/issues/663).

## 2.15.7 (2021-07-25)

### Feats

- `z-dropdown` adds `show-arrow` prop, closes [#647](https://github.com/tusen-ai/naive-ui/issues/647).
- `z-time-picker` adds `actions` prop, closes [#401](https://github.com/tusen-ai/naive-ui/issues/401).
- `z-mention` adds `render-label` prop.
- `z-switch` adds `checked`, `unchecked` slots.
- `z-switch` adds `loading` prop, closes [#301](https://github.com/tusen-ai/naive-ui/issues/301).
- `z-select` pressing arrow down can open menu, ref [#300](https://github.com/tusen-ai/naive-ui/issues/300).
- `z-tree-select` pressing arrow down can open menu, ref [#300](https://github.com/tusen-ai/naive-ui/issues/300).
- `z-cascader` pressing arrow down can open menu, ref [#300](https://github.com/tusen-ai/naive-ui/issues/300).
- `z-popover`'s `trigger` prop support `'focus'`, closes [#477](https://github.com/tusen-ai/naive-ui/issues/477).
- `z-message-provider` adds `duration` and `max` props.
- `z-data-table` adds `flex-height` prop, closes [#596](https://github.com/tusen-ai/naive-ui/issues/596).

### Fixes

- Fix `z-carousel` arrow buttons cannot be displayed in a specific browser, closes [#625](https://github.com/tusen-ai/naive-ui/issues/625).
- Fix `z-layout-sider`'s `width` prop can't be string, closes [#607](https://github.com/tusen-ai/naive-ui/issues/607).
- Fix `z-slider` prop `disabled` doesn't work, closes [#641](https://github.com/tusen-ai/naive-ui/issues/641).
- Fix `z-input` show clear button when readonly.
- Fix `z-data-table` doesn't show scrollbar when table-layout is auto, closes [#518](https://github.com/tusen-ai/naive-ui/issues/518).
- Fix `z-data-table`'s header checkbox always displays checked when data is empty.
- Fix `z-data-table` header and body's scrollings are not sync.

## 2.15.6 (2021-07-23)

### Feats

- `z-menu` adds `render-icon` prop.
- `z-upload` adds `show-file-list` prop.
- `z-dropdown` adds `render-icon` prop.
- `z-checkbox-group` adds `min` and `max` prop.
- `z-mention` adds `empty` slot.
- `useDialog` option adds `on-mask-click` prop, closes [#419](https://github.com/tusen-ai/naive-ui/issues/419).
- `z-space` `justify` prop supports `center`, `space-around` and `space-between`.
- `z-date-picker` adds `close-on-select` prop, closes [#541](https://github.com/tusen-ai/naive-ui/issues/541).
- `z-dialog` adds `action` prop, closes [#550](https://github.com/tusen-ai/naive-ui/issues/550).
- `z-mention`’s `option.label` support render function.
- `z-color-picker` adds `actions` prop, closes [#319](https://github.com/tusen-ai/naive-ui/issues/319).

### Fixes

- Fix `z-space`'s inner `display: grid` element breaks item height, closes `https://github.com/tusen-ai/naive-ui/issues/546`.
- Fix `z-dropdown`'s `render-label` prop is invalid for group type option.
- Fix `z-datatable`'s `scroll-x` prop is setted, the table content width is not full of the container width, closes [#518](https://github.com/tusen-ai/naive-ui/issues/518).
- Fix `z-descriptions` doesn't work with `v-for` children.
- Fix `z-dialog` display an empty button when `positive-text` is not set, closes [#549](https://github.com/tusen-ai/naive-ui/issues/549).
- Fix `z-pagination` `PaginationInfo`'s `endIndex` data error, closes [#584](https://github.com/tusen-ai/naive-ui/issues/584).
- Fix `z-data-table` `rowClassName` doesn't work when type is string, closes [#582](https://github.com/tusen-ai/naive-ui/issues/582).

## 2.15.5 (2021-07-16)

### Feats

- `z-tree` adds `render-label`, `render-prefix` and `render-suffix` props.
- `z-rate` adds `allow-half` prop.
- `z-carousel` adds `show-arrow` prop.
- `z-slider` adds `format-tooltip` prop.
- `z-upload` adds `event` in `on-finish` callback params.
- `z-rate` adds `readonly` prop.
- `z-time-picker` adds `seconds`, `minutes`, `hours` props.
- `z-notification` export `NotificationApi`, `NotificationOptions` and `NotificationReactive` type.
- `z-avatar` adds `on-error` prop, closes [#394](https://github.com/tusen-ai/naive-ui/issues/394).
- `z-image` adds `on-error` prop, closes [#394](https://github.com/tusen-ai/naive-ui/issues/394).
- `z-image` adds `object-fit` prop, closes [#394](https://github.com/tusen-ai/naive-ui/issues/394).
- `z-avatar` adds `object-fit` prop, closes [#394](https://github.com/tusen-ai/naive-ui/issues/394).
- `z-menu` expands all the ascendant of selected item by default, closes [#481](https://github.com/tusen-ai/naive-ui/issues/481).

### Fixes

- Fix `z-calendar`'s `default-model-value` prop cannot be used.
- Fix `z-pagination` page count is not correct when `item-count` is 0.
- Fix `z-scrollbar` `content-style` can not override the default width of style.
- Fix `z-select` placeholder transition.
- Fix `z-loading-bar` `useLoadingBar`'s return type can be undefined.
- Fix `z-tag`'s `type` prop adds `primary` type.
- Fix `z-dynamic-tags`'s `type` prop adds `primary` type.

## 2.15.4 (2021-07-09)

### Feats

- `z-steps` adds icon customization in `'finish'` and `'error'` status.
- `z-tree` exports `TreeDragInfo` & `TreeDropInfo` type.
- `z-empty` export `icon` slot.
- `useDialog` option adds `maskClosable` prop, closes [#420](https://github.com/tusen-ai/naive-ui/issues/420).

### Fixes

- Fix `z-data-table` fixed column box-shadow doesn't update when there is only on side fixed.
- Fix `z-data-table` fixed column box-shadow doesn't update when `props.scrollX` is not set but each column's width is set.
- Fix `z-result` image doesn't show on Safari and mobile phone.
- Fix `z-drawer-content`'s `header-style` style not applied to header.
- Fix `z-dialog` instance throws error when calling `destroy`.
- Fix `z-image-group` initialize zoom scale when switching a picture [#423](https://github.com/tusen-ai/naive-ui/issues/423).
- Fix `z-select` bug in using custom label, closes [#352](https://github.com/tusen-ai/naive-ui/issues/352).
- Fix `z-carousel` when `autoplay` dot active status isn't displayed correctly, closes [#434](https://github.com/tusen-ai/naive-ui/issues/434).
- Fix `z-input` fixed clearable position, closes [#428](https://github.com/tusen-ai/naive-ui/issues/428).
- Fix `z-image` doesn't accept attributes.
- Fix `z-image` set border-radius not working, closes [#427](https://github.com/tusen-ai/naive-ui/issues/427).
- Fix `z-tab-pane` throws error when there's no children.
- Fix `z-select` clear button is too big in `z-spin`, closes [#454](https://github.com/tusen-ai/naive-ui/issues/454).
- Fix `z-select` options are not updated properly, closes [#441](https://github.com/tusen-ai/naive-ui/issues/441).

## 2.15.3 (2021-07-05)

### Feats

- `z-loading-bar` export `LoadingBarApi` type.
- `z-image` adds `img-props` prop.
- Add native `title` attributes to some components to enhance the experience.
- `z-tree` adds `prefix` and `suffix` in TreeOption.
- `z-carousel` adds `dot-placement` prop.
- `z-auto-complete` adds `loading` prop, closes [#241](https://github.com/tusen-ai/naive-ui/issues/241).
- `z-slider` adds `tooltip` prop, closes [#362](https://github.com/tusen-ai/naive-ui/issues/362).
- `z-input` adds `loading` prop.

### Fixes

- Fix `z-upload` `multiple=false` doesn't work for drag & drop, closes [#363](https://github.com/tusen-ai/naive-ui/issues/363).
- Fix `z-dropdown`'s inner `<a />`'s style.
- Fix `z-menu` tooltip's inner `<a />`'s style, closes [#338](https://github.com/tusen-ai/naive-ui/issues/338).
- Fix `z-carousel` doesn't work with `v-for` children.
- Fix `z-form` `label-align` prop not working, closes [#213](https://github.com/tusen-ai/naive-ui/issues/213)
- Fix `z-data-table` fixed column shadow doesn't work when `max-height` is set, closes [#376](https://github.com/tusen-ai/naive-ui/issues/376).

## 2.15.2 (2021-07-02)

### Feats

- `z-carousel` adds `trigger` prop.
- `z-menu` adds `dropdown-placement` prop.
- `z-upload` adds `before-upload` prop.
- `z-image` adds `alt` prop.
- Support the enter key on the numeric keypad.
- `z-spin` support `icon` slot for icon customizing, closes[#260](https://github.com/tusen-ai/naive-ui/issues/260).
- `z-spin` adds `rotate` prop fro slot icon to rotate.
- `z-form` export `FormItemRule` & `FormRules` type.
- `z-select` adds `render-tag` prop.

### Fixes

- Fix `z-log` warn on highlight.js when no language is set, closes [#327](https://github.com/tusen-ai/naive-ui/issues/327).
- Remove `z-calendar`'s useless `console.log`.
- Fix loading-bar disappears unexpectl, closes [#343](https://github.com/tusen-ai/naive-ui/issues/343).
- Fix `z-select` doesn't scroll to selected item when menu is opened, closes [#346](https://github.com/tusen-ai/naive-ui/issues/346).
- Fix `z-tab-pane` throws error when using v-if.
- Fix `z-modal` still closes when `on-negative-click` returns `false`.
- Fix `z-collapse` `defaultExpandedNames` does not work in accordion mode, closes [#350](https://github.com/tusen-ai/naive-ui/issues/350).
- Fix `z-tag` lacks `on-update-checked` prop.
- Fix `z-menu` `render-label` not working for dropdown in collapsed mode.

## 2.15.1 (2021-06-30)

- Fix no `web-types.json`.

## 2.15.0 (2021-06-29)

### Breaking Changes

- `z-select`'s `SelectOption`'s `render` no longer render label but the entire option.

### Feats

- `z-carousel` supports touch operation, closes [#271](https://github.com/tusen-ai/naive-ui/issues/271).
- `z-input` adds `input-props` prop.
- `z-message` optimize the error message of `useMessage` when there is no `z-message-provider`, adds the related document link.
- Add `web-types.json` for webstorm, however I recommend using VSCode and Volar. `web-types.json` only provides limited information for coding.
- `z-tree-select` adds `leaf-only` prop.
- `z-tree` adds `leaf-only` prop.
- `z-select`'s `SelectOption`'s `label` supports render function.
- `z-select` adds `render-option` prop.
- `z-select` export `SelectOption` & `SelectGroupOption` type.
- `z-popover` adds `header` slot.
- `z-dropdown` adds `render-label` prop.

### Fixes

- Fix `z-date-picker` `z-provider` pass `date-locale` not work, closes [#250](https://github.com/tusen-ai/naive-ui/issues/250).
- Fix `z-input` clear button placeholder prevent clicking on actual component [#288](https://github.com/tusen-ai/naive-ui/issues/288)
- Fix `z-carousel` click the at current item button, the component behaves abnormally.
- Fix `z-menu` `render-label` not working for tooltip in collapsed mode.
- Fix `z-dropdown` can't render `z-popover` in option.

## 2.14.0 (2021-06-23)

### Breaking Changes

- `z-element` removes `abstract` prop.
- `z-element` doesn't return theme variables in default slot. Please use `useThemeVars` instead.

### Feats

- Add `z-carousel` component.
- Add `useThemeVars` composable to provide theme variables.
- `z-upload` adds `on-update:file-list` prop, closes [#135](https://github.com/tusen-ai/naive-ui/issues/135).
- `z-date-picker` adds `update-value-on-close` prop.

### Fixes

- Fix `z-select` can't input in filterable mode in single mode in iOS Safari, closes [#230](https://github.com/tusen-ai/naive-ui/issues/230)
- Fix `z-input-number` lacks `on-update-value` prop.
- Fix `z-input-number`'s value can't be null.
- Fix `z-input-number`'s button doesn't work after value is cleared, closes [#251](https://github.com/tusen-ai/naive-ui/issues/251).
- Fix `z-data-table` expand trigger's cursor is not pointer, closes [#261](https://github.com/tusen-ai/naive-ui/issues/261).

## Refactors

- `z-input-number` will focus directly, closes [#244](https://github.com/tusen-ai/naive-ui/issues/244).

## 2.13.0 (2021-06-21)

### Feats

- `z-dropdown` adds `on-clickoutside` prop, closes [#123](https://github.com/tusen-ai/naive-ui/issues/123).
- `z-menu` adds `render-label` prop, closes [#84](https://github.com/tusen-ai/naive-ui/issues/84)
- `z-tree` supports keyboard operations.
- Add `z-tree-select` component.

### Fixes

- Fix `z-tree` drag over leaf node causes error, closes [#200](https://github.com/tusen-ai/naive-ui/issues/200).
- Fix `z-tree` misses `on-update-expanded-keys`, `on-update-selected-keys`, `on-update-checked-keys` prop.
- Fix `z-tree`'s `selected-keys` prop influences original array.
- Fix `z-select`'s input has useless empty row in multiple filterable mode.
- Fix `z-button`'s loading icon doesn't show on iOS Safari, closes [#219](https://github.com/tusen-ai/naive-ui/issues/219).
- Fix `z-date-picker` doesn't show icon when clearable.
- Fix `z-time-picker` icon mis-aligned when clearable, closes [#222](https://github.com/tusen-ai/naive-ui/issues/222).

## 2.12.2 (2021-06-19)

### Fixes

- Fix `z-form-item` always show require mark.

## 2.12.1 (2021-06-19)

### Feats

- `z-form`, `z-form-item` enhance `show-indicator` prop, closes [#171](https://github.com/tusen-ai/naive-ui/issues/171)
- `z-dropdown` support class attr, closes [#180](https://github.com/tusen-ai/naive-ui/issues/180).
- `z-input` adds `show-password-toggle` prop.
- `z-popselect` support class attr.
- `z-select` adds `render-label` prop.
- `z-popselect` adds `render-label` prop.

### Fixes

- Fix `z-input` baseline shifts when mix Chinese and English characters in input, closes [#174](https://github.com/tusen-ai/naive-ui/issues/174).
- Fix `z-icon` use setup script, `$parent` is an empty object by default, and access `$parent.$options` will be `undefined`.
- Fix `z-notification` position not correct.
- Fix `z-message` content & option type not correct.

## 2.12.0 (2021-06-16)

### Breaking Changes

- `z-a`'s `to` prop is removed. Now if you want to use `z-a` like a router link, you can follow the doc site.

### Feats

- `z-tree` support `disabled` & `checkboxDisabled` on option.
- `z-input-number` support keyboard events ArrowUp and ArrowDown operations.

### Fixes

- Fix `z-cascader` text blur in win10 Chrome.
- Fix `z-tree` click on indent won't trigger select in block line mode.

## 2.11.12 (2021-06-16)

### Feats

- `z-drawer-content` adds `closable` prop, closes [#139](https://github.com/tusen-ai/naive-ui/issues/139).
- `z-element` pass `themeVars` to default slot.
- `z-element` adds `abstract` prop.

### Fixes

- Fix `z-radio-group` doesn't trigger form item validation.
- Fix `z-auto-complete` customizing input not working.

## 2.11.11 (2021-06-15)

### Feats

- `z-tag` adds `RTL` support

### Fixes

- Move `vue` & `vue-router` to peer dependencies to avoid redundant bundle.

## 2.11.9 (2021-06-15)

### Feats

- `z-space` supports wai-aria.
- `z-button-group` supports wai-aria.
- `z-progress` supports wai-aria.
- `z-menu` supports use `<a />` and `<router-link />` as label, closes [#84](https://github.com/tusen-ai/naive-ui/issues/84).
- `z-input-number` adds `show-button` prop.
- `z-rate` support `default` slot for icon customizing.
- `z-rate` adds color prop.
- `z-rate` adds size prop.

### Fixes

- Fix `z-card`'s `header-style` it not applied to header. [#103](https://github.com/tusen-ai/naive-ui/issues/103)
- Fix `z-dialog` misses `destroyAll` method.
- Fix `z-data-table` misses `on-update-sorter`, `on-update-filters`, `on-update-page` and `on-update-page-size` props.

## 2.11.8 (2021-06-13)

### Feats

- `z-data-table` exports `DataTableCreateRowClassName`, `DataTableCreateRowKey` and `DataTableCreateRowProps` type.

### Fixes

- Fix `z-calendar`'s `on-update:model-value` prop type.
- Fix `z-form-item`'s style attribute `grid-template-columns` influence on the layout of child elements. [#93](https://github.com/tusen-ai/naive-ui/pull/93)
- Fix `z-data-table`'s prop types of `rowKey`, `rowClassName`, `rowProps`, `summary` aren't compatible with expected value.

## 2.11.7 (2021-06-12)

### Fixes

- Fix `z-slider` doesn't prevent scrolling when touchstart.
- Fix `z-color-picker`'s default value doesn't follow modes.
- Fix not `lodash` & `lodash-es` type.

## 2.11.6 (2021-06-11)

### Feats

- `z-spin`'s `size` prop support number.
- `z-date-picker` adds `footer` slot.

### Fixes

- Fix `z-slider` doesn't support touch events
- Fix `z-button` causes crash when it's imported in script inside head tag. [#68](https://github.com/tusen-ai/naive-ui/pull/68)
- Fix `z-spin` animation shifts.
- Fix `z-menu` lack `on-update-value` and `on-update-expanded-keys` props.
- Fix `z-popconfirm` icon slot not working.
- Fix `z-tabs` logs useless info.
- Fix `z-color-picker` set `modes` not working. [#77](https://github.com/tusen-ai/naive-ui/issues/77)

## 2.11.5 (2021-06-10)

### Feats

- `z-dropdown` adds `disabled` prop
- `z-card` adds `:target` style

### Fixes

- Fix `z-popover` sometimes won't sync position in manual mode.
- Fix `z-transfer`'s empty icon is no toggling transition.
- Fix `z-message` API option is not optional.
- Fix `z-calendar` date calculate incorrectly.
- Fix `z-input` misses the `password` type declaration.
- Fix `z-menu` the type definition of `extra` property of menu and submenu.
- Fix `z-dropdown` mouse cursor is not pointer.

## 2.11.4

### Feats

- `z-button` supports wai-aria.
- `z-card` supports wai-aria.
- `z-switch` supports wai-aria.
- `z-menu` supports basic wai-aria.
- `z-divider` supports basic wai-aria.
- `z-data-table` adds `row-props` prop.
- `z-date-picker` adds `ranges` prop.

### Fixes

- Fix `z-tab-pane` `display-directive` not working.
- Fix `z-drawer` animation.
- Fix `z-scrollbar`'s track may be overlayed in chrome windows.

## 2.11.3

- Fix `z-collapse` `default-expanded-names` not working.

## 2.11.2

### Fixes

- Fix `z-dropdown` default placement is not `bottom`.
- Fix `z-date-picker`'s input theme is not set in `date` & `datetime` type.
- Fix `z-config-provider` doesn't merge inherited theme.

### Feats

- `z-collapse` adds `arrow` slot

## 2.11.1

Update package.json & README.md.

## 2.11.0

### Breaking Changes

- `z-affix`'s `listen-to` prop is `document` by default (first scrollable parent before).

### Feats

- `z-affix`'s `listen-to` prop support `Window | Document | HTMLElement`.
- `z-anchor` adds `offset-target` prop.
- `z-select` adds `virtual-scroll` prop.
- `z-select` adds `consistent-menu-width` prop.
- `z-date-picker` update value after confirm is clicked.

### Fixes

- Fix `z-date-picker` doesn't disable start date correctly when value is empty.
- Fix `z-input-number` not restore valid value after blur.
- Fix `z-date-picker` display selected date when value is null in date mode.

### Deprecated

- `z-affix`'s `offset-top` prop is deprecated, please use `trigger-top` instead.
- `z-affix`'s `offset-bottom` prop is deprecated, please use `trigger-bottom` instead.
- `z-anchor`'s `listen-to` prop is removed.

## 2.10.0

### Breaking Changes

- `z-popover`'s `placement` prop default value is set to `'top'`.

### Feats

- `z-tabs` adds `on-close` prop.
- `z-tabs` adds `on-add` prop.
- `z-tabs` adds `tab` slot.
- `z-tab-pane`'s `tab` prop support render function & VNode.
- `z-tabs`'s `type` prop support `'line'` option.
- `z-tabs` adds box shadow to indicate scroll status.
- `z-tabs` adds `pane-style` prop

### Fixes

- Fix `z-layout`'s `scrollTo` not working when using native scrollbar.

### Deprecated

- `z-tab-pane`'s `label` prop is deprecated. Please use `tab` prop instead.

## 2.9.0

### Breaking Changes

- `z-layout-sider` removed `show-content` prop. Please use `show-collapsed-content` instead.

### Feats

- `z-data-table` support tree data.
- `z-data-table` adds `cascade` prop.
- `z-data-table` adds `children-key` prop.
- `z-data-table` adds `indent` prop.
- `z-button` adds `tag` prop.
- `z-data-table` adds `table-layout` prop.
- `z-tree` adds `block-line` prop.
- `z-tree` support drag & drop.
- `z-menu` adds `inverted` prop.
- `z-dropdown` adds `inverted` prop.
- `z-tabs` adds `addable` prop.
- `z-tabs` adds `tab-style` prop.
- `z-tabs` adds `tabs-padding` prop.
- `z-tabs` adds `default-model-value` prop.
- `z-layout-sider` & `z-layout-footer` & `z-layout-header` adds `inverted` prop.
- `z-data-table`'s `max-height` & `min-height` prop accept CSS value.
- `z-layout` & `z-layout-content` adds `embedded` prop.

### Fixes

- `z-layout` & `z-layout-sider`'s `scrollTo` not working with native scrollbar.
- `z-layout-sider`'s `collapse-mode` not working.
- Internal selection component's theme peers has wrong key for popover.

## 2.8.0

### Perf

- Optimize `z-data-table` init render count.
- Optimize `z-select` open duration after first opening.
- Optimize `z-anchor` scroll performance.

### Feats

- `z-tree` adds `virtual-scroll` prop.
- `z-data-table` adds `virtual-scroll` prop.
- `z-cascader` adds `virtual-scroll` prop.
- `z-pagination` adds `item-count` prop.
- `z-pagination` adds `prefix` prop.
- `z-pagination` adds `prefix` slot.
- `z-pagination` adds `suffix` prop.
- `z-pagination` adds `suffix` slot.
- `z-input` adds `show-count` prop.

### Fixes

- Fix `z-layout-sider` doesn't show menu after collapsed.
- Fix `z-input-number` doesn't reset to origin value when blur with invalid value.
- Fix `z-pagination` doesn't update page in uncontrolled mode.

## 2.7.4

### Feats

- `z-form-item` works without `z-form`.

### Fixes

- Fix `z-checkbox` check mark not displayed.
- Fix `z-date-picker` icon transition style in trigger.
- Fix `z-p`, `z-ol`, `z-ul` margin bottom is not 0 when they are last child.
- Fix `z-checkbox-group` not working in uncontrolled mode.
- Fix `z-data-table` clear check all in table now working.

## 2.7.3

### Feats

- `z-data-table` highlight sorted col.
- `z-data-table` col adds `render-filter` prop.
- `z-data-table` col adds `render-filter-icon` prop.

### Fixes

- `z-data-table` fixed column box-shadow more clear in dark theme.
- Fix `z-color-picker` value has line wrap.
- Fix `z-form` FormRuleItem.trigger types.

## 2.7.2

### Feats

- `z-data-table` adds `summary` prop.
- `z-data-table` adds `options` on `'type=selection'` column.

### Fixes

- Fix `z-layout` overflow on horizontal direction.

## 2.7.1

### Feats

- `z-checkbox` adds `focusable` prop.
- `z-cascader` adds `action` slot.

### Fixes

- Fix `z-cascader` loading triggered when click checkbox.
- Fix `z-cascader` menu mask style.

## 2.7.0

### Breaking Changes

- `z-drawer` doesn't have padding by default. `z-drawer-content` is provided to fill the drawer.

## 2.6.0

### Feats

- `z-drawer` adds `content-style` prop.
- `z-layout` adds `content-style` prop.
- `z-layout-sider` adds `content-style` prop.

### Feats

- `z-config-provider` Add `cls-prefix` prop.

### Fixes

- Fix `z-popover` may influence other popover when static props is hoisted.

## 2.5.1

### Feats

- `z-color-picker` adds `show-alpha` prop.

### Fixes

- Fix `z-select` default `fallback-option` breaks the component.

## 2.5.0

### Feats

- Add `z-skeleton` component.
- Add `z-calendar` component.
- Add `z-color-picker` component.
- `z-date-picker` locale adds `firstDayOfWeek`.
- `z-select` adds `showArrow` prop.

### Fixes

- Fix `z-date-picker` trigger has no focus style in focus is in panel.
- Fix `z-button` loading's fade-in transtion drifts.
- Fix `z-time-picker` close animation drifts in `z-date-picker`.
- Fix detached components in popover should stay in popover.

## 2.4.2

### Feats

- Add `z-form-item-gi` component.

### Fixes

- Fix `z-ellipsis` & `z-data-table` ellpisis cell mis-vertical-aligned.
- Fix `z-select` filterable doesn't work with composite events.

## 2.4.1

### Fixes

- Fix `z-select` caret color in single filter mode.
- Fix `z-select` menu action part can't be focused.

## 2.4.0

### Feats

- Add `z-image` component.
- Add `z-global-style` component.
- Add `z-theme-editor` component.
- Add `z-page-banner` component.
- `z-statistic` adds `label` slot.
- `z-breadcrumb-item` adds `separator` slot & prop.
- `z-button` adds `bordered` prop.
- `z-card` adds `footer-style` prop.

### Refactors

- Refactor `z-statistic`'s style
- `z-menu` adds `options` prop to replace `items` prop, `items` prop is deprecated.

### Fixes

- Fix `z-anchor` `ignore-gap` not working
- Fix `z-collapse` content is truncated by `overflow: hidden`.
- Fix `z-select` tag text overflow.
- Fix `z-popover` doesn't hide as expected in mobile phone.

## 2.3.1

### Fixes

- Fix `z-layout-sider` horizontal content overflows.

## 2.3.0

### Breaking Changes

- Collapsing won't work for `z-layout-sider` with `position="absolute"`.
- For `z-layout` contains `z-layout-sider` as a direct child `has-sider` must be set.

## 2.2.0

### Feats

- Add `z-mention` component.
- `z-data-table` supports expanding rows.

### Fixes

- Fix `z-input` focused background color not correct in warning & error status in dark theme.
- Fix `z-input` caret color not correct in warning & error status.
- Fix `z-select`'s namespace not correct.
- Fix `z-cascader`'s namespace not correct.
- Fix `z-input` in textarea mode can't select text.
- Fix `z-input` in textarea mode has no box-shadow.
- Fix `z-input` in textarea mode `autosize` line not correct due to inconsistant font family.
- Fix `z-input` in textarea mode `autosize` rows not changed if props.value is changed from outside.

### Refactors

- Change `z-empty`'s icon and make it size larger

## 2.1.3

### Fixes

- Fix `z-data-table` has no right border of non-last td.
- Fix `z-data-table` header has no enough width when table width is more than `scroll-x`

## 2.1.2

### Feats

- `z-data-table`'s column adds `colSpan` and `rowSpan` prop.
- `z-data-table`'s column adds `titleColSpan` prop.

### Fixes

- Fix `z-dropdown` with `x` and `y` set logs errors when mouse move outside it.

## 2.1.1

### Fixes

- Fix `z-select` selection overflow counter wrong popover trigger area

## 2.1.0

### Breaking Changes

- `z-popover` default `duration` is set to `100`.
- `z-popover` default `delay` is set to `100`.
- `z-tooltip` default `showArrow` is set to `true`.

### Feats

- `z-config-provider` prop `theme-overrides` support inheritance.
- `z-card` adds `hoverable` prop.
- `z-select` adds `max-tag-count` prop.
- `z-cascader` adds `max-tag-count` prop.
- `z-popover` adds `get-disabled` prop.
- adds `z-ellipsis` component.
- `z-popover`'s `width` prop adds `'trigger'` option.
- `z-data-table`'s columns's `ellipsis` prop can be set as props of `z-ellipsis`. x

### Fixes

- Fix `z-cascader` menu appears after click clear button.
- Fix `z-card`'s action not placed at bottom after style height is set.
- Fix `z-popover`'s `duration` and `delay` prop works unexpectly.

## 2.0.1

### Feats

- `z-layout-sider` adds `default-collapsed` prop.
- `z-modal` support custom position.

### Fixes

- Fix `z-menu` tooltip of `z-menu-item` won't show when vertical collapsed.
- Fix `z-menu` `collapsed-icon-size` not working.
- Fix `z-menu` callback props validate array with error.
- Fix `z-layout-sider` toggle button is covered.

## 2.0.0

See vue3.md

## 1.6.0

### Fixes

- Fix the problem that `z-auto-complete`'s menu can't be closed when use `textarea` as input.
- Fix the problem that nested `z-icon` is not flattened.
- Fix the problem that `z-date-picker` has no year in panel when type is `date` and `datetime`.

### Feats

- `z-button` adds `dashed` props
- Add `z-space` component.
- Make `z-drawer` content scrollable.

## 1.5.5 (2020-08-15)

### Breaking Changes

- Fix all typos of `separator`. (Originally it was `seperator`.)

### Fixes

- Fix the problem that when theme is not set, style errors will be logged.
- Fix the text color of `z-select`'s placeholder when `single` `filterable`.

## 1.5.4 (2020-08-08)

### Fixes

- Fix the problem that Message, Notification, Confirm doesn't follow theme change.

## 1.5.3 (2020-07-23)

### Fixes

- Fix the problem that `z-select` display with mistakes when `placeholder` is empty.

## 1.5.2 (2020-07-22)

### Fixes

- Fix the problem that `z-radio` can not be focused.
- Fix the problem that `z-data-table`'s `max-height` style is broken. <https://bugs.chromium.org/p/chromium/issues/detail?id=1107223>

### Refactors

- Refactor `z-tag` styles.

## 1.5.1 (2020-07-20)

### Feats

- Add `disabled` for `z-time-picker`.

### Fixes

- Fix the child elements of `z-radio` cannot focus.

## 1.5.0 (2020-07-09)

### Breaking Changes

- Refactor experimental setting primary color feature.

### Fixes

- Fix some style glitches.

## 1.4.1 (2020-06-23)

### Feats

- Add `autofocus` for `z-select`.

## 1.4.0 (2020-06-19)

### Breaking Changes

- `z-menu` doesn't support slot API anymore.

### Feats

- Add experimental setting primary color feature.

## 1.3.5 (2020-06-06)

### Feats

- Add `type` for `z-button`

### Fixes

- Fix the problem that if `z-input` is too width, its inner input elements' width won't expand.
- Fix style glitches of border of a `z-input-number` inside a `z-input-group`.

## 1.3.4 (2020-06-05)

### Fixes

- Fix the problem that `z-a`'s `to` prop can't be a object.

## 1.3.3 (2020-06-03)

### Feats

- Add `$NOs.theme` to get the current theme of the OS.

## 1.3.2 (2020-06-02)

### Fixes

- Fix the problem that `z-log`'s loading indicator uses monospace font.
- Fix the problem that icon-related class name isn't applied properly.

## 1.3.1 (2020-06-01)

### Fixes

- Fix the problem that checkbox in the selection column of `z-data-table` is not center aligned.
- Fix the problem that header of `z-data-table` has no border-color transition.
- Fix the problem that `show-icon` & `closable` & `bordered` props of `$NConfirm` don't work.

### Feats

- Add and adjust some colors in the style scheme of `z-config-consumer`.

## 1.3.0 (2020-06-01)

### Breaking Changes

- Default UI CSS bundle won't include external font files. If you need using it you should import it explicitly.

### Feats

- Add `themed-style` prop on `z-layout`.

### Fixes

- Fix the problem that round toggle button won't rotate `z-layout-sider` when collapsed status is changed.
- Fix the problem that `z-form-item`'s feedback has no leave animation if it is set at first.
- Fix the problem that max-height related styles of `z-data-table` are applied all the time.
- Fix some style glitches.

### Refactors

- Refactor some components' styles in the light theme.

## 1.2.1 (2020-05-29)

### Fixes

- Fix the problem that `z-slider` tooltip has no z-index.

## 1.2.0 (2020-05-29)

### Feats

- Add `feedback` and `validation-status` props for `z-form-item`.

## 1.1.5 (2020-05-28)

### Feats

- Add `display-directive` prop for `z-collapse` and `z-collapse-item`.
- Add `class` and `style` prop for `z-select`'s `option`.
- Add `debug` prop for `z-select`.

### Fixes

- Fix the problem that `z-select` can still be cleared when disabled.

## 1.1.4 (2020-05-28)

### Fixes

- Fix the problem that the input value of `z-select` may be modified directly.

### Refactors

- An UI instance can be install to a Vue instance for no more than once.

## 1.1.3 (2020-05-20)

### Chores

- Update css-render dependencies.

### Fixes

- Fix the problem that `z-transfer`'s animation disorder when value changes.

## 1.1.2 (2020-05-19)

### Feats

- Add content slot for `z-step`.
- Add `label` prop for `z-checkbox`.

### Performance Improvements

- All placeable components register listeners on demand.
- Use cache when finding scrollable parent node.
- Imporve performance of `z-button`'s beforeDestroy.
- Reduce the useless re-rendering of `z-checkbox` when checked status isn't changed.
- Imporve performance of text typed `z-avatar`.

## 1.1.1 (2020-05-18)

### Fixes

- Update css-render dependencies.
- Color of default typed button icon.

### Performance Improvements

- Reduce useless re-renders of `z-menu-item`.
- Reduce useless re-renders of doc page.

### Refactors

- Refactor the codes of `z-nimbus-service-layout` for performance reason, may be there will be some bugs.

## 1.1.0 (2020-05-16)

### Feats

- `z-button` now accepts custom color.

### Refactors

- Replace all $slots by $scopedSlots for better robustness.
- Move some static button styles inside button component to create dynamically.

## 1.0.14 (2020-05-15)

### Fixes

- Fix the problem that `line` typed `z-tabs`'s line position stays still when `activeName` changes.
- Fix the problem that `z-tabs` scroll button is not triggered when tabs' width changes.
- Fix the problem that height change of `z-tabs` will unexpectly trigger some re-render callbacks.

## 1.0.13 (2020-05-14)

### Fixes

- Fix the problem that label slot of the `z-form-item-col` & `z-form-item-row` cannot display.

## 1.0.12 (2020-04-30)

### Fixes

- Fix the problem that some CSS length props are badly formated.

## 1.0.11 (2020-04-30)

### Feats

- Add `fallback-option` prop for `z-select` to deal with the value with no corresponding option.

### Fixes

- Fix the problem that `max-height` and `min-height` are ill displayed on `z-data-table`.

### Breaking Changes

- `z-data-table`'s `max-height` and `min-height` will be applied to the entire table part, not only body.
- `z-select` will display value with no corrensponding option.

## 1.0.10 (2020-04-28)

### Feats

- Add `arrow-placement` prop on `z-collapse`.
- Add `arrow` slot on `z-collapse-item`.

### Fixes

- Fix the problem that detachable components detached in wrong place when nested like `modal > drawer > component`.

## 1.0.9 (2020-04-23)

### Feats

- Add `autofocus` prop on `z-input`.
- Add `closable` option on `ZMessage`.

### Fixes

- Fix the problem that the default value of `z-tag` `closable` is set to `true`.
- Fix the problem that `z-data-table` can't use all `pagination`'s props.
- Fix the problem that `z-pagination`'s `on-page-size-change` prop doesn't work.

## 1.0.8 (2020-04-22)

### Feats

- Add `z-dynamic-tags`.
- Add `tableHeaderOverlayBackgroundColor` & `inputOverlayBackgroundColor` to `styleScheme`

## 1.0.7 (2020-04-10)

### Feats

- Add `filter-option-value` prop for `z-data-table`'s `column` to better deal with single filter mode.

### Fixes

- Fix the problem that `z-collpase-item` don't support `number` typed `name`.

## 1.0.6 (2020-04-03)

### Fixes

- Fix the problem that all the `console` statements are striped in the bundle.

## 1.0.5 (2020-03-27)

### Feats

- Change the data type of `z-data-table`'s filters from Array to Object.

### Fixes

- `z-data-table` cannot be filtered correctly when there are multiple filtered columns.

## 1.0.4 (2020-03-26)

### Feats

- Filter menu in `z-data-table` is scrollable when there are too many items.

## 1.0.3 (2020-03-25)

### Feats

- `$ZMessage`, `$NNotification`, `$NConfirm`'s theme will be applied on their children components.

### Fixes

- View measuring element will confict when multiple naive-ui exist.
- `validate` method of `z-form-item` won't be resolved for some validator.
- `$NConfirm`'s theme doesn't follow `z-config-provider`'s theme.

## 1.0.2 (2020-03-23)

### Fixes

- `z-transfer`'s options are not reinitialized after value changes.
- `z-nimbus-service-layout` (deprecated) doesn't deal with the compatibility of Vue Router(under 3.1)'s `push` method.

## 1.0.1 (2020-03-21)

### Feats

- Add `'bar'` & `'arrow-circle'` on `show-trigger` prop of `z-layout-sider`.

### Fixes

- Rails of `z-scrollbar` shadow mouse event.

### Feats

- `z-date-table` adds `empty` slot. [#86](https://github.com/tusen-ai/naive-ui/issues/86)
