import { mount } from '@vue/test-utils'
import { ZCardHeader, ZCard } from '../index'
import { h } from 'vue'

describe('z-card-header', () => {
  it('should work with `z-card`', async () => {
    const wrapper = mount(ZCard, {
      slots: {
        default: () => [
          h(ZCardHeader, null, {
            default: () => 'test1'
          })
        ]
      }
    })
    expect(wrapper.find('[role="banner"]').classes()).toContain('z-card-header')
    expect(wrapper.find('.z-card-header').text()).toBe('test1')
    wrapper.unmount()
  })
})
