import { h, defineComponent, type PropType, toRef, ref } from 'vue'
import { useProxyModel, useStyle } from '../../../_mixins'
import { ZBaseIcon } from '../../icon'
import style from './styles/index.cssr'
import { useMergedState } from '../../../_external-dependencies/vooks'
import { resolveWrappedSlot } from '../../../_utils'

export default defineComponent({
  name: 'BaseIconToggle',
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
      default: undefined
    },
    focusable: {
      type: Boolean,
      default: true
    },
    round: Boolean,
    defaultModelValue: Boolean,
    modelValue: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined
    },
    onUpdateModelValue: [Function] as PropType<(value: boolean) => void>,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    absolute: Boolean
  },
  setup (props) {
    useStyle('-base-toggle', style, toRef(props, 'clsPrefix'))
    const { clsPrefix } = props
    const uncontrolledCheckedRef = ref(props.defaultModelValue)
    const controlledCheckedRef = useProxyModel(props, 'modelValue')
    const mergedCheckedRef = useMergedState(
      controlledCheckedRef,
      uncontrolledCheckedRef
    )

    const doUpdateChecked = (e: MouseEvent): void => {
      const updatedVal = !uncontrolledCheckedRef.value
      uncontrolledCheckedRef.value = updatedVal
      controlledCheckedRef.value = updatedVal
      props.onClick?.(e)
    }

    return {
      clsPrefix,
      checked: mergedCheckedRef,
      doUpdateChecked
    }
  },
  render () {
    const {
      isButtonTag,
      disabled,
      checked,
      clsPrefix,
      absolute,
      doUpdateChecked,
      round
    } = this
    const Tag = isButtonTag ? 'button' : 'div'

    const checkedIcon = resolveWrappedSlot(
      this.$slots.checkedIcon,
      (children) =>
        children ? (
          <ZBaseIcon clsPrefix={clsPrefix}>
            {{
              default: () => children
            }}
          </ZBaseIcon>
        ) : (
          '-'
        )
    )
    const uncheckedIcon = resolveWrappedSlot(
      this.$slots.uncheckedIcon || this.$slots.default,
      (children) =>
        children ? (
          <ZBaseIcon clsPrefix={clsPrefix}>
            {{
              default: () => children
            }}
          </ZBaseIcon>
        ) : (
          '+'
        ) // default icon
    )

    return (
      <Tag
        type={isButtonTag ? 'button' : undefined}
        tabindex={disabled || !this.focusable ? -1 : 0}
        aria-disabled={disabled}
        aria-label={checked ? 'checked' : 'unchecked'}
        role={isButtonTag ? undefined : 'button'}
        disabled={disabled}
        class={[
          `${clsPrefix}-base-toggle`,
          {
            [`${clsPrefix}-base-toggle--absolute`]: absolute,
            [`${clsPrefix}-base-toggle--disabled`]: disabled,
            [`${clsPrefix}-base-toggle--round`]: round
          }
        ]}
        onMousedown={(e) => {
          if (!this.focusable) {
            e.preventDefault()
          }
        }}
        onClick={doUpdateChecked}
      >
        {checked ? checkedIcon : uncheckedIcon}
      </Tag>
    )
  }
})
