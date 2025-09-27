<markdown>
# Height & border radius

In case you aren't satisfied with height & border-radius.
</markdown>

<template>
  <z-space vertical>
    <z-progress
      variant="line"
      :percentage="50"
      :height="24"
      :border-radius="4"
      :fill-border-radius="0"
    />
    <z-progress
      variant="line"
      status="error"
      :percentage="50"
      :height="24"
      border-radius="12px 0 12px 0"
      fill-border-radius="12px 0 12px 0"
    >
      A Kind of Art
    </z-progress>
  </z-space>
</template>
