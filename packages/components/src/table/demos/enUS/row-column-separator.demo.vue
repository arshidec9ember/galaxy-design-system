<markdown>
# Toggle Separator
</markdown>

<template>
  <z-space style="padding-bottom: 1rem" vertical>
    <z-checkbox v-model="showRowSeparator">
      Row Separator
    </z-checkbox>
    <z-checkbox v-model="showColumnSeparator">
      Column Separator
    </z-checkbox>
  </z-space>
  <z-table
    :row-separator="showRowSeparator"
    :column-separator="showColumnSeparator"
  >
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
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    return {
      showRowSeparator: ref(false),
      showColumnSeparator: ref(false)
    }
  }
}
</script>
