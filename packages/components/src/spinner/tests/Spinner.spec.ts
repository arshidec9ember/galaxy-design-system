import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { ZSpinner } from '../index'
import { Reload } from '@vicons/ionicons5'
import { ZIcon } from '../../icon'
import { sleep } from 'seemly'
describe('z-spinner', () => {
  it('should work with import on demand', () => {
    mount(ZSpinner)
  })

  it('should work with `show` prop', async () => {
    const wrapper = mount(ZSpinner, {
      props: {
        show: true
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.z-spinner-content').classes()).toContain(
      'z-spinner-content--spinning'
    )
    wrapper.unmount()
  })

  it('should work with icon slot', () => {
    const wrapper = mount(ZSpinner, {
      slots: {
        icon: () =>
          h(ZIcon, null, {
            default: () => h(Reload)
          })
      }
    })

    expect(wrapper.findComponent(ZIcon).exists()).toBe(true)
    expect(wrapper.findComponent(Reload).exists()).toBe(true)
    wrapper.unmount()
  })

  it('rotate should work on icon slot', async () => {
    const wrapper = mount(ZSpinner, {
      slots: {
        icon: () =>
          h(ZIcon, null, {
            default: () => h(Reload)
          })
      }
    })
    expect(wrapper.find('.z-spinner--rotate').exists()).toBe(true)
    await wrapper.setProps({
      rotate: false
    })
    expect(wrapper.find('.z-spinner--rotate').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large', 71] as const).forEach((item) => {
      const wrapper = mount(ZSpinner, {
        props: {
          size: item
        }
      })
      expect(wrapper.find('.z-spinner').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `default` slot', async () => {
    const wrapper = mount(ZSpinner, {
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.z-spinner-container').exists()).toBe(true)
    expect(wrapper.find('.z-spinner-content').text()).toBe('test')
    wrapper.unmount()
  })

  it('should work with `strokeWidth` prop', () => {
    const wrapper = mount(ZSpinner, {
      props: {
        strokeWidth: 40,
        size: 'medium'
      }
    })

    expect(wrapper.find('circle').attributes('stroke-width')).toEqual('40')
    wrapper.unmount()
  })

  it('should work with `delay` prop', async () => {
    const wrapper = mount(ZSpinner, {
      props: {
        show: true,
        delay: 1000
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.z-spinner-content').classes()).not.toContain(
      'z-spinner-content--spinning'
    )
    await sleep(1000)

    expect(wrapper.find('.z-spinner-content').classes()).toContain(
      'z-spinner-content--spinning'
    )
  })

  it('should `delay` prop not delay close spin', async () => {
    const wrapper = mount(ZSpinner, {
      props: {
        show: true,
        delay: 1000
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.z-spinner-content').classes()).not.toContain(
      'z-spinner-content--spinning'
    )
    await sleep(1000)

    expect(wrapper.find('.z-spinner-content').classes()).toContain(
      'z-spinner-content--spinning'
    )

    await wrapper.setProps({
      show: false
    })
    expect(wrapper.find('.z-spinner-content').classes()).not.toContain(
      'z-spinner-content--spinning'
    )
  })
})
