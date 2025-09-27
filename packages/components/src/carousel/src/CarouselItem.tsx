import {
  h,
  defineComponent,
  computed,
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'
import type { VNode } from 'vue'
import { camelCase } from 'lodash-es'
import { useConfig } from '../../_mixins'
import { useCarouselContext } from './CarouselContext'

const CarouselItemName = 'CarouselItem'

export const isCarouselItem = (child: VNode): boolean =>
  (child.type as any)?.name === CarouselItemName

export default defineComponent({
  name: CarouselItemName,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const ZCarousel = useCarouselContext(
      camelCase(CarouselItemName),
      `z-${camelCase(CarouselItemName)}`
    )
    const selfElRef = ref<HTMLElement>()
    const indexRef = computed(() => {
      const { value: selfEl } = selfElRef
      return selfEl ? ZCarousel.getSlideIndex(selfEl) : -1
    })
    const isPrevRef = computed(() => ZCarousel.isPrev(indexRef.value))
    const isNextRef = computed(() => ZCarousel.isNext(indexRef.value))
    const isActiveRef = computed(() => ZCarousel.isActive(indexRef.value))
    const styleRef = computed(() => ZCarousel.getSlideStyle(indexRef.value))
    onMounted(() => {
      ZCarousel.addSlide(selfElRef.value)
    })
    onBeforeUnmount(() => {
      ZCarousel.removeSlide(selfElRef.value)
    })
    function handleClick (event: MouseEvent): void {
      const { value: index } = indexRef
      if (index !== undefined) {
        ZCarousel?.onCarouselItemClick(index, event)
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      isPrev: isPrevRef,
      isNext: isNextRef,
      isActive: isActiveRef,
      index: indexRef,
      style: styleRef,
      handleClick
    }
  },
  render () {
    const {
      $slots: slots,
      mergedClsPrefix,
      isPrev,
      isNext,
      isActive,
      index,
      style
    } = this
    const className = [
      `${mergedClsPrefix}-carousel__slide`,
      {
        [`${mergedClsPrefix}-carousel__slide--current`]: isActive,
        [`${mergedClsPrefix}-carousel__slide--prev`]: isPrev,
        [`${mergedClsPrefix}-carousel__slide--next`]: isNext
      }
    ]
    return (
      <div
        ref="selfElRef"
        class={className}
        role="option"
        tabindex="-1"
        data-index={index}
        aria-hidden={!isActive}
        style={style}
        // We use ts-ignore for vue-tsc, since it seems to patch native event
        // for vue components
        // @ts-expect-error vue's tsx has type for capture events
        onClickCapture={this.handleClick}
      >
        {slots.default?.({
          isPrev,
          isNext,
          isActive,
          index
        })}
      </div>
    )
  }
})
