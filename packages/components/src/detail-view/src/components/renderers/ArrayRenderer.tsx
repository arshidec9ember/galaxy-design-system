import { ZDataTable } from '../../../../data-table'
import { ZTag } from '../../../../tag'
import { ZSpace } from '../../../../space'
import { ZAccordion, ZAccordionItem } from '../../../../accordion'
import { ZPopover } from '../../../../popover'
import { ZList, ZListItem } from '../../../../list'
import { type PropType, defineComponent, h, inject, Fragment } from 'vue'
import {
  isHeterogeneousArray,
  resolvePath,
  toTitleCase,
  isPrimitiveArray
} from '../../utils'
import ObjectRenderer from './ObjectRenderer'
import { detailsViewInjectionKey } from '../../context'
import { NUMBER_OF_TAG_TO_SHOW } from '../../constants'
import NodeRenderer from './NodeRenderer'
import { isBoolean, isNil, isNumber, isString } from 'lodash-es'
import LabelRenderer from './LabelRenderer'
import ValueRenderer from './ValueRenderer'
import { useConfig } from '../../../../_mixins'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<any[]>,
      required: true
    },
    path: {
      type: String,
      required: true
    },

    level: {
      type: Number,
      default: 0
    }
  },

  setup (props) {
    const DetailsView = inject(detailsViewInjectionKey, null)
    const { mergedClsPrefixRef } = useConfig(props)

    const renderLabelRef = DetailsView?.renderLabelRef
    const overridesRef = DetailsView?.overridesRef
    const optionsRef = DetailsView?.options

    const contentHeight = DetailsView?.contentHeight

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      renderLabelRef,
      overridesRef,
      optionsRef,
      contentHeight
    }
  },

  render () {
    const { data, level } = this.$props
    const { mergedClsPrefix } = this
    if (isPrimitiveArray(data)) {
      const numberOfDataToShow = NUMBER_OF_TAG_TO_SHOW
      const modifiedData = data.filter((d) => !isNil(d))
      const dataToShow = modifiedData.slice(0, numberOfDataToShow)
      const dataToHide = modifiedData.slice(numberOfDataToShow)
      return (
        <ZSpace>
          {() => (
            <Fragment>
              {dataToShow.map((d) => (
                <ZTag>{() => d}</ZTag>
              ))}
              {dataToHide.length ? (
                <ZPopover placement={'bottom-start'}>
                  {{
                    trigger: () => (
                      <ZTag>
                        {{
                          default: () => `+ ${dataToHide.length}`
                        }}
                      </ZTag>
                    ),
                    default: () => (
                      <ZList showDivider={false}>
                        {{
                          default: () =>
                            dataToHide.map((d) => (
                              <ZListItem>{() => d}</ZListItem>
                            ))
                        }}
                      </ZList>
                    )
                  }}
                </ZPopover>
              ) : null}
            </Fragment>
          )}
        </ZSpace>
      )
    }
    if (!isHeterogeneousArray(data)) {
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
    }

    const accordionProps = this.optionsRef?.accordionProps || {}

    return (
      <ZAccordion
        {...accordionProps}
        class={`${mergedClsPrefix}-details-view__details-row-level-${level}`}
        onItemHeaderClick={this.contentHeight}
      >
        {() =>
          data.map((item, idx) => (
            <ZAccordionItem
              class={`${mergedClsPrefix}-details-view__details-row-level-${
                level + 1
              }`}
              title={String(idx + 1)}
            >
              {() => {
                if (isString(item) || isNumber(item) || isBoolean(item)) {
                  return (
                    <NodeRenderer
                      path={resolvePath(this.$props.path, idx)}
                      level={level + 1}
                      data={{ key: idx, value: item }}
                      direction="horizontal"
                      key={idx}
                    >
                      {{
                        label: () => (
                          <LabelRenderer
                            path={resolvePath(this.$props.path, idx)}
                            label={idx.toString()}
                          ></LabelRenderer>
                        ),
                        value: () => (
                          <ValueRenderer
                            value={String(item)}
                            path={resolvePath(this.$props.path, idx)}
                          ></ValueRenderer>
                        )
                      }}
                    </NodeRenderer>
                  )
                }

                return (
                  <ObjectRenderer
                    data={item}
                    level={level + 1}
                    key={idx}
                    path={resolvePath(this.$props.path, idx)}
                  ></ObjectRenderer>
                )
              }}
            </ZAccordionItem>
          ))
        }
      </ZAccordion>
    )
  }
})
