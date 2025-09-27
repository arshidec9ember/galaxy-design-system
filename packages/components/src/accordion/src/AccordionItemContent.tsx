import {
  h,
  withDirectives,
  vShow,
  defineComponent,
  toRef,
  type PropType
} from 'vue'
import { useFalseUntilTruthy } from '../../_external-dependencies/vooks'
import { ZFadeInExpandTransition } from '../../_internal'
import { ZP } from '../../typography'

export default defineComponent({
  name: 'AccordionItemContent',
  props: {
    displayDirective: {
      type: String as PropType<'if' | 'show'>,
      required: true
    },
    show: Boolean,
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const onceTrueRef = useFalseUntilTruthy(toRef(props, 'show'))
    return {
      onceTrue: onceTrueRef
    }
  },
  render () {
    return (
      <ZFadeInExpandTransition>
        {{
          default: () => {
            const { show, displayDirective, clsPrefix } = this
            /**
             * DEVNOTE: Removing `oncetrue` from the v-show directive because it is not needed
             * `oncetrue` is used to add the capability that the by default content is hidden
             * from the dom and once that is visible in the dom it will not be
             * hidden again from the dom.
             */
            const useVShow = displayDirective === 'show'
            const contentNode = (
              <div class={`${clsPrefix}-accordion-item__content-wrapper`}>
                <ZP
                  class={`${clsPrefix}-accordion-item__content-inner`}
                  variant="2-r"
                >
                  {this.$slots}
                </ZP>
              </div>
            )
            return useVShow
              ? withDirectives(contentNode, [[vShow, show]])
              : show
                ? contentNode
                : null
          }
        }}
      </ZFadeInExpandTransition>
    )
  }
})
