import {
  h,
  defineComponent,
  computed,
  type PropType,
  inject,
  ref,
  Fragment,
  type CSSProperties
} from 'vue'
import { useConfig, useLocale, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  call,
  useReactiveProp,
  type ExtractPublicPropTypes,
  type MaybeArray
} from '../../_utils'
import { panelLight } from '../styles'
import type { PanelTheme } from '../styles'
import style from './styles/index.cssr'
import ZButton, { type ButtonProps } from '../../button/src/Button'
import ZDropdown from '../../dropdown/src/Dropdown'
import { ZIcon } from '../../icon/src/Icon'
import ZScrollbar from '../../scrollbar/src/Scrollbar'
import PanelToolbar from './PanelToolbar'
import { ArrowDropDownIcon, ArrowDropUpIcon } from '../../_internal/icons'
import { type DropdownMixedOption } from '../../dropdown/src/interface'
import { layoutSiderInjectionKey } from '../../layout/src/interface'
import { ZTitle, ZP } from '../../typography'
export const panelProps = {
  ...(useTheme.props as ThemeProps<PanelTheme>),
  title: String,
  description: String,
  closable: { type: Boolean, default: false },
  expanded: { type: Boolean, default: false },
  openInNewTab: { type: Boolean, default: false },
  expandable: { type: Boolean, default: false },
  headerActions: {
    type: Array as PropType<DropdownMixedOption[]>,
    default: () => []
  },
  primaryBtnProps: Object as PropType<ButtonProps>,
  secondaryBtnProps: Object as PropType<ButtonProps>,
  previousBtnProps: Object as PropType<ButtonProps>,
  nextBtnProps: Object as PropType<ButtonProps>,
  currentPage: Number,
  totalPages: Number,
  onHeaderActionSelect: [Function, Array] as PropType<
  MaybeArray<(value: string | Record<string, any>) => void>
  >,
  onPrimaryBtnClick: [Function, Array] as PropType<MaybeArray<() => void>>,
  onSecondaryBtnClick: [Function, Array] as PropType<MaybeArray<() => void>>,
  onPreviousBtnClick: [Function, Array] as PropType<MaybeArray<() => void>>,
  onNextBtnClick: [Function, Array] as PropType<MaybeArray<() => void>>,
  onClose: [Function, Array] as PropType<MaybeArray<() => void>>,
  onExpand: [Function, Array] as PropType<MaybeArray<() => void>>,
  onCollapse: [Function, Array] as PropType<MaybeArray<() => void>>,
  onOpenInNewTab: [Function, Array] as PropType<MaybeArray<() => void>>
} as const

export type PanelProps = ExtractPublicPropTypes<typeof panelProps>

