import {
  h,
  defineComponent,
  computed,
  type PropType,
  type CSSProperties,
  ref,
  type Ref,
  provide,
  toRef,
  Fragment
} from 'vue'
import { useRtl } from '../../_mixins/use-rtl'
import { ZBaseClose } from '../../_internal/close'
import {
  useConfig,
  useThemeClass,
  useTheme,
  useProxyModel
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  createKey,
  call,
  createInjectionKey,
  color2Class,
  resolveWrappedSlot
} from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { tagLight } from '../styles'
import type { TagTheme } from '../styles'
import commonProps from './common-props'
import style from './styles/index.cssr'
import { ZText } from '../../typography'
export interface TagPublicMethods {
  setTextContent: (textContent: string) => void
}
export interface TagRef extends TagPublicMethods {
  $el: HTMLElement
}

export const tagProps = {
  ...(useTheme.props as ThemeProps<TagTheme>),
  ...commonProps,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: true
  },
  borderStyle: {
    type: String as PropType<'dotted' | 'dashed' | 'solid'>,
    default: 'solid'
  },
  checked: Boolean,
  readonly: Boolean,
  checkable: Boolean,
  isComboBox: Boolean,
  strong: Boolean,
  noPadding: Boolean,
  triggerClickOnClose: Boolean,
  onClose: [Array, Function] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  onMouseenter: Function as PropType<(e: MouseEvent) => void>,
  onMouseleave: Function as PropType<(e: MouseEvent) => void>,
  'onUpdate:checked': Function as PropType<(checked: boolean) => void>,
  onUpdateChecked: Function as PropType<(checked: boolean) => void>,
  // private
  internalCloseFocusable: {
    type: Boolean,
    default: true
  },
  internalCloseIsButtonTag: {
    type: Boolean,
    default: true
  }
}

interface TagInjection {
  roundRef: Ref<boolean>
}

export const tagInjectionKey = createInjectionKey<TagInjection>('z-tag')

export type TagProps = ExtractPublicPropTypes<typeof tagProps>

