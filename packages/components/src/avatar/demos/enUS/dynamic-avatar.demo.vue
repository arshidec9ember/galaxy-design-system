<markdown>
  # Dynamic Avatar

  Type your name, and create your own monster avatar.
</markdown>

<template>
  <div>
    <z-space vertical item-style="line-height: 0;">
      <z-space>
        <z-avatar :src="gravatarURL" round />
      </z-space>
      <z-input placeholder="Enter Name" @update-model-value="updateGravatar" />
    </z-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const gravatarURL = ref('') // Gravatar URL

    const md5 = (str: string) => {
      // Compute the MD5 hash (provided MD5 function)
      let hash = ''
      const hexDigits = '0123456789abcdef'

      for (let i = 0; i < str.length; i++) {
        const byte = str.charCodeAt(i)
        hash +=
          hexDigits.charAt((byte >> 4) & 0x0f) + hexDigits.charAt(byte & 0x0f)
      }
      return hash
    }

    const updateGravatar = (inputValue: string) => {
      // Compute the Gravatar URL based on the user input (email)
      const email = inputValue.trim().toLowerCase()
      const hash = md5(email)
      const size = 200 // Set the size of the avatar
      const rating = 'pg' // Set the rating (g, pg, r, or x)
      const defaultImage = 'monsterid' // Set the default image style
      const gravatarBaseUrl = 'https://www.gravatar.com/avatar/'

      // Construct the Gravatar URL
      gravatarURL.value = `${gravatarBaseUrl}${hash}?s=${size}&r=${rating}&d=${defaultImage}`
    }

    return {
      gravatarURL,
      updateGravatar
    }
  }
})
</script>
