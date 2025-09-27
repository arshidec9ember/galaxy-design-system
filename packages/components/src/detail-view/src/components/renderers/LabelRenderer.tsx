import { inject, defineComponent, h, type VNodeChild } from 'vue'
import { detailsViewInjectionKey } from '../../context'
import { toTitleCase } from '../../utils'
import { ZText } from './../../../../typography'
import { isMatch } from '../../../../_external-dependencies/matcher'
import { ZTooltip } from './../../../../tooltip'
import { ZIcon } from './../../../../icon'
import { HelpIcon } from './../../../../_internal/icons'
import { ZEllipsis } from './../../../../ellipsis'
import { useConfig } from '../../../../_mixins'
import { type RenderLabel } from '../../interface'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: null
    },
    value: {
      type: [Object, String, Number, Boolean, Array],
      default: null
    },
    data: {
      type: Object,
      default: null
    },
    path: {
      type: String,
      required: true
    }
  },

  setup (props) {
    const DetailsView = inject(detailsViewInjectionKey, null)
    const { mergedClsPrefixRef } = useConfig(props)

    const renderLabelRef = DetailsView?.renderLabelRef
    const renderPrefixLabelRef = DetailsView?.renderPrefixLabelRef
    const renderSuffixLabelRef = DetailsView?.renderSuffixLabelRef
    const overridesRef = DetailsView?.overridesRef
    const optionsRef = DetailsView?.options
    const labelStylesRef = DetailsView?.labelStylesRef
    const labelClassRef = DetailsView?.labelClassRef

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      renderLabelRef,
      overridesRef,
      optionsRef,
      renderPrefixLabelRef,
      renderSuffixLabelRef,
      labelStylesRef,
      labelClassRef
    }
  },

  render () {
    const { mergedClsPrefix } = this
    let foundFirstOverride: string | undefined = void 0
    // TODO: Fix any type
    let prefixLabel: any
    let suffixLabel: any
    let overridesLabelStyles = null
    let overridesLabelClass = null

    const callRenderLabel = (renderLabel: RenderLabel): VNodeChild => {
      return renderLabel(this.$props.label, this.$props.value, this.$props.data)
    }

    if (this.overridesRef) {
      foundFirstOverride = Object.keys(this.overridesRef).find((pattern) =>
        isMatch(this.$props.path, pattern, { allPatterns: true })
      )

      if (foundFirstOverride) {
        const globalRenderValueRef =
          this.overridesRef[foundFirstOverride].renderLabel
        overridesLabelStyles = this.overridesRef[foundFirstOverride].labelStyles
        overridesLabelClass = this.overridesRef[foundFirstOverride].labelClass
        prefixLabel =
          (this.overridesRef[foundFirstOverride]?.prefixLabel as any)?.(
            this.$props.label
          ) || null
        suffixLabel =
          (this.overridesRef[foundFirstOverride]?.suffixLabel as any)?.(
            this.$props.label
          ) || null
        if (globalRenderValueRef) {
          return (
            <div
              class={[this.labelClassRef, overridesLabelClass]}
              style={{
                ...(this.labelStylesRef || {}),
                ...(overridesLabelStyles || {})
              }}
            >
              {prefixLabel}
              <ZEllipsis>
                {() => callRenderLabel(globalRenderValueRef)}
              </ZEllipsis>
              {suffixLabel}
            </div>
          )
        }
      }
    }

    if (this.renderPrefixLabelRef) {
      prefixLabel = callRenderLabel(this.renderPrefixLabelRef)
    }

    if (this.renderSuffixLabelRef) {
      suffixLabel = callRenderLabel(this.renderSuffixLabelRef)
    }

    if (this.renderLabelRef) {
      const renderedLabel = callRenderLabel(this.renderLabelRef)

      return (
        <div
          class={[this.labelClassRef, overridesLabelClass]}
          style={{
            ...(this.labelStylesRef || {}),
            ...(overridesLabelStyles || {})
          }}
        >
          {prefixLabel}
          {renderedLabel}
          {suffixLabel}
        </div>
      )
    }

    const label =
      foundFirstOverride &&
      this.overridesRef &&
      typeof this.overridesRef[foundFirstOverride].formatLabel === 'function'
        ? this.overridesRef[foundFirstOverride].formatLabel?.(this.$props.label)
        : toTitleCase(this.$props.label)

    const tooltipNode =
      foundFirstOverride &&
      this.overridesRef &&
      (typeof this.overridesRef[foundFirstOverride].options?.tooltip ===
      'string' ? (
        <ZTooltip trigger="hover">
          {{
            trigger: () => (
              <span>
                <ZIcon>{{ default: () => <HelpIcon /> }}</ZIcon>
              </span>
            ),
            default: () =>
              foundFirstOverride &&
              this.overridesRef?.[foundFirstOverride].options?.tooltip
          }}
        </ZTooltip>
          ) : typeof this.overridesRef[foundFirstOverride].options?.tooltip ===
        'function' ? (
        <ZTooltip trigger="hover">
          {{
            trigger: () => (
              <span>
                <ZIcon>{{ default: () => <HelpIcon /> }}</ZIcon>
              </span>
            ),
            default: () =>
              foundFirstOverride &&
              (
                this.overridesRef?.[foundFirstOverride]?.options?.tooltip as any
              )?.(this.$props.label)
          }}
        </ZTooltip>
              ) : null)

    return (
      <div
        class={[
          `${mergedClsPrefix}-details-view-content`,
          this.labelClassRef,
          overridesLabelClass
        ]}
        style={{
          ...(this.labelStylesRef || {}),
          ...(overridesLabelStyles || {})
        }}
      >
        {prefixLabel}
        <ZText class={[`${mergedClsPrefix}-details-view-content__key`]}>
          {() => (
            <ZEllipsis
              tooltip={{
                width: 'trigger'
              }}
            >
              {() => label}
            </ZEllipsis>
          )}
        </ZText>
        {tooltipNode}
        {suffixLabel}
      </div>
    )
  }
})
