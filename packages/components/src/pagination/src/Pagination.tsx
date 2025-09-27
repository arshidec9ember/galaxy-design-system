import {
  computed,
  type CSSProperties,
  defineComponent,
  Fragment,
  h,
  nextTick,
  type PropType,
  ref,
  watchEffect
} from 'vue'
import { useMergedState } from '../../_external-dependencies/vooks'
import { ZSelect } from '../../select'
import type { SelectProps } from '../../select'
import { ZBaseIcon } from '../../_internal'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FirstPageIcon,
  LastPageIcon
} from '../../_internal/icons'
import type { ThemeProps } from '../../_mixins'
import {
  useConfig,
  useLocale,
  useProxyModel,
  useTheme,
  useThemeClass
} from '../../_mixins'
import type { PaginationTheme } from '../styles'
import { paginationLight } from '../styles'
import type { PageItem } from './utils'
import { createPageItemsInfo } from './utils'
import style from './styles/index.cssr'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { debounce, isNil } from 'lodash-es'
import {
  useAdjustedTo,
  call,
  warn,
  warnOnce,
  createKey,
  smallerSize
} from '../../_utils'
import type { Size as InputSize } from '../../input/src/interface'
import type { Size as SelectSize } from '../../select/src/interface'
import type {
  PaginationRenderLabel,
  PaginationSizeOption,
  RenderGoto,
  RenderNext,
  RenderPrefix,
  RenderPrev,
  RenderSuffix,
  Size
} from './interface'
import { useRtl } from '../../_mixins/use-rtl'
import { ZButton } from '../../button'
import Suffix from '../../_internal/suffix'
import { type PopselectProps, ZPopselect } from '../../popselect'
import { type PopselectSize } from '../../popselect/src/interface'
import { ZInput } from '../../input'
import { DEFAULT_PAGE_COUNT, PAGE_JUMPER_INPUT } from './constants'
import { ZP } from '../../typography'

export const paginationProps = {
  ...(useTheme.props as ThemeProps<PaginationTheme>),
  page: Number,
  defaultPage: {
    type: Number,
    default: 1
  },
  itemCount: Number,
  hasNext: Boolean,
  pageCount: Number,
  defaultPageCount: {
    type: Number,
    default: 1
  },
  showSizePicker: Boolean,
  pageSize: Number,
  defaultPageSize: Number,
  pageSizes: {
    type: Array as PropType<Array<number | PaginationSizeOption>>,
    default () {
      return [10]
    }
  },
  showQuickJumper: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<Size>,
    default: 'medium'
  },
  disabled: Boolean,
  pageSlot: {
    type: Number,
    default: 9
  },
  showShadow: {
    type: Boolean,
    default: false
  },
  selectProps: Object as PropType<SelectProps>,
  popSelectProps: Object as PropType<PopselectProps>,
  prev: Function as PropType<RenderPrev>,
  next: Function as PropType<RenderNext>,
  goto: Function as PropType<RenderGoto>,
  prefix: Function as PropType<RenderPrefix>,
  suffix: Function as PropType<RenderSuffix>,
  label: Function as PropType<PaginationRenderLabel>,
  displayOrder: {
    type: Array as PropType<Array<'pages' | 'size-picker' | 'quick-jumper'>>,
    default: ['pages', 'size-picker', 'quick-jumper']
  },
  to: useAdjustedTo.propTo,
  'onUpdate:page': [Function, Array] as PropType<
  MaybeArray<(page: number) => void>
  >,
  onUpdatePage: [Function, Array] as PropType<
  MaybeArray<(page: number) => void>
  >,
  'onUpdate:pageSize': [Function, Array] as PropType<
  MaybeArray<(pageSize: number) => void>
  >,
  onUpdatePageSize: [Function, Array] as PropType<
  MaybeArray<(pageSize: number) => void>
  >,
  /** @deprecated */
  onPageSizeChange: [Function, Array] as PropType<
  MaybeArray<(pageSize: number) => void>
  >,
  /** @deprecated */
  onChange: [Function, Array] as PropType<MaybeArray<(page: number) => void>>
} as const

