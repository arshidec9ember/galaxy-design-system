import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { ZRadio, ZRadioGroup } from '../index'

describe('z-radio', () => {
  it('should work with import on demand', () => {
    mount(ZRadio)
  })

  it('should work with `checked` prop', async () => {
    const wrapper = mount(ZRadio, { props: { checked: false } })
    expect(wrapper.find('.z-radio').classes()).not.toContain('z-radio--checked')
    await wrapper.setProps({ modelValue: true })
    expect(wrapper.find('.z-radio').classes()).toContain('z-radio--checked')
    wrapper.unmount()
  })

  it('should work with `defaultChecked` prop', async () => {
    let wrapper = mount(ZRadio, { props: { defaultModelValue: true } })
    expect(wrapper.find('.z-radio').classes()).toContain('z-radio--checked')

    wrapper = mount(ZRadio, { props: { defaultModelValue: false } })
    expect(wrapper.find('.z-radio').classes()).not.toContain('z-radio--checked')
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(ZRadio, { props: { disabled: false } })
    expect(wrapper.find('.z-radio').classes()).not.toContain(
      'z-radio--disabled'
    )
    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.z-radio').classes()).toContain('z-radio--disabled')
    wrapper.unmount()
  })

  it('should work with `name` prop', async () => {
    const wrapper = mount(ZRadio, { props: { name: 'randomName111' } })

    const radio = wrapper.find('input[type=radio]')

    expect(radio.attributes('name')).toEqual('randomName111')

    await wrapper.setProps({ name: 'randomName222' })

    expect(radio.attributes('name')).toEqual('randomName222')
    wrapper.unmount()
  })

  it('should render default slot content', async () => {
    const wrapper = mount(ZRadio, { slots: { default: 'MySlotContent' } })

    const radio = wrapper.find('.z-radio__label')

    expect(radio.text()).toContain('MySlotContent')
    wrapper.unmount()
  })

  it('should work with `label` prop', async () => {
    const wrapper = mount(ZRadio, { props: { label: 'MyRandomLabel' } })

    const radio = wrapper.find('.z-radio__label')

    expect(radio.text()).toContain('MyRandomLabel')

    await wrapper.setProps({ label: 'MyNewRandomLabel' })

    expect(radio.text()).toContain('MyNewRandomLabel')
    wrapper.unmount()
  })

  it('should render default slot content in priority of label', async () => {
    const wrapper = mount(ZRadio, {
      props: { label: 'MyRandomLabel' },
      slots: { default: 'MySlotContent' }
    })

    const radio = wrapper.find('.z-radio__label')

    expect(radio.text()).not.toContain('MyRandomLabel')
    expect(radio.text()).toContain('MySlotContent')
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((size) => {
      const wrapper = mount(ZRadio, { props: { size } })
      expect(wrapper.find('.z-radio').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `onUpdate:model-value` prop', async () => {
    const onUpdate1 = jest.fn()
    const onUpdate2 = jest.fn()
    const wrapper = mount(ZRadio, {
      props: { 'onUpdate:model-value': onUpdate1, onUpdateChecked: onUpdate2 }
    })

    await wrapper.find('.z-radio').trigger('click')
    setTimeout(() => {
      expect(onUpdate1).toHaveBeenCalled()
      expect(onUpdate2).toHaveBeenCalled()
    }, 0)
    wrapper.unmount()
  })
})

describe('z-radio-group', () => {
  it('should work with import on demand', () => {
    mount(ZRadioGroup, {
      slots: {
        default: () => [
          h(ZRadio, null, { default: () => 'test-item1' }),
          h(ZRadio, null, { default: () => 'test-item2' })
        ]
      }
    })
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(ZRadioGroup, {
      slots: {
        default: () => [
          h(ZRadio, null, { default: () => 'test-item1' }),
          h(ZRadio, null, { default: () => 'test-item2' })
        ]
      }
    })
    expect(wrapper.find('.z-radio--disabled').exists()).not.toBe(true)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.findAll('.z-radio')[0].classes()).toContain(
      'z-radio--disabled'
    )
    expect(wrapper.findAll('.z-radio')[1].classes()).toContain(
      'z-radio--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `name` prop', async () => {
    const wrapper = mount(ZRadioGroup, {
      props: {
        name: 'randomName111'
      },
      slots: {
        default: () => [
          h(ZRadio, null, { default: () => 'test-item1' }),
          h(ZRadio, null, { default: () => 'test-item2' })
        ]
      }
    })

    const radio1 = wrapper.findAll('input[type=radio]')[0]
    const radio2 = wrapper.findAll('input[type=radio]')[1]

    expect(radio1.attributes('name')).toEqual('randomName111')
    expect(radio2.attributes('name')).toEqual('randomName111')

    await wrapper.setProps({ name: 'randomName222' })

    expect(radio1.attributes('name')).toEqual('randomName222')
    expect(radio2.attributes('name')).toEqual('randomName222')
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((size) => {
      const wrapper = mount(ZRadioGroup, {
        props: {
          size
        },
        slots: {
          default: () => [
            h(ZRadio, null, { default: () => 'test-item1' }),
            h(ZRadio, null, { default: () => 'test-item2' })
          ]
        }
      })
      expect(
        wrapper.find('.z-radio-group').attributes('style')
      ).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `model-value` prop', async () => {
    const wrapper = mount(ZRadioGroup, {
      props: {
        modelValue: 'test1'
      },
      slots: {
        default: () => [
          h(ZRadio, { value: 'test1' }, { default: () => 'test-item1' }),
          h(ZRadio, { value: 'test2' }, { default: () => 'test-item2' })
        ]
      }
    })
    expect(wrapper.findAll('.z-radio')[0].classes()).toContain(
      'z-radio--checked'
    )
    expect(wrapper.findAll('.z-radio')[1].classes()).not.toContain(
      'z-radio--checked'
    )

    await wrapper.setProps({ modelValue: 'test2' })
    expect(wrapper.findAll('.z-radio')[1].classes()).toContain(
      'z-radio--checked'
    )
    expect(wrapper.findAll('.z-radio')[0].classes()).not.toContain(
      'z-radio--checked'
    )
    wrapper.unmount()
  })

  it('should work with `on-update:model-value` prop', async () => {
    const onUpdateModelValue = jest.fn()
    const wrapper = mount(ZRadioGroup, {
      props: {
        onUpdateModelValue
      },
      slots: {
        default: () => [
          h(ZRadio, { value: 'test1' }, { default: () => 'test-item1' }),
          h(ZRadio, { value: 'test2' }, { default: () => 'test-item2' })
        ]
      }
    })

    await wrapper.findAll('.z-radio')[1].trigger('click')
    setTimeout(() => {
      expect(onUpdateModelValue).toHaveBeenCalled()
      wrapper.unmount()
    }, 0)
  })
})
