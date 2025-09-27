import { mount } from '@vue/test-utils'
import { ZCardContent, ZCard } from '../index'
import { h } from 'vue'

describe('z-card-content', () => {
  it('should work with `z-card`', async () => {
    const wrapper = mount(ZCard, {
      slots: {
        default: () => [
          h(ZCardContent, null, {
            default: () => 'test1'
          })
        ]
      }
    })
    expect(wrapper.find('[role="region"]').classes()).toContain(
      'z-card__content'
    )
    expect(wrapper.find('.z-card__content').text()).toBe('test1')
    wrapper.unmount()
  })
})
