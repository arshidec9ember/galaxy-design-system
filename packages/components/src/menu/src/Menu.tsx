import {
  h,
  ref,
  toRef,
  computed,
  defineComponent,
  provide,
  type PropType,
  type ExtractPropTypes,
  inject,
  type VNodeChild,
  watchEffect,
  type VNode
} from 'vue'
import { createTreeMate, type Key } from 'treemate'
import {
  useCompitable,
  useMergedState
} from '../../_external-dependencies/vooks'
import {
  VOverflow,
  type VOverflowInst,
  type FollowerPlacement,
  VResizeObserver
} from '../../_external-dependencies/vueuc'
import { layoutSiderInjectionKey } from '../../layout/src/interface'
import type { DropdownProps } from '../../dropdown'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, resolveWrappedSlot } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { isIgnoredNode, itemRenderer } from './utils'
import { menuLight } from '../styles'
import type { MenuTheme } from '../styles'
import type {
  MenuOption,
  MenuGroupOption,
  MenuIgnoredOption,
  MenuMixedOption,
  OnUpdateModelValue,
  OnUpdateKeys,
  OnUpdateModelValueImpl,
  OnUpdateKeysImpl,
  MenuInst,
  MenuNodeProps
} from './interface'
import { useCheckDeprecated } from './useCheckDeprecated'
import { menuInjectionKey } from './context'
import style from './styles/index.cssr'
import { ZSubmenu } from './Submenu'
import { createId } from 'seemly'

export const menuProps = {
  ...(useTheme.props as ThemeProps<MenuTheme>),
  options: {
    type: Array as PropType<MenuMixedOption[]>,
    default: () => []
  },
  collapsed: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  iconSize: {
    type: Number,
    default: 20
  },
  collapsedIconSize: {
    type: Number,
    default: 24
  },
  rootIndent: Number,
  indent: {
    type: Number,
    default: 32
  },
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
  disabledField: {
    type: String,
    default: 'disabled'
  },
  defaultExpandAll: Boolean,
  defaultExpandedKeys: Array as PropType<Key[]>,
  expandedKeys: Array as PropType<Key[]>,
  modelValue: [String, Number] as PropType<Key | null>,
  defaultModelValue: {
    type: [String, Number] as PropType<Key | null>,
    default: null
  },
  mode: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical'
  },
  watchProps: {
    type: Array as PropType<Array<'defaultExpandedKeys' | 'defaultModelValue'>>,
    default: undefined
  },
  disabled: Boolean,
  show: {
    type: Boolean,
    default: true
  },
  inverted: Boolean,
  'onUpdate:expandedKeys': [Function, Array] as PropType<
  MaybeArray<OnUpdateKeys>
  >,
  onUpdateExpandedKeys: [Function, Array] as PropType<MaybeArray<OnUpdateKeys>>,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  expandIcon: Function as PropType<(option: MenuOption) => VNodeChild>,
  renderIcon: Function as PropType<(option: MenuOption) => VNodeChild>,
  renderLabel: Function as PropType<
  (option: MenuOption | MenuGroupOption) => VNodeChild
  >,
  renderEnd: Function as PropType<
  (option: MenuOption | MenuGroupOption) => VNodeChild
  >,
  dropdownProps: Object as PropType<DropdownProps>,
  accordion: Boolean,
  nodeProps: Function as PropType<MenuNodeProps>,
  responsive: Boolean,
  // deprecated
  items: Array as PropType<Array<MenuOption | MenuGroupOption>>,
  onOpenNamesChange: [Function, Array] as PropType<MaybeArray<OnUpdateKeys>>,
  onSelect: [Function, Array] as PropType<MaybeArray<OnUpdateModelValue>>,
  onExpandedNamesChange: [Function, Array] as PropType<
  MaybeArray<OnUpdateKeys>
  >,
  expandedNames: Array as PropType<Key[]>,
  defaultExpandedNames: Array as PropType<Key[]>,
  dropdownPlacement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom'
  }
} as const

