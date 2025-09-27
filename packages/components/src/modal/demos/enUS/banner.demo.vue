<markdown>
# Banner Modal

A banner modal displays important information with an illustration, title, description, and action buttons.
</markdown>

<template>
  <z-space>
    <z-button @click="showBannerModal = true">
      Show Banner Modal
    </z-button>
    <z-modal
      v-model:show="showBannerModal"
      :style="bannerModalStyle"
      :bordered="false"
      :closable="false"
      :mask-closable="false"
      size="large"
    >
      <div class="banner-modal-content">
        <!-- Banner illustration with background (exact height from Figma: 200px) -->
        <div class="banner-illustration">
          <img
            role="presentation"
            height="200"
            src="https://www.zeta.tech/wp-content/uploads/sites/3/2022/12/fusion-backoffice-in-fusion-backoffice-banner-right-illustration2.webp"
            alt=""
            class="banner-image"
          >
        </div>

        <!-- Content section (padding from Figma: 32px horizontal, 24px vertical) -->
        <div class="banner-content">
          <!-- Title + Description container (gap: 8px from Figma) -->
          <div class="banner-text-container">
            <z-title variant="2-sb" class="banner-title">
              Fampay configured successfully
            </z-title>
            <z-text variant="2-r" class="banner-description">
              Congratulations! The house is all done now! You can make changes
              anytime in Settings Menu
            </z-text>
          </div>

          <!-- Button container - close button only as per Figma -->
          <div class="banner-actions">
            <z-space :size="8">
              <z-button
                variant="filled"
                color="primary"
                size="medium"
                @click="handlePrimaryAction"
              >
                Ok
              </z-button>
              <z-button
                variant="outlined"
                size="medium"
                @click="showBannerModal = false"
              >
                Close
              </z-button>
            </z-space>
          </div>
        </div>
      </div>
    </z-modal>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const showBannerModal = ref(false)

    return {
      showBannerModal,
      bannerModalStyle: {
        width: '560px', // Exact width from Figma specification
        height: '404px',
        maxWidth: '90vw' // Responsive fallback
      },
      handlePrimaryAction () {
        message.success('Fampay configured successfully!')
        showBannerModal.value = false
      }
    }
  }
})
</script>

<style>
.banner-modal-content {
  padding: 0;
  background-color: var(--gds-color-bg-base, #ffffff);
  border-radius: var(--gds-border-radius-m, 8px);
  overflow: hidden;
  box-shadow: 0px 4px 8px -2px rgba(2, 13, 75, 0.25),
    0px 0px 1px 0px rgba(2, 13, 75, 0.3);
  width: 100%; /* Ensure full width usage */
  max-width: 448px;
  margin: 0 auto;
  position: relative;
}

.banner-close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
}

.banner-close-button button {
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--gds-color-text-secondary, #69728e);
  font-size: 18px;
  font-weight: bold;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.banner-illustration {
  height: 200px;
  width: 100%;
  background-color: var(--gds-color-bg-warning-light2, #fff1e0);
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-image {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  max-height: 180px;
}

.banner-content {
  padding: 24px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: var(--gds-color-bg-base, #ffffff);
}

.banner-text-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  width: 100%;
}

.banner-title {
  font-weight: 500;
  margin: 0;
}

.banner-description {
  color: var(--gds-color-text-neutral-light2, #69728e);
  margin: 0;
  width: 100%;
}

.banner-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
</style>
