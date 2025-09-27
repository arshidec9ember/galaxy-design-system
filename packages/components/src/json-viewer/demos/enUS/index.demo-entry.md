# Json Viewer

The following JsonViewer will help us to view json code. It uses the [vue-json-pretty](https://www.npmjs.com/package/vue-json-pretty) package to display the json data. View Content is a container based data display component used on pages to display a group of information. It holds key-value pairs in the detail view screen. The values are not just text, it can be badge, image, link etc.

```html
<script src="vue-json-pretty/lib/styles.css"></script>
```

or

```ts
import 'vue-json-pretty/lib/styles.css'
```

```overview-html
json-viewer/demos/enUS/index.html
```

## Demos

```demo
basic.vue
line-numbers.vue
expand-collapse.vue
copy.vue
comment.vue
dark-view.vue
scrollable.vue
fixed-height.vue
```

## Customization

```customization
key-value.vue
```

## API

### Code Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data | `JSON object` |  | to pass the json data. |
| showLength | `boolean` | `false` | to show the length of collapse item. |
| showLineNumber | `boolean` | `true` | to show the line-number on left side of JSON data. |
| collapsedOnClickBrackets | `boolean` | `true` | to provide expand and collapse behaviour. |
| showIcon | `boolean` | `true` | to show icon with expand-collapse. |
| showDoubleQuotes | `boolean` | `true` | to show doublequotes on key. |
| itemHeight | `number` | 20 | the height of each node. |
| copyable | `boolean` | `false` | copy the content of data. |
| darkTheme | `boolean` | `false` | to show dark mode in light theme. |
| depth | `number` |  | Paths greater than this depth will be collapsed. |
| scrollable | `boolean` | `false` | to provide scroll effect if height of content exceed the height provided. |
| height | `number` | undefined | height of the json container. |
| on-node-click | `(node: NodeData) => void` | undefined | Callback triggered when the click on node. |
| on-brackets-click | `(collapsed: boolean) => void` | undefined | Callback triggered when the click on brackets. |
| on-icon-click | `(collapsed: boolean) => void` | undefined | Callback triggered when the click on icon. |
| on-copy | `(e: data) => void` | undefined | Callback triggered when the click on copy button. |

### Json Viewer Slots

| Name | Parameters | Description |
| --- | --- | --- |
| key-node | `(node: NodeData, defaultKey: string \| JSX.Element)` | Content for key. |
| value-node | `(node: NodeData, defaultValu: string \| JSX.Element)` | Content for value. |
