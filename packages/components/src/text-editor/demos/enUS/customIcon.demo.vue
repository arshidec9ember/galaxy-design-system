<markdown>
 # Custom Icon
 </markdown>
<template>
  <div>
    <ZTextEditor
      value="### Hello, Markdown!"
      :editor-id="'icon-prop'"
      :custom-icon="customIcon"
      :code-theme="'kimbie'"
      :toolbars="['bold', 'underline']"
      :on-change="onChange1"
      :input-box-width="'50%'"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MDEditorEG',
  setup () {
    const customIcon = {
      bold: {
        component: 'A'
      },
      underline: {
        component: 'N'
      }
    }
    function onChange1 (elem) {
      console.log('onChange', elem)
    }
    return {
      customIcon,
      onChange1
    }
  }
})
</script>
