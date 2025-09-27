import {
  h,
  ref,
  computed,
  inject,
  defineComponent,
  type PropType,
  type CSSProperties,
  type ButtonHTMLAttributes,
  type ExtractPropTypes,
  type VNodeChild
} from 'vue'
import { useMemo } from '../../_external-dependencies/vooks'
import { changeColor } from 'seemly'
import { createHoverColor, createPressedColor } from '../../_utils/color/index'
import { buttonGroupInjectionKey } from '../../button-group/src/context'
import { useRtl } from '../../_mixins/use-rtl'
import { isSafari } from '../../_utils/env/browser'
import { useConfig, useFormItem, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  ZFadeInExpandTransition,
  ZIconSwitchTransition,
  ZBaseLoading
} from '../../_internal'
import type { BaseWaveRef } from '../../_internal'
import {
  call,
  color2Class,
  createKey,
  isSlotEmpty,
  resolveWrappedSlot
} from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { buttonLight } from '../styles'
import type { ButtonTheme } from '../styles'
import {
  type Size,
  type Justify,
  type Type,
  Variant,
  type ButtonColor
} from './interface'

import { SIZE_MAP_VARIANT } from './constants'
import style from './styles/index.cssr'
import { ZText } from '../../typography'

const getResolvedColorFromToken = (
  el: Element | null,
  value: string
): string => {
  // get the css variable value if it starts with var and also get the variable name
  if (!el) return '#fff'
  if (typeof value === 'string' && value.trim().startsWith('var')) {
    const cssVar = /var\((.*?)\)/
    // token from cssvar
    const match: any = value.match(cssVar)
    return getComputedStyle(el).getPropertyValue(match[1].trim())
  }
  return value
}

