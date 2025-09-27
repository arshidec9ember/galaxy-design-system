import {
  defineComponent,
  h,
  computed,
  ref,
  toRef,
  type PropType,
  watch,
  provide,
  type Ref,
  mergeProps
} from 'vue'
import { createTreeMate, type Key, type TreeNode } from 'treemate'
import {
  useMergedState,
  useKeyboard,
  useMemo
} from '../../_external-dependencies/vooks'
import { type FollowerPlacement } from '../../_external-dependencies/vueuc'
import type { InternalRenderBody } from '../../popover/src/interface'
import { popoverBaseProps } from '../../popover/src/Popover'
import type { PopoverInternalProps } from '../../popover/src/Popover'
import {
  useConfig,
  useProxyModel,
  useTheme,
  useThemeClass
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { ZPopover } from '../../popover'
import {
  keep,
  call,
  createKey,
  type MaybeArray,
  type ExtractPublicPropTypes,
  createRefSetter
} from '../../_utils'
import { dropdownLight } from '../styles'
import type { DropdownTheme } from '../styles'
import ZDropdownMenu from './DropdownMenu'
import style from './styles/index.cssr'
import type {
  DropdownOption,
  DropdownRenderOption,
  DropdownGroupOption,
  DropdownMixedOption,
  DropdownIgnoredOption,
  OnUpdateModelValue,
  OnUpdateModelValueImpl,
  RenderLabel,
  RenderIcon,
  RenderLabelImpl,
  RenderIconImpl,
  RenderOption,
  NodeProps,
  RenderOptionImpl,
  DropdownMenuProps
} from './interface'
import { dropdownInjectionKey } from './context'

export interface DropdownInjection {
  renderLabelRef: Ref<RenderLabelImpl | undefined>
  renderIconRef: Ref<RenderIconImpl | undefined>
  renderOptionRef: Ref<RenderOptionImpl | undefined>
  menuPropsRef: Ref<DropdownMenuProps | undefined>
  nodePropsRef: Ref<NodeProps | undefined>
  hoverKeyRef: Ref<Key | null>
  keyboardKeyRef: Ref<Key | null>
  lastToggledSubmenuKeyRef: Ref<Key | null>
  pendingKeyPathRef: Ref<Key[]>
  activeKeyPathRef: Ref<Key[]>
  animatedRef: Ref<boolean>
  mergedShowRef: Ref<boolean>
  labelFieldRef: Ref<string>
  childrenFieldRef: Ref<string>
  sizeRef: Ref<'x-small' | 'small' | 'medium' | 'large' | 'x-large'>
  doSelect: OnUpdateModelValueImpl
  doUpdateShow: (value: boolean) => void
}

const dropdownBaseProps = {
  animated: {
    type: Boolean,
    default: true
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<
    'x-small' | 'small' | 'medium' | 'large' | 'x-large'
    >,
    default: 'medium'
  },
  inverted: Boolean,
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom-start'
  },
  onSelect: [Function, Array] as PropType<MaybeArray<OnUpdateModelValue>>,
  options: {
    type: Array as PropType<DropdownMixedOption[]>,
    default: () => []
  },
  menuProps: Function as PropType<DropdownMenuProps>,
  showArrow: Boolean,
  renderOptionLabel: Function as PropType<RenderLabel>,
  renderOptionIcon: Function as PropType<RenderIcon>,
  renderOption: Function as PropType<RenderOption>,
  nodeProps: Function as PropType<NodeProps>,
  labelField: {
    type: String,
    default: 'label'
  },
  keyField: {
    type: String,
    default: 'key'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  // for menu, not documented
  value: [String, Number] as PropType<Key | null>
} as const

const popoverPropKeys = Object.keys(popoverBaseProps) as Array<
keyof typeof popoverBaseProps
>

export const dropdownProps = {
  ...popoverBaseProps,
  ...dropdownBaseProps,
  ...(useTheme.props as ThemeProps<DropdownTheme>)
} as const

export type DropdownProps = ExtractPublicPropTypes<typeof dropdownProps>

export default defineComponent({
  name: 'Dropdown',
  inheritAttrs: false,
  props: dropdownProps,
  setup (props) {
    const controlledShowRef = useProxyModel(props, 'show')
    const uncontrolledShowRef = ref(false)
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)
    const treemateRef = computed(() => {
      const { keyField, childrenField } = props
      return createTreeMate<
      DropdownOption | DropdownRenderOption,
      DropdownGroupOption,
      DropdownIgnoredOption
      >(props.options, {
        getKey (node) {
          return node[keyField] as any
        },
        getDisabled (node) {
          return node.disabled === true
        },
        getIgnored (node) {
          return node.type === 'divider' || node.type === 'render'
        },
        getChildren (node) {
          return node[childrenField] as any
        }
      })
    })
    const tmNodesRef = computed(() => {
      return treemateRef.value.treeNodes
    })

    const hoverKeyRef = ref<Key | null>(null)
    const keyboardKeyRef = ref<Key | null>(null)
    const lastToggledSubmenuKeyRef = ref<Key | null>(null)
    const pendingKeyRef = computed(() => {
      return (
        hoverKeyRef.value ??
        keyboardKeyRef.value ??
        lastToggledSubmenuKeyRef.value ??
        null
      )
    })

    const pendingKeyPathRef = computed(
      () => treemateRef.value.getPath(pendingKeyRef.value).keyPath
    )

    const activeKeyPathRef = computed(
      () => treemateRef.value.getPath(props.value).keyPath
    )

    const keyboardEnabledRef = useMemo(() => {
      return props.keyboard && mergedShowRef.value
    })

    useKeyboard(
      {
        keydown: {
          ArrowUp: {
            prevent: true,
            handler: handleKeydownUp
          },
          ArrowRight: {
            prevent: true,
            handler: handleKeydownRight
          },
          ArrowDown: {
            prevent: true,
            handler: handleKeydownDown
          },
          ArrowLeft: {
            prevent: true,
            handler: handleKeydownLeft
          },
          Enter: {
            prevent: true,
            handler: handleKeydownEnter
          },
          Escape: handleKeydownEsc
        }
      },
      keyboardEnabledRef
    )

    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)

    const themeRef = useTheme(
      'Dropdown',
      '-dropdown',
      style,
      dropdownLight,
      props,
      mergedClsPrefixRef
    )

    provide(dropdownInjectionKey, {
      labelFieldRef: toRef(props, 'labelField'),
      childrenFieldRef: toRef(props, 'childrenField'),
      renderLabelRef: toRef(props, 'renderOptionLabel') as Ref<
      RenderLabelImpl | undefined
      >,
      renderIconRef: toRef(props, 'renderOptionIcon') as Ref<
      RenderIconImpl | undefined
      >,
      hoverKeyRef,
      keyboardKeyRef,
      lastToggledSubmenuKeyRef,
      pendingKeyPathRef,
      activeKeyPathRef,
      animatedRef: toRef(props, 'animated'),
      mergedShowRef,
      nodePropsRef: toRef(props, 'nodeProps'),
      renderOptionRef: toRef(props, 'renderOption') as Ref<
      RenderOptionImpl | undefined
      >,
      menuPropsRef: toRef(props, 'menuProps'),
      sizeRef: toRef(props, 'size'),
      doSelect,
      doUpdateShow
    })
    // watch
    watch(mergedShowRef, (value) => {
      if (!props.animated && !value) {
        clearPendingState()
      }
    })
    // methods
    function doSelect (key: Key, node: DropdownOption): void {
      const { onSelect } = props
      if (onSelect) call(onSelect as OnUpdateModelValueImpl, key, node)
    }
    function doUpdateShow (value: boolean): void {
      controlledShowRef.value = value
      uncontrolledShowRef.value = value
    }
    function clearPendingState (): void {
      hoverKeyRef.value = null
      keyboardKeyRef.value = null
      lastToggledSubmenuKeyRef.value = null
    }
    function handleKeydownEsc (): void {
      doUpdateShow(false)
    }
    function handleKeydownLeft (): void {
      handleKeydown('left')
    }
    function handleKeydownRight (): void {
      handleKeydown('right')
    }
    function handleKeydownUp (): void {
      handleKeydown('up')
    }
    function handleKeydownDown (): void {
      handleKeydown('down')
    }
    function handleKeydownEnter (): void {
      const pendingNode = getPendingNode()
      if (pendingNode?.isLeaf && mergedShowRef.value) {
        doSelect(pendingNode.key, pendingNode.rawNode)
        doUpdateShow(false)
      }
    }
    function getPendingNode (): TreeNode<DropdownOption> | null {
      const { value: treeMate } = treemateRef
      const { value: pendingKey } = pendingKeyRef
      if (!treeMate || pendingKey === null) return null
      return treeMate.getNode(pendingKey) ?? null
    }
    function handleKeydown (direction: 'up' | 'right' | 'down' | 'left'): void {
      const { value: pendingKey } = pendingKeyRef
      const {
        value: { getFirstAvailableNode }
      } = treemateRef
      let nextKeyboardKey: Key | null = null
      if (pendingKey === null) {
        const firstNode = getFirstAvailableNode()
        if (firstNode !== null) {
          nextKeyboardKey = firstNode.key
        }
      } else {
        const currentNode = getPendingNode()
        if (currentNode) {
          let nextNode
          switch (direction) {
            case 'down':
              nextNode = currentNode.getNext()
              break
            case 'up':
              nextNode = currentNode.getPrev()
              break
            case 'right':
              nextNode = currentNode.getChild()
              break
            case 'left':
              nextNode = currentNode.getParent()
              break
          }
          if (nextNode) nextKeyboardKey = nextNode.key
        }
      }
      if (nextKeyboardKey !== null) {
        hoverKeyRef.value = null
        keyboardKeyRef.value = nextKeyboardKey
      }
    }
    const cssVarsRef = computed(() => {
      const { size, inverted } = props
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const {
        padding,
        dividerColor,
        borderRadius,
        optionOpacityDisabled,
        optionIconColor,
        [createKey('optionIconSuffixWidth', size)]: optionIconSuffixWidth,
        [createKey('optionSuffixWidth', size)]: optionSuffixWidth,
        [createKey('optionIconPrefixWidth', size)]: optionIconPrefixWidth,
        [createKey('optionPrefixWidth', size)]: optionPrefixWidth,
        [createKey('fontSize', size)]: fontSize,
        [createKey('optionHeight', size)]: optionHeight,
        [createKey('optionIconSize', size)]: optionIconSize
      } = self
      const vars: any = {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-font-size': fontSize,
        '--z-padding': padding,
        '--z-border-radius': borderRadius,
        '--z-option-height': optionHeight,
        '--z-option-prefix-width': optionPrefixWidth,
        '--z-option-icon-prefix-width': optionIconPrefixWidth,
        '--z-option-suffix-width': optionSuffixWidth,
        '--z-option-icon-suffix-width': optionIconSuffixWidth,
        '--z-option-icon-size': optionIconSize,
        '--z-option-icon-color': optionIconColor,
        '--z-divider-color': dividerColor,
        '--z-option-opacity-disabled': optionOpacityDisabled
      }
      // writing like this is the fastest method
      if (inverted) {
        vars['--z-color'] = self.colorInverted
        vars['--z-option-color-hover'] = self.optionColorHoverInverted
        vars['--z-option-color-active'] = self.optionColorActiveInverted
        vars['--z-option-text-color'] = self.optionTextColorInverted
        vars['--z-option-text-color-hover'] = self.optionTextColorHoverInverted
        vars['--z-option-text-color-active'] =
          self.optionTextColorActiveInverted
        vars['--z-option-text-color-child-active'] =
          self.optionTextColorChildActiveInverted
        vars['--z-prefix-color'] = self.prefixColorInverted
        vars['--z-suffix-color'] = self.suffixColorInverted
        vars['--z-group-header-text-color'] = self.groupHeaderTextColorInverted
      } else {
        vars['--z-color'] = self.color
        vars['--z-option-color-hover'] = self.optionColorHover
        vars['--z-option-color-active'] = self.optionColorActive
        vars['--z-option-text-color'] = self.optionTextColor
        vars['--z-option-text-color-hover'] = self.optionTextColorHover
        vars['--z-option-text-color-active'] = self.optionTextColorActive
        vars['--z-option-text-color-child-active'] =
          self.optionTextColorChildActive
        vars['--z-prefix-color'] = self.prefixColor
        vars['--z-suffix-color'] = self.suffixColor
        vars['--z-group-header-text-color'] = self.groupHeaderTextColor
      }
      return vars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'dropdown',
        computed(() => `${props.size[0]}${props.inverted ? 'i' : ''}`),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      // data
      tmNodes: tmNodesRef,
      // show
      mergedShow: mergedShowRef,
      // methods
      handleAfterLeave: () => {
        if (!props.animated) return
        clearPendingState()
      },
      doUpdateShow,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const renderPopoverBody: InternalRenderBody = (
      className,
      ref,
      style,
      onMouseenter,
      onMouseleave
    ) => {
      const { mergedClsPrefix, menuProps } = this
      this.onRender?.()
      const menuNodeProps =
        menuProps?.(
          undefined,
          this.tmNodes.map((v) => v.rawNode)
        ) || {}
      const dropdownProps = {
        ref: createRefSetter(ref),
        class: [className, `${mergedClsPrefix}-dropdown`, this.themeClass],
        clsPrefix: mergedClsPrefix,
        tmNodes: this.tmNodes,
        style: [style, this.cssVars as any],
        showArrow: this.showArrow,
        arrowStyle: this.arrowStyle,
        scrollable: this.scrollable,
        onMouseenter,
        onMouseleave
      }
      return h(
        ZDropdownMenu,
        mergeProps(
          this.$attrs,
          dropdownProps,
          menuNodeProps
        ) as typeof dropdownProps
      )
    }
    const { mergedTheme } = this
    const popoverProps: PopoverInternalProps = {
      show: this.mergedShow,
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      internalOnAfterLeave: this.handleAfterLeave,
      internalRenderBody: renderPopoverBody,
      onUpdateShow: this.doUpdateShow,
      'onUpdate:show': undefined
    }
    return (
      <ZPopover {...keep(this.$props, popoverPropKeys)} {...popoverProps}>
        {{
          trigger: () => this.$slots.default?.()
        }}
      </ZPopover>
    )
  }
})
