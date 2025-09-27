import { mount } from '@vue/test-utils'
import {
  ZCard,
  ZCardAction,
  ZCardContent,
  ZCardFooter,
  ZCardHeader,
  ZCardMedia
} from '../index'
import { h } from 'vue'

describe('z-card', () => {
  it('should work with import on demand', () => {
    mount(ZCard)
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(ZCard)

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.z-card').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `hoverable` prop', async () => {
    const wrapper = mount(ZCard, {
      props: {
        hoverable: true
      }
    })

    expect(wrapper.find('.z-card').classes()).toContain('z-card--hoverable')
    wrapper.unmount()
  })

  it('should work with `divider` prop', async () => {
    const wrapper = mount(ZCard)
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
    it('should work with `sub-components` ', async () => {
      const wrapper = mount(ZCard, {
        slots: {
          default: () => [
            h(ZCardMedia, null, {
              slots: {
                default: () => 'media'
              }
            }),
            h(ZCardHeader, null, {
              slots: {
                default: () => 'header',
                'header-end': () => 'header-end'
              }
            }),
            h(ZCardContent, null, {
              slots: {
                default: () => 'content'
              }
            }),
            h(ZCardFooter, null, {
              slots: {
                default: () => 'footer'
              }
            }),
            h(ZCardAction, null, {
              slots: {
                default: () => 'action'
              }
            })
          ]
        }
      })

      expect(wrapper.find('.card-media-layer').exists()).toBe(true)
      expect(wrapper.find('.card-media-layer').text()).toBe('media')

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
    const wrapper = mount(ZCard, {
      props: {
        bordered: false
      }
    })

    expect(wrapper.find('.z-card--bordered').exists()).toBe(false)
    wrapper.unmount()
  })
})
