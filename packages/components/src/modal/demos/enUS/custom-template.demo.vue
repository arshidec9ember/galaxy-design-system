<markdown>
  # Template
  </markdown>

<template>
  <z-space>
    <z-button @click="showModal = true">
      Start Me up
    </z-button>
    <z-modal
      v-model:show="showModal"
      class="custom-card"
      :mask-closable="false"
    >
      <z-layout class="container" style="max-width: 560px">
        <z-layout-header class="header header--colored" bordered>
          <z-title variant="2-sb">
            Modal
          </z-title>
          <z-button
            variant="subtle"
            class="close-button"
            @click="showModal = false"
          >
            <template #icon>
              <z-icon :component="Close" :size="16" />
            </template>
          </z-button>
        </z-layout-header>
        <z-layout-content
          :content-style="{
            maxHeight: '40vh',
            padding: '24px'
          }"
        >
          <z-text variant="2-r">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </z-text>
        </z-layout-content>
        <z-layout-footer class="footer footer--shadow">
          <z-button color="primary" variant="filled">
            Primary
          </z-button>
        </z-layout-footer>
      </z-layout>
    </z-modal>
  </z-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Close } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      Close,
      bodyStyle: {
        width: '600px'
      },
      divider: {
        content: 'soft',
        footer: 'soft'
      } as const,
      showModal: ref(false)
    }
  }
})
</script>

<style>
.container {
  border-radius: var(--gds-border-radius-m);
}
.header {
  padding: 16px;
  padding-left: 24px;
  display: flex;
  align-items: center;
}
.close-button {
  margin-left: auto;
}
.header .z-h {
  margin: 0;
  font-size: 20px;
  color: #020d4d;
}
.footer {
  padding: 24px;
  background-color: white;
  display: flex;
  gap: 8px;
}
.footer--shadow {
  box-shadow: 0px 2px 5px 0px hsla(231, 95%, 15%, 0.1),
    0px -2px 5px 0px hsla(231, 95%, 15%, 0.1);
  position: relative;
}
</style>
