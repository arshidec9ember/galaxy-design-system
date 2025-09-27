import { h } from 'vue'
import { ZAlert } from '../index'
import { mount } from '@vue/test-utils'
import { ZIcon } from '../../icon'
import { IosAirplane } from '@vicons/ionicons4'

describe('z-alert', () => {
  it('should work with import on demand', () => {
    mount(ZAlert)
  })

  it('should have a role of "alert"', () => {
    const wrapper = mount(ZAlert)
    expect(wrapper.find('.z-alert').attributes('role')).toBe('alert')
    wrapper.unmount()
  })

  it('should add the right aria', () => {
    const wrapper = mount(ZAlert)
    expect(wrapper.find('.z-alert__icon').attributes('aria-hidden')).toBe(
      'true'
    )
    wrapper.unmount()
  })

  it('shouldnt have default title', () => {
    const wrapper = mount(ZAlert)
    expect(wrapper.find('.z-alert-body__title').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should have designated title', () => {
    const title = 'sometimes naïve'
    const wrapper = mount(ZAlert, {
      props: { title }
    })
    expect(wrapper.find('.z-alert-body__title').text()).toBe(title)
    wrapper.unmount()
  })

  it('should work with color prop', async () => {
    ;(['neutral', 'info', 'success', 'warning', 'error'] as const).forEach(
      (color) => {
        const wrapper = mount(ZAlert, { props: { color } })
        expect(wrapper.find('.z-alert').attributes('style')).toMatchSnapshot()
        wrapper.unmount()
      }
    )
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(ZAlert)
    expect(wrapper.find('.z-alert-body--bordered').exists()).toBe(true)
    await wrapper.setProps({ bordered: false })
    expect(wrapper.find('.z-alert-body--bordered').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `default` slot', () => {
    const wrapper = mount(ZAlert, {
      slots: {
        default: () => 'default'
      }
    })

    expect(wrapper.find('.z-alert-body__content').exists()).toBe(true)
    expect(wrapper.find('.z-alert-body__content').text()).toBe('default')
    wrapper.unmount()
  })

  it('should work with `icon` slot', async () => {
    const wrapper = mount(ZAlert, {
      slots: {
        icon: () =>
          h(ZIcon, null, {
            default: () => h(IosAirplane)
          })
      }
    })

    expect(wrapper.findComponent(ZIcon).exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `header` slot', async () => {
    const wrapper = mount(ZAlert, {
      slots: {
        header: () => 'test-header'
      }
    })

    expect(wrapper.find('.z-alert-body__title').text()).toBe('test-header')
    wrapper.unmount()
  })

  it('shouldnt be closable by default', () => {
    const wrapper = mount(ZAlert)
    expect(wrapper.find('.z-base-close.z-alert__close').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should be closable when designated', () => {
    const wrapper = mount(ZAlert, { props: { closable: true } })
    expect(wrapper.find('.z-base-close.z-alert__close').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should show icon by default', () => {
    const wrapper = mount(ZAlert)
    expect(wrapper.find('.z-alert__icon').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should hide icon when designated', () => {
    const wrapper = mount(ZAlert, { props: { showIcon: false } })
    expect(wrapper.find('.z-alert__icon').exists()).toBe(false)
    wrapper.unmount()
  })

  it("shouldn't closed when on-close prop returns false", async () => {
    const wrapper = mount(ZAlert, {
      props: { closable: true, onClose: () => false }
    })
    const closeBtn = wrapper.find('.z-base-close.z-alert__close')
    await closeBtn.trigger('click')

    expect(wrapper.find('.z-base-close.z-alert__close').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should trigger callback when closed', async () => {
    const handleCloseClick = jest.fn()
    const handleOnAfterLeave = jest.fn()
    const wrapper = mount(ZAlert, {
      props: {
        closable: true,
        onClose: handleCloseClick,
        onAfterLeave: handleOnAfterLeave
      }
    })
    const closeBtn = wrapper.find('.z-base-close.z-alert__close')
    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')

    expect(handleCloseClick).toHaveBeenCalled()

    setTimeout(() => {
      expect(handleOnAfterLeave).toHaveBeenCalled()
      wrapper.unmount()
    }, 0)
  })
})
