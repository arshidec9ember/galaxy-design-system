import {
  type CSSProperties,
  defineComponent,
  h,
  inject,
  type PropType
} from 'vue'
import { ZBaseClose, ZScrollbar } from '../../_internal'
import type { ScrollbarProps } from '../../_internal'
import { throwError } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { drawerInjectionKey } from './interface'

export const drawerContentProps = {
  title: {
    type: String
  },
  description: {
    type: String
  },
  headerStyle: [Object, String] as PropType<string | CSSProperties>,
  footerStyle: [Object, String] as PropType<string | CSSProperties>,
  bodyStyle: [Object, String] as PropType<string | CSSProperties>,
  bodyContentStyle: [Object, String] as PropType<string | CSSProperties>,
  nativeScrollbar: { type: Boolean, default: true },
  scrollbarProps: Object as PropType<ScrollbarProps>,
  closable: Boolean
}

export type DrawerContentProps = ExtractPublicPropTypes<
  typeof drawerContentProps
>

export default defineComponent({
  name: 'DrawerContent',
  props: drawerContentProps,
  setup () {
    const ZDrawer = inject(drawerInjectionKey, null)
    if (!ZDrawer) {
      throwError(
        'drawer-content',
        '`z-drawer-content` must be placed inside `z-drawer`.'
      )
    }
    const { doUpdateShow } = ZDrawer
    function handleCloseClick (): void {
      doUpdateShow(false)
    }
    return {
      handleCloseClick,
      mergedTheme: ZDrawer.mergedThemeRef,
      mergedClsPrefix: ZDrawer.mergedClsPrefixRef
    }
  },
  render () {
    const {
      title,
      description,
      mergedClsPrefix,
      nativeScrollbar,
      mergedTheme,
      bodyStyle,
      bodyContentStyle,
      headerStyle,
      footerStyle,
      scrollbarProps,
      closable,
      $slots
    } = this
    return (
      <div
        role="none"
        class={[
          `${mergedClsPrefix}-drawer-content`,
          nativeScrollbar &&
            `${mergedClsPrefix}-drawer-content--native-scrollbar`
        ]}
      >
        <div
          class={`${mergedClsPrefix}-drawer-header`}
          style={headerStyle}
          role="none"
        >
          {$slots.header ? (
            $slots.header()
          ) : (
            <div class={`${mergedClsPrefix}-drawer-header__container`}>
              <div class={`${mergedClsPrefix}-drawer-header__left`}>
                {$slots['header-left'] ? $slots['header-left']() : null}
              </div>
              <div class={`${mergedClsPrefix}-drawer-header__center`}>
                <div
                  class={`${mergedClsPrefix}-drawer-header__title`}
                  role="heading"
                  aria-level="1"
                >
                  {$slots.title ? $slots.title() : title}
                </div>
                <div
                  class={`${mergedClsPrefix}-drawer-header__description`}
                  role="heading"
                  aria-level="2"
                >
                  {$slots.description ? $slots.description() : description}
                </div>
              </div>
              <div class={`${mergedClsPrefix}-drawer-header__right`}>
                {closable && (
                  <ZBaseClose
                    onClick={this.handleCloseClick}
                    clsPrefix={mergedClsPrefix}
                    class={`${mergedClsPrefix}-drawer-header__close`}
                    absolute
                  />
                )}
                {$slots['header-right'] ? $slots['header-right']() : null}
              </div>
            </div>
          )}
        </div>
        {nativeScrollbar ? (
          <div
            class={`${mergedClsPrefix}-drawer-body`}
            style={bodyStyle}
            role="none"
          >
            <div
              class={`${mergedClsPrefix}-drawer-body-content-wrapper`}
              style={bodyContentStyle}
              role="none"
            >
              {$slots}
            </div>
          </div>
        ) : (
          <ZScrollbar
            themeOverrides={mergedTheme.peerOverrides.Scrollbar}
            theme={mergedTheme.peers.Scrollbar}
            {...scrollbarProps}
            class={`${mergedClsPrefix}-drawer-body`}
            contentClass={`${mergedClsPrefix}-drawer-body-content-wrapper`}
            contentStyle={bodyContentStyle}
          >
            {$slots}
          </ZScrollbar>
        )}
        {$slots.footer ? (
          <div
            class={`${mergedClsPrefix}-drawer-footer`}
            style={footerStyle}
            role="none"
          >
            {$slots.footer()}
          </div>
        ) : null}
      </div>
    )
  }
})
