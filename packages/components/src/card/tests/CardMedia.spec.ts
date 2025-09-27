import { mount } from '@vue/test-utils'
import { ZCardMedia, ZCard } from '../index'
import { h } from 'vue'

describe('z-card-media', () => {
  it('should work with `z-card`', async () => {
    const wrapper = mount(ZCard, {
      slots: {
        default: () => [h(ZCardMedia)]
      }
    })
    expect(wrapper.find('[role="region"]').classes()).toContain(
      'z-card-media-layer'
    )
    // background css property has src
    // TODO: add test cases
    wrapper.unmount()
  })
})
