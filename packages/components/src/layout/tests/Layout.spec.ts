import { h } from 'vue'
import { mount } from '@vue/test-utils'
import {
  ZLayout,
  ZLayoutContent,
  ZLayoutFooter,
  ZLayoutHeader,
  ZLayoutSider
} from '../index'
import { ZH2 } from '../../typography'
import { ZCard } from '../../card'

describe('z-layout', () => {
  it('should work with import on demand', () => {
    mount(ZLayout)
  })

  it('should work with Basic', async () => {
    const wrapper = mount(ZLayout, {
      props: {
        'has-sider': true
      },
      slots: {
        default: () => [
          h(ZLayoutHeader, null, { default: () => 'test-header' }),
          h(ZLayoutContent, null, { default: () => 'test-content' }),
          h(ZLayoutSider, null, { default: () => 'test-sider' }),
          h(ZLayoutFooter, null, { default: () => 'test-footer' })
        ]
      }
    })

    expect(
      wrapper.find('.z-layout-scroll-container').element.children.length
    ).toBe(4)
    expect(
      wrapper
        .find('.z-layout-scroll-container')
        .element.children[0].getAttribute('class')
    ).toContain('z-layout-header')
    expect(wrapper.find('.z-layout-header').text()).toBe('test-header')
    expect(
      wrapper
        .find('.z-layout-scroll-container')
        .element.children[1].getAttribute('class')
    ).toContain('z-layout-content')
    expect(wrapper.findAll('.z-layout-scroll-container')[1].text()).toBe(
      'test-content'
    )
    expect(
      wrapper
        .find('.z-layout-scroll-container')
        .element.children[2].getAttribute('class')
    ).toContain('z-layout-sider')
    expect(wrapper.find('.z-layout-sider-scroll-container').text()).toBe(
      'test-sider'
    )
    expect(
      wrapper
        .find('.z-layout-scroll-container')
        .element.children[3].getAttribute('class')
    ).toContain('z-layout-footer')
    expect(wrapper.find('.z-layout-footer').text()).toBe('test-footer')
    wrapper.unmount()
  })

  it('should work with `content-style` prop', async () => {
    const wrapper = mount(ZLayout, {
      props: {
        'has-sider': true
      },
      slots: {
        default: () =>
          h(
            ZLayoutSider,
            { 'content-style': 'padding: 24px' },
            {
              default: () => [
                h(ZH2, null, { default: () => 'test1' }),
                h(ZH2, null, { default: () => 'test2' })
              ]
            }
          )
      }
    })
    expect(
      wrapper.find('.z-layout-sider-scroll-container').attributes('style')
    ).toContain('padding: 24px')
    wrapper.unmount()
  })

  it('should work with `embedded` prop', async () => {
    const wrapper = mount(ZLayout, {
      props: {
        embedded: true
      },
      slots: {
        default: () =>
          h(ZCard, null, {
            default: () => 'test'
          })
      }
    })
    expect(wrapper.find('.z-layout').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(ZLayout, {
      props: {
        'has-sider': true
      },
      slots: {
        default: () => [
          h(
            ZLayoutHeader,
            { bordered: true },
            { default: () => 'test-header' }
          ),
          h(ZLayoutSider, { bordered: true }, { default: () => 'test-sider' }),
          h(ZLayoutFooter, { bordered: true }, { default: () => 'test-footer' })
        ]
      }
    })
    expect(wrapper.find('.z-layout-header').classes()).toContain(
      'z-layout-header--bordered'
    )
    expect(wrapper.find('.z-layout-sider').classes()).toContain(
      'z-layout-sider--bordered'
    )
    expect(wrapper.find('.z-layout-footer').classes()).toContain(
      'z-layout-footer--bordered'
    )
    wrapper.unmount()
  })

  it('should work with `inverted` prop', async () => {
    const wrapper = mount(ZLayout, {
      props: {
        'has-sider': true
      },
      slots: {
        default: () => [
          h(
            ZLayoutHeader,
            { inverted: true },
            { default: () => 'test-header' }
          ),
          h(ZLayoutSider, { inverted: true }, { default: () => 'test-sider' }),
          h(ZLayoutFooter, { inverted: true }, { default: () => 'test-footer' })
        ]
      }
    })
    expect(
      wrapper.find('.z-layout-header').attributes('style')
    ).toMatchSnapshot()
    expect(
      wrapper.find('.z-layout-sider').attributes('style')
    ).toMatchSnapshot()
    expect(
      wrapper.find('.z-layout-footer').attributes('style')
    ).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `position` prop', async () => {
    let wrapper = mount(ZLayout, {
      slots: {
        default: () => [
          h(ZLayoutHeader, null, { default: () => 'test-header' })
        ]
      }
    })
    expect(wrapper.find('.z-layout').classes()).toContain(
      'z-layout--static-positioned'
    )
    wrapper = mount(ZLayout, {
      props: {
        position: 'absolute'
      },
      slots: {
        default: () => [
          h(ZLayoutHeader, null, { default: () => 'test-header' })
        ]
      }
    })
    expect(wrapper.find('.z-layout').classes()).toContain(
      'z-layout--absolute-positioned'
    )
    wrapper.unmount()
  })
})
