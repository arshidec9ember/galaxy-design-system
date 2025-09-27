import { mount } from '@vue/test-utils'
import { ZCollapseTransition } from '../index'

describe('z-collapse', () => {
  it('should work with import on demand', () => {
    mount(ZCollapseTransition)
  })

  it('should work with `show` prop', async () => {
    const wrapper = mount(ZCollapseTransition)
    expect(wrapper.find('.z-collapse-transition').exists()).toBe(true)

    await wrapper.setProps({ show: false })
    expect(wrapper.find('.z-collapse-transition').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `default` slot', async () => {
    const wrapper = mount(ZCollapseTransition, {
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.z-collapse-transition').exists()).toBe(true)
    expect(wrapper.find('.z-collapse-transition').text()).toBe('test')
    wrapper.unmount()
  })
})