export default defineComponent({
  name: 'Tag',
  props: tagProps,
  setup (props) {
    const contentRef = ref<HTMLElement | null>(null)
    const {
      mergedBorderedRef,
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props)

    const themeRef = useTheme(
      'Tag',
      '-tag',
      style,
      tagLight,
      props,
      mergedClsPrefixRef
    )
    provide(tagInjectionKey, {
      roundRef: toRef(props, 'round')
    })

    const controlledCheckedRef = useProxyModel(props, 'checked')

    function handleClick (e: MouseEvent): void {
      if (!props.disabled) {
        if (props.checkable) {
          const { checked } = props
          controlledCheckedRef.value = !checked
        }
      }
    }
    function handleCloseClick (e: MouseEvent): void {
      if (!props.triggerClickOnClose) {
        e.stopPropagation()
      }
      if (!props.disabled) {
        const { onClose } = props
        if (onClose) call(onClose, e)
      }
    }
    const tagPublicMethods: TagPublicMethods = {
      setTextContent (textContent: string) {
        const { value } = contentRef
        if (value) value.textContent = textContent
      }
    }
    const rtlEnabledRef = useRtl('Tag', mergedRtlRef, mergedClsPrefixRef)

    const textColorRef = computed(() => {
      if (typeof props.color === 'string') {
        return 'inherit'
      }
      return props.color.textColor || 'inherit'
    })

    const cssVarsRef = computed(() => {
      const { size } = props
      const type = typeof props.color === 'string' ? props.color : 'neutral'

      const {
        color = '',
        textColor = '',
        iconColor = ''
      } = typeof props.color === 'string' ? {} : props.color
      const {
        common: { cubicBezierEaseInOut },
        self: {
          paddingPill,
          closeMargin,
          closeMarginRtl,
          borderRadius,
          opacityDisabled,
          closeBorderRadius,
          fontWeightStrong,
          [createKey('checkedBordered', type)]: borderChecked,
          borderFocused,
          [createKey('colorBordered', type)]: colorBackground,
          [createKey('closeSize', size)]: closeSize,
          [createKey('closeIconSize', size)]: closeIconSize,
          [createKey('fontSize', size)]: fontSize,
          [createKey('height', size)]: height,
          [createKey('padding', size)]: padding,
          [createKey('color', type)]: typedColor,
          [createKey(
            createKey('textColor', type),
            !props.checkable
              ? ''
              : controlledCheckedRef.value
                ? 'checked'
                : 'unchecked'
          )]: typeTextColor,
          [createKey(
            createKey('iconColor', type),
            controlledCheckedRef.value ? 'checked' : ''
          )]: typeIconColor,
          [createKey(
            createKey('badgeBorderColor', type),
            !props.checkable
              ? ''
              : controlledCheckedRef.value
                ? 'checked'
                : 'unchecked'
          )]: badgeBorderColor,
          [createKey('border', type)]: border,
          [createKey('colorHover', type)]: colorHover,
          [createKey('colorPressed', type)]: colorPressed,
          [createKey('colorChecked', type)]: colorChecked,
          [createKey('closeIconColor', type)]: closeIconColor,
          [createKey('closeIconColorHover', type)]: closeIconColorHover,
          [createKey('closeIconColorPressed', type)]: closeIconColorPressed,
          [createKey('closeColorHover', type)]: closeColorHover,
          [createKey('closeColorPressed', type)]: closeColorPressed
        }
      } = themeRef.value

      const borderColor =
        typeof props.color !== 'string'
          ? props.color.borderColor || badgeBorderColor
          : badgeBorderColor

      return {
        '--z-font-weight-strong': fontWeightStrong,
        '--z-avatar-size-override': `calc(${height} - 10px)`,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-border-radius': borderRadius,
        '--z-border-color': borderColor,
        '--z-border': border,
        '--z-close-icon-size': closeIconSize,
        '--z-close-color-pressed': closeColorPressed,
        '--z-close-color-hover': closeColorHover,
        '--z-close-border-radius': closeBorderRadius,
        '--z-close-icon-color': closeIconColor,
        '--z-close-icon-color-hover': closeIconColorHover,
        '--z-close-icon-color-pressed': closeIconColorPressed,
        '--z-close-icon-color-disabled': closeIconColor,
        '--z-close-margin': closeMargin,
        '--z-close-margin-rtl': closeMarginRtl,
        '--z-close-size': closeSize,
        '--z-color': color || (props.checkable ? typedColor : colorBackground),
        '--z-border-color-checked': borderChecked,
        '--z-color-pressed': colorPressed,
        '--z-color-checked': colorChecked,
        '--z-border-focused': borderFocused,
        '--z-color-hover': colorHover,
        '--z-font-size': fontSize,
        '--z-height': height,
        '--z-opacity-disabled': opacityDisabled,
        '--z-padding': props.noPadding ? '0' : padding,
        '--z-padding-pill': paddingPill,
        '--z-text-color': textColor || typeTextColor,
        '--z-icon-color': iconColor || typeIconColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'tag',
        computed(() => {
          let hash = ''
          const type =
              typeof props.color === 'string' ? props.color : 'neutral'
          const { color = '', textColor = '' } =
              typeof props.color === 'string' ? {} : props.color
          const { size } = props
          hash += type[0]
          hash += size[0]
          if (color) {
            hash += `a${color2Class(color)}`
          }
          if (textColor) {
            hash += `b${color2Class(textColor)}`
          }
          if (mergedBorderedRef.value) {
            hash += 'c'
          }
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      ...tagPublicMethods,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      contentRef,
      mergedBordered: mergedBorderedRef,
      handleClick,
      handleCloseClick,
      textColorRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix, rtlEnabled, closable, round, onRender, $slots } =
      this
    onRender?.()
    const avatarNode = resolveWrappedSlot(
      $slots.avatar,
      (children) =>
        children && (
          <div class={`${mergedClsPrefix}-tag__avatar`}>{children}</div>
        )
    )
    const iconNode = resolveWrappedSlot(
      $slots.icon,
      (children) =>
        children && <div class={`${mergedClsPrefix}-tag__icon`}>{children}</div>
    )

    const labelNode = $slots.label?.()

    const getTextVariant = (): '3-r' | '4-r' => {
      return this.size === 'small' ? '4-r' : '3-r'
    }

    return (
      <div
        class={[
          `${mergedClsPrefix}-tag`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-tag--rtl`]: rtlEnabled,
            [`${mergedClsPrefix}-tag--strong`]: this.strong,
            [`${mergedClsPrefix}-tag--readonly`]:
              this.isComboBox && this.readonly,
            [`${mergedClsPrefix}-tag--combobox`]: this.isComboBox,
            [`${mergedClsPrefix}-tag--disabled`]: this.disabled,
            [`${mergedClsPrefix}-tag--checkable`]: this.checkable,
            [`${mergedClsPrefix}-tag--checked`]: this.checkable && this.checked,
            [`${mergedClsPrefix}-tag--round`]: round,
            [`${mergedClsPrefix}-tag--avatar`]: avatarNode,
            [`${mergedClsPrefix}-tag--icon`]: iconNode,
            [`${mergedClsPrefix}-tag--closable`]: closable
          }
        ]}
        style={this.cssVars as CSSProperties}
        onClick={this.handleClick}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}
        tabindex={0}
      >
        {labelNode && (
          <ZText
            variant="3-m"
            color="neutral"
            class={`${mergedClsPrefix}-tag__label`}
          >
            {$slots.label?.()}
          </ZText>
        )}
        {iconNode || avatarNode}
        <ZText
          variant={getTextVariant()}
          color="inherit"
          class={`${mergedClsPrefix}-tag__content`}
          ref="contentRef"
        >
          {$slots.default?.()}
        </ZText>
        {this.$slots.action ? (
          <Fragment>
            <div class={`${mergedClsPrefix}-tag__action`}>
              {this.$slots.action()}
            </div>
            <div class={`${mergedClsPrefix}-tag__action-gradient`}></div>
          </Fragment>
        ) // combo box is always closable
          : closable || this.isComboBox ? (
          <Fragment>
            <ZBaseClose
              clsPrefix={mergedClsPrefix}
              class={`${mergedClsPrefix}-tag__close`}
              disabled={this.disabled}
              onClick={this.handleCloseClick}
              focusable={this.internalCloseFocusable}
              round={round}
              isButtonTag={this.internalCloseIsButtonTag}
              absolute
            />
            <div class={`${mergedClsPrefix}-tag__action-gradient`}></div>
          </Fragment>
          ) : null}
        {this.mergedBordered ? (
          <div
            class={`${mergedClsPrefix}-tag__border`}
            style={{ borderStyle: this.borderStyle }}
          />
        ) : null}
      </div>
    )
  }
})
