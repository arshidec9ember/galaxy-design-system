/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  h,
  computed,
  defineComponent,
  toRef,
  watch,
  ref,
  nextTick,
  type PropType,
  type ExtractPropTypes
} from 'vue'
import { popoverBaseProps } from '../../popover/src/Popover'
import type { PopoverInternalProps } from '../../popover/src/Popover'
import { ZPopover } from '../../popover'
import type { PopoverInst, PopoverTrigger } from '../../popover'
import { useMergedState } from '../../_external-dependencies/vooks'
import {
  omit,
  call,
  keysOf,
  createRefSetter,
  mergeEventHandlers
} from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { ZInternalSelectMenu } from '../../_internal'
import { createTreeMate, type TreeNode } from 'treemate'
import { happensIn } from 'seemly'
import {
  type NodeProps,
  type RenderLabel
} from '../../_internal/select-menu/src/interface'
import { createTmOptions, createValOptMap } from '../../select/src/utils'
import {
  type OnUpdateModelValue,
  type OnUpdateModelValueImpl,
  type Value,
  type SelectOption,
  type SelectMixedOption,
  type SelectBaseOption,
  type SelectGroupOption,
  type SelectIgnoredOption,
  type ValueAtom
} from '../../select/src/interface'
import type { PopselectSize } from './interface'
import {
  type ThemeProps,
  useConfig,
  useTheme,
  useThemeClass,
  useProxyModel
} from '../../_mixins'
import { popselectLight } from '../styles'
import type { PopselectTheme } from '../styles'
import style from './styles/index.cssr'

export const customProps = {
  multiple: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Array] as PropType<Value | null>
  },
  mandatory: {
    type: Boolean,
    default: true
  },
  labelField: {
    type: String,
    default: 'label'
  },
  valueField: {
    type: String,
    default: 'value'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  options: {
    type: Array as PropType<SelectMixedOption[]>,
    default: () => []
  },
  size: {
    type: String as PropType<PopselectSize>,
    default: 'medium'
  },
  scrollable: Boolean,
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  onMouseenter: Function as PropType<(e: MouseEvent) => void>,
  onMouseleave: Function as PropType<(e: MouseEvent) => void>,
  renderOptionLabel: Function as PropType<RenderLabel>,
  showCheckmark: {
    type: Boolean,
    default: false
  },
  nodeProps: Function as PropType<NodeProps>,
  virtualScroll: Boolean,
  tooltip: {
    type: Boolean,
    default: true
  }
} as const

export const popselectProps = {
  ...(useTheme.props as ThemeProps<PopselectTheme>),
  ...omit(popoverBaseProps, ['showArrow', 'arrow']),
  placement: {
    ...popoverBaseProps.placement,
    default: 'bottom-start'
  },
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'hover'
  },
  ...customProps
}

export const customPropKeys = keysOf(customProps)
export type PopselectSetupProps = ExtractPropTypes<typeof popselectProps>
export type PopselectProps = ExtractPublicPropTypes<typeof popselectProps>

