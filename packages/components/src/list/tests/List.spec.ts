import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { ZList, ZListItem } from '../index'

describe('z-list', () => {
  it('should work with import on demand', () => {
    mount(ZList)
  })

  it('should work with z-list slots', async () => {
    const wrapper = mount(ZList, {
      slots: {
        default: () => 'test default',
        header: () => 'test header',
        footer: () => 'test footer'
      }
    })
    expect(wrapper.text()).toContain('test default')
    expect(wrapper.find('.z-list__header').exists()).toBe(true)
    expect(wrapper.find('.z-list__header').text()).toBe('test header')
    expect(wrapper.find('.z-list__footer').exists()).toBe(true)
    expect(wrapper.find('.z-list__footer').text()).toBe('test footer')
    wrapper.unmount()
  })

  it('should work with z-list-item slots', async () => {
    const wrapper = mount(ZList, {
      slots: {
        default: () =>
          h(ZListItem, null, {
            default: () => 'test default',
            prefix: () => 'test prefix',
            suffix: () => 'test suffix'
          })
      }
    })
    expect(wrapper.find('.z-list-item__main').exists()).toBe(true)
    expect(wrapper.find('.z-list-item__main').text()).toBe('test default')
    expect(wrapper.find('.z-list-item__prefix').exists()).toBe(true)
    expect(wrapper.find('.z-list-item__prefix').text()).toBe('test prefix')
    expect(wrapper.find('.z-list-item__suffix').exists()).toBe(true)
    expect(wrapper.find('.z-list-item__suffix').text()).toBe('test suffix')
    wrapper.unmount()
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(ZList, {
      slots: {
        default: () =>
          h(ZListItem, null, {
            default: () => 'test'
          })
      }
    })
    expect(wrapper.find('.z-list').classes()).not.toContain('z-list--bordered')

    await wrapper.setProps({ bordered: true })
    expect(wrapper.find('.z-list').classes()).toContain('z-list--bordered')
    wrapper.unmount()
  })
})
