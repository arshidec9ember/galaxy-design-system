import {
  h,
  computed,
  onMounted,
  ref,
  type PropType,
  defineComponent,
  Transition,
  type CSSProperties
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { ZBaseSlotMachine, ZBaseWave } from '../../_internal'
import {
  color2Class,
  createKey,
  getTitleAttribute,
  isSlotEmpty,
  resolveSlot
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { badgeLight } from '../styles'
import type { BadgeTheme } from '../styles'
import style from './styles/index.cssr'
import { useRtl } from '../../_mixins/use-rtl'

type ColorType = 'success' | 'error' | 'warning' | 'info' | 'primary'

export const badgeProps = {
  ...(useTheme.props as ThemeProps<BadgeTheme>),
  value: [String, Number] as PropType<string | number>,
  max: Number,
  dot: Boolean,
  color: {
    type: String as PropType<
    'success' | 'error' | 'warning' | 'info' | 'primary' | string
    >,
    default: 'error'
  },
  show: {
    type: Boolean,
    default: true
  },
  showZero: Boolean,
  processing: Boolean,
  offset: Array as unknown as PropType<
  readonly [number | string, number | string]
  >
} as const

export type BadgeProps = ExtractPublicPropTypes<typeof badgeProps>

export default defineComponent({
  name: 'Badge',
  props: badgeProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)
    const themeRef = useTheme(
      'Badge',
      '-badge',
      style,
      badgeLight,
      props,
      mergedClsPrefixRef
    )
    const appearedRef = ref(false)
    const handleAfterEnter = (): void => {
      appearedRef.value = true
    }
    const handleAfterLeave = (): void => {
      appearedRef.value = false
    }
    const showBadgeRef = computed(() => {
      return (
        props.show &&
        (props.dot ||
          (props.value !== undefined &&
            !(!props.showZero && Number(props.value) <= 0)) ||
          !isSlotEmpty(slots.value))
      )
    })
    onMounted(() => {
      if (showBadgeRef.value) appearedRef.value = true
    })

    const rtlEnabledRef = useRtl('Badge', mergedRtlRef, mergedClsPrefixRef)

    const { color: propColor } = props
    const type = computed<ColorType>((): ColorType => {
      if (
        ['success', 'primary', 'warning', 'info', 'error'].includes(propColor)
      ) {
        return propColor as ColorType
      } else {
        return 'error'
      }
    })
    const cssVarsRef = computed(() => {
      const customColor = type.value !== propColor ? propColor : ''
      const {
        common: { cubicBezierEaseInOut, cubicBezierEaseOut },
        self: { [createKey('color', type.value)]: color, fontFamily, fontSize }
      } = themeRef.value
      return {
        '--z-font-size': fontSize,
        '--z-font-family': fontFamily,
        '--z-color': customColor || color,
        '--z-ripple-color': customColor || color,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-ripple-bezier': cubicBezierEaseOut
      }
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'badge',
        computed(() => {
          let hash = ''
          if (type.value) {
            hash += type.value[0]
          }
          if (propColor !== type.value) {
            hash += color2Class(propColor)
          }
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined

    const offsetStyleRef = computed(() => {
      const { offset } = props
      if (!offset) return undefined
      const [x, y] = offset
      const reslovedOffsetX = typeof x === 'number' ? `${x}px` : x
      const reslovedOffsetY = typeof y === 'number' ? `${y}px` : y
      return {
        transform: `translate(calc(${
          rtlEnabledRef?.value ? '50%' : '-50%'
        } + ${reslovedOffsetX}), ${reslovedOffsetY})`
      }
    })

    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      appeared: appearedRef,
      showBadge: showBadgeRef,
      handleAfterEnter,
      handleAfterLeave,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      offsetStyle: offsetStyleRef
    }
  },
  render () {
    const { mergedClsPrefix, onRender, themeClass, $slots } = this
    onRender?.()
    const children = $slots.default?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-badge`,
          this.rtlEnabled && `${mergedClsPrefix}-badge--rtl`,
          themeClass,
          {
            [`${mergedClsPrefix}-badge--dot`]: this.dot,
            [`${mergedClsPrefix}-badge--as-is`]: !children
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {children}
        <Transition
          name="fade-in-scale-up-transition"
          onAfterEnter={this.handleAfterEnter}
          onAfterLeave={this.handleAfterLeave}
        >
          {{
            default: () =>
              this.showBadge ? (
                <sup
                  class={`${mergedClsPrefix}-badge-sup`}
                  title={getTitleAttribute(this.value)}
                  style={this.offsetStyle}
                >
                  {resolveSlot($slots.value, () => [
                    !this.dot ? (
                      <ZBaseSlotMachine
                        clsPrefix={mergedClsPrefix}
                        appeared={this.appeared}
                        max={this.max}
                        value={this.value}
                      />
                    ) : null
                  ])}
                  {this.processing ? (
                    <ZBaseWave clsPrefix={mergedClsPrefix} />
                  ) : null}
                </sup>
              ) : null
          }}
        </Transition>
      </div>
    )
  }
})
