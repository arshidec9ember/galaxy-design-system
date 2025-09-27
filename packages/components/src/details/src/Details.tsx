import {
  computed,
  h,
  defineComponent,
  type PropType,
  type VNode,
  type CSSProperties
} from 'vue'
import { useCompitable } from '../../_external-dependencies/vooks'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  warn,
  getSlot,
  getVNodeChildren,
  createKey,
  flatten
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { detailsLight } from '../styles'
import type { DetailsTheme } from '../styles'
import { isDetailsItem } from './utils'
import style from './styles/index.cssr'
import { repeat } from 'seemly'

export const detailsProps = {
  ...(useTheme.props as ThemeProps<DetailsTheme>),
  title: String,
  column: {
    type: Number,
    default: 3
  },
  columns: Number,
  labelPlacement: {
    type: String as PropType<'left' | 'top'>,
    default: 'top'
  },
  labelAlign: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'left'
  },
  separator: {
    type: String,
    default: ':'
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  bordered: Boolean,
  labelStyle: [Object, String] as PropType<string | CSSProperties>,
  contentStyle: [Object, String] as PropType<string | CSSProperties>
} as const

export type DetailsProps = ExtractPublicPropTypes<typeof detailsProps>
/** @deprecated You should use `DetailsProps` */
export type DetailProps = DetailsProps

