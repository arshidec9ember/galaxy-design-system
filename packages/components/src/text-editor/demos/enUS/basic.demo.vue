<markdown>
 # Basic
 </markdown>

<template>
  <div>
    <ZTextEditor
      v-model:value="editorText"
      :input-box-width="'50%'"
      :editor-id="'basic-editor'"
      :preview-only="false"
      :read-only="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MDEditorEG',
  setup () {
    const editorText = ref('### Hello, Markdown!')
    return {
      editorText
    }
  }
})
</script>
<style>
@import 'md-editor-v3/lib/style.css';
</style>
