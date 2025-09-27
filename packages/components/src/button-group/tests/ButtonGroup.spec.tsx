import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { ZButtonGroup } from '../index'
import { ZButton } from '../../button/index'

describe('z-button-group', () => {
  it('should work with import on demand', () => {
    mount(ZButtonGroup)
  })

  it('should work with `button group`', async () => {
    const wrapper = mount(ZButtonGroup, {
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
          })
        ]
      }
    })

    expect(wrapper.find('[role="group"]').classes()).toContain('z-button-group')
    expect(wrapper.findAll('button').length).toBe(3)

    await wrapper.setProps({ vertical: true })
    expect(wrapper.find('[role="group"]').classes()).toContain(
      'z-button-group--vertical'
    )
    wrapper.unmount()
  })
})
