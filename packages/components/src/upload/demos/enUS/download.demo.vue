<markdown>
# Download when finished

set `show-download-button` to show download button. set `on-download` to provide a handler function when download button clicked.
</markdown>

<template>
  <z-upload
    action="https://robohash.org/0e01f2b7f17b44c5db9f7602631e7240"
    :default-file-list="fileList"
    list-type="text"
    show-download-button
    type="pdf"
    @download="handleDownload"
  >
    <z-button>Upload</z-button>
  </z-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'
import type { UploadFileInfo } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const fileListRef = ref<UploadFileInfo[]>([
      {
        type: 'pdf',
        id: 'c',
        name: 'Finished you can dowload.pdf',
        status: 'finished',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      },
      {
        id: 'd',
        name: 'Waiting for the finish .doc',
        status: 'uploading',
        percentage: 50
      },
      {
        id: 'a',
        name: 'My Fault.png',
        status: 'error'
      }
    ])
    const handleDownload = (file: UploadFileInfo) => {
      message.success(`success：${file.name}`)
    }
    return {
      fileList: fileListRef,
      handleDownload
    }
  }
})
</script>
