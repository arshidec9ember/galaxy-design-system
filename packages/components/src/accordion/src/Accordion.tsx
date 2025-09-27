import {
  computed,
  h,
  defineComponent,
  type PropType,
  provide,
  ref,
  type Ref,
  type ExtractPropTypes,
  type CSSProperties,
  type Slots
} from 'vue'
import { useMergedState } from '../../_external-dependencies/vooks'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, createInjectionKey, warn } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { accordionLight, type AccordionTheme } from '../styles'
import style from './styles/index.cssr'
import { useRtl } from '../../_mixins/use-rtl'
import type {
  OnItemHeaderClick,
  OnUpdateExpandedNames,
  OnUpdateExpandedNamesImpl,
  HeaderClickInfo,
  OnItemHeaderClickImpl
} from './interface'

export const accordionProps = {
  ...(useTheme.props as ThemeProps<AccordionTheme>),
  defaultExpandedNames: {
    type: [Array, String] as PropType<
    string | number | Array<string | number> | null
    >,
    default: null
  },
  expandedNames: [Array, String] as PropType<
  string | number | Array<string | number> | null
  >,
  arrowPlacement: {
    type: String as PropType<'start' | 'end'>,
    default: 'start'
  },
  multiple: {
    type: Boolean,
    default: true
  },
  bordered: {
    type: Boolean,
    default: true
  },
  displayDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'if'
  },
  onItemHeaderClick: [Function, Array] as PropType<
  MaybeArray<OnItemHeaderClick>
  >,
  'onUpdate:expandedNames': [Function, Array] as PropType<
  MaybeArray<OnUpdateExpandedNames>
  >,
  onUpdateExpandedNames: [Function, Array] as PropType<
  MaybeArray<OnUpdateExpandedNames>
  >,
  // deprecated
  onExpandedNamesChange: {
    type: [Function, Array] as PropType<
    MaybeArray<OnUpdateExpandedNames> | undefined
    >,
    validator: () => {
      if (__DEV__) {
        warn(
          'accordion',
          '`on-expanded-names-change` is deprecated, please use `on-update:expanded-names` instead.'
        )
      }
      return true
    },
    default: undefined
  }
} as const

export type AccordionProps = ExtractPublicPropTypes<typeof accordionProps>

export interface NAccordionInjection {
  props: ExtractPropTypes<typeof accordionProps>
  expandedNamesRef: Ref<string | number | Array<string | number> | null>
  mergedClsPrefixRef: Ref<string>
  slots: Slots
  toggleItem: (
    accordion: boolean,
    name: string | number,
    event: MouseEvent
  ) => void
}

export const accordionInjectionKey =
  createInjectionKey<NAccordionInjection>('z-accordion')

export default defineComponent({
  name: 'Accordion',
  props: accordionProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)
    const uncontrolledExpandedNamesRef = ref<
    string | number | Array<string | number> | null
    >(props.defaultExpandedNames)
    const controlledExpandedNamesRef = computed(() => props.expandedNames)
    const mergedExpandedNamesRef = useMergedState(
      controlledExpandedNamesRef,
      uncontrolledExpandedNamesRef
    )
    const themeRef = useTheme(
      'Accordion',
      '-accordion',
      style,
      accordionLight,
      props,
      mergedClsPrefixRef
    )
    function doUpdateExpandedNames (
      names: Array<string | number> | string | number
    ): void {
      const {
        'onUpdate:expandedNames': _onUpdateExpandedNames,
        onUpdateExpandedNames,
        onExpandedNamesChange
      } = props
      if (onUpdateExpandedNames) {
        call(onUpdateExpandedNames as OnUpdateExpandedNamesImpl, names)
      }
      if (_onUpdateExpandedNames) {
        call(_onUpdateExpandedNames as OnUpdateExpandedNamesImpl, names)
      }
      if (onExpandedNamesChange) {
        call(onExpandedNamesChange as OnUpdateExpandedNamesImpl, names)
      }
      uncontrolledExpandedNamesRef.value = names
    }
    function doItemHeaderClick<T extends string | number> (
      info: HeaderClickInfo<T>
    ): void {
      const { onItemHeaderClick } = props
      if (onItemHeaderClick) {
        call(onItemHeaderClick as OnItemHeaderClickImpl, info)
      }
    }
    function toggleItem (
      accordion: boolean,
      name: string | number,
      event: MouseEvent
    ): void {
      const { multiple } = props
      const { value: expandedNames } = mergedExpandedNamesRef
      if (!multiple) {
        if (accordion) {
          doUpdateExpandedNames([name])
          doItemHeaderClick({ name, expanded: true, event })
        } else {
          doUpdateExpandedNames([])
          doItemHeaderClick({ name, expanded: false, event })
        }
      } else {
        if (!Array.isArray(expandedNames)) {
          doUpdateExpandedNames([name])
          doItemHeaderClick({ name, expanded: true, event })
        } else {
          const activeNames = expandedNames.slice()
          const index = activeNames.findIndex(
            (activeName) => name === activeName
          )
          if (~index) {
            activeNames.splice(index, 1)
            doUpdateExpandedNames(activeNames)
            doItemHeaderClick({ name, expanded: false, event })
          } else {
            activeNames.push(name)
            doUpdateExpandedNames(activeNames)
            doItemHeaderClick({ name, expanded: true, event })
          }
        }
      }
    }
    provide(accordionInjectionKey, {
      props,
      mergedClsPrefixRef,
      expandedNamesRef: mergedExpandedNamesRef,
      slots,
      toggleItem
    })
    const rtlEnabledRef = useRtl('Accordion', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          titleFontWeight,
          activeTitleFontWeight,
          dividerColor,
          textColor,
          arrowColor,
          titleFontSize,
          fontSize,
          itemMargin,
          contentMargin,
          contentColor,
          boxedPadding,
          boxedContentPadding,
          padding,
          contentPadding,
          borderRadius,
          boxedBgColor,
          arrowBgColor,
          arrowActiveColor,
          hoverColor,
          activeColor,
          disabledOpacity
        }
      } = themeRef.value
      return {
        '--z-font-size': fontSize,
        '--z-title-font-size': titleFontSize,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-text-color': textColor,
        '--z-divider-color': dividerColor,
        '--z-title-font-weight': titleFontWeight,
        '--z-active-title-font-weight': activeTitleFontWeight,
        '--z-arrow-color': arrowColor,
        '--z-item-margin': itemMargin,
        '--z-content-margin': contentMargin,
        '--z-content-color': contentColor,
        '--z-boxed-padding': boxedPadding,
        '--z-boxed-content-padding': boxedContentPadding,
        '--z-padding': padding,
        '--z-content-padding': contentPadding,
        '--z-border-radius': borderRadius,
        '--z-boxed-bg-color': boxedBgColor,
        '--z-arrow-bg-color': arrowBgColor,
        '--z-arrow-active-color': arrowActiveColor,
        '--z-hover-color': hoverColor,
        '--z-active-color': activeColor,
        '--z-disabled-opacity': disabledOpacity
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('accordion', undefined, cssVarsRef, props)
      : undefined
    return {
      rtlEnabled: rtlEnabledRef,
      mergedTheme: themeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    this.onRender?.()
    return (
      <div
        class={[
          `${this.mergedClsPrefix}-accordion`,
          this.rtlEnabled && `${this.mergedClsPrefix}-accordion--rtl`,
          this.bordered && `${this.mergedClsPrefix}-accordion--bordered`,
          this.themeClass
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </div>
    )
  }
})
