import { mount } from '@vue/test-utils'
import { ZDivider } from '../index'

describe('z-divider', () => {
  it('should work with import on demand', () => {
    mount(ZDivider)
  })

  it('default slot', () => {
    const str = 'star kirby'
    const wrapper = mount(ZDivider, {
      slots: {
        default: () => str
      }
    })
    wrapper.text().includes(str)
    wrapper.unmount()
  })

  it('should work with `title-placement` prop', async () => {
    const wrapper = mount(ZDivider, {
      props: { titlePlacement: 'left' },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.z-divider').classes()).toContain(
      'z-divider--title-position-left'
    )

    await wrapper.setProps({ titlePlacement: 'right' })
    expect(wrapper.find('.z-divider').classes()).toContain(
      'z-divider--title-position-right'
    )
    wrapper.unmount()
  })

  it('should work with `dashed` prop', async () => {
    const wrapper = mount(ZDivider)

    await wrapper.setProps({ dashed: true })
    expect(wrapper.find('.z-divider').classes()).toContain('z-divider--dashed')
    expect(wrapper.find('.z-divider').classes()).toContain(
      'z-divider--no-title'
    )
    wrapper.unmount()
  })

  it('should work with `vertical` prop', async () => {
    const wrapper = mount(ZDivider, {
      props: { vertical: true }
    })

    expect(wrapper.find('.z-divider').classes()).toContain(
      'z-divider--vertical'
    )
    wrapper.unmount()
  })
})
