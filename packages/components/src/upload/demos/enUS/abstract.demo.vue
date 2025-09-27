<markdown>
# Split trigger and list

You can split the trigger and the file list by using the `abstract` prop.

Note: `z-upload-trigger` and `z-upload-file-list` must be children of `<z-upload />`.
</markdown>

<template>
  <z-upload
    abstract
    :default-file-list="fileList"
    action="https://robohash.org/0e01f2b7f17b44c5db9f7602631e7240"
  >
    <z-button-group>
      <z-button>Useless</z-button>
      <z-upload-trigger #="{ handleClick }" abstract>
        <z-button @click="handleClick">
          Upload
        </z-button>
      </z-upload-trigger>
    </z-button-group>
    <z-card-standard style="margin-top: 12px" title="File List">
      <z-upload-file-list />
    </z-card-standard>
  </z-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { UploadFileInfo } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const fileListRef = ref<UploadFileInfo[]>([
      {
        type: 'pdf',
        id: 'c',
        name: 'Finished you can dowload.pdf',
        status: 'finished',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      }
    ])

    return { fileList: fileListRef }
  }
})
</script>
