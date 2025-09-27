# Common Issues

## 1. The difference between @update:xxx and on-update:xxx

### Case 1

If you are not using `v-model:xxx` with `on-update:xxx` on the same component, there is no difference between `@update:xxx` and `on-update:xxx` when used in templates.

In Galaxy Design Components, all API documents use the `on-update:xxx` format, because `@` is just a shorthand provided by Vue.

If you prefer camelCase, you can use `onUpdate:xxx`.

If you are using JSX, you can use `onUpdateXxx` (all `onUpdate:xxx` have an equivalent implementation of `onUpdateXxx`).

### Case 2

If you are using `v-model:xxx`, you should use `@update:xxx` on the same component.

✅ example `<z-input v-model="xxx" @update:model-value="yyy" />`.

❌ example `<z-input v-model="xxx" :on-update:model-value="yyy" />`.

That is because `v-model="xxx"` will be transformed to `:onUpdate:model-value="xxx"`. If you are using `@update:model-value="yyy"` together, it will be `:onUpdate:model-value="[xxx, yyy]"`, and then Galaxy Design Components would take care of if.

However if you are using `on-update:model-value="yyy"`, Vue would generate code like `:onUpdate:modelValue="xxx" :on-update-model-value="yyy"` and the second one would override the first one in Vue runtime. The `v-model` would be broken.

If you have any problems, feel free to create a PR or issue on GitHub.
