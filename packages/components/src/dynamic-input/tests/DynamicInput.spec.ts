import { mount } from '@vue/test-utils'
import { ZDynamicInput } from '../index'

describe('z-dynamic-input', () => {
  it('should work with import on demand', () => {
    mount(ZDynamicInput)
  })

  it('should work with `model-value`', async () => {
    const wrapper = mount(ZDynamicInput, {
      props: {
        modelValue: ['aaa']
      }
    })

    const inputEl = wrapper.find('input')
    expect(inputEl.element.value).toEqual('aaa')
    expect(wrapper.html()).toContain('data-key="0"')
    wrapper.unmount()
  })

  it('should work with `create-button-props` props', async () => {
    const wrapper = mount(ZDynamicInput, {
      props: {
        modelValue: [],
        createButtonProps: {
          borderStyle: 'dashed',
          variant: 'outlined'
        }
      }
    })

    expect(wrapper.find('.z-button').classes()).toContain(
      'z-button--outlined-variant'
    )
    wrapper.unmount()
  })

  it('should work with `preset` props', async () => {
    const wrapper = mount(ZDynamicInput, {
      props: {
        modelValue: ['aaa']
      }
    })
    expect(wrapper.find('.z-dynamic-input-preset-input').exists()).toBe(true)
    expect(wrapper.find('.z-dynamic-input-preset-pair').exists()).toBe(false)

    await wrapper.setProps({
      preset: 'pair',
      modelValue: [
        {
          key: 'key',
          value: 'value'
        }
      ]
    })
    expect(wrapper.find('.z-dynamic-input-preset-input').exists()).toBe(false)
    expect(wrapper.find('.z-dynamic-input-preset-pair').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `show-sort-button` props', async () => {
    const wrapper = mount(ZDynamicInput, {
      props: {
        modelValue: ['aaa'],
        showSortButton: true
      }
    })

    expect(wrapper.findAll('button').length).toBe(4)
    wrapper.unmount()
  })

  it('should work with `item-style` prop', async () => {
    const wrapper = mount(ZDynamicInput, {
      props: {
        modelValue: ['aaa'],
        itemStyle: { color: 'green' }
      }
    })

    expect(
      wrapper.findAll('.z-dynamic-input-item')[0].attributes('style')
    ).toBe('color: green;')
    wrapper.unmount()
  })

  it('should work with `min` `max` prop', async () => {
    const wrapper = mount(ZDynamicInput, {
      props: {
        modelValue: ['', '', ''],
        min: 2,
        max: 4
      }
    })
    expect(wrapper.find('.z-button--disabled').exists()).toBe(false)

    await wrapper.setProps({ modelValue: ['', ''] })
    expect(wrapper.findAll('button')[0].classes()).toContain(
      'z-button--disabled'
    )

    await wrapper.setProps({ modelValue: ['', '', '', ''] })
    expect(wrapper.findAll('button')[1].classes()).toContain(
      'z-button--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(ZDynamicInput, {
      props: {
        modelValue: [''],
        placeholder: 'test'
      }
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('test')
    wrapper.unmount()
  })

  it('should work with `key-placeholder` prop', async () => {
    const wrapper = mount(ZDynamicInput, {
      props: {
        preset: 'pair',
        modelValue: [
          {
            key: '',
            value: ''
          }
        ],
        keyPlaceholder: 'test-key-placeholder'
      }
    })

    expect(wrapper.findAll('input')[0].attributes('placeholder')).toBe(
      'test-key-placeholder'
    )
    wrapper.unmount()
  })

  it('should work with `on-create` prop', async () => {
    const onCreate = jest.fn()
    const wrapper = mount(ZDynamicInput, {
      props: {
        modelValue: [''],
        onCreate
      }
    })

    await wrapper.findAll('button')[1].trigger('click')
    expect(onCreate).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-remove` prop', async () => {
    const onRemove = jest.fn()
    const wrapper = mount(ZDynamicInput, {
      props: {
        modelValue: [''],
        onRemove
      }
    })

    await wrapper.findAll('button')[0].trigger('click')
    expect(onRemove).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `create-button-default` prop', async () => {
    const wrapper = mount(ZDynamicInput, {
      props: {
        modelValue: []
      },
      slots: {
        'create-button-default': () => 'test-content'
      }
    })

    expect(wrapper.find('.z-button__content').text()).toBe('test-content')
    wrapper.unmount()
  })

  it('should work with `create-button-icon` prop', async () => {
    const wrapper = mount(ZDynamicInput, {
      props: {
        modelValue: []
      },
      slots: {
        'create-button-icon': () => 'test-icon'
      }
    })

    expect(wrapper.find('.z-icon-slot').text()).toBe('test-icon')
    wrapper.unmount()
  })
})
