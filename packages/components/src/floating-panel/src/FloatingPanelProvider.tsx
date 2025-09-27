/* eslint-disable @typescript-eslint/no-dynamic-delete */
import {
  h,
  reactive,
  ref,
  Teleport,
  defineComponent,
  type PropType,
  type ExtractPropTypes,
  provide,
  type Ref,
  type VNodeRef,
  computed,
  toRef,
  Fragment
} from 'vue'
import { createId } from 'seemly'
import { useConfig, useTheme } from '../../_mixins'
import type { MergedTheme, ThemeProps } from '../../_mixins'
import {
  type ExtractPublicPropTypes,
  omit,
  createInjectionKey,
  useRootNode
} from '../../_utils'
import { SwitcherIcon } from '../../_internal/icons'
import { floatingPanelLight, type FloatingPanelTheme } from '../styles'
import { FloatingPanelContainer } from './FloatingPanelContainer'
import { FloatingPanelEnvironment } from './FloatingPanelEnvironment'
import type { FloatingPanelOptions } from './FloatingPanelEnvironment'
import { floatingPanelProviderInjectionKey } from './context'
import style from './styles/index.cssr'
import { ZDropdown } from '../../dropdown'
import { ZIcon } from '../../icon'

export type FloatingPanelPlacement = 'bottom-left' | 'bottom-right'

export interface FloatingPanelProviderInjection {
  props: ExtractPropTypes<typeof floatingPanelProviderProps>
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<FloatingPanelTheme>>
}

type Create = (options: FloatingPanelOptions) => FloatingPanelReactive

export interface FloatingPanelApiInjection {
  create: Create
  destroyAll: () => void
}

export type FloatingPanelProviderInst = FloatingPanelApiInjection
export type Position = 'start' | 'end'

export const floatingPanelApiInjectionKey =
  createInjectionKey<FloatingPanelApiInjection>('z-floating-panel-api')

export type FloatingPanelReactive = {
  readonly key: string
  readonly close: () => void
  readonly hide: () => void
  readonly drag: () => void
  readonly togglePanel: () => void
  readonly minimizePanel: () => unknown
  readonly maximizePanel: () => unknown
} & FloatingPanelOptions

interface FloatingPanelRef {
  close: () => unknown
  drag: () => unknown
  hide: () => unknown
  togglePanel: () => unknown
  minimizePanel: () => unknown
  maximizePanel: () => unknown
}

export const floatingPanelProviderProps = {
  ...(useTheme.props as ThemeProps<FloatingPanelTheme>),
  containerStyle: [String, Object] as PropType<string | Record<string, string>>,
  to: [String, Object] as PropType<string | HTMLElement>,
  scrollable: {
    type: Boolean,
    default: true
  },
  maxItems: Number,
  draggable: {
    type: Boolean,
    default: true
  },
  placement: {
    type: String as PropType<FloatingPanelPlacement>,
    default: 'bottom-right'
  }
}

export type FloatingPanelProviderProps = ExtractPublicPropTypes<
  typeof floatingPanelProviderProps
>

