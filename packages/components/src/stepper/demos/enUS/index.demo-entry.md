# Stepper

Stepper is a UI shell component and used for hosting multi-steps flows/processes. This component is a combination of different utility components like stepper for showing the user progress and container component for showing the step related data plus the required actions.

<!--single-column-->

1, 2, 3... done!

```overview-html
stepper/demos/enUS/index.html
```

## Demos

```demo
basic.vue
vertical.vue
click.vue
```

## Customization

```customization
wizard.vue
content.vue
custom-icon.vue
```

## API

### Stepper Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| current | `number` | `undefined` | Currently active step index. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Stepper size. |  |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `'process'` | Stepper status. |  |
| vertical | `boolean` | `false` | Stepper vertical. |  |
| on-update:current | `(index: number) => void` | `undefined` | Callback on currently active step index changed. If it's set, step can be switched by click. | 2.29.1 |

### Step Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| description | `string` | `undefined` | Step description. |  |
| disabled | `boolean` | `false` | Whether it's clickable. | 2.29.1 |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `undefined` | Step status. |  |
| title | `string` | `undefined` | Step title. |  |

### Stepper Slots

| Name        | Parameters | Description                      |
| ----------- | ---------- | -------------------------------- |
| default     | `()`       | Stepper content.                 |
| finish-icon | `()`       | `'finish'` status button deploy. |
| error-icon  | `()`       | `'error'` status button deploy.  |

### Step Slots

| Name    | Parameters | Description   | Version |
| ------- | ---------- | ------------- | ------- |
| default | `()`       | Step content. |         |
| icon    | `()`       | Step icon.    | 2.26.1  |
| title   | `()`       | Step title.   |         |
