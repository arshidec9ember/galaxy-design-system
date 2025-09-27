<markdown>
# Manually positioned

Warning: when manually positioned, the `trigger` prop must be set to `'manual'`.
</markdown>

<template>
  <div
    style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, 0.5)"
    @contextmenu="handleContextMenu"
  >
    Right Click
  </div>
  <z-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :options="options"
    :show="showDropdown"
    :on-clickoutside="onClickoutside"
    @select="handleSelect"
  />
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { useMessage } from '@zeta-gds/components'

const options = [
  {
    type: 'group',
    label: 'Cuisines and their Famous Dishes',
    key: 'main',
    children: [
      {
        label: 'Mexican',
        key: 'mexican'
      },
      {
        label: 'Indian',
        key: 'indian'
      },
      {
        label: 'Italian',
        key: 'italian'
      },
      {
        label: 'Dishes',
        key: 'dishes',
        children: [
          {
            label: 'Risotto',
            key: 'risotto'
          },
          {
            label: 'Lasagna',
            key: 'lasagna'
          }
        ]
      }
    ]
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()

    const showDropdownRef = ref(false)
    const xRef = ref(0)
    const yRef = ref(0)

    return {
      options,
      showDropdown: showDropdownRef,
      x: xRef,
      y: yRef,
      handleSelect (key: string | number) {
        showDropdownRef.value = false
        message.info(String(key))
      },
      handleContextMenu (e: MouseEvent) {
        e.preventDefault()
        showDropdownRef.value = false
        nextTick().then(() => {
          showDropdownRef.value = true
          xRef.value = e.clientX
          yRef.value = e.clientY
        })
      },
      onClickoutside () {
        message.info('clickoutside')
        showDropdownRef.value = false
      }
    }
  }
})
</script>
