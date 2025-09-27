import {
  h,
  defineComponent,
  computed,
  inject,
  Fragment,
  type PropType,
  type VNodeChild,
  ref,
  watch,
  toRef
} from 'vue'
import { getPadding } from 'seemly'
import { keysOf, render } from '../../_utils'
import { ZBaseClose, ZIconToggle, ZNewTab } from '../../_internal'
import { useConfig, useThemeClass, useRtl } from '../../_mixins'
import { floatingPanelProviderInjectionKey } from './context'
import { ZCollapseTransition } from '../../collapse-transition'
import {
  useDraggable,
  onLongPress,
  syncRefs,
  useElementBounding,
  type Position
} from '@vueuse/core'
import {
  MaximizeIcon,
  MinimizeIcon,
  CloseFullScreenIcon,
  FullScreenSquareIcon
} from '../../_internal/icons'
import { ZTitle } from '../../typography'

export const floatingPanelProps = {
  closable: {
    type: Boolean,
    default: true
  },
  minimizable: {
    type: Boolean,
    default: true
  },
  expandable: {
    type: Boolean,
    default: false
  },
  openInNewTab: {
    type: Boolean,
    default: true
  },
  draggable: {
    type: Boolean,
    default: true
  },
  minimize: {
    type: Boolean,
    default: false
  },
  title: [String, Function] as PropType<string | (() => VNodeChild)>,
  headerEnd: [String, Function] as PropType<string | (() => VNodeChild)>,
  description: [String, Function] as PropType<string | (() => VNodeChild)>,
  content: [String, Function] as PropType<string | (() => VNodeChild)>,
  footer: [String, Function] as PropType<string | (() => VNodeChild)>,
  action: [String, Function] as PropType<string | (() => VNodeChild)>,
  headerStyle: [String, Object] as PropType<string | Record<string, string>>,
  contentStyle: [String, Object] as PropType<string | Record<string, string>>,
  footerStyle: [String, Object] as PropType<string | Record<string, string>>,
  isFullScreen: {
    type: Boolean,
    default: false
  },
  containerElement: {
    type: [String, Object] as PropType<HTMLElement>,
    default: () => document.body
  },
  onClose: {
    type: Function as PropType<() => void>,
    required: true
  },
  dragDelay: {
    type: Number,
    default: 100
  },
  onDrag: {
    type: Function as PropType<
    (event: MouseEvent, params: DragEventParams) => void
    >
  },
  onToggleMinimize: {
    type: Function as PropType<(value: boolean) => void>
  },
  onToggleExpand: {
    type: Function as PropType<(value: boolean) => void>
  },
  onClickOpenInNewTab: {
    type: Function as PropType<() => void>
  },
  onUpdateMinimize: {
    type: Function as PropType<(value: boolean) => void>
  }
} as const

export interface DragEventParams {
  type: DragEventType
  position: Position
}

export type DragEventType = 'start' | 'move' | 'end'

export const floatingPanelPropKeys = keysOf(floatingPanelProps)

