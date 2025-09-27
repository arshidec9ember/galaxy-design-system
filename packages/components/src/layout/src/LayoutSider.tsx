import {
  h,
  defineComponent,
  computed,
  type PropType,
  ref,
  type CSSProperties,
  toRef,
  inject,
  provide,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch
} from 'vue'
import { useMergedState } from '../../_external-dependencies/vooks'
import {
  useConfig,
  useProxyModel,
  useTheme,
  useThemeClass
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  formatLength,
  call,
  warn,
  useReactivated,
  toPX,
  useReactiveProp
} from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { ZScrollbar } from '../../_internal'
import { ZIcon } from '../../icon'
import { MoreVertical } from '../../_internal/icons'
import type { ScrollbarProps, ScrollbarInst } from '../../_internal'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import style from './styles/layout-sider.cssr'
import ToggleButton from './ToggleButton'
import ToggleBar from './ToggleBar'
import {
  layoutSiderInjectionKey,
  type LayoutSiderInst,
  positionProp
} from './interface'
import { layoutInjectionKey } from './Layout'

export const layoutSiderProps = {
  position: positionProp,
  bordered: Boolean,
  collapsedWidth: {
    type: Number,
    default: 16
  },
  width: {
    type: [Number, String] as PropType<string | number>,
    default: 272
  },
  minResizableWidth: {
    type: [Number, String] as PropType<string | number>
  },
  maxResizableWidth: {
    type: [Number, String] as PropType<string | number>
  },
  contentStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: ''
  },
  overlay: {
    type: Boolean,
    default: false
  },
  resizable: {
    type: Boolean,
    default: false
  },
  collapseMode: {
    type: String as PropType<'width' | 'transform'>,
    default: 'transform'
  },
  collapsed: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  defaultCollapsed: Boolean,
  showCollapsedContent: {
    type: Boolean,
    default: true
  },
  showTrigger: {
    type: [Boolean, String] as PropType<boolean | 'arrow-circle' | 'bar'>,
    default: false
  },
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  alignment: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  inverted: Boolean,
  scrollbarProps: Object as PropType<
  Partial<ScrollbarProps> & { style: CSSProperties }
  >,
  triggerStyle: [String, Object] as PropType<string | CSSProperties>,
  collapsedTriggerStyle: [String, Object] as PropType<string | CSSProperties>,
  'onUpdate:collapsed': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onUpdateCollapsed: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onAfterEnter: Function as PropType<() => void>,
  onAfterLeave: Function as PropType<() => void>,
  // deprecated
  onExpand: [Function, Array] as PropType<MaybeArray<() => void>>,
  onCollapse: [Function, Array] as PropType<MaybeArray<() => void>>,
  onScroll: Function as PropType<(e: Event) => void>
} as const

export type LayoutSiderProps = ExtractPublicPropTypes<typeof layoutSiderProps>

