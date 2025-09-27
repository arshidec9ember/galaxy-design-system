<markdown>
# Count graphemes

Browser's default `maxlength` and `minlength` and @zeta-gds/components's builtin character count method can't split all string correctly. You can use `count-graphemes` count to count graphemes correctly.
</markdown>

<template>
  <z-form>
    <z-form-item label="Default behavior">
      <z-input default-model-value="🌷🏳️‍🌈" show-count :maxlength="12" />
    </z-form-item>
    <z-form-item label="Correct behavior">
      <z-input
        default-model-value="🌷🏳️‍🌈"
        show-count
        :maxlength="12"
        :count-graphemes="countGraphemes"
      />
    </z-form-item>
  </z-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GraphemeSplitter from 'grapheme-splitter'

export default defineComponent({
  setup () {
    const splitter = new GraphemeSplitter()
    return {
      countGraphemes: (value: string) => splitter.countGraphemes(value)
    }
  }
})
</script>
