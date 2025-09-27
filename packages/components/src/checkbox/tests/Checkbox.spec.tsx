import { h } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { ZCheckbox, ZCheckboxGroup } from '../index'
import { ZForm, ZFormItem } from '../../form'

function expectChecked (wrapper: VueWrapper<any>, value: boolean): void {
  expect(wrapper.classes().some((c) => c.includes('checked'))).toEqual(value)
  expect(wrapper.find('.z-checkbox').attributes('aria-checked')).toBe(
    value.toString()
  )
}

describe('z-checkbox', () => {
  it('should work with import on demand', () => {
    mount(ZCheckbox)
  })

  describe('uncontrolled mode', () => {
    it('works', async () => {
      const wrapper = mount(ZCheckbox)
      expectChecked(wrapper, false)
      await wrapper.trigger('click')
      expectChecked(wrapper, true)
      await wrapper.trigger('click')
      expectChecked(wrapper, false)
      wrapper.unmount()
    })
    it('props.defaultModelValue', () => {
      const wrapper = mount(ZCheckbox, {
        props: {
          defaultModelValue: true
        }
      })
      expectChecked(wrapper, true)
      wrapper.unmount()
    })
  })

  it('should work with `checked-value` prop', async () => {
    const onUpdateModelValue = jest.fn()
    const wrapper = mount(ZCheckbox, {
      props: {
        checkedValue: 'fooo',
        uncheckedValue: 'barr',
        onUpdateModelValue
      }
    })
    await wrapper.trigger('click')
    expect(onUpdateModelValue.mock.calls[0][0]).toEqual('fooo')
    await wrapper.trigger('click')
    expect(onUpdateModelValue.mock.calls[1][0]).toEqual('barr')
    await wrapper.trigger('click')
    expect(onUpdateModelValue.mock.calls[2][0]).toEqual('fooo')
    wrapper.unmount()
  })

  it('should work with `checked-value` prop in type layer', () => {
    const onUpdateModelValue1: (value: string) => void = () => {}
    const onUpdateModelValue2: (value: number) => void = () => {}
    const onUpdateModelValue3: (value: boolean) => void = () => {}
    let _ = (
      <ZCheckbox
        onUpdateModelValue={onUpdateModelValue1}
        modelValue={'123'}
        defaultModelValue={'123'}
      />
    )
    _ = (
      <ZCheckbox
        onUpdateModelValue={onUpdateModelValue2}
        modelValue={123}
        defaultModelValue={123}
      />
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ = (
      <ZCheckbox
        onUpdateModelValue={onUpdateModelValue3}
        modelValue={true}
        defaultModelValue={false}
      />
    )
  })

  it('should work with `indeterminate` prop', () => {
    const wrapper = mount(ZCheckbox, {
      props: {
        indeterminate: true
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.z-checkbox').classes()).toContain(
      'z-checkbox--indeterminate'
    )
    expect(wrapper.find('.z-checkbox').attributes('aria-checked')).toBe('mixed')
    wrapper.unmount()
  })

  it('should work with `disabled` prop', () => {
    const wrapper = mount(ZCheckbox, {
      props: {
        disabled: true
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.z-checkbox').classes()).toContain(
      'z-checkbox--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `focusable` prop', async () => {
    const wrapper = mount(ZCheckbox, {
      props: {
        focusable: false
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('[tabindex]').exists()).not.toBe(true)

    await wrapper.setProps({ focusable: true })
    expect(wrapper.find('[tabindex]').exists()).toBe(true)
    expect(wrapper.find('.z-checkbox').attributes('tabindex')).toContain('0')
    wrapper.unmount()
  })

  it('should work with `label` prop', async () => {
    const wrapper = mount(ZCheckbox, {
      props: {
        label: 'test'
      }
    })
    expect(wrapper.find('.z-checkbox__label').text()).toContain('test')
    wrapper.unmount()
  })

  it('should work with `on-update:checked` & `onUpdateModelValue` prop', async () => {
    const onClick = jest.fn()
    const wrapper = mount(ZCheckbox, {
      props: {
        'onUpdate:model-value': onClick,
        onUpdateModelValue: onClick
      },
      slots: {
        default: () => 'test'
      }
    })

    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(2)
    wrapper.unmount()
  })

  it('should work with default slots', async () => {
    const wrapper = mount(ZCheckbox, {
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.z-checkbox__label').text()).toContain('test')
    wrapper.unmount()
  })

  it('should work with `size` prop', () => {
    ;(['small', 'medium', 'large'] as const).forEach((i) => {
      const wrapper = mount(ZCheckbox, { props: { size: i } })
      expect(wrapper.find('.z-checkbox').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should show correct style with `ZForm` component', () => {
    const wrapper = mount(() => (
      <ZForm size="medium">
        {{
          default: () => {
            return (
              <ZFormItem>
                {{
                  default: () => <ZCheckbox />
                }}
              </ZFormItem>
            )
          }
        }}
      </ZForm>
    ))

    expect(wrapper.find('.z-checkbox').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  describe('accessibility', () => {
    it('should have a role of "checkbox"', () => {
      const wrapper = mount(ZCheckbox)
      expect(wrapper.find('.z-checkbox').attributes('role')).toBe('checkbox')
      wrapper.unmount()
    })

    it('should set a default aria-labelledby', () => {
      const labelId = 'custom-id'
      const wrapper = mount(() => <ZCheckbox aria-labelledby={labelId} />)
      expect(wrapper.find('.z-checkbox').attributes('aria-labelledby')).toMatch(
        labelId
      )
      wrapper.unmount()
    })
  })
})

describe('z-checkbox-group', () => {
  it('should work with import on demand', () => {
    mount(ZCheckboxGroup)
  })

  it('should have a role of "group"', () => {
    const wrapper = mount(ZCheckboxGroup)
    expect(wrapper.find('.z-checkbox-group').attributes('role')).toBe('group')
    wrapper.unmount()
  })

  it('should work with `disabled` prop', () => {
    const wrapper = mount(ZCheckboxGroup, {
      props: {
        disabled: true
      },
      slots: {
        default: () => h(ZCheckbox, null, { default: () => 'test' })
      }
    })
    expect(wrapper.find('.z-checkbox--disabled').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `on-update:model-value` prop', async () => {
    const onClick = jest.fn()
    const wrapper = mount(ZCheckboxGroup, {
      props: {
        'on-update:model-value': onClick
      },
      slots: {
        default: () => h(ZCheckbox, { value: 'test' })
      }
    })
    await wrapper.findComponent(ZCheckbox).trigger('click')
    expect(onClick).toBeCalled()
    wrapper.unmount()
  })

  it('should work with default slots', async () => {
    const wrapper = mount(ZCheckboxGroup, {
      props: {
        disabled: true
      },
      slots: {
        default: () => h(ZCheckbox, null, { default: () => 'test' })
      }
    })
    expect(wrapper.find('.z-checkbox__label').text()).toContain('test')
    wrapper.unmount()
  })

  // The minimum number of checkboxes that can be checked.
  it('should work with `min-items` prop', async () => {
    const wrapper = mount(ZCheckboxGroup, {
      props: {
        minItems: 1,
        modelValue: ['Shanghai']
      },
      slots: {
        default: () => [
          h(ZCheckbox, { value: 'Shanghai' }, { default: () => 'Shanghai' }),
          h(ZCheckbox, { value: 'Beijing' }, { default: () => 'Beijing' }),
          h(ZCheckbox, { value: 'Shenzhen' }, { default: () => 'Shenzhen' })
        ]
      }
    })
    expect(wrapper.findAll('.z-checkbox').length).toBe(3)

    expect(wrapper.findAll('.z-checkbox')[0].classes()).toContain(
      'z-checkbox--disabled'
    )
    expect(wrapper.findAll('.z-checkbox')[0].classes()).toContain(
      'z-checkbox--checked'
    )
    expect(wrapper.findAll('.z-checkbox')[1].classes()).not.toContain(
      'z-checkbox--checked'
    )
    expect(wrapper.findAll('.z-checkbox')[1].classes()).not.toContain(
      'z-checkbox--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `max-items` prop', async () => {
    const wrapper = mount(ZCheckboxGroup, {
      props: {
        maxItems: 2,
        modelValue: ['Shanghai', 'Beijing']
      },
      slots: {
        default: () => [
          h(ZCheckbox, { value: 'Shanghai' }, { default: () => 'Shanghai' }),
          h(ZCheckbox, { value: 'Beijing' }, { default: () => 'Beijing' }),
          h(ZCheckbox, { value: 'Shenzhen' }, { default: () => 'Shenzhen' })
        ]
      }
    })
    expect(wrapper.findAll('.z-checkbox').length).toBe(3)

    expect(wrapper.findAll('.z-checkbox')[0].classes()).not.toContain(
      'z-checkbox--disabled'
    )
    expect(wrapper.findAll('.z-checkbox')[0].classes()).toContain(
      'z-checkbox--checked'
    )
    expect(wrapper.findAll('.z-checkbox')[1].classes()).toContain(
      'z-checkbox--checked'
    )
    expect(wrapper.findAll('.z-checkbox')[1].classes()).not.toContain(
      'z-checkbox--disabled'
    )
    expect(wrapper.findAll('.z-checkbox')[2].classes()).not.toContain(
      'z-checkbox--checked'
    )
    expect(wrapper.findAll('.z-checkbox')[2].classes()).toContain(
      'z-checkbox--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `max-items` and `min-items` prop', async () => {
    const wrapper = mount(ZCheckboxGroup, {
      props: {
        maxItems: 2,
        minItems: 1
      },
      slots: {
        default: () => [
          h(ZCheckbox, { value: 'Shanghai' }, { default: () => 'Shanghai' }),
          h(ZCheckbox, { value: 'Beijing' }, { default: () => 'Beijing' }),
          h(ZCheckbox, { value: 'Shenzhen' }, { default: () => 'Shenzhen' })
        ]
      }
    })

    await wrapper.setProps({
      modelValue: ['Shanghai']
    })
    expect(wrapper.findAll('.z-checkbox').length).toBe(3)

    expect(wrapper.findAll('.z-checkbox')[0].classes()).toContain(
      'z-checkbox--disabled'
    )
    expect(wrapper.findAll('.z-checkbox')[0].classes()).toContain(
      'z-checkbox--checked'
    )
    expect(wrapper.findAll('.z-checkbox')[1].classes()).not.toContain(
      'z-checkbox--checked'
    )
    expect(wrapper.findAll('.z-checkbox')[1].classes()).not.toContain(
      'z-checkbox--disabled'
    )
    expect(wrapper.findAll('.z-checkbox')[2].classes()).not.toContain(
      'z-checkbox--checked'
    )
    expect(wrapper.findAll('.z-checkbox')[2].classes()).not.toContain(
      'z-checkbox--disabled'
    )
    await wrapper.setProps({
      modelValue: ['Shanghai', 'Beijing']
    })

    expect(wrapper.findAll('.z-checkbox')[0].classes()).not.toContain(
      'z-checkbox--disabled'
    )
    expect(wrapper.findAll('.z-checkbox')[0].classes()).toContain(
      'z-checkbox--checked'
    )
    expect(wrapper.findAll('.z-checkbox')[1].classes()).toContain(
      'z-checkbox--checked'
    )
    expect(wrapper.findAll('.z-checkbox')[1].classes()).not.toContain(
      'z-checkbox--disabled'
    )
    expect(wrapper.findAll('.z-checkbox')[2].classes()).not.toContain(
      'z-checkbox--checked'
    )
    expect(wrapper.findAll('.z-checkbox')[2].classes()).toContain(
      'z-checkbox--disabled'
    )
    wrapper.unmount()
  })
})
