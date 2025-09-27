import { mount } from '@vue/test-utils'
import { sleep } from 'seemly'
import { defineComponent, h, ref, type Ref, nextTick, onMounted } from 'vue'
import {
  ZFloatingPanelProvider,
  useFloatingPanel,
  type FloatingPanelReactive
} from '../index'

const Provider = defineComponent({
  render () {
    return <ZFloatingPanelProvider>{this.$slots}</ZFloatingPanelProvider>
  }
})

describe('z-floating-panel', () => {
  it('should work with import on demand', () => {
    mount(ZFloatingPanelProvider)
  })

  it('can change content', async () => {
    const changeContent = jest.fn((zRef: Ref) => {
      zRef.value.content = 'change info'
    })
    const Test = defineComponent({
      setup () {
        const zRef = ref<FloatingPanelReactive | null>(null)
        const floatingPanel = useFloatingPanel()
        zRef.value = floatingPanel.create({
          title: 'info',
          content: 'info'
        })
        setTimeout(() => {
          zRef.value && changeContent(zRef)
        })
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await nextTick()
    expect(
      document.querySelector('.z-floating-panel-main__content')?.textContent
    ).toEqual('info')
    await sleep(1000)
    expect(changeContent).toHaveBeenCalled()
    expect(
      document.querySelector('.z-floating-panel-main__content')?.textContent
    ).toEqual('change info')
    wrapper.unmount()
  })
})

describe('floatingPanel-provider', () => {
  it('props.maxItems', async () => {
    const Test = defineComponent({
      setup () {
        const floatingPanel = useFloatingPanel()
        onMounted(() => {
          floatingPanel.create({
            title: 'info',
            content: 'info'
          })
          floatingPanel.create({
            title: 'info',
            content: 'info'
          })
          floatingPanel.create({
            title: 'info',
            content: 'info'
          })
        })
      },
      render () {
        return null
      }
    })
    const wrapper = mount(ZFloatingPanelProvider, {
      props: {
        maxItems: 2
      },
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
    expect(document.querySelectorAll('.z-floating-panel').length).toBe(2)
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should work with `placement` prop', async () => {
      const Test = defineComponent({
        setup () {
          const floatingPanel = useFloatingPanel()
          floatingPanel.create({
            title: 'info',
            content: 'info'
          })
        },
        render () {
          return null
        }
      })
      const wrapper = mount(ZFloatingPanelProvider, {
        slots: {
          default: () => <Test />
        }
      })
      await nextTick()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const container = document.querySelector('.z-floating-panel-container')!
      expect(container).not.toBeFalsy()
      expect(
        container.classList.contains('z-floating-panel-container--top-right')
      ).toEqual(true)
      await wrapper.setProps({ placement: 'bottom-right' })
      expect(
        container.classList.contains('z-floating-panel-container--bottom-right')
      ).toEqual(true)
      await wrapper.setProps({ placement: 'bottom-left' })
      expect(
        container.classList.contains('z-floating-panel-container--bottom-left')
      ).toEqual(true)
      wrapper.unmount()
    })

  it('should work with `destroyAll` method', async () => {
    const Test = defineComponent({
      setup () {
        const floatingPanel = useFloatingPanel()
        onMounted(() => {
          floatingPanel.create({
            title: 'info',
            content: 'info'
          })
          floatingPanel.create({
            title: 'info',
            content: 'info'
          })
          floatingPanel.destroyAll()
        })
      },
      render () {
        return null
      }
    })
    const wrapper = mount(ZFloatingPanelProvider, {
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
    expect(wrapper.find('.z-floating-panel-container').exists()).toBe(false)
    wrapper.unmount()
  })

  /**
   * TODO: Test cases for floating panel
   *  - [ ] write test case for toggle
      - [ ] write test case for expand
      - [ ] write test case for minimize
      - [ ] write test case for close
      - [ ] write test case for draggable
   */
})
