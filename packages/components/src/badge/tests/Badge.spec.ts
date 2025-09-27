import { mount } from '@vue/test-utils'
import { ZBadge } from '../index'

describe('z-badge', () => {
  it('should work with import on demand', () => {
    mount(ZBadge)
  })

  it('should work with `dot` prop', async () => {
    const wrapper = mount(ZBadge, { props: { value: 5 } })
    expect(wrapper.find('.z-badge').classes('z-badge--dot')).not.toBe(true)
    expect(wrapper.find('.z-base-slot-machine').exists()).toBe(true)

    await wrapper.setProps({ dot: true })
    expect(wrapper.find('.z-badge').classes('z-badge--dot')).toBe(true)
    expect(wrapper.find('.z-base-slot-machine').exists()).not.toBe(true)
    wrapper.unmount()
  })

  it('should work with `color` prop', async () => {
    const wrapper = mount(ZBadge, { props: { value: 5, color: 'grey' } })
    expect(wrapper.find('.z-badge').attributes('style')).toContain(
      '--z-color: grey;'
    )
    wrapper.unmount()
  })

  it('should work with `max` prop', async () => {
    const wrapper = mount(ZBadge, { props: { value: 5, max: 5 } })
    expect(
      wrapper
        .find('.z-base-slot-machine-current-number__inner--not-number')
        .exists()
    ).not.toBe(true)

    await wrapper.setProps({ value: 6 })
    expect(
      wrapper
        .find('.z-base-slot-machine-current-number__inner--not-number')
        .exists()
    ).toBe(true)
    wrapper.unmount()
  })

  it('should work with `processing` prop', async () => {
    const wrapper = mount(ZBadge, { props: { value: 5 } })
    expect(wrapper.find('.z-base-wave').exists()).not.toBe(true)

    await wrapper.setProps({ processing: true })
    expect(wrapper.find('.z-base-wave').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `show-zero` prop', async () => {
    const wrapper = mount(ZBadge, { props: { value: 0 } })
    expect(wrapper.find('.z-badge-sup').exists()).not.toBe(true)

    await wrapper.setProps({ showZero: true })
    expect(wrapper.find('.z-badge-sup').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `show` prop', async () => {
    const wrapper = mount(ZBadge, { props: { value: 7 } })
    expect(wrapper.find('.z-badge-sup').exists()).toBe(true)

    await wrapper.setProps({ show: false })
    expect(wrapper.find('.z-badge-sup').exists()).not.toBe(true)
    wrapper.unmount()
  })

  it('should work with `color` prop', () => {
    const data = [
      { type: 'primary', color: '#000000' },
      { type: 'error', color: '#d03050' },
      { type: 'info', color: '#2080f0' },
      { type: 'success', color: '#25c357' },
      { type: 'warning', color: '#f0a020' }
    ] as const

    data.forEach((item) => {
      const wrapper = mount(ZBadge, {
        props: {
          color: item.type,
          value: 5
        }
      })

      expect(wrapper.find('.z-badge').attributes('style')).toContain(item.color)
      wrapper.unmount()
    })
  })
})
