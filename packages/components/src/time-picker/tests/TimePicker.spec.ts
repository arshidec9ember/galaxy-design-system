import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { ZTimePicker } from '../index'
import { ZInput } from '../../input'

describe('z-time-picker', () => {
  it('should work with import on demand', () => {
    mount(ZTimePicker)
  })

  __FAILED__TESTCASES__ &&
    it('should work with `actions` prop', async () => {
      const wrapper = mount(ZTimePicker, {
        attachTo: document.body
      })
      await wrapper.find('.z-input').trigger('click')
      expect(document.querySelectorAll('button').length).toBe(2)
      expect(document.querySelectorAll('button')[0].textContent).toBe('Today')
      expect(document.querySelectorAll('button')[1].textContent).toBe('OK')
      await wrapper.setProps({
        actions: ['now']
      })
      expect(document.querySelectorAll('button').length).toBe(1)
      expect(document.querySelectorAll('button')[0].textContent).toBe('Today')
      await wrapper.setProps({
        actions: ['confirm']
      })
      expect(document.querySelectorAll('button').length).toBe(1)
      expect(document.querySelectorAll('button')[0].textContent).toBe('OK')
      await wrapper.setProps({
        actions: []
      })
      expect(document.querySelectorAll('button').length).toBe(0)
      wrapper.unmount()
    })

  it('should work with `clearable` prop', async () => {
    const wrapper = mount(ZTimePicker)
    expect(wrapper.find('.z-base-clear').exists()).not.toBe(true)
    await wrapper.setProps({
      clearable: true
    })
    expect(wrapper.find('.z-base-clear').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(ZTimePicker)
    expect(wrapper.find('.z-input').attributes('class')).not.toContain(
      'z-input--disabled'
    )
    await wrapper.setProps({
      disabled: true
    })
    expect(wrapper.find('.z-input').attributes('class')).toContain(
      'z-input--disabled'
    )
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should work with `format` prop', async () => {
      const wrapper = mount(ZTimePicker, {
        props: { value: 1642183200000, format: 'h:mm' }
      })
      expect(wrapper.find('input').element.value.length).toBe(4)
      wrapper.unmount()
    })

  it('should work with `formatted-value` `value-format` prop', async () => {
    const wrapper = mount(ZTimePicker, {
      props: { formattedValue: '8~30~30', valueFormat: 'H~m~s' }
    })
    expect(wrapper.find('input').element.value).toBe('08:30:30')
    wrapper.unmount()
  })

  it('should work with `inputReadonly` prop', async () => {
    const wrapper = mount(ZTimePicker)
    expect(wrapper.find('input').attributes('readonly')).not.toBe('')
    await wrapper.setProps({
      inputReadonly: true
    })
    expect(wrapper.find('input').attributes('readonly')).toBe('')
    wrapper.unmount()
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(ZTimePicker)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Select Time')
    await wrapper.setProps({
      placeholder: 'test-placeholder'
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'test-placeholder'
    )
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((item) => {
      const wrapper = mount(ZTimePicker, { props: { size: item } })
      expect(wrapper.find('.z-input').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `on-blur` prop', async () => {
    const onBlur = jest.fn()
    const wrapper = mount(ZTimePicker, {
      props: { onBlur }
    })
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(onBlur).toHaveBeenCalled()
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should work with `on-blur` prop when use `ok` button', async () => {
      const onBlur = jest.fn()
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const Render = () => {
        return h('div', null, [
          h(ZTimePicker, {
            onBlur,
            actions: ['confirm']
          }),
          h(ZInput, {
            inputProps: {
              id: 'input'
            }
          })
        ])
      }
      const wrapper = mount(Render, {
        attachTo: document.body
      })
      await wrapper.find('input').trigger('click')
      const button: HTMLElement = document.querySelector(
        '.z-button'
      ) as HTMLElement
      button.click()

      const input = document.querySelector('#input') as HTMLElement
      input.focus()

      expect(onBlur).toHaveBeenCalled()
      wrapper.unmount()
    })

  it('should work with `on-focus` prop', async () => {
    const onFocus = jest.fn()
    const wrapper = mount(ZTimePicker, {
      props: { onFocus }
    })
    await wrapper.find('input').trigger('focus')
    expect(onFocus).toHaveBeenCalled()
    wrapper.unmount()
  })
})
