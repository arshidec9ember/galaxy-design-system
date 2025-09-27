import { mount } from '@vue/test-utils'
import { ZScrollbar } from '../index'

describe('z-scrollbar', () => {
  it('should work with import on demand', () => {
    mount(ZScrollbar)
  })

  it('should work with `default` slot', () => {
    const text = 'test-default'
    const wrapper = mount(ZScrollbar, {
      attrs: { style: 'max-height: 120px' },
      slots: { default: () => text }
    })

    expect(wrapper.find('.z-scrollbar-rail').exists()).toBe(true)
    expect(wrapper.find('.z-scrollbar-content').text()).toBe(text)
    wrapper.unmount()
  })
})
