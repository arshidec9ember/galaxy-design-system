<markdown>
# Accordion without border
</markdown>

<template>
  <z-accordion default-expanded-names="1" :bordered="false">
    <z-accordion-item title="This is accordion header 1" name="1">
      <div>
        An accordion menu is a vertically stacked list of headers that can be
        clicked to reveal or hide content associated with them. Allowing users
        to have control over the content by expanding it or deferring it for
        later.
      </div>
    </z-accordion-item>
    <z-accordion-item title="This is accordion header 2" name="2">
      <div>
        An accordion menu is a vertically stacked list of headers that can be
        clicked to reveal or hide content associated with them. Allowing users
        to have control over the content by expanding it or deferring it for
        later.
      </div>
    </z-accordion-item>
    <z-accordion-item title="This is accordion header 3" name="3" disabled>
      <div>
        An accordion menu is a vertically stacked list of headers that can be
        clicked to reveal or hide content associated with them. Allowing users
        to have control over the content by expanding it or deferring it for
        later.
      </div>
    </z-accordion-item>
  </z-accordion>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
