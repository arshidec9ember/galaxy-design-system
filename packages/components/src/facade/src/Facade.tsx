import {
  h,
  defineComponent,
  computed,
  type CSSProperties,
  Fragment,
  type PropType
} from 'vue'
import { useConfig, useTheme, useThemeClass, useRtl } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { ThemeProps } from '../../_mixins'
import { facadeLight } from '../styles'
import type { FacadeTheme } from '../styles'
import style from './styles/index.cssr'
import { ZTitle, ZText } from '../../typography'

export const facadeProps = {
  ...(useTheme.props as ThemeProps<FacadeTheme>),
  title: String,
  description: String,
  descriptionStyle: [String, Object] as PropType<string | CSSProperties>,
  content: String,
  contentStyle: [String, Object] as PropType<string | CSSProperties>,
  contentIndented: Boolean
}

export type FacadeProps = ExtractPublicPropTypes<typeof facadeProps>

export default defineComponent({
  name: 'Facade',
  props: facadeProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)
    const themeRef = useTheme(
      'Facade',
      '-facade',
      style,
      facadeLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('Facade', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const {
        self: { titleTextColor, textColor, titleFontWeight, fontSize },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-font-size': fontSize,
        '--z-text-color': textColor,
        '--z-title-font-weight': titleFontWeight,
        '--z-title-text-color': titleTextColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('facade', undefined, cssVarsRef, props)
      : undefined

    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      const rtlEnabled = rtlEnabledRef ? rtlEnabledRef.value : false
      themeClassHandle?.onRender?.()
      return (
        <div
          class={[
            `${mergedClsPrefix}-facade`,
            themeClassHandle?.themeClass,
            rtlEnabled && `${mergedClsPrefix}-facade--rtl`
          ]}
          style={
            inlineThemeDisabled
              ? undefined
              : (cssVarsRef.value as CSSProperties)
          }
        >
          {slots.avatar && props.contentIndented ? (
            <div class={`${mergedClsPrefix}-facade-avatar`}>
              {slots.avatar()}
            </div>
          ) : null}
          <div class={`${mergedClsPrefix}-facade-main`}>
            {!props.contentIndented &&
            (slots.header ||
              props.title ||
              slots['header-end'] ||
              slots.avatar) ? (
              <div class={`${mergedClsPrefix}-facade-avatar-header-wrapper`}>
                {slots.avatar ? (
                  <div class={`${mergedClsPrefix}-facade-avatar`}>
                    {slots.avatar()}
                  </div>
                ) : null}
                {slots.header || props.title || slots['header-end'] ? (
                  <div class={`${mergedClsPrefix}-facade-header-wrapper`}>
                    <div class={`${mergedClsPrefix}-facade-header`}>
                      {slots.header || props.title ? (
                        <ZTitle
                          variant="5-m"
                          class={`${mergedClsPrefix}-facade-header__title`}
                        >
                          {slots.header ? slots.header() : props.title}
                        </ZTitle>
                      ) : null}
                      {slots['header-end'] ? (
                        <div class={`${mergedClsPrefix}-facade-header__end`}>
                          {slots['header-end']?.()}
                        </div>
                      ) : null}
                    </div>
                    {slots.description || props.description ? (
                      <ZText
                        variant="4-r"
                        color="inherit"
                        class={`${mergedClsPrefix}-facade-main__description`}
                        style={props.descriptionStyle}
                      >
                        {slots.description
                          ? slots.description()
                          : props.description}
                      </ZText>
                    ) : null}
                  </div>
                ) : null}
              </div>
                ) : (
              <>
                {slots.header || props.title || slots['header-end'] ? (
                  <div class={`${mergedClsPrefix}-facade-header`}>
                    {slots.header || props.title ? (
                      <ZTitle
                        variant="5-m"
                        class={`${mergedClsPrefix}-facade-header__title`}
                      >
                        {slots.header ? slots.header() : props.title}
                      </ZTitle>
                    ) : null}
                    {slots['header-end'] ? (
                      <div class={`${mergedClsPrefix}-facade-header__end`}>
                        {slots['header-end']?.()}
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {slots.description || props.description ? (
                  <ZText
                    variant="4-r"
                    color="inherit"
                    class={`${mergedClsPrefix}-facade-main__description`}
                    style={props.descriptionStyle}
                  >
                    {slots.description
                      ? slots.description()
                      : props.description}
                  </ZText>
                ) : null}
              </>
                )}
            {slots.default || props.content ? (
              <div
                class={`${mergedClsPrefix}-facade-main__content`}
                style={props.contentStyle}
              >
                {slots.default ? slots.default() : props.content}
              </div>
            ) : null}
            {slots.footer ? (
              <div class={`${mergedClsPrefix}-facade-main__footer`}>
                {slots.footer()}
              </div>
            ) : null}
            {slots.action ? (
              <div class={`${mergedClsPrefix}-facade-main__action`}>
                {slots.action()}
              </div>
            ) : null}
          </div>
        </div>
      )
    }
  }
})
