import {
  h,
  ref,
  computed,
  toRef,
  watch,
  nextTick,
  defineComponent,
  mergeProps,
  Transition,
  type PropType,
  onMounted,
  onBeforeUnmount,
  watchEffect
} from 'vue'
import { VLazyTeleport } from '../../_external-dependencies/vueuc'
import {
  useIsMounted,
  useMergedState
} from '../../_external-dependencies/vooks'
import { getScrollParent, unwrapElement } from 'seemly'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { ZBaseIcon } from '../../_internal'
import {
  lockHtmlScrollRightCompensationRef,
  formatLength,
  resolveSlot,
  isDocument,
  warn,
  warnOnce
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { backToTopLight } from '../styles'
import type { BackToTopTheme } from '../styles'
import BackToTopIcon from './BackToTopIcon'
import style from './styles/index.cssr'

export const backToTopProps = {
  ...(useTheme.props as ThemeProps<BackToTopTheme>),
  show: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  right: {
    type: [Number, String] as PropType<string | number>,
    default: 40
  },
  bottom: {
    type: [Number, String] as PropType<string | number>,
    default: 40
  },
  to: {
    type: [String, Object] as PropType<HTMLElement | string>,
    default: 'body'
  },
  visibilityHeight: {
    type: Number,
    default: 180
  },
  listenTo: [String, Object, Function] as PropType<
  string | HTMLElement | Document | (() => HTMLElement | Document)
  >,
  'onUpdate:show': {
    type: Function,
    default: () => {}
  },
  // deprecated
  target: Function as PropType<() => HTMLElement>,
  onShow: Function as unknown as PropType<() => void>,
  onHide: Function as unknown as PropType<() => void>
} as const

export type BackToTopProps = ExtractPublicPropTypes<typeof backToTopProps>

export default defineComponent({
  name: 'BackToTop',
  // make style applied to back-to-top button
  inheritAttrs: false,
  props: backToTopProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.target !== undefined) {
          warnOnce(
            'back-to-top',
            '`target` is deprecated, please use `listen-to` instead.'
          )
        }
        if (props.onShow !== undefined) {
          warnOnce(
            'back-to-top',
            '`on-show` is deprecated, please use `on-update:show` instead.'
          )
        }
        if (props.onHide !== undefined) {
          warnOnce(
            'back-to-top',
            '`on-hide` is deprecated, please use `on-update:show` instead.'
          )
        }
      })
    }
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)

    const scrollTopRef = ref<number | null>(null)
    const uncontrolledShowRef = ref(false)
    watchEffect(() => {
      const { value: scrollTop } = scrollTopRef
      if (scrollTop === null) {
        uncontrolledShowRef.value = false
        return
      }
      uncontrolledShowRef.value = scrollTop >= props.visibilityHeight
    })
    const DomInfoReadyRef = ref(false)
    watch(uncontrolledShowRef, (value) => {
      if (DomInfoReadyRef.value) {
        props['onUpdate:show']?.(value)
      }
    })
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)
    const transitionDisabledRef = ref(true)
    const placeholderRef = ref<HTMLElement | null>(null)
    const styleRef = computed(
      (): {
        right: string
        bottom: string
      } => {
        return {
          right: `calc(${formatLength(props.right)} + ${
            lockHtmlScrollRightCompensationRef.value
          })`,
          bottom: formatLength(props.bottom)
        }
      }
    )
    let scrollElement: HTMLElement | Document
    let scrollListenerRegistered: boolean
    // deprecated
    watch(mergedShowRef, (value) => {
      if (DomInfoReadyRef.value) {
        if (value) {
          props.onShow?.()
        }
        props.onHide?.()
      }
    })
    const themeRef = useTheme(
      'BackToTop',
      '-back-to-top',
      style,
      backToTopLight,
      props,
      mergedClsPrefixRef
    )
    function init (): void {
      if (scrollListenerRegistered) return
      scrollListenerRegistered = true
      const scrollEl =
        props.target?.() ||
        unwrapElement(props.listenTo) ||
        getScrollParent(placeholderRef.value)
      if (!scrollEl) {
        if (__DEV__) {
          warn(
            'back-to-top',
            'Container of back-to-top element is not found. This could be a bug of @zeta-gds/components.'
          )
        }
        return
      }
      scrollElement =
        scrollEl === document.documentElement ? document : scrollEl
      const { to } = props
      const target = typeof to === 'string' ? document.querySelector(to) : to
      if (__DEV__ && !target) {
        warn('back-to-top', 'Target is not found.')
      }
      scrollElement.addEventListener('scroll', handleScroll)
      handleScroll()
    }
    function handleClick (): void {
      ;(isDocument(scrollElement)
        ? document.documentElement
        : scrollElement
      ).scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    function handleScroll (): void {
      scrollTopRef.value = (
        isDocument(scrollElement) ? document.documentElement : scrollElement
      ).scrollTop
      if (!DomInfoReadyRef.value) {
        void nextTick(() => {
          DomInfoReadyRef.value = true
        })
      }
    }
    function handleAfterEnter (): void {
      transitionDisabledRef.value = false
    }
    onMounted(() => {
      init()
      transitionDisabledRef.value = mergedShowRef.value
    })
    onBeforeUnmount(() => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
    })

    const cssVarsRef = computed(() => {
      const {
        self: {
          color,
          boxShadow,
          boxShadowHover,
          boxShadowPressed,
          iconColor,
          iconColorHover,
          iconColorPressed,
          width,
          height,
          iconSize,
          borderRadius,
          textColor
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-border-radius': borderRadius,
        '--z-height': height,
        '--z-width': width,
        '--z-box-shadow': boxShadow,
        '--z-box-shadow-hover': boxShadowHover,
        '--z-box-shadow-pressed': boxShadowPressed,
        '--z-color': color,
        '--z-icon-size': iconSize,
        '--z-icon-color': iconColor,
        '--z-icon-color-hover': iconColorHover,
        '--z-icon-color-pressed': iconColorPressed,
        '--z-text-color': textColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('back-to-top', undefined, cssVarsRef, props)
      : undefined
    return {
      placeholderRef,
      style: styleRef,
      mergedShow: mergedShowRef,
      isMounted: useIsMounted(),
      scrollElement: ref(null),
      scrollTop: scrollTopRef,
      DomInfoReady: DomInfoReadyRef,
      transitionDisabled: transitionDisabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      handleAfterEnter,
      handleScroll,
      handleClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        ref="placeholderRef"
        class={`${mergedClsPrefix}-back-to-top-placeholder`}
        style="display: none"
        aria-hidden
      >
        <VLazyTeleport to={this.to} show={this.mergedShow}>
          {{
            default: () => (
              <Transition
                name="fade-in-scale-up-transition"
                appear={this.isMounted}
                onAfterEnter={this.handleAfterEnter}
              >
                {{
                  default: () => {
                    this.onRender?.()
                    return this.mergedShow
                      ? h(
                        'div',
                        mergeProps(this.$attrs, {
                          class: [
                              `${mergedClsPrefix}-back-to-top`,
                              this.themeClass,
                              this.transitionDisabled &&
                                `${mergedClsPrefix}-back-to-top--transition-disabled`
                          ],
                          style: [this.style, this.cssVars],
                          onClick: this.handleClick
                        }),
                        resolveSlot(this.$slots.default, () => [
                            <ZBaseIcon clsPrefix={mergedClsPrefix}>
                              {{ default: () => BackToTopIcon }}
                            </ZBaseIcon>
                        ])
                      )
                      : null
                  }
                }}
              </Transition>
            )
          }}
        </VLazyTeleport>
      </div>
    )
  }
})
