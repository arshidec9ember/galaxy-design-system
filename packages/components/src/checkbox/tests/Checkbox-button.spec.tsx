import { h } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { ZCheckboxGroup, ZCheckboxButton } from '../index'
import { ZForm, ZFormItem } from '../../form'

function expectChecked (wrapper: VueWrapper<any>, value: boolean): void {
  expect(wrapper.classes().some((c) => c.includes('checked'))).toEqual(value)
  expect(wrapper.find('.z-checkbox-button').attributes('aria-checked')).toBe(
    value.toString()
  )
}

describe('z-checkbox-button', () => {
  it('should work with import on demand', () => {
    mount(ZCheckboxButton)
  })

  describe('uncontrolled mode', () => {
    it('works', async () => {
      const wrapper = mount(ZCheckboxButton)
      expectChecked(wrapper, false)
      await wrapper.find('input').trigger('click')
      expectChecked(wrapper, true)
      await wrapper.find('input').trigger('click')
      expectChecked(wrapper, false)
      wrapper.unmount()
    })

    it('props.defaultModelValue', () => {
      const wrapper = mount(ZCheckboxButton, {
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
    const wrapper = mount(ZCheckboxButton, {
      props: {
        checkedValue: 'fooo',
        uncheckedValue: 'barr',
        onUpdateModelValue
      }
    })
    await wrapper.find('input').trigger('click')
    expect(onUpdateModelValue.mock.calls[0][0]).toEqual('fooo')
    await wrapper.find('input').trigger('click')
    expect(onUpdateModelValue.mock.calls[1][0]).toEqual('barr')
    await wrapper.find('input').trigger('click')
    expect(onUpdateModelValue.mock.calls[2][0]).toEqual('fooo')
    wrapper.unmount()
  })

  it('should work with `disabled` prop', () => {
    const wrapper = mount(ZCheckboxButton, {
      props: {
        disabled: true
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.z-checkbox-button').classes()).toContain(
      'z-checkbox-button--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `focusable` prop', async () => {
    const wrapper = mount(ZCheckboxButton, {
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
    expect(wrapper.find('.z-checkbox-button').attributes('tabindex')).toContain(
      '0'
    )
    wrapper.unmount()
  })

  it('should work with `label` prop', async () => {
    const wrapper = mount(ZCheckboxButton, {
      props: {
        label: 'test'
      }
    })
    expect(wrapper.find('.z-checkbox-button__label').text()).toContain('test')
    wrapper.unmount()
  })

  it('should work with `on-update:modelValue` & `onUpdateModelValue` prop', async () => {
    const onClick = jest.fn()
    const wrapper = mount(ZCheckboxButton, {
      props: {
        'onUpdate:modelValue': onClick,
        onUpdateModelValue: onClick
      },
      slots: {
        default: () => 'test'
      }
    })
    const inputElement = wrapper.find('input')
    await inputElement.trigger('click')

    // await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(2)
    wrapper.unmount()
  })

  it('should work with default slots', async () => {
    const wrapper = mount(ZCheckboxButton, {
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.z-checkbox-button__label').text()).toContain('test')
    wrapper.unmount()
  })

  it('should work with `size` prop', () => {
    (['small', 'medium', 'large'] as const).forEach((i) => {
      const wrapper = mount(ZCheckboxGroup, { props: { size: i } })
      expect(
        wrapper.find('.z-checkbox-group').attributes('style')
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
                  default: () => <ZCheckboxButton />
                }}
              </ZFormItem>
            )
          }
        }}
      </ZForm>
    ))

    expect(wrapper.find('.z-checkbox-button').exists()).toBe(true)

    // Verify other classes based on props or state
    expect(wrapper.find('.z-checkbox-button--disabled').exists()).toBe(false)
    expect(wrapper.find('.z-checkbox-button--checked').exists()).toBe(false)

    wrapper.unmount()
  })

  it('should render with bordered style when `bordered` prop is true', () => {
    const wrapper = mount(ZCheckboxGroup, {
      slots: {
        default: ZCheckboxButton
      },
      props: {
        bordered: true
      }
    })
    const checkboxButtonWrapper = wrapper.findComponent(ZCheckboxButton)

    expect(checkboxButtonWrapper.find('.z-checkbox-button').exists()).toBe(true)

    expect(checkboxButtonWrapper.classes('z-checkbox-button--borderless')).toBe(
      false
    )

    wrapper.unmount()
  })

  it('should render with borderless style when `bordered` prop is false', () => {
    const wrapper = mount(ZCheckboxGroup, {
      slots: {
        default: ZCheckboxButton
      },
      props: {
        bordered: false
      }
    })
    const checkboxButtonWrapper = wrapper.findComponent(ZCheckboxButton)

    expect(checkboxButtonWrapper.find('.z-checkbox-button').exists()).toBe(true)

    expect(checkboxButtonWrapper.classes('z-checkbox-button--borderless')).toBe(
      true
    )

    wrapper.unmount()
  })

  describe('accessibility', () => {
    it('should have a role of "checkbox"', () => {
      const wrapper = mount(ZCheckboxButton)
      expect(wrapper.find('.z-checkbox-button').attributes('role')).toBe(
        'checkbox'
      )
      wrapper.unmount()
    })

    it('should set a default aria-labelledby', () => {
      const labelId = 'custom-id'
      const wrapper = mount(() => <ZCheckboxButton aria-labelledby={labelId} />)
      expect(
        wrapper.find('.z-checkbox-button').attributes('aria-labelledby')
      ).toMatch(labelId)
      wrapper.unmount()
    })
  })
})

describe('z-checkbox-group', () => {
  it('should work with import on demand', () => {
    mount(ZCheckboxGroup)
  })

  it('should work with `disabled` prop', () => {
    const wrapper = mount(ZCheckboxGroup, {
      props: {
        disabled: true
      },
      slots: {
        default: () => h(ZCheckboxButton, null, { default: () => 'test' })
      }
    })
    expect(wrapper.find('.z-checkbox-button--disabled').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `onUpdate:modelValue` prop', async () => {
    const onClick = jest.fn()
    const wrapper = mount(ZCheckboxGroup, {
      props: {
        'onUpdate:modelValue': onClick
      },
      slots: {
        default: () => h(ZCheckboxButton, { value: 'test' })
      }
    })
    await wrapper.findComponent(ZCheckboxButton).find('input').trigger('click')
    expect(onClick).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with default slots', async () => {
    const wrapper = mount(ZCheckboxGroup, {
      props: {
        disabled: true
      },
      slots: {
        default: () => h(ZCheckboxButton, null, { default: () => 'test' })
      }
    })
    expect(wrapper.find('.z-checkbox-button__label').text()).toContain('test')
    wrapper.unmount()
  })
})
