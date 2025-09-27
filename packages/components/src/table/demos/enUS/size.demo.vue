<markdown>
# Size
</markdown>

<template>
  <z-space vertical>
    <div style="margin-bottom: 10px">
      <z-radio-group v-model="sizeModal">
        <z-radio-button
          v-for="size in ['small', 'medium', 'large']"
          :key="size"
          :value="size"
        >
          {{ size }}
        </z-radio-button>
      </z-radio-group>
    </div>
    <z-table :bordered="false" :column-separator="true" :size="sizeModal">
      <thead>
        <tr>
          <th>Abandon</th>
          <th>Abnormal</th>
          <th>Abolish</th>
          <th>...</th>
          <th>It's hard to learn words</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Abandon</td>
          <td>Abnormal</td>
          <td>Abolish</td>
          <td>...</td>
          <td>Damn it! I can't remember those words.</td>
        </tr>
        <tr>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
      </tbody>
    </z-table>
  </z-space>
</template>
<script>
import { ref } from 'vue'
export default {
  setup () {
    const sizeModal = ref('small')
    return {
      sizeModal
    }
  }
}
</script>
