import { mount } from '@vue/test-utils'
import { ZWatermark } from '../index'

describe('ZWatermark', () => {
  it('should work with import on demand', () => {
    mount(ZWatermark)
  })
  it('should work with `z-index` prop', () => {
    const wrapper = mount(ZWatermark, {
      props: {
        zIndex: 9
      }
    })
    expect(wrapper.find('.z-watermark').exists()).toBe(true)
    expect(wrapper.find('.z-watermark').attributes('style')).toContain(
      'z-index: 9'
    )
  })
  it('should work with `x-gap` & `width` props', () => {
    const wrapper = mount(ZWatermark, {
      props: {
        xGap: 10,
        width: 100
      }
    })
    expect(wrapper.find('.z-watermark').attributes('style')).toContain(
      'background-size: 110px'
    )
  })
  it('should work with `selectable` prop', () => {
    const wrapper = mount(ZWatermark, {
      props: {
        selectable: true
      }
    })
    expect(wrapper.find('.z-watermark-container--selectable').exists()).toBe(
      true
    )
  })

  it('should work with `fullscreen` prop', async () => {
    const wrapper = mount(ZWatermark)
    expect(wrapper.find('.z-watermark').classes()).not.toContain(
      'z-watermark--fullscreen'
    )

    await wrapper.setProps({ fullscreen: true })
    expect(wrapper.find('.z-watermark').classes()).toContain(
      'z-watermark--fullscreen'
    )
  })
})
