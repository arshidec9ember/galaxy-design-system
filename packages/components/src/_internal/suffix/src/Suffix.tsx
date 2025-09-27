import { h, defineComponent, type PropType } from 'vue'
import ZBaseClear from '../../clear'
import ZBaseLoading from '../../loading'
import { ZBaseIcon } from '../../icon'
import { ArrowDropDownIcon } from '../../icons'
import { resolveSlot } from '../../../_utils/vue'

export default defineComponent({
  name: 'InternalSelectionSuffix',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    showArrow: {
      type: Boolean,
      default: undefined
    },
    showClear: {
      type: Boolean,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    },
    onClear: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props, { slots }) {
    return () => {
      const { clsPrefix } = props
      return (
        <ZBaseLoading
          clsPrefix={clsPrefix}
          class={`${clsPrefix}-base-suffix`}
          strokeWidth={24}
          scale={0.85}
          show={props.loading}
        >
          {{
            default: () =>
              props.showArrow ? (
                <ZBaseClear
                  clsPrefix={clsPrefix}
                  show={props.showClear}
                  onClear={props.onClear}
                >
                  {{
                    placeholder: () => (
                      <ZBaseIcon
                        clsPrefix={clsPrefix}
                        class={`${clsPrefix}-base-suffix__arrow`}
                      >
                        {{
                          default: () =>
                            resolveSlot(slots.default, () => [
                              <ArrowDropDownIcon />
                            ])
                        }}
                      </ZBaseIcon>
                    )
                  }}
                </ZBaseClear>
              ) : null
          }}
        </ZBaseLoading>
      )
    }
  }
})
