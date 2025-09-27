<markdown>
# Change file on finish

You can change a file's properties after its upload has finished.
</markdown>

<template>
  <z-upload
    action="https://robohash.org/21aaef479ddf20c8acb4c09467e7a356?set=set1&bgset=&size=400x400"
    @finish="handleFinish"
  >
    <z-button>Upload</z-button>
  </z-upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'
import type { UploadFileInfo } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const handleFinish = ({
      file,
      event
    }: {
      file: UploadFileInfo
      event?: ProgressEvent
    }) => {
      message.success((event?.target as XMLHttpRequest).response)
      const ext = file.name.split('.')[1]
      file.name = `renamed.${ext}`
      file.url = 'https://robohash.org/21aaef479ddf20c8acb4c09467e7a356'
      return file
    }
    return {
      message,
      handleFinish
    }
  }
})
</script>
