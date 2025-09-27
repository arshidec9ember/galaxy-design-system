import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { ZButtonOverflow } from '../index'
import { ZButton } from '../../button/index'

describe('z-button-overflow', () => {
  it('should work with import on demand', () => {
    mount(ZButtonOverflow)
  })

  it('should work with `button overflow`', async () => {
    const wrapper = mount(ZButtonOverflow, {
      slots: {
        default: () => [
          h(ZButton, null, {
            default: () => 'test1'
          }),
          h(ZButton, null, {
            default: () => 'test2'
          }),
          h(ZButton, null, {
            default: () => 'test3'
          }),
          h(ZButton, null, {
            default: () => 'test4'
          }),
          h(ZButton, null, {
            default: () => 'test5'
          })
        ]
      }
    })

    expect(wrapper.find('[role="group"]').classes()).toContain(
      'z-button-overflow'
    )
    expect(wrapper.findAll('button').length).toBe(4) // 3(default) + dropdown

    await wrapper.setProps({ maxItems: 6 })
    expect(wrapper.findAll('[role="group"]').length).toBe(1)
    expect(wrapper.findAll('button').length).toBe(5)
    wrapper.unmount()
  })
})
