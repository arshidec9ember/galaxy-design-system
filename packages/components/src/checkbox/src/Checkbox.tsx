import { h, defineComponent, computed, type CSSProperties } from 'vue'
import { createId } from 'seemly'
import { on } from '../../_external-dependencies/evtd'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { ZIconSwitchTransition } from '../../_internal'
import {
  createKey,
  type ExtractPublicPropTypes,
  resolveWrappedSlot
} from '../../_utils'
import { checkboxLight } from '../styles'
import type { CheckboxTheme } from '../styles'
import CheckMark from './CheckMark'
import LineMark from './LineMark'
import style from './styles/index.cssr'
import { useRtl } from '../../_mixins/use-rtl'
import { setup, checkboxBaseProps } from './use-checkbox'
import { ZText } from '../../typography'
export const checkboxProps = {
  ...(useTheme.props as ThemeProps<CheckboxTheme>),
  ...checkboxBaseProps
} as const

export type CheckboxProps = ExtractPublicPropTypes<typeof checkboxProps>

export default defineComponent({
  name: 'Checkbox',
  props: checkboxProps,
  setup (props) {
    const checkbox = setup(props)
    const { mergedSizeRef, mergedClsPrefix } = checkbox
    const { inlineThemeDisabled, mergedRtlRef } = useConfig(props)
    const themeRef = useTheme(
      'Checkbox',
      '-checkbox',
      style,
      checkboxLight,
      props,
      mergedClsPrefix
    )
    const rtlEnabledRef = useRtl('Checkbox', mergedRtlRef, mergedClsPrefix)
    const cssVarsRef = computed(() => {
      const { value: mergedSize } = mergedSizeRef
      const {
        common: { cubicBezierEaseInOut },
        self: {
          borderRadius,
          color,
          colorChecked,
          colorDisabled,
          colorTableHeader,
          colorTableHeaderModal,
          colorTableHeaderPopover,
          checkMarkColor,
          checkMarkColorDisabled,
          border,
          borderFocus,
          borderDisabled,
          boxShadowFocus,
          textColor,
          textColorDisabled,
          checkMarkColorDisabledChecked,
          colorDisabledChecked,
          borderDisabledChecked,
          labelPadding,
          labelLineHeight,
          labelFontWeight,
          opacityDisabled,
          borderHover,
          colorCheckedHover,
          [createKey('fontSize', mergedSize)]: fontSize,
          [createKey('size', mergedSize)]: size,
          [createKey('padding', mergedSize)]: padding
        }
      } = themeRef.value
      return {
        '--z-padding': padding,
        '--z-label-line-height': labelLineHeight,
        '--z-label-font-weight': labelFontWeight,
        '--z-size': size,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-border-radius': borderRadius,
        '--z-border': border,
        '--z-border-focus': borderFocus,
        '--z-border-hover': borderHover,
        '--z-border-disabled': borderDisabled,
        '--z-border-disabled-checked': borderDisabledChecked,
        '--z-box-shadow-focus': boxShadowFocus,
        '--z-color': color,
        '--z-color-checked': colorChecked,
        '--z-color-checked-hover': colorCheckedHover,
        '--z-color-table': colorTableHeader,
        '--z-color-table-modal': colorTableHeaderModal,
        '--z-color-table-popover': colorTableHeaderPopover,
        '--z-color-disabled': colorDisabled,
        '--z-color-disabled-checked': colorDisabledChecked,
        '--z-text-color': textColor,
        '--z-text-color-disabled': textColorDisabled,
        '--z-check-mark-color': checkMarkColor,
        '--z-check-mark-color-disabled': checkMarkColorDisabled,
        '--z-check-mark-color-disabled-checked': checkMarkColorDisabledChecked,
        '--z-font-size': fontSize,
        '--z-label-padding': labelPadding,
        '--z-opacity-disabled': opacityDisabled
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'checkbox',
        computed(() => checkbox.mergedSizeRef.value[0]),
        cssVarsRef,
        props
      )
      : undefined
    return Object.assign(checkbox, {
      rtlEnabled: rtlEnabledRef,
      mergedTheme: themeRef,
      labelId: createId(),
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    })
  },
  render () {
    const {
      $slots,
      renderedChecked,
      mergedDisabled,
      indeterminate,
      privateInsideTable,
      cssVars,
      labelId,
      label,
      mergedClsPrefix,
      focusable,
      handleKeyUp,
      handleKeyDown,
      handleClick,
      mergedSizeRef
    } = this
    this.onRender?.()
    const getTextVariant = (): '3-r' | '2-r' => {
      return mergedSizeRef === 'large' ? '2-r' : '3-r'
    }
    const labelNode = resolveWrappedSlot($slots.default, (children) => {
      if (label || children) {
        return (
          <ZText variant={getTextVariant()}>
            <span class={`${mergedClsPrefix}-checkbox__label`} id={labelId}>
              {label || children}
            </span>
          </ZText>
        )
      }
      return null
    })
    return (
      <div
        ref="selfRef"
        class={[
          `${mergedClsPrefix}-checkbox`,
          this.themeClass,
          this.rtlEnabled && `${mergedClsPrefix}-checkbox--rtl`,
          renderedChecked && `${mergedClsPrefix}-checkbox--checked`,
          mergedDisabled && `${mergedClsPrefix}-checkbox--disabled`,
          indeterminate && `${mergedClsPrefix}-checkbox--indeterminate`,
          privateInsideTable && `${mergedClsPrefix}-checkbox--inside-table`,
          labelNode && `${mergedClsPrefix}-checkbox--show-label`
        ]}
        tabindex={mergedDisabled || !focusable ? undefined : 0}
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : renderedChecked}
        aria-labelledby={labelId}
        style={cssVars as CSSProperties}
        onKeyup={handleKeyUp}
        onKeydown={handleKeyDown}
        onClick={handleClick}
        onMousedown={() => {
          on(
            'selectstart',
            window,
            (e: Event): void => {
              e.preventDefault()
            },
            {
              once: true
            }
          )
        }}
      >
        <div class={`${mergedClsPrefix}-checkbox-box-wrapper`}>
          &nbsp;
          <div class={`${mergedClsPrefix}-checkbox-box`}>
            <ZIconSwitchTransition>
              {{
                default: () =>
                  this.indeterminate ? (
                    <div
                      key="indeterminate"
                      class={`${mergedClsPrefix}-checkbox-icon`}
                    >
                      {LineMark}
                    </div>
                  ) : (
                    <div key="check" class={`${mergedClsPrefix}-checkbox-icon`}>
                      {CheckMark}
                    </div>
                  )
              }}
            </ZIconSwitchTransition>
            <div class={`${mergedClsPrefix}-checkbox-box__border`} />
          </div>
        </div>
        {labelNode}
      </div>
    )
  }
})