export default defineComponent({
  name: 'Details',
  props: detailsProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Details',
      '-details',
      style,
      detailsLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { size, bordered } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          titleTextColor,
          thColor,
          thColorModal,
          thColorPopover,
          thTextColor,
          thFontWeight,
          tdTextColor,
          tdColor,
          tdColorModal,
          tdColorPopover,
          borderColor,
          borderColorModal,
          borderColorPopover,
          borderRadius,
          lineHeight,
          [createKey('fontSize', size)]: fontSize,
          [createKey(bordered ? 'thPaddingBordered' : 'thPadding', size)]:
            thPadding,
          [createKey(bordered ? 'tdPaddingBordered' : 'tdPadding', size)]:
            tdPadding
        }
      } = themeRef.value
      return {
        '--z-title-text-color': titleTextColor,
        '--z-th-padding': thPadding,
        '--z-td-padding': tdPadding,
        '--z-font-size': fontSize,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-th-font-weight': thFontWeight,
        '--z-line-height': lineHeight,
        '--z-th-text-color': thTextColor,
        '--z-td-text-color': tdTextColor,
        '--z-th-color': thColor,
        '--z-th-color-modal': thColorModal,
        '--z-th-color-popover': thColorPopover,
        '--z-td-color': tdColor,
        '--z-td-color-modal': tdColorModal,
        '--z-td-color-popover': tdColorPopover,
        '--z-border-radius': borderRadius,
        '--z-border-color': borderColor,
        '--z-border-color-modal': borderColorModal,
        '--z-border-color-popover': borderColorPopover
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'details',
        computed(() => {
          let hash = ''
          const { size, bordered } = props
          if (bordered) hash += 'a'
          hash += size[0]
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      compitableColumn: useCompitable(props, ['columns', 'column']),
      inlineThemeDisabled
    }
  },
  render () {
    const defaultSlots = this.$slots.default
    const children = defaultSlots ? flatten(defaultSlots()) : []
    const memorizedLength = children.length
    const {
      compitableColumn,
      labelPlacement,
      labelAlign,
      size,
      bordered,
      title,
      cssVars,
      mergedClsPrefix,
      separator,
      onRender
    } = this
    onRender?.()
    const filteredChildren: VNode[] = children.filter((child) =>
      isDetailsItem(child)
    )
    if (__DEV__ && memorizedLength !== filteredChildren.length) {
      warn('details', '`z-details` only takes `z-details-item` as children.')
    }
    const defaultState: {
      span: number
      row: VNode[]
      secondRow: VNode[]
      rows: VNode[][]
    } = {
      span: 0,
      row: [],
      secondRow: [],
      rows: []
    }
    const itemState = filteredChildren.reduce((state, vNode, index) => {
      const props = vNode.props || {}
      const isLastIteration = filteredChildren.length - 1 === index
      const itemLabel = [
        'label' in props ? props.label : getVNodeChildren(vNode, 'label')
      ]
      const itemChildren = [getVNodeChildren(vNode)]
      const itemSpan = (props.span as number) || 1
      const memorizedSpan = state.span
      state.span += itemSpan
      const labelStyle =
        props.labelStyle || props['label-style'] || this.labelStyle
      const contentStyle =
        props.contentStyle || props['content-style'] || this.contentStyle
      if (labelPlacement === 'left') {
        if (bordered) {
          state.row.push(
            <th
              class={`${mergedClsPrefix}-details-table-header`}
              colspan={1}
              style={labelStyle}
            >
              {itemLabel}
            </th>,
            <td
              class={`${mergedClsPrefix}-details-table-content`}
              colspan={
                isLastIteration
                  ? (compitableColumn - memorizedSpan) * 2 + 1
                  : itemSpan * 2 - 1
              }
              style={contentStyle}
            >
              {itemChildren}
            </td>
          )
        } else {
          state.row.push(
            <td
              class={`${mergedClsPrefix}-details-table-content`}
              colspan={
                isLastIteration
                  ? (compitableColumn - memorizedSpan) * 2
                  : itemSpan * 2
              }
            >
              <span
                class={`${mergedClsPrefix}-details-table-content__label`}
                style={labelStyle}
              >
                {[
                  ...itemLabel,
                  separator && (
                    <span class={`${mergedClsPrefix}-details-separator`}>
                      {separator}
                    </span>
                  )
                ]}
              </span>
              <span
                class={`${mergedClsPrefix}-details-table-content__content`}
                style={contentStyle}
              >
                {itemChildren}
              </span>
            </td>
          )
        }
      } else {
        const colspan = isLastIteration
          ? (compitableColumn - memorizedSpan) * 2
          : itemSpan * 2
        state.row.push(
          <th
            class={`${mergedClsPrefix}-details-table-header`}
            colspan={colspan}
            style={labelStyle}
          >
            {itemLabel}
          </th>
        )
        state.secondRow.push(
          <td
            class={`${mergedClsPrefix}-details-table-content`}
            colspan={colspan}
            style={contentStyle}
          >
            {itemChildren}
          </td>
        )
      }
      if (state.span >= compitableColumn || isLastIteration) {
        state.span = 0
        if (state.row.length) {
          state.rows.push(state.row)
          state.row = []
        }
        if (labelPlacement !== 'left') {
          if (state.secondRow.length) {
            state.rows.push(state.secondRow)
            state.secondRow = []
          }
        }
      }
      return state
    }, defaultState)
    const rows = itemState.rows.map((row) => (
      <tr class={`${mergedClsPrefix}-details-table-row`}>{row}</tr>
    ))
    return (
      <div
        style={cssVars as any}
        class={[
          `${mergedClsPrefix}-details`,
          this.themeClass,
          `${mergedClsPrefix}-details--${labelPlacement}-label-placement`,
          `${mergedClsPrefix}-details--${labelAlign}-label-align`,
          `${mergedClsPrefix}-details--${size}-size`,
          bordered && `${mergedClsPrefix}-details--bordered`
        ]}
      >
        {title || this.$slots.header ? (
          <div class={`${mergedClsPrefix}-details-header`}>
            {title || getSlot(this, 'header')}
          </div>
        ) : null}
        <div class={`${mergedClsPrefix}-details-table-wrapper`}>
          <table class={`${mergedClsPrefix}-details-table`}>
            <tbody>
              {labelPlacement === 'top' && (
                <tr
                  class={`${mergedClsPrefix}-details-table-row`}
                  style={{
                    visibility: 'collapse'
                  }}
                >
                  {repeat(compitableColumn * 2, <td />)}
                </tr>
              )}
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
})