export const FloatingPanel = defineComponent({
  name: 'FloatingPanel',
  props: floatingPanelProps,
  setup (props) {
    const {
      mergedClsPrefixRef,
      mergedThemeRef,
      props: providerProps
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(floatingPanelProviderInjectionKey)!
    const { inlineThemeDisabled, mergedRtlRef, mergedGDSTokenRef } = useConfig()
    const minimizeRef = ref(false || props?.minimize)
    const expandRef = ref(props.isFullScreen || false)

    watch(
      () => props.minimize,
      (value) => {
        minimizeRef.value = value
      }
    )

    // expand
    const bodyRef = ref<HTMLElement | null>(null)
    const headerMainRef = ref<HTMLElement | null>(null)

    // TODO: combine these two refs
    const draggableRef = toRef(props, 'draggable')
    const enableDragRef = ref<boolean>(false)
    const dragStyleRef = ref<string | null>(null)
    const dragBehaviourRef = ref<DragEventType | null>(null)

    const dragCursorRef = computed<
    'grabbing' | 'grab' | 'all-scroll' | 'inherit'
    >(() => {
      const dragCursorMap: Record<
      DragEventType,
      'grabbing' | 'grab' | 'all-scroll'
      > = {
        start: 'grabbing',
        end: 'grab',
        move: 'grabbing'
      }

      if (dragBehaviourRef.value && dragBehaviourRef.value in dragCursorMap) {
        return dragCursorMap[dragBehaviourRef.value]
      }
      if (enableDragRef.value) {
        return 'all-scroll'
      }
      return 'inherit'
    })

    const zIndexDragRef = computed(() => {
      const zIndexDragMap = {
        start: 2,
        end: 1,
        move: 2,
        undefined: 0,
        default: 'inherit'
      }

      type ZIndexDragKey = keyof typeof zIndexDragMap
      return (
        zIndexDragMap[dragBehaviourRef.value as ZIndexDragKey] ||
        zIndexDragMap.default
      )
    })

    function handleDrag (
      type: DragEventType,
      position: Position,
      e: PointerEvent
    ): void {
      props.onDrag?.(e, {
        type,
        position
      })
    }

    const isBoxMovingRef = computed(() => {
      return ['move', 'start'].includes(dragBehaviourRef.value as string)
    })

    const rtlEnabledRef = useRtl(
      'FloatingPanel',
      mergedRtlRef,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        self: {
          textColor,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          toggleBorderRadius,
          toggleColorHover,
          toggleColorPressed,
          toggleIconColor,
          toggleIconColorHover,
          toggleIconColorPressed,
          newTabBorderRadius,
          newTabColorHover,
          newTabColorPressed,
          newTabIconColor,
          newTabIconColorHover,
          newTabIconColorPressed,
          headerTextColor,
          actionTextColor,
          borderRadius,
          headerFontWeight,
          boxShadow,
          boxShadowDraggable,
          lineHeight,
          fontSize,
          menuIconMargin,
          menuIconWrapperSize,
          menuIconSize,
          width,
          padding,
          closeBorderRadius,
          closeColorHover,
          closeColorPressed,
          titleFontSize,
          footerFontSize,
          panelDividerColor,
          descriptionFontSize,
          toolbarBackgroundColor,
          toolbarBackgroundColorHover,
          iconColor,
          color
        },
        common: { cubicBezierEaseOut, cubicBezierEaseIn, cubicBezierEaseInOut }
      } = mergedThemeRef.value
      const { left, right, top, bottom } = getPadding(padding)
      const cssVars = {
        '--z-color': color,
        '--z-font-size': fontSize,
        '--z-text-color': textColor,
        '--z-action-text-color': actionTextColor,
        '--z-title-text-color': headerTextColor,
        '--z-title-font-weight': headerFontWeight,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-bezier-ease-out': cubicBezierEaseOut,
        '--z-bezier-ease-in': cubicBezierEaseIn,
        '--z-border-radius': borderRadius,
        '--z-box-shadow': isBoxMovingRef.value ? boxShadowDraggable : boxShadow,
        '--z-panel-divider-color': panelDividerColor,
        // close
        '--z-close-border-radius': closeBorderRadius,
        '--z-close-color-hover': closeColorHover,
        '--z-close-color-pressed': closeColorPressed,
        '--z-close-icon-color': closeIconColor,
        '--z-close-icon-color-hover': closeIconColorHover,
        '--z-close-icon-color-pressed': closeIconColorPressed,
        // new-tab
        '--z-new-tab-border-radius': newTabBorderRadius,
        '--z-new-tab-color-hover': newTabColorHover,
        '--z-new-tab-color-pressed': newTabColorPressed,
        '--z-new-tab-icon-color': newTabIconColor,
        '--z-new-tab-icon-color-hover': newTabIconColorHover,
        '--z-new-tab-icon-color-pressed': newTabIconColorPressed,
        '--z-new-tab-margin': menuIconMargin,
        '--z-new-tab-size': menuIconWrapperSize,
        '--z-new-tab-icon-size': menuIconSize,
        // toggle icons
        '--z-toggle-border-radius': toggleBorderRadius,
        '--z-toggle-color-hover': toggleColorHover,
        '--z-toggle-color-pressed': toggleColorPressed,
        '--z-toggle-icon-color': toggleIconColor,
        '--z-toggle-icon-color-hover': toggleIconColorHover,
        '--z-toggle-icon-color-pressed': toggleIconColorPressed,
        '--z-toggle-margin': menuIconMargin,
        '--z-toggle-size': menuIconWrapperSize,
        '--z-toggle-icon-size': menuIconSize,
        // toolbar when minimize
        '--z-toolbar-background-color': toolbarBackgroundColor,
        '--z-toolbar-background-color-hover': toolbarBackgroundColorHover,
        // others
        '--z-line-height': lineHeight,
        '--z-icon-color': iconColor,
        '--z-close-margin': menuIconMargin,
        '--z-close-size': menuIconWrapperSize,
        '--z-close-icon-size': menuIconSize,
        '--z-width': width,
        '--z-padding-left': left,
        '--z-padding-right': right,
        '--z-padding-top': top,
        '--z-padding-bottom': bottom,
        '--z-title-font-size': titleFontSize,
        '--z-footer-font-size': footerFontSize,
        '--z-description-font-size': descriptionFontSize,
        '--z-expand-header-height': '68px',
        '--z-container-padding-bottom': '64px',
        // drag
        '--z-drag-cursor': dragCursorRef.value,
        '--z-drag-z-index': `${zIndexDragRef.value}`
      }
      if (mergedGDSTokenRef?.value) {
        Object.assign(cssVars, {
          ...mergedGDSTokenRef.value
        })
      }
      return cssVars
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('floating-panel', undefined, cssVarsRef, providerProps)
      : undefined

    function handleCloseClick (): void {
      props.onClose?.()
    }

    function handleToggleMinimizeClick (): void {
      minimizeRef.value = !minimizeRef.value
      expandRef.value = false
      enableDragRef.value = false
      props.onUpdateMinimize?.(minimizeRef.value)
      props.onToggleMinimize?.(minimizeRef.value)
    }

    function handleToggleExpandClick (): void {
      expandRef.value = !expandRef.value
      minimizeRef.value = false
      props.onUpdateMinimize?.(false)
      props.onToggleExpand?.(expandRef.value)
    }

    // make it reactive to draggableRef
    watch(
      draggableRef,
      (value) => {
        if (!value) {
          enableDragRef.value = false
        }
      },
      { immediate: true }
    )

    function handleMouseEnter (): void {
      if (!enableDragRef.value && !minimizeRef.value && draggableRef.value) {
        addDraggableBehaviour()
      }
    }

    function addDraggableBehaviour (): void {
      const { x, y } = useElementBounding(bodyRef)
      const { style } = useDraggable(headerMainRef, {
        onMove: (position, e) => {
          dragBehaviourRef.value = 'move'
          handleDrag('move', position, e)
        },
        onEnd: (position, e) => {
          dragBehaviourRef.value = 'end'
          // behaviour reset
          setTimeout(() => {
            if (dragBehaviourRef.value === 'end') {
              dragBehaviourRef.value = null
            }
          }, 5000)
          handleDrag('end', position, e)
        },
        onStart: (position, e) => {
          dragBehaviourRef.value = 'start'
          handleDrag('start', position, e)
        },
        containerElement: props.containerElement,
        // hackyfix: (-1): there is a lag due to the initial value
        // FIXME: see is it due to some border or some css
        initialValue: { x: x.value - 1, y: y.value - 1 }
      })
      syncRefs(style, dragStyleRef)
    }

    onLongPress(
      headerMainRef,
      (e: PointerEvent) => {
        if (!draggableRef.value) return
        if (minimizeRef.value) return
        if (expandRef.value) return
        enableDragRef.value = true
      },
      {
        modifiers: {
          prevent: true,
          stop: true
        },
        delay: props.dragDelay
      }
    )

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      handleCloseClick,
      handleToggleMinimizeClick,
      handleToggleExpandClick,
      handleDrag,
      handleMouseEnter,
      minimize: minimizeRef,
      expand: expandRef,
      bodyRef,
      headerMainRef,
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      mergedTheme: mergedThemeRef,
      dragStyle: dragStyleRef,
      draggable: enableDragRef
    }
  },
  render () {
    const { mergedClsPrefix } = this
    this.onRender?.()
    return (
      <div
        class={[`${mergedClsPrefix}-floating-panel-wrapper`, this.themeClass]}
        style={this.cssVars}
      >
        <div
          class={[
            `${mergedClsPrefix}-floating-panel`,
            this.themeClass,
            {
              [`${mergedClsPrefix}-floating-panel--rtl`]: this.rtlEnabled,
              [`${mergedClsPrefix}-floating-panel--closable`]: this.closable,
              [`${mergedClsPrefix}-floating-panel--expandable`]:
                this.expandable,
              [`${mergedClsPrefix}-floating-panel--minimize`]: this.minimize,
              [`${mergedClsPrefix}-floating-panel--draggable`]: this.draggable
            }
          ]}
          style={this.dragStyle || undefined}
        >
          <div
            class={[
              `${mergedClsPrefix}-floating-panel-content`,
              {
                [`${mergedClsPrefix}-floating-panel-content--expand`]:
                  this.expand
              }
            ]}
          >
            {/* TODO: add transition for expand */}
            <div ref="bodyRef" class={`${mergedClsPrefix}-floating-panel-main`}>
              {this.title ? (
                <div
                  onMouseenter={this.handleMouseEnter}
                  ref="headerMainRef"
                  class={[
                    `${mergedClsPrefix}-floating-panel-main__header`,
                    this.minimize &&
                      `${mergedClsPrefix}-floating-panel-main__header--minimize`
                  ]}
                >
                  <ZTitle
                    variant="4-m"
                    class={[
                      `${mergedClsPrefix}-floating-panel-main__header-main`
                    ]}
                  >
                    {render(this.title)}
                  </ZTitle>
                  <div
                    class={`${mergedClsPrefix}-floating-panel-main__header-end`}
                  >
                    <>
                      {this.headerEnd ? render(this.headerEnd) : null}
                      {this.minimizable ? (
                        <ZIconToggle
                          clsPrefix={mergedClsPrefix}
                          class={`${mergedClsPrefix}-floating-panel__toggle`}
                          modelValue={this.minimize}
                          onUpdateModelValue={this.handleToggleMinimizeClick}
                        >
                          {{
                            checkedIcon: () => <MaximizeIcon />,
                            uncheckedIcon: () => <MinimizeIcon />
                          }}
                        </ZIconToggle>
                      ) : null}
                      {this.expandable ? (
                        <ZIconToggle
                          clsPrefix={mergedClsPrefix}
                          class={`${mergedClsPrefix}-floating-panel__toggle`}
                          modelValue={this.expand}
                          onUpdateModelValue={this.handleToggleExpandClick}
                        >
                          {{
                            checkedIcon: () => <CloseFullScreenIcon />,
                            uncheckedIcon: () => <FullScreenSquareIcon />
                          }}
                        </ZIconToggle>
                      ) : null}
                      {this.openInNewTab ? (
                        <ZNewTab
                          clsPrefix={mergedClsPrefix}
                          class={`${mergedClsPrefix}-floating-panel__new-tab`}
                          onClick={this.onClickOpenInNewTab}
                        />
                      ) : null}
                      {this.closable ? (
                        <ZBaseClose
                          clsPrefix={mergedClsPrefix}
                          class={`${mergedClsPrefix}-floating-panel__close`}
                          onClick={this.handleCloseClick}
                        />
                      ) : null}
                    </>
                  </div>
                </div>
              ) : null}

              <ZCollapseTransition show={!this.minimize}>
                {{
                  default: () => (
                    <Fragment>
                      {this.content ? (
                        <div
                          style={this.contentStyle}
                          class={`${mergedClsPrefix}-floating-panel-main__content`}
                        >
                          {/* FIXME: add z-scrollbar | throwing css issue */}
                          {render(this.content)}
                        </div>
                      ) : null}

                      {this.footer || this.action ? (
                        <Fragment>
                          {this.footer ? (
                            render(this.footer)
                          ) : (
                            <div
                              style={this.footerStyle}
                              class={`${mergedClsPrefix}-floating-panel-main-footer`}
                            >
                              {this.action ? (
                                <div
                                  class={`${mergedClsPrefix}-floating-panel-main-footer__action`}
                                >
                                  {render(this.action)}
                                </div>
                              ) : null}
                            </div>
                          )}
                        </Fragment>
                      ) : null}
                    </Fragment>
                  )
                }}
              </ZCollapseTransition>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
