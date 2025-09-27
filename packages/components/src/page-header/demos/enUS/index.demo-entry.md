# Page Header

PageHeader can be used to highlight the page topic, display important information about the page, and carry the action items related to the current page (including page-level operations, inter-page navigation, etc.) It can also be used as inter-page navigation.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&mode=design&t=sF4GdrOXNiNtu7Wp-0
```

```overview-html
page-header/demos/enUS/index.html
```

<!--single-column-->

## Demos

```demo
page-banner.vue
inverted.vue
page-header.vue
topbar.vue
```

## Customization

```customization
customize.vue
```

## API

### PageHeader Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | `'small' \| 'medium' \| 'large' \| 'x-large'` | `'medium'` | Different padding and font sizes. |
| description | `string` | `undefined` | The header description can be used below the header. |
| inverted | `boolean` | `undefined` | Inverted color of the component. |
| title | `string` | `undefined` | Header Title area. |
| on-back | `() => void` | `undefined` | Callback for when the back button is pressed. |

### PageHeader Slots

| Name | Parameters | Description |
| --- | --- | --- |
| avatar | `()` | Displays image information, Image information aside of header. |
| navigation | `()` | Represents header information, containing title. or navigation info like a breadcrumb |
| default | `()` | Displays the main content of the component. |
| actions | `()` | Reserved for additional information or components that complement the main content in the header section. |
| footer | `()` | Typically used for displaying additional details, links, or actions at the bottom. |
| description | `()` | Descriptive information related to the content or purpose of the header section. |
| title | `()` | Main title or headline information. |
| back | `()` | Displays a back icon, usually used for navigation. |
