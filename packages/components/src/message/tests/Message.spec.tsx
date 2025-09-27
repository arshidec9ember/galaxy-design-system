import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { sleep } from 'seemly'
import { ZMessageProvider, useMessage } from '../index'

const Provider = defineComponent({
  render () {
    return <ZMessageProvider maxItems={1}>{this.$slots}</ZMessageProvider>
  }
})

const NoMaxProvider = defineComponent({
  render () {
    return <ZMessageProvider>{this.$slots}</ZMessageProvider>
  }
})

describe('z-message', () => {
  it('should work with import on demand', () => {
    mount(ZMessageProvider)
  })
  it('should have correct type', () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()
        message.info('string')
        const messageReactive = message.info(() => 'string')
        messageReactive.content = '123'
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
  it('should work with showIcon', async () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()

        message.info('string')
        message.info('string', {
          showIcon: false
        })
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <NoMaxProvider>{{ default: () => <Test /> }}</NoMaxProvider>
    ))

    await nextTick()
    expect(document.querySelectorAll('.z-message__icon').length).toBe(1)
    expect(document.querySelectorAll('.z-message').length).toBe(2)

    wrapper.unmount()
  })
})

describe('message-provider', () => {
  it('props.maxItems', async () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()
        message.info('string')
        message.info('string1')
        message.info('string2')
        message.info('string3')
      },
      render () {
        return null
      }
    })
    const wrapper = mount(ZMessageProvider, {
      props: {
        maxItems: 2
      },
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()

    expect(document.querySelectorAll('.z-message').length).toBe(2)
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('props.duration', async () => {
      const Test = defineComponent({
        setup () {
          const message = useMessage()
          message.info('string')
        },
        render () {
          return null
        }
      })
      const wrapper = mount(ZMessageProvider, {
        props: {
          duration: 1000
        },
        slots: {
          default: () => <Test />
        }
      })
      await nextTick()
      await sleep(500)
      expect(document.querySelector('.z-message')).not.toEqual(null)
      await sleep(1200)
      expect(document.querySelector('.z-message')).toBe(null)
      wrapper.unmount()
    })
  it('props.closable', async () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()
        message.info('string')
      },
      render () {
        return null
      }
    })
    const wrapper = mount(ZMessageProvider, {
      props: {
        closable: true
      },
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
    expect(document.querySelector('.z-message__close')).not.toBe(null)
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('props.container-style', async () => {
      const Test = defineComponent({
        setup () {
          const message = useMessage()
          message.info('string')
        },
        render () {
          return null
        }
      })
      const wrapper = mount(ZMessageProvider, {
        props: {
          'container-style': 'padding: 24px'
        },
        slots: {
          default: () => <Test />
        }
      })
      await nextTick()
      const container = document.querySelector('.z-message-container')
      expect(container).not.toBe(null)
      expect((container as HTMLElement).style.cssText).toContain(
        'padding: 24px'
      )
      wrapper.unmount()
    })
})
