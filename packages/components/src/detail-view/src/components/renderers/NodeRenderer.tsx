import { ZGrid, ZGridItem } from '../../../../grid'
import { ZDivider } from '../../../../divider'
import { type PropType, defineComponent, h, inject } from 'vue'
import { detailsViewInjectionKey } from '../../context'
import { isMatch } from '../../../../_external-dependencies/matcher'
import { useConfig } from '../../../../_mixins'

export default defineComponent({
  props: {
    level: {
      type: Number,
      default: 0
    },
    data: {
      type: Object as PropType<any>,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal'
    }
  },

  setup (props) {
    const DetailsView = inject(detailsViewInjectionKey, null)
    const { mergedClsPrefixRef } = useConfig(props)

    const renderNodeRef = DetailsView?.renderNodeRef
    const overridesRef = DetailsView?.overridesRef
    const optionsRef = DetailsView?.options
    const nodeStylesRef = DetailsView?.nodeStylesRef
    const nodeClassRef = DetailsView?.nodeClassRef
    const dividerRef = DetailsView?.dividerRef

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      renderNodeRef,
      overridesRef,
      optionsRef,
      nodeStylesRef,
      nodeClassRef,
      dividerRef
    }
  },

  render () {
    let foundFirstOverride: string | undefined = void 0
    let overridesNodeStyles: any
    let overridesNodeClass: any
    const { mergedClsPrefix } = this

    if (this.overridesRef) {
      foundFirstOverride = Object.keys(this.overridesRef).find((pattern) =>
        isMatch(this.$props.path, pattern, { allPatterns: true })
      )

      if (foundFirstOverride) {
        const pathSpecificRenderNodeRef =
          this.overridesRef[foundFirstOverride].renderNode
        overridesNodeStyles = this.overridesRef[foundFirstOverride].nodeStyles
        overridesNodeClass = this.overridesRef[foundFirstOverride].nodeClass
        if (pathSpecificRenderNodeRef) {
          return pathSpecificRenderNodeRef({
            level: this.$props.level,
            data: this.$props.data,
            path: this.$props.path
          })
        }
      }
    }

    if (this.renderNodeRef) {
      return this.renderNodeRef({
        level: this.$props.level,
        data: this.$props.data,
        path: this.$props.path
      })
    }

    const gridSize =
      this.optionsRef?.gridSize ??
      (this.$props.direction === 'horizontal' ? 3 : 1)
    const labelCellSpan =
      this.optionsRef?.labelSpan ??
      (this.$props.direction === 'horizontal' ? 1 : 1)
    const valueCellSpan =
      this.optionsRef?.valueSpan ??
      (this.$props.direction === 'horizontal' ? 2 : 1)

    return (
      <div class={[`${mergedClsPrefix}-details-view__details-node-wrapper`]}>
        <ZGrid
          class={[
            `${mergedClsPrefix}-details-view__details-node`,
            `${mergedClsPrefix}-details-view__details-node-level-${this.$props.level}`,
            this.nodeClassRef,
            overridesNodeClass
          ]}
          cols={gridSize}
          style={{
            ...(this.nodeStylesRef || {}),
            ...(overridesNodeStyles || {})
          }}
        >
          {() => [
            this.$slots?.label && (
              <ZGridItem
                class={[
                  `${mergedClsPrefix}-details-view__details-node-label-cell`,
                  `${mergedClsPrefix}-details-view__details-node-label-cell--${this.$props.direction.toLocaleLowerCase()}`
                ]}
                span={labelCellSpan}
              >
                {() => this.$slots?.label?.()}
              </ZGridItem>
            ),
            this.$slots?.value && (
              <ZGridItem
                class={[
                  `${mergedClsPrefix}-details-view__details-node-value-cell`,
                  `${mergedClsPrefix}-details-view__details-node-value-cell--${this.$props.direction.toLocaleLowerCase()}`
                ]}
                span={valueCellSpan}
              >
                {() => this.$slots?.value?.()}
              </ZGridItem>
            )
          ]}
        </ZGrid>
        {this.dividerRef && <ZDivider />}
      </div>
    )
  }
})
