import {
  computed,
  defineComponent,
  type CSSProperties,
  type PropType,
  h,
  ref,
  toRef,
  onMounted,
  provide
} from 'vue'
import type { ThemeProps } from '../../_mixins'
import { useConfig, useTheme } from '../../_mixins'
import { useRtl } from '../../_mixins/use-rtl'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { DetailsViewTheme } from '../styles'
import { detailsViewLight } from '../styles'
import type {
  DetailsViewOptions,
  OverridesOptions,
  RenderLabel,
  RenderNode,
  RenderValue
} from './interface'
import style from './styles/index.cssr'
import ArrayRenderer from './components/renderers/ArrayRenderer'
import ObjectRenderer from './components/renderers/ObjectRenderer'
import { detailsViewInjectionKey } from './context'
import { ChevronDownIcon, ChevronRightIcon } from '../../_internal/icons'
import { ZBaseIcon } from '../../_internal'

export const DetailsViewBaseProps = {
  data: {
    type: Object as PropType<any>,
    default: () => {}
  },
  renderLabel: Function as PropType<RenderLabel>,
  renderPrefixLabel: Function as PropType<RenderLabel>,
  renderSuffixLabel: Function as PropType<RenderLabel>,
  renderValue: Function as PropType<RenderValue>,
  renderPrefixValue: Function as PropType<RenderValue>,
  renderSuffixValue: Function as PropType<RenderValue>,
  renderNode: Function as PropType<RenderNode>,
  renderPrefixNode: Function as PropType<RenderNode>,
  renderSuffixNode: Function as PropType<RenderNode>,
  labelClass: String,
  labelStyles: Object as PropType<Record<string, string>>,
  valueClass: String,
  valueStyles: Object as PropType<Record<string, string>>,
  nodeClass: String,
  nodeStyles: Object as PropType<Record<string, string>>,
  divider: Boolean,
  height: {
    type: Number
  },
  overrides: {
    type: Object as PropType<OverridesOptions>
  },
  options: {
    type: Object as PropType<Partial<DetailsViewOptions>>
  }
} as const

export const detailsViewProps = {
  ...(useTheme.props as ThemeProps<DetailsViewTheme>),
  ...DetailsViewBaseProps
}

export type DetailsViewProps = ExtractPublicPropTypes<typeof detailsViewProps>

export default defineComponent({
  name: 'DetailsView',
  props: detailsViewProps,
  setup (props) {
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props)
    const hideData = ref(false)
    const themeRef = useTheme(
      'DetailsView',
      '-details-view',
      style,
      detailsViewLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl(
      'DetailsView',
      mergedRtlRef,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        self: {
          borderRadius,
          dividerColor,
          detailsViewLabelColor,
          detailsViewValueColor,
          detailsViewRowMinHeight,
          detailsViewRowPaddingY,
          expandedBackgroundColor,
          color
        }
      } = themeRef.value
      return {
        // '--z-font-size': fontSize,
        '--z-line-height': '1.5',
        '--z-border-radius': borderRadius,
        '--z-color': color,
        '--z-text-color': detailsViewValueColor,
        '--z-divider-color': dividerColor,
        '--z-bezier': 'cubic-bezier(0.42, 0, 0.58, 1)',
        '--z-details-view-row-min-height': detailsViewRowMinHeight,
        '--z-details-view-row-padding-y': detailsViewRowPaddingY,
        '--z-details-view-label-color': detailsViewLabelColor,
        '--z-details-view-value-color': detailsViewValueColor,
        '--z-details-view-expanded-background-color': expandedBackgroundColor
      }
    })

    const currentHeight = ref(0)
    const detailsViewRef = ref(null)

    const contentHeight = (): void => {
      // TODO: this is the temporary solution. we need to fix this in the future
      const timerId = setTimeout(() => {
        if (detailsViewRef.value) {
          const viewDetailsContainer = detailsViewRef.value as HTMLElement
          currentHeight.value =
            viewDetailsContainer.getBoundingClientRect().height
          clearTimeout(timerId)
          return
        }
        currentHeight.value = 0
        clearTimeout(timerId)
      }, 200)
    }

    onMounted(() => {
      contentHeight()
    })

    provide(detailsViewInjectionKey, {
      renderValueRef: toRef(props, 'renderValue'),
      renderLabelRef: toRef(props, 'renderLabel'),
      renderNodeRef: toRef(props, 'renderNode'),
      renderPrefixLabelRef: toRef(props, 'renderPrefixLabel'),
      renderSuffixLabelRef: toRef(props, 'renderSuffixLabel'),
      renderPrefixValueRef: toRef(props, 'renderSuffixValue'),
      renderSuffixValueRef: toRef(props, 'renderSuffixValue'),
      renderPrefixNodeRef: toRef(props, 'renderSuffixNode'),
      renderSuffixNodeRef: toRef(props, 'renderSuffixNode'),
      labelClassRef: toRef(props, 'labelClass'),
      labelStylesRef: toRef(props, 'labelStyles'),
      valueClassRef: toRef(props, 'valueClass'),
      valueStylesRef: toRef(props, 'valueStyles'),
      nodeClassRef: toRef(props, 'nodeClass'),
      nodeStylesRef: toRef(props, 'nodeStyles'),
      overridesRef: toRef(props, 'overrides'),
      dividerRef: toRef(props, 'divider'),
      options: toRef(props, 'options'),
      contentHeight
    })

    const showOption = (): boolean => {
      if (props.height) {
        return currentHeight.value > props.height
      }
      return false
    }

    const toggleOption = (): void => {
      hideData.value = !hideData.value
    }

    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      cssVars: cssVarsRef,
      data: props.data,
      detailsViewRef,
      hideData,
      showOption,
      toggleOption,
      currentHeight,
      contentHeight
    }
  },
  render () {
    const { mergedClsPrefix, data } = this
    const { header: headerSlot } = this.$slots

    const optionButton = this.showOption() ? (
      <div
        onClick={this.toggleOption}
        class={`${mergedClsPrefix}-details-view__expanded-option`}
      >
        {{
          default: () => [
            this.hideData ? (
              <div
                class={`${mergedClsPrefix}-details-view__expanded-option-show`}
              >
                Show More
                <ZBaseIcon clsPrefix={this.mergedClsPrefix}>
                  {{
                    default: () => <ChevronDownIcon />
                  }}
                </ZBaseIcon>
              </div>
            ) : (
              <div
                class={`${mergedClsPrefix}-details-view__expanded-option-hide`}
              >
                Show Less
                <ZBaseIcon clsPrefix={this.mergedClsPrefix}>
                  {{
                    default: () => <ChevronRightIcon />
                  }}
                </ZBaseIcon>
              </div>
            )
          ]
        }}
      </div>
    ) : null

    return (
      <div
        class={[`${mergedClsPrefix}-details-view`]}
        style={this.cssVars as CSSProperties}
      >
        {headerSlot && (
          <div class={`${mergedClsPrefix}-details-view__header`}>
            {headerSlot?.()}
          </div>
        )}
        <div
          ref="detailsViewRef"
          class={`${mergedClsPrefix}-details-view__container`}
          style={{
            maxHeight:
              this.hideData && this.height ? `${this.height}px` : '100%'
          }}
        >
          {Array.isArray(data) ? (
            <ArrayRenderer data={data} path="$"></ArrayRenderer>
          ) : (
            <ObjectRenderer data={data} path="$"></ObjectRenderer>
          )}
        </div>
        {optionButton}
      </div>
    )
  }
})
