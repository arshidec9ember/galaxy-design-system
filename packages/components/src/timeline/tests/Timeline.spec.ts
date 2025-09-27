import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { ZTimeline, ZTimelineItem } from '../index'

describe('z-timeline', () => {
  it('should work with import on demand', () => {
    mount(ZTimeline)
  })

  it('should work with `item-placement` prop', async () => {
    const wrapper = mount(ZTimeline)
    expect(wrapper.find('.z-timeline').classes()).toContain(
      'z-timeline--start-placement'
    )
    await wrapper.setProps({ itemPlacement: 'end' })
    expect(wrapper.find('.z-timeline').classes()).toContain(
      'z-timeline--end-placement'
    )
  })

  it('should work with `icon-size` prop', async () => {
    const iconSize = 50
    const wrapper = mount(ZTimeline, {
      props: { iconSize },
      slots: { default: () => h(ZTimelineItem) }
    })
    expect(wrapper.find('.z-timeline-item').attributes('style')).toContain(
      `--z-icon-size: ${iconSize}px`
    )
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(ZTimeline)
    expect(wrapper.find('.z-timeline').classes()).toContain(
      'z-timeline--medium-size'
    )
    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.z-timeline').classes()).toContain(
      'z-timeline--large-size'
    )
  })

  it('should work with `default` slot', async () => {
    const wrapper = mount(ZTimeline, {
      slots: {
        default: () => h(ZTimelineItem)
      }
    })
    expect(wrapper.find('.z-timeline').element.children.length).toBe(1)
    expect(
      wrapper.find('.z-timeline').element.children[0].getAttribute('class')
    ).toContain('z-timeline-item')
  })

  it('should work with `horizontal` prop', async () => {
    const wrapper = mount(ZTimeline, {
      props: {
        horizontal: true
      }
    })
    expect(wrapper.find('.z-timeline').classes()).toContain(
      'z-timeline--horizontal'
    )
    expect(wrapper.find('.z-timeline').classes()).not.toContain(
      'z-timeline--left-placement'
    )
    expect(wrapper.find('.z-timeline').classes()).not.toContain(
      'z-timeline--right-placement'
    )
  })
})

describe('z-timeline-item', () => {
  it('should work with `color` prop', async () => {
    let wrapper = mount(ZTimeline, {
      slots: {
        default: () =>
          h(ZTimelineItem, { title: 'test-title' }, { icon: () => 'icon' })
      }
    })
    expect(
      wrapper.find('.z-timeline-item-timeline__icon').attributes('style')
    ).toBe(undefined)

    wrapper = mount(ZTimeline, {
      slots: {
        default: () =>
          h(
            ZTimelineItem,
            { title: 'test-title', color: 'grey' },
            { icon: () => 'icon' }
          )
      }
    })
    expect(
      wrapper.find('.z-timeline-item-timeline__icon').attributes('style')
    ).toContain('color: grey')

    wrapper.unmount()
  })

  it('should work with `content`, `time`, `title` props', async () => {
    const wrapper = mount(ZTimeline, {
      slots: {
        default: () =>
          h(ZTimelineItem, {
            title: 'test-title',
            content: 'test-content',
            time: '2021-07-28'
          })
      }
    })
    expect(wrapper.find('.z-timeline-item-content__title').exists()).toBe(true)
    expect(wrapper.find('.z-timeline-item-content__title').text()).toBe(
      'test-title'
    )
    expect(wrapper.find('.z-timeline-item-content__content').exists()).toBe(
      true
    )
    expect(wrapper.find('.z-timeline-item-content__content').text()).toBe(
      'test-content'
    )
    expect(wrapper.find('.z-timeline-item-content__meta').exists()).toBe(true)
    expect(wrapper.find('.z-timeline-item-content__meta').text()).toBe(
      '2021-07-28'
    )
  })

  it('should work with `color` prop', async () => {
    ;(['neutral', 'success', 'info', 'warning', 'error'] as const).forEach(
      (item) => {
        const wrapper = mount(ZTimeline, {
          slots: {
            default: () =>
              h(ZTimelineItem, { title: 'test-title', color: item })
          }
        })
        expect(wrapper.find('.z-timeline-item').classes()).toContain(
          `z-timeline-item--${item}-type`
        )
      }
    )
  })

  it('should work with `line-type` prop', () => {
    ;(['default', 'dashed'] as const).forEach((lineType) => {
      const wrapper = mount(ZTimeline, {
        slots: {
          default: () => h(ZTimelineItem, { title: 'test-title', lineType })
        }
      })

      expect(wrapper.find('.z-timeline-item').classes()).toContain(
        `z-timeline-item--${lineType}-line-type`
      )
    })
  })

  it('should work with `default`, `footer`, `header` slots', async () => {
    const wrapper = mount(ZTimeline, {
      slots: {
        default: () =>
          h(ZTimelineItem, null, {
            header: () => 'test-header',
            icon: () => 'icon',
            default: () => 'test-default',
            footer: () => 'test-footer'
          })
      }
    })
    expect(wrapper.find('.z-timeline-item-content__title').exists()).toBe(true)
    expect(wrapper.find('.z-timeline-item-content__title').text()).toBe(
      'test-header'
    )
    expect(wrapper.find('.z-timeline-item-timeline__icon').exists()).toBe(true)
    expect(wrapper.find('.z-timeline-item-timeline__icon').text()).toBe('icon')
    expect(wrapper.find('.z-timeline-item-content__content').exists()).toBe(
      true
    )
    expect(wrapper.find('.z-timeline-item-content__content').text()).toBe(
      'test-default'
    )
    expect(wrapper.find('.z-timeline-item-content__meta').exists()).toBe(true)
    expect(wrapper.find('.z-timeline-item-content__meta').text()).toBe(
      'test-footer'
    )
  })
})
