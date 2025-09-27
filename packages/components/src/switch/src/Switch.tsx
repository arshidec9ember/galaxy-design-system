import {
  h,
  ref,
  defineComponent,
  computed,
  type CSSProperties,
  type PropType,
  watchEffect
} from 'vue'
import { depx, pxfy } from 'seemly'
import { useMergedState } from '../../_external-dependencies/vooks'
import {
  useConfig,
  useFormItem,
  useProxyModel,
  useTheme,
  useThemeClass
} from '../../_mixins'
import { ZBaseLoading, ZIconSwitchTransition } from '../../_internal'
import type { ThemeProps } from '../../_mixins'
import {
  call,
  createKey,
  warnOnce,
  isSlotEmpty,
  resolveWrappedSlot
} from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { switchLight } from '../styles'
import type { SwitchTheme } from '../styles'
import type { OnUpdateModelValueImpl, OnUpdateModelValue } from './interface'
import style from './styles/index.cssr'

export const switchProps = {
  ...(useTheme.props as ThemeProps<SwitchTheme>),
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  modelValue: {
    type: [String, Number, Boolean] as PropType<
    string | number | boolean | undefined
    >,
    default: undefined
  },
  loading: Boolean,
  defaultModelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: false
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  round: {
    type: Boolean,
    default: true
  },
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  checkedValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: true
  },
  uncheckedValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: false
  },
  railStyle: Function as PropType<
  (params: { focused: boolean, checked: boolean }) => string | CSSProperties
  >,
  rubberBand: {
    type: Boolean,
    default: true
  },
  /** @deprecated */
  onChange: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue> | undefined
  >
} as const

export type SwitchProps = ExtractPublicPropTypes<typeof switchProps>

let supportCssMax: boolean | undefined

