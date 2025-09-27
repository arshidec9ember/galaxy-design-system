<markdown>
# Autosize

No of rows in the text area can be set using `autosize` prop. `minRows` and `maxRows` can be used to set the minimum and maximum number of rows respectively.
</markdown>

<template>
  <z-space vertical>
    <z-input placeholder="Autosizable" autosize style="min-width: 50%" />
    <z-input
      placeholder="Autosizable"
      type="textarea"
      size="small"
      :autosize="{
        minRows: 3,
        maxRows: 5
      }"
    />
    <z-input
      type="textarea"
      placeholder="Autosizable"
      :autosize="{
        minRows: 4
      }"
    />
  </z-space>
</template>
