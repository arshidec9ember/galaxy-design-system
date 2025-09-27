<markdown>
# Trim

You can use the trim prop to remove or add the blank lines at the beginning and end of the code.
The default value is true.
</markdown>

<template>
  <div style="overflow: auto">
    <z-space vertical :size="16">
      <z-code
        :trim="false"
        :code="`

// trim: false

function sleep (ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
// trim: false

`"
        language="javascript"
      />
    </z-space>
  </div>
</template>
