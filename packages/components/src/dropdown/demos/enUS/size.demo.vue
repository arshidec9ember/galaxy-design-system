<markdown>
# Size

A dropdown has different sizes.
</markdown>

<template>
  <z-space vertical>
    <z-dropdown
      v-model:show="show[0]"
      placement="bottom-start"
      trigger="click"
      size="x-small"
      :options="options"
      @select="handleSelect"
    >
      <z-button>X-Small Size
        <template #end>
          <z-icon
            :component="CaretDown12Filled"
            size="small"
            :style="{
              top: '-3px',
              transform: `rotate(${show[0] ? 180 : 0}deg)`,
              transition:
                'color .3s var(--z-bezier), transform .3s var(--z-bezier)'
            }"
          />
        </template>
      </z-button>
    </z-dropdown>
    <z-dropdown
      v-model:show="show[1]"
      placement="bottom-start"
      trigger="click"
      size="small"
      :options="options"
      @select="handleSelect"
    >
      <z-button>Small Size
        <template #end>
          <z-icon
            :component="CaretDown12Filled"
            size="small"
            :style="{
              top: '-3px',
              transform: `rotate(${show[1] ? 180 : 0}deg)`,
              transition:
                'color .3s var(--z-bezier), transform .3s var(--z-bezier)'
            }"
          />
        </template>
      </z-button>
    </z-dropdown>
    <z-dropdown
      v-model:show="show[2]"
      placement="bottom-start"
      trigger="click"
      size="medium"
      :options="options"
      @select="handleSelect"
    >
      <z-button>Medium Size
        <template #end>
          <z-icon
            :component="CaretDown12Filled"
            size="small"
            :style="{
              top: '-3px',
              transform: `rotate(${show[2] ? 180 : 0}deg)`,
              transition:
                'color .3s var(--z-bezier), transform .3s var(--z-bezier)'
            }"
          />
        </template>
      </z-button>
    </z-dropdown>
    <z-dropdown
      v-model:show="show[3]"
      placement="bottom-start"
      trigger="click"
      size="large"
      :options="options"
      @select="handleSelect"
    >
      <z-button>Large Size
        <template #end>
          <z-icon
            :component="CaretDown12Filled"
            size="small"
            :style="{
              top: '-3px',
              transform: `rotate(${show[3] ? 180 : 0}deg)`,
              transition:
                'color .3s var(--z-bezier), transform .3s var(--z-bezier)'
            }"
          />
        </template>
      </z-button>
    </z-dropdown>
    <z-dropdown
      v-model:show="show[4]"
      placement="bottom-start"
      trigger="click"
      size="x-large"
      :options="options"
      @select="handleSelect"
    >
      <z-button>X-Large Size
        <template #end>
          <z-icon
            :component="CaretDown12Filled"
            size="small"
            :style="{
              top: '-3px',
              transform: `rotate(${show[4] ? 180 : 0}deg)`,
              transition:
                'color .3s var(--z-bezier), transform .3s var(--z-bezier)'
            }"
          />
        </template>
      </z-button>
    </z-dropdown>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CaretDown12Filled } from '@vicons/fluent'
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
    const show = ref([false, false, false, false, false])
    return {
      show,
      CaretDown12Filled,
      options,
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>
