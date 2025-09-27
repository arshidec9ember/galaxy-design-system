import { h, defineComponent, type PropType } from 'vue'
import { ChevronRightIcon } from '../../../_internal/icons'
import {
  ZBaseIcon,
  ZBaseLoading,
  ZIconSwitchTransition
} from '../../../_internal'
import type { RenderExpandIcon } from '../interface'

export default defineComponent({
  name: 'DataTableExpandTrigger',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    expanded: Boolean,
    loading: Boolean,
    onClick: {
      type: Function as PropType<() => void>,
      required: true
    },
    renderRowExpandIcon: {
      type: Function as PropType<RenderExpandIcon>
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div
        class={[
          `${clsPrefix}-data-table-expand-trigger`,
          this.expanded && `${clsPrefix}-data-table-expand-trigger--expanded`
        ]}
        onClick={this.onClick}
        onMousedown={(e) => {
          e.preventDefault()
        }}
      >
        <ZIconSwitchTransition>
          {{
            default: () => {
              return this.loading ? (
                <ZBaseLoading
                  key="loading"
                  clsPrefix={this.clsPrefix}
                  radius={85}
                  strokeWidth={15}
                  scale={0.88}
                />
              ) : this.renderRowExpandIcon ? (
                this.renderRowExpandIcon({
                  expanded: this.expanded
                })
              ) : (
                <ZBaseIcon clsPrefix={clsPrefix} key="base-icon">
                  {{
                    default: () => <ChevronRightIcon />
                  }}
                </ZBaseIcon>
              )
            }
          }}
        </ZIconSwitchTransition>
      </div>
    )
  }
})
