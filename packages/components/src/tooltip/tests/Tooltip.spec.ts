import { mount } from '@vue/test-utils'
import { ZTooltip } from '../index'

describe('z-tooltip', () => {
  it('should work with import on demand', () => {
    mount(ZTooltip, {
      slots: {
        trigger: () => '07akioni'
      }
    })
  })

  it('should work with `show` props', async () => {
    const wrapper = mount(ZTooltip, {
      slots: {
        default: () => 'test-default',
        trigger: () => 'test-trigger'
      },
      attachTo: document.body
    })
    expect(document.querySelector('.z-tooltip')).toEqual(null)

    await wrapper.setProps({ show: true })
    expect(document.querySelector('.z-tooltip')).not.toEqual(null)
    wrapper.unmount()
  })
})
