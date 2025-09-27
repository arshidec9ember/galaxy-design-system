<markdown>
# Group

Group of radio components can be wrapped in radio group component
</markdown>

<template>
  <z-space vertical>
    <z-switch v-model="vertical">
      <template #checked>
        Vertical
      </template>
      <template #unchecked>
        Horizontal
      </template>
    </z-switch>
    <z-space vertical>
      <z-h5>Radio with text</z-h5>
      <z-radio-group v-model="value" name="radiogroup1">
        <z-space :vertical="vertical">
          <z-radio
            v-for="song in songs"
            :key="song.value"
            :value="song.value"
            :label="song.label"
          />
        </z-space>
      </z-radio-group>
    </z-space>
    <z-space vertical>
      <z-h5>Radio with icons</z-h5>
      <z-radio-group v-model="value1" name="radiogroup2">
        <z-space :vertical="vertical">
          <z-radio v-for="(song, index) in songs" :key="index" :value="index">
            <z-icon :size="24">
              <Film />
            </z-icon>
          </z-radio>
        </z-space>
      </z-radio-group>
    </z-space>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Film } from '@vicons/ionicons5'
export default defineComponent({
  components: {
    Film
  },
  setup () {
    return {
      vertical: ref(false),
      value: ref('mumbai'),
      value1: ref(null),
      songs: [
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
        s.value = s.value.toLowerCase()
        return s
      })
    }
  }
})
</script>
