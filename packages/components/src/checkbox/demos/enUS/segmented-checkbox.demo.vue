<markdown>
  # Segmented Checkbox Button group

  </markdown>

<template>
  <z-space vertical>
    <z-switch v-model="isBordered">
      <template #checked>
        Bordered
      </template>
      <template #unchecked>
        Borderless
      </template>
    </z-switch>
    <z-space vertical>
      <z-h5>Checkbox Button with text</z-h5>
      <z-checkbox-group v-model="value" :bordered="isBordered">
        <z-checkbox-button
          v-for="song in songs"
          :key="song.value"
          :value="song.value"
          :label="song.label"
        />
      </z-checkbox-group>
    </z-space>
    <z-space vertical>
      <z-h5>Checkbox Button with Text + Icon</z-h5>
      <z-checkbox-group v-model="textFormat" :bordered="isBordered">
        <z-checkbox-button key="bold" :disabled="true" value="bold">
          <z-icon size="20">
            <FormatBold />
          </z-icon>
          Bold
        </z-checkbox-button>
        <z-checkbox-button key="italic" value="italic">
          <z-icon size="20">
            <FormatItalic />
          </z-icon>
          Italic
        </z-checkbox-button>
        <z-checkbox-button key="underline" value="underline">
          <z-icon size="20">
            <FormatUnderlined />
          </z-icon>
          Underline
        </z-checkbox-button>
        <z-checkbox-button key="strikethrough" value="strikethrough">
          <z-icon size="20">
            <StrikethroughS />
          </z-icon>
          Strikethrough
        </z-checkbox-button>
      </z-checkbox-group>
    </z-space>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS
} from '@zeta/icons'

export default defineComponent({
  components: {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    StrikethroughS
  },
  setup () {
    const textFormatRef = ref<(string | number)[] | null>([])
    return {
      isBordered: ref(false),
      textFormat: textFormatRef,
      value: ref(null),
      size: ref('medium'),
      songs: [
        {
          value: "Rock'n'Roll Star",
          label: "Rock'n'Roll Star"
        },
        {
          value: 'Shakermaker',
          label: 'Shakermaker'
        },
        {
          value: 'Live Forever',
          label: 'Live Forever'
        },
        {
          value: 'Up in the Sky',
          label: 'Up in the Sky'
        }
      ].map((s) => {
        return {
          ...s,
          value: s.value.toLowerCase()
        }
      })
    }
  }
})
</script>
