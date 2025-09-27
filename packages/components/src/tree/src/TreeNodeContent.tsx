import {
  h,
  defineComponent,
  ref,
  type PropType,
  inject,
  type HTMLAttributes,
  watch
} from 'vue'
import { render } from '../../_utils'
import { type TmNode, treeInjectionKey } from './interface'
import { ZEllipsis } from '../../ellipsis'
import { ZText } from '../../typography'

export default defineComponent({
  name: 'TreeNodeContent',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    disabled: Boolean,
    checked: Boolean,
    selected: Boolean,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onDragstart: Function as PropType<(e: DragEvent) => void>,
    tmNode: {
      type: Object as PropType<TmNode>,
      required: true
    },
    nodeProps: Object as PropType<HTMLAttributes>
  },
  setup (props) {
    const labelRef = ref<HTMLElement | null>(null)

    const {
      renderLabelRef,
      renderPrefixRef,
      renderSuffixRef,
      labelFieldRef,
      showEllipsisRef,
      patternRef
    } =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inject(treeInjectionKey)!

    const selfRef = ref<HTMLElement | null>(null)
    function doClick (e: MouseEvent): void {
      const { onClick } = props
      if (onClick) onClick(e)
    }
    function handleClick (e: MouseEvent): void {
      doClick(e)
    }

    function replaceText (): void {
      const searchTerm: string = patternRef.value
      const originalText: string | undefined = labelRef.value?.innerText

      // Create a regular expression with the global flag
      const regex: RegExp = new RegExp(searchTerm, 'gi')

      // Replace the matches with the bold style
      const highlightedText: string | undefined = originalText?.replace(
        regex,
        (match: string) => {
          return `<span class="${props.clsPrefix}-node-highlight">${match}</span>`
        }
      )
      // Update the content of the div
      if (highlightedText && labelRef.value) {
        labelRef.value.innerHTML = highlightedText
      }
    }

    watch(patternRef, replaceText)

    return {
      selfRef,
      renderLabel: renderLabelRef,
      renderPrefix: renderPrefixRef,
      renderSuffix: renderSuffixRef,
      showEllipsis: showEllipsisRef,
      labelField: labelFieldRef,
      labelRef,
      handleClick
    }
  },
  render () {
    const {
      clsPrefix,
      labelField,
      nodeProps,
      checked = false,
      selected = false,
      renderLabel,
      renderPrefix,
      renderSuffix,
      handleClick,
      onDragstart,
      showEllipsis,
      tmNode: {
        rawNode,
        rawNode: { prefix, suffix, [labelField]: label }
      }
    } = this

    return (
      <ZText
        variant="4-r"
        class={[`${clsPrefix}-tree-node-content-wrapper`, nodeProps?.class]}
      >
        <span
          {...nodeProps}
          ref="selfRef"
          class={[`${clsPrefix}-tree-node-content`, nodeProps?.class]}
          onClick={handleClick}
          draggable={onDragstart === undefined ? undefined : true}
          onDragstart={onDragstart}
        >
          {renderPrefix || prefix ? (
            <div class={`${clsPrefix}-tree-node-content__prefix`}>
              {renderPrefix
                ? renderPrefix({
                  option: rawNode,
                  selected,
                  checked
                })
                : render(prefix)}
            </div>
          ) : null}
          <div
            ref="labelRef"
            class={[
              `${clsPrefix}-tree-node-content__text`,
              {
                [`${clsPrefix}-tree-node-content__text--ellipsis`]: showEllipsis
              }
            ]}
          >
            {renderLabel ? (
              <ZEllipsis>
                {{
                  default: () =>
                    renderLabel({
                      option: rawNode,
                      selected,
                      checked
                    })
                }}
              </ZEllipsis>
            ) : (
              render(label)
            )}
          </div>
          {renderSuffix || suffix ? (
            <div class={`${clsPrefix}-tree-node-content__suffix`}>
              {renderSuffix
                ? renderSuffix({
                  option: rawNode,
                  selected,
                  checked
                })
                : render(suffix)}
            </div>
          ) : null}
        </span>
      </ZText>
    )
  }
})
