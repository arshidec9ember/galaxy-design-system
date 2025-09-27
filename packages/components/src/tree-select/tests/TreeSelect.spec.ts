import { mount } from '@vue/test-utils'
import { ZTreeSelect, type TreeSelectOption } from '../index'

describe('z-tree-select', () => {
  it('should work with import on demand', () => {
    mount(ZTreeSelect)
  })
  it('should accept proper options', () => {
    mount(ZTreeSelect, {
      props: {
        options: [
          {
            label: '1',
            key: '1'
          }
        ]
      }
    })
    const options: TreeSelectOption[] = [
      {
        label: '1',
        key: '1',
        gogogo: '12'
      }
    ]
    mount(ZTreeSelect, {
      props: {
        options
      }
    })
  })
  it('should show all path when set showPath', async () => {
    const wrapper = mount(ZTreeSelect, {
      props: {
        options: [
          {
            label: '1',
            key: '1',
            children: [
              {
                label: '1-1',
                key: '1-1'
              },
              {
                label: '1-2',
                key: '1-2'
              }
            ]
          }
        ],
        showPath: true,
        defaultModelValue: '1-2'
      }
    })
    expect(wrapper.find('.z-base-selection-input').exists()).toBe(true)
    expect(wrapper.find('.z-base-selection-input').text()).toBe('1 / 1-2')

    await wrapper.setProps({ showPath: false })
    expect(wrapper.find('.z-base-selection-input').exists()).toBe(true)
    expect(wrapper.find('.z-base-selection-input').text()).toBe('1-2')

    await wrapper.setProps({
      showPath: true,
      defaultModelValue: '1-1',
      separator: ' | '
    })
    expect(wrapper.find('.z-base-selection-input').exists()).toBe(true)
    expect(wrapper.find('.z-base-selection-input').text()).toBe('1 | 1-2')
  })

  it('should work with `multiple` prop', () => {
    const wrapper = mount(ZTreeSelect, {
      props: {
        multiple: true,
        options: [
          {
            label: '1',
            key: '1'
          }
        ]
      }
    })
    expect(wrapper.find('.z-base-selection').attributes('class')).toContain(
      'z-base-selection--multiple'
    )
  })
})
