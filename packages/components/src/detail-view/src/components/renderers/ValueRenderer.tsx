import { detailsViewInjectionKey } from '../../context'
import { ZText } from './../../../../typography'
import { ZEllipsis } from './../../../../ellipsis'
import { defineComponent, h, inject, type VNodeChild } from 'vue'
import { isMatch } from '../../../../_external-dependencies/matcher'
import { useConfig } from '../../../../_mixins'
import { type RenderValue } from '../../interface'

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

    const renderValueRef = DetailsView?.renderValueRef
    const overridesRef = DetailsView?.overridesRef

    const renderPrefixValueRef = DetailsView?.renderPrefixValueRef
    const renderSuffixValueRef = DetailsView?.renderSuffixValueRef
    const valueStylesRef = DetailsView?.valueStylesRef
    const valueClassRef = DetailsView?.valueClassRef

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      renderValueRef,
      overridesRef,
      renderPrefixValueRef,
      renderSuffixValueRef,
      valueStylesRef,
      valueClassRef
    }
  },

  render () {
    let foundFirstOverride = null
    let prefixValue: any = null
    let suffixValue: any = null
    let overridesValueStyles = null
    let overridesValueClass = null

    const callRenderValue = (renderValue: RenderValue): VNodeChild => {
      return renderValue(this.$props.value, this.$props.label, this.$props.data)
    }

    const { mergedClsPrefix } = this
    if (this.overridesRef) {
      foundFirstOverride = Object.keys(this.overridesRef).find((pattern) =>
        isMatch(this.$props.path, pattern, { allPatterns: true })
      )

      if (foundFirstOverride) {
        const globalRenderValueRef =
          this.overridesRef[foundFirstOverride].renderValue
        overridesValueStyles = this.overridesRef[foundFirstOverride].valueStyles
        overridesValueClass = this.overridesRef[foundFirstOverride].valueClass
        prefixValue =
          (this.overridesRef[foundFirstOverride]?.prefixValue as any)?.(
            this.$props.value
          ) || null
        suffixValue =
          (this.overridesRef[foundFirstOverride]?.suffixValue as any)?.(
            this.$props.value
          ) || null
        if (globalRenderValueRef) {
          return (
            <div
              class={[this.valueClassRef, overridesValueClass]}
              style={{
                ...(this.valueStylesRef || {}),
                ...(overridesValueStyles || {})
              }}
            >
              {prefixValue}
              {callRenderValue(globalRenderValueRef)}
              {suffixValue}
            </div>
          )
        }
      }
    }
    if (this.renderPrefixValueRef) {
      prefixValue = callRenderValue(this.renderPrefixValueRef)
    }

    if (this.renderSuffixValueRef) {
      suffixValue = callRenderValue(this.renderSuffixValueRef)
    }

    if (this.renderValueRef) {
      return (
        <div
          class={[this.valueClassRef, overridesValueClass]}
          style={{
            ...(this.valueStylesRef || {}),
            ...(overridesValueStyles || {})
          }}
        >
          {prefixValue}
          {callRenderValue(this.renderValueRef)}
          {suffixValue}
        </div>
      )
    }

    const computedValue =
      foundFirstOverride &&
      this.overridesRef &&
      typeof this.overridesRef[foundFirstOverride].formatValue === 'function'
        ? this.overridesRef[foundFirstOverride].formatValue?.(this.$props.value)
        : this.$props.value

    return (
      <div
        class={[
          `${mergedClsPrefix}-details-view-content`,
          this.valueClassRef,
          overridesValueClass
        ]}
        style={{
          ...(this.valueStylesRef || {}),
          ...(overridesValueStyles || {})
        }}
      >
        {prefixValue}
        <ZText class={`${mergedClsPrefix}-details-view-content__value`}>
          {() => (
            <ZEllipsis
              tooltip={{
                width: 'trigger'
              }}
            >
              {() => computedValue}
            </ZEllipsis>
          )}
        </ZText>
        {suffixValue}
      </div>
    )
  }
})
