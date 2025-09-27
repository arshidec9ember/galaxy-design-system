<markdown>
# Thumbnail file list

Thumbnails can be created using your own custom method via the `create-thumbnail-url` property.
</markdown>

<template>
  <z-upload
    action="__HTTP__://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image"
    :create-thumbnail-url="createThumbnailUrl"
  >
    <z-button>Upload</z-button>
  </z-upload>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { useMessage } from '@zeta-gds/components'
import type { UploadFileInfo } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const fileListRef = ref<UploadFileInfo[]>([
      {
        id: 'a',
        name: 'My Fault.png',
        status: 'error'
      },
      {
        id: 'b',
        name: 'regular text.doc',
        status: 'finished',
        type: 'text/plain'
      },
      {
        id: 'c',
        name: 'image.png',
        status: 'finished',
        url: 'https://robohash.org/21aaef479ddf20c8acb4c09467e7a356?set=set1&bgset=&size=400x400'
      },
      {
        id: 'd',
        name: 'Not Finished Yet.doc',
        status: 'uploading',
        percentage: 50
      }
    ])
    return {
      fileList: fileListRef,
      createThumbnailUrl (file: File | null): Promise<string> | undefined {
        if (!file) return undefined
        message.info(() => [
          '`createThumbnailUrl` changes the thumbnail image of the uploaded file.',
          h('br'),
          file.name
        ])
        message.info(`${file.name}`)
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              '__HTTP__://images.unsplash.com/photo-1577774438656-768f1e5d9ed6?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            )
          }, 1000)
        })
      }
    }
  }
})
</script>
