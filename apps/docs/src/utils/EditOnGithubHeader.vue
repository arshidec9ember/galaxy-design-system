<template>
  <z-h1 :id="id" class="gds-doc-title">
    <span>{{ text }}</span>
    <span class="edit-button">
      <z-tooltip placement="right" :show-arrow="false">
        <template #trigger>
          <edit-on-github-button
            variant="subtle"
            class="edit-button"
            :relative-url="relativeUrl"
          />
        </template>
        {{ t('editOnGithub') }}
      </z-tooltip>
    </span>
  </z-h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { i18n } from '../utils/composables'
import EditOnGithubButton from './EditOnGithubButton.vue'

export default defineComponent({
  name: 'EditOnGithubHeader',
  components: {
    EditOnGithubButton
  },
  props: {
    relativeUrl: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  setup () {
    return {
      ...i18n({
        'en-US': {
          editOnGithub: 'Edit on GitHub'
        }
      })
    }
  },
  computed: {
    id () {
      return this.text.replace(/ /g, '-')
    }
  }
})
</script>

<style scoped>
.gds-doc-title {
  display: flex;
}

.gds-doc-title .edit-button {
  margin-left: 2px;
  display: inline-flex;
  align-items: center;
}
</style>
