<markdown>
# Drag to upload

You can set `directory-dnd` to `true` to make directory drag and drop available.
</markdown>

<template>
  <z-upload
    multiple
    directory-dnd
    action="https://robohash.org/0e01f2b7f17b44c5db9f7602631e7240"
    :max="5"
  >
    <z-upload-dragger>
      <div style="margin-bottom: 12px">
        <z-icon size="48" :depth="3">
          <UploadIcon />
        </z-icon>
      </div>
      <z-text variant="3-r" class="z-upload__info">
        <z-a variant="2-m">
          Click to upload
        </z-a>

        or drag and drop
      </z-text>
      <z-p variant="4-r">
        SVG, PNG, JPG or GIF (max. 5 MB)
      </z-p>
    </z-upload-dragger>
  </z-upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { UploadIcon } from '../../../_internal/icons'
export default defineComponent({
  components: {
    UploadIcon
  }
})
</script>
<style>
.z-upload__info {
  font-size: 16px;
  color: #434b79;
}
.z-a {
  font-size: inherit;
}
.z-p {
  margin-top: 8px;
}
</style>
