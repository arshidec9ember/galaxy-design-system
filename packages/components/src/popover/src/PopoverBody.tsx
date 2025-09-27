import {
  h,
  vShow,
  withDirectives,
  Transition,
  ref,
  defineComponent,
  computed,
  mergeProps,
  inject,
  onBeforeUnmount,
  type DirectiveArguments,
  type PropType,
  watch,
  toRef,
  provide,
  type CSSProperties,
  type VNode,
  type VNodeChild,
  watchEffect,
  Fragment
} from 'vue'
import {
  VFollower,
  type FollowerPlacement,
  type FollowerInst,
  VFocusTrap
} from '../../_external-dependencies/vueuc'
import {
  clickoutside,
  mousemoveoutside
} from '../../_external-dependencies/vdirs'
import { getPreciseEventTarget } from 'seemly'
import { ZxScrollbar } from '../../_internal/scrollbar'
import { drawerBodyInjectionKey } from '../../drawer/src/interface'
import { modalBodyInjectionKey } from '../../modal/src/interface'
import { useTheme, useConfig, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  formatLength,
  isSlotEmpty,
  resolveWrappedSlot,
  useAdjustedTo,
  isJsdom
} from '../../_utils'
import { popoverLight } from '../styles'
import type { PopoverTheme } from '../styles'
import type { PopoverInjection } from './Popover'
import type { PopoverTrigger } from './interface'
import { popoverBodyInjectionKey } from './interface'
import style from './styles/index.cssr'

import { ZText } from '../../typography'

export const popoverBodyProps = {
  ...(useTheme.props as ThemeProps<PopoverTheme>),
  to: useAdjustedTo.propTo,
  show: Boolean,
  trigger: String as PropType<PopoverTrigger>,
  showArrow: Boolean,
  delay: Number,
  duration: Number,
  raw: Boolean,
  arrowPointToCenter: Boolean,
  arrowStyle: [String, Object] as PropType<string | CSSProperties>,
  displayDirective: String as PropType<'if' | 'show'>,
  x: Number,
  y: Number,
  flip: Boolean,
  overlap: Boolean,
  placement: String as PropType<FollowerPlacement>,
  width: [Number, String] as PropType<number | 'trigger'>,
  keepAliveOnHover: Boolean,
  scrollable: Boolean,
  contentStyle: [Object, String] as PropType<CSSProperties | string>,
  headerStyle: [Object, String] as PropType<CSSProperties | string>,
  footerStyle: [Object, String] as PropType<CSSProperties | string>,
  textVariant: {
    type: String,
    default: '4-r'
  },
  renderZText: {
    type: Boolean,
    default: true
  },
  // private
  internalDeactivateImmediately: Boolean,
  animated: Boolean,
  onClickoutside: Function as PropType<(e: MouseEvent) => void>,
  internalTrapFocus: Boolean,
  internalOnAfterLeave: Function as PropType<() => void>,
  // deprecated
  minWidth: Number,
  maxWidth: Number
}

interface RenderArrowProps {
  arrowStyle: string | CSSProperties | undefined
  clsPrefix: string
}

export const renderArrow = ({
  arrowStyle,
  clsPrefix
}: RenderArrowProps): VNode | null => {
  return (
    <div key="__popover-arrow__" class={`${clsPrefix}-popover-arrow-wrapper`}>
      <div class={`${clsPrefix}-popover-arrow`} style={arrowStyle} />
    </div>
  )
}

