import {
  h,
  defineComponent,
  computed,
  type PropType,
  type CSSProperties
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { SuccessIcon, WarningIcon } from '../../_internal/icons'
import { ZBaseIcon } from '../../_internal'
import { resultLight } from '../styles'
import type { ResultTheme } from '../styles'
import style from './styles/index.cssr'
import ErrorRhombus from './errorRhombus'
import UnexpectedError from './UnexpectedError'
import InternalServerError500 from './InternalServerError500'
import Unauthorized401 from './Unauthorized401'
import InfoMessage from './InfoMessage'
import { ZTitle, ZP } from '../../typography'
import UnexpectedError404 from './UnexpectedError404'
import ServerError from './ServerError'
import SessionExpired from './SessionExpired'

const iconMap = {
  403: <ErrorRhombus />,
  404: <InfoMessage />,
  418: <ErrorRhombus />,
  500: <ErrorRhombus />,
  401: <ErrorRhombus />,
  '2xx': <SuccessIcon />,
  '3xx': <SuccessIcon />,
  '4xx': <ErrorRhombus />,
  '5xx': <ErrorRhombus />,
  info: <InfoMessage />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorRhombus />
}

const imageMap = {
  403: <UnexpectedError />,
  401: <Unauthorized401 />,
  404: <UnexpectedError404 />,
  418: <UnexpectedError />,
  500: <ServerError />,
  '2xx': <SuccessIcon />,
  '3xx': <SuccessIcon />,
  '4xx': <SessionExpired />,
  '5xx': <InternalServerError500 />,
  info: <InfoMessage />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <UnexpectedError />
}

export const resultProps = {
  ...(useTheme.props as ThemeProps<ResultTheme>),
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'x-large'>,
    default: 'medium'
  },
  status: {
    type: String as PropType<
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 401
    | 404
    | 403
    | 500
    | 418
    | '2xx'
    | '3xx'
    | '4xx'
    | '5xx'
    >,
    default: 'info'
  },
  title: String,
  description: String,
  align: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'center'
  },
  variant: {
    type: String as PropType<'icon' | 'image'>,
    default: 'icon'
  }
}

export type ResultProps = ExtractPublicPropTypes<typeof resultProps>

export default defineComponent({
  name: 'Result',
  props: resultProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Result',
      '-result',
      style,
      resultLight,
      props,
      mergedClsPrefixRef
    )
    const statusCode = computed(() => {
      const { status } = props
      const code = Number(status)
      if (iconMap[status]) {
        return status
      }
      if (!isNaN(code) || !iconMap[status]) {
        if (code >= 200 && code < 300) {
          return '2xx'
        } else if (code >= 300 && code < 400) {
          return '3xx'
        } else if (code >= 400 && code < 500) {
          return '4xx'
        } else {
          return '5xx'
        }
      }
      return 'info'
    })
    const statusColorCode = computed(() => {
      const statusCodeValue = statusCode.value
      if (typeof statusCodeValue === 'number') {
        const code = statusCodeValue
        if (code >= 200 && code < 400) {
          return 'success'
        } else if (code >= 400 && code < 500) {
          return 'error'
        }
      }
      if (statusCodeValue === '2xx' || statusCodeValue === '3xx') {
        return 'success'
      } else if (statusCodeValue === '4xx' || statusCodeValue === '5xx') {
        return 'error'
      } else {
        if (
          statusCodeValue === 'info' ||
          statusCodeValue === 'warning' ||
          statusCodeValue === 'success' ||
          statusCodeValue === 'error'
        ) {
          return statusCodeValue
        }
      }
      return 'info'
    })
    const cssVarsRef = computed(() => {
      const { size, align, variant } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          textColor,
          lineHeight,
          titleTextColor,
          titleFontWeight,
          descriptionTextColor,
          [createKey('iconColor', statusColorCode.value)]: iconColor,
          [createKey('fontSize', size)]: fontSize,
          [createKey('titleFontSize', size)]: titleFontSize,
          [createKey('iconSize', size)]: iconSize,
          [createKey(createKey('variantSize', size), variant)]: variantSize,
          [createKey('textAlign', align)]: textAlign
        }
      } = themeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-font-size': fontSize,
        '--z-icon-size': iconSize,
        '--z-line-height': lineHeight,
        '--z-text-color': textColor,
        '--z-description-text-color': descriptionTextColor,
        '--z-title-font-size': titleFontSize,
        '--z-text-align': textAlign,
        '--z-title-font-weight': titleFontWeight,
        '--z-title-text-color': titleTextColor,
        '--z-variant-size': variantSize,
        '--z-icon-color': iconColor || ''
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'result',
        computed(() => {
          const { size, status } = props
          let hash = ''
          if (size) {
            hash += size[0]
          }
          if (status) {
            hash += String(status)[0]
          }
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined
    const iconComponent = computed(() => {
      const { variant } = props
      return variant === 'image'
        ? imageMap[statusCode.value]
        : iconMap[statusCode.value]
    })

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      iconComponent,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { $slots, mergedClsPrefix, onRender, iconComponent, variant } = this
    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-result`,
          `${mergedClsPrefix}-result-${this.size}`,
          this.themeClass
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={[
            `${mergedClsPrefix}-result-icon`,
            `${mergedClsPrefix}-result-icon-${variant}`
          ]}
        >
          {$slots.icon?.() ?? (
            <ZBaseIcon clsPrefix={mergedClsPrefix}>
              {{ default: () => iconComponent }}
            </ZBaseIcon>
          )}
        </div>
        {this.title ? (
          <ZTitle variant="4-m" class={`${mergedClsPrefix}-result__title`}>
            {{ default: () => this.title }}
          </ZTitle>
        ) : null}
        {this.description ? (
          <ZP variant="2-r" class={`${mergedClsPrefix}-result__description`}>
            {this.description}
          </ZP>
        ) : null}
        {$slots.default && (
          <article class={`${mergedClsPrefix}-result__content`}>
            {$slots}
          </article>
        )}
        {$slots.actions && (
          <div class={`${mergedClsPrefix}-result__actions`}>
            {$slots.actions()}
          </div>
        )}
      </div>
    )
  }
})
