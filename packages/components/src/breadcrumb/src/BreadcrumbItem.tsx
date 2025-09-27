import {
  h,
  defineComponent,
  inject,
  type ExtractPropTypes,
  computed,
  type PropType,
  ref
} from 'vue'
import { resolveSlot, resolveWrappedSlot, warn } from '../../_utils'
import { useBrowserLocation } from '../../_utils/composable/use-browser-location'
import { breadcrumbInjectionKey } from './context'
import { ZA, ZText } from '../../typography'

export const breadcrumbItemProps = {
  separator: String,
  href: String,
  clickable: {
    type: Boolean,
    default: true
  },
  onClick: Function as PropType<(e: MouseEvent) => void>
} as const

export type BreadcrumbItemProps = Partial<
ExtractPropTypes<typeof breadcrumbItemProps>
>

export default defineComponent({
  name: 'BreadcrumbItem',
  props: breadcrumbItemProps,
  setup (props, { slots }) {
    const ZBreadcrumb = inject(breadcrumbInjectionKey, null)
    if (!ZBreadcrumb) {
      if (__DEV__) {
        warn(
          'breadcrumb',
          '`z-breadcrumb-item` must be placed inside `z-breadcrumb`.'
        )
      }
      return () => null
    }
    const { separatorRef, mergedClsPrefixRef, sizeRef, weightRef } = ZBreadcrumb
    const browserLocationRef = useBrowserLocation()
    const elementRef = ref<HTMLLIElement>()

    const ariaCurrentRef = computed(() =>
      browserLocationRef.value.href === props.href ? 'location' : null
    )

    const VARIANT_MAP = {
      large: {
        ZText: { regular: '1-r', medium: '1-m' },
        ZA: { regular: '1-r', medium: '1-m' }
      },
      medium: {
        ZText: { regular: '3-r', medium: '3-m' },
        ZA: { regular: '2-r', medium: '2-m' }
      },
      small: {
        ZText: { regular: '4-r', medium: '4-m' },
        ZA: { regular: '3-r', medium: '3-m' }
      }
    } as const

    const isLastItemComputed = computed(() => {
      if (!elementRef.value) return false

      const parentUL = elementRef.value.parentElement
      if (!parentUL) return false

      const breadcrumbItems = Array.from(parentUL.children).filter(
        (child): child is Element =>
          child.tagName === 'LI' &&
          child.classList.contains(
            `${mergedClsPrefixRef.value}-breadcrumb-item`
          ) &&
          !child.textContent?.includes('...')
      )

      return breadcrumbItems[breadcrumbItems.length - 1] === elementRef.value
    })

    const ComponentType = computed(() => {
      return isLastItemComputed.value ? ZText : ZA
    })

    const componentVariantRef = computed(() => {
      const size = sizeRef.value || 'medium'
      const weight = weightRef.value || 'regular'
      const component = isLastItemComputed.value ? 'ZText' : 'ZA'

      return VARIANT_MAP[size]?.[component]?.[weight] || '2-r'
    })

    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      return (
        <li
          ref={elementRef}
          class={[
            `${mergedClsPrefix}-breadcrumb-item`,
            `${mergedClsPrefix}-breadcrumb-item--${sizeRef.value}--${weightRef.value}`,
            props.clickable && `${mergedClsPrefix}-breadcrumb-item--clickable`
          ]}
        >
          {h(
            ComponentType.value,
            {
              class: `${mergedClsPrefix}-breadcrumb-item__link`,
              'aria-current': ariaCurrentRef.value,
              href: props.href,
              onClick: props.onClick,
              variant: componentVariantRef.value
            },
            [
              resolveWrappedSlot(
                slots.start,
                (children) =>
                  children &&
                  h(
                    ZA,
                    {
                      class: `${mergedClsPrefix}-breadcrumb-item__start`,
                      variant: componentVariantRef.value
                    },
                    children
                  )
              ),
              slots.default?.(),
              resolveWrappedSlot(
                slots.end,
                (children) =>
                  children &&
                  h(
                    ZA,
                    {
                      class: `${mergedClsPrefix}-breadcrumb-item__end`,
                      variant: componentVariantRef.value
                    },
                    children
                  )
              )
            ]
          )}
          <ZA
            class={`${mergedClsPrefix}-breadcrumb-item__separator`}
            aria-hidden="true"
            variant={componentVariantRef.value}
          >
            {resolveSlot(slots.separator, () => [
              props.separator ?? separatorRef.value
            ])}
          </ZA>
        </li>
      )
    }
  }
})
