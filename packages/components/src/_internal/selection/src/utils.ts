import { h, type VNodeChild } from 'vue'
import { ZEllipsis } from '../../../ellipsis'
import { render } from '../../../_utils'
import type { SelectBaseOption } from '../../../select/src/interface'

export function useTooltip (
  tooltip: boolean,
  label: string,
  selectedNode: SelectBaseOption | null
): VNodeChild {
  if (tooltip) {
    return h(ZEllipsis, null, {
      default: () => label
    })
  } else {
    return render(label, selectedNode, true)
  }
}
