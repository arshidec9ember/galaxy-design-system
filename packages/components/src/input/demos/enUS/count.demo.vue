<markdown>
# Word limit

Word limit can be set using `maxlength` prop. `show-count` prop can be used to show the number of words remaining.
</markdown>

<template>
  <z-space vertical>
    <z-input maxlength="30" show-count clearable />
    <z-input default-model-value="Yes" show-count clearable>
      <template #count="{ value }">
        {{ value.includes('Yes') ? '99+' : value.length }}
      </template>
    </z-input>
    <z-input type="textarea" maxlength="30" show-count />
    <z-input type="textarea" default-model-value="What?" show-count>
      <template #count="{ value }">
        {{ value.includes('What?') ? '99+' : value.length }}
      </template>
    </z-input>
  </z-space>
</template>
