import { mount } from '@vue/test-utils'
import { ZProgress } from '../index'
import { SuccessIcon } from '../../_internal/icons'

describe('z-progress', () => {
  it('should work with import on demand', () => {
    mount(ZProgress)
  })

  it('should work with `variant` prop', async () => {
    ;(['line', 'circle', 'multiple-circle'] as const).forEach((item) => {
      const wrapper = mount(ZProgress, { props: { variant: item } })
      expect(wrapper.find('.z-progress').classes()).toContain(
        `z-progress--${item}`
      )
      wrapper.unmount()
    })
  })

  __FAILED__TESTCASES__ &&
    it('should work with `color`, `rail-color`, `indicator-text-color` prop', async () => {
      const wrapper = mount(ZProgress, {
        props: {
          // FIXME : invalid type
          // color: 'rgb(51, 51, 51)',
          'rail-color': 'rgb(68, 68, 68)',
          'indicator-text-color': 'rgb(85, 85, 85)'
        },
        slots: {
          default: () => 'test'
        }
      })
      expect(
        wrapper.find('.z-progress-graph-line-fill').attributes('style')
      ).toContain('background-color: rgb(51, 51, 51);')
      expect(
        wrapper.find('.z-progress-graph-line-rail').attributes('style')
      ).toContain('background-color: rgb(68, 68, 68);')
      expect(
        wrapper.find('.z-progress-custom-content').attributes('style')
      ).toContain('color: rgb(85, 85, 85);')
      wrapper.unmount()
    })

  it('should work with `border-radius`, `fill-border-radius` prop', async () => {
    const wrapper = mount(ZProgress, {
      props: {
        'border-radius': '12px',
        'fill-border-radius': '13px'
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(
      wrapper.find('.z-progress-graph-line-rail').attributes('style')
    ).toContain('border-radius: 12px')
    expect(
      wrapper.find('.z-progress-graph-line-fill').attributes('style')
    ).toContain('border-radius: 13px')
    wrapper.unmount()
  })

  it('should work with `height` prop', async () => {
    const wrapper = mount(ZProgress, {
      props: {
        height: 24
      }
    })
    expect(
      wrapper.find('.z-progress-graph-line-rail').attributes('style')
    ).toContain('height: 24')
    wrapper.unmount()
  })

  it('should work with `processing` prop', async () => {
    const wrapper = mount(ZProgress, {
      props: {
        processing: true
      }
    })
    expect(wrapper.find('.z-progress-graph-line-fill').classes()).toContain(
      'z-progress-graph-line-fill--processing'
    )
    wrapper.unmount()
  })

  it('should work with slot', async () => {
    const wrapper = mount(ZProgress, {
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.z-progress-custom-content').exists()).toBe(true)
    expect(wrapper.find('.z-progress-custom-content').text()).toBe('test')

    await wrapper.setProps({ showIndicator: false, variant: 'circle' })
    expect(wrapper.find('.z-progress-custom-content').exists()).toBe(false)

    await wrapper.setProps({ showIndicator: true })
    expect(wrapper.find('.z-progress-custom-content').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should show icon with `circle` variant', () => {
    const wrapper = mount(ZProgress, {
      props: {
        variant: 'circle',
        showIndicator: true,
        status: 'success'
      }
    })

    expect(wrapper.findComponent(SuccessIcon).exists()).toBe(true)
    wrapper.unmount()
  })

  it('should show icon with `line` variant', () => {
    const wrapper = mount(ZProgress, {
      props: {
        variant: 'line',
        showIndicator: true,
        indicatorPlacement: 'outside',
        status: 'success'
      }
    })

    expect(wrapper.findComponent(SuccessIcon).exists()).toBe(true)
    wrapper.unmount()
  })

  it('should show correct style with `line` variant', async () => {
    const wrapper = mount(ZProgress, {
      props: {
        variant: 'line',
        percentage: 50,
        borderRadius: 50
      }
    })

    expect(
      wrapper.find('.z-progress-graph-line-rail').attributes('style')
    ).toContain('border-radius: 50px;')

    await wrapper.setProps({ indicatorPlacement: 'inside' })
    expect(wrapper.find('.z-progress-graph-line-indicator').exists()).toBe(true)
    expect(wrapper.find('.z-progress-graph-line-indicator').text()).toBe('50%')
    wrapper.unmount()
  })

  it('should show correct style with `multiple-circle` variant', async () => {
    const wrapper = mount(ZProgress, {
      props: {
        variant: 'multiple-circle'
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.z-progress-text').exists()).toBe(true)
    wrapper.unmount()
  })
})
