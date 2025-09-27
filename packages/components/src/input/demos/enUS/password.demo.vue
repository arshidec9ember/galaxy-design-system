<markdown>
# Password

Input type password can be used to mask the input value. You can use `show-password-on` to set when to show the password. also you can use `password-visible-icon` and `password-invisible-icon` to set the icon when password is visible or invisible.

</markdown>

<template>
  <z-space vertical>
    <z-form>
      <z-input
        type="password"
        show-password-on="mousedown"
        placeholder="Password"
        autocomplete="new-password"
        :maxlength="8"
      />
      <z-input
        type="password"
        show-password-on="click"
        placeholder="Custom Password Toggle Icon"
        autocomplete="new-password"
        :maxlength="8"
      >
        <template #password-visible-icon>
          <z-icon :size="16" :component="GlassesOutline" />
        </template>
        <template #password-invisible-icon>
          <z-icon :size="16" :component="Glasses" />
        </template>
      </z-input>
    </z-form>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GlassesOutline, Glasses } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      GlassesOutline,
      Glasses
    }
  }
})
</script>
