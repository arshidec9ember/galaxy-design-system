import { h } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { ZRadioGroup, ZRadioButton } from '../index'
import { ZForm, ZFormItem } from '../../form'

function expectChecked (wrapper: VueWrapper<any>, value: boolean): void {
  expect(wrapper.classes().some((c) => c.includes('checked'))).toEqual(value)
  expect(wrapper.find('.z-radio-button').attributes('aria-checked')).toBe(
    value.toString()
  )
}

describe('z-radio-button', () => {
  it('should work with import on demand', () => {
    mount(ZRadioButton)
  })

  describe('uncontrolled mode', () => {
    it('works', async () => {
      const wrapper = mount(ZRadioButton)
      expectChecked(wrapper, false)
      await wrapper.find('input').trigger('change')
      expectChecked(wrapper, true)
      wrapper.unmount()
    })

    it('props.defaultModelValue', () => {
      const wrapper = mount(ZRadioButton, {
        props: {
          defaultModelValue: true
        }
      })
      expectChecked(wrapper, true)
      wrapper.unmount()
    })
  })

  it('should work with `disabled` prop', () => {
    const wrapper = mount(ZRadioButton, {
      props: {
        disabled: true
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.z-radio-button').classes()).toContain(
      'z-radio-button--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `label` prop', async () => {
    const wrapper = mount(ZRadioButton, {
      props: {
        label: 'test'
      }
    })
    expect(wrapper.find('.z-radio-button__label').text()).toContain('test')
    wrapper.unmount()
  })

  it('should work with `on-update:modelValue` & `onUpdateModelValue` prop', async () => {
    const onChange = jest.fn()
    const wrapper = mount(ZRadioButton, {
      props: {
        'onUpdate:modelValue': onChange,
        onUpdateModelValue: onChange
      },
      slots: {
        default: () => 'test'
      }
    })
    const inputElement = wrapper.find('input')
    await inputElement.trigger('change')

    expect(onChange).toHaveBeenCalledTimes(2)
    wrapper.unmount()
  })

  it('should work with default slots', async () => {
    const wrapper = mount(ZRadioButton, {
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.z-radio-button__label').text()).toContain('test')
    wrapper.unmount()
  })

  it('should work with `size` prop', () => {
    (['small', 'medium', 'large'] as const).forEach((i) => {
      const wrapper = mount(ZRadioGroup, { props: { size: i } })
      expect(
        wrapper.find('.z-radio-group').attributes('style')
      ).toMatchSnapshot()
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
                  default: () => <ZRadioButton />
                }}
              </ZFormItem>
            )
          }
        }}
      </ZForm>
    ))

    expect(wrapper.find('.z-radio-button').exists()).toBe(true)

    // Verify other classes based on props or state
    expect(wrapper.find('.z-radio-button--disabled').exists()).toBe(false)
    expect(wrapper.find('.z-radio-button--checked').exists()).toBe(false)

    wrapper.unmount()
  })

  it('should render with bordered style when `bordered` prop is true', () => {
    const wrapper = mount(ZRadioGroup, {
      slots: {
        default: ZRadioButton
      },
      props: {
        bordered: true
      }
    })
    const radioButtonWrapper = wrapper.findComponent(ZRadioButton)

    expect(radioButtonWrapper.find('.z-radio-button').exists()).toBe(true)

    expect(radioButtonWrapper.classes('z-radio-button--borderless')).toBe(
      false
    )

    wrapper.unmount()
  })

  it('should render with borderless style when `bordered` prop is false', () => {
    const wrapper = mount(ZRadioGroup, {
      slots: {
        default: ZRadioButton
      },
      props: {
        bordered: false
      }
    })
    const radioButtonWrapper = wrapper.findComponent(ZRadioButton)

    expect(radioButtonWrapper.find('.z-radio-button').exists()).toBe(true)

    expect(radioButtonWrapper.classes('z-radio-button--borderless')).toBe(
      true
    )

    wrapper.unmount()
  })

  describe('accessibility', () => {
    it('should have a role of "radio"', () => {
      const wrapper = mount(ZRadioButton)
      expect(wrapper.find('.z-radio-button').attributes('role')).toBe(
        'radio'
      )
      wrapper.unmount()
    })

    it('should set a default aria-labelledby', () => {
      const labelId = 'custom-id'
      const wrapper = mount(() => <ZRadioButton aria-labelledby={labelId} />)
      expect(
        wrapper.find('.z-radio-button').attributes('aria-labelledby')
      ).toMatch(labelId)
      wrapper.unmount()
    })
  })
})

describe('z-radio-group', () => {
  it('should work with import on demand', () => {
    mount(ZRadioGroup)
  })

  it('should work with `disabled` prop', () => {
    const wrapper = mount(ZRadioGroup, {
      props: {
        disabled: true
      },
      slots: {
        default: () => h(ZRadioButton, null, { default: () => 'test' })
      }
    })
    expect(wrapper.find('.z-radio-button--disabled').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `onUpdate:modelValue` prop', async () => {
    const onChange = jest.fn()
    const wrapper = mount(ZRadioGroup, {
      props: {
        'onUpdate:modelValue': onChange
      },
      slots: {
        default: () => h(ZRadioButton, { value: 'test' })
      }
    })
    await wrapper.findComponent(ZRadioButton).find('input').trigger('change')
    expect(onChange).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with default slots', async () => {
    const wrapper = mount(ZRadioGroup, {
      props: {
        disabled: true
      },
      slots: {
        default: () => h(ZRadioButton, null, { default: () => 'test' })
      }
    })
    expect(wrapper.find('.z-radio-button__label').text()).toContain('test')
    wrapper.unmount()
  })
})
