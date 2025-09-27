<template>
  <div>
    <z-h1 :id="id" class="gds-doc-title">
      <span>{{ text }}</span>
      <span class="edit-button">
        <z-tooltip placement="bottom" :show-arrow="false">
          <template #trigger>
            <edit-on-bitbucket-button
              class="edit-button"
              variant="subtle"
              :relative-url="relativeUrl"
            />
          </template>
          {{ t('editOnBitbucket') }}
        </z-tooltip>
      </span>
    </z-h1>
    <div class="description">
      {{ description }}
    </div>
    <span v-if="alert">
      <caution-alert />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { i18n } from '../utils/composables'
import EditOnBitbucketButton from './EditOnBitbucketButton.vue'
import CautionAlert from './CautionAlert.vue'

export default defineComponent({
  name: 'EditOnBitbucketHeader',
  components: {
    EditOnBitbucketButton,
    CautionAlert
  },
  props: {
    description: {
      type: String,
      required: false
    },
    relativeUrl: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    alert: {
      type: Boolean
    }
  },
  setup () {
    return {
      ...i18n({
        'en-US': {
          editOnBitbucket: 'Edit on Bitbucket'
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

.description {
  padding-bottom: 16px;
  padding-top: 6px;
  max-width: 1000px;
}
</style>
