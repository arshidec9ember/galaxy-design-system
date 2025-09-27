<markdown>
# Combo box
</markdown>
<template>
  <div class="combobox-demo">
    <z-space>
      <z-tag is-combo-box :bordered="false">
        <template #icon>
          <z-icon><warning /></z-icon>
        </template>
        <ZText variant="3-m">
          Key:
        </ZText>
        <ZText variant="3-r" color="info">
          Value
        </ZText>
      </z-tag>
      <z-tag is-combo-box :closable="false" :bordered="false" readonly>
        <template #icon>
          <z-icon><warning /></z-icon>
        </template>
        <ZText variant="3-m">
          Key:
        </ZText>
        <ZText variant="3-r" color="info">
          Value
        </ZText>
      </z-tag>
      <z-tag is-combo-box :closable="false" :bordered="false" disabled>
        <template #icon>
          <z-icon><warning /></z-icon>
        </template>
        <ZText variant="3-m">
          Key:
        </ZText>
        <ZText variant="3-r" color="info">
          Value
        </ZText>
      </z-tag>

      <z-tag is-combo-box round>
        <template #icon>
          <z-icon><warning /></z-icon>
        </template>
        <ZText variant="3-m">
          Key:
        </ZText>
        <ZText variant="3-r" color="info">
          Value
        </ZText>
      </z-tag>
    </z-space>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Warning } from '@zeta/icons'

export default defineComponent({
  components: {
    Warning
  }
})
</script>
<style>
.combobox-demo .z-tag__content span {
  padding-right: var(--gds-space-2);
}
</style>
