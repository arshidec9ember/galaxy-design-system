import {
  h,
  defineComponent,
  computed,
  type PropType,
  inject,
  type VNodeChild
} from 'vue'
import { configProviderInjectionKey } from '../../config-provider/src/context'
import { ZBaseIcon } from '../../_internal/icon'
import NoContentImage from './NoContentImage'
import { useConfig, useLocale, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { emptyLight } from '../styles'
import type { EmptyTheme } from '../styles'
import style from './styles/index.cssr'

import { ZTitle, ZP } from '../../typography'

export const emptyProps = {
  ...(useTheme.props as ThemeProps<EmptyTheme>),
  description: String,
  title: String,
  showDescription: {
    type: Boolean,
    default: true
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'x-large'>,
    default: 'medium'
  },
  renderIcon: Function as PropType<() => VNodeChild>
}

export type EmptyProps = ExtractPublicPropTypes<typeof emptyProps>

export default defineComponent({
  name: 'Empty',
  props: emptyProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Empty',
      '-empty',
      style,
      emptyLight,
      props,
      mergedClsPrefixRef
    )
    const { localeRef } = useLocale('Empty')
    const ZConfigProvider = inject(configProviderInjectionKey, null)
    const mergedDescriptionRef = computed(() => {
      return (
        props.description ??
        ZConfigProvider?.mergedComponentPropsRef.value?.Empty?.description
      )
    })
    const mergedTitleRef = computed(() => {
      return (
        props.title ??
        ZConfigProvider?.mergedComponentPropsRef.value?.Empty?.title
      )
    })
    const mergedRenderIconRef = computed(
      () =>
        ZConfigProvider?.mergedComponentPropsRef.value?.Empty?.renderIcon ||
        (() => <NoContentImage />)
    )
    const cssVarsRef = computed(() => {
      const { size } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          [createKey('iconSize', size)]: iconSize,
          [createKey('titleFontSize', size)]: titleFontSize,
          [createKey('descriptionFontSize', size)]: descriptionFontSize,
          textColor,
          titleTextColor,
          descriptionTextColor,
          iconColor,
          actionsTextColor
        }
      } = themeRef.value
      return {
        '--z-icon-size': iconSize,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-text-color': textColor,
        '--z-empty-title-text-color': titleTextColor,
        '--z-empty-title-font-size': titleFontSize,
        '--z-empty-description-font-size': descriptionFontSize,
        '--z-empty-description-text-color': descriptionTextColor,
        '--z-icon-color': iconColor,
        '--z-actions-text-color': actionsTextColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'empty',
        computed(() => {
          let hash = ''
          const { size } = props
          hash += size[0]
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedRenderIcon: mergedRenderIconRef,
      localizedDescription: computed(() => {
        return mergedDescriptionRef.value || localeRef.value.description
      }),
      localizedTitle: computed(() => {
        return mergedTitleRef.value || localeRef.value.title
      }),
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { $slots, mergedClsPrefix, onRender } = this
    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-empty`,
          this.themeClass,
          `${mergedClsPrefix}-empty-${this.size}`
        ]}
        style={this.cssVars as any}
      >
        {this.showIcon ? (
          <div
            class={[
              `${mergedClsPrefix}-empty__icon`,
              `${mergedClsPrefix}-empty-${this.size}__icon`
            ]}
          >
            {$slots.icon ? (
              $slots.icon()
            ) : (
              <ZBaseIcon clsPrefix={mergedClsPrefix}>
                {{ default: this.mergedRenderIcon }}
              </ZBaseIcon>
            )}
          </div>
        ) : null}
        {this.showTitle && this.localizedTitle ? (
          <ZTitle
            variant="4-m"
            class={[
              `${mergedClsPrefix}-empty__title`,
              `${mergedClsPrefix}-empty-${this.size}__title`
            ]}
          >
            {() => this.localizedTitle}
          </ZTitle>
        ) : null}
        {this.showDescription ? (
          $slots.default ? (
            <article
              class={[
                `${mergedClsPrefix}-empty__default-content`,
                `${mergedClsPrefix}-empty-${this.size}__default-content`
              ]}
            >
              {$slots.default()}
            </article>
          ) : (
            <ZP
              variant="2-r"
              class={[
                `${mergedClsPrefix}-empty__description`,
                `${mergedClsPrefix}-empty-${this.size}__description`
              ]}
            >
              {this.localizedDescription}
            </ZP>
          )
        ) : null}
        {$slots.actions ? (
          <div
            class={[
              `${mergedClsPrefix}-empty__actions`,
              `${mergedClsPrefix}-empty-${this.size}__actions`
            ]}
          >
            {$slots.actions()}
          </div>
        ) : null}
      </div>
    )
  }
})
