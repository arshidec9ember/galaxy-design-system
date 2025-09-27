import { mount } from '@vue/test-utils'
import { ZAvatar } from '../index'
import { h, nextTick } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { ZIcon } from '../../icon'

// Please note that resize observer doesn't work in JSDOM, so text transfrom
// can't be tested.
describe('z-avatar', () => {
  // mock offsetHeight offsetWidth
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight'
  )
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetWidth'
  )

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get () {
        if (this.className === 'z-avatar__text') {
          return 80
        }
        return 100
      }
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get () {
        if (this.className === 'z-avatar__text') {
          return 80
        }
        return 100
      }
    })
  })

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: () => originalOffsetHeight
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get: () => originalOffsetWidth
    })
  })

  it('should work with import on demand', () => {
    mount(ZAvatar)
  })

  it('size is string', () => {
    const wrapper = mount(ZAvatar, { props: { size: 'medium' } })
    expect(wrapper.attributes('style')).toContain('--z-merged-size')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('size is number', () => {
    const wrapper = mount(ZAvatar, { props: { size: 50 } })
    expect(wrapper.attributes('style')).toContain(
      '--z-merged-size: var(--z-avatar-size-override, 50px);'
    )
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('round avatar', () => {
    const wrapper = mount(ZAvatar, { props: { round: true } })
    expect(wrapper.attributes('style')).toContain(
      '--z-border-radius: var(--gds-border-radius-circle);'
    )
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('bordered avatar', () => {
    const wrapper = mount(ZAvatar, { props: { bordered: true } })
    expect(wrapper.attributes('style')).toContain('--z-border: 2px solid #fff;')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('custom style', () => {
    const wrapper = mount(ZAvatar, {
      props: { style: { backgroundColor: 'red' } }
    })
    expect(wrapper.attributes('style')).toContain('background-color: red;')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('image avatar', () => {
    const wrapper = mount(ZAvatar, {
      props: {
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      }
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('icon avatar', () => {
    const wrapper = mount(ZAvatar, {
      slots: {
        default: () =>
          h(ZIcon, null, {
            default: () => h(CashIcon)
          })
      }
    })
    expect(wrapper.find('i').classes()).toContain('z-icon')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('avatar adjust text', async () => {
    const AdjustAvatar = {
      data () {
        return {
          text: ''
        }
      },
      render () {
        const { text } = this as any
        return <ZAvatar size="medium">{{ default: () => text }}</ZAvatar>
      }
    }
    const wrapper = mount(AdjustAvatar)
    const textNode = wrapper.find('.z-avatar__text')
    await wrapper.setData({ text: 'adjust text' })
    await nextTick()
    expect(textNode.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('image avatar error handle when load failed', async () => {
    const onError = jest.fn()
    const wrapper = mount(ZAvatar, {
      props: {
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        onError
      }
    })
    await wrapper.find('img').trigger('error')
    expect(onError).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `objectFit` prop', () => {
    const wrapper = mount(ZAvatar, {
      props: {
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        objectFit: 'contain'
      }
    })
    expect(wrapper.find('img').attributes('style')).toContain(
      'object-fit: contain;'
    )
    wrapper.unmount()
  })
})
