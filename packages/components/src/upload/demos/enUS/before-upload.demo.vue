<markdown>
# Before upload hook

Use `before-upload` to perform a function before the upload starts (e.g. cancel the upload).
</markdown>

<template>
  <z-upload
    action="https://robohash.org/0e01f2b7f17b44c5db9f7602631e7240"
    @before-upload="beforeUpload"
  >
    <z-button>Upload PNG</z-button>
  </z-upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'
import type { UploadFileInfo } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      async beforeUpload (data: {
        file: UploadFileInfo
        fileList: UploadFileInfo[]
      }) {
        if (data.file.file?.type !== 'image/png') {
          message.error(
            'Only upload picture files in png format, please re-upload.'
          )
          return false
        }
        return true
      }
    }
  }
})
</script>