export default defineComponent({
  name: 'FloatingPanelProvider',
  props: floatingPanelProviderProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'FloatingPanel',
      '-floating-panel',
      style,
      floatingPanelLight,
      props,
      mergedClsPrefixRef
    )

    const floatingPanelListRef = ref<FloatingPanelReactive[]>([])
    const dropdownPanelListRef = ref<FloatingPanelReactive[]>([])
    const floatingPanelRefs: Record<string, FloatingPanelRef> = {}

    const actionRef = ref<'close' | 'hide' | 'open-panel'>()
    const maxItems = toRef(props, 'maxItems')

    function create (options: FloatingPanelOptions): FloatingPanelReactive {
      const key = createId()

      const close = (): void => {
        actionRef.value = 'close'
        floatingPanelRefs[key]?.close()
      }

      const hide = (): void => {
        actionRef.value = 'hide'
        floatingPanelRefs[key]?.hide()
      }

      const drag = (): void => {
        floatingPanelRefs[key]?.drag()
      }

      const togglePanel = (): void => {
        floatingPanelRefs[key]?.togglePanel()
      }

      const minimizePanel = (): void => {
        floatingPanelRefs[key]?.minimizePanel()
      }

      const maximizePanel = (): void => {
        floatingPanelRefs[key]?.maximizePanel()
      }

      const floatingPanelReactive = reactive({
        ...options,
        key,
        close,
        hide,
        drag,
        togglePanel,
        minimizePanel,
        maximizePanel
      })

      if (
        typeof maxItems.value === 'number' &&
        floatingPanelListRef.value.length >= maxItems.value
      ) {
        moveToDropdown(floatingPanelListRef.value[0].key)
      }

      floatingPanelListRef.value.push(floatingPanelReactive)
      return floatingPanelReactive
    }

    function moveToDropdown (key: string, position: Position = 'end'): void {
      movePanel(key, floatingPanelListRef, dropdownPanelListRef, position)
      floatingPanelRefs[key]?.hide()
    }

    function moveToPanel (key: string, position: Position = 'end'): void {
      movePanel(key, dropdownPanelListRef, floatingPanelListRef, position)
    }

    function movePanel (
      key: string,
      fromList: Ref<FloatingPanelReactive[]>,
      toList: Ref<FloatingPanelReactive[]>,
      position: Position
    ): void {
      const index = fromList.value.findIndex((panel) => panel.key === key)
      if (index !== -1) {
        const panel = fromList.value.splice(index, 1)[0]
        if (position === 'start') {
          toList.value.unshift(panel)
        } else {
          toList.value.push(panel)
        }
      }
    }

    function handleAfterLeave (key: string, closing?: boolean): void {
      if (closing) {
        const index = floatingPanelListRef.value.findIndex(
          (panel) => panel.key === key
        )
        if (index !== -1) floatingPanelListRef.value.splice(index, 1)
      } else {
        moveToDropdown(key)
      }

      if (
        typeof maxItems.value === 'number' &&
        floatingPanelListRef.value.length < maxItems.value &&
        dropdownPanelListRef.value.length > 0
      ) {
        moveToPanel(dropdownPanelListRef.value[0].key)
      }
    }

    function handleSelect (key: string): void {
      moveToPanel(key, 'end')
      if (
        typeof maxItems.value === 'number' &&
        floatingPanelListRef.value.length > maxItems.value
      ) {
        moveToDropdown(floatingPanelListRef.value[0].key, 'end')
      }
    }

    function destroyAll (): void {
      floatingPanelListRef.value.forEach((panel) => {
        panel.close()
      })
      dropdownPanelListRef.value.forEach((panel) => {
        panel.close()
      })
      floatingPanelListRef.value = []
      dropdownPanelListRef.value = []
    }

    const dropdownOptionsRef = computed(() => {
      return dropdownPanelListRef.value.map((panel) => ({
        label: panel.title,
        key: panel.key
      }))
    })

    const api: FloatingPanelApiInjection = {
      create,
      destroyAll
    }

    provide(floatingPanelApiInjectionKey, api)
    provide(floatingPanelProviderInjectionKey, {
      props,
      mergedClsPrefixRef,
      mergedThemeRef: themeRef
    })

    return Object.assign(
      // Internal API for FloatingPanelProvider
      {
        root: useRootNode(props),
        mergedClsPrefix: mergedClsPrefixRef,
        floatingPanelList: floatingPanelListRef,
        dropdownPanelList: dropdownPanelListRef,
        dropdownOptions: dropdownOptionsRef,
        floatingPanelRefs,
        handleAfterLeave,
        handleSelect,
        floatingPanelContainer: ref(null)
      },
      // Composable API for useFloatingPanel
      api
    )
  },
  render () {
    const { placement } = this
    return (
      <Fragment>
        {this.$slots.default?.()}
        {this.floatingPanelList.length ? (
          <Teleport to={this.root}>
            <FloatingPanelContainer
              ref="floatingPanelContainer"
              style={this.containerStyle}
              scrollable={this.scrollable}
              placement={placement}
            >
              {{
                default: () => (
                  <Fragment>
                    {this.floatingPanelList.map(
                      (floatingPanel: FloatingPanelReactive) => (
                        <FloatingPanelEnvironment
                          ref={
                            ((inst: FloatingPanelRef | null) => {
                              const refKey = floatingPanel.key
                              // unmounting
                              if (inst === null) {
                                delete this.floatingPanelRefs[refKey]
                              } else {
                                // mounting
                                this.floatingPanelRefs[refKey] = inst
                              }
                            }) as VNodeRef
                          }
                          {...omit(floatingPanel, ['close', 'hide', 'drag'])}
                          internalKey={floatingPanel.key}
                          onInternalAfterLeave={this.handleAfterLeave}
                        />
                      )
                    )}
                  </Fragment>
                ),
                extra: () =>
                  this.dropdownOptions?.length > 0 ? (
                    <ZDropdown
                      onSelect={this.handleSelect}
                      trigger="click"
                      options={this.dropdownOptions}
                    >
                      {{
                        default: () => (
                          <div
                            class={`${this.mergedClsPrefix}-floating-panel-dropdown`}
                          >
                            <span>+ {this.dropdownOptions.length}</span>
                            <ZIcon>
                              {() => (
                                <SwitcherIcon
                                  class={`${this.mergedClsPrefix}-floating-panel-dropdown__icon`}
                                />
                              )}
                            </ZIcon>
                          </div>
                        )
                      }}
                    </ZDropdown>
                  ) : null
              }}
            </FloatingPanelContainer>
          </Teleport>
        ) : null}
      </Fragment>
    )
  }
})
