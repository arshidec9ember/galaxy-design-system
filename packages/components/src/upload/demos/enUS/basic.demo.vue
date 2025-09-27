<markdown>
# Basic

This is the basic usage of the upload component. You can upload files by clicking the upload button or dragging files to the upload area.

</markdown>

<template>
  <z-radio-group v-model="value" name="radiobuttongroup1">
    <z-radio-button
      v-for="type in types"
      :key="type.value"
      :value="type.value"
      :label="type.label"
    />
  </z-radio-group>

  <p>
    accepts only
    <z-link style="font-size: inherit">
      <b>{{ value }}</b>
    </z-link>
    files
  </p>
  <z-upload
    :accept="value"
    action="https://robohash.org/0e01f2b7f17b44c5db9f7602631e7240"
    :headers="{
      'gds-components-info': 'hello!'
    }"
    :data="{
      'gds-components-data': 'cool! gds-components!'
    }"
  >
    <z-icon size="48" :depth="3">
      <UploadIcon />
    </z-icon>
  </z-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { UploadIcon } from '../../../_internal/icons'
import { ZRadioGroup, ZRadioButton } from '../../../radio'

export default defineComponent({
  components: {
    UploadIcon,
    ZRadioGroup,
    ZRadioButton
  },
  setup () {
    return {
      value: ref('.pdf'),
      types: [
        {
          value: '.pdf',
          label: 'PDF'
        },
        {
          value: 'image/*',
          label: 'Image'
        },
        {
          value: '.pdf, .doc, .docx, .txt',
          label: 'documents'
        },
        {
          value: '.xlsx, .xls',
          label: 'excel'
        }
      ]
    }
  }
})
</script>
