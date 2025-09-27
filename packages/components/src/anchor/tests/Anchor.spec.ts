import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { ZAnchor, ZAnchorLink } from '../index'

describe('z-anchor', () => {
  it('should work with import on demand', () => {
    mount(ZAnchor)
  })

  it('should work with `showRail` and `showBackground` prop', async () => {
    const wrapper = mount(ZAnchor, {
      props: {
        showRail: true
      }
    })

    expect(wrapper.find('.z-anchor-rail').exists()).toBe(true)

    await wrapper.setProps({ showBackground: true })

    expect(wrapper.find('.z-anchor-link-background').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `affix` prop', () => {
    const wrapper = mount(ZAnchor, {
      props: {
        affix: true
      }
    })

    expect(wrapper.find('.z-affix').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `variant` prop', async () => {
    const wrapper = mount(ZAnchor, {
      props: {
        variant: 'rail'
      }
    })

    expect(wrapper.find('.z-anchor--show-rail').exists()).toBe(true)

    await wrapper.setProps({ variant: 'block' })

    expect(wrapper.find('.z-anchor--block').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `title` and `href` prop', async () => {
    const wrapper = mount(ZAnchor, {
      props: {
        showRail: false
      },
      slots: {
        default: () => {
          return h(ZAnchorLink, {
            title: 'testTitle',
            href: '#testHref'
          })
        }
      }
    })

    expect(wrapper.find('.z-anchor-link__title').attributes('href')).toBe(
      '#testHref'
    )
    expect(wrapper.find('.z-anchor-link__title').attributes('title')).toBe(
      'testTitle'
    )
    wrapper.unmount()
  })

  it('should work with `show-rail` and `max-height` prop', async () => {
    const wrapper = mount(ZAnchor, {
      props: {
        showRail: true,
        style: {
          maxHeight: '100px'
        }
      },
      slots: {
        default () {
          return h(ZAnchorLink, {
            title: 'testTitle',
            href: '#testHref'
          })
        }
      }
    })

    expect(wrapper.find('.z-scrollbar')).toBeTruthy()
    wrapper.unmount()
  })
})
