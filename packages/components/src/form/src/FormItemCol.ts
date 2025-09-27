import { h, ref, defineComponent } from 'vue'
import ZCol, { colProps, colPropKeys } from '../../row-column/src/Col'
import { keep, keysOf } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import ZFormItem, { formItemProps, formItemPropKeys } from './FormItem'
import type { FormItemInst } from './interface'

export const formItemColProps = {
  ...colProps,
  ...formItemProps
} as const

export const formItemColPropKeys = keysOf(formItemColProps)

export type FormItemColProps = ExtractPublicPropTypes<typeof formItemColProps>

export default defineComponent({
  name: 'FormItemCol',
  props: formItemColProps,
  setup () {
    const formItemInstRef = ref<FormItemInst | null>(null)
    const validate: FormItemInst['validate'] = ((...args: any[]) => {
      const { value } = formItemInstRef
      if (value) {
        return (value.validate as any)(...args)
      }
    }) as any
    const restoreValidation: FormItemInst['restoreValidation'] = () => {
      const { value } = formItemInstRef
      if (value) {
        value.restoreValidation()
      }
    }
    return {
      formItemInstRef,
      validate,
      restoreValidation
    }
  },
  render () {
    return h(ZCol, keep(this.$props, colPropKeys), {
      default: () => {
        const itemProps = keep(this.$props, formItemPropKeys)
        return h(
          ZFormItem,
          {
            ref: 'formItemInstRef',
            ...itemProps
          },
          this.$slots
        )
      }
    })
  }
})