export default defineComponent({
  name: 'PopoverBody',
  inheritAttrs: false,
  props: popoverBodyProps,
  setup (props, { slots, attrs }) {
    const { namespaceRef, mergedClsPrefixRef, inlineThemeDisabled } =
      useConfig(props)
    const themeRef = useTheme(
      'Popover',
      '-popover',
      style,
      popoverLight,
      props,
      mergedClsPrefixRef
    )
    const followerRef = ref<FollowerInst | null>(null)
    const ZPopover = inject<PopoverInjection>('ZPopover') as PopoverInjection
    const bodyRef = ref<HTMLElement | null>(null)
    const followerEnabledRef = ref(props.show)
    const displayedRef = ref(false)
    watchEffect(() => {
      const { show } = props
      if (show && !isJsdom() && !props.internalDeactivateImmediately) {
        displayedRef.value = true
      }
    })
    const directivesRef = computed<DirectiveArguments>(() => {
      const { trigger, onClickoutside } = props
      const directives: DirectiveArguments = []
      const {
        positionManuallyRef: { value: positionManually }
      } = ZPopover
      if (!positionManually) {
        if (trigger === 'click' && !onClickoutside) {
          directives.push([
            clickoutside,
            handleClickOutside,
            undefined as unknown as string,
            { capture: true }
          ])
        }
        if (trigger === 'hover') {
          directives.push([mousemoveoutside, handleMouseMoveOutside])
        }
      }
      if (onClickoutside) {
        directives.push([
          clickoutside,
          handleClickOutside,
          undefined as unknown as string,
          { capture: true }
        ])
      }
      if (
        props.displayDirective === 'show' ||
        (props.animated && displayedRef.value)
      ) {
        directives.push([vShow, props.show])
      }
      return directives
    })
    const styleRef = computed(() => {
      const width =
        props.width === 'trigger' ? undefined : formatLength(props.width)
      const style: CSSProperties[] = []
      if (width) {
        style.push({ width })
      }
      const { maxWidth, minWidth } = props
      if (maxWidth) {
        style.push({ maxWidth: formatLength(maxWidth) })
      }
      if (minWidth) {
        style.push({ maxWidth: formatLength(minWidth) })
      }
      if (!inlineThemeDisabled) {
        style.push(cssVarsRef.value)
      }
      return style
    })
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut, cubicBezierEaseIn, cubicBezierEaseOut },
        self: {
          space,
          spaceArrow,
          padding,
          fontSize,
          textColor,
          dividerColor,
          bgColor,
          boxShadow,
          borderRadius,
          arrowHeight,
          arrowOffset,
          arrowOffsetVertical
        }
      } = themeRef.value

      return {
        '--z-box-shadow': boxShadow,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-bezier-ease-in': cubicBezierEaseIn,
        '--z-bezier-ease-out': cubicBezierEaseOut,
        '--z-font-size': fontSize,
        '--z-text-color': textColor,
        '--z-color': bgColor,
        '--z-divider-color': dividerColor,
        '--z-border-radius': borderRadius,
        '--z-arrow-height': arrowHeight,
        '--z-arrow-offset': arrowOffset,
        '--z-arrow-offset-vertical': arrowOffsetVertical,
        '--z-padding': padding,
        '--z-space': space,
        '--z-space-arrow': spaceArrow
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('popover', undefined, cssVarsRef, props)
      : undefined
    ZPopover.setBodyInstance({
      syncPosition
    })
    onBeforeUnmount(() => {
      ZPopover.setBodyInstance(null)
    })
    watch(toRef(props, 'show'), (value) => {
      // If no animation, no transition component will be applied to the
      // component. So we need to trigger follower manaully.
      if (props.animated) return
      if (value) {
        followerEnabledRef.value = true
      } else {
        followerEnabledRef.value = false
      }
    })
    function syncPosition (): void {
      followerRef.value?.syncPosition()
    }
    function handleMouseEnter (e: MouseEvent): void {
      if (props.trigger === 'hover' && props.keepAliveOnHover && props.show) {
        ZPopover.handleMouseEnter(e)
      }
    }
    function handleMouseLeave (e: MouseEvent): void {
      if (props.trigger === 'hover' && props.keepAliveOnHover) {
        ZPopover.handleMouseLeave(e)
      }
    }
    function handleMouseMoveOutside (e: MouseEvent): void {
      if (bodyRef.value?.contains(getPreciseEventTarget(e) as Node | null)) {
        return
      }
      if (
        props.trigger === 'hover' &&
        !getTriggerElement().contains(getPreciseEventTarget(e) as Node | null)
      ) {
        ZPopover.handleMouseMoveOutside(e)
      }
    }
    function handleClickOutside (e: MouseEvent): void {
      if (bodyRef.value?.contains(getPreciseEventTarget(e) as Node | null)) {
        return
      }
      if (
        (props.trigger === 'click' &&
          !getTriggerElement().contains(
            getPreciseEventTarget(e) as Node | null
          )) ||
        props.onClickoutside
      ) {
        ZPopover.handleClickOutside(e)
      }
    }
    function getTriggerElement (): HTMLElement {
      return ZPopover.getTriggerElement()
    }
    provide(popoverBodyInjectionKey, bodyRef)
    provide(drawerBodyInjectionKey, null)
    provide(modalBodyInjectionKey, null)

    function renderContentNode (): VNode | null {
      themeClassHandle?.onRender()
      const shouldRenderDom =
        props.displayDirective === 'show' ||
        props.show ||
        (props.animated && displayedRef.value)
      if (!shouldRenderDom) {
        return null
      }
      let contentNode: VNode
      const renderBody = ZPopover.internalRenderBodyRef.value
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      if (!renderBody) {
        const { value: extraClass } = ZPopover.extraClassRef
        const { internalTrapFocus } = props
        const hasHeaderOrFooter =
          !isSlotEmpty(slots.header) || !isSlotEmpty(slots.footer)
        const renderContentInnerNode = (): VNodeChild[] => {
          const body = hasHeaderOrFooter ? (
            <>
              {resolveWrappedSlot(slots.header, (children) => {
                return children ? (
                  <div
                    class={`${mergedClsPrefix}-popover__header`}
                    style={props.headerStyle}
                  >
                    {children}
                  </div>
                ) : null
              })}
              {resolveWrappedSlot(slots.default, (children) => {
                return children ? (
                  props.renderZText ? (
                    <ZText
                      variant={props.textVariant}
                      color="inherit"
                      class={`${mergedClsPrefix}-popover__content`}
                      style={props.contentStyle}
                    >
                      {slots}
                    </ZText>
                  ) : (
                    <div
                      class={`${mergedClsPrefix}-popover__content`}
                      style={props.contentStyle}
                    >
                      {slots}
                    </div>
                  )
                ) : null
              })}
              {resolveWrappedSlot(slots.footer, (children) => {
                return children ? (
                  <div
                    class={`${mergedClsPrefix}-popover__footer`}
                    style={props.footerStyle}
                  >
                    {children}
                  </div>
                ) : null
              })}
            </>
          ) : props.scrollable ? (
            slots.default?.()
          ) : props.renderZText ? (
            <ZText
              variant={props.textVariant}
              color="inherit"
              class={`${mergedClsPrefix}-popover__content`}
              style={props.contentStyle}
            >
              {slots}
            </ZText>
          ) : (
            <div
              class={`${mergedClsPrefix}-popover__content`}
              style={props.contentStyle}
            >
              {slots}
            </div>
          )
          const maybeScrollableBody = props.scrollable ? (
            <ZxScrollbar
              contentClass={
                hasHeaderOrFooter
                  ? undefined
                  : `${mergedClsPrefix}-popover__content`
              }
              contentStyle={hasHeaderOrFooter ? undefined : props.contentStyle}
            >
              {{
                default: () => body
              }}
            </ZxScrollbar>
          ) : (
            body
          )
          const arrow = props.showArrow
            ? renderArrow({
              arrowStyle: props.arrowStyle,
              clsPrefix: mergedClsPrefix
            })
            : null
          return [maybeScrollableBody, arrow]
        }
        contentNode = h(
          'div',
          mergeProps(
            {
              class: [
                `${mergedClsPrefix}-popover`,
                `${mergedClsPrefix}-popover-shared`,
                themeClassHandle?.themeClass.value,
                extraClass.map((v) => `${mergedClsPrefix}-${v}`),
                {
                  [`${mergedClsPrefix}-popover--scrollable`]: props.scrollable,
                  [`${mergedClsPrefix}-popover--show-header-or-footer`]:
                    hasHeaderOrFooter,
                  [`${mergedClsPrefix}-popover--raw`]: props.raw,
                  [`${mergedClsPrefix}-popover-shared--overlap`]: props.overlap,
                  [`${mergedClsPrefix}-popover-shared--show-arrow`]:
                    props.showArrow,
                  [`${mergedClsPrefix}-popover-shared--center-arrow`]:
                    props.arrowPointToCenter
                }
              ],
              ref: bodyRef,
              style: styleRef.value,
              onKeydown: ZPopover.handleKeydown,
              onMouseenter: handleMouseEnter,
              onMouseleave: handleMouseLeave
            },
            attrs
          ),
          internalTrapFocus ? (
            <VFocusTrap active={props.show} autoFocus>
              {{ default: renderContentInnerNode }}
            </VFocusTrap>
          ) : (
            renderContentInnerNode()
          )
        )
      } else {
        contentNode = renderBody(
          // The popover class and overlap class must exists, they will be used
          // to place the body & transition animation.
          // Shadow class exists for reuse box-shadow.
          [
            `${mergedClsPrefix}-popover-shared`,
            themeClassHandle?.themeClass.value,
            props.overlap && `${mergedClsPrefix}-popover-shared--overlap`,
            props.showArrow && `${mergedClsPrefix}-popover-shared--show-arrow`,
            props.arrowPointToCenter &&
              `${mergedClsPrefix}-popover-shared--center-arrow`
          ],
          bodyRef,
          styleRef.value as any,
          handleMouseEnter,
          handleMouseLeave
        )
      }
      return withDirectives(contentNode, directivesRef.value)
    }

    return {
      displayed: displayedRef,
      namespace: namespaceRef,
      isMounted: ZPopover.isMountedRef,
      zIndex: ZPopover.zIndexRef,
      followerRef,
      adjustedTo: useAdjustedTo(props),
      followerEnabled: followerEnabledRef,
      renderContentNode
    }
  },
  render () {
    return (
      <VFollower
        ref="followerRef"
        zIndex={this.zIndex}
        show={this.show}
        enabled={this.followerEnabled}
        to={this.adjustedTo}
        x={this.x}
        y={this.y}
        flip={this.flip}
        placement={this.placement}
        containerClass={this.namespace}
        overlap={this.overlap}
        width={this.width === 'trigger' ? 'target' : undefined}
        teleportDisabled={this.adjustedTo === useAdjustedTo.tdkey}
      >
        {{
          default: () => {
            return this.animated ? (
              <Transition
                name="popover-transition"
                appear={this.isMounted}
                // Don't use watch to enable follower, since the transition may
                // make position sync timing very subtle and buggy.
                onEnter={() => {
                  this.followerEnabled = true
                }}
                onAfterLeave={() => {
                  this.internalOnAfterLeave?.()
                  this.followerEnabled = false
                  this.displayed = false
                }}
              >
                {{
                  default: this.renderContentNode
                }}
              </Transition>
            ) : (
              this.renderContentNode()
            )
          }
        }}
      </VFollower>
    )
  }
})
