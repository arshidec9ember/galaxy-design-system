import { mount } from '@vue/test-utils'
import { ZCardAction, ZCard } from '../index'
import { h } from 'vue'

describe('z-card-action', () => {
  it('should work with `z-card`', async () => {
    const wrapper = mount(ZCard, {
      slots: {
        default: () => [
          h(ZCardAction, null, {
            default: () => 'test1'
          })
        ]
      }
    })
    expect(wrapper.find('[role="region"]').classes()).toContain(
      'z-card__action'
    )
    expect(wrapper.find('.z-card__action').text()).toBe('test1')
    wrapper.unmount()
  })
})