export type MenuSetupProps = ExtractPropTypes<typeof menuProps>

export type MenuProps = Partial<MenuSetupProps>

export default defineComponent({
  name: 'Menu',
  props: menuProps,
  setup (props) {
    if (__DEV__) {
      useCheckDeprecated(props)
    }
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Menu',
      '-menu',
      style,
      menuLight,
      props,
      mergedClsPrefixRef
    )

    const layoutSider = inject(layoutSiderInjectionKey, null)

    const mergedCollapsedRef = computed(() => {
      const { collapsed } = props
      if (collapsed !== undefined) return collapsed
      if (layoutSider) {
        const { collapseModeRef, collapsedRef } = layoutSider
        if (collapseModeRef.value === 'width') {
          return collapsedRef.value ?? false
        }
      }
      return false
    })

    const treeMateRef = computed(() => {
      const { keyField, childrenField, disabledField } = props
      return createTreeMate<MenuOption, MenuGroupOption, MenuIgnoredOption>(
        props.items || props.options,
        {
          getIgnored (node) {
            return isIgnoredNode(node)
          },
          getChildren (node) {
            return node[childrenField]
          },
          getDisabled (node) {
            return (node as any)[disabledField]
          },
          getKey (node) {
            return (node[keyField] as Key) ?? node.name
          }
        }
      )
    })
    const treeKeysLevelOneRef = computed(
      () => new Set(treeMateRef.value.treeNodes.map((e) => e.key))
    )

    const { watchProps } = props

    const uncontrolledValueRef = ref<Key | null>(null)
    if (watchProps?.includes('defaultModelValue')) {
      watchEffect(() => {
        uncontrolledValueRef.value = props.defaultModelValue
      })
    } else {
      uncontrolledValueRef.value = props.defaultModelValue
    }
    const controlledValueRef = toRef(props, 'modelValue')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const uncontrolledExpandedKeysRef = ref<Key[]>([])
    const initUncontrolledExpandedKeys = (): void => {
      uncontrolledExpandedKeysRef.value = props.defaultExpandAll
        ? treeMateRef.value.getNonLeafKeys()
        : props.defaultExpandedNames ||
          props.defaultExpandedKeys ||
          treeMateRef.value.getPath(mergedValueRef.value, {
            includeSelf: false
          }).keyPath
    }
    if (watchProps?.includes('defaultExpandedKeys')) {
      watchEffect(initUncontrolledExpandedKeys)
    } else {
      initUncontrolledExpandedKeys()
    }
    const controlledExpandedKeysRef = useCompitable(props, [
      'expandedNames',
      'expandedKeys'
    ])
    const mergedExpandedKeysRef = useMergedState(
      controlledExpandedKeysRef,
      uncontrolledExpandedKeysRef
    )
    const tmNodesRef = computed(() => treeMateRef.value.treeNodes)
    const activePathRef = computed(() => {
      return treeMateRef.value.getPath(mergedValueRef.value).keyPath
    })
    provide(menuInjectionKey, {
      props,
      mergedCollapsedRef,
      mergedThemeRef: themeRef,
      mergedValueRef,
      mergedExpandedKeysRef,
      activePathRef,
      mergedClsPrefixRef,
      isHorizontalRef: computed(() => props.mode === 'horizontal'),
      invertedRef: toRef(props, 'inverted'),
      doSelect,
      toggleExpand
    })
    function doSelect (value: Key, item: MenuOption): void {
      const {
        'onUpdate:modelValue': _onUpdateModelValue,
        onUpdateModelValue,
        onSelect
      } = props
      if (onUpdateModelValue) {
        call(onUpdateModelValue as OnUpdateModelValueImpl, value, item)
      }
      if (_onUpdateModelValue) {
        call(_onUpdateModelValue as OnUpdateModelValueImpl, value, item)
      }
      if (onSelect) {
        call(onSelect as OnUpdateModelValueImpl, value, item)
      }
      uncontrolledValueRef.value = value
    }
    function doUpdateExpandedKeys (value: Key[]): void {
      const {
        'onUpdate:expandedKeys': _onUpdateExpandedKeys,
        onUpdateExpandedKeys,
        onExpandedNamesChange,
        onOpenNamesChange
      } = props
      if (_onUpdateExpandedKeys) {
        call(_onUpdateExpandedKeys as OnUpdateKeysImpl, value)
      }
      if (onUpdateExpandedKeys) {
        call(onUpdateExpandedKeys as OnUpdateKeysImpl, value)
      }
      // deprecated
      if (onExpandedNamesChange) {
        call(onExpandedNamesChange as OnUpdateKeysImpl, value)
      }
      if (onOpenNamesChange) {
        call(onOpenNamesChange as OnUpdateKeysImpl, value)
      }
      uncontrolledExpandedKeysRef.value = value
    }
    function toggleExpand (key: Key): void {
      const currentExpandedKeys = Array.from(mergedExpandedKeysRef.value)
      const index = currentExpandedKeys.findIndex(
        (expanededKey) => expanededKey === key
      )
      if (~index) {
        currentExpandedKeys.splice(index, 1)
      } else {
        if (props.accordion) {
          if (treeKeysLevelOneRef.value.has(key)) {
            const closeKeyIndex = currentExpandedKeys.findIndex((e) =>
              treeKeysLevelOneRef.value.has(e)
            )
            if (closeKeyIndex > -1) {
              currentExpandedKeys.splice(closeKeyIndex, 1)
            }
          }
        }
        currentExpandedKeys.push(key)
      }
      doUpdateExpandedKeys(currentExpandedKeys)
    }
    const showOption: MenuInst['showOption'] = (key?: Key): void => {
      const selectedKeyPath = treeMateRef.value.getPath(
        key ?? mergedValueRef.value,
        {
          includeSelf: false
        }
      ).keyPath
      if (!selectedKeyPath.length) return
      const currentExpandedKeys = Array.from(mergedExpandedKeysRef.value)
      const nextExpandedKeys = new Set([
        ...currentExpandedKeys,
        ...selectedKeyPath
      ])
      if (props.accordion) {
        treeKeysLevelOneRef.value.forEach((firstLevelKey) => {
          if (
            nextExpandedKeys.has(firstLevelKey) &&
            !selectedKeyPath.includes(firstLevelKey)
          ) {
            nextExpandedKeys.delete(firstLevelKey)
          }
        })
      }
      doUpdateExpandedKeys(Array.from(nextExpandedKeys))
    }
    const cssVarsRef = computed(() => {
      const { inverted, mode } = props
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const { borderRadius, borderColorHorizontal, fontSize, itemHeight } = self
      const vars: any = {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-font-size': fontSize,
        '--z-border-color-horizontal': borderColorHorizontal,
        '--z-border-radius': borderRadius
      }
      if (mode !== 'horizontal') {
        vars['--z-item-height'] = itemHeight
        if (inverted) {
          vars['--z-divider-color'] = self.dividerColorInverted
          vars['--z-group-text-color'] = self.groupTextColorInverted
          vars['--z-color'] = self.colorInverted
          vars['--z-item-text-color'] = self.itemTextColorInverted
          vars['--z-item-text-color-hover'] = self.itemTextColorHoverInverted
          vars['--z-item-text-color-active'] = self.itemTextColorActiveInverted
          vars['--z-item-text-color-child-active'] =
            self.itemTextColorChildActiveInverted
          vars['--z-item-text-color-child-active-hover'] =
            self.itemTextColorChildActiveInverted
          vars['--z-item-text-color-active-hover'] =
            self.itemTextColorActiveHoverInverted
          vars['--z-item-icon-color'] = self.itemIconColorInverted
          vars['--z-item-icon-color-hover'] = self.itemIconColorHoverInverted
          vars['--z-item-icon-color-active'] = self.itemIconColorActiveInverted
          vars['--z-item-icon-color-active-hover'] =
            self.itemIconColorActiveHoverInverted
          vars['--z-item-icon-color-child-active'] =
            self.itemIconColorChildActiveInverted
          vars['--z-item-icon-color-child-active-hover'] =
            self.itemIconColorChildActiveHoverInverted
          vars['--z-item-icon-color-collapsed'] =
            self.itemIconColorCollapsedInverted
          vars['--z-item-text-color-horizontal'] =
            self.itemTextColorHorizontalInverted
          vars['--z-item-text-color-hover-horizontal'] =
            self.itemTextColorHoverHorizontalInverted
          vars['--z-item-text-color-active-horizontal'] =
            self.itemTextColorActiveHorizontalInverted
          vars['--z-item-text-color-child-active-horizontal'] =
            self.itemTextColorChildActiveHorizontalInverted
          vars['--z-item-text-color-child-active-hover-horizontal'] =
            self.itemTextColorChildActiveHoverHorizontalInverted
          vars['--z-item-text-color-active-hover-horizontal'] =
            self.itemTextColorActiveHoverHorizontalInverted
          vars['--z-item-icon-color-horizontal'] =
            self.itemIconColorHorizontalInverted
          vars['--z-item-icon-color-hover-horizontal'] =
            self.itemIconColorHoverHorizontalInverted
          vars['--z-item-icon-color-active-horizontal'] =
            self.itemIconColorActiveHorizontalInverted
          vars['--z-item-icon-color-active-hover-horizontal'] =
            self.itemIconColorActiveHoverHorizontalInverted
          vars['--z-item-icon-color-child-active-horizontal'] =
            self.itemIconColorChildActiveHorizontalInverted
          vars['--z-item-icon-color-child-active-hover-horizontal'] =
            self.itemIconColorChildActiveHoverHorizontalInverted
          vars['--z-arrow-color'] = self.arrowColorInverted
          vars['--z-arrow-color-hover'] = self.arrowColorHoverInverted
          vars['--z-arrow-color-active'] = self.arrowColorActiveInverted
          vars['--z-arrow-color-active-hover'] =
            self.arrowColorActiveHoverInverted
          vars['--z-arrow-color-child-active'] =
            self.arrowColorChildActiveInverted
          vars['--z-arrow-color-child-active-hover'] =
            self.arrowColorChildActiveHoverInverted
          vars['--z-item-color-hover'] = self.itemColorHoverInverted
          vars['--z-item-color-active'] = self.itemColorActiveInverted
          vars['--z-item-color-active-hover'] =
            self.itemColorActiveHoverInverted
          vars['--z-item-color-active-collapsed'] =
            self.itemColorActiveCollapsedInverted
        } else {
          vars['--z-divider-color'] = self.dividerColor
          vars['--z-group-text-color'] = self.groupTextColor
          vars['--z-color'] = self.color
          vars['--z-item-text-color'] = self.itemTextColor
          vars['--z-item-text-color-hover'] = self.itemTextColorHover
          vars['--z-item-text-color-active'] = self.itemTextColorActive
          vars['--z-item-text-color-child-active'] =
            self.itemTextColorChildActive
          vars['--z-item-text-color-child-active-hover'] =
            self.itemTextColorChildActiveHover
          vars['--z-item-text-color-active-hover'] =
            self.itemTextColorActiveHover
          vars['--z-item-icon-color'] = self.itemIconColor
          vars['--z-item-icon-color-hover'] = self.itemIconColorHover
          vars['--z-item-icon-color-active'] = self.itemIconColorActive
          vars['--z-item-icon-color-active-hover'] =
            self.itemIconColorActiveHover
          vars['--z-item-icon-color-child-active'] =
            self.itemIconColorChildActive
          vars['--z-item-icon-color-child-active-hover'] =
            self.itemIconColorChildActiveHover
          vars['--z-item-icon-color-collapsed'] = self.itemIconColorCollapsed
          vars['--z-item-text-color-horizontal'] = self.itemTextColorHorizontal
          vars['--z-item-text-color-hover-horizontal'] =
            self.itemTextColorHoverHorizontal
          vars['--z-item-text-color-active-horizontal'] =
            self.itemTextColorActiveHorizontal
          vars['--z-item-text-color-child-active-horizontal'] =
            self.itemTextColorChildActiveHorizontal
          vars['--z-item-text-color-child-active-hover-horizontal'] =
            self.itemTextColorChildActiveHoverHorizontal
          vars['--z-item-text-color-active-hover-horizontal'] =
            self.itemTextColorActiveHoverHorizontal
          vars['--z-item-icon-color-horizontal'] = self.itemIconColorHorizontal
          vars['--z-item-icon-color-hover-horizontal'] =
            self.itemIconColorHoverHorizontal
          vars['--z-item-icon-color-active-horizontal'] =
            self.itemIconColorActiveHorizontal
          vars['--z-item-icon-color-active-hover-horizontal'] =
            self.itemIconColorActiveHoverHorizontal
          vars['--z-item-icon-color-child-active-horizontal'] =
            self.itemIconColorChildActiveHorizontal
          vars['--z-item-icon-color-child-active-hover-horizontal'] =
            self.itemIconColorChildActiveHoverHorizontal
          vars['--z-arrow-color'] = self.arrowColor
          vars['--z-arrow-color-hover'] = self.arrowColorHover
          vars['--z-arrow-color-active'] = self.arrowColorActive
          vars['--z-arrow-color-active-hover'] = self.arrowColorActiveHover
          vars['--z-arrow-color-child-active'] = self.arrowColorChildActive
          vars['--z-arrow-color-child-active-hover'] =
            self.arrowColorChildActiveHover
          vars['--z-item-color-hover'] = self.itemColorHover
          vars['--z-item-color-active'] = self.itemColorActive
          vars['--z-item-color-active-hover'] = self.itemColorActiveHover
          vars['--z-item-color-active-collapsed'] =
            self.itemColorActiveCollapsed
        }
      } else {
        vars['--z-item-height'] = self.itemHorizontalHeight
        if (inverted) {
          vars['--z-color'] = self.colorInverted
          vars['--z-item-text-color'] = self.itemTextColorHorizontalInverted
          vars['--z-item-text-color-horizontal'] =
            self.itemTextColorHorizontalInverted
          vars['--z-arrow-color-child-active'] =
            self.arrowColorChildActiveInverted
          vars['--z-arrow-color'] = self.arrowColorInverted
          vars['--z-arrow-color-hover'] = self.arrowColorHoverInverted
          vars['--z-arrow-color-active'] = self.arrowColorActiveInverted
          vars['--z-arrow-color-active-hover'] =
            self.arrowColorActiveHoverInverted
          vars['--z-arrow-color-child-active-hover'] =
            self.arrowColorChildActiveHoverInverted
          vars['--z-item-text-color-child-active-horizontal'] =
            self.itemTextColorChildActiveHorizontalInverted
          vars['--z-item-icon-color-child-active-horizontal'] =
            self.itemIconColorChildActiveHorizontalInverted
          vars['--z-item-icon-color-child-active-hover-horizontal'] =
            self.itemIconColorChildActiveHoverHorizontalInverted
          vars['--z-item-text-color-child-active-hover-horizontal'] =
            self.itemTextColorChildActiveHoverHorizontalInverted
          vars['--z-item-icon-color-active-horizontal'] =
            self.itemIconColorActiveHorizontalInverted
          vars['--z-item-text-color-active-horizontal'] =
            self.itemTextColorActiveHorizontalInverted
          vars['--z-item-icon-color-active-hover-horizontal'] =
            self.itemIconColorActiveHoverHorizontalInverted
          vars['--z-item-text-color-active-hover-horizontal'] =
            self.itemTextColorActiveHoverHorizontalInverted
          vars['--z-item-hover-active-horizontal'] =
            self.itemHoverActiveHorizontalInverted
          vars['--z-item-hover-horizontal'] = self.itemHoverHorizontalInverted
          vars['--z-item-selected-horizontal'] =
            self.itemSelectedHorizontalInverted
        } else {
          vars['--z-color'] = self.color
          vars['--z-item-text-color'] = self.itemTextColorHorizontal
          vars['--z-item-text-color-horizontal'] = self.itemTextColorHorizontal
          vars['--z-arrow-color-child-active'] = self.arrowColorChildActive
          vars['--z-arrow-color'] = self.arrowColor
          vars['--z-arrow-color-hover'] = self.arrowColorHover
          vars['--z-arrow-color-active'] = self.arrowColorActive
          vars['--z-arrow-color-active-hover'] = self.arrowColorActiveHover
          vars['--z-arrow-color-child-active-hover'] =
            self.arrowColorChildActiveHover
          vars['--z-item-text-color-child-active-horizontal'] =
            self.itemTextColorChildActiveHorizontal
          vars['--z-item-icon-color-child-active-horizontal'] =
            self.itemIconColorChildActiveHorizontal
          vars['--z-item-icon-color-child-active-hover-horizontal'] =
            self.itemIconColorChildActiveHoverHorizontal
          vars['--z-item-text-color-child-active-hover-horizontal'] =
            self.itemTextColorChildActiveHoverHorizontal
          vars['--z-item-icon-color-active-horizontal'] =
            self.itemIconColorActiveHorizontal
          vars['--z-item-text-color-active-horizontal'] =
            self.itemTextColorActiveHorizontal
          vars['--z-item-icon-color-active-hover-horizontal'] =
            self.itemIconColorActiveHoverHorizontal
          vars['--z-item-text-color-active-hover-horizontal'] =
            self.itemTextColorActiveHoverHorizontal
          vars['--z-item-hover-active-horizontal'] =
            self.itemHoverActiveHorizontal
          vars['--z-item-hover-horizontal'] = self.itemHoverHorizontal
          vars['--z-item-selected-horizontal'] = self.itemSelectedHorizontal
        }
      }
      return vars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'menu',
        computed(() => (props.inverted ? 'a' : 'b')),
        cssVarsRef,
        props
      )
      : undefined
    const ellipsisNodeId = createId()
    const overflowRef = ref<VOverflowInst | null>(null)
    const counterRef = ref<HTMLElement | null>(null)
    let isFirstResize = true
    const onResize = (): void => {
      if (isFirstResize) {
        isFirstResize = false
      } else {
        ;(overflowRef.value as any)?.sync({
          showAllItemsBeforeCalculate: true
        })
      }
    }
    function getCounter (): HTMLElement | null {
      return document.getElementById(ellipsisNodeId)
    }
    const ellipsisFromIndexRef = ref(-1)
    function onUpdateCount (count: number): void {
      ellipsisFromIndexRef.value = props.options.length - count
    }
    function onUpdateOverflow (overflow: boolean): void {
      if (!overflow) {
        ellipsisFromIndexRef.value = -1
      }
    }
    const ellipsisOptionRef = computed<MenuOption>(() => {
      const ellipsisFromIndex = ellipsisFromIndexRef.value
      const option: MenuOption = {
        children:
          ellipsisFromIndex === -1 ? [] : props.options.slice(ellipsisFromIndex)
      }
      return option
    })
    const ellipsisTreeMateRef = computed(() => {
      const { childrenField, disabledField, keyField } = props
      return createTreeMate<MenuOption, MenuGroupOption, MenuIgnoredOption>(
        [ellipsisOptionRef.value],
        {
          getIgnored (node) {
            return isIgnoredNode(node)
          },
          getChildren (node) {
            return node[childrenField]
          },
          getDisabled (node) {
            return (node as any)[disabledField]
          },
          getKey (node) {
            return (node[keyField] as Key) ?? node.name
          }
        }
      )
    })
    const emptyTmNodeRef = computed(() => {
      return createTreeMate<MenuOption, MenuGroupOption, MenuIgnoredOption>([
        {}
      ]).treeNodes[0]
    })
    function renderCounter (): VNodeChild {
      if (ellipsisFromIndexRef.value === -1) {
        // Only a placeholder
        return (
          <ZSubmenu
            root
            level={0}
            key="__ellpisisGroupPlaceholder__"
            internalKey="__ellpisisGroupPlaceholder__"
            title="More"
            tmNode={emptyTmNodeRef.value}
            domId={ellipsisNodeId}
            isEllipsisPlaceholder
          />
        )
      }
      const tmNode = ellipsisTreeMateRef.value.treeNodes[0]
      const activePath = activePathRef.value
      const childActive = !!tmNode.children?.some((tmNode) => {
        return activePath.includes(tmNode.key)
      })
      return (
        <ZSubmenu
          level={0}
          root
          key="__ellpisisGroup__"
          internalKey="__ellpisisGroup__"
          title="More"
          virtualChildActive={childActive}
          tmNode={tmNode}
          domId={ellipsisNodeId}
          rawNodes={(tmNode.rawNode as MenuOption).children || []}
          tmNodes={tmNode.children || []}
          isEllipsisPlaceholder
        />
      )
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      controlledExpandedKeys: controlledExpandedKeysRef,
      uncontrolledExpanededKeys: uncontrolledExpandedKeysRef,
      mergedExpandedKeys: mergedExpandedKeysRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      activePath: activePathRef,
      tmNodes: tmNodesRef,
      mergedTheme: themeRef,
      mergedCollapsed: mergedCollapsedRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      overflowRef,
      counterRef,
      updateCounter: () => {},
      onResize,
      onUpdateOverflow,
      onUpdateCount,
      renderCounter,
      getCounter,
      showOption,
      deriveResponsiveState: onResize
    }
  },
  render () {
    const { mergedClsPrefix, mode, themeClass, onRender } = this
    const horizontal = mode === 'horizontal'
    const finalResponsive = horizontal && this.responsive
    onRender?.()
    const header = resolveWrappedSlot(
      this.$slots.header,
      (children) =>
        children && (
          <div class={[`${mergedClsPrefix}-menu--header`]}>{children}</div>
        )
    )
    const renderMenuItemNodes = (): VNodeChild[] =>
      this.tmNodes.map((tmNode) => itemRenderer(tmNode, this.$props))
    const renderMainNode = (): VNode => (
      <div
        role={mode === 'horizontal' ? 'menubar' : 'menu'}
        class={[
          `${mergedClsPrefix}-menu`,
          themeClass,
          `${mergedClsPrefix}-menu--${mode}`,
          finalResponsive && `${mergedClsPrefix}-menu--responsive`,
          this.mergedCollapsed && `${mergedClsPrefix}-menu--collapsed`
        ]}
        style={this.cssVars as any}
      >
        {header}
        {finalResponsive ? (
          <VOverflow
            ref="overflowRef"
            onUpdateOverflow={this.onUpdateOverflow}
            getCounter={this.getCounter}
            onUpdateCount={this.onUpdateCount}
            updateCounter={this.updateCounter}
            style={{
              width: '100%',
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            {{
              default: renderMenuItemNodes,
              counter: this.renderCounter
            }}
          </VOverflow>
        ) : (
          renderMenuItemNodes()
        )}
      </div>
    )
    return finalResponsive ? (
      <VResizeObserver onResize={this.onResize}>
        {{ default: renderMainNode }}
      </VResizeObserver>
    ) : (
      renderMainNode()
    )
  }
})