export default defineComponent({
  name: 'Popselect',
  props: popselectProps,
  inheritAttrs: false,
  __popover__: true,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Popselect',
      '-popselect',
      style,
      popselectLight,
      props,
      mergedClsPrefixRef
    )

    const uncontrolledValueRef = ref<Value | null>(null)
    const controlledValueRef = toRef(props, 'modelValue')
    const controlledShowRef = useProxyModel(props, 'show')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const popoverInstRef = ref<PopoverInst | null>(null)

    function syncPosition (): void {
      popoverInstRef.value?.syncPosition()
    }
    function setShow (value: boolean): void {
      popoverInstRef.value?.setShow(value)
    }

    function doUpdateShow (val: boolean): void {
      controlledShowRef.value = val
    }

    const valOptMapRef = computed(() =>
      createValOptMap(props.options, props.valueField, props.childrenField)
    )

    const treeMateRef = computed(() => {
      const { valueField, childrenField } = props
      const options = createTmOptions(valueField, childrenField)
      return createTreeMate<
      SelectBaseOption,
      SelectGroupOption,
      SelectIgnoredOption
      >(props.options, options)
    })

    function getMergedOptions (values: ValueAtom[]): SelectOption[] {
      const { value: valOptMap } = valOptMapRef
      const options: SelectOption[] = []
      values.forEach((value) => {
        if (valOptMap.has(value)) {
          options.push(valOptMap.get(value)!)
        }
      })
      return options
    }
    const selectedOptionsRef = computed(() => {
      const { value: mergedValue } = mergedValueRef
      if (props.multiple) {
        if (!Array.isArray(mergedValue)) return []
        return getMergedOptions(mergedValue)
      }
      if (!Array.isArray(mergedValue)) {
        if (mergedValue === null) return null
        return getMergedOptions([mergedValue])[0] || null
      }
      return null
    })

    function doUpdateValue (
      value: Value | null,
      option: SelectBaseOption | null | SelectBaseOption[]
    ): void {
      const { 'onUpdate:modelValue': _onUpdateModelValue, onUpdateModelValue } =
        props
      if (onUpdateModelValue) {
        call(onUpdateModelValue as OnUpdateModelValueImpl, value, option)
      }
      if (_onUpdateModelValue) {
        call(_onUpdateModelValue as OnUpdateModelValueImpl, value, option)
      }
      uncontrolledValueRef.value = value
    }
    function handleToggle (tmNode: TreeNode<SelectBaseOption>): void {
      toggle(tmNode.key)
    }
    function handleMenuMousedown (e: MouseEvent): void {
      if (!happensIn(e, 'action')) e.preventDefault()
    }
    function toggle (value: ValueAtom): void {
      const {
        value: { getNode }
      } = treeMateRef
      if (props.multiple) {
        const { value: mergedValue } = mergedValueRef
        if (Array.isArray(mergedValue)) {
          const newValue: ValueAtom[] = []
          const newOptions: SelectBaseOption[] = []
          let shouldAddValue = true
          mergedValue.forEach((v) => {
            if (v === value) {
              shouldAddValue = false
              return
            }
            const tmNode = getNode(v)
            if (tmNode) {
              newValue.push(tmNode.key)
              newOptions.push(tmNode.rawNode)
            }
          })
          if (shouldAddValue) {
            newValue.push(value)
            newOptions.push(getNode(value)!.rawNode)
          }
          doUpdateValue(newValue, newOptions)
        } else {
          const tmNode = getNode(value)
          if (tmNode) {
            doUpdateValue([value], [tmNode.rawNode])
          }
        }
      } else {
        const { value: mergedValue } = mergedValueRef
        if (mergedValue === value && !props.mandatory) {
          doUpdateValue(null, null)
        } else {
          const tmNode = getNode(value)
          if (tmNode) {
            doUpdateValue(value, tmNode.rawNode)
          }
          controlledShowRef.value = false
          setShow(false)
        }
      }
      void nextTick(() => {
        syncPosition()
      })
    }
    watch(toRef(props, 'options'), () => {
      void nextTick(() => {
        syncPosition()
      })
    })
    const cssVarsRef = computed(() => {
      const {
        self: { menuBoxShadow }
      } = themeRef.value
      return {
        '--z-menu-box-shadow': menuBoxShadow
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('select', undefined, cssVarsRef, props)
      : undefined
    return {
      popoverInstRef,
      mergedTheme: themeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      treeMate: treeMateRef,
      handleToggle,
      handleMenuMousedown,
      doUpdateShow,
      selectedOptions: selectedOptionsRef,
      mergedValue: mergedValueRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedTheme } = this
    const popoverProps: PopoverInternalProps & { ref: string } = {
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      builtinThemeOverrides: {
        padding: '0'
      },
      ref: 'popoverInstRef',
      internalRenderBody: (
        className,
        ref,
        style,
        onMouseenter,
        onMouseleave
      ) => {
        this.onRender?.()
        const { $attrs } = this
        return (
          <ZInternalSelectMenu
            clsPrefix={this.mergedClsPrefix}
            focusable
            ref={createRefSetter(ref)}
            nodeProps={this.nodeProps}
            labelField={this.labelField}
            valueField={this.valueField}
            class={[
              `${this.mergedClsPrefix}-popselect-menu`,
              this.themeClass,
              $attrs.class,
              className
            ]}
            style={[this.cssVars, $attrs.style, style]}
            theme={this.mergedTheme.peers.InternalSelectMenu}
            themeOverrides={this.mergedTheme.peerOverrides.InternalSelectMenu}
            multiple={this.multiple}
            treeMate={this.treeMate}
            size={this.size}
            value={this.mergedValue}
            virtualScroll={this.virtualScroll}
            scrollable={this.scrollable}
            renderLabel={this.renderOptionLabel}
            onToggle={this.handleToggle}
            onMouseenter={mergeEventHandlers([
              onMouseenter,
              $attrs.onMouseenter as any
            ])}
            onMouseleave={mergeEventHandlers([
              onMouseleave,
              $attrs.onMouseleave as any
            ])}
            onMousedown={this.handleMenuMousedown}
            showCheckmark={this.showCheckmark}
            tooltip={this.tooltip}
          >
            {{
              action: () => this.$slots.action?.(),
              empty: () => this.$slots.empty?.()
            }}
          </ZInternalSelectMenu>
        )
      }
    }
    return (
      <ZPopover
        {...omit(this.$props, customPropKeys)}
        {...popoverProps}
        internalDeactivateImmediately
        onUpdateShow={this.doUpdateShow}
      >
        {{
          trigger: () =>
            this.$slots.default?.({
              value: this.mergedValue,
              option: this.selectedOptions
            })
        }}
      </ZPopover>
    )
  }
})
