<markdown>
# Basic

For example, JavaScript, Python and C++.
</markdown>

<template>
  <div style="overflow: auto">
    <z-space vertical :size="16">
      <z-code
        :code="`
function sleep (ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
`"
        language="javascript"
      />
      <z-code
        :code="`
def say_hello():
    print('Hello Galaxy Design Components')
`"
        language="python"
      />
      <z-code :code="cppCode" language="cpp" />
    </z-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      cppCode: `int main () {
  std::cout << "Hello Galaxy Design Components";
  return 0;
}`
    }
  }
})
</script>
