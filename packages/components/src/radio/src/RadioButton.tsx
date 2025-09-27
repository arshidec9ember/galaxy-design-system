import { h, defineComponent } from 'vue'
import { type ExtractPublicPropTypes, resolveWrappedSlot } from '../../_utils'
import { setup, radioBaseProps } from './use-radio'

import { ZText } from '../../typography'
export const radioButtonProps = radioBaseProps
export type RadioButtonProps = ExtractPublicPropTypes<typeof radioBaseProps>

export default defineComponent({
  name: 'RadioButton',
  props: radioBaseProps,
  setup,
  render () {
    const { mergedClsPrefix, bordered } = this
    return (
      <label
        class={[
          `${mergedClsPrefix}-radio-button`,
          {
            [`${mergedClsPrefix}-radio-button--disabled`]: this.mergedDisabled,
            [`${mergedClsPrefix}-radio-button--checked`]:
              this.renderSafeChecked,
            [`${mergedClsPrefix}-radio-button--focus`]: this.focus,
            [`${mergedClsPrefix}-radio-button--borderless`]: !bordered
          }
        ]}
        tabindex="0"
        role="radio"
        aria-checked={this.renderSafeChecked}
      >
        <input
          ref="inputRef"
          type="radio"
          class={`${mergedClsPrefix}-radio-input`}
          value={this.value}
          name={this.mergedName}
          checked={this.renderSafeChecked}
          disabled={this.mergedDisabled}
          onChange={this.handleRadioInputChange}
          onFocus={this.handleRadioInputFocus}
          onBlur={this.handleRadioInputBlur}
        />
        <div class={`${mergedClsPrefix}-radio-button__state-border`} />
        {resolveWrappedSlot(this.$slots.default, (children) => {
          if (!children && !this.label) return null
          return (
            <ZText
              variant={this.mergedSize === 'large' ? '2-r' : '3-r'}
              ref="labelRef"
              class={`${mergedClsPrefix}-radio-button__label`}
            >
              {children || this.label}
            </ZText>
          )
        })}
      </label>
    )
  }
})
