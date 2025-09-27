import { mount } from '@vue/test-utils'
import { ZCardStandard } from '../index'

describe('z-card', () => {
  it('should work with import on demand', () => {
    mount(ZCardStandard)
  })

  it('should work with `title` prop', async () => {
    const wrapper = mount(ZCardStandard)

    expect(wrapper.find('.z-card-header').exists()).toBe(false)

    await wrapper.setProps({ title: 'test' })
    expect(wrapper.find('.z-card-header').exists()).toBe(true)
    expect(wrapper.find('.z-card-header__main').text()).toBe('test')
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(ZCardStandard)

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.z-card').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `hoverable` prop', async () => {
    const wrapper = mount(ZCardStandard, {
      props: {
        hoverable: true
      }
    })

    expect(wrapper.find('.z-card').classes()).toContain('z-card--hoverable')
    wrapper.unmount()
  })

  it('should work with `divider` prop', async () => {
    const wrapper = mount(ZCardStandard)
    expect(wrapper.find('.z-card').classes()).not.toContain(
      'z-card--content-divider'
    )

    await wrapper.setProps({
      divider: {
        content: true,
        footer: 'inset'
      }
    })
    expect(wrapper.find('.z-card').classes()).toContain(
      'z-card--content-divider'
    )
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should work with `slots` ', async () => {
      const wrapper = mount(ZCardStandard, {
        slots: {
          cover: () => 'cover',
          header: () => 'header',
          'header-end': () => 'header-end',
          default: () => 'content',
          footer: () => 'footer',
          action: () => 'action'
        }
      })

      expect(wrapper.find('.z-card-cover').exists()).toBe(true)
      expect(wrapper.find('.z-card-cover').text()).toBe('cover')

      expect(wrapper.find('.z-card-header').exists()).toBe(true)
      expect(wrapper.find('.z-card-header__main').text()).toBe('header')

      expect(wrapper.find('.z-card-header__end').exists()).toBe(true)
      expect(wrapper.find('.z-card-header__end').text()).toBe('header-end')

      expect(wrapper.find('.z-card__content').exists()).toBe(true)
      expect(wrapper.find('.z-card__content').text()).toBe('content')

      expect(wrapper.find('.z-card__footer').exists()).toBe(true)
      expect(wrapper.find('.z-card__footer').text()).toBe('footer')

      expect(wrapper.find('.z-card__action').exists()).toBe(true)
      expect(wrapper.find('.z-card__action').text()).toBe('action')
      wrapper.unmount()
    })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(ZCardStandard, {
      props: {
        bordered: false
      }
    })

    expect(wrapper.find('.z-card--bordered').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `closable` and `on-close` prop', async () => {
    const onClose = jest.fn()
    const wrapper = mount(ZCardStandard, {
      props: {
        closable: true,
        onClose
      }
    })

    expect(wrapper.find('.z-card-header__close').exists()).toBe(true)
    await wrapper.find('.z-card-header__close').trigger('click')
    expect(onClose).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `header-style` prop', async () => {
    const testStyle = 'padding: 0px;'
    const wrapper = mount(ZCardStandard, {
      props: {
        title: 'test',
        headerStyle: testStyle
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.z-card-header').attributes('style')).toContain(
      testStyle
    )
    wrapper.unmount()
  })

  it('should work with `content-style` prop', async () => {
    const testStyle = 'padding: 0px;'
    const wrapper = mount(ZCardStandard, {
      props: {
        contentStyle: testStyle
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.z-card__content').attributes('style')).toContain(
      testStyle
    )
    wrapper.unmount()
  })

  it('should work with `footer-style` prop', async () => {
    const testStyle = 'padding: 0px;'
    const wrapper = mount(ZCardStandard, {
      props: {
        footerStyle: testStyle
      },
      slots: {
        footer: () => 'test'
      }
    })

    expect(wrapper.find('.z-card__footer').attributes('style')).toContain(
      testStyle
    )
    wrapper.unmount()
  })

  it('should work with `header-end-style` prop', async () => {
    const testStyle = 'padding: 0px;'
    const wrapper = mount(ZCardStandard, {
      props: {
        headerEndStyle: testStyle
      },
      slots: {
        header: () => 'test-header',
        'header-end': () => 'test-header-end'
      }
    })

    expect(wrapper.find('.z-card-header__end').attributes('style')).toContain(
      testStyle
    )
    wrapper.unmount()
  })
})
