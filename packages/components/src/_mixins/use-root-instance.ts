import { onMounted, ref, type Ref } from 'vue'
import { useCurrentElement } from '@vueuse/core'
import { isShadowRoot } from '../_utils'

export const useRootInstance = (
  defaultValue: Document | ShadowRoot = document
): Ref<Document | ShadowRoot> => {
  const shadowRoot = ref<Document | ShadowRoot>(defaultValue)

  onMounted(() => {
    const elementRef: any = useCurrentElement()
    if (elementRef.value) {
      const shadow = elementRef.value.getRootNode() as ShadowRoot
      if (isShadowRoot(shadow)) {
        shadowRoot.value = shadow
      }
    }
  })

  return shadowRoot
}
