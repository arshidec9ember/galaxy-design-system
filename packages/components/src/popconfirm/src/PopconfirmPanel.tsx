import {
  h,
  defineComponent,
  computed,
  inject,
  type PropType,
  type CSSProperties,
  toRef
} from 'vue'
import { ZButton } from '../../button'
import { ZBaseIcon } from '../../_internal'
import { WarningIcon } from '../../_internal/icons'
import { useConfig, useLocale, useThemeClass } from '../../_mixins'
import { keysOf, resolveSlot, resolveWrappedSlot } from '../../_utils'
import { popconfirmInjectionKey } from './interface'

export const panelProps = {
  positiveText: String as PropType<string | null>,
  negativeText: String as PropType<string | null>,
  showIcon: {
    type: Boolean,
    default: true
  },
  onPositiveClick: {
    type: Function as PropType<(e: MouseEvent) => void>,
    required: true
  },
  onNegativeClick: {
    type: Function as PropType<(e: MouseEvent) => void>,
    required: true
  }
} as const

export const panelPropKeys = keysOf(panelProps)

export default defineComponent({
  name: 'NPopconfirmPanel',
  props: panelProps,
  setup (props) {
    const { localeRef } = useLocale('Popconfirm')
    const { inlineThemeDisabled } = useConfig()
    const {
      mergedClsPrefixRef,
      mergedThemeRef,
      props: popconfirmProps
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(popconfirmInjectionKey)!
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { fontSize, iconSize, iconColor }
      } = mergedThemeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-font-size': fontSize,
        '--z-icon-size': iconSize,
        '--z-icon-color': iconColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'popconfirm-panel',
        undefined,
        cssVarsRef,
        popconfirmProps
      )
      : undefined
    return {
      ...useLocale('Popconfirm'),
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      localizedPositiveText: computed(() => {
        return props.positiveText || localeRef.value.positiveText
      }),
      localizedNegativeText: computed(() => {
        return props.negativeText || localeRef.value.negativeText
      }),
      positiveButtonProps: toRef(popconfirmProps, 'positiveButtonProps'),
      negativeButtonProps: toRef(popconfirmProps, 'negativeButtonProps'),
      handlePositiveClick (e: MouseEvent) {
        props.onPositiveClick(e)
      },
      handleNegativeClick (e: MouseEvent) {
        props.onNegativeClick(e)
      },
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix, showIcon, $slots } = this
    const actionContentNode = resolveSlot($slots.action, () =>
      this.negativeText === null && this.positiveText === null
        ? []
        : [
            this.negativeText !== null && (
              <ZButton
                size="small"
                onClick={this.handleNegativeClick}
                {...this.negativeButtonProps}
              >
                {{ default: () => this.localizedNegativeText }}
              </ZButton>
            ),
            this.positiveText !== null && (
              <ZButton
                size="small"
                color="primary"
                variant="filled"
                onClick={this.handlePositiveClick}
                {...this.positiveButtonProps}
              >
                {{ default: () => this.localizedPositiveText }}
              </ZButton>
            )
          ]
    )
    this.onRender?.()
    return (
      <div
        class={[`${mergedClsPrefix}-popconfirm__panel`, this.themeClass]}
        style={this.cssVars as CSSProperties}
      >
        {resolveWrappedSlot($slots.default, (children) =>
          showIcon || children ? (
            <div class={`${mergedClsPrefix}-popconfirm__body`}>
              {showIcon ? (
                <div class={`${mergedClsPrefix}-popconfirm__icon`}>
                  {resolveSlot($slots.icon, () => [
                    <ZBaseIcon clsPrefix={mergedClsPrefix}>
                      {{ default: () => <WarningIcon /> }}
                    </ZBaseIcon>
                  ])}
                </div>
              ) : null}
              {children}
            </div>
          ) : null
        )}
        {actionContentNode ? (
          <div class={[`${mergedClsPrefix}-popconfirm__action`]}>
            {actionContentNode}
          </div>
        ) : null}
      </div>
    )
  }
})
