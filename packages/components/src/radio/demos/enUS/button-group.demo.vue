<markdown>
# Radio Button group

Radio button with radio group

</markdown>

<template>
  <z-space vertical>
    <z-radio-group v-model="size" name="radiobuttongroup">
      <z-space>
        <z-radio value="small" size="small">
          Small
        </z-radio>
        <z-radio value="medium" size="medium">
          Medium
        </z-radio>
        <z-radio value="large" size="large">
          Large
        </z-radio>
      </z-space>
    </z-radio-group>
    <z-radio-group
      v-model="value"
      :default-model-value="size"
      :size="size"
      name="radiobuttongroup1"
    >
      <z-radio-button
        v-for="song in songs"
        :key="song.value"
        :value="song.value"
        :label="song.label"
      />
    </z-radio-group>
    <z-radio-group
      v-model="textFormat"
      :default-model-value="size"
      :size="size"
      name="radiobuttongroup2"
    >
      <z-radio-button key="bold" value="bold">
        <z-icon size="20">
          <FormatBold />
        </z-icon>
      </z-radio-button>
      <z-radio-button key="italic" value="italic">
        <z-icon size="20">
          <FormatItalic />
        </z-icon>
      </z-radio-button>
      <z-radio-button key="underline" value="underline">
        <z-icon size="20">
          <FormatUnderlined />
        </z-icon>
      </z-radio-button>
      <z-radio-button key="strikethrough" value="strikethrough">
        <z-icon size="20">
          <StrikethroughS />
        </z-icon>
      </z-radio-button>
    </z-radio-group>
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
    return {
      value: ref(null),
      textFormat: ref(null),
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