export default defineComponent({
  name: 'LayoutSider',
  props: {
    ...(useTheme.props as ThemeProps<LayoutTheme>),
    ...layoutSiderProps
  },
  setup (props) {
    const widthRef = useReactiveProp(() => props.width)
    const resizeRef = useReactiveProp(() => props.resizable)
    const overlayRef = useReactiveProp(() => props.overlay)
    const showTriggerRef = useReactiveProp(() => props.showTrigger)
    const initialWidthRef = ref(props.width)
    const layoutProps = inject(layoutInjectionKey)
    if (__DEV__) {
      if (!layoutProps) {
        warn(
          'layout-sider',
          'Layout sider is not allowed to be put outside layout.'
        )
      }
    }
    const scrollableElRef = ref<HTMLElement | null>(null)
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)
    const styleWidthRef = computed(() => {
      return formatLength(
        mergedCollapsedRef.value ? props.collapsedWidth : widthRef.value
      )
    })
    const scrollContainerStyleRef = computed<CSSProperties>(() => {
      if (props.collapseMode !== 'transform') return {}
      return {
        minWidth: formatLength(props.width)
      }
    })
    const controlledCollapsedRef = useProxyModel(props, 'collapsed')
    const uncontrolledCollapsedRef = ref(props.defaultCollapsed)
    const mergedCollapsedRef = useMergedState(
      controlledCollapsedRef,
      uncontrolledCollapsedRef
    )
    function expandToFullWidth (): void {
      if (resizableRef.value?.previousElementSibling && !props.overlay) {
        const contentEl: any = resizableRef.value?.previousElementSibling
        contentEl.style.visibility = 'hidden'
      }
      widthRef.value = '100%'
      resizeRef.value = false
      showTriggerRef.value = false
      overlayRef.value = true
    }
    function collapseToInitialWidth (): void {
      widthRef.value = initialWidthRef.value
      setTimeout(() => {
        if (resizableRef.value?.previousElementSibling && !props.overlay) {
          const contentEl: any = resizableRef.value?.previousElementSibling
          contentEl.style.visibility = 'visible'
        }
        overlayRef.value = props.overlay
        resizeRef.value = true
        showTriggerRef.value = true
      }, 200)
    }
    function close (): void {
      widthRef.value = '0%'
      resizeRef.value = false
      showTriggerRef.value = false
    }
    function scrollTo (options: ScrollToOptions): void
    function scrollTo (x: number, y: number): void
    function scrollTo (options: ScrollToOptions | number, y?: number): void {
      if (props.nativeScrollbar) {
        const { value: scrollableEl } = scrollableElRef
        if (scrollableEl) {
          if (y === undefined) {
            scrollableEl.scrollTo(options as any)
          } else {
            scrollableEl.scrollTo(options as any, y as any)
          }
        }
      } else {
        const { value: scrollbarInst } = scrollbarInstRef
        if (scrollbarInst) {
          scrollbarInst.scrollTo(options as any, y as any)
        }
      }
    }
    function handleTriggerClick (): void {
      const { onExpand, onCollapse } = props
      const { value: collapsed } = mergedCollapsedRef
      controlledCollapsedRef.value = !collapsed
      uncontrolledCollapsedRef.value = !collapsed
      if (collapsed) {
        if (onExpand) call(onExpand)
      } else {
        if (onCollapse) call(onCollapse)
      }
    }
    let scrollX = 0
    let scrollY = 0
    const handleNativeElScroll = (e: Event): void => {
      const target = e.target as HTMLElement
      scrollX = target.scrollLeft
      scrollY = target.scrollTop
      props.onScroll?.(e)
    }
    useReactivated(() => {
      if (props.nativeScrollbar) {
        const el = scrollableElRef.value
        if (el) {
          el.scrollTop = scrollY
          el.scrollLeft = scrollX
        }
      }
    })
    provide(layoutSiderInjectionKey, {
      collapsedRef: mergedCollapsedRef,
      collapseModeRef: toRef(props, 'collapseMode'),
      widthRef,
      expandToFullWidth,
      collapseToInitialWidth,
      close
    })
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Layout',
      '-layout-sider',
      style,
      layoutLight,
      props,
      mergedClsPrefixRef
    )

    function handleTransitionend (e: TransitionEvent): void {
      if (e.propertyName === 'width') {
        if (mergedCollapsedRef.value) {
          props.onAfterLeave?.()
        } else {
          props.onAfterEnter?.()
        }
      }
    }

    function percentageToPx (
      value: string | number,
      parentWidth: number
    ): number {
      if (/^\d+%$/.test(String(value))) {
        return (parseInt(String(value)) / 100) * parentWidth
      }
      return Number(toPX(value))
    }

    // resizing logic
    const resizableRef = ref<HTMLElement | null>(null)
    const triggerRef = ref<HTMLElement | null>(null)
    const resizeBarRef = ref<HTMLElement | null>(null)
    const resizing = ref(false)
    const startX = ref(0)
    const initialWidth = ref(0)
    const inputWidth = ref()
    const handleMouseDown = (event: MouseEvent): void => {
      if (resizeRef.value && resizableRef.value && resizeBarRef.value) {
        resizing.value = true
        startX.value = event.pageX
        inputWidth.value = inputWidth.value ?? resizableRef.value.offsetWidth
        initialWidth.value = resizableRef.value.offsetWidth
        resizeBarRef.value.style.visibility = 'visible'
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }
    }

    const handleMouseMove = (event: MouseEvent): void => {
      if (
        resizing.value &&
        resizeRef.value &&
        resizableRef.value &&
        resizeBarRef.value &&
        widthRef.value
      ) {
        const offsetX = event.pageX - startX.value
        // Check the alignment prop to determine whether to resize to the left or right
        const newWidth =
          props.alignment === 'left'
            ? initialWidth.value + offsetX
            : initialWidth.value - offsetX
        let maxResizableWidth = Infinity
        let minResizableWidth = 0
        const parentEl = resizableRef.value.parentElement
        const currentSiderEl = resizableRef.value
        if (parentEl) {
          const parentWidth = parentEl.offsetWidth
          // setting the minimum and maximum resizable width depending the props
          minResizableWidth = props.minResizableWidth
            ? percentageToPx(props.minResizableWidth, parentWidth)
            : 0
          maxResizableWidth = props.maxResizableWidth
            ? percentageToPx(props.maxResizableWidth, parentWidth)
            : percentageToPx('100%', parentWidth)
          // setting logic to show right sider as overlay if other sider coincides with it
          const leftSiderEl =
            currentSiderEl.previousElementSibling?.previousElementSibling
          if (leftSiderEl && !props.overlay && props.alignment === 'right') {
            if (
              currentSiderEl?.getBoundingClientRect().left - 20 <
              leftSiderEl?.getBoundingClientRect().right
            ) {
              resizableRef.value.classList.add('show-overlay')
            } else {
              resizableRef.value.classList.remove('show-overlay')
            }
          }
        }
        // Update the resizable element's width
        if (newWidth >= minResizableWidth && newWidth <= maxResizableWidth) {
          resizableRef.value.style.width = `${newWidth}px`
        }
        // Update the transition style
        resizableRef.value.style.transition = 'width 0s var(--z-bezier)'
        resizeBarRef.value.style.visibility = 'visible'
      }
    }

    const handleMouseUp = (): void => {
      if (resizing.value && resizeBarRef.value && resizableRef.value) {
        resizing.value = false
        resizeBarRef.value.style.visibility = 'hidden'
        resizableRef.value.style.transition = 'width 0.3s var(--z-bezier)'
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }

    const addMouseDownListener = (): void => {
      if (resizeRef.value && triggerRef.value) {
        triggerRef.value.addEventListener('mousedown', handleMouseDown)
      }
    }

    onMounted(() => {
      addMouseDownListener()
    })

    // Watch for changes in mergedCollapsed and re-add the mousedown event listener when expanded
    watch(
      () => mergedCollapsedRef.value,
      async (newValue) => {
        if (!newValue) {
          await nextTick(() => {})
          addMouseDownListener()
        }
      }
    )
    // Watch for changes in the resizable prop and add or remove the event listener accordingly
    watch(
      () => resizeRef.value,
      async (newResizableValue) => {
        if (newResizableValue) {
          await nextTick(() => {})
          addMouseDownListener()
        } else {
          if (triggerRef.value) {
            triggerRef.value.removeEventListener('mousedown', handleMouseDown)
          }
        }
      }
    )

    onBeforeUnmount(() => {
      if (triggerRef.value) {
        triggerRef.value.removeEventListener('mousedown', handleMouseDown)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    })

    const exposedMethods: LayoutSiderInst = {
      scrollTo
    }

    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const {
        siderToggleButtonColor,
        siderToggleButtonBorder,
        siderToggleBarColor,
        siderToggleBarColorHover,
        siderOverlayShadow,
        siderResizeBarColor,
        siderResizeIconColor,
        siderResizeBorderColor,
        siderResizeTriggerColor,
        siderResizeTriggerHoverColor
      } = self
      const vars: any = {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-toggle-button-color': siderToggleButtonColor,
        '--z-toggle-button-border': siderToggleButtonBorder,
        '--z-toggle-bar-color': siderToggleBarColor,
        '--z-toggle-bar-color-hover': siderToggleBarColorHover,
        '--z-sider-overlay-shadow': siderOverlayShadow,
        '--z-sider-resize-bar-color': siderResizeBarColor,
        '--z-sider-resize-icon-color': siderResizeIconColor,
        '--z-sider-resize-border-color': siderResizeBorderColor,
        '--z-sider-resize-trigger-color': siderResizeTriggerColor,
        '--z-sider-resize-trigger-hover-color': siderResizeTriggerHoverColor
      }
      if (props.inverted) {
        vars['--z-color'] = self.siderColorInverted
        vars['--z-text-color'] = self.textColorInverted
        vars['--z-border-color'] = self.siderBorderColorInverted
        vars['--z-toggle-button-icon-color'] =
          self.siderToggleButtonIconColorInverted
        vars.__invertScrollbar = self.__invertScrollbar
        vars['--z-toggle-button-color'] = self.invertToggleButtonColor
      } else {
        vars['--z-color'] = self.siderColor
        vars['--z-text-color'] = self.textColor
        vars['--z-border-color'] = self.siderBorderColor
        vars['--z-toggle-button-icon-color'] = self.siderToggleButtonIconColor
        vars['--z-toggle-button-color'] = self.toggleButtonColor
      }
      return vars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'layout-sider',
        computed(() => (props.inverted ? 'a' : 'b')),
        cssVarsRef,
        props
      )
      : undefined
    return {
      scrollableElRef,
      scrollbarInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      styleWidth: styleWidthRef,
      mergedCollapsed: mergedCollapsedRef,
      scrollContainerStyle: scrollContainerStyleRef,
      handleNativeElScroll,
      handleTransitionend,
      handleTriggerClick,
      inlineThemeDisabled,
      cssVars: cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      ...exposedMethods,
      resizableRef,
      triggerRef,
      resizeBarRef,
      resizeRef,
      overlayRef,
      showTriggerRef
    }
  },
  render () {
    const { mergedClsPrefix, mergedCollapsed } = this
    this.onRender?.()
    return (
      <aside
        ref="resizableRef"
        class={[
          `${mergedClsPrefix}-layout-sider`,
          this.themeClass,
          `${mergedClsPrefix}-layout-sider--${this.position}-positioned`,
          `${mergedClsPrefix}-layout-sider--${this.alignment}-alignment`,
          this.bordered && `${mergedClsPrefix}-layout-sider--bordered`,
          mergedCollapsed && `${mergedClsPrefix}-layout-sider--collapsed`,
          this.overlayRef && `${mergedClsPrefix}-layout-sider--overlay`,
          (!mergedCollapsed || this.showCollapsedContent) &&
            `${mergedClsPrefix}-layout-sider--show-content`
        ]}
        onTransitionend={this.handleTransitionend}
        style={[
          this.inlineThemeDisabled ? undefined : this.cssVars,
          {
            width: formatLength(this.styleWidth)
          }
        ]}
      >
        {this.resizeRef && !mergedCollapsed ? (
          <div
            ref="triggerRef"
            class={`${mergedClsPrefix}-layout-sider__resize-container`}
          >
            <div class={[`${mergedClsPrefix}-layout-sider__resize-trigger`]}>
              <ZIcon size="16">
                <MoreVertical></MoreVertical>
              </ZIcon>
            </div>
            <div
              ref="resizeBarRef"
              class={[`${mergedClsPrefix}-layout-sider__resize-bar`]}
            />
          </div>
        ) : null}
        {!this.nativeScrollbar ? (
          <ZScrollbar
            {...this.scrollbarProps}
            onScroll={this.onScroll}
            ref="scrollbarInstRef"
            style={this.scrollContainerStyle}
            contentStyle={this.contentStyle}
            theme={this.mergedTheme.peers.Scrollbar}
            themeOverrides={this.mergedTheme.peerOverrides.Scrollbar}
            // here is a hack, since in light theme the scrollbar color is dark,
            // we need to invert it in light color...
            builtinThemeOverrides={
              this.inverted && this.cssVars.__invertScrollbar === 'true'
                ? {
                    colorHover: 'rgba(255, 255, 255, .4)',
                    color: 'rgba(255, 255, 255, .3)'
                  }
                : undefined
            }
          >
            {this.$slots}
          </ZScrollbar>
        ) : (
          <div
            class={`${mergedClsPrefix}-layout-sider-scroll-container`}
            onScroll={this.handleNativeElScroll}
            style={[
              this.scrollContainerStyle,
              {
                overflow: 'auto'
              },
              this.contentStyle
            ]}
            ref="scrollableElRef"
          >
            {this.$slots}
          </div>
        )}
        {this.showTriggerRef ? (
          this.showTriggerRef === 'bar' ? (
            <ToggleBar
              clsPrefix={mergedClsPrefix}
              style={
                mergedCollapsed ? this.collapsedTriggerStyle : this.triggerStyle
              }
              onClick={this.handleTriggerClick}
            />
          ) : (
            <ToggleButton
              clsPrefix={mergedClsPrefix}
              style={
                mergedCollapsed ? this.collapsedTriggerStyle : this.triggerStyle
              }
              onClick={this.handleTriggerClick}
            />
          )
        ) : null}
        {this.bordered ? (
          <div class={`${mergedClsPrefix}-layout-sider__border`} />
        ) : null}
      </aside>
    )
  }
})