export const buttonProps = {
  ...(useTheme.props as ThemeProps<ButtonTheme>),
  label: String,
  color: {
    type: [String, Object] as PropType<string | Type | ButtonColor>,
    default: 'neutral'
  },
  justify: String as PropType<Justify>,
  fullWidth: Boolean,
  loading: Boolean,
  loadingType: {
    type: String as PropType<'overlay' | 'inline'>,
    default: 'overlay'
  },
  borderStyle: {
    type: String as PropType<'dotted' | 'dashed'>,
    default: undefined
  },
  disabled: Boolean,
  circle: Boolean,
  size: String as PropType<Size>,
  round: Boolean,
  strong: Boolean,
  focusable: {
    type: Boolean,
    default: true
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'button'
  },
  variant: {
    type: String,
    default: Variant.DEFAULT,
    validator: (value: string) => {
      return Object.values(Variant).includes(value as Variant)
    }
  },
  renderIcon: Function as PropType<() => VNodeChild>,
  renderStart: Function as PropType<() => VNodeChild>,
  renderEnd: Function as PropType<() => VNodeChild>,
  iconPlacement: {
    type: String as PropType<'start' | 'end'>,
    default: 'start'
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  elevation: {
    type: Number as PropType<0 | 1 | 2 | 3 | 4>,
    default: 0
  },
  onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  nativeFocusBehavior: {
    type: Boolean,
    default: !isSafari
  },
  href: String,
  target: {
    type: String as PropType<'_blank' | '_self' | '_top' | '_parent'>,
    default: '_blank'
  }
} as const

export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>

const Button = defineComponent({
  name: 'Button',
  props: buttonProps,
  setup (props) {
    const selfElRef = ref<HTMLElement | null>(null)
    const waveElRef = ref<BaseWaveRef | null>(null)
    const enterPressedRef = ref(false)
    const showBorderRef = useMemo(() => {
      return (
        props.variant === Variant.DEFAULT || props.variant === Variant.OUTLINED
      )
    })
    const ZButtonGroup = inject(buttonGroupInjectionKey, {})
    const tag = props.variant === Variant.LINK || props.href ? 'a' : props.tag
    const { mergedSizeRef } = useFormItem(
      {},
      {
        defaultSize: 'medium',
        mergedSize: (ZFormItem) => {
          const { size } = props
          if (size) return size
          const { size: buttonGroupSize } = ZButtonGroup
          if (buttonGroupSize) return buttonGroupSize
          const { mergedSize: formItemSize } = ZFormItem || {}
          if (formItemSize) {
            return formItemSize.value
          }
          return 'medium'
        }
      }
    )
    const mergedFocusableRef = computed(() => {
      return props.focusable && !props.disabled
    })
    const isVariantTextOrLink = computed((): boolean => {
      return props.variant === Variant.TEXT || props.variant === Variant.LINK
    })

    const mergedColorRef = computed<{
      type: Type
      color: string
      textColor: string
      iconColor: string
    }>(
      (): {
        type: Type
        color: string
        textColor: string
        iconColor: string
      } => {
        const { color } = props
        if (
          typeof color === 'string' &&
          [
            'neutral',
            'primary',
            'success',
            'warning',
            'error',
            'info'
          ].includes(color)
        ) {
          return {
            type: color as Type,
            color: '',
            textColor: '',
            iconColor: ''
          }
        } else if (typeof color === 'string') {
          return {
            type: 'neutral',
            color,
            textColor: '',
            iconColor: ''
          }
        } else if (typeof color === 'object') {
          const {
            color: colorValue = '',
            textColor = '',
            iconColor = ''
          } = color || {}
          return {
            textColor,
            iconColor,
            color: colorValue,
            type: 'neutral'
          }
        } else {
          throw new Error('color props is invalid')
        }
      }
    )

    const handleMousedown = (e: MouseEvent): void => {
      if (!mergedFocusableRef.value) {
        e.preventDefault()
      }
      if (props.nativeFocusBehavior) {
        return
      }
      e.preventDefault()
      // normally this won't be called if disabled (when tag is button)
      // if not, we try to make it behave like a button
      if (props.disabled) {
        return
      }
      if (mergedFocusableRef.value) {
        selfElRef.value?.focus({ preventScroll: true })
      }
    }
    const handleClick = (e: MouseEvent): void => {
      if (!props.disabled && !props.loading) {
        const { onClick } = props
        if (onClick) call(onClick, e)
        if (!isVariantTextOrLink.value) {
          waveElRef.value?.play()
        }
      }
    }
    const handleKeyup = (e: KeyboardEvent): void => {
      switch (e.key) {
        case 'Enter':
          if (!props.keyboard) {
            return
          }
          enterPressedRef.value = false
      }
    }
    const handleKeydown = (e: KeyboardEvent): void => {
      switch (e.key) {
        case 'Enter':
          if (!props.keyboard || props.loading) {
            e.preventDefault()
            return
          }
          enterPressedRef.value = true
      }
    }
    const handleBlur = (e: MouseEvent): void => {
      enterPressedRef.value = false
      const { onBlur } = props
      if (onBlur) call(onBlur, e)
    }
    const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef } =
      useConfig(props)
    const themeRef = useTheme(
      'Button',
      '-button',
      style,
      buttonLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('Button', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const theme = themeRef.value
      const {
        common: { cubicBezierEaseInOut, cubicBezierEaseOut },
        self
      } = theme
      const { rippleDuration, opacityDisabled, fontWeight, fontWeightStrong } =
        self
      const size = mergedSizeRef.value
      const { round, circle, variant, strong, elevation } = props
      const { iconColor, textColor } = mergedColorRef.value
      // font
      const fontProps = {
        'font-weight': strong ? fontWeightStrong : fontWeight
      }
      // color
      let colorProps = {
        '--z-color': 'none',
        '--z-color-hover': 'none',
        '--z-color-pressed': 'none',
        '--z-color-focus': 'none',
        '--z-color-disabled': 'none',
        '--z-icon-color': 'none',
        '--z-ripple-color': 'none',
        '--z-text-color': 'none',
        '--z-text-color-hover': 'none',
        '--z-text-color-pressed': 'none',
        '--z-text-color-focus': 'none',
        '--z-text-color-disabled': 'none'
      }
      // make changes if type is default or if any other color
      const typeIsDefault = mergedColorRef.value.type === 'neutral'
      const mergedType = mergedColorRef.value.type
      if (variant === Variant.TEXT) {
        const propTextColor =
          mergedColorRef.value.textColor || mergedColorRef.value.color
        const propIconColor =
          mergedColorRef.value.iconColor || mergedColorRef.value.color
        const mergedTextColor =
          propTextColor || self[createKey('textColorText', mergedType)]
        const mergedIconColor =
          propIconColor || self[createKey('iconColorText', mergedType)]
        colorProps = {
          '--z-color': '#0000',
          '--z-color-hover': '#0000',
          '--z-color-pressed': '#0000',
          '--z-color-focus': '#0000',
          '--z-color-disabled': '#0000',
          '--z-icon-color': mergedIconColor,
          '--z-ripple-color': '#0000',
          '--z-text-color': mergedTextColor,
          '--z-text-color-hover': propTextColor
            ? createHoverColor(propTextColor)
            : self[createKey('textColorTextHover', mergedType)],
          '--z-text-color-pressed': propTextColor
            ? createPressedColor(propTextColor)
            : self[createKey('textColorTextPressed', mergedType)],
          '--z-text-color-focus': propTextColor
            ? createHoverColor(propTextColor)
            : self[createKey('textColorTextHover', mergedType)],
          '--z-text-color-disabled':
            propTextColor ||
            self[createKey('textColorTextDisabled', mergedType)]
        }
      } else if (variant === Variant.LINK) {
        const propTextColor =
          mergedColorRef.value.textColor || mergedColorRef.value.color
        const propIconColor =
          mergedColorRef.value.iconColor || mergedColorRef.value.color
        const mergedType = 'primary'
        const mergedTextColor = self[createKey('textColorText', mergedType)]
        const mergedIconColor =
          propIconColor || self[createKey('iconColorText', mergedType)]
        colorProps = {
          '--z-color': '#0000',
          '--z-color-hover': '#0000',
          '--z-color-pressed': '#0000',
          '--z-color-focus': '#0000',
          '--z-color-disabled': '#0000',
          '--z-icon-color': mergedIconColor,
          '--z-ripple-color': '#0000',
          '--z-text-color': mergedTextColor,
          '--z-text-color-hover': propTextColor
            ? createHoverColor(propTextColor)
            : self[createKey('textColorTextHover', mergedType)],
          '--z-text-color-pressed': propTextColor
            ? createPressedColor(propTextColor)
            : self[createKey('textColorTextPressed', mergedType)],
          '--z-text-color-focus': propTextColor
            ? createHoverColor(propTextColor)
            : self[createKey('textColorTextHover', mergedType)],
          '--z-text-color-disabled':
            propTextColor ||
            self[createKey('textColorTextDisabled', mergedType)]
        }
      } else if (variant === Variant.DEFAULT) {
        const typeTextColor = self.textColor
        const iconColor = self.iconColor
        const mergedColor = self.colorDefault
        const mergedTextColor = mergedColorRef.value.color || typeTextColor
        const mergedIconColor = mergedColorRef.value.iconColor || iconColor
        colorProps = {
          '--z-color': mergedColor,
          '--z-color-hover':
            mergedColorRef.value.type === 'neutral'
              ? 'var(--gds-color-bg-button-secondary-dark1)'
              : changeColor(
                getResolvedColorFromToken(selfElRef.value, mergedColor),
                {
                  alpha: Number(self.colorOpacitySecondaryHover)
                }
              ),
          '--z-color-pressed':
            mergedColorRef.value.type === 'neutral'
              ? 'var(--gds-color-bg-button-secondary)'
              : changeColor(
                getResolvedColorFromToken(selfElRef.value, mergedTextColor),
                {
                  alpha: Number(self.colorOpacitySecondaryPressed)
                }
              ),
          '--z-color-focus': changeColor(
            getResolvedColorFromToken(selfElRef.value, mergedTextColor),
            {
              alpha: Number(self.colorOpacitySecondaryHover)
            }
          ),
          '--z-color-disabled': self.colorSecondary,
          '--z-icon-color': mergedIconColor,
          '--z-ripple-color': '#0000',
          '--z-text-color': mergedTextColor,
          '--z-text-color-hover': mergedTextColor,
          '--z-text-color-pressed': mergedTextColor,
          '--z-text-color-focus': mergedTextColor,
          '--z-text-color-disabled': mergedTextColor
        }
      } else if (variant === Variant.OUTLINED) {
        const typeTextColor = typeIsDefault
          ? self.textColor
          : self[createKey('textColorOutlined', mergedType)]
        const typeIconColor = typeIsDefault
          ? self.iconColor
          : self[createKey('iconColorOutlined', mergedType)]
        const mergedTextColor = mergedColorRef.value.color || typeTextColor
        const mergedIconColor = mergedColorRef.value.iconColor || typeIconColor
        colorProps = {
          '--z-color': 'none',
          '--z-color-hover':
            self[createKey('colorOutlinedHover', mergedType)] ||
            changeColor(
              getResolvedColorFromToken(selfElRef.value, mergedTextColor),
              {
                alpha: Number(self.colorOpacitySecondaryHover)
              }
            ),
          '--z-color-pressed':
            self[createKey('colorOutlinedPressed', mergedType)] ||
            changeColor(
              getResolvedColorFromToken(selfElRef.value, mergedTextColor),
              {
                alpha: Number(self.colorOpacitySecondaryPressed)
              }
            ),
          '--z-color-focus':
            self[createKey('colorOutlinedFocus', mergedType)] ||
            changeColor(
              getResolvedColorFromToken(selfElRef.value, mergedTextColor),
              {
                alpha: Number(self.colorOpacitySecondaryHover)
              }
            ),
          '--z-color-disabled': self.colorSecondary,
          '--z-icon-color': mergedIconColor,
          '--z-ripple-color': '#0000',
          '--z-text-color': mergedTextColor,
          '--z-text-color-hover': mergedTextColor,
          '--z-text-color-pressed': mergedTextColor,
          '--z-text-color-focus': mergedTextColor,
          '--z-text-color-disabled': mergedTextColor
        }
      } else if (variant === Variant.LIGHT || variant === Variant.SUBTLE) {
        const typeColor = typeIsDefault
          ? self.textColorNeutral
          : self[createKey('textColorTertiary', mergedType)]
        const mergedColor = mergedColorRef.value.color || typeColor
        const iconColor = typeIsDefault
          ? self.iconColor
          : self[createKey('iconColorTertiary', mergedType)]
        const mergedIconColor = mergedColorRef.value.iconColor || iconColor
        if (variant === Variant.LIGHT) {
          colorProps['--z-color'] = self.colorTertiary
          colorProps['--z-color-hover'] = self.colorTertiaryHover
          colorProps['--z-color-pressed'] = self.colorTertiaryPressed
          colorProps['--z-color-focus'] = self.colorSecondaryHover
          colorProps['--z-color-disabled'] = self.colorTertiary
        } else {
          colorProps['--z-color'] = 'none'
          colorProps['--z-color-hover'] =
            mergedColorRef.value.type === 'neutral'
              ? 'var(--gds-color-bg-button-tertiary-dark1)'
              : self[createKey('colorSubtleHover', mergedType)] ||
                changeColor(
                  getResolvedColorFromToken(selfElRef.value, mergedColor),
                  {
                    alpha: Number(self.colorOpacitySecondaryHover)
                  }
                )
          colorProps['--z-color-pressed'] =
            mergedColorRef.value.type === 'neutral'
              ? 'var(--gds-color-bg-button-tertiary-dark2)'
              : self[createKey('colorSubtlePressed', mergedType)] ||
                changeColor(
                  getResolvedColorFromToken(selfElRef.value, mergedColor),
                  {
                    alpha: Number(self.colorOpacitySecondaryPressed)
                  }
                )
          colorProps['--z-color-focus'] =
            self[createKey('colorSubtleFocus', mergedType)] ||
            changeColor(
              getResolvedColorFromToken(selfElRef.value, mergedColor),
              {
                alpha: Number(self.colorOpacitySecondaryHover)
              }
            )
          colorProps['--z-color-disabled'] = 'none'
        }
        colorProps['--z-icon-color'] = mergedIconColor
        colorProps['--z-ripple-color'] = '#0000'
        colorProps['--z-text-color'] = mergedColor
        colorProps['--z-text-color-hover'] = mergedColor
        colorProps['--z-text-color-pressed'] = mergedColor
        colorProps['--z-text-color-focus'] = mergedColor
        colorProps['--z-text-color-disabled'] = mergedColor
      } else {
        const color = mergedColorRef.value.color
        colorProps = {
          '--z-color':
            mergedColorRef.value.color || self[createKey('color', mergedType)],
          '--z-color-hover': color
            ? createHoverColor(
              getResolvedColorFromToken(selfElRef.value, color)
            )
            : self[createKey('colorHover', mergedType)],
          '--z-color-pressed': color
            ? createPressedColor(
              getResolvedColorFromToken(selfElRef.value, color)
            )
            : self[createKey('colorPressed', mergedType)],
          '--z-color-focus': color
            ? createHoverColor(
              getResolvedColorFromToken(selfElRef.value, color)
            )
            : self[createKey('colorFocus', mergedType)],
          '--z-color-disabled':
            color || self[createKey('colorDisabled', mergedType)],
          '--z-icon-color':
            iconColor ||
            (color
              ? self.iconColorFilled
              : self[createKey('iconColorFilled', mergedType)]),
          '--z-ripple-color':
            color || self[createKey('rippleColor', mergedType)],
          '--z-text-color':
            textColor ||
            (color
              ? self.textColorFilled
              : self[createKey('textColorFilled', mergedType)]),
          '--z-text-color-hover':
            textColor ||
            (color
              ? self.textColorHoverFilled
              : self[createKey('textColorHoverFilled', mergedType)]),
          '--z-text-color-pressed':
            textColor ||
            (color
              ? self.textColorPressedFilled
              : self[createKey('textColorPressedFilled', mergedType)]),
          '--z-text-color-focus':
            textColor ||
            (color
              ? self.textColorFocusFilled
              : self[createKey('textColorFocusFilled', mergedType)]),
          '--z-text-color-disabled':
            textColor ||
            (color
              ? self.textColorDisabledFilled
              : self[createKey('textColorDisabledFilled', mergedType)])
        }
      }
      // border
      let borderProps = {
        '--z-border': 'none',
        '--z-border-hover': 'none',
        '--z-border-pressed': 'none',
        '--z-border-focus': 'none',
        '--z-border-disabled': 'none'
      }
      if (
        isVariantTextOrLink.value ||
        variant === Variant.SUBTLE ||
        variant === Variant.LIGHT ||
        variant === Variant.FILLED
      ) {
        borderProps = {
          '--z-border': 'none',
          '--z-border-hover': 'none',
          '--z-border-pressed': 'none',
          '--z-border-focus': 'none',
          '--z-border-disabled': 'none'
        }
      } else {
        borderProps = {
          '--z-border': self[createKey('border', mergedType)],
          '--z-border-hover': self[createKey('borderHover', mergedType)],
          '--z-border-pressed': self[createKey('borderPressed', mergedType)],
          '--z-border-focus': self[createKey('borderFocus', mergedType)],
          '--z-border-disabled': self[createKey('borderDisabled', mergedType)]
        }
      }
      const { [createKey('elevation', `level${elevation}`)]: elevationShadow } =
        self
      const elevationProps = {
        '--z-box-shadow': elevationShadow
      }
      // size
      const {
        [createKey('height', size)]: height,
        [createKey('fontSize', size)]: fontSize,
        [createKey('padding', size)]: padding,
        [createKey('paddingRound', size)]: paddingRound,
        [createKey('iconSize', size)]: iconSize,
        [createKey('borderRadius', size)]: borderRadius,
        [createKey('iconMargin', size)]: iconMargin,
        paddingIconOnly,
        focusColor,
        waveOpacity
      } = self
      const sizeProps = {
        '--z-width': circle && !isVariantTextOrLink.value ? height : 'none',
        '--z-height': isVariantTextOrLink.value ? 'none' : height,
        '--z-font-size': fontSize,
        '--z-padding': circle
          ? 'none'
          : isVariantTextOrLink.value
            ? 'none'
            : round
              ? paddingRound
              : padding,
        '--z-icon-size': iconSize,
        '--z-icon-margin': iconMargin,
        '--z-padding-icon-only': !isVariantTextOrLink.value
          ? paddingIconOnly
          : 'none',
        '--z-border-radius': isVariantTextOrLink.value
          ? 'none'
          : circle || round
            ? height
            : borderRadius
      }
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-bezier-ease-out': cubicBezierEaseOut,
        '--z-ripple-duration': rippleDuration,
        '--z-opacity-disabled': opacityDisabled,
        '--z-wave-opacity': waveOpacity,
        '--z-border-color-focus': focusColor,
        ...(props.variant === Variant.DEFAULT &&
        mergedColorRef.value.type === 'neutral'
          ? {
              '--z-border-color-hover': 'var(--gds-color-border-neutral-dark1)'
            }
          : {}),
        ...(props.variant === Variant.DEFAULT &&
        mergedColorRef.value.type === 'neutral'
          ? {
              '--z-border-color-pressed':
                'var(--gds-color-border-button-secondary-dark2)'
            }
          : {}),
        ...fontProps,
        ...colorProps,
        ...borderProps,
        ...sizeProps,
        ...elevationProps
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'button',
        computed(() => {
          const { color, textColor, iconColor, type } = mergedColorRef.value
          let hash = ''
          const { round, circle, variant, strong } = props
          if (variant === Variant.TEXT) hash += 'b'
          if (round) hash += 'd'
          if (circle) hash += 'e'
          if (variant === Variant.OUTLINED) hash += 'f'
          if (variant === Variant.LIGHT) hash += 'g'
          if (variant === Variant.SUBTLE) hash += 'h'
          if (strong) hash += 'i'
          if (color) hash += 'j' + color2Class(color)
          if (textColor) hash += 'k' + color2Class(textColor)
          if (iconColor) hash += 'l' + color2Class(iconColor)
          const { value: size } = mergedSizeRef
          hash += 'm' + size[0]
          hash += 'n' + type[0]
          if (variant === Variant.LINK) hash += 'o'
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined

    return {
      selfElRef,
      waveElRef,
      tag,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedFocusable: mergedFocusableRef,
      mergedSize: mergedSizeRef,
      showBorder: showBorderRef,
      enterPressed: enterPressedRef,
      rtlEnabled: rtlEnabledRef,
      handleMousedown,
      handleKeydown,
      handleBlur,
      handleKeyup,
      handleClick,
      isVariantTextOrLink,
      mergedColor: mergedColorRef,
      customColorCssVars: computed(() => {
        const { color } = props
        if (!color) return null
        const hoverColor = createHoverColor(
          getResolvedColorFromToken(selfElRef.value, mergedColorRef.value.color)
        )
        return {
          '--z-border-color': color,
          '--z-border-color-hover': hoverColor,
          '--z-border-color-pressed': createPressedColor(
            getResolvedColorFromToken(
              selfElRef.value,
              mergedColorRef.value.color
            )
          ),
          '--z-border-color-focus': hoverColor,
          '--z-border-color-disabled': color
        }
      }),
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix, tag: Component, onRender } = this
    onRender?.()
    const start = resolveWrappedSlot(
      this.$slots.start,
      (children) =>
        children && (
          <span class={`${mergedClsPrefix}-button__start`}>{children}</span>
        )
    )
    const end = resolveWrappedSlot(
      this.$slots.end,
      (children) =>
        children && (
          <span class={`${mergedClsPrefix}-button__end`}>{children}</span>
        )
    )
    const sizeVariant = SIZE_MAP_VARIANT[this.mergedSize]

    const children = resolveWrappedSlot(
      this.$slots.default,
      (children) =>
        (children || this.label) && (
          <ZText color="inherit" variant={sizeVariant}>
            <span class={`${mergedClsPrefix}-button__content`}>
              {children ?? this.label}
            </span>
          </ZText>
        )
    )
    const loader = resolveWrappedSlot(
      this.$slots.loader,
      (children) =>
        children && (
          <span class={`${mergedClsPrefix}-button__loader`}>{children}</span>
        )
    )
    return (
      <Component
        ref="selfElRef"
        class={[
          this.themeClass,
          `${mergedClsPrefix}-button`,
          `${mergedClsPrefix}-button--${this.mergedColor.type}-type`,
          `${mergedClsPrefix}-button--${this.variant}-variant`,
          `${mergedClsPrefix}-button--${this.mergedSize}-type`,
          this.rtlEnabled && `${mergedClsPrefix}-button--rtl`,
          this.disabled && `${mergedClsPrefix}-button--disabled`,
          this.fullWidth && `${mergedClsPrefix}-button--block`,
          this.enterPressed && `${mergedClsPrefix}-button--pressed`,
          this.color && `${mergedClsPrefix}-button--color`,
          this.variant === Variant.LINK &&
            `${mergedClsPrefix}-button--${this.tag}`,
          this.variant === Variant.OUTLINED &&
            `${mergedClsPrefix}-button--secondary`,
          this.loading &&
            `${mergedClsPrefix}-button--loading${
              this.loadingType === 'inline' ? '-inline' : ''
            }`,
          this.$slots.icon &&
            !this.$slots.default &&
            `${mergedClsPrefix}-button--icon-only`
        ]}
        tabindex={this.mergedFocusable ? 0 : -1}
        type={this.type}
        style={[
          Object.assign({}, this.cssVars as CSSProperties, {
            'justify-content': this.justify,
            'border-style': this.borderStyle
          })
        ]}
        href={this.href}
        target={this.target}
        disabled={this.disabled}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onMousedown={this.handleMousedown}
        onKeyup={this.handleKeyup}
        onKeydown={this.handleKeydown}
      >
        {this.loading &&
          this.loadingType === 'overlay' &&
          (this.$slots.loader ? (
            loader
          ) : (
            <span class={`${mergedClsPrefix}-button__loader`}>
              <ZIconSwitchTransition>
                <ZBaseLoading
                  clsPrefix={mergedClsPrefix}
                  key="loading"
                  class={`${mergedClsPrefix}-icon-slot`}
                  strokeWidth={24}
                />
              </ZIconSwitchTransition>
            </span>
          ))}
        {this.iconPlacement === 'end' && children}
        <ZFadeInExpandTransition width>
          {{
            default: () =>
              resolveWrappedSlot(
                this.$slots.icon,
                (children) =>
                  (this.renderIcon ||
                    children ||
                    (this.loading && this.loadingType === 'inline')) && (
                    <span
                      class={`${mergedClsPrefix}-button__icon`}
                      style={{
                        margin: isSlotEmpty(this.$slots.default) ? '0' : ''
                      }}
                    >
                      <ZIconSwitchTransition>
                        {{
                          default: () =>
                            this.loading && this.loadingType === 'inline' ? (
                              <ZBaseLoading
                                clsPrefix={mergedClsPrefix}
                                key="loading"
                                class={`${mergedClsPrefix}-icon-slot`}
                                strokeWidth={24}
                              />
                            ) : (
                              <div
                                key="icon"
                                class={`${mergedClsPrefix}-icon-slot`}
                                role="none"
                              >
                                {this.renderIcon ? this.renderIcon() : children}
                              </div>
                            )
                        }}
                      </ZIconSwitchTransition>
                    </span>
                  )
              )
          }}
        </ZFadeInExpandTransition>
        {this.renderStart ? (
          <span class={`${mergedClsPrefix}-button__start`}>
            {this.renderStart()}
          </span>
        ) : (
          start
        )}
        {this.iconPlacement === 'start' && children}
        {this.renderEnd ? (
          <span class={`${mergedClsPrefix}-button__end`}>
            {this.renderEnd()}
          </span>
        ) : (
          end
        )}
      </Component>
    )
  }
})

type InternalButtonProps = ExtractPropTypes<typeof buttonProps>
type NativeButtonProps = Omit<ButtonHTMLAttributes, keyof InternalButtonProps>
type MergedProps = Partial<InternalButtonProps & NativeButtonProps>

export default Button

// XButton is for tsx type checking
// It's not compitable with render function `h`
// Currently we don't expose it as public
// If there's any issue about this, we may expose it
// Since most people use template, the type checking phase doesn't work as tsx
export const XButton: new () => { $props: MergedProps } = Button as any

// Also, we may make XButton a generic type which support `tag` prop
// but currently vue doesn't export IntrinsicElementAttributes from runtime-dom
// so we can't easily make an attr map by hand
// just leave it for later