export default defineComponent({
  name: 'Switch',
  props: switchProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange) {
          warnOnce(
            'switch',
            '`on-change` is deprecated, please use `on-update:model-value` instead.'
          )
        }
      })
    }
    if (supportCssMax === undefined) {
      if (typeof CSS !== 'undefined') {
        if (typeof CSS.supports !== 'undefined') {
          supportCssMax = CSS.supports('width', 'max(1px)')
        } else {
          supportCssMax = false
        }
      } else {
        // If you are using SSR, we assume that you are targeting browsers with
        // recent versions
        supportCssMax = true
      }
    }
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Switch',
      '-switch',
      style,
      switchLight,
      props,
      mergedClsPrefixRef
    )
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem
    const uncontrolledValueRef = ref(props.defaultModelValue)
    const controlledValueRef = useProxyModel(props, 'modelValue')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const checkedRef = computed(() => {
      return mergedValueRef.value === props.checkedValue
    })
    const pressedRef = ref(false)
    const focusedRef = ref(false)
    const mergedRailStyleRef = computed(() => {
      const { railStyle } = props
      if (!railStyle) return undefined
      return railStyle({ focused: focusedRef.value, checked: checkedRef.value })
    })
    function doUpdateValue (value: string | number | boolean): void {
      const { onChange } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      controlledValueRef.value = value
      if (onChange) call(onChange as OnUpdateModelValueImpl, value)
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function doFocus (): void {
      const { nTriggerFormFocus } = formItem
      nTriggerFormFocus()
    }
    function doBlur (): void {
      const { nTriggerFormBlur } = formItem
      nTriggerFormBlur()
    }
    function handleClick (): void {
      if (props.loading || mergedDisabledRef.value) return
      if (mergedValueRef.value !== props.checkedValue) {
        doUpdateValue(props.checkedValue)
      } else {
        doUpdateValue(props.uncheckedValue)
      }
    }
    function handleFocus (): void {
      focusedRef.value = true
      doFocus()
    }
    function handleBlur (): void {
      focusedRef.value = false
      doBlur()
      pressedRef.value = false
    }
    function handleKeyup (e: KeyboardEvent): void {
      if (props.loading || mergedDisabledRef.value) return
      if (e.key === ' ') {
        if (mergedValueRef.value !== props.checkedValue) {
          doUpdateValue(props.checkedValue)
        } else {
          doUpdateValue(props.uncheckedValue)
        }
        pressedRef.value = false
      }
    }
    function handleKeydown (e: KeyboardEvent): void {
      if (props.loading || mergedDisabledRef.value) return
      if (e.key === ' ') {
        e.preventDefault()
        pressedRef.value = true
      }
    }
    const cssVarsRef = computed(() => {
      const { value: size } = mergedSizeRef
      const {
        self: {
          opacityDisabled,
          railColor,
          railColorActive,
          buttonBoxShadow,
          buttonColor,
          boxShadowFocus,
          loadingColor,
          textColor,
          iconColor,
          railColorHover,
          railColorActiveHover,
          [createKey('buttonHeight', size)]: buttonHeight,
          [createKey('buttonWidth', size)]: buttonWidth,
          [createKey('buttonWidthPressed', size)]: buttonWidthPressed,
          [createKey('railHeight', size)]: railHeight,
          [createKey('railWidth', size)]: railWidth,
          [createKey('railBorderRadius', size)]: railBorderRadius,
          [createKey('buttonBorderRadius', size)]: buttonBorderRadius
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value

      let offset: string
      let height: string
      let width: string
      if (supportCssMax) {
        offset = `calc((${railHeight} - ${buttonHeight}) / 2)`
        height = `max(${railHeight}, ${buttonHeight})`
        width = `max(${railWidth}, calc(${railWidth} + ${buttonHeight} - ${railHeight}))`
      } else {
        offset = pxfy((depx(railHeight) - depx(buttonHeight)) / 2)
        height = pxfy(Math.max(depx(railHeight), depx(buttonHeight)))
        width =
          depx(railHeight) > depx(buttonHeight)
            ? railWidth
            : pxfy(depx(railWidth) + depx(buttonHeight) - depx(railHeight))
      }
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-button-border-radius': buttonBorderRadius,
        '--z-button-box-shadow': buttonBoxShadow,
        '--z-button-color': buttonColor,
        '--z-button-width': buttonWidth,
        '--z-button-width-pressed': buttonWidthPressed,
        '--z-button-height': buttonHeight,
        '--z-height': height,
        '--z-offset': offset,
        '--z-opacity-disabled': opacityDisabled,
        '--z-rail-border-radius': railBorderRadius,
        '--z-rail-color': railColor,
        '--z-rail-color-hover': railColorHover,
        '--z-rail-color-active': railColorActive,
        '--z-rail-color-active-hover': railColorActiveHover,
        '--z-rail-height': railHeight,
        '--z-rail-width': railWidth,
        '--z-width': width,
        '--z-box-shadow-focus': boxShadowFocus,
        '--z-loading-color': loadingColor,
        '--z-text-color': textColor,
        '--z-icon-color': iconColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'switch',
        computed(() => {
          return mergedSizeRef.value[0]
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      handleClick,
      handleBlur,
      handleFocus,
      handleKeyup,
      handleKeydown,
      mergedRailStyle: mergedRailStyleRef,
      pressed: pressedRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      checked: checkedRef,
      mergedDisabled: mergedDisabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      mergedClsPrefix,
      mergedDisabled,
      checked,
      mergedRailStyle,
      onRender,
      $slots
    } = this
    onRender?.()
    const {
      checked: checkedSlot,
      unchecked: uncheckedSlot,
      icon: iconSlot,
      'checked-icon': checkedIconSlot,
      'unchecked-icon': uncheckedIconSlot
    } = $slots
    const hasIcon = !(
      isSlotEmpty(iconSlot) &&
      isSlotEmpty(checkedIconSlot) &&
      isSlotEmpty(uncheckedIconSlot)
    )
    return (
      <div
        role="switch"
        aria-checked={checked}
        class={[
          `${mergedClsPrefix}-switch`,
          this.themeClass,
          hasIcon && `${mergedClsPrefix}-switch--icon`,
          checked && `${mergedClsPrefix}-switch--active`,
          mergedDisabled && `${mergedClsPrefix}-switch--disabled`,
          this.round && `${mergedClsPrefix}-switch--round`,
          this.loading && `${mergedClsPrefix}-switch--loading`,
          this.pressed && `${mergedClsPrefix}-switch--pressed`,
          this.rubberBand && `${mergedClsPrefix}-switch--rubber-band`
        ]}
        tabindex={!this.mergedDisabled ? 0 : undefined}
        style={this.cssVars as CSSProperties}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyup={this.handleKeyup}
        onKeydown={this.handleKeydown}
      >
        <div
          class={`${mergedClsPrefix}-switch__rail`}
          aria-hidden="true"
          style={mergedRailStyle}
        >
          {resolveWrappedSlot(checkedSlot, (checkedSlotChildren) =>
            resolveWrappedSlot(uncheckedSlot, (uncheckedSlotChildren) => {
              if (checkedSlotChildren || uncheckedSlotChildren) {
                return (
                  <div
                    aria-hidden
                    class={`${mergedClsPrefix}-switch__children-placeholder`}
                  >
                    <div class={`${mergedClsPrefix}-switch__rail-placeholder`}>
                      <div
                        class={`${mergedClsPrefix}-switch__button-placeholder`}
                      />
                      {checkedSlotChildren}
                    </div>
                    <div class={`${mergedClsPrefix}-switch__rail-placeholder`}>
                      <div
                        class={`${mergedClsPrefix}-switch__button-placeholder`}
                      />
                      {uncheckedSlotChildren}
                    </div>
                  </div>
                )
              }
              return null
            })
          )}
          <div class={`${mergedClsPrefix}-switch__button`}>
            {resolveWrappedSlot(iconSlot, (icon) =>
              resolveWrappedSlot(checkedIconSlot, (checkedIcon) =>
                resolveWrappedSlot(uncheckedIconSlot, (uncheckedIcon) => {
                  return (
                    <ZIconSwitchTransition>
                      {{
                        default: () =>
                          this.loading ? (
                            <ZBaseLoading
                              key="loading"
                              clsPrefix={mergedClsPrefix}
                              strokeWidth={20}
                            />
                          ) : this.checked && (checkedIcon || icon) ? (
                            <div
                              class={`${mergedClsPrefix}-switch__button-icon`}
                              key={checkedIcon ? 'checked-icon' : 'icon'}
                            >
                              {checkedIcon || icon}
                            </div>
                          ) : !this.checked && (uncheckedIcon || icon) ? (
                            <div
                              class={`${mergedClsPrefix}-switch__button-icon`}
                              key={uncheckedIcon ? 'unchecked-icon' : 'icon'}
                            >
                              {uncheckedIcon || icon}
                            </div>
                          ) : null
                      }}
                    </ZIconSwitchTransition>
                  )
                })
              )
            )}
            {resolveWrappedSlot(
              checkedSlot,
              (children) =>
                children && (
                  <div
                    key="checked"
                    class={`${mergedClsPrefix}-switch__checked`}
                  >
                    {children}
                  </div>
                )
            )}
            {resolveWrappedSlot(
              uncheckedSlot,
              (children) =>
                children && (
                  <div
                    key="unchecked"
                    class={`${mergedClsPrefix}-switch__unchecked`}
                  >
                    {children}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    )
  }
})
