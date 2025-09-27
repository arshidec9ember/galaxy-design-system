import { h, defineComponent, computed, type CSSProperties } from 'vue'
import { useRtl } from '../../_mixins/use-rtl'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, resolveWrappedSlot } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { radioLight, type RadioTheme } from '../styles'
import { setup, radioBaseProps } from './use-radio'
import style from './styles/radio.cssr'
import { ZText } from '../../typography'

export const radioProps = {
  ...(useTheme.props as ThemeProps<RadioTheme>),
  ...radioBaseProps
} as const

export type RadioProps = ExtractPublicPropTypes<typeof radioProps>

export default defineComponent({
  name: 'Radio',
  props: radioProps,
  setup (props) {
    const radio = setup(props)
    const themeRef = useTheme(
      'Radio',
      '-radio',
      style,
      radioLight,
      props,
      radio.mergedClsPrefix
    )
    const cssVarsRef = computed(() => {
      const {
        mergedSize: { value: size }
      } = radio
      const {
        common: { cubicBezierEaseInOut },
        self: {
          boxShadow,
          boxShadowActive,
          boxShadowDisabled,
          boxShadowFocus,
          boxShadowHover,
          boxShadowActiveHover,
          color,
          colorDisabled,
          colorActive,
          textColor,
          dotColorActive,
          dotColorHoverActive,
          dotColorDisabled,
          opacityDisabled,
          labelPadding,
          labelLineHeight,
          labelFontWeight,
          [createKey('fontSize', size)]: fontSize,
          [createKey('radioSize', size)]: radioSize
        }
      } = themeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-label-line-height': labelLineHeight,
        '--z-label-font-weight': labelFontWeight,
        '--z-box-shadow': boxShadow,
        '--z-box-shadow-active': boxShadowActive,
        '--z-box-shadow-active-hover': boxShadowActiveHover,
        '--z-box-shadow-disabled': boxShadowDisabled,
        '--z-box-shadow-focus': boxShadowFocus,
        '--z-box-shadow-hover': boxShadowHover,
        '--z-color': color,
        '--z-color-active': colorActive,
        '--z-color-disabled': colorDisabled,
        '--z-dot-color-active': dotColorActive,
        '--z-dot-color-hover-active': dotColorHoverActive,
        '--z-dot-color-disabled': dotColorDisabled,
        '--z-font-size': fontSize,
        '--z-radio-size': radioSize,
        '--z-text-color': textColor,
        '--z-label-padding': labelPadding,
        '--z-opacity-disabled': opacityDisabled
      }
    })
    const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef } =
      useConfig(props)
    const rtlEnabledRef = useRtl('Radio', mergedRtlRef, mergedClsPrefixRef)
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'radio',
        computed(() => radio.mergedSize.value[0]),
        cssVarsRef,
        props
      )
      : undefined
    return Object.assign(radio, {
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    })
  },
  render () {
    const { $slots, mergedClsPrefix, onRender, label } = this
    onRender?.()
    return (
      <label
        class={[
          `${mergedClsPrefix}-radio`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-radio--rtl`]: this.rtlEnabled,
            [`${mergedClsPrefix}-radio--disabled`]: this.mergedDisabled,
            [`${mergedClsPrefix}-radio--checked`]: this.renderSafeChecked,
            [`${mergedClsPrefix}-radio--focus`]: this.focus
          }
        ]}
        style={this.cssVars as CSSProperties}
        tabindex="0"
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
        <div class={`${mergedClsPrefix}-radio__dot-wrapper`}>
          <div
            class={[
              `${mergedClsPrefix}-radio__dot`,
              this.renderSafeChecked && `${mergedClsPrefix}-radio__dot--checked`
            ]}
          />
        </div>
        {resolveWrappedSlot($slots.default, (children) => {
          if (!children && !label) return null
          return (
            <ZText
              variant={this.mergedSize === 'large' ? '2-r' : '3-r'}
              ref="labelRef"
              class={`${mergedClsPrefix}-radio__label`}
            >
              {children || label}
            </ZText>
          )
        })}
      </label>
    )
  }
})
