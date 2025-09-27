import { h, defineComponent, ref, inject, type PropType } from 'vue'
import {
  VirtualList,
  type VirtualListInst
} from '../../_external-dependencies/vueuc'
import { ZEmpty } from '../../empty'
import { ZScrollbar, type ScrollbarInst } from '../../_internal'
import { type Option, transferInjectionKey } from './interface'
import ZTransferListItem from './TransferListItem'

export default defineComponent({
  name: 'TransferList',
  props: {
    virtualScroll: {
      type: Boolean,
      required: true
    },
    itemSize: {
      type: Number,
      required: true
    },
    options: {
      type: Array as PropType<Option[]>,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    source: Boolean
  },
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedThemeRef, mergedClsPrefixRef } = inject(transferInjectionKey)!
    const scrollerInstRef = ref<ScrollbarInst | null>(null)
    const vlInstRef = ref<VirtualListInst | null>(null)
    function syncVLScroller (): void {
      scrollerInstRef.value?.sync()
    }
    function scrollContainer (): HTMLElement | null {
      const { value } = vlInstRef
      if (!value) return null
      const { listElRef } = value
      return listElRef
    }
    function scrollContent (): HTMLElement | null {
      const { value } = vlInstRef
      if (!value) return null
      const { itemsElRef } = value
      return itemsElRef
    }
    return {
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      scrollerInstRef,
      vlInstRef,
      syncVLScroller,
      scrollContainer,
      scrollContent
    }
  },
  render () {
    const { mergedTheme, options } = this
    if (options.length === 0) {
      return (
        <ZEmpty
          showDescription={false}
          theme={mergedTheme.peers.Empty}
          themeOverrides={mergedTheme.peerOverrides.Empty}
        />
      )
    }
    const { mergedClsPrefix, virtualScroll, source, disabled, syncVLScroller } =
      this
    return (
      <ZScrollbar
        ref="scrollerInstRef"
        theme={mergedTheme.peers.Scrollbar}
        themeOverrides={mergedTheme.peerOverrides.Scrollbar}
        container={virtualScroll ? this.scrollContainer : undefined}
        content={virtualScroll ? this.scrollContent : undefined}
      >
        {{
          default: () =>
            virtualScroll ? (
              <VirtualList
                ref="vlInstRef"
                style={{ height: '100%' }}
                class={`${mergedClsPrefix}-transfer-list-content`}
                items={this.options}
                itemSize={this.itemSize}
                showScrollbar={false}
                onResize={syncVLScroller}
                onScroll={syncVLScroller}
                keyField="value"
              >
                {{
                  default: ({ item }: { item: Option }) => {
                    const { source, disabled } = this
                    return (
                      <ZTransferListItem
                        source={source}
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled || disabled}
                        label={item.label}
                        option={item}
                      />
                    )
                  }
                }}
              </VirtualList>
            ) : (
              <div class={`${mergedClsPrefix}-transfer-list-content`}>
                {options.map((option) => (
                  <ZTransferListItem
                    source={source}
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled || disabled}
                    label={option.label}
                    option={option}
                  />
                ))}
              </div>
            )
        }}
      </ZScrollbar>
    )
  }
})
