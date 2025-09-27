<markdown>
# Default file list

We can set the default file list by using the `default-file-list` prop.
</markdown>

<template>
  <z-upload
    action="https://robohash.org/0e01f2b7f17b44c5db9f7602631e7240"
    :default-file-list="defaultFileList"
  >
    <z-button>Upload File</z-button>
  </z-upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { UploadFileInfo } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const defaultFileList: UploadFileInfo[] = [
      {
        id: 'the',
        name: 'The.pdf',
        status: 'finished'
      },
      {
        id: 'razars',
        name: "Razars's.pdf",
        status: 'finished'
      },
      {
        id: 'edge',
        name: 'Blade.pdf',
        status: 'finished'
      }
    ]
    return {
      defaultFileList
    }
  }
})
</script>
