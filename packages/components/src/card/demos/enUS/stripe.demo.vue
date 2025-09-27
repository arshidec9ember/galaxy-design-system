<markdown>
  #  Strip

  The same card that can be composed in different ways.
  As composite cards each serving their own purpose.
  </markdown>

<template>
  <z-space vertical>
    <div>
      <z-grid :cols="1" :y-gap="8">
        <z-gi>
          <z-color-picker
            v-model="color"
            :swatches="['#F7E3B4', '#F5B4B4', '#E2D8FF', '#E3CFB0']"
          />
        </z-gi>
        <z-gi>
          <z-switch v-model="gradient" />
          Gradient
        </z-gi>
        <z-gi>
          <z-switch v-model="background" />
          Background
        </z-gi>
      </z-grid>
    </div>
    <z-slider v-model="stripWidth" />
    <div>
      <z-divider style="margin: 8px 0">
        Horizontal
      </z-divider>
      <z-card
        :style="{
          width: 'fit-content',
          display: 'flex',
          flexDirection: 'row'
        }"
      >
        <div class="-left">
          <z-card-media
            :background="background"
            :style="{
              width: `${stripWidth}${background ? '%' : 'px'}`,
              height: '100%',
              background: gradient
                ? `linear-gradient(to right, ${color}, transparent)`
                : color,
              borderRadius: '4px 0 0 4px'
            }"
          />
        </div>
        <div class="z-card-right">
          <z-card-header>
            Card Header
            <template #end>
              <div>End</div>
            </template>
          </z-card-header>
          <z-card-content> Content of the card </z-card-content>
          <z-card-footer> #footer </z-card-footer>
        </div>
      </z-card>
    </div>
    <div />
  </z-space>
  <z-space vertical>
    <div>
      <z-divider style="margin: 8px 0">
        Vertical
      </z-divider>
      <z-card>
        <z-card-media
          :background="background"
          :style="{
            height: `${stripWidth}${background ? '%' : 'px'}`,
            background: gradient
              ? `linear-gradient(${color}, transparent)`
              : color
          }"
        />
        <z-card-header>
          Card Header
          <template #end>
            <div>End</div>
          </template>
        </z-card-header>
        <z-card-content> Content of the card </z-card-content>
        <z-card-footer> Footer </z-card-footer>
      </z-card>
    </div>
  </z-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const stripWidth = ref(8)
const color = ref('#F7E3B4')
const gradient = ref(false)
const background = ref(false)
</script>

<style>
.z-card-left {
  flex: 1;
}

.z-card-right {
  width: 300px;
}
</style>
