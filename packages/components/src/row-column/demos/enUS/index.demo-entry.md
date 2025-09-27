# Row Column

This will provide Row and Column component that is used for layouting the component.

<!--single-column-->

<z-alert title="Caveat" color="warning" style="margin-bottom: 16px" :bordered="false">
  At most of time you should use <router-link to="grid" #="{ navigate, href }" custom><z-a :href="href" @click="navigate">Grid</z-a></router-link>.
</z-alert>

A basic grid system.

## Demos

```demo
basic.vue
gutter.vue
offset.vue
push-pull.vue
```

## API

### Row Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| gutter | `number \| string \| [number, number] \| [string, string]` | `0` | `horizontal gutter` or `[horizontal gutter, vertical gutter]` |

### Col Props

| Name   | Type     | Default | Description |
| ------ | -------- | ------- | ----------- |
| span   | `number` | `1`     |             |
| offset | `number` | `0`     |             |
| push   | `number` | `0`     |             |
| pull   | `number` | `0`     |             |
