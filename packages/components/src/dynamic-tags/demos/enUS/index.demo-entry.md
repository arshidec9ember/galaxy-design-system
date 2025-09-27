# Dynamic Tags

## CautionAlert

## Demos

```demo
basic.vue
max.vue
form.vue
slot.vue
render-tag.vue
option-format.vue
on-create.vue
```

## API

### DynamicTags Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| closable | `boolean` | `true` | Whether the tag is closable. |
| color | `'neutral' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error' \| { color?: string, borderColor?: string, textColor?: string }` | `neutral` | Color of the tag |
| default-model-value | `string[]` | `[]` | Default value. |
| disabled | `boolean` | `false` | Whether the tag is disabled. |
| input-props | `InputProps` | `undefined` | Props of internal `z-input`. |
| input-style | `string \| Object` | `undefined` | Customize the style of the input. |
| max | `number` | `undefined` | Maximum number of tags. |
| round | `boolean` | `false` | Whether the tag has rounded corners. |
| render-tag | `((tag: string, index: number) => VNodeChild) \| ((tag: { label: string, value: string }, index: number) => VNodeChild)` | `undefined` | custom render tag. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the tag. |
| tag-style | `string \| Object` | `undefined` | Customize the style of the tag. |
| model-value | `string[]` | `undefined` | Value if manually set. |
| on-create | `((label: string) => string) \| ((label: string) => ({ label: string, value: string }))` | `label => label` | Create derived value from input. |
| on-update:model-value | `((value: string[]) => void) \| ((value: DynamicTagsOption[]) => void)` | `undefined` | Callback when the component's value changes. |

#### DynamicTagsOption Type

```ts
export interface DynamicTagsOption {
  label: string
  value: string
}
```

### DynamicTags Slots

| Name | Parameters | Description |
| --- | --- | --- |
| input | `(info: { submit: (value: any) => void, deactivate: () => void })` | Custom element(s) to replace the regular input. |
| trigger | `(info: { activate: () => void, disabled: boolean })` | The element or component that triggers the tag to switch to an input. |
