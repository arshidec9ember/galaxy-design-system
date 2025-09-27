import { mount } from '@vue/test-utils'
import { ZCardActionArea, ZCard } from '../index'
import { h } from 'vue'

describe('z-card-action-area', () => {
  it('should work with `z-card`', async () => {
    const wrapper = mount(ZCard, {
      slots: {
        default: () => [
          h(ZCardActionArea, null, {
            default: () => 'test1'
          })
        ]
      }
    })
    expect(wrapper.find('[role="region"]').classes()).toContain(
      'z-card__action-area'
    )
    expect(wrapper.find('.z-card__action-area').text()).toBe('test1')
    wrapper.unmount()
  })
})
