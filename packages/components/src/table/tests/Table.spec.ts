import { mount } from '@vue/test-utils'
import { ZTable, ZTbody, ZThead, ZTd, ZTh, ZTr } from '../index'

describe('z-table', () => {
  it('should work with import on demand', () => {
    mount(ZTable)
  })

  it('should work with `bottom-bordered` prop', async () => {
    const wrapper = mount(ZTable)
    expect(wrapper.find('.z-table').classes()).toContain(
      'z-table--bottom-bordered'
    )

    await wrapper.setProps({ bottomBordered: false })
    expect(wrapper.find('.z-table').classes()).not.toContain(
      'z-table--bottom-bordered'
    )
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(ZTable)
    expect(wrapper.find('.z-table').classes()).toContain('z-table--bordered')

    await wrapper.setProps({ bordered: false })
    expect(wrapper.find('.z-table').classes()).not.toContain(
      'z-table--bordered'
    )
  })

  it('should work with `row-separator` prop', async () => {
    const wrapper = mount(ZTable)
    expect(wrapper.find('.z-table').classes()).not.toContain(
      'z-table--hide-row-separator'
    )

    await wrapper.setProps({ rowSeparator: false })
    expect(wrapper.find('.z-table').classes()).toContain(
      'z-table--hide-row-separator'
    )
  })

  __FAILED__TESTCASES__ &&
    it('should work with `column-separator` prop', async () => {
      const wrapper = mount(ZTable)
      expect(wrapper.find('.z-table').classes()).toContain(
        'z-table--hide-column-separator'
      )

      await wrapper.setProps({ columnSeparator: false })
      expect(wrapper.find('.z-table').classes()).not.toContain(
        'z-table--hide-column-separator'
      )
    })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((size) => {
      const wrapper = mount(ZTable, { props: { size } })
      expect(wrapper.find('.z-table').attributes('style')).toMatchSnapshot()
    })
  })

  it('should work with `striped` prop', async () => {
    const wrapper = mount(ZTable)
    expect(wrapper.find('.z-table').classes()).not.toContain('z-table--striped')

    await wrapper.setProps({ striped: true })
    expect(wrapper.find('.z-table').classes()).toContain('z-table--striped')
  })
})

describe('z-table-body', () => {
  it('should work with import on demand', () => {
    mount(ZTbody)
  })
})

describe('z-table-head', () => {
  it('should work with import on demand', () => {
    mount(ZThead)
  })
})

describe('z-table-td', () => {
  it('should work with import on demand', () => {
    mount(ZTd)
  })
})

describe('z-table-th', () => {
  it('should work with import on demand', () => {
    mount(ZTh)
  })
})

describe('z-table-tr', () => {
  it('should work with import on demand', () => {
    mount(ZTr)
  })
})
