<markdown>
# DropDown

Use tag in dropdown.
</markdown>

<template>
  <z-space>
    <z-dropdown
      v-model:show="active"
      trigger="click"
      :options="options"
      @select="handleSelect"
    >
      <z-tag round checkable :checked="active" class="tag-button">
        <div class="tag__content">
          {{ value || 'Sample' }}
          <z-icon v-if="active" :component="ChevronUp" size="14" />
          <z-icon v-else :component="ChevronDown" size="14" />
        </div>
      </z-tag>
    </z-dropdown>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { DropdownOption, useMessage } from '@zeta-gds/components'
import { ChevronDown, ChevronUp } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    const message = useMessage()
    const value = ref('')
    const active = ref(false)
    const showDropdownRef = ref(false)
    const handleSelect = (key: string | number, option: DropdownOption) => {
      value.value = option.label as string
      message.info(String(key))
    }
    return {
      ChevronDown,
      ChevronUp,
      active,
      options: [
        {
          label: 'Marina Bay Sands',
          key: 'Marina Bay Sands',
          disabled: true
        },
        {
          label: "Brown's Hotel, London",
          key: "Brown's Hotel, London"
        },
        {
          label: 'Atlantis Bahamas, Nassau',
          key: 'Atlantis Bahamas, Nassau'
        },
        {
          label: 'The Beverly Hills Hotel, Los Angeles',
          key: 'The Beverly Hills Hotel, Los Angeles'
        }
      ],
      showDropdown: showDropdownRef,
      value,
      handleSelect
    }
  }
})
</script>
<style>
.tag-button .tag__content {
  display: inline-flex;
  align-items: center;
}
.tag-button .z-tag__content .z-icon {
  margin: 2px;
}
</style>
