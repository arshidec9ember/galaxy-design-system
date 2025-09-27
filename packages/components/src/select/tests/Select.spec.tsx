import { h, nextTick, type VNode } from 'vue'
import { mount } from '@vue/test-utils'
import {
  ZSelect,
  type SelectProps,
  type SelectOption,
  type SelectGroupOption
} from '../index'
import { ZInternalSelection, ZInternalSelectMenu } from '../../_internal'
import { ZTag } from '../../tag'
import { type SelectBaseOption } from '../src/interface'

describe('z-select', () => {
  it('should work with import on demand', () => {
    mount(ZSelect)
  })
  it('show menu when trigger clicked', async () => {
    const wrapper = mount(ZSelect)
    const inputWrapper = wrapper.findComponent(ZInternalSelection)
    expect(wrapper.findComponent(ZInternalSelectMenu).exists()).toEqual(false)
    await inputWrapper.trigger('click')
    expect(wrapper.findComponent(ZInternalSelectMenu).isVisible()).toEqual(true)
    await inputWrapper.trigger('click')
    expect(wrapper.findComponent(ZInternalSelectMenu).isVisible()).toEqual(
      false
    )
    wrapper.unmount()
  })
  it('props.show', () => {
    const wrapper = mount(ZSelect, {
      props: {
        show: true
      }
    })
    expect(wrapper.findComponent(ZInternalSelectMenu).exists()).toEqual(true)
    wrapper.unmount()
  })
  describe('props.option', () => {
    it('has correct type', () => {
      const options: SelectProps['options'] = [
        {
          label: 'cool1',
          value: 'cool1'
        },
        {
          type: 'group',
          label: 'cool',
          key: 'group cool',
          children: [
            {
              label: 'cool2',
              value: 'cool2'
            }
          ]
        }
      ]
      mount(() => <ZSelect options={options} />).unmount()
    })
    it('option.label as render function', () => {
      const options: SelectProps['options'] = [
        {
          label: () => 'cool1+1',
          value: 'cool1'
        },
        {
          type: 'group',
          label: () => 'cool1+2',
          key: 'group cool',
          children: [
            {
              label: () => 'cool1+3',
              value: 'cool2'
            }
          ]
        }
      ]
      const wrapper = mount(ZSelect, {
        props: {
          options,
          show: true,
          virtualScroll: false
        }
      })
      const menuWrapper = wrapper.findComponent(ZInternalSelectMenu)
      expect(
        ['cool1+1', 'cool1+2', 'cool1+3'].every((label) =>
          menuWrapper.text().includes(label)
        )
      ).toEqual(true)
      wrapper.unmount()
    })
    it('option.render', () => {
      const options: SelectProps['options'] = [
        {
          label: 'cool1',
          value: 'cool1',
          render: ({ node, option }: { node: VNode, option: SelectOption }) => {
            expect(option.label).toEqual('cool1')
            return <div class="cool1">{node}</div>
          }
        },
        {
          type: 'group',
          label: 'cool2',
          key: 'group cool',
          render: ({
            node,
            option
          }: {
            node: VNode
            option: SelectGroupOption
          }) => {
            expect(option.label).toEqual('cool2')
            return <div class="cool2">{node}</div>
          },
          children: [
            {
              label: 'cool3',
              value: 'cool3',
              render: ({ node, option }) => {
                expect(option.label).toEqual('cool3')
                return <div class="cool3">{node}</div>
              }
            }
          ]
        }
      ]
      const wrapper = mount(ZSelect, {
        props: {
          options,
          show: true,
          virtualScroll: false
        }
      })
      const menuWrapper = wrapper.findComponent(ZInternalSelectMenu)
      expect(menuWrapper.find('.cool1').exists()).toEqual(true)
      expect(menuWrapper.find('.cool2').exists()).toEqual(true)
      expect(menuWrapper.find('.cool3').exists()).toEqual(true)
      wrapper.unmount()
    })
    it('props.renderOption', () => {
      const renderOption: SelectProps['renderOption'] = ({
        node,
        option
      }: {
        node: VNode
        option: SelectOption | SelectGroupOption
      }) => <div class={option.label}>{node}</div>
      const options: SelectProps['options'] = [
        {
          label: 'cool1',
          value: 'cool1'
        },
        {
          type: 'group',
          label: 'cool2',
          key: 'group cool',
          children: [
            {
              label: 'cool3',
              value: 'cool3',
              render: ({ node, option }) => {
                expect(option.label).toEqual('cool3')
                return <div class="cool3">{node}</div>
              }
            }
          ]
        }
      ]
      const wrapper = mount(ZSelect, {
        props: {
          options,
          show: true,
          virtualScroll: false,
          renderOption
        }
      })
      const menuWrapper = wrapper.findComponent(ZInternalSelectMenu)
      expect(menuWrapper.find('.cool1').exists()).toEqual(true)
      expect(menuWrapper.find('.cool2').exists()).toEqual(true)
      expect(menuWrapper.find('.cool3').exists()).toEqual(true)
      wrapper.unmount()
    })
  })

  it('should work with `render-option-tag` prop', async () => {
    const options = [
      {
        label: 'test',
        value: 'test',
        color: 'success'
      }
    ]

    const wrapper = mount(ZSelect, {
      props: {
        defaultModelValue: ['test'],
        options,
        multiple: true,
        virtualScroll: false,
        renderOptionTag: ({
          option,
          handleClose
        }: {
          option: SelectBaseOption
          handleClose: () => void
        }) => {
          return h(
            ZTag,
            {
              color: option.color as 'success',
              closable: true,
              onClose: handleClose
            },
            { default: () => option.label }
          )
        }
      }
    })

    expect(wrapper.find('.z-base-selection-tag-wrapper').exists()).toBe(true)
    expect(wrapper.findComponent(ZTag).exists()).toBe(true)
    expect(wrapper.findComponent(ZTag).props('color')).toContain('success')
    await wrapper.find('.z-tag__close').trigger('click')
    expect(wrapper.findComponent(ZTag).exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `render-option-label` prop', async () => {
    const options = [
      {
        label: 'test',
        value: 'test'
      }
    ]

    const wrapper = mount(ZSelect, {
      attachTo: document.body,
      props: {
        defaultModelValue: 'test',
        options,
        virtualScroll: false,
        renderOptionLabel: (option: SelectOption) => {
          return 'render-' + String(option.label)
        }
      }
    })

    expect(wrapper.find('.z-base-selection-input').text()).toBe('render-test')
    await wrapper.setProps({ show: true })
    await nextTick()
    expect(
      document.querySelector('.z-base-select-option--selected')?.innerHTML
    ).toContain('render-test')
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(ZSelect)

    expect(wrapper.find('.z-base-selection').classes()).not.toContain(
      'z-base-selection--disabled'
    )
    await wrapper.setProps({
      disabled: true
    })
    expect(wrapper.find('.z-base-selection').classes()).toContain(
      'z-base-selection--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `filterable` prop', async () => {
    const wrapper = mount(ZSelect)

    expect(wrapper.find('input').exists()).not.toBe(true)
    expect(wrapper.find('.z-base-selection-input').exists()).not.toBe(true)
    await wrapper.setProps({
      filterable: true
    })
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('.z-base-selection-input').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `loading` prop', async () => {
    const wrapper = mount(ZSelect)

    expect(wrapper.find('.z-base-loading__container').exists()).not.toBe(true)
    await wrapper.setProps({
      loading: true
    })
    expect(wrapper.find('.z-base-loading__container').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `multiple` prop', async () => {
    const wrapper = mount(ZSelect)

    expect(wrapper.find('.z-base-selection').classes()).not.toContain(
      'z-base-selection--multiple'
    )
    await wrapper.setProps({
      multiple: true
    })
    expect(wrapper.find('.z-base-selection').classes()).toContain(
      'z-base-selection--multiple'
    )
    wrapper.unmount()
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(ZSelect, {
      props: {
        placeholder: 'test'
      }
    })
    expect(wrapper.find('.z-base-selection-placeholder').text()).toBe('test')
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((i) => {
      const wrapper = mount(ZSelect, { props: { size: i } })
      expect(
        wrapper.find('.z-base-selection').attributes('style')
      ).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `themeOverrides` prop', async () => {
    const selectThemeOverrides = {
      peers: {
        InternalSelectMenu: {
          peers: {
            Empty: {
              textColor: '#4fb233'
            }
          }
        }
      }
    }
    const wrapper = mount(ZSelect, {
      props: {
        themeOverrides: selectThemeOverrides,
        show: true
      }
    })
    const menuWrapper = wrapper.findComponent(ZInternalSelectMenu)
    expect(
      menuWrapper
        .find('.z-base-select-menu__empty .z-empty')
        .attributes('style')
    ).toContain('--z-text-color: #4fb233;')
    wrapper.unmount()
  })

  it('should work with `menuProps` prop', () => {
    const menuProps = {
      class: 'menu-test',
      style: {
        background: 'rgb(79, 178, 51)'
      }
    }
    const wrapper = mount(ZSelect, {
      props: {
        menuProps,
        show: true
      }
    })
    const menuWrapper = wrapper.findComponent(ZInternalSelectMenu)
    expect(menuWrapper.attributes('style')).toContain(
      'background: rgb(79, 178, 51);'
    )
    expect(menuWrapper.classes()).toContain('menu-test')
    wrapper.unmount()
  })

  it('should work with `action` slot', () => {
    const wrapper = mount(ZSelect, {
      props: {
        show: true
      },
      slots: {
        action: () => 'test-action-slot'
      }
    })
    const menuWrapper = wrapper.findComponent(ZInternalSelectMenu)
    expect(menuWrapper.find('.z-base-select-menu__action').exists()).toBe(true)
    expect(menuWrapper.find('.z-base-select-menu__action').text()).toContain(
      'test-action-slot'
    )
    wrapper.unmount()
  })

  it('should work with `empty` slot', () => {
    const wrapper = mount(ZSelect, {
      props: {
        show: true
      },
      slots: {
        empty: () => 'test-empty-slot'
      }
    })
    const menuWrapper = wrapper.findComponent(ZInternalSelectMenu)
    expect(menuWrapper.find('.z-base-select-menu__empty').exists()).toBe(true)
    expect(menuWrapper.find('.z-base-select-menu__empty').text()).toContain(
      'test-empty-slot'
    )
    wrapper.unmount()
  })
})
