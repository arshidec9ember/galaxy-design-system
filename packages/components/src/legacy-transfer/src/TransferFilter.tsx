import { h, defineComponent, inject, type PropType } from 'vue'
import { SearchIcon } from '../../_internal/icons'
import { ZBaseIcon } from '../../_internal'
import { ZInput } from '../../input'
import { transferInjectionKey } from './interface'

export default defineComponent({
  name: 'TransferFilter',
  props: {
    value: String,
    placeholder: String,
    disabled: Boolean,
    onFocus: {
      type: Function as PropType<() => void>,
      required: true
    },
    onBlur: {
      type: Function as PropType<() => void>,
      required: true
    },
    onUpdateValue: {
      type: Function as PropType<(value: string | null) => void>,
      required: true
    }
  },
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedThemeRef, mergedClsPrefixRef } = inject(transferInjectionKey)!
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef
    }
  },
  render () {
    const { mergedTheme, mergedClsPrefix } = this
    return (
      <div class={`${mergedClsPrefix}-legacy-transfer-filter`}>
        <ZInput
          modelValue={this.value}
          onUpdateModelValue={this.onUpdateValue}
          disabled={this.disabled}
          theme={mergedTheme.peers.Input}
          themeOverrides={mergedTheme.peerOverrides.Input}
          clearable
          size="small"
          placeholder={this.placeholder}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        >
          {{
            'clear-icon-placeholder': () => (
              <ZBaseIcon
                clsPrefix={mergedClsPrefix}
                class={`${mergedClsPrefix}-legacy-transfer-icon`}
              >
                {{ default: () => <SearchIcon /> }}
              </ZBaseIcon>
            )
          }}
        </ZInput>
      </div>
    )
  }
})
