import { mount } from '@vue/test-utils'
import { ZElement } from '../index'

describe('z-element', () => {
  it('should work with import on demand', () => {
    mount(ZElement)
  })
  it('should work with `tag` prop', () => {
    const wrapper = mount(ZElement, {
      props: {
        tag: 'span'
      },
      slots: {
        default: () => 'element'
      }
    })
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.find('span').text()).toBe('element')
    wrapper.unmount()
  })
})
