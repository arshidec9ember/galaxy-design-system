import {
  isArray,
  isBoolean,
  isNumber,
  isObject,
  isString,
  lowerCase,
  startCase
} from 'lodash-es'
import {
  RenderDirection,
  type OverridesOptions,
  type DetailsViewData
} from './interface'
import { ZText } from '../../typography'
import { Fragment, type VNodeChild, h } from 'vue'
import { ZGrid, ZGridItem } from '../../grid'
import { ZAccordion, ZAccordionItem } from '../../accordion'
import { ZDataTable } from '../../data-table'
import { ZJsonViewer } from '../../json-viewer'

const defaultRenderDirection = RenderDirection.HORIZONTAL

const renderObjectValue = (
  data: DetailsViewData,
  level: number
): VNodeChild[] => {
  if (level > 3) {
    return [
      renderNode(
        null,
        <ZJsonViewer data={data} depth={4}></ZJsonViewer>,
        level + 1,
        RenderDirection.VERTICAL
      )
    ]
  }

  const nodes = []

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key]

      if (isString(value) || isNumber(value) || isBoolean(value)) {
        nodes.push(
          renderNode(
            renderLabel(key),
            renderValue(String(value)),
            level + 1,
            defaultRenderDirection
          )
        )
      }

      if (isObject(value)) {
        if (isArray(value)) {
          nodes.push(
            renderNode(
              renderLabel(key),
              renderArrayValue(value, level + 1),
              level + 1,
              RenderDirection.VERTICAL
            )
          )
        } else {
          nodes.push(
            renderNode(
              renderLabel(key),
              renderObjectValue(value, level + 1),
              level + 1,
              RenderDirection.VERTICAL
            )
          )
        }
      }
    }
  }

  return nodes
}

const renderArrayValue = (data: any[], level: number): any => {
  if (data.length > 5) {
    const columns = Object.keys(data[0]).map((header) => {
      return {
        title: toTitleCase(header),
        key: header
      }
    })
    return (
      <ZDataTable
        pagination={{ pageSize: 5 }}
        data={data}
        columns={columns}
      ></ZDataTable>
    )
  }

  return (
    <ZAccordion class={`z-details-view__details-row-level-${level}`}>
      {() =>
        data.map((item, idx) => (
          <ZAccordionItem
            class={`z-details-view__details-row-level-${level + 1}`}
            title={String(idx + 1)}
          >
            {() => renderObjectValue(item, level + 1)}
          </ZAccordionItem>
        ))
      }
    </ZAccordion>
  )
}

export const renderData = (
  data: any,
  overrides?: OverridesOptions
): VNodeChild[] => {
  if (isArray(data)) {
    return renderArrayValue(data, 0)
  }

  return renderObjectValue(data, 0)
}

const toTitleCase = (text: string): string => {
  return startCase(lowerCase(text))
}

export const renderLabel = (label: string): VNodeChild => {
  return <ZText strong>{() => toTitleCase(label)}</ZText>
}

export const renderValue = (value: string): VNodeChild => {
  return <ZText>{() => value}</ZText>
}

export const renderNode = (
  renderLabel: VNodeChild | null,
  renderValue: VNodeChild | VNodeChild[] | null,
  level: number,
  direction: RenderDirection = RenderDirection.HORIZONTAL
): VNodeChild => {
  const gridSize = direction === RenderDirection.HORIZONTAL ? 3 : 1
  const labelColSpan = direction === RenderDirection.HORIZONTAL ? 1 : 1
  const valueColSpan = direction === RenderDirection.HORIZONTAL ? 2 : 1
  return (
    <Fragment>
      <ZGrid
        class={[
          'z-details-view__details-row',
          `z-details-view__details-row--level-${level}`
        ]}
        cols={gridSize}
      >
        {() => [
          renderLabel && (
            <ZGridItem
              class={[
                'z-details-view__details-row-label-cell',
                `z-details-view__details-row-label-cell--${direction.toLocaleLowerCase()}`
              ]}
              span={labelColSpan}
            >
              {() => renderLabel}
            </ZGridItem>
          ),
          renderValue && (
            <ZGridItem
              class={[
                'z-details-view__details-row-value-cell',
                `z-details-view__details-row-value-cell--${direction.toLocaleLowerCase()}`
              ]}
              span={valueColSpan}
            >
              {() => renderValue}
            </ZGridItem>
          )
        ]}
      </ZGrid>
    </Fragment>
  )
}
