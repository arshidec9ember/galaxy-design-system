<markdown>
# Basic

Affix has `trigger-top`, `top`, `trigger-bottom` and `bottom`. `trigger-top` is top affixing trigger point. `top` is the style `top` value after top affixing is trigger. `trigger-bottom` and `bottom` work in similar way.
</markdown>

<template>
  <div ref="containerRef" class="container">
    <div class="padding" />
    <div class="content">
      <z-row>
        <z-col :span="12">
          <z-affix :top="120" :trigger-top="60" :listen-to="() => containerRef">
            <z-tag>Affix Trigger Top 60px</z-tag>
          </z-affix>
        </z-col>
        <z-col :span="12">
          <z-affix
            :bottom="120"
            :trigger-bottom="60"
            :listen-to="() => containerRef"
          >
            <z-tag>Affix Trigger Bottom 60px</z-tag>
          </z-affix>
        </z-col>
      </z-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const containerRef = ref<HTMLElement | undefined>(undefined)
    return {
      containerRef
    }
  }
})
</script>

<style>
.container {
  width: 100%;
  height: 200px;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 0.1875rem;
  overflow: auto;
}

.padding {
  height: 150px;
  width: 100%;
  background-color: rgba(128, 128, 128, 0.15);
}

.content {
  height: 600px;
}
</style>
