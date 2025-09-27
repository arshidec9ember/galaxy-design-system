import { ref, type Ref, watch } from 'vue'

export function useReactiveProp (prop: () => any): Ref<any> {
  const propRef = ref(prop())

  watch(prop, (newValue) => {
    propRef.value = newValue
  })

  return propRef
}
