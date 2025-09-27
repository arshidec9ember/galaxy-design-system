import {
  h,
  defineComponent,
  computed,
  type PropType,
  type CSSProperties,
  Fragment
} from 'vue'
import { useConfig, useLocale, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  call,
  type ExtractPublicPropTypes,
  type MaybeArray
} from '../../_utils'
import { panelLight } from '../styles'
import type { PanelTheme } from '../styles'
import style from './styles/index.cssr'
import { ZButton, type ButtonProps } from '../../button'
import { ZIcon } from '../../icon/src/Icon'
import ZTooltip from '../../tooltip/src/Tooltip'
import { ZText } from '../../typography'
import {
  CloseIcon,
  FullScreenIcon,
  NewTabIcon,
  CloseFullScreenIcon,
  KeyboardArrowUpIcon,
  KeyboardArrowDownIcon
} from '../../_internal/icons'

export const panelToolbarProps = {
  ...(useTheme.props as ThemeProps<PanelTheme>),
  // Window controls
  expandable: { type: Boolean, default: false },
  expanded: { type: Boolean, default: false },
  openInNewTab: { type: Boolean, default: false },
  closable: { type: Boolean, default: false },
  locale: Object,

  // Navigation controls
  previousBtnProps: Object as PropType<ButtonProps>,
  nextBtnProps: Object as PropType<ButtonProps>,

  // Pagination display
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },

  // Event handlers
  onExpand: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  onCollapse: [Function, Array] as PropType<
  MaybeArray<(e: MouseEvent) => void>
  >,
  onOpenInNewTab: [Function, Array] as PropType<
  MaybeArray<(e: MouseEvent) => void>
  >,
  onClose: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  onPreviousBtnClick: [Function, Array] as PropType<
  MaybeArray<(e: MouseEvent) => void>
  >,
  onNextBtnClick: [Function, Array] as PropType<
  MaybeArray<(e: MouseEvent) => void>
  >
} as const

export type PanelToolbarProps = ExtractPublicPropTypes<typeof panelToolbarProps>

