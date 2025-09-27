import {
  defineComponent,
  computed,
  inject,
  type PropType,
  h,
  type CSSProperties
} from 'vue'
import {
  createKey,
  formatLength,
  resolveSlot,
  resolveWrappedSlot,
  throwError,
  useHoudini
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { timelineInjectionKey } from './Timeline'
import { useConfig, useThemeClass } from '../../_mixins'
import { ZText, ZTitle } from '../../typography'

export const timelineItemProps = {
  time: [String, Number] as PropType<string | number>,
  title: String,
  content: String,
  lineType: {
    type: String as PropType<'default' | 'dashed'>,
    default: 'default'
  },
  color: {
    type: String as PropType<
    'neutral' | 'success' | 'error' | 'warning' | 'info' | string
    >,
    default: 'neutral'
  }
}

export type TimelineItemProps = ExtractPublicPropTypes<typeof timelineItemProps>

export default defineComponent({
  name: 'TimelineItem',
  props: timelineItemProps,
  setup (props) {
    const ZTimeline = inject(timelineInjectionKey)
    if (!ZTimeline) {
      throwError(
        'timeline-item',
        '`z-timeline-item` must be placed inside `z-timeline`.'
      )
    }
    useHoudini()

    const mergedColor = computed(() => {
      if (
        ['neutral', 'success', 'error', 'warning', 'info'].includes(props.color)
      ) {
        return {
          type: props.color,
          color: ''
        }
      } else {
        return {
          type: 'neutral',
          color: props.color
        }
      }
    })
    const { inlineThemeDisabled } = useConfig()
    const cssVarsRef = computed(() => {
      const {
        props: { size, iconSize: iconSizeProp },
        mergedThemeRef
      } = ZTimeline
      const {
        self: {
          titleTextColor,
          contentTextColor,
          metaTextColor,
          lineColor,
          titleFontWeight,
          contentFontSize,
          [createKey('iconSize', size)]: iconSize,
          [createKey('titleMargin', size)]: titleMargin,
          [createKey('titleFontSize', size)]: titleFontSize,
          [createKey('circleBorder', mergedColor.value.type)]: circleBorder,
          [createKey('iconColor', mergedColor.value.type)]: iconColor
        },
        common: { cubicBezierEaseInOut }
      } = mergedThemeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-circle-border': circleBorder,
        '--z-icon-color': iconColor,
        '--z-content-font-size': contentFontSize,
        '--z-content-text-color': contentTextColor,
        '--z-line-color': lineColor,
        '--z-meta-text-color': metaTextColor,
        '--z-title-font-size': titleFontSize,
        '--z-title-font-weight': titleFontWeight,
        '--z-title-margin': titleMargin,
        '--z-title-text-color': titleTextColor,
        '--z-icon-size': formatLength(iconSizeProp) || iconSize
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'timeline-item',
        computed(() => {
          const {
            props: { size, iconSize: iconSizeProp }
          } = ZTimeline
          return `${size[0]}${iconSizeProp || 'a'}${
              mergedColor.value.type[0]
            }`
        }),
        cssVarsRef,
        ZTimeline.props
      )
      : undefined
    return {
      mergedColor,
      mergedClsPrefix: ZTimeline.mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix, mergedColor, onRender, $slots } = this
    const { color } = mergedColor
    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-timeline-item`,
          this.themeClass,
          `${mergedClsPrefix}-timeline-item--${this.mergedColor.type}-type`,
          `${mergedClsPrefix}-timeline-item--${this.lineType}-line-type`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-timeline-item-timeline`}>
          <div class={`${mergedClsPrefix}-timeline-item-timeline__line`} />
          {resolveWrappedSlot($slots.icon, (children) => {
            return children ? (
              <div
                class={`${mergedClsPrefix}-timeline-item-timeline__icon`}
                style={{ color }}
              >
                {children}
              </div>
            ) : (
              <div
                class={`${mergedClsPrefix}-timeline-item-timeline__circle`}
                style={{ borderColor: color }}
              />
            )
          })}
        </div>
        <div class={`${mergedClsPrefix}-timeline-item-content`}>
          {resolveWrappedSlot($slots.header, (children) => {
            const mergedChildren = children || this.title
            if (mergedChildren) {
              return (
                <ZTitle variant="5-m">
                  <div
                    class={`${mergedClsPrefix}-timeline-item-content__title`}
                  >
                    {children || this.title}
                  </div>
                </ZTitle>
              )
            }
            return null
          })}
          <ZText variant="3-r">
            <div class={`${mergedClsPrefix}-timeline-item-content__content`}>
              {resolveSlot($slots.default, () => [this.content])}
            </div>
          </ZText>
          <ZText variant="4-r" color="inherit">
            <div class={`${mergedClsPrefix}-timeline-item-content__meta`}>
              {resolveSlot($slots.footer, () => [this.time])}
            </div>
          </ZText>
        </div>
      </div>
    )
  }
})
