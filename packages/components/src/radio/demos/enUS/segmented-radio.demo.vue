<markdown>
  # Segmented Radio Button Group

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
      <z-h5>Radio Button with text</z-h5>
      <z-radio-group v-model="value" name="radiogroup1" :bordered="isBordered">
        <z-radio-button
          v-for="city in cities"
          :key="city.value"
          :value="city.value"
          :label="city.label"
        />
      </z-radio-group>
    </z-space>
    <z-space vertical>
      <z-h5>Radio Button with Text + Icon</z-h5>
      <z-radio-group v-model="textFormat" :bordered="isBordered">
        <z-radio-button key="bold" :disabled="true" value="bold">
          <z-icon size="20">
            <FormatBold />
          </z-icon>
          Bold
        </z-radio-button>
        <z-radio-button key="italic" value="italic">
          <z-icon size="20">
            <FormatItalic />
          </z-icon>
          Italic
        </z-radio-button>
        <z-radio-button key="underline" value="underline">
          <z-icon size="20">
            <FormatUnderlined />
          </z-icon>
          Underline
        </z-radio-button>
        <z-radio-button key="strikethrough" value="strikethrough">
          <z-icon size="20">
            <StrikethroughS />
          </z-icon>
          Strikethrough
        </z-radio-button>
      </z-radio-group>
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
    const textFormatRef = ref<(string | number) | null>()
    return {
      textFormat: textFormatRef,
      isBordered: ref(false),
      value: ref(''),
      cities: [
        {
          value: 'Mumbai',
          label: 'Mumbai'
        },
        {
          value: 'Hyderabad',
          label: 'Hyderabad'
        },
        {
          value: 'Chennai',
          label: 'Chennai'
        },
        {
          value: 'Bangalore',
          label: 'Bangalore'
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
