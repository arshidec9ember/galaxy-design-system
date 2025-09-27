import {
  h,
  type PropType,
  defineComponent,
  provide,
  type VNode,
  toRef,
  computed
} from 'vue'
import type { Size } from '../../button/src/interface'
import { useConfig, useStyle } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { buttonOverflowInjectionKey } from './context'
import style from './styles/index.cssr'
import { ZButton } from '../../button'
import { ZDropdown } from '../../dropdown'
import { type DropdownOption } from '../../dropdown'
import { OverflowHorizontal } from '../../_internal/icons'
export interface ButtonOverflowInjection {
  size?: Size | undefined
}

export const buttonOverflowProps = {
  size: {
    type: String as PropType<Size | undefined>,
    default: undefined
  },
  maxItems: {
    type: Number,
    default: 3
  }
} as const

export type ButtonOverflowProps = ExtractPublicPropTypes<
  typeof buttonOverflowProps
>
export default defineComponent({
  name: 'ButtonOverflow',
  props: buttonOverflowProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef } = useConfig(props)
    const maxItemsRef = toRef(props, 'maxItems')
    useStyle('-button-overflow', style, mergedClsPrefixRef)
    provide(buttonOverflowInjectionKey, props)

    const defaultSlotButtonsRef = computed(() => {
      return (
        slots?.default?.().map((button) => {
          button.props = { ...button.props, size: props.size }
          return button
        }) || []
      )
    })

    const buttonsRef = computed(() => {
      if (slots.default) {
        return defaultSlotButtonsRef.value.slice(0, maxItemsRef.value)
      }
      return []
    })

    const dropdownButtonsRef = computed(() => {
      if (slots.default) {
        return defaultSlotButtonsRef.value.slice(maxItemsRef.value)
      }
      return []
    })

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      buttons: buttonsRef,
      dropdownButtons: dropdownButtonsRef,
      generateDropdownOptions: (children: VNode[]): DropdownOption[] => {
        return children.map((child, index) => ({
          key: index,
          label: index,
          render: {
            ...child,
            props: {
              ...child.props,
              variant: 'text',
              type: 'default'
            }
          }
        }))
      },
      generateRenderOption: (option: DropdownOption): VNode => {
        return option.render as VNode
      }
    }
  },
  render () {
    const { mergedClsPrefix, $props } = this
    return (
      <div class={[`${mergedClsPrefix}-button-overflow`]} role="group">
        {this.buttons.map((button) => button)}
        {this.dropdownButtons.length ? (
          <ZDropdown
            placement="bottom-end"
            trigger="click"
            options={this.generateDropdownOptions(this.dropdownButtons)}
            renderOptionLabel={this.generateRenderOption}
          >
            {{
              default: () => (
                <ZButton size={$props.size}>
                  {{
                    icon: () => <OverflowHorizontal />
                  }}
                </ZButton>
              )
            }}
          </ZDropdown>
        ) : null}
      </div>
    )
  }
})
