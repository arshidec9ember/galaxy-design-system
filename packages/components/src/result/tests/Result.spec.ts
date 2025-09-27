import { mount } from '@vue/test-utils'
import { ZResult } from '../index'

describe('z-result', () => {
  it('should work with import on demand', () => {
    mount(ZResult)
  })

  it('should work with `description` prop', async () => {
    const wrapper = mount(ZResult, {
      props: { description: 'test-description' }
    })
    expect(wrapper.find('.z-result__description').exists()).toBe(true)
    expect(wrapper.find('.z-result__description').text()).toBe(
      'test-description'
    )
    wrapper.unmount()
  })

  it('should work with `title` prop', async () => {
    const wrapper = mount(ZResult, {
      props: { title: 'test-title' }
    })
    expect(wrapper.find('.z-result__title').exists()).toBe(true)
    expect(wrapper.find('.z-result__title').text()).toBe('test-title')
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large', 'x-large'] as const).forEach((item) => {
      const wrapper = mount(ZResult, {
        props: { size: item }
      })
      expect(wrapper.find('.z-result').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with slots', async () => {
    const wrapper = mount(ZResult, {
      slots: {
        default: () => 'test-default',
        icon: () => 'test-custom-icon',
        actions: () => 'test-actions'
      }
    })
    expect(wrapper.find('.z-result__content').exists()).toBe(true)
    expect(wrapper.find('.z-result__content').text()).toBe('test-default')
    expect(wrapper.find('.z-result-icon').text()).toBe('test-custom-icon')
    expect(wrapper.find('.z-result__actions').exists()).toBe(true)
    expect(wrapper.find('.z-result__actions').text()).toBe('test-actions')
    wrapper.unmount()
  })

  it('should work with `status` prop', async () => {
    const wrapper = mount(ZResult, {
      props: { status: 'success' }
    })
    expect(wrapper.find('.z-result-icon').exists()).toBe(true)
    wrapper.unmount()
  })
})