export default defineComponent({
  name: 'Panel',
  props: panelProps,
  setup (props) {
    const layoutSiderProps = inject(layoutSiderInjectionKey)
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const headerActionsExpanded = ref(false)
    const expandedRef = useReactiveProp(() => props.expanded)
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
      const {
        headerTextColor,
        textColor,
        dividerColor,
        baseColor,
        paginationTextColor
      } = themeRef.value.self
      const { cubicBezierEaseInOut } = themeRef.value.common
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-text-color': textColor,
        '--z-divider-color': dividerColor,
        '--z-header-text-color': headerTextColor,
        '--z-pagination-text-color': paginationTextColor,
        '--z-content-background-color': baseColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'panel',
        computed(() => props.title ?? ''),
        cssVarsRef,
        props
      )
      : undefined
    const hasControlsRef = computed(() => props.closable)
    function onHeaderActionSelect (value: string): void {
      const { onHeaderActionSelect } = props
      if (onHeaderActionSelect) call(onHeaderActionSelect, value)
    }
    function onPrimaryBtnClick (e: MouseEvent): void {
      const { onPrimaryBtnClick } = props
      if (onPrimaryBtnClick) call(onPrimaryBtnClick)
    }
    function onSecondaryBtnClick (e: MouseEvent): void {
      const { onSecondaryBtnClick } = props
      if (onSecondaryBtnClick) call(onSecondaryBtnClick)
    }
    function onPreviousBtnClick (e: MouseEvent): void {
      const { onPreviousBtnClick } = props
      if (onPreviousBtnClick) call(onPreviousBtnClick)
    }
    function onNextBtnClick (e: MouseEvent): void {
      const { onNextBtnClick } = props
      if (onNextBtnClick) call(onNextBtnClick)
    }
    function onClose (e: MouseEvent): void {
      const { onClose } = props
      if (onClose) call(onClose)
      layoutSiderProps?.close()
    }
    function onExpand (e: MouseEvent): void {
      const { onExpand } = props
      if (onExpand) call(onExpand)
      layoutSiderProps?.expandToFullWidth()
    }
    function onCollapse (e: MouseEvent): void {
      const { onCollapse } = props
      if (onCollapse) call(onCollapse)
      layoutSiderProps?.collapseToInitialWidth()
    }
    function onOpenInNewTab (e: MouseEvent): void {
      const { onOpenInNewTab } = props
      if (onOpenInNewTab) call(onOpenInNewTab)
    }
    function onUpdateShow (val: boolean): void {
      headerActionsExpanded.value = val
    }
    return {
      hasControls: hasControlsRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      locale: localeRef,
      expanded: layoutSiderProps?.widthRef
        ? layoutSiderProps?.widthRef.value === '100%'
        : expandedRef,
      onHeaderActionSelect,
      onExpand,
      onCollapse,
      onClose,
      onPrimaryBtnClick,
      onSecondaryBtnClick,
      onPreviousBtnClick,
      onNextBtnClick,
      onOpenInNewTab,
      headerActionsExpanded,
      onUpdateShow
    }
  },
  render () {
    const {
      mergedClsPrefix,
      onRender,
      $slots,
      title,
      expanded,
      headerActions,
      headerActionsExpanded,
      closable,
      expandable,
      openInNewTab,
      hasControls,
      locale,
      onHeaderActionSelect,
      onClose,
      onPrimaryBtnClick,
      onSecondaryBtnClick,
      onPreviousBtnClick,
      onNextBtnClick,
      onExpand,
      onCollapse,
      onOpenInNewTab,
      onUpdateShow
    } = this
    onRender?.()

    return (
      <div
        class={`${mergedClsPrefix}-panel`}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-panel__header`}>
          {$slots.header ? (
            $slots.header?.()
          ) : (
            <>
              {/* Toolbar section at the top per Figma design */}
              <div class={`${mergedClsPrefix}-panel__header-toolbar-section`}>
                <PanelToolbar
                  expandable={expandable}
                  expanded={!!expanded}
                  openInNewTab={openInNewTab}
                  locale={locale}
                  closable={closable}
                  previousBtnProps={this.previousBtnProps}
                  nextBtnProps={this.nextBtnProps}
                  currentPage={this.currentPage}
                  totalPages={this.totalPages}
                  onExpand={onExpand}
                  onCollapse={onCollapse}
                  onOpenInNewTab={onOpenInNewTab}
                  onClose={onClose}
                  onPreviousBtnClick={onPreviousBtnClick}
                  onNextBtnClick={onNextBtnClick}
                >
                  {{
                    'window-controls': $slots['toolbar-window-controls'],
                    'navigation-controls':
                      $slots['toolbar-navigation-controls'],
                    pagination: $slots['toolbar-pagination'],
                    controls: $slots.controls
                  }}
                </PanelToolbar>
              </div>

              {/* Header content section below toolbar per Figma design */}
              {(title ||
                this.description ||
                $slots['header-start'] ||
                $slots['header-actions'] ||
                headerActions?.length > 0) && (
                <div class={`${mergedClsPrefix}-panel__header-content`}>
                  <div class={`${mergedClsPrefix}-panel__header-start`}>
                    {$slots['header-start']?.() ?? (
                      <>
                        {title && (
                          <ZTitle
                            variant="4-m"
                            class={`${mergedClsPrefix}-panel__title`}
                          >
                            {title}
                          </ZTitle>
                        )}
                        {this.description && (
                          <ZP
                            variant="2-r"
                            class={`${mergedClsPrefix}-panel__description`}
                          >
                            {this.description}
                          </ZP>
                        )}
                      </>
                    )}
                  </div>
                  <div class={`${mergedClsPrefix}-panel__header-end`}>
                    {$slots['header-actions']?.() ??
                      (headerActions && headerActions.length > 0 ? (
                        <div
                          class={[
                            `${mergedClsPrefix}-panel__header-actions`,
                            hasControls &&
                              `${mergedClsPrefix}-panel__has-controls`
                          ]}
                        >
                          <ZDropdown
                            show={headerActionsExpanded}
                            options={headerActions}
                            onSelect={onHeaderActionSelect}
                            onUpdate:show={onUpdateShow}
                          >
                            {{
                              default: () => (
                                <ZButton size="small" variant="outlined">
                                  {{
                                    default: () => 'Actions',
                                    end: () => (
                                      <ZIcon size="20">
                                        {{
                                          default: () => {
                                            return headerActionsExpanded ? (
                                              <ArrowDropUpIcon />
                                            ) : (
                                              <ArrowDropDownIcon />
                                            )
                                          }
                                        }}
                                      </ZIcon>
                                    )
                                  }}
                                </ZButton>
                              )
                            }}
                          </ZDropdown>
                        </div>
                      ) : null)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div class={`${mergedClsPrefix}-panel__content`}>
          <ZScrollbar>{$slots.default?.()}</ZScrollbar>
        </div>
        {($slots.footer ||
          $slots['footer-start'] ||
          $slots['footer-end'] ||
          this.primaryBtnProps ||
          this.secondaryBtnProps) && (
          <div class={`${mergedClsPrefix}-panel__footer`}>
            {$slots.footer ? (
              $slots.footer?.()
            ) : (
              <>
                <div class={`${mergedClsPrefix}-panel__footer-start`}>
                  {$slots['footer-start']?.() ?? (
                    <>
                      {this.primaryBtnProps && (
                        <ZButton
                          {...this.primaryBtnProps}
                          onClick={onPrimaryBtnClick}
                        ></ZButton>
                      )}
                      {this.secondaryBtnProps && (
                        <ZButton
                          {...this.secondaryBtnProps}
                          onClick={onSecondaryBtnClick}
                        ></ZButton>
                      )}
                    </>
                  )}
                </div>
                <div class={`${mergedClsPrefix}-panel__footer-end`}>
                  {$slots['footer-end']?.() ?? null}
                  {/* Removed previous/next buttons - now in header toolbar */}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    )
  }
})
