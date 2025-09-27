import {
  nextTick,
  Transition,
  h,
  defineComponent,
  type PropType,
  ref,
  type ExtractPropTypes
} from 'vue'
import { keep } from '../../_utils'
import {
  FloatingPanel,
  floatingPanelProps,
  floatingPanelPropKeys
} from './FloatingPanel'

type HTMLEvent = (el: Element) => void

export const floatingPanelEnvOptions = {
  ...floatingPanelProps,
  onClose: Function as PropType<() => Promise<boolean> | boolean>,
  onHide: Function as PropType<() => Promise<boolean> | boolean>,
  onDrag: Function as PropType<
  (event: MouseEvent) => Promise<boolean> | boolean | any
  >,
  onLeave: Function as PropType<() => void>,
  onAfterEnter: Function as PropType<() => void>,
  onAfterLeave: Function as PropType<() => void>
} as const

export type FloatingPanelOptions = Partial<
ExtractPropTypes<typeof floatingPanelEnvOptions>
>

export const FloatingPanelEnvironment = defineComponent({
  name: 'FloatingPanelEnvironment',
  props: {
    ...floatingPanelEnvOptions,
    // private
    internalKey: {
      type: String,
      required: true
    },
    onInternalAfterLeave: {
      type: Function as PropType<(key: string, closed?: boolean) => void>,
      required: true
    }
  },
  setup (props) {
    const showRef = ref(true)
    const closingRef = ref(false)

    const minimizeRef = ref(false)

    function close (): void {
      closingRef.value = true
      showRef.value = false
    }

    function hide (): void {
      showRef.value = false
    }

    function handleMinimize (value: boolean): void {
      minimizeRef.value = value
    }

    function minimizePanel (): void {
      minimizeRef.value = true
    }

    function maximizePanel (): void {
      minimizeRef.value = false
    }

    // handle openPanel
    function togglePanel (): void {
      if (minimizeRef.value) {
        maximizePanel()
      } else {
        minimizePanel()
      }
    }

    function handleBeforeEnter (el: HTMLElement): void {
      void nextTick(() => {
        el.style.height = `${el.offsetHeight}px`
        el.style.maxHeight = '0'
        el.style.transition = 'none'
        void el.offsetHeight
        el.style.transition = ''
        el.style.maxHeight = el.style.height
      })
    }

    function handleAfterEnter (el: HTMLElement): void {
      el.style.height = ''
      el.style.maxHeight = ''
      const { onAfterEnter } = props
      if (onAfterEnter) onAfterEnter()
    }

    function handleBeforeLeave (el: HTMLElement): void {
      el.style.maxHeight = `${el.offsetHeight}px`
      el.style.height = `${el.offsetHeight}px`
      void el.offsetHeight
    }

    function handleLeave (el: HTMLElement): void {
      el.style.maxHeight = '0'
      void el.offsetHeight
    }

    function handleAfterLeave (): void {
      const { onAfterLeave, onInternalAfterLeave, internalKey } = props
      if (onAfterLeave) onAfterLeave()
      onInternalAfterLeave(internalKey, closingRef.value)
      closingRef.value = false
    }

    function handleDrag (event: MouseEvent): void {
      props.onDrag?.(event)
    }

    const handleHide = async (): Promise<void> => {
      try {
        const { onHide } = props
        const feedback = await onHide?.()
        if (feedback !== false) {
          close()
        }
      } catch (e) {
        console.error(e)
      }
    }

    function handleClose (): void {
      closingRef.value = true
      const { onClose } = props
      if (onClose) {
        void Promise.resolve(onClose()).then((feedback) => {
          if (!feedback) return
          close()
        })
      } else {
        close()
      }
    }

    return {
      show: showRef,
      close,
      hide,
      minimizeRef,
      minimizePanel,
      maximizePanel,
      togglePanel,
      handleClose,
      handleMinimize,
      handleDrag,
      handleHide,
      handleAfterLeave,
      handleLeave,
      handleBeforeLeave,
      handleAfterEnter,
      handleBeforeEnter
    }
  },
  render () {
    return (
      <Transition
        name="floating-panel-transition"
        appear={true}
        onBeforeEnter={this.handleBeforeEnter as HTMLEvent}
        onAfterEnter={this.handleAfterEnter as HTMLEvent}
        onBeforeLeave={this.handleBeforeLeave as HTMLEvent}
        onLeave={this.handleLeave as HTMLEvent}
        onAfterLeave={this.handleAfterLeave as HTMLEvent}
      >
        {{
          default: () => {
            return this.show ? (
              <FloatingPanel
                {...keep(this.$props, floatingPanelPropKeys)}
                onClose={this.handleClose}
                onDrag={this.handleDrag}
                minimize={this.minimizeRef}
                onUpdateMinimize={this.handleMinimize}
              />
            ) : null
          }
        }}
      </Transition>
    )
  }
})
