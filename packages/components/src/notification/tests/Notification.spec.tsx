import { mount } from '@vue/test-utils'
import { sleep } from 'seemly'
import { defineComponent, h, ref, type Ref, nextTick, onMounted } from 'vue'
import {
  ZNotificationProvider,
  useNotification,
  type NotificationReactive
} from '../index'

const Provider = defineComponent({
  render () {
    return <ZNotificationProvider>{this.$slots}</ZNotificationProvider>
  }
})

describe('z-notification', () => {
  it('should work with import on demand', () => {
    mount(ZNotificationProvider)
  })
  it('should have correct type', () => {
    const Test = defineComponent({
      setup () {
        const notification = useNotification()
        notification.info({
          title: 'info'
        })
        const notificationReactive = notification.success({
          title: 'success'
        })
        notificationReactive.title = 'cool'
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    wrapper.unmount()
  })

  it('can change content', async () => {
    const changeContent = jest.fn((nRef: Ref) => {
      nRef.value.content = 'change info'
    })
    const Test = defineComponent({
      setup () {
        const nRef = ref<NotificationReactive | null>(null)
        const notification = useNotification()
        nRef.value = notification.info({
          title: 'info',
          content: 'info'
        })
        setTimeout(() => {
          nRef.value && changeContent(nRef)
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
      document.querySelector('.z-notification-main__content')?.textContent
    ).toEqual('info')
    await sleep(1000)
    expect(changeContent).toHaveBeenCalled()
    expect(
      document.querySelector('.z-notification-main__content')?.textContent
    ).toEqual('change info')
    wrapper.unmount()
  })

  it('should work with duration', async () => {
    const Test = defineComponent({
      setup () {
        const notification = useNotification()
        notification.info({
          title: 'info',
          content: 'info',
          duration: 1000
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
    await sleep(500)
    expect(document.querySelector('.z-notification')).not.toEqual(null)
    await sleep(1200)
    expect(document.querySelector('.z-notification')).toBe(null)
    wrapper.unmount()
  })
})

describe('notification-provider', () => {
  it('props.maxItems', async () => {
    const Test = defineComponent({
      setup () {
        const notification = useNotification()
        onMounted(() => {
          notification.info({
            title: 'info',
            content: 'info'
          })
          notification.info({
            title: 'info',
            content: 'info'
          })
          notification.info({
            title: 'info',
            content: 'info'
          })
        })
      },
      render () {
        return null
      }
    })
    const wrapper = mount(ZNotificationProvider, {
      props: {
        maxItems: 2
      },
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
    expect(document.querySelectorAll('.z-notification').length).toBe(2)
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should work with `placement` prop', async () => {
      const Test = defineComponent({
        setup () {
          const notification = useNotification()
          notification.info({
            title: 'info',
            content: 'info'
          })
        },
        render () {
          return null
        }
      })
      const wrapper = mount(ZNotificationProvider, {
        slots: {
          default: () => <Test />
        }
      })
      await nextTick()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const container = document.querySelector('.z-notification-container')!
      expect(container).not.toBeFalsy()
      expect(
        container.classList.contains('z-notification-container--top-right')
      ).toEqual(true)
      await wrapper.setProps({ placement: 'top-left' })
      expect(
        container.classList.contains('z-notification-container--top-left')
      ).toEqual(true)
      await wrapper.setProps({ placement: 'bottom-right' })
      expect(
        container.classList.contains('z-notification-container--bottom-right')
      ).toEqual(true)
      await wrapper.setProps({ placement: 'bottom-left' })
      expect(
        container.classList.contains('z-notification-container--bottom-left')
      ).toEqual(true)
      wrapper.unmount()
    })
  it('should work with `destroyAll` method', async () => {
    const Test = defineComponent({
      setup () {
        const notification = useNotification()
        onMounted(() => {
          notification.info({
            title: 'info',
            content: 'info'
          })
          notification.info({
            title: 'info',
            content: 'info'
          })
          notification.destroyAll()
        })
      },
      render () {
        return null
      }
    })
    const wrapper = mount(ZNotificationProvider, {
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
    expect(wrapper.find('.notification-container').exists()).toBe(false)
    wrapper.unmount()
  })
})
