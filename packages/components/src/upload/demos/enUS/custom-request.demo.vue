<markdown>
# Custom request

User `custom-request` to customize upload request. It will receive an object with the following properties: `file`, `data`, `headers`, `withCredentials`, `action`, `onFinish`, `onError`, `onProgress`.
</markdown>

<template>
  <z-upload
    action="https://robohash.org/0e01f2b7f17b44c5db9f7602631e7240"
    :headers="{
      'gds-components-info': 'hello!'
    }"
    :data="{
      'gds-components-data': 'cool! gds-components!'
    }"
    :custom-request="customRequest"
  >
    <z-button>Upload</z-button>
  </z-upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { lyla } from 'lyla'
import { useMessage } from '@zeta-gds/components'
import type { UploadCustomRequestOptions } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const customRequest = ({
      file,
      data,
      headers,
      withCredentials,
      action,
      onFinish,
      onError,
      onProgress
    }: UploadCustomRequestOptions) => {
      const formData = new FormData()
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(
            key,
            data[key as keyof UploadCustomRequestOptions['data']]
          )
        })
      }
      formData.append(file.name, file.file as File)
      lyla
        .post(action as string, {
          withCredentials,
          headers: headers as Record<string, string>,
          body: formData,
          onUploadProgress: ({ percent }) => {
            onProgress({ percent: Math.ceil(percent) })
          }
        })
        .then(({ json }) => {
          message.success(JSON.stringify(json))
          onFinish()
        })
        .catch((error) => {
          message.success(error.message)
          onError()
        })
    }
    return {
      customRequest
    }
  }
})
</script>
