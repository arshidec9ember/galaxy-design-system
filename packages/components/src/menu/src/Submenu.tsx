import {
  h,
  ref,
  defineComponent,
  type PropType,
  provide,
  computed,
  type VNode,
  type VNodeChild
} from 'vue'
import { useMemo } from '../../_external-dependencies/vooks'
import { ZFadeInExpandTransition } from '../../_internal'
import { ZDropdown } from '../../dropdown'
import ZMenuOptionContent from './MenuOptionContent'
// eslint-disable-next-line import/no-cycle
import { itemRenderer } from './utils'
import { useMenuChild } from './use-menu-child'
import { useMenuChildProps } from './use-menu-child-props'
import type { MenuMixedOption, TmNode } from './interface'
import { menuItemGroupInjectionKey, submenuInjectionKey } from './context'

export const submenuProps = {
  ...useMenuChildProps,
  rawNodes: {
    type: Array as PropType<MenuMixedOption[]>,
    default: () => []
  },
  tmNodes: {
    type: Array as PropType<TmNode[]>,
    default: () => []
  },
  tmNode: {
    type: Object as PropType<TmNode>,
    required: true
  },
  disabled: Boolean,
  icon: Function as PropType<() => VNodeChild>,
  onClick: Function as PropType<() => void>,
  domId: String,
  virtualChildActive: {
    type: Boolean,
    default: undefined
  },
  isEllipsisPlaceholder: Boolean
} as const

export const ZSubmenu = defineComponent({
  name: 'Submenu',
  props: submenuProps,
  setup (props) {
    const MenuChild = useMenuChild(props)
    const { ZMenu, ZSubmenu } = MenuChild
    const { props: menuProps, mergedCollapsedRef, mergedThemeRef } = ZMenu
    const mergedDisabledRef = computed(() => {
      const { disabled } = props
      if (ZSubmenu?.mergedDisabledRef.value) return true
      if (menuProps.disabled) return true
      return disabled
    })
    const dropdownShowRef = ref(false)
    provide(submenuInjectionKey, {
      paddingLeftRef: MenuChild.paddingLeft,
      mergedDisabledRef
    })
    provide(menuItemGroupInjectionKey, null)
    function doClick (): void {
      const { onClick } = props
      if (onClick) onClick()
    }
    function handleClick (): void {
      if (!mergedDisabledRef.value) {
        if (!mergedCollapsedRef.value) {
          ZMenu.toggleExpand(props.internalKey)
        }
        doClick()
      }
    }
    function handlePopoverShowChange (value: boolean): void {
      dropdownShowRef.value = value
    }
    return {
      menuProps,
      mergedTheme: mergedThemeRef,
      doSelect: ZMenu.doSelect,
      inverted: ZMenu.invertedRef,
      isHorizontal: ZMenu.isHorizontalRef,
      mergedClsPrefix: ZMenu.mergedClsPrefixRef,
      maxIconSize: MenuChild.maxIconSize,
      activeIconSize: MenuChild.activeIconSize,
      iconMarginRight: MenuChild.iconMarginRight,
      dropdownPlacement: MenuChild.dropdownPlacement,
      dropdownShow: dropdownShowRef,
      paddingLeft: MenuChild.paddingLeft,
      mergedDisabled: mergedDisabledRef,
      mergedValue: ZMenu.mergedValueRef,
      childActive: useMemo(() => {
        return (
          props.virtualChildActive ??
          ZMenu.activePathRef.value.includes(props.internalKey)
        )
      }),
      collapsed: computed(() => {
        if (menuProps.mode === 'horizontal') return false
        if (mergedCollapsedRef.value) {
          return true
        }
        return !ZMenu.mergedExpandedKeysRef.value.includes(props.internalKey)
      }),
      dropdownEnabled: computed(() => {
        return (
          !mergedDisabledRef.value &&
          (menuProps.mode === 'horizontal' || mergedCollapsedRef.value)
        )
      }),
      handlePopoverShowChange,
      handleClick
    }
  },
  render () {
    const {
      mergedClsPrefix,
      menuProps: { renderIcon, renderLabel }
    } = this
    const createSubmenuItem = (): VNode => {
      const {
        paddingLeft,
        collapsed,
        mergedDisabled,
        maxIconSize,
        activeIconSize,
        title,
        childActive,
        icon,
        handleClick,
        menuProps: { nodeProps },
        dropdownShow,
        iconMarginRight,
        tmNode,
        mergedClsPrefix,
        isEllipsisPlaceholder
      } = this
      const attrs = nodeProps?.(tmNode.rawNode)
      return (
        <div
          {...attrs}
          class={[`${mergedClsPrefix}-menu-item`, attrs?.class]}
          role="menuitem"
        >
          <ZMenuOptionContent
            tmNode={tmNode}
            paddingLeft={paddingLeft}
            collapsed={collapsed}
            isHorizontal={this.isHorizontal}
            disabled={mergedDisabled}
            iconMarginRight={iconMarginRight}
            maxIconSize={maxIconSize}
            activeIconSize={activeIconSize}
            title={title}
            end={this.end}
            showArrow={true}
            childActive={childActive}
            clsPrefix={mergedClsPrefix}
            icon={icon}
            hover={dropdownShow}
            onClick={handleClick}
            isEllipsisPlaceholder={isEllipsisPlaceholder}
          />
        </div>
      )
    }
    const createSubmenuChildren = (): VNode => {
      return (
        <ZFadeInExpandTransition>
          {{
            default: () => {
              const { tmNodes, collapsed } = this
              return !collapsed ? (
                <div class={`${mergedClsPrefix}-submenu-children`} role="menu">
                  {tmNodes.map((item) => itemRenderer(item, this.menuProps))}
                </div>
              ) : null
            }
          }}
        </ZFadeInExpandTransition>
      )
    }
    return this.root ? (
      <ZDropdown
        size="medium"
        trigger="click"
        {...this.menuProps?.dropdownProps}
        themeOverrides={this.mergedTheme.peerOverrides.Dropdown}
        theme={this.mergedTheme.peers.Dropdown}
        builtinThemeOverrides={{
          fontSizeLarge: '14px',
          optionIconSizeLarge: '18px'
        }}
        value={this.mergedValue}
        disabled={!this.dropdownEnabled}
        placement={this.dropdownPlacement}
        keyField={this.menuProps.keyField}
        labelField={this.menuProps.labelField}
        childrenField={this.menuProps.childrenField}
        onUpdateShow={this.handlePopoverShowChange}
        options={this.rawNodes}
        onSelect={this.doSelect}
        renderOptionIcon={renderIcon}
        renderOptionLabel={renderLabel}
      >
        {{
          default: () => (
            <div
              class={`${mergedClsPrefix}-submenu`}
              role="menuitem"
              aria-expanded={!this.collapsed}
              id={this.domId}
            >
              {createSubmenuItem()}
              {this.isHorizontal ? null : createSubmenuChildren()}
            </div>
          )
        }}
      </ZDropdown>
    ) : (
      <div
        class={`${mergedClsPrefix}-submenu`}
        role="menuitem"
        aria-expanded={!this.collapsed}
        id={this.domId}
      >
        {createSubmenuItem()}
        {createSubmenuChildren()}
      </div>
    )
  }
})
