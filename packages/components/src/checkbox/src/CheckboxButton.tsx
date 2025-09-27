import { h, defineComponent } from 'vue'
import { resolveWrappedSlot, type ExtractPublicPropTypes } from '../../_utils'
import { setup, checkboxBaseProps } from './use-checkbox'
import { ZText } from '../../typography'
export const checkboxButtonProps = checkboxBaseProps
export type CheckboxButtonProps = ExtractPublicPropTypes<
  typeof checkboxBaseProps
>

export default defineComponent({
  name: 'CheckboxButton',
  props: checkboxBaseProps,
  setup,
  render () {
    const {
      mergedClsPrefix,
      focusable,
      handleClick,
      focus,
      blur,
      renderedChecked,
      mergedDisabled,
      bordered
    } = this

    return (
      <label
        class={[
          `${mergedClsPrefix}-checkbox-button`,
          {
            [`${mergedClsPrefix}-checkbox-button--disabled`]: mergedDisabled,
            [`${mergedClsPrefix}-checkbox-button--checked`]: renderedChecked,
            [`${mergedClsPrefix}-checkbox-button--focus`]: focusable,
            [`${mergedClsPrefix}-checkbox-button--borderless`]: !bordered
          }
        ]}
        aria-checked={renderedChecked}
        role="checkbox"
        tabindex={mergedDisabled || !focusable ? undefined : 0}
      >
        <input
          ref="selfRef"
          type="checkbox"
          class={`${mergedClsPrefix}-checkbox-input`}
          value={this.value}
          checked={renderedChecked}
          disabled={mergedDisabled}
          onClick={handleClick}
          onFocus={focus}
          onBlur={blur}
        />
        <div class={`${mergedClsPrefix}-checkbox-button__state-border`} />
        {resolveWrappedSlot(this.$slots.default, (children) => {
          if (!children && !this.label) return null
          return (
            <ZText
              variant="3-r"
              ref="labelRef"
              class={`${mergedClsPrefix}-checkbox-button__label`}
            >
              {children || this.label}
            </ZText>
          )
        })}
      </label>
    )
  }
})
