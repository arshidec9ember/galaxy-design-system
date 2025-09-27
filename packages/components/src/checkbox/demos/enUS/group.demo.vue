<markdown>
# Checkbox group
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
      <z-h5>Checkbox with text</z-h5>
      <z-checkbox-group v-model="cities" size="small">
        <z-space :vertical="vertical" style="gap: 16px">
          <z-checkbox value="Mumbai" label="Mumbai" />
          <z-checkbox value="Bangalore" label="Bangalore" />
          <z-checkbox value="Hyderabad" label="Hyderabad" />
          <z-checkbox value="Chennai" label="Chennai" />
        </z-space>
      </z-checkbox-group>
    </z-space>
    <z-space vertical>
      <z-h5>Checkbox with images</z-h5>
      <z-checkbox-group v-model="cities" size="small">
        <z-space :vertical="vertical" style="gap: 16px">
          <z-checkbox value="Mumbai">
            <z-icon :size="24">
              <Film />
            </z-icon>
          </z-checkbox>
          <z-checkbox value="Bangalore">
            <z-icon :size="24">
              <Film />
            </z-icon>
          </z-checkbox>
          <z-checkbox value="Hyderabad">
            <z-icon :size="24">
              <Film />
            </z-icon>
          </z-checkbox>
          <z-checkbox value="Chennai">
            <z-icon :size="24">
              <Film />
            </z-icon>
          </z-checkbox>
        </z-space>
      </z-checkbox-group>
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
      cities: ref(['Hyderabad', 'Mumbai'])
    }
  }
})
</script>