export type PaginationProps = ExtractPublicPropTypes<typeof paginationProps>

export default defineComponent({
  name: 'Pagination',
  props: paginationProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.pageCount !== undefined && props.itemCount !== undefined) {
          warn(
            'pagination',
            "`page-count` and `item-count` should't be specified together. Only `item-count` will take effect."
          )
        }
        if (props.onPageSizeChange) {
          warnOnce(
            'pagination',
            '`on-page-size-change` is deprecated, please use `on-update:page-size` instead.'
          )
        }
        if (props.onChange) {
          warnOnce(
            'pagination',
            '`on-change` is deprecated, please use `on-update:page` instead.'
          )
        }
      })
    }
    const {
      mergedComponentPropsRef,
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props)
    const themeRef = useTheme(
      'Pagination',
      '-pagination',
      style,
      paginationLight,
      props,
      mergedClsPrefixRef
    )
    const simple = ref(true)
    const { localeRef } = useLocale('Pagination')
    const selfRef = ref<HTMLElement | null>(null)
    const controlledPageRef = useProxyModel(props, 'page')
    const uncontrolledPageRef = ref(props.defaultPage)
    const calculatedPageCount = ref(DEFAULT_PAGE_COUNT)
    const getDefaultPageSize = (): number => {
      const { defaultPageSize } = props
      if (defaultPageSize !== undefined) return defaultPageSize
      const pageSizeOption = props.pageSizes[0]
      if (typeof pageSizeOption === 'number') return pageSizeOption
      return pageSizeOption.value || 10
    }

    const controlledPageSizeRef = useProxyModel(props, 'pageSize')
    const uncontrolledPageSizeRef = ref(getDefaultPageSize())
    const mergedPageRef = useMergedState(controlledPageRef, uncontrolledPageRef)
    const mergedPageSizeRef = useMergedState(
      controlledPageSizeRef,
      uncontrolledPageSizeRef
    )
    const mergedPageCountRef = computed(() => {
      // item count has high priority, for it can affect prefix slot rendering
      const { itemCount } = props
      if (itemCount !== undefined) {
        return Math.max(1, Math.ceil(itemCount / mergedPageSizeRef.value))
      }
      const { pageCount } = props
      if (pageCount !== undefined) return Math.max(pageCount, 1)
      return calculatedPageCount.value
    })
    const jumperValueRef = ref('')
    watchEffect(() => {
      void simple.value
      jumperValueRef.value = String(mergedPageRef.value)
    })

    const fastForwardActiveRef = ref(false)
    const fastBackwardActiveRef = ref(false)
    const showFastForwardMenuRef = ref(false)
    const showFastBackwardMenuRef = ref(false)

    const handleFastForwardMouseenter = (): void => {
      if (props.disabled) return
      fastForwardActiveRef.value = true
      disableTransitionOneTick()
    }
    const handleFastForwardMouseleave = (): void => {
      if (props.disabled) return
      fastForwardActiveRef.value = false
      disableTransitionOneTick()
    }
    const handleFastBackwardMouseenter = (): void => {
      fastBackwardActiveRef.value = true
      disableTransitionOneTick()
    }
    const handleFastBackwardMouseleave = (): void => {
      fastBackwardActiveRef.value = false
      disableTransitionOneTick()
    }
    const handleMenuSelect = (value: number): void => {
      doUpdatePage(value)
    }

    const pageItemsInfo = computed(() =>
      createPageItemsInfo(
        mergedPageRef.value,
        mergedPageCountRef.value,
        props.pageSlot
      )
    )

    watchEffect(() => {
      if (!pageItemsInfo.value.hasFastBackward) {
        fastBackwardActiveRef.value = false
        showFastBackwardMenuRef.value = false
      } else if (!pageItemsInfo.value.hasFastForward) {
        fastForwardActiveRef.value = false
        showFastForwardMenuRef.value = false
      }
    })

    const pageSizeOptionsRef = computed(() => {
      const suffix = localeRef.value.selectionSuffix
      const per = localeRef.value.per
      return props.pageSizes.map((size) => {
        if (typeof size === 'number') {
          return {
            label: `${size} ${per} ${suffix}`,
            value: size
          }
        } else {
          return size
        }
      })
    })
    const pageSizeWidthRef = computed(() => {
      return (
        pageSizeOptionsRef.value.reduce((acc, curr) => {
          return Math.max(acc, curr?.label?.length || 0)
        }, 0) + 3
      )
    })
    const inputSizeRef = computed<InputSize>(() => {
      return (
        mergedComponentPropsRef?.value?.Pagination?.inputSize ||
        smallerSize(props.size)
      )
    })
    const selectSizeRef = computed<SelectSize>(() => {
      return (
        mergedComponentPropsRef?.value?.Pagination?.selectSize ||
        smallerSize(props.size)
      )
    })
    const popSelectSizeRef = computed<PopselectSize>(() => {
      return (
        mergedComponentPropsRef?.value?.Pagination?.popSelectSize || props.size
      )
    })

    const startIndexRef = computed(() => {
      return (mergedPageRef.value - 1) * mergedPageSizeRef.value
    })
    const endIndexRef = computed(() => {
      const endIndex = mergedPageRef.value * mergedPageSizeRef.value - 1
      const { itemCount } = props
      if (itemCount !== undefined) {
        return endIndex > itemCount - 1 ? itemCount - 1 : endIndex
      }
      return endIndex
    })
    const mergedItemCountRef = computed(() => {
      const { itemCount } = props
      return itemCount
    })
    const rtlEnabledRef = useRtl('Pagination', mergedRtlRef, mergedClsPrefixRef)

    const disableTransitionOneTick = (): void => {
      void nextTick(() => {
        const { value: selfEl } = selfRef
        if (!selfEl) return
        selfEl.classList.add('transition-disabled')
        void selfRef.value?.offsetWidth
        selfEl.classList.remove('transition-disabled')
      })
    }
    function doUpdatePage (page: number): void {
      if (page === mergedPageRef.value) return
      const { onChange } = props
      controlledPageRef.value = page
      // deprecated
      if (onChange) call(onChange, page)
      uncontrolledPageRef.value = page
      jumperValueRef.value = String(page)
    }
    function doUpdatePageSize (pageSize: number): void {
      if (pageSize === mergedPageSizeRef.value) return
      const { onPageSizeChange } = props
      controlledPageSizeRef.value = pageSize
      // deprecated
      if (onPageSizeChange) call(onPageSizeChange, pageSize)
      uncontrolledPageSizeRef.value = pageSize
      // update new page when overflows.
      // we may have different update strategy, but i've no time to impl it
      if (mergedPageCountRef.value < mergedPageRef.value) {
        doUpdatePage(mergedPageCountRef.value)
      }
    }
    function forward (): void {
      if (props.disabled) return
      let page = mergedPageRef.value + 1
      /**
       * if total is not known then we also need to update the page count
       */
      if (!mergedItemCountRef.value) {
        calculatedPageCount.value = mergedPageCountRef.value + 1
      } else {
        page = Math.min(mergedPageRef.value + 1, mergedPageCountRef.value)
      }
      doUpdatePage(page)
    }
    function goLast (): void {
      if (props.disabled) return
      const page = mergedPageCountRef.value
      doUpdatePage(page)
    }
    function goFirst (): void {
      if (props.disabled) return
      const page = 1
      doUpdatePage(page)
    }
    function backward (): void {
      if (props.disabled) return
      const page = Math.max(mergedPageRef.value - 1, 1)
      doUpdatePage(page)
    }
    function fastForward (): void {
      if (props.disabled) return
      const page = Math.min(
        pageItemsInfo.value.fastForwardTo,
        mergedPageCountRef.value
      )
      doUpdatePage(page)
    }
    function fastBackward (): void {
      if (props.disabled) return
      const page = Math.max(pageItemsInfo.value.fastBackwardTo, 1)
      doUpdatePage(page)
    }
    function handleSizePickerChange (value: number): void {
      doUpdatePageSize(value)
    }
    function doQuickJump (): void {
      const page = parseInt(jumperValueRef.value)
      if (Number.isNaN(page)) return
      if (mergedItemCountRef.value) {
        doUpdatePage(Math.max(1, Math.min(page, mergedPageCountRef.value)))
      } else {
        // If the item count is not present, we always set the page to the page supplied or 1 ( to avoid negative value)
        doUpdatePage(Math.max(1, page))
      }
    }
    const doQuickJumpDebounced = debounce(doQuickJump, PAGE_JUMPER_INPUT)
    function handleQuickJumperChange (
      value: number | (string & [string, string])
    ): void {
      jumperValueRef.value = value.toString().replace(/\D+/g, '')
      // If itemcount is not defined, which means we taking page number as input instead of dropdown, so we will debounce the input
      if (mergedItemCountRef.value) {
        doQuickJump()
      } else {
        /**
         * Update the page count to the number supplied as input
         * This is to assume that we have a page count equal to the value and we can enable the prev or go to first button
         */
        calculatedPageCount.value = Number(value)
        doQuickJumpDebounced()
      }
    }
    function handlePageItemClick (pageItem: PageItem): void {
      if (props.disabled) return
      switch (pageItem.type) {
        case 'page':
          doUpdatePage(pageItem.label)
          break
        case 'fast-backward':
          fastBackward()
          break
        case 'fast-forward':
          fastForward()
          break
      }
    }
    function handleJumperInput (value: number | (string & string[])): void {
      jumperValueRef.value = value.toString().replace(/\D+/g, '')
    }
    watchEffect(() => {
      void mergedPageRef.value
      void mergedPageSizeRef.value
      disableTransitionOneTick()
    })
    const cssVarsRef = computed(() => {
      const { size } = props
      const {
        self: {
          buttonBorder,
          buttonBorderHover,
          buttonBorderPressed,
          buttonIconColor,
          buttonIconColorHover,
          buttonIconColorPressed,
          itemTextColor,
          itemTextColorHover,
          itemTextColorPressed,
          itemTextColorActive,
          itemTextColorDisabled,
          itemColor,
          itemColorHover,
          itemColorPressed,
          itemColorActive,
          itemColorActiveHover,
          itemColorDisabled,
          itemBorder,
          itemBorderHover,
          itemBorderPressed,
          itemBorderActive,
          itemBorderDisabled,
          itemBorderRadius,
          jumperTextColor,
          jumperTextColorDisabled,
          buttonColor,
          buttonColorHover,
          buttonColorPressed,
          clearSize,
          arrowColor,
          clearColor,
          clearColorHover,
          clearColorPressed,
          arrowSize,
          shadowBoxShadow,
          shadowPadding,
          [createKey('itemPadding', size)]: itemPadding,
          [createKey('itemMargin', size)]: itemMargin,
          [createKey('inputWidth', size)]: inputWidth,
          [createKey('selectWidth', size)]: selectWidth,
          [createKey('inputMargin', size)]: inputMargin,
          [createKey('selectMargin', size)]: selectMargin,
          [createKey('jumperFontSize', size)]: jumperFontSize,
          [createKey('prefixMargin', size)]: prefixMargin,
          [createKey('suffixMargin', size)]: suffixMargin,
          [createKey('itemSize', size)]: itemSize,
          [createKey('buttonIconSize', size)]: buttonIconSize,
          [createKey('itemFontSize', size)]: itemFontSize,
          [`${createKey('itemMargin', size)}Rtl` as const]: itemMarginRtl,
          [`${createKey('inputMargin', size)}Rtl` as const]: inputMarginRtl
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--z-prefix-margin': prefixMargin,
        '--z-suffix-margin': suffixMargin,
        '--z-item-font-size': itemFontSize,
        '--z-select-width': selectWidth,
        '--z-select-margin': selectMargin,
        '--z-input-width': inputWidth,
        '--z-input-margin': inputMargin,
        '--z-input-margin-rtl': inputMarginRtl,
        '--z-item-size': itemSize,
        '--z-item-text-color': itemTextColor,
        '--z-item-text-color-disabled': itemTextColorDisabled,
        '--z-item-text-color-hover': itemTextColorHover,
        '--z-item-text-color-active': itemTextColorActive,
        '--z-item-text-color-pressed': itemTextColorPressed,
        '--z-item-color': itemColor,
        '--z-item-color-hover': itemColorHover,
        '--z-item-color-disabled': itemColorDisabled,
        '--z-item-color-active': itemColorActive,
        '--z-item-color-active-hover': itemColorActiveHover,
        '--z-item-color-pressed': itemColorPressed,
        '--z-item-border': itemBorder,
        '--z-item-border-hover': itemBorderHover,
        '--z-item-border-disabled': itemBorderDisabled,
        '--z-item-border-active': itemBorderActive,
        '--z-item-border-pressed': itemBorderPressed,
        '--z-item-padding': itemPadding,
        '--z-item-border-radius': itemBorderRadius,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-jumper-font-size': jumperFontSize,
        '--z-jumper-text-color': jumperTextColor,
        '--z-jumper-text-color-disabled': jumperTextColorDisabled,
        '--z-item-margin': itemMargin,
        '--z-item-margin-rtl': itemMarginRtl,
        '--z-button-icon-size': buttonIconSize,
        '--z-button-icon-color': buttonIconColor,
        '--z-button-icon-color-hover': buttonIconColorHover,
        '--z-button-icon-color-pressed': buttonIconColorPressed,
        '--z-button-color-hover': buttonColorHover,
        '--z-button-color': buttonColor,
        '--z-button-color-pressed': buttonColorPressed,
        '--z-button-border': buttonBorder,
        '--z-button-border-hover': buttonBorderHover,
        '--z-button-border-pressed': buttonBorderPressed,
        // clear
        '--z-clear-size': clearSize,
        '--z-clear-color': clearColor,
        '--z-clear-color-hover': clearColorHover,
        '--z-clear-color-pressed': clearColorPressed,
        // arrow-size
        '--z-arrow-size': arrowSize,
        '--z-arrow-color': arrowColor,
        // shadow mode variables
        '--z-shadow-box-shadow': shadowBoxShadow,
        '--z-shadow-padding': shadowPadding
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'pagination',
        computed(() => {
          let hash = ''
          const { size } = props
          hash += size[0]
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined

    const prevButtonDisabledRef = computed(() => {
      if (mergedItemCountRef.value || !isNil(props.pageCount)) {
        return (
          mergedPageRef.value <= 1 ||
          mergedPageRef.value > mergedPageCountRef.value ||
          props.disabled
        )
      }
      // if we dont have page count or item count then just see if we are on other pages
      return mergedPageRef.value <= 1 || props.disabled
    })
    const nextButtonDisabledRef = computed(() => {
      // If we dont have a total count or page count we will rely on the has Next prop to figure this out
      if (mergedItemCountRef.value || !isNil(props.pageCount)) {
        return (
          mergedPageRef.value < 1 ||
          mergedPageRef.value >= mergedPageCountRef.value ||
          props.disabled
        )
      }
      return !props.hasNext || props.disabled
    })
    const lastButtonDisabledRef = computed(() => {
      /**
       * If we dont have a total count we will set it disabled state
       * as we won't know the page we have to jump to
       */
      if (mergedItemCountRef.value || !isNil(props.pageCount)) {
        return (
          mergedPageRef.value < 1 ||
          mergedPageRef.value >= mergedPageCountRef.value ||
          props.disabled
        )
      }
      return props.disabled
    })
    const onlyAllowNumberRef = computed(() => {
      return !jumperValueRef.value || /^\d+$/.test(jumperValueRef.value)
    })

    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      locale: localeRef,
      selfRef,
      mergedPage: mergedPageRef,
      pageItems: computed(() => {
        return pageItemsInfo.value.items
      }),
      prevButtonDisabled: prevButtonDisabledRef,
      nextButtonDisabled: nextButtonDisabledRef,
      lastButtonDisabled: lastButtonDisabledRef,
      mergedItemCount: mergedItemCountRef,
      jumperValue: jumperValueRef,
      pageSizeWidth: pageSizeWidthRef,
      pageSizeOptions: pageSizeOptionsRef,
      mergedPageSize: mergedPageSizeRef,
      inputSize: inputSizeRef,
      selectSize: selectSizeRef,
      popSelectSize: popSelectSizeRef,
      mergedTheme: themeRef,
      mergedPageCount: mergedPageCountRef,
      startIndex: startIndexRef,
      endIndex: endIndexRef,
      showFastForwardMenu: showFastForwardMenuRef,
      showFastBackwardMenu: showFastBackwardMenuRef,
      fastForwardActive: fastForwardActiveRef,
      fastBackwardActive: fastBackwardActiveRef,
      handleMenuSelect,
      handleFastForwardMouseenter,
      handleFastForwardMouseleave,
      handleFastBackwardMouseenter,
      handleFastBackwardMouseleave,
      handleJumperInput,
      handleBackwardClick: backward,
      handleForwardClick: forward,
      handleGoLastClick: goLast,
      handleGoFirstClick: goFirst,
      handlePageItemClick,
      handleSizePickerChange,
      handleQuickJumperChange,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      onlyAllowNumber: onlyAllowNumberRef,
      showQuickJumper: props.showQuickJumper,
      pageCount: props.pageCount,
      showShadow: props.showShadow
    }
  },
  render () {
    const {
      $slots,
      mergedClsPrefix,
      disabled,
      cssVars,
      mergedPage,
      mergedPageCount,
      showSizePicker,
      mergedTheme,
      selectSize,
      locale,
      mergedPageSize,
      pageSizeOptions,
      pageSizeWidth,
      jumperValue,
      showQuickJumper,
      prev,
      pageCount,
      next,
      prefix,
      suffix,
      prevButtonDisabled,
      nextButtonDisabled,
      lastButtonDisabled,
      handleSizePickerChange,
      handleBackwardClick,
      handleForwardClick,
      handleGoLastClick,
      handleGoFirstClick,
      handleQuickJumperChange,
      onRender,
      showShadow
    } = this
    onRender?.()
    const renderPrefix = ($slots.prefix as RenderPrefix | undefined) || prefix
    const renderSuffix = ($slots.suffix as RenderSuffix | undefined) || suffix
    const renderPrev = prev || $slots.prev
    const renderNext = next || $slots.next
    return (
      <div
        ref="selfRef"
        class={[
          `${mergedClsPrefix}-pagination`,
          this.themeClass,
          this.rtlEnabled && `${mergedClsPrefix}-pagination--rtl`,
          disabled && `${mergedClsPrefix}-pagination--disabled`,
          showShadow && `${mergedClsPrefix}-pagination--shadow`,
          `${mergedClsPrefix}-pagination--simple`
        ]}
        style={cssVars as CSSProperties}
      >
        {showSizePicker ? (
          <div class={`${mergedClsPrefix}-pagination-size-picker`}>
            <ZPopselect
              {...this.popSelectProps}
              class={`${mergedClsPrefix}-pagination-size-picker__select`}
              style={{ width: `${pageSizeWidth}ch` }}
              showCheckmark={false}
              to={this.to}
              size={this.popSelectSize}
              options={pageSizeOptions}
              modelValue={mergedPageSize}
              disabled={disabled}
              theme={mergedTheme.peers.Popselect}
              themeOverrides={mergedTheme.peerOverrides.Popselect}
              onUpdateModelValue={handleSizePickerChange}
            >
              {{
                default: ({ option, value }: any) => {
                  return (
                    <ZButton
                      variant="text"
                      size={this.popSelectSize}
                      disabled={disabled}
                      class={`${mergedClsPrefix}-pagination-size-picker__button`}
                    >
                      {{
                        default: () => (
                          <div
                            class={`${mergedClsPrefix}-pagination-size-picker__button-content`}
                          >
                            <span>{option?.label || value} </span>
                            <Suffix
                              class={`${mergedClsPrefix}-pagination-size-picker__button-suffix`}
                              clsPrefix={`${mergedClsPrefix}-pagination-size-picker`}
                              showArrow={true}
                            />
                          </div>
                        )
                      }}
                    </ZButton>
                  )
                }
              }}
            </ZPopselect>
          </div>
        ) : null}
        <div class={`${mergedClsPrefix}-pagination-right-section`}>
          {renderPrefix && (
            <ZP variant="2-r" class={`${mergedClsPrefix}-pagination-prefix`}>
              {renderPrefix({
                page: mergedPage,
                pageSize: mergedPageSize,
                pageCount: mergedPageCount,
                startIndex: this.startIndex,
                endIndex: this.endIndex,
                itemCount: this.mergedItemCount
              })}
            </ZP>
          )}
          {this.displayOrder.map((part) => {
            switch (part) {
              case 'pages':
                return (
                  <Fragment>
                    <ZButton
                      variant="text"
                      disabled={prevButtonDisabled}
                      class={[
                        `${mergedClsPrefix}-pagination-item`,
                        {
                          [`${mergedClsPrefix}-pagination-item--disabled`]:
                            prevButtonDisabled,
                          [`${mergedClsPrefix}-pagination-item--button`]:
                            !renderPrev
                        }
                      ]}
                      onClick={handleGoFirstClick}
                    >
                      {{
                        default: () => (
                          <ZBaseIcon clsPrefix={mergedClsPrefix}>
                            {{ default: () => <FirstPageIcon /> }}
                          </ZBaseIcon>
                        )
                      }}
                    </ZButton>
                    <ZButton
                      variant="text"
                      disabled={prevButtonDisabled}
                      class={[
                        `${mergedClsPrefix}-pagination-item`,
                        {
                          [`${mergedClsPrefix}-pagination-item--disabled`]:
                            prevButtonDisabled,
                          [`${mergedClsPrefix}-pagination-item--button`]:
                            !renderPrev
                        }
                      ]}
                      onClick={handleBackwardClick}
                    >
                      {{
                        default: () => (
                          <Fragment>
                            {renderPrev ? (
                              renderPrev({
                                page: mergedPage,
                                pageSize: mergedPageSize,
                                pageCount: mergedPageCount,
                                startIndex: this.startIndex,
                                endIndex: this.endIndex,
                                itemCount: this.mergedItemCount
                              })
                            ) : (
                              <ZBaseIcon clsPrefix={mergedClsPrefix}>
                                {{
                                  default: () =>
                                    this.rtlEnabled ? (
                                      <ChevronRightIcon />
                                    ) : (
                                      <ChevronLeftIcon />
                                    )
                                }}
                              </ZBaseIcon>
                            )}
                          </Fragment>
                        )
                      }}
                    </ZButton>
                    {showQuickJumper && (
                      <Fragment>
                        {!isNil(pageCount) || this.mergedItemCount ? (
                          <Fragment>
                            <ZP
                              variant="2-r"
                              class={`${mergedClsPrefix}-pagination-quick-jumper-label`}
                            >
                              {locale.pageLabel}
                            </ZP>
                            <div
                              class={`${mergedClsPrefix}-pagination-quick-jumper`}
                            >
                              <ZSelect
                                {...this.selectProps}
                                class={`${mergedClsPrefix}-pagination-quick-jumper__select`}
                                filterable
                                consistentMenuWidth={false}
                                style={{
                                  width: `${
                                    String(mergedPageCount).length + 6
                                  }ch`
                                }}
                                placeholder=""
                                showCheckmark={false}
                                to={this.to}
                                size={selectSize}
                                options={Array.from(
                                  { length: mergedPageCount },
                                  (_: any, i: number) => ({
                                    value: String(i + 1),
                                    label: String(i + 1)
                                  })
                                )}
                                modelValue={jumperValue}
                                disabled={disabled}
                                theme={mergedTheme.peers.Select}
                                themeOverrides={
                                  mergedTheme.peerOverrides.Select
                                }
                                onUpdateModelValue={handleQuickJumperChange}
                              />
                            </div>
                            <ZP
                              variant="2-r"
                              class={`${mergedClsPrefix}-pagination-quick-jumper-content`}
                            >
                              of {mergedPageCount}
                            </ZP>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <ZP
                              variant="2-r"
                              class={`${mergedClsPrefix}-pagination-quick-jumper-label`}
                            >
                              {locale.pageLabel}
                            </ZP>
                            <ZInput
                              class={`${mergedClsPrefix}-pagination-quick-jumper__input`}
                              style={{
                                width: `${String(jumperValue).length + 2}ch`
                              }}
                              modelValue={jumperValue}
                              type="text"
                              onUpdateModelValue={handleQuickJumperChange}
                            />
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                    <ZButton
                      variant="text"
                      disabled={nextButtonDisabled}
                      class={[
                        `${mergedClsPrefix}-pagination-item`,
                        {
                          [`${mergedClsPrefix}-pagination-item--disabled`]:
                            nextButtonDisabled,
                          [`${mergedClsPrefix}-pagination-item--button`]:
                            !renderNext
                        }
                      ]}
                      onClick={handleForwardClick}
                    >
                      {{
                        default: () => (
                          <Fragment>
                            {renderNext ? (
                              renderNext({
                                page: mergedPage,
                                pageSize: mergedPageSize,
                                pageCount: mergedPageCount,
                                itemCount: this.mergedItemCount,
                                startIndex: this.startIndex,
                                endIndex: this.endIndex
                              })
                            ) : (
                              <ZBaseIcon clsPrefix={mergedClsPrefix}>
                                {{
                                  default: () =>
                                    this.rtlEnabled ? (
                                      <ChevronLeftIcon />
                                    ) : (
                                      <ChevronRightIcon />
                                    )
                                }}
                              </ZBaseIcon>
                            )}
                          </Fragment>
                        )
                      }}
                    </ZButton>
                    <ZButton
                      variant="text"
                      disabled={lastButtonDisabled}
                      class={[
                        `${mergedClsPrefix}-pagination-item`,
                        {
                          [`${mergedClsPrefix}-pagination-item--disabled`]:
                            lastButtonDisabled,
                          [`${mergedClsPrefix}-pagination-item--button`]:
                            !renderNext
                        }
                      ]}
                      onClick={handleGoLastClick}
                    >
                      {{
                        default: () => (
                          <ZBaseIcon clsPrefix={mergedClsPrefix}>
                            {{ default: () => <LastPageIcon /> }}
                          </ZBaseIcon>
                        )
                      }}
                    </ZButton>
                  </Fragment>
                )
              default:
                return null
            }
          })}
          {renderSuffix && (
            <div class={`${mergedClsPrefix}-pagination-suffix`}>
              {renderSuffix({
                page: mergedPage,
                pageSize: mergedPageSize,
                pageCount: mergedPageCount,
                startIndex: this.startIndex,
                endIndex: this.endIndex,
                itemCount: this.mergedItemCount
              })}
            </div>
          )}
        </div>
      </div>
    )
  }
})