export default defineComponent({
  name: 'PanelToolbar',
  props: panelToolbarProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const { localeRef } = useLocale('global')
    const themeRef = useTheme(
      'Panel',
      '-panel',
      style,
      panelLight,
      props,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      const { headerTextColor, dividerColor } = themeRef.value.self
      const { cubicBezierEaseInOut } = themeRef.value.common
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-header-text-color': headerTextColor,
        '--z-divider-color': dividerColor
      }
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'panel-toolbar',
        computed(() => ''),
        cssVarsRef,
        props
      )
      : undefined

    // Computed properties for control visibility
    const hasWindowControlsRef = computed(
      () => props.expandable || props.openInNewTab
    )

    const hasNavigationControlsRef = computed(
      () => props.previousBtnProps || props.nextBtnProps
    )

    const hasPaginationRef = computed(
      () =>
        props.currentPage != null &&
        props.totalPages != null &&
        props.totalPages > 0
    )

    const hasLeftControlsRef = computed(
      () =>
        hasWindowControlsRef.value ||
        hasNavigationControlsRef.value ||
        hasPaginationRef.value
    )

    // Event handlers
    function onExpand (e: MouseEvent): void {
      const { onExpand } = props
      if (onExpand) call(onExpand, e)
    }

    function onCollapse (e: MouseEvent): void {
      const { onCollapse } = props
      if (onCollapse) call(onCollapse, e)
    }

    function onOpenInNewTab (e: MouseEvent): void {
      const { onOpenInNewTab } = props
      if (onOpenInNewTab) call(onOpenInNewTab, e)
    }

    function onClose (e: MouseEvent): void {
      const { onClose } = props
      if (onClose) call(onClose, e)
    }

    function onPreviousBtnClick (e: MouseEvent): void {
      const { onPreviousBtnClick } = props
      if (onPreviousBtnClick) call(onPreviousBtnClick, e)
    }

    function onNextBtnClick (e: MouseEvent): void {
      const { onNextBtnClick } = props
      if (onNextBtnClick) call(onNextBtnClick, e)
    }

    return {
      hasWindowControls: hasWindowControlsRef,
      hasNavigationControls: hasNavigationControlsRef,
      hasPagination: hasPaginationRef,
      hasLeftControls: hasLeftControlsRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      locale: localeRef,
      onExpand,
      onCollapse,
      onOpenInNewTab,
      onClose,
      onPreviousBtnClick,
      onNextBtnClick
    }
  },
  render () {
    const {
      mergedClsPrefix,
      mergedTheme,
      onRender,
      expandable,
      expanded,
      openInNewTab,
      closable,
      hasWindowControls,
      hasNavigationControls,
      hasPagination,
      hasLeftControls,
      locale,
      onExpand,
      onCollapse,
      onOpenInNewTab,
      onClose,
      onPreviousBtnClick,
      onNextBtnClick,
      $slots
    } = this

    onRender?.()

    const hasAnyLeftControls =
      hasLeftControls ||
      $slots['window-controls'] ||
      $slots['navigation-controls'] ||
      $slots.pagination

    if (!hasAnyLeftControls && !closable) {
      return null
    }

    return (
      <div
        class={[`${mergedClsPrefix}-panel-toolbar`, this.themeClass]}
        style={this.cssVars as CSSProperties}
      >
        {$slots.controls?.() ?? (
          <>
            {hasAnyLeftControls && (
              <div class={`${mergedClsPrefix}-panel-toolbar__left`}>
                {/* Window controls group */}
                {(hasWindowControls || $slots['window-controls']) && (
                  <div
                    class={`${mergedClsPrefix}-panel-toolbar__window-controls`}
                  >
                    {$slots['window-controls']?.() ?? (
                      <>
                        {openInNewTab && (
                          <ZTooltip>
                            {{
                              trigger: () => (
                                <ZButton
                                  theme={mergedTheme.peers.Button}
                                  themeOverrides={
                                    mergedTheme.peerOverrides.Button
                                  }
                                  size="small"
                                  variant="subtle"
                                  onClick={onOpenInNewTab}
                                  class={`${mergedClsPrefix}-panel-toolbar__control-button`}
                                >
                                  <ZIcon size="1rem">
                                    {() => <NewTabIcon />}
                                  </ZIcon>
                                </ZButton>
                              ),
                              default: () => <span>{locale.openInNewTab}</span>
                            }}
                          </ZTooltip>
                        )}
                        {expandable && !expanded && (
                          <ZTooltip>
                            {{
                              trigger: () => (
                                <ZButton
                                  theme={mergedTheme.peers.Button}
                                  themeOverrides={
                                    mergedTheme.peerOverrides.Button
                                  }
                                  size="small"
                                  variant="subtle"
                                  onClick={onExpand}
                                  class={`${mergedClsPrefix}-panel-toolbar__control-button`}
                                >
                                  <ZIcon size="1rem">
                                    {() => <FullScreenIcon />}
                                  </ZIcon>
                                </ZButton>
                              ),
                              default: () => (
                                <span>{locale.expandInFullScreen}</span>
                              )
                            }}
                          </ZTooltip>
                        )}
                        {expandable && expanded && (
                          <ZTooltip>
                            {{
                              trigger: () => (
                                <ZButton
                                  theme={mergedTheme.peers.Button}
                                  themeOverrides={
                                    mergedTheme.peerOverrides.Button
                                  }
                                  size="small"
                                  variant="subtle"
                                  onClick={onCollapse}
                                  class={`${mergedClsPrefix}-panel-toolbar__control-button`}
                                >
                                  <ZIcon size="1rem">
                                    {() => <CloseFullScreenIcon />}
                                  </ZIcon>
                                </ZButton>
                              ),
                              default: () => (
                                <span>{locale.closeFullScreen}</span>
                              )
                            }}
                          </ZTooltip>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* Navigation controls group */}
                {(hasNavigationControls || $slots['navigation-controls']) && (
                  <>
                    <div
                      class={`${mergedClsPrefix}-panel-toolbar__navigation-controls`}
                    >
                      {$slots['navigation-controls']?.() ?? (
                        <>
                          {this.previousBtnProps && (
                            <ZTooltip>
                              {{
                                trigger: () => (
                                  <ZButton
                                    {...this.previousBtnProps}
                                    theme={mergedTheme.peers.Button}
                                    themeOverrides={
                                      mergedTheme.peerOverrides.Button
                                    }
                                    size="small"
                                    variant="subtle"
                                    onClick={onPreviousBtnClick}
                                    class={`${mergedClsPrefix}-panel-toolbar__control-button`}
                                  >
                                    <ZIcon size="1.25rem">
                                      {() => <KeyboardArrowUpIcon />}
                                    </ZIcon>
                                  </ZButton>
                                ),
                                default: () => <span>Previous</span>
                              }}
                            </ZTooltip>
                          )}
                          {this.nextBtnProps && (
                            <ZTooltip>
                              {{
                                trigger: () => (
                                  <ZButton
                                    {...this.nextBtnProps}
                                    theme={mergedTheme.peers.Button}
                                    themeOverrides={
                                      mergedTheme.peerOverrides.Button
                                    }
                                    size="small"
                                    variant="subtle"
                                    onClick={onNextBtnClick}
                                    class={`${mergedClsPrefix}-panel-toolbar__control-button`}
                                  >
                                    <ZIcon size="1.25rem">
                                      {() => <KeyboardArrowDownIcon />}
                                    </ZIcon>
                                  </ZButton>
                                ),
                                default: () => <span>Next</span>
                              }}
                            </ZTooltip>
                          )}
                        </>
                      )}
                    </div>
                    {/* Pagination display */}
                    {(hasPagination || $slots.pagination) && (
                      <div
                        class={`${mergedClsPrefix}-panel-toolbar__pagination`}
                      >
                        {$slots.pagination?.() ?? (
                          <ZText
                            variant="4-r"
                            class={`${mergedClsPrefix}-panel-toolbar__pagination-text`}
                          >
                            {this.currentPage} {locale.of} {this.totalPages}{' '}
                            {locale.inAllChecklists}
                          </ZText>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {closable && (
              <div class={`${mergedClsPrefix}-panel-toolbar__right`}>
                <ZTooltip>
                  {{
                    trigger: () => (
                      <ZButton
                        theme={mergedTheme.peers.Button}
                        themeOverrides={mergedTheme.peerOverrides.Button}
                        size="small"
                        variant="subtle"
                        onClick={onClose}
                      >
                        <ZIcon size="1rem">{() => <CloseIcon />}</ZIcon>
                      </ZButton>
                    ),
                    default: () => <span>{locale.close}</span>
                  }}
                </ZTooltip>
              </div>
            )}
          </>
        )}
      </div>
    )
  }
})
