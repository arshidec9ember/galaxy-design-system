import { h, defineComponent, type PropType, inject, computed } from 'vue'
import { createId } from 'seemly'
import { useMemo } from '../../_external-dependencies/vooks'
import {
  ChevronRightIcon as ArrowRightIcon,
  ChevronLeftIcon as ArrowLeftIcon
} from '../../_internal/icons'
import { useRtl } from '../../_mixins/use-rtl'
import { useConfig } from '../../_mixins'
import { ZBaseIcon } from '../../_internal'
import type { ExtractPublicPropTypes } from '../../_utils'
import {
  throwError,
  resolveSlotWithProps,
  resolveWrappedSlotWithProps
} from '../../_utils'
import { accordionInjectionKey } from './Accordion'
import ZAccordionItemContent from './AccordionItemContent'
import { ZTitle } from '../../typography'
import { detailsViewInjectionKey } from '../../detail-view/src/context'

export const accordionItemProps = {
  title: String,
  name: [String, Number] as PropType<string | number>,
  disabled: Boolean,
  displayDirective: String as PropType<'if' | 'show'>
} as const

export type AccordionItemProps = ExtractPublicPropTypes<
  typeof accordionItemProps
>

export default defineComponent({
  name: 'AccordionItem',
  props: accordionItemProps,
  setup (props) {
    const { mergedRtlRef } = useConfig(props)
    const randomName = createId()
    const mergedNameRef = useMemo(() => {
      return props.name ?? randomName
    })
    const ZAccordion = inject(accordionInjectionKey)
    if (!ZAccordion) {
      throwError(
        'accordion-item',
        '`z-accordion-item` must be placed inside `z-accordion`.'
      )
    }
    const {
      expandedNamesRef,
      props: accordionProps,
      mergedClsPrefixRef,
      slots: accordionSlots
    } = ZAccordion

    const detailsViewContext = inject(detailsViewInjectionKey, null)

    const accordionRef = computed<boolean>(() => {
      const { value: expandedNames } = expandedNamesRef
      if (Array.isArray(expandedNames)) {
        const { value: name } = mergedNameRef
        return !~expandedNames.findIndex(
          (expandedName) => expandedName === name
        )
      } else if (expandedNames) {
        const { value: name } = mergedNameRef
        return name !== expandedNames
      }
      return true
    })
    const rtlEnabledRef = useRtl('Accordion', mergedRtlRef, mergedClsPrefixRef)

    const titleVariant = computed(() => {
      return detailsViewContext ? '5-m' : accordionRef.value ? '4-r' : '4-m'
    })

    return {
      rtlEnabled: rtlEnabledRef,
      accordionSlots,
      randomName,
      mergedClsPrefix: mergedClsPrefixRef,
      collapsed: accordionRef,
      titleVariant,
      mergedDisplayDirective: computed<'if' | 'show'>(() => {
        const { displayDirective } = props
        if (displayDirective) {
          return displayDirective
        } else {
          return accordionProps.displayDirective
        }
      }),
      arrowPlacement: computed<'start' | 'end'>(() => {
        return accordionProps.arrowPlacement
      }),
      handleClick (e: MouseEvent) {
        if (ZAccordion && !props.disabled) {
          ZAccordion.toggleItem(accordionRef.value, mergedNameRef.value, e)
        }
      }
    }
  },
  render () {
    const {
      accordionSlots,
      $slots,
      arrowPlacement,
      collapsed,
      mergedDisplayDirective,
      mergedClsPrefix,
      disabled,
      titleVariant
    } = this
    const headerNode = resolveSlotWithProps(
      $slots.header,
      { collapsed },
      () => [this.title]
    )
    const headerExtraSlot = $slots['header-end'] || accordionSlots['header-end']
    const arrowSlot = $slots.arrow || accordionSlots.arrow
    return (
      <div
        class={[
          `${mergedClsPrefix}-accordion-item`,
          `${mergedClsPrefix}-accordion-item--${arrowPlacement}-arrow-placement`,
          disabled && `${mergedClsPrefix}-accordion-item--disabled`,
          !collapsed && `${mergedClsPrefix}-accordion-item--active`
        ]}
      >
        <div
          class={[
            `${mergedClsPrefix}-accordion-item__header`,
            !collapsed && `${mergedClsPrefix}-accordion-item__header--active`
          ]}
          onClick={this.handleClick}
        >
          <ZTitle
            variant={titleVariant}
            class={`${mergedClsPrefix}-accordion-item__header-main`}
          >
            {arrowPlacement === 'end' && headerNode}
            <div
              class={`${mergedClsPrefix}-accordion-item-arrow`}
              key={this.rtlEnabled ? 0 : 1}
            >
              {resolveSlotWithProps(arrowSlot, { collapsed }, () => [
                <ZBaseIcon clsPrefix={mergedClsPrefix}>
                  {{
                    default:
                      accordionSlots.expandIcon ??
                      (() =>
                        this.rtlEnabled ? (
                          <ArrowLeftIcon />
                        ) : (
                          <ArrowRightIcon />
                        ))
                  }}
                </ZBaseIcon>
              ])}
            </div>
            {arrowPlacement === 'start' && headerNode}
          </ZTitle>
          {resolveWrappedSlotWithProps(
            headerExtraSlot,
            { collapsed },
            (children) => (
              <div class={`${mergedClsPrefix}-accordion-item__header-end`}>
                {children}
              </div>
            )
          )}
        </div>
        <ZAccordionItemContent
          clsPrefix={mergedClsPrefix}
          displayDirective={mergedDisplayDirective}
          show={!collapsed}
        >
          {$slots}
        </ZAccordionItemContent>
      </div>
    )
  }
})
