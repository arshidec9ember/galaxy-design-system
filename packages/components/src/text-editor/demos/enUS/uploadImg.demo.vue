<markdown>
 # Upload image
 </markdown>
<template>
  <div>
    <ZTextEditor
      value="### Hello, Markdown!"
      :editor-id="'upload-img-prop'"
      :custom-icon="customIcon"
      :code-theme="'kimbie'"
      :toolbars="['bold', 'underline']"
      :input-box-width="'50%'"
      :on-upload-img="onUploadImg1"
    />
  </div>
</template>
<script lang="ts">
/* eslint-disable n/no-callback-literal */
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'MDEditorEG',
  components: {},
  setup () {
    const onUploadImg1 = async (
      files,
      callback: (
        urls: Array<{ url: string; alt?: string; title?: string }>
      ) => void
    ) => {
      await Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            const form = new FormData()
            form.append('file', file)

            axios
              .post('https://api.escuelajs.co/api/v1/files/upload', form, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then(async (res) => {
                const imageUrl = res.data.location

                // Fetch image as Blob
                const blobRes = await fetch(imageUrl)
                const imageBlob = await blobRes.blob()

                console.log('Image Blob:', imageBlob) // <-- You have the Blob here
                const imageUrl1 = URL.createObjectURL(imageBlob)

                callback([
                  {
                    url: imageUrl1, // Provide the object format with URL
                    alt: 'Uploaded Image', // Optionally add alt text
                    title: 'Uploaded Image Title' // Optional title text
                  }
                ])
                resolve(res)
              })
              .catch((error) => reject(error))
          })
        })
      )
    }
    return {
      onUploadImg1
    }
  }
})
</script>
