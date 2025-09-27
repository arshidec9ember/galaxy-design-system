<markdown>
  # Extending RouterLink

  The RouterLink component exposes enough props to suffice most basic applications but it doesn't try to cover every possible use case and can be extended to fit your needs, follow the [link](https://router.vuejs.org/guide/advanced/extending-router-link.html) to know more.
</markdown>

<template>
  <z-link v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    Home
    <!-- Use <slot />: while implementing the component. -->
  </z-link>
  <router-link
    v-else
    v-slot="{ isActive, href, navigate }"
    v-bind="$props"
    custom
  >
    <z-link
      v-bind="$attrs"
      :href="href"
      :type="isActive ? 'active' : 'default'"
      @click="navigate"
    >
      Home
      <!-- Use <slot />: while implementing the component. -->
    </z-link>
  </router-link>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'AppLink',
  inheritAttrs: false,

  props: {
    // add @ts-ignore if using TypeScript
    ...RouterLink.props,
    to: {
      type: String,
      // Replace this with your own external link icon
      default: '/'
    }
  },
  computed: {
    isExternalLink () {
      return typeof this.to === 'string' && this.to.startsWith('http')
    }
  }
}
</script>
