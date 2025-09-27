import {
  computed,
  defineComponent,
  h,
  provide,
  type PropType,
  type CSSProperties,
  watchEffect,
  toRef
} from 'vue'
import { useIsMounted } from '../../_external-dependencies/vooks'
import { depx } from 'seemly'
import { ZScrollbar } from '../../_internal'
import { useFormItem, useTheme, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils/cssr'
import {
  call,
  type ExtractPublicPropTypes,
  warnOnce,
  type MaybeArray
} from '../../_utils'
import { transferLight } from '../styles'
import type { TransferTheme } from '../styles'
import ZTransferHeader from './TransferHeader'
import ZTransferList from './TransferList'
import ZTransferFilter from './TransferFilter'
import { useTransferData } from './use-transfer-data'
import {
  type OptionValue,
  type Option,
  type Filter,
  type OnUpdateModelValue,
  transferInjectionKey,
  type TransferRenderTargetLabel,
  type TransferRenderSourceList,
  type TransferRenderSourceLabel
} from './interface'
import style from './styles/index.cssr'

export const transferProps = {
  ...(useTheme.props as ThemeProps<TransferTheme>),
  modelValue: Array as PropType<OptionValue[] | null>,
  defaultModelValue: {
    type: Array as PropType<OptionValue[] | null>,
    default: null
  },
  options: {
    type: Array as PropType<Option[]>,
    default: () => []
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  virtualScroll: Boolean,
  sourceTitle: String,
  selectAllText: String,
  clearText: String,
  targetTitle: String,
  filterable: {
    type: Boolean,
    default: undefined
  },
  sourceFilterable: Boolean,
  targetFilterable: Boolean,
  showSelected: {
    type: Boolean,
    default: true
  },
  sourceFilterPlaceholder: String,
  targetFilterPlaceholder: String,
  filter: {
    type: Function as PropType<Filter>,
    default: (pattern: string, option: Option) => {
      if (!pattern) return true
      return ~('' + option.label)
        .toLowerCase()
        .indexOf(('' + pattern).toLowerCase())
    }
  },
  size: String as PropType<'small' | 'medium' | 'large'>,
  renderOptionSourceLabel: Function as PropType<TransferRenderSourceLabel>,
  renderOptionTargetLabel: Function as PropType<TransferRenderTargetLabel>,
  renderSourceList: Function as PropType<TransferRenderSourceList>,
  renderTargetList: Function as PropType<TransferRenderSourceList>,
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  onChange: [Function, Array] as PropType<MaybeArray<OnUpdateModelValue>>
} as const

export type TransferProps = ExtractPublicPropTypes<typeof transferProps>

export default defineComponent({
  name: 'Transfer',
  props: transferProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warnOnce(
            'transfer',
            '`on-change` is deprecated, please use `on-update:model-value` instead.'
          )
        }
        if (props.filterable !== undefined) {
          warnOnce(
            'transfer',
            '`filterable` is deprecated, please use `source-filterable` or `target-filterable` instead.'
          )
        }
      })
    }
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Transfer',
      '-transfer',
      style,
      transferLight,
      props,
      mergedClsPrefixRef
    )
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem
    const itemSizeRef = computed(() => {
      const { value: size } = mergedSizeRef
      const {
        self: { [createKey('itemHeight', size)]: itemSize }
      } = themeRef.value
      return depx(itemSize)
    })
    const {
      controlledValueRef,
      uncontrolledValueRef,
      mergedValueRef,
      targetValueSetRef,
      valueSetForCheckAllRef,
      valueSetForUncheckAllRef,
      valueSetForClearRef,
      filteredTgtOptionsRef,
      filteredSrcOptionsRef,
      targetOptionsRef,
      canNotSelectAnythingRef,
      canBeClearedRef,
      allCheckedRef,
      srcPatternRef,
      tgtPatternRef,
      mergedSrcFilterableRef,
      handleSrcFilterUpdateValue,
      handleTgtFilterUpdateValue
    } = useTransferData(props)
    function doUpdateValue (value: OptionValue[]): void {
      const { onChange } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onChange) call(onChange, value)
      controlledValueRef.value = value
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }

    function handleSourceCheckAll (): void {
      doUpdateValue([...valueSetForCheckAllRef.value])
    }

    function handleSourceUncheckAll (): void {
      doUpdateValue([...valueSetForUncheckAllRef.value])
    }

    function handleTargetClearAll (): void {
      doUpdateValue([...valueSetForClearRef.value])
    }

    function handleItemCheck (checked: boolean, optionValue: OptionValue): void {
      if (checked) {
        doUpdateValue((mergedValueRef.value || []).concat(optionValue))
      } else {
        doUpdateValue(
          (mergedValueRef.value || []).filter((v) => v !== optionValue)
        )
      }
    }

    function handleChecked (optionValueList: OptionValue[]): void {
      doUpdateValue(optionValueList)
    }

    provide(transferInjectionKey, {
      targetValueSetRef,
      mergedClsPrefixRef,
      disabledRef: mergedDisabledRef,
      mergedThemeRef: themeRef,
      targetOptionsRef,
      canNotSelectAnythingRef,
      canBeClearedRef,
      allCheckedRef,
      srcOptionsLengthRef: computed(() => props.options.length),
      handleItemCheck,
      renderSourceLabelRef: toRef(props, 'renderOptionSourceLabel'),
      renderTargetLabelRef: toRef(props, 'renderOptionTargetLabel'),
      showSelectedRef: toRef(props, 'showSelected')
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedDisabled: mergedDisabledRef,
      itemSize: itemSizeRef,
      isMounted: useIsMounted(),
      mergedTheme: themeRef,
      filteredSrcOpts: filteredSrcOptionsRef,
      filteredTgtOpts: filteredTgtOptionsRef,
      srcPattern: srcPatternRef,
      tgtPattern: tgtPatternRef,
      mergedSize: mergedSizeRef,
      mergedSrcFilterable: mergedSrcFilterableRef,
      handleSrcFilterUpdateValue,
      handleTgtFilterUpdateValue,
      handleSourceCheckAll,
      handleSourceUncheckAll,
      handleTargetClearAll,
      handleItemCheck,
      handleChecked,
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const {
          common: { cubicBezierEaseInOut },
          self: {
            borderRadius,
            borderColor,
            listColor,
            titleTextColor,
            titleTextColorDisabled,
            extraTextColor,
            itemTextColor,
            itemColorPending,
            itemTextColorDisabled,
            titleFontWeight,
            closeColorHover,
            closeColorPressed,
            closeIconColor,
            closeIconColorHover,
            closeIconColorPressed,
            closeIconSize,
            closeSize,
            dividerColor,
            extraTextColorDisabled,
            [createKey('extraFontSize', size)]: extraFontSize,
            [createKey('fontSize', size)]: fontSize,
            [createKey('titleFontSize', size)]: titleFontSize,
            [createKey('itemHeight', size)]: itemHeight,
            [createKey('headerHeight', size)]: headerHeight
          }
        } = themeRef.value
        return {
          '--z-bezier': cubicBezierEaseInOut,
          '--z-border-color': borderColor,
          '--z-border-radius': borderRadius,
          '--z-extra-font-size': extraFontSize,
          '--z-font-size': fontSize,
          '--z-header-font-size': titleFontSize,
          '--z-header-extra-text-color': extraTextColor,
          '--z-header-extra-text-color-disabled': extraTextColorDisabled,
          '--z-header-font-weight': titleFontWeight,
          '--z-header-text-color': titleTextColor,
          '--z-header-text-color-disabled': titleTextColorDisabled,
          '--z-item-color-pending': itemColorPending,
          '--z-item-height': itemHeight,
          '--z-item-text-color': itemTextColor,
          '--z-item-text-color-disabled': itemTextColorDisabled,
          '--z-list-color': listColor,
          '--z-header-height': headerHeight,
          '--z-close-size': closeSize,
          '--z-close-icon-size': closeIconSize,
          '--z-close-color-hover': closeColorHover,
          '--z-close-color-pressed': closeColorPressed,
          '--z-close-icon-color': closeIconColor,
          '--z-close-icon-color-hover': closeIconColorHover,
          '--z-close-icon-color-pressed': closeIconColorPressed,
          '--z-divider-color': dividerColor
        }
      })
    }
  },
  render () {
    const {
      mergedClsPrefix,
      renderSourceList,
      renderTargetList,
      mergedTheme,
      mergedSrcFilterable,
      targetFilterable
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-transfer`,
          this.mergedDisabled && `${mergedClsPrefix}-transfer--disabled`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={`${mergedClsPrefix}-transfer-list ${mergedClsPrefix}-transfer-list--source`}
        >
          <ZTransferHeader
            source
            selectAllText={this.selectAllText}
            clearText={this.clearText}
            title={this.sourceTitle}
            onCheckedAll={this.handleSourceCheckAll}
            onClearAll={this.handleSourceUncheckAll}
            size={this.mergedSize}
          />
          <div class={`${mergedClsPrefix}-transfer-list-body`}>
            {mergedSrcFilterable ? (
              <ZTransferFilter
                onUpdateValue={this.handleSrcFilterUpdateValue}
                value={this.srcPattern}
                disabled={this.mergedDisabled}
                placeholder={this.sourceFilterPlaceholder}
              />
            ) : null}
            <div class={`${mergedClsPrefix}-transfer-list-flex-container`}>
              {renderSourceList ? (
                <ZScrollbar
                  theme={mergedTheme.peers.Scrollbar}
                  themeOverrides={mergedTheme.peerOverrides.Scrollbar}
                >
                  {{
                    default: () =>
                      renderSourceList({
                        onCheck: this.handleChecked,
                        checkedOptions: this.filteredTgtOpts,
                        pattern: this.srcPattern
                      })
                  }}
                </ZScrollbar>
              ) : (
                <ZTransferList
                  source
                  options={this.filteredSrcOpts}
                  disabled={this.mergedDisabled}
                  virtualScroll={this.virtualScroll}
                  itemSize={this.itemSize}
                />
              )}
            </div>
          </div>
          <div class={`${mergedClsPrefix}-transfer-list__border`} />
        </div>
        <div
          class={`${mergedClsPrefix}-transfer-list ${mergedClsPrefix}-transfer-list--target`}
        >
          <ZTransferHeader
            onClearAll={this.handleTargetClearAll}
            size={this.mergedSize}
            title={this.targetTitle}
          />
          <div class={`${mergedClsPrefix}-transfer-list-body`}>
            {targetFilterable ? (
              <ZTransferFilter
                onUpdateValue={this.handleTgtFilterUpdateValue}
                value={this.tgtPattern}
                disabled={this.mergedDisabled}
                placeholder={this.sourceFilterPlaceholder}
              />
            ) : null}
            <div class={`${mergedClsPrefix}-transfer-list-flex-container`}>
              {renderTargetList ? (
                <ZScrollbar
                  theme={mergedTheme.peers.Scrollbar}
                  themeOverrides={mergedTheme.peerOverrides.Scrollbar}
                >
                  {{
                    default: () =>
                      renderTargetList({
                        onCheck: this.handleChecked,
                        checkedOptions: this.filteredTgtOpts,
                        pattern: this.tgtPattern
                      })
                  }}
                </ZScrollbar>
              ) : (
                <ZTransferList
                  options={this.filteredTgtOpts}
                  disabled={this.mergedDisabled}
                  virtualScroll={this.virtualScroll}
                  itemSize={this.itemSize}
                />
              )}
            </div>
          </div>
          <div class={`${mergedClsPrefix}-transfer-list__border`} />
        </div>
      </div>
    )
  }
})
