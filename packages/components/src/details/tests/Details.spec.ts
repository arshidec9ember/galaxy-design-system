import { h, type VNode } from 'vue'
import { mount } from '@vue/test-utils'
import { ZDetails, ZDetailsItem } from '../index'

function getDetailsItemList (): VNode[] {
  return (['Breakfast', 'Lunch', 'Dinner', 'Midnight snack'] as const).map(
    (item) => {
      return h(ZDetailsItem, { label: item }, { default: () => item })
    }
  )
}

describe('z-details', () => {
  it('should work with import on demand', () => {
    mount(ZDetails)
  })

  it('should work with slots', async () => {
    let wrapper = mount(ZDetails, {
      slots: { default: () => getDetailsItemList(), header: () => 'test' }
    })
    expect(wrapper.findAll('.z-details-table-header').length).toBe(4)
    expect(wrapper.findAll('.z-details-table-content').length).toBe(4)

    expect(wrapper.find('.z-details-header').exists()).toBe(true)
    expect(wrapper.find('.z-details-header').text()).toBe('test')

    wrapper = mount(ZDetails, {
      slots: {
        default: () =>
          h(ZDetailsItem, null, {
            default: () => 'test-default',
            label: () => 'test-label'
          })
      }
    })

    expect(wrapper.find('.z-details-table-header').text()).toBe('test-label')
    expect(wrapper.find('.z-details-table-content').text()).toBe('test-default')
    wrapper.unmount()
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(ZDetails)
    expect(wrapper.find('.z-details').classes()).not.toContain(
      'z-details--bordered'
    )

    await wrapper.setProps({ bordered: true })
    expect(wrapper.find('.z-details').classes()).toContain(
      'z-details--bordered'
    )
    wrapper.unmount()
  })

  it('should work with `column` prop', async () => {
    const wrapper = mount(ZDetails, {
      slots: { default: () => getDetailsItemList() }
    })
    expect(wrapper.find('.z-details-table-row').element.childNodes.length).toBe(
      6
    ) // 3 * 2

    await wrapper.setProps({ column: 4 })
    expect(wrapper.find('.z-details-table-row').element.childNodes.length).toBe(
      8
    ) // 4 * 2
    wrapper.unmount()
  })

  it('should work with `label-align` prop', async () => {
    const wrapper = mount(ZDetails, {
      slots: { default: () => getDetailsItemList() }
    })
    expect(wrapper.find('.z-details').classes()).toContain(
      'z-details--left-label-align'
    )

    await wrapper.setProps({ labelAlign: 'center' })
    expect(wrapper.find('.z-details').classes()).toContain(
      'z-details--center-label-align'
    )

    await wrapper.setProps({ labelAlign: 'right' })
    expect(wrapper.find('.z-details').classes()).toContain(
      'z-details--right-label-align'
    )
    wrapper.unmount()
  })

  it('should work with `label-placement` prop', async () => {
    const wrapper = mount(ZDetails, {
      slots: { default: () => getDetailsItemList() }
    })
    expect(wrapper.find('.z-details').classes()).toContain(
      'z-details--top-label-placement'
    )

    await wrapper.setProps({ labelPlacement: 'left' })
    expect(wrapper.find('.z-details').classes()).toContain(
      'z-details--left-label-placement'
    )
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(ZDetails, {
      slots: { default: () => getDetailsItemList() }
    })
    expect(wrapper.find('.z-details').classes()).toContain(
      'z-details--medium-size'
    )

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.z-details').classes()).toContain(
      'z-details--small-size'
    )

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.z-details').classes()).toContain(
      'z-details--large-size'
    )
    wrapper.unmount()
  })

  it('should work with `title` prop', async () => {
    const wrapper = mount(ZDetails, {
      slots: { default: () => getDetailsItemList() }
    })
    expect(wrapper.find('.z-details-header').exists()).not.toBe(true)

    await wrapper.setProps({ title: 'test' })
    expect(wrapper.find('.z-details-header').exists()).toBe(true)
    expect(wrapper.find('.z-details-header').text()).toBe('test')
    wrapper.unmount()
  })

  it('should work with `separator` prop', async () => {
    const wrapper = mount(ZDetails, {
      props: {
        labelPlacement: 'left'
      },
      slots: { default: () => getDetailsItemList() }
    })
    expect(wrapper.find('.z-details-separator').text()).toEqual(':')

    await wrapper.setProps({ separator: '/' })
    expect(wrapper.find('.z-details-separator').text()).toEqual('/')
    wrapper.unmount()
  })

  it('should work with `content-style` prop', () => {
    const wrapper = mount(ZDetails, {
      props: {
        contentStyle: { backgroundColor: 'red' }
      },
      slots: {
        default: () => h(ZDetailsItem, {}, 'test')
      }
    })

    expect(wrapper.find('.z-details-table-content').attributes('style')).toBe(
      'background-color: red;'
    )
    wrapper.unmount()
  })

  it('should work with `label-style` prop', () => {
    const wrapper = mount(ZDetails, {
      props: {
        labelStyle: { fontSize: '30px' }
      },
      slots: {
        default: () => h(ZDetailsItem, {}, 'test')
      }
    })

    expect(wrapper.find('.z-details-table-header').attributes('style')).toBe(
      'font-size: 30px;'
    )
    wrapper.unmount()
  })
})
