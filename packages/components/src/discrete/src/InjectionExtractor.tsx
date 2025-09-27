import { defineComponent, type PropType } from 'vue'

export const ZInjectionExtractor = defineComponent({
  name: 'InjectionExtractor',
  props: {
    onSetup: Function as PropType<() => void>
  },
  setup (props, { slots }) {
    props.onSetup?.()
    return () => slots.default?.()
  }
})
