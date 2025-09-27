<markdown>
# Uncontrolled manually submit

You can use a `ref` to get a handle on files uploaded, and the `submit` method to submit them when you're ready.
</markdown>

<template>
  <z-button
    :disabled="!fileListLength"
    style="margin-bottom: 12px"
    @click="handleClick"
  >
    Upload File
  </z-button>
  <z-upload
    ref="upload"
    action="https://robohash.org/21aaef479ddf20c8acb4c09467e7a356?set=set1&bgset=&size=400x400"
    :default-upload="false"
    multiple
    @change="handleChange"
  >
    <z-button>Select File</z-button>
  </z-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { UploadInst, UploadFileInfo } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const fileListLengthRef = ref(0)
    const uploadRef = ref<UploadInst | null>(null)

    return {
      upload: uploadRef,
      fileListLength: fileListLengthRef,
      handleChange (data: { fileList: UploadFileInfo[] }) {
        fileListLengthRef.value = data.fileList.length
      },
      handleClick () {
        uploadRef.value?.submit()
      }
    }
  }
})
</script>
