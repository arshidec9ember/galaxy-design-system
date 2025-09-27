import { h, toRef, ref, inject, defineComponent, watch, type Ref } from 'vue'
import { useMemo } from '../../_external-dependencies/vooks'
import {
  useInjectionCollection,
  useInjectionElementCollection
} from '../../_utils/composable'
import {
  createInjectionKey,
  type ExtractPublicPropTypes,
  getTitleAttribute
} from '../../_utils'
import { ZEllipsis } from '../../ellipsis'
import { ZTitle, ZText } from '../../typography'

export interface AnchorInjection {
  activeHref: Ref<string | null>
  mergedClsPrefix: Ref<string>
  showEllipsisRef: Ref<boolean>
  updateBarPosition: (el: HTMLElement) => void
  setActiveHref: (href: string, transition?: boolean) => void
  collectedLinkHrefs: string[]
  titleEls: HTMLElement[]
}

export const anchorInjectionKey =
  createInjectionKey<AnchorInjection>('z-anchor')

export const anchorLinkProps = {
  title: String,
  href: String,
  headerStyle: String,
  isHeader: {
    type: Boolean,
    default: false
  },
  isSubTitle: {
    type: Boolean,
    default: false
  }
} as const

export type AnchorLinkProps = ExtractPublicPropTypes<typeof anchorLinkProps>

export default defineComponent({
  name: 'AnchorLink',
  props: anchorLinkProps,
  setup (props, { slots }) {
    const titleRef = ref<HTMLElement | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ZAnchor = inject(anchorInjectionKey)!
    const hrefRef = toRef(props, 'href')
    const activeRef = useMemo(() => {
      return hrefRef.value && hrefRef.value === ZAnchor.activeHref.value
    })
    useInjectionCollection(anchorInjectionKey, 'collectedLinkHrefs', hrefRef)
    useInjectionElementCollection(
      anchorInjectionKey,
      'titleEls',
      () => titleRef.value
    )
    watch(activeRef, (value) => {
      if (value && titleRef.value) {
        ZAnchor.updateBarPosition(titleRef.value)
      }
    })
    function handleClick (): void {
      if (props.href !== undefined) {
        ZAnchor.setActiveHref(props.href)
      }
    }
    return () => {
      const { value: mergedClsPrefix } = ZAnchor.mergedClsPrefix
      const { value: showEllipsis } = ZAnchor.showEllipsisRef
      return props.isHeader ? (
        <ZTitle
          variant="6-m"
          class={[
            `${mergedClsPrefix}-anchor-link`,
            `${mergedClsPrefix}-anchor-link--header`,
            activeRef.value && `${mergedClsPrefix}-anchor-link--active`
          ]}
        >
          <span
            ref={titleRef}
            class={[`${mergedClsPrefix}-anchor-link__title`]}
            style={props.headerStyle}
            title={getTitleAttribute(props.title)}
          >
            <ZEllipsis tooltip={showEllipsis}>
              {{ default: () => props.title }}
            </ZEllipsis>
          </span>
        </ZTitle>
      ) : props.isSubTitle ? (
        <ZText
          variant="4-r"
          class={[
            `${mergedClsPrefix}-anchor-link`,
            activeRef.value && `${mergedClsPrefix}-anchor-link--active`
          ]}
        >
          <a
            ref={titleRef}
            class={[`${mergedClsPrefix}-anchor-link__title`]}
            href={props.href}
            style={props.headerStyle}
            title={getTitleAttribute(props.title)}
            onClick={handleClick}
          >
            <ZEllipsis tooltip={showEllipsis}>
              {{ default: () => props.title }}
            </ZEllipsis>
          </a>
          {slots.default?.()}
        </ZText>
      ) : (
        <ZText
          variant="4-m"
          class={[
            `${mergedClsPrefix}-anchor-link`,
            activeRef.value && `${mergedClsPrefix}-anchor-link--active`
          ]}
        >
          <a
            ref={titleRef}
            class={[`${mergedClsPrefix}-anchor-link__title`]}
            href={props.href}
            style={props.headerStyle}
            title={getTitleAttribute(props.title)}
            onClick={handleClick}
          >
            <ZEllipsis tooltip={showEllipsis}>
              {{ default: () => props.title }}
            </ZEllipsis>
          </a>
          {slots.default?.()}
        </ZText>
      )
    }
  }
})
