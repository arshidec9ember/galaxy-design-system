import ArrayRenderer from './ArrayRenderer'
import LabelRenderer from './LabelRenderer'
import NodeRenderer from './NodeRenderer'
import { ZAccordion, ZAccordionItem } from '../../../../accordion'
import ValueRenderer from './ValueRenderer'
import { isArray, isBoolean, isNumber, isObject, isString } from 'lodash-es'
import { isPrimitiveArray, resolvePath } from '../../utils'
import { ZJsonViewer } from '../../../../json-viewer'
import { type PropType, defineComponent, h, inject, computed } from 'vue'
import { detailsViewInjectionKey } from '../../context'
import { useConfig } from '../../../../_mixins'
import {
  ACCORDION_LEVEL_LIMIT,
  JSON_VIEWER_LEVEL_OFFSET
} from '../../constants'

const ObjectRenderer = defineComponent({
  props: {
    data: {
      type: Object as PropType<any>,
      required: true
    },

    level: {
      type: Number,
      default: 0
    },

    path: {
      type: String,
      required: true
    },
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal'
    },
    renderType: {
      type: String as PropType<'key-value' | 'accordion' | 'json' | 'tabs'>,
      default: 'key-value'
    }
  },
  setup (props) {
    const DetailsView = inject(detailsViewInjectionKey, null)
    const { mergedClsPrefixRef } = useConfig(props)

    const renderLabelRef = DetailsView?.renderLabelRef
    const overridesRef = DetailsView?.overridesRef
    const optionsRef = DetailsView?.options

    const jsonViewerLevelOffsetRef = computed(() => {
      return (
        optionsRef?.value?.jsonViewerLevelOffset ?? JSON_VIEWER_LEVEL_OFFSET
      )
    })

    const renderTypeRef = computed(() => {
      return optionsRef?.value?.renderType || props.renderType
    })

    const accordionLevelLimitRef = computed(() => {
      return optionsRef?.value?.accordionLevelLimit ?? ACCORDION_LEVEL_LIMIT
    })

    const contentHeight = DetailsView?.contentHeight

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      renderLabelRef,
      overridesRef,
      accordionLevelLimit: accordionLevelLimitRef,
      options: optionsRef,
      renderType: renderTypeRef,
      levelToShowJson: jsonViewerLevelOffsetRef,
      contentHeight
    }
  },

  render () {
    const { level, data } = this.$props
    const { renderType, contentHeight } = this
    const { mergedClsPrefix } = this

    if (
      renderType === 'accordion' &&
      data &&
      !Array.isArray(data) &&
      level < this.accordionLevelLimit
    ) {
      const accordionProps = this.options?.accordionProps || {}

      return (
        <ZAccordion
          {...accordionProps}
          onItemHeaderClick={contentHeight}
          class={`${mergedClsPrefix}-details-view__details-row-level-${level}`}
        >
          {() =>
            Object.entries(data).map(([key, item], idx) => {
              if (isString(item) || isNumber(item) || isBoolean(item)) {
                const label = key || idx.toString()
                const value = String(item)
                return (
                  <NodeRenderer
                    path={resolvePath(this.$props.path, key)}
                    level={level + 1}
                    data={{ key: idx, value: item }}
                    direction="horizontal"
                    key={idx}
                  >
                    {{
                      label: () => (
                        <LabelRenderer
                          path={resolvePath(this.$props.path, key)}
                          label={label}
                          value={value}
                          data={data}
                        ></LabelRenderer>
                      ),
                      value: () => (
                        <ValueRenderer
                          label={label}
                          value={value}
                          data={data}
                          path={resolvePath(this.$props.path, key)}
                        ></ValueRenderer>
                      )
                    }}
                  </NodeRenderer>
                )
              }
              if (isArray(item) && isPrimitiveArray(item)) {
                return (
                  <NodeRenderer
                    path={resolvePath(this.$props.path, key)}
                    level={level + 1}
                    data={{ key: idx, value: item }}
                    direction="horizontal"
                    key={idx}
                  >
                    {{
                      label: () => (
                        <LabelRenderer
                          path={resolvePath(this.$props.path, key)}
                          label={key || idx.toString()}
                          value={item}
                          data={data}
                        ></LabelRenderer>
                      ),
                      value: () => (
                        <ArrayRenderer
                          data={item}
                          level={level + 1}
                          path={resolvePath(this.$props.path, key)}
                        ></ArrayRenderer>
                      )
                    }}
                  </NodeRenderer>
                )
              }
              return (
                <ZAccordionItem
                  class={`${mergedClsPrefix}-details-view__details-row-level-${
                    level + 1
                  }`}
                  title={key}
                >
                  {() => {
                    if (isString(item) || isNumber(item) || isBoolean(item)) {
                      const label = idx.toString()
                      const value = String(item)
                      return (
                        <NodeRenderer
                          path={resolvePath(this.$props.path, key)}
                          level={level + 1}
                          data={{ key: key || idx, value: item }}
                          direction="horizontal"
                          key={idx}
                        >
                          {{
                            label: () => (
                              <LabelRenderer
                                path={resolvePath(this.$props.path, key)}
                                label={label}
                                value={value}
                                data={data}
                              ></LabelRenderer>
                            ),
                            value: () => (
                              <ValueRenderer
                                label={label}
                                value={value}
                                data={data}
                                path={resolvePath(this.$props.path, key)}
                              ></ValueRenderer>
                            )
                          }}
                        </NodeRenderer>
                      )
                    }

                    if (isArray(item)) {
                      return (
                        <ArrayRenderer
                          data={item}
                          level={level + 1}
                          path={resolvePath(this.$props.path, key)}
                        ></ArrayRenderer>
                      )
                    }

                    return (
                      <ObjectRenderer
                        data={item}
                        level={level + 1}
                        key={idx}
                        path={resolvePath(this.$props.path, key)}
                      ></ObjectRenderer>
                    )
                  }}
                </ZAccordionItem>
              )
            })
          }
        </ZAccordion>
      )
    }

    if (level > this.levelToShowJson || this.$props.renderType === 'json') {
      return [
        <NodeRenderer
          path={this.$props.path}
          level={level + 1}
          data={{ key: this.$props.path.split('.').pop(), value: data }}
          direction={this.options?.arrayDirection || 'vertical'}
        >
          {{ value: () => <ZJsonViewer data={data} depth={4}></ZJsonViewer> }}
        </NodeRenderer>
      ]
    }

    const nodes = []

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key]

        const objectPath = resolvePath(this.$props.path, key)

        const labelRenderer = (
          <LabelRenderer path={objectPath} label={key}></LabelRenderer>
        )

        if (isString(value) || isNumber(value) || isBoolean(value)) {
          nodes.push(
            <NodeRenderer
              path={objectPath}
              level={level + 1}
              data={{ key, value }}
              direction="horizontal"
              key={key}
            >
              {{
                label: () => labelRenderer,
                value: () => (
                  <ValueRenderer
                    value={String(value)}
                    path={objectPath}
                  ></ValueRenderer>
                )
              }}
            </NodeRenderer>
          )
        }

        if (isObject(value)) {
          if (isArray(value)) {
            const nodeDirection = isPrimitiveArray(value)
              ? 'horizontal'
              : this.options?.arrayDirection || 'vertical'
            nodes.push(
              <NodeRenderer
                path={objectPath}
                level={level + 1}
                data={{ key, value }}
                direction={nodeDirection}
              >
                {{
                  label: () => labelRenderer,
                  value: () => (
                    <ArrayRenderer
                      data={value}
                      level={level + 1}
                      path={objectPath}
                    ></ArrayRenderer>
                  )
                }}
              </NodeRenderer>
            )
          } else {
            nodes.push(
              <NodeRenderer
                path={objectPath}
                level={level + 1}
                data={{ key, value }}
                direction={
                  level >= this.levelToShowJson && this.options?.arrayDirection
                    ? this.options?.arrayDirection
                    : 'vertical'
                }
              >
                {{
                  label: () => labelRenderer,
                  value: () => (
                    <ObjectRenderer
                      data={value}
                      level={level + 1}
                      path={objectPath}
                      direction={this.$props.direction}
                    ></ObjectRenderer>
                  )
                }}
              </NodeRenderer>
            )
          }
        }
      }
    }

    return nodes
  }
})

export default ObjectRenderer
