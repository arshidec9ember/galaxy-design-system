import {
  defineComponent,
  computed,
  h,
  type PropType,
  type CSSProperties
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import { useRtl } from '../../_mixins/use-rtl'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { tableLight } from '../styles'
import type { TableTheme } from '../styles'
import style from './styles/index.cssr'

export const tableProps = {
  ...(useTheme.props as ThemeProps<TableTheme>),
  bordered: {
    type: Boolean,
    default: true
  },
  bottomBordered: {
    type: Boolean,
    default: true
  },
  columnSeparator: {
    type: Boolean,
    default: false
  },
  striped: {
    type: Boolean,
    default: false
  },
  rowSeparator: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  }
}

export type TableProps = ExtractPublicPropTypes<typeof tableProps>

export default defineComponent({
  name: 'Table',
  props: tableProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)
    const themeRef = useTheme(
      'Table',
      '-table',
      style,
      tableLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('Table', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const { size } = props
      const {
        self: {
          borderColor,
          tdColor,
          tdColorModal,
          tdColorPopover,
          thColor,
          thColorModal,
          thColorPopover,
          thTextColor,
          tdTextColor,
          borderRadius,
          thFontWeight,
          lineHeight,
          borderColorModal,
          borderColorPopover,
          tdColorStriped,
          tdColorStripedModal,
          tdColorStripedPopover,
          [createKey('fontSize', size)]: fontSize,
          [createKey('tdPadding', size)]: tdPadding,
          [createKey('thPadding', size)]: thPadding
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-td-color': tdColor,
        '--z-td-color-modal': tdColorModal,
        '--z-td-color-popover': tdColorPopover,
        '--z-td-text-color': tdTextColor,
        '--z-border-color': borderColor,
        '--z-border-color-modal': borderColorModal,
        '--z-border-color-popover': borderColorPopover,
        '--z-border-radius': borderRadius,
        '--z-font-size': fontSize,
        '--z-th-color': thColor,
        '--z-th-color-modal': thColorModal,
        '--z-th-color-popover': thColorPopover,
        '--z-th-font-weight': thFontWeight,
        '--z-th-text-color': thTextColor,
        '--z-line-height': lineHeight,
        '--z-td-padding': tdPadding,
        '--z-th-padding': thPadding,
        '--z-td-color-striped': tdColorStriped,
        '--z-td-color-striped-modal': tdColorStripedModal,
        '--z-td-color-striped-popover': tdColorStripedPopover
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'table',
        computed(() => {
          return props.size[0]
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix } = this
    this.onRender?.()
    return (
      <table
        class={[
          `${mergedClsPrefix}-table`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-table--rtl`]: this.rtlEnabled,
            [`${mergedClsPrefix}-table--bottom-bordered`]: this.bottomBordered,
            [`${mergedClsPrefix}-table--bordered`]: this.bordered,
            [`${mergedClsPrefix}-table--hide-column-separator`]:
              !this.columnSeparator,
            [`${mergedClsPrefix}-table--hide-row-separator`]:
              !this.rowSeparator,
            [`${mergedClsPrefix}-table--striped`]: this.striped
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </table>
    )
  }
})
