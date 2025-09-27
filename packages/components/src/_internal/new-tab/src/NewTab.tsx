import { h, defineComponent, type PropType, toRef } from 'vue'
import { useStyle } from '../../../_mixins'
import { ZBaseIcon } from '../../icon'
import { NewTabIcon } from '../../icons'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'NewTab',
  props: {
    isButtonTag: {
      type: Boolean,
      default: true
    },
    clsPrefix: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    focusable: {
      type: Boolean,
      default: true
    },
    round: Boolean,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    absolute: Boolean
  },
  setup (props) {
    useStyle('-base-new-tab', style, toRef(props, 'clsPrefix'))
    return () => {
      const { clsPrefix, disabled, absolute, round, isButtonTag } = props
      const Tag = isButtonTag ? 'button' : 'div'
      return (
        <Tag
          type={isButtonTag ? 'button' : undefined}
          tabindex={disabled || !props.focusable ? -1 : 0}
          aria-disabled={disabled}
          aria-label="new-tab"
          role={isButtonTag ? undefined : 'button'}
          disabled={disabled}
          class={[
            `${clsPrefix}-base-new-tab`,
            absolute && `${clsPrefix}-base-new-tab--absolute`,
            disabled && `${clsPrefix}-base-new-tab--disabled`,
            round && `${clsPrefix}-base-new-tab--round`
          ]}
          onMousedown={(e) => {
            if (!props.focusable) {
              e.preventDefault()
            }
          }}
          onClick={props.onClick}
        >
          <ZBaseIcon clsPrefix={clsPrefix}>
            {{
              default: () => <NewTabIcon />
            }}
          </ZBaseIcon>
        </Tag>
      )
    }
  }
})
