# Panel

A Panel is a versatile component that allows users to display content with additional functionalities such as closing, opening in full screen, and opening in a new tab. It provides a flexible layout with a header, content, and footer sections.

```figma
https://www.figma.com/file/XWAuBP36BUetYXFLVLsxAh/Side-Panel-Prototype?node-id=15%3A26014&mode=dev
```

```overview-html
panel/demos/enUS/index.html
```

<!--single-column-->

## Demos

```demo
basic.vue
toolbar-controls.vue
toolbar-navigation-controls.vue
panel-sider-right.vue
panel-sider-left-right.vue
```

## API

### Panel Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `` | Title of the panel. |
| description | `string` | `` | Description text that appears below the title. |
| closable | `boolean` | `false` | Whether the panel can be closed. |
| expandable | `boolean` | `false` | Whether the panel can be expanded to the full width. |
| expanded | `boolean` | `false` | Whether the panel is expanded or not. If expanded, icon to collapse full width is shown instead of expanding to full width. |
| primary-btn-props | `object` | `undefined` | Props of the button component to render a primary button in footer. See [Button props](button#Button-Props). |
| secondary-btn-props | `object` | `undefined` | Props of the button component to render a secondary button in footer. See [Button props](button#Button-Props). |
| previous-btn-props | `object` | `undefined` | Props of the button component to render a previous button in header toolbar (left-aligned). See [Button props](button#Button-Props). |
| next-btn-props | `object` | `undefined` | Props of the button component to render a next button in header toolbar (left-aligned). See [Button props](button#Button-Props). |
| current-page | `number` | `undefined` | Current page number to display in the toolbar pagination (e.g., "1 of 24"). |
| total-pages | `number` | `undefined` | Total number of pages to display in the toolbar pagination (e.g., "1 of 24"). |
| open-in-new-tab | `boolean` | `false` | Whether the panel can be opened in a new tab. |
| header-actions | `Array<DropdownOption>` | `[]` | Actions to be displayed in the panel header using Dropdown options prop. See [Dropdown options type](dropdown#Dropdown-Props). |
| on-header-action-select | `(value: string) => void` | `undefined` | Callback function triggered on selecting of an option in popselect related to header actions. |
| on-primary-btn-click | `() => void` | `undefined` | Callback function triggered on click of primary button in the footer. |
| on-secondary-btn-click | `() => void` | `undefined` | Callback function triggered on click of secondary button in the footer. |
| on-previous-btn-click | `() => void` | `undefined` | Callback function triggered on click of previous button in the header toolbar. |
| on-next-btn-click | `() => void` | `undefined` | Callback function triggered on click of next button in the header toolbar. |
| on-close | `() => void` | `undefined` | Callback function triggered on click of icon for closing. |
| on-expand | `() => void` | `undefined` | Callback function triggered on click of icon for expanding to a full width. |
| on-open-in-new-tab | `() => void` | `undefined` | Callback function triggered on click of icon for opening in a new tab. |
| on-collapse | `() => void` | `undefined` | Callback function triggered on click of icon for collapsing to the initial width. |

### Panel Slots

| Name | Parameters | Description |
| --- | --- | --- |
| header-start | `()` | Content to be placed at the start of the header. |
| header-actions | `()` | Custom header actions. |
| controls | `()` | Custom controls. |
| header | `()` | Custom header. |
| toolbar-window-controls | `()` | Custom window controls for the toolbar (open in new tab, expand/collapse buttons). |
| toolbar-navigation-controls | `()` | Custom navigation controls for the toolbar (previous/next buttons). |
| toolbar-pagination | `()` | Custom pagination display for the toolbar. |
| default | `()` | Default content of the panel. |
| footer | `()` | Custom footer. |
| footer-start | `()` | Content to be placed at the start of the footer. |
| footer-end | `()` | Content to be placed at the end of the footer. |
