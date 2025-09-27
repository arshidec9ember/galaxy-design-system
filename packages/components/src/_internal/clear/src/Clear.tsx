import { h, defineComponent, type PropType, toRef } from 'vue'
import { resolveSlot } from '../../../_utils'
import { useStyle } from '../../../_mixins'
import { ClearIcon } from '../../icons'
import { ZBaseIcon } from '../../icon'
import ZIconSwitchTransition from '../../icon-switch-transition'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseClear',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    show: Boolean,
    onClear: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props) {
    useStyle('-base-clear', style, toRef(props, 'clsPrefix'))
    return {
      handleMouseDown (e: MouseEvent) {
        e.preventDefault()
        props.onClear?.(e)
      }
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div class={`${clsPrefix}-base-clear`}>
        <ZIconSwitchTransition>
          {{
            default: () => {
              return this.show ? (
                <div
                  key="dismiss"
                  class={`${clsPrefix}-base-clear__clear`}
                  onClick={this.onClear}
                  onMousedown={this.handleMouseDown}
                  data-clear
                >
                  {resolveSlot(this.$slots.icon, () => [
                    <ZBaseIcon clsPrefix={clsPrefix}>
                      {{
                        default: () => <ClearIcon />
                      }}
                    </ZBaseIcon>
                  ])}
                </div>
              ) : (
                <div key="icon" class={`${clsPrefix}-base-clear__placeholder`}>
                  {this.$slots.placeholder?.()}
                </div>
              )
            }
          }}
        </ZIconSwitchTransition>
      </div>
    )
  }
})
