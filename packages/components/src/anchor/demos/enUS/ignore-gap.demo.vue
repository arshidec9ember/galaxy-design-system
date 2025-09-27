<markdown>
# Ignore gap
</markdown>

<template>
  <div style="height: 200px">
    <z-row :gutter="12">
      <z-col :span="6">
        <div />
      </z-col>
      <z-col :span="6">
        <div />
      </z-col>
      <z-col :span="6">
        <div style="width: 160px">
          <z-anchor
            affix
            :trigger-top="24"
            :top="88"
            style="z-index: 1"
            ignore-gap
          >
            <z-anchor-link
              title="Demos"
              href="#Demos"
              :header-style="headerStyle"
            >
              <z-anchor-link is-sub-title title="Basic" href="#basic.vue" />
              <z-anchor-link
                is-sub-title
                title="Ignore-Gap"
                href="#ignore-gap.vue"
              />
              <z-anchor-link is-sub-title title="Affix" href="#affix.vue" />
              <z-anchor-link
                is-sub-title
                title="Scroll To"
                href="#scrollto.vue"
              />
            </z-anchor-link>
            <z-anchor-link
              title="API"
              href="#API"
              :header-style="headerStyle"
            />
          </z-anchor>
        </div>
      </z-col>
      <z-col :span="6">
        <div style="width: 160px">
          <z-anchor affix :trigger-top="24" :top="88" style="z-index: 1">
            <z-anchor-link
              title="Demos"
              href="#Demos"
              :header-style="headerStyle"
            >
              <z-anchor-link is-sub-title title="Basic" href="#basic.vue" />
              <z-anchor-link
                is-sub-title
                title="Ignore-Gap"
                href="#ignore-gap.vue"
              />
              <z-anchor-link is-sub-title title="Affix" href="#affix.vue" />
              <z-anchor-link
                is-sub-title
                title="Scroll To"
                href="#scrollto.vue"
              />
            </z-anchor-link>
            <z-anchor-link
              title="API"
              href="#API"
              :header-style="headerStyle"
            />
          </z-anchor>
        </div>
      </z-col>
    </z-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      headerStyle: 'font-weight: 500;'
    }
  }
})
</script>
