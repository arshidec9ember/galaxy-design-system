import {
  h,
  defineComponent,
  provide,
  type PropType,
  Fragment,
  inject,
  ref,
  nextTick
} from 'vue'
import { render } from '../../_utils'
import { useMenuChild } from './use-menu-child'
import { useMenuChildProps } from './use-menu-child-props'
// eslint-disable-next-line import/no-cycle
import { itemRenderer } from './utils'
import type { TmNode } from './interface'
import {
  submenuInjectionKey,
  menuInjectionKey,
  menuItemGroupInjectionKey
} from './context'
import { useLocale } from '../../_mixins'
import {
  SearchIcon,
  CloseIcon,
  ArrowUpwardIcon,
  ArrowDownwardIcon
} from '../../_internal/icons'
import { ZBaseIcon } from '../../_internal'
import { ZEmpty } from '../../empty'
import { ZTitle } from '../../typography'
export const menuItemGroupProps = {
  ...useMenuChildProps,
  tmNode: {
    type: Object as PropType<TmNode>,
    required: true
  },
  tmNodes: {
    type: Array as PropType<TmNode[]>,
    required: true
  },
  itemsToShow: {
    type: Number,
    default: undefined
  },
  showSearch: {
    type: Boolean,
    default: false
  }
} as const

export const NMenuOptionGroup = defineComponent({
  name: 'MenuOptionGroup',
  props: menuItemGroupProps,
  setup (props) {
    provide(submenuInjectionKey, null)
    const MenuChild = useMenuChild(props)
    provide(menuItemGroupInjectionKey, {
      paddingLeftRef: MenuChild.paddingLeft
    })
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedClsPrefixRef, props: menuProps } = inject(menuInjectionKey)!
    const showAllRef = ref(false)
    const searching = ref(false)
    const searchText = ref('')
    const searchInputRef = ref<HTMLInputElement | null>(null)

    function toggleShowAll (): void {
      showAllRef.value = !showAllRef.value
    }
    function startSearch (): void {
      searching.value = true
      searchText.value = ''
      void nextTick(() => {
        searchInputRef.value?.focus()
      })
    }
    function stopSearch (): void {
      searching.value = false
      searchText.value = ''
    }

    return function () {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      const paddingLeft = MenuChild.paddingLeft.value
      const { nodeProps } = menuProps
      const attrs = nodeProps?.(props.tmNode.rawNode)
      const itemsToShow = props.itemsToShow ?? props.tmNodes?.length
      const showSearch = props.showSearch || false
      const remainingItems = props.tmNodes?.length - itemsToShow
      // Filter nodes if searching
      let filteredNodes = props.tmNodes
      if (searching.value && searchText.value) {
        filteredNodes = props.tmNodes?.filter((node) =>
          node?.rawNode?.label
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchText.value.toLowerCase())
        )
      }
      const shouldShowToggle = filteredNodes.length > itemsToShow

      const visibleNodes = showAllRef.value
        ? filteredNodes
        : filteredNodes.slice(0, itemsToShow)
      const { localeRef } = useLocale('Sidebar')
      return (
        <div class={`${mergedClsPrefix}-menu-item-group`} role="group">
          {searching.value ? (
            <>
              <input
                ref={searchInputRef}
                autofocus
                value={searchText.value}
                onInput={(e) =>
                  (searchText.value =
                    (e.target as HTMLInputElement)?.value || '')
                }
                placeholder={localeRef.value.search}
              />
              <button
                class={`${mergedClsPrefix}-menu-close-icon-btn`}
                onClick={stopSearch}
              >
                <ZBaseIcon
                  clsPrefix={mergedClsPrefix}
                  class={`${mergedClsPrefix}-menu-close-icon`}
                >
                  {{ default: () => <CloseIcon /> }}
                </ZBaseIcon>
              </button>
            </>
          ) : (
            <>
              <ZTitle
                variant="6-r"
                {...attrs}
                class={[
                  `${mergedClsPrefix}-menu-item-group-title`,
                  attrs?.class
                ]}
                style={[
                  attrs?.style || '',
                  paddingLeft !== undefined
                    ? `padding-left: ${paddingLeft}px;`
                    : ''
                ]}
              >
                {render(props.title)}
                {props.end ? <> {render(props.end)}</> : null}
                {showSearch && (
                  <button
                    class={`${mergedClsPrefix}-menu-search-icon-btn`}
                    onClick={startSearch}
                  >
                    <ZBaseIcon
                      clsPrefix={mergedClsPrefix}
                      class={`${mergedClsPrefix}-menu-search-icon`}
                    >
                      {{ default: () => <SearchIcon /> }}
                    </ZBaseIcon>
                  </button>
                )}
              </ZTitle>
            </>
          )}
          <div>
            {visibleNodes.length > 0
              ? visibleNodes.map((tmNode) => itemRenderer(tmNode, menuProps))
              : searching.value && (
                  <div class={`${mergedClsPrefix}-menu-item-group__empty`}>
                    <ZEmpty
                      title={localeRef.value.noResults}
                      description={localeRef.value.description}
                    />
                  </div>
              )}
            {shouldShowToggle && visibleNodes.length > 0 && (
              <button
                class={`${mergedClsPrefix}-menu-item-group-toggle`}
                onClick={toggleShowAll}
              >
                {showAllRef.value ? (
                  <Fragment>
                    {localeRef.value.viewLess}
                    <ZBaseIcon
                      clsPrefix={mergedClsPrefix}
                      style="margin-left: 0.25rem;"
                    >
                      {{ default: () => <ArrowUpwardIcon /> }}
                    </ZBaseIcon>
                  </Fragment>
                ) : (
                  <Fragment>
                    {localeRef.value.viewMore} ({remainingItems})
                    <ZBaseIcon
                      clsPrefix={mergedClsPrefix}
                      style="margin-left: 0.25rem;"
                    >
                      {{ default: () => <ArrowDownwardIcon /> }}
                    </ZBaseIcon>
                  </Fragment>
                )}
              </button>
            )}
          </div>
        </div>
      )
    }
  }
})
