import {
  computed,
  defineComponent,
  h,
  provide,
  type PropType,
  type CSSProperties,
  watchEffect
} from 'vue'
import { useIsMounted } from '../../_external-dependencies/vooks'
import { depx } from 'seemly'
import { ChevronLeftIcon, ChevronRightIcon } from '../../_internal/icons'
import { ZBaseIcon } from '../../_internal'
import { ZButton } from '../../button'
import { useLocale, useFormItem, useTheme, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils/cssr'
import {
  call,
  type ExtractPublicPropTypes,
  warnOnce,
  type MaybeArray
} from '../../_utils'
import { legacyTransferLight } from '../styles'
import type { LegacyTransferTheme } from '../styles'
import ZTransferHeader from './TransferHeader'
import ZTransferList from './TransferList'
import ZTransferFilter from './TransferFilter'
import { useTransferData } from './use-transfer-data'
import style from './styles/index.cssr'
import {
  type OptionValue,
  type Option,
  type Filter,
  type OnUpdateModelValue,
  transferInjectionKey
} from './interface'

export const transferProps = {
  ...(useTheme.props as ThemeProps<LegacyTransferTheme>),
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
  targetTitle: String,
  filterable: Boolean,
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
  name: 'LegacyTransfer',
  props: transferProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warnOnce(
            'legacy-transfer',
            '`on-change` is deprecated, please use `on-update:model-value` instead.'
          )
        }
      })
    }
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'LegacyTransfer',
      '-legacy-transfer',
      style,
      legacyTransferLight,
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
      controlledValue: controlledValueRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      avlSrcValueSet: avlSrcValueSetRef,
      avlTgtValueSet: avlTgtValueSetRef,
      tgtOpts: tgtOptsRef,
      srcOpts: srcOptsRef,
      filteredSrcOpts: filteredSrcOptsRef,
      filteredTgtOpts: filteredTgtOptsRef,
      srcCheckedValues: srcCheckedValuesRef,
      tgtCheckedValues: tgtCheckedValuesRef,
      srcCheckedStatus: srcCheckedStatusRef,
      tgtCheckedStatus: tgtCheckedStatusRef,
      srcPattern: srcPatternRef,
      tgtPattern: tgtPatternRef,
      isInputing: isInputingRef,
      fromButtonDisabled: fromButtonDisabledRef,
      toButtonDisabled: toButtonDisabledRef,
      handleInputFocus,
      handleInputBlur,
      handleTgtFilterUpdateValue,
      handleSrcFilterUpdateValue
    } = useTransferData(props, mergedDisabledRef)
    function doUpdateValue (value: OptionValue[]): void {
      const { onChange } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onChange) call(onChange, value)
      controlledValueRef.value = value
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function handleSrcHeaderCheck (value: boolean): void {
      const {
        value: { checked, indeterminate }
      } = srcCheckedStatusRef
      if (indeterminate || checked) {
        srcCheckedValuesRef.value = []
      } else {
        srcCheckedValuesRef.value = Array.from(avlSrcValueSetRef.value)
      }
    }
    function handleTgtHeaderCheck (): void {
      const {
        value: { checked, indeterminate }
      } = tgtCheckedStatusRef
      if (indeterminate || checked) {
        tgtCheckedValuesRef.value = []
      } else {
        tgtCheckedValuesRef.value = Array.from(avlTgtValueSetRef.value)
      }
    }
    function handleTgtCheckboxClick (
      checked: boolean,
      optionValue: OptionValue
    ): void {
      if (checked) {
        tgtCheckedValuesRef.value.push(optionValue)
      } else {
        const index = tgtCheckedValuesRef.value.findIndex(
          (v) => v === optionValue
        )
        if (~index) {
          tgtCheckedValuesRef.value.splice(index, 1)
        }
      }
    }
    function handleSrcCheckboxClick (
      checked: boolean,
      optionValue: OptionValue
    ): void {
      if (checked) {
        srcCheckedValuesRef.value.push(optionValue)
      } else {
        const index = srcCheckedValuesRef.value.findIndex(
          (v) => v === optionValue
        )
        if (~index) {
          srcCheckedValuesRef.value.splice(index, 1)
        }
      }
    }
    function handleToTgtClick (): void {
      doUpdateValue(
        srcCheckedValuesRef.value.concat(mergedValueRef.value || [])
      )
      srcCheckedValuesRef.value = []
    }
    function handleToSrcClick (): void {
      const tgtCheckedValueSet = new Set(tgtCheckedValuesRef.value)
      doUpdateValue(
        (mergedValueRef.value || []).filter((v) => !tgtCheckedValueSet.has(v))
      )
      tgtCheckedValuesRef.value = []
    }
    provide(transferInjectionKey, {
      mergedClsPrefixRef,
      mergedSizeRef,
      disabledRef: mergedDisabledRef,
      mergedThemeRef: themeRef,
      srcCheckedValuesRef,
      tgtCheckedValuesRef,
      srcOptsRef,
      tgtOptsRef,
      srcCheckedStatusRef,
      tgtCheckedStatusRef,
      handleSrcCheckboxClick,
      handleTgtCheckboxClick
    })
    const { localeRef } = useLocale('LegacyTransfer')
    return {
      locale: localeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedDisabled: mergedDisabledRef,
      itemSize: itemSizeRef,
      isMounted: useIsMounted(),
      isInputing: isInputingRef,
      mergedTheme: themeRef,
      filteredSrcOpts: filteredSrcOptsRef,
      filteredTgtOpts: filteredTgtOptsRef,
      srcPattern: srcPatternRef,
      tgtPattern: tgtPatternRef,
      toButtonDisabled: toButtonDisabledRef,
      fromButtonDisabled: fromButtonDisabledRef,
      handleSrcHeaderCheck,
      handleTgtHeaderCheck,
      handleToSrcClick,
      handleToTgtClick,
      handleInputFocus,
      handleInputBlur,
      handleTgtFilterUpdateValue,
      handleSrcFilterUpdateValue,
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const {
          common: {
            cubicBezierEaseInOut,
            cubicBezierEaseIn,
            cubicBezierEaseOut
          },
          self: {
            width,
            borderRadius,
            borderColor,
            listColor,
            headerColor,
            titleTextColor,
            titleTextColorDisabled,
            extraTextColor,
            filterDividerColor,
            itemTextColor,
            itemColorPending,
            itemTextColorDisabled,
            extraFontSize,
            titleFontWeight,
            iconColor,
            iconColorDisabled,
            [createKey('fontSize', size)]: fontSize,
            [createKey('itemHeight', size)]: itemHeight
          }
        } = themeRef.value
        return {
          '--z-bezier': cubicBezierEaseInOut,
          '--z-bezier-ease-in': cubicBezierEaseIn,
          '--z-bezier-ease-out': cubicBezierEaseOut,
          '--z-border-color': borderColor,
          '--z-border-radius': borderRadius,
          '--z-extra-font-size': extraFontSize,
          '--z-filter-divider-color': filterDividerColor,
          '--z-font-size': fontSize,
          '--z-header-color': headerColor,
          '--z-header-extra-text-color': extraTextColor,
          '--z-header-font-weight': titleFontWeight,
          '--z-header-text-color': titleTextColor,
          '--z-header-text-color-disabled': titleTextColorDisabled,
          '--z-item-color-pending': itemColorPending,
          '--z-item-height': itemHeight,
          '--z-item-text-color': itemTextColor,
          '--z-item-text-color-disabled': itemTextColorDisabled,
          '--z-list-color': listColor,
          '--z-width': width,
          '--z-icon-color': iconColor,
          '--z-icon-color-disabled': iconColorDisabled
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-legacy-transfer`,
          this.mergedDisabled && `${mergedClsPrefix}-legacy-transfer--disabled`,
          this.filterable && `${mergedClsPrefix}-legacy-transfer--filterable`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-legacy-transfer-list`}>
          <ZTransferHeader
            source
            onChange={this.handleSrcHeaderCheck}
            title={this.sourceTitle || this.locale.sourceTitle}
          />
          <div class={`${mergedClsPrefix}-legacy-transfer-list-body`}>
            {this.filterable ? (
              <ZTransferFilter
                onUpdateValue={this.handleSrcFilterUpdateValue}
                value={this.srcPattern}
                disabled={this.mergedDisabled}
                placeholder={this.sourceFilterPlaceholder}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
              />
            ) : null}
            <div
              class={`${mergedClsPrefix}-legacy-transfer-list-flex-container`}
            >
              <ZTransferList
                source
                options={this.filteredSrcOpts}
                disabled={this.mergedDisabled}
                virtualScroll={this.virtualScroll}
                isMounted={this.isMounted}
                isInputing={this.isInputing}
                itemSize={this.itemSize}
              />
            </div>
          </div>
          <div class={`${mergedClsPrefix}-legacy-transfer-list__border`} />
        </div>
        <div class={`${mergedClsPrefix}-legacy-transfer-gap`}>
          <ZButton
            disabled={this.toButtonDisabled || this.mergedDisabled}
            theme={this.mergedTheme.peers.Button}
            themeOverrides={this.mergedTheme.peerOverrides.Button}
            onClick={this.handleToTgtClick}
          >
            {{
              icon: () => (
                <ZBaseIcon clsPrefix={mergedClsPrefix}>
                  {{ default: () => <ChevronRightIcon /> }}
                </ZBaseIcon>
              )
            }}
          </ZButton>
          <ZButton
            disabled={this.fromButtonDisabled || this.mergedDisabled}
            theme={this.mergedTheme.peers.Button}
            themeOverrides={this.mergedTheme.peerOverrides.Button}
            onClick={this.handleToSrcClick}
          >
            {{
              icon: () => (
                <ZBaseIcon clsPrefix={mergedClsPrefix}>
                  {{ default: () => <ChevronLeftIcon /> }}
                </ZBaseIcon>
              )
            }}
          </ZButton>
        </div>
        <div class={`${mergedClsPrefix}-legacy-transfer-list`}>
          <ZTransferHeader
            onChange={this.handleTgtHeaderCheck}
            title={this.targetTitle || this.locale.targetTitle}
          />
          <div class={`${mergedClsPrefix}-legacy-transfer-list-body`}>
            {this.filterable ? (
              <ZTransferFilter
                onUpdateValue={this.handleTgtFilterUpdateValue}
                value={this.tgtPattern}
                disabled={this.mergedDisabled}
                placeholder={this.targetFilterPlaceholder}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
              />
            ) : null}
            <div
              class={`${mergedClsPrefix}-legacy-transfer-list-flex-container`}
            >
              <ZTransferList
                options={this.filteredTgtOpts}
                disabled={this.mergedDisabled}
                virtualScroll={this.virtualScroll}
                isMounted={this.isMounted}
                isInputing={this.isInputing}
                itemSize={this.itemSize}
              />
            </div>
          </div>
          <div class={`${mergedClsPrefix}-legacy-transfer-list__border`} />
        </div>
      </div>
    )
  }
})
