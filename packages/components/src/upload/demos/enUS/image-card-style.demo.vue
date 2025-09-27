<markdown>
# Pictures wall

By default, this will use Galaxy Design Components's internal preview component. You can also use `on-preview` to customize what to do when previewing a file.
</markdown>

<template>
  <z-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image-card"
  />
  <z-divider />
  <z-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="previewFileList"
    list-type="image-card"
    @preview="handlePreview"
  />
  <z-modal
    v-model:show="showModal"
    preset="card"
    style="width: 600px"
    title="A Cool Picture"
  >
    <img :src="previewImageUrl" style="width: 100%">
  </z-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { UploadFileInfo } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const showModalRef = ref(false)
    const previewImageUrlRef = ref('')
    function handlePreview (file: UploadFileInfo) {
      const { url } = file
      previewImageUrlRef.value = url as string
      showModalRef.value = true
    }
    return {
      handlePreview,
      showModal: showModalRef,
      previewImageUrl: previewImageUrlRef,
      fileList: ref<UploadFileInfo[]>([
        {
          id: 'a',
          name: 'file1.png',
          status: 'error'
        },
        {
          id: 'c',
          name: 'file3.png',
          status: 'finished',
          url: 'https://robohash.org/4a43d063534d80aa7621afaca948f9a1?set=set2&bgset=&size=400x400'
        },
        {
          id: 'd',
          name: 'file4.png',
          status: 'uploading',
          percentage: 99
        }
      ]),
      previewFileList: ref<UploadFileInfo[]>([
        {
          id: 'react',
          name: 'react.png',
          status: 'finished',
          url: 'https://robohash.org/35ecc8a1e1a84e2141066bd61376ac1e?set=set1&bgset=&size=400x400'
        },
        {
          id: 'vue',
          name: 'vue.png',
          status: 'finished',
          url: 'https://robohash.org/21aaef479ddf20c8acb4c09467e7a356?set=set1&bgset=&size=400x400'
        }
      ])
    }
  }
})
</script>
