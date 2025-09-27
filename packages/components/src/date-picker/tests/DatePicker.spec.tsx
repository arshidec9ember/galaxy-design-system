import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { format } from 'date-fns/esm'
import { ZDatePicker } from '../index'
import type { Value } from '../src/interface'
import { dateEnUS } from '../../locales'

describe('z-date-picker', () => {
  it('should work with import on demand', () => {
    mount(ZDatePicker).unmount()
  })

  __FAILED__TESTCASES__ &&
    it('date type should work with shortcuts prop', async () => {
      const test = ref<[number, number]>([0, 0])
      const wrapper = mount(ZDatePicker, {
        props: {
          value: test.value,
          type: 'date',
          onUpdateModelValue: (value: [number, number]) => {
            test.value = value
          },
          shortcuts: {
            'Honey birthday': 1631203200000
          }
        }
      })
      await wrapper.find('.z-input').trigger('click')
      const button: HTMLElement = document
        .querySelector('.z-date-panel-actions')
        ?.querySelector('.z-button') as HTMLElement
      button.click()
      expect(test.value).toEqual(1631203200000)
      test.value = [0, 0]
      await wrapper.setProps({
        type: 'datetime'
      })
      await wrapper.find('.z-input').trigger('click')
      const timeButton: HTMLElement = document
        .querySelector('.z-date-panel-actions')
        ?.querySelector('.z-button') as HTMLElement
      timeButton.click()
      expect(test.value).toEqual(1631203200000)
      wrapper.unmount()
    })

  __FAILED__TESTCASES__ &&
    it('range type should work with shortcuts prop', async () => {
      const test = ref<Value>(0)
      const wrapper = mount(ZDatePicker, {
        props: {
          value: test.value,
          type: 'daterange',
          onUpdateModelValue: (value: Value) => {
            test.value = value
          },
          shortcuts: {
            'Honey birthday': [1629216000000, 1631203200000]
          }
        }
      })
      await wrapper.find('.z-input').trigger('click')
      const button: HTMLElement = document
        .querySelector('.z-date-panel-actions')
        ?.querySelector('.z-button') as HTMLElement
      button.click()
      expect(test.value).toEqual([1629216000000, 1631203200000])
      test.value = 0
      await wrapper.setProps({
        type: 'datetimerange'
      })
      await wrapper.find('.z-input').trigger('click')
      const rangeButton: HTMLElement = document
        .querySelector('.z-date-panel-actions')
        ?.querySelector('.z-button') as HTMLElement
      rangeButton.click()
      expect(test.value).toEqual([1629216000000, 1631203200000])
      wrapper.unmount()
    })

  __FAILED__TESTCASES__ &&
    it('date type should work with shortcuts prop with function value', async () => {
      const test = ref<Value>(0)
      const wrapper = mount(ZDatePicker, {
        props: {
          value: test.value,
          type: 'date',
          onUpdateModelValue: (value: Value) => {
            test.value = value
          },
          shortcuts: {
            'Honey birthday': () => 1631203200000
          }
        }
      })
      await wrapper.find('.z-input').trigger('click')
      const button: HTMLElement = document
        .querySelector('.z-date-panel-actions')
        ?.querySelector('.z-button') as HTMLElement
      button.click()
      expect(test.value).toEqual(1631203200000)
      test.value = 0
      await wrapper.setProps({
        type: 'datetime'
      })
      await wrapper.find('.z-input').trigger('click')
      const timeButton: HTMLElement = document
        .querySelector('.z-date-panel-actions')
        ?.querySelector('.z-button') as HTMLElement
      timeButton.click()
      expect(test.value).toEqual(1631203200000)
      wrapper.unmount()
    })

  __FAILED__TESTCASES__ &&
    it('range type should work with shortcuts prop with function value', async () => {
      const test = ref<[number, number]>([0, 0])

      const wrapper = mount(ZDatePicker, {
        props: {
          value: test.value,
          type: 'daterange',
          onUpdateModelValue: (value: [number, number]) => {
            test.value = value
          },
          shortcuts: {
            'Honey birthday': () =>
              [1629216000000, 1631203200000] as [number, number]
          }
        }
      })
      await wrapper.find('.z-input').trigger('click')
      const button: HTMLElement = document
        .querySelector('.z-date-panel-actions')
        ?.querySelector('.z-button') as HTMLElement
      button.click()
      expect(test.value).toEqual([1629216000000, 1631203200000])
      test.value = [0, 0]
      await wrapper.setProps({
        type: 'datetimerange'
      })
      await wrapper.find('.z-input').trigger('click')
      const rangeButton: HTMLElement = document
        .querySelector('.z-date-panel-actions')
        ?.querySelector('.z-button') as HTMLElement
      rangeButton.click()
      expect(test.value).toEqual([1629216000000, 1631203200000])
      wrapper.unmount()
    })

  it('should work with `inputReadonly` prop', async () => {
    const wrapper = mount(ZDatePicker)
    expect(wrapper.find('input').attributes('readonly')).not.toBe('')
    await wrapper.setProps({
      inputReadonly: true
    })
    expect(wrapper.find('input').attributes('readonly')).toBe('')
    wrapper.unmount()
  })

  it('should work with `clearable` prop', async () => {
    const wrapper = mount(ZDatePicker)
    expect(wrapper.find('.z-base-clear').exists()).not.toBe(true)
    await wrapper.setProps({
      clearable: true
    })
    expect(wrapper.find('.z-base-clear').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(ZDatePicker)
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

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((item) => {
      const wrapper = mount(ZDatePicker, { props: { size: item } })
      expect(wrapper.find('.z-input').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(ZDatePicker)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Select Date')
    await wrapper.setProps({
      placeholder: 'test-placeholder'
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'test-placeholder'
    )
    wrapper.unmount()
  })

  it('should work with `defaultModelValue` prop', async () => {
    const wrapper = mount(ZDatePicker, {
      props: {
        defaultModelValue: 1183135260000
      }
    })

    const inputEl = wrapper.find('.z-input__input').find('input')
    expect(inputEl.element.value).toEqual(
      format(1183135260000, 'dd-MMM-yyyy', {
        locale: dateEnUS.locale
      })
    )
    wrapper.unmount()
  })

  it('should work with `firstDayOfWeek` prop', async () => {
    const wrapper = mount(ZDatePicker, {
      attachTo: document.body,
      props: {
        firstDayOfWeek: 1
      }
    })

    await wrapper.find('.z-input__input').trigger('click')
    expect(
      document.querySelectorAll('.z-date-panel-weekdays__day')[0].textContent
    ).toBe('Tu')

    wrapper.unmount()
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(ZDatePicker, {
      attachTo: document.body,
      props: { type: 'date' }
    })

    await wrapper.find('.z-input__input').trigger('click')
    expect(document.querySelector('.z-date-panel--date')).not.toEqual(null)

    await wrapper.setProps({ type: 'datetime' })
    await wrapper.find('.z-input__input').trigger('click')
    expect(document.querySelector('.z-date-panel--datetime')).not.toEqual(null)

    await wrapper.setProps({ type: 'daterange' })
    await wrapper.find('.z-input__input').trigger('click')
    expect(document.querySelector('.z-date-panel--daterange')).not.toEqual(null)

    await wrapper.setProps({ type: 'datetimerange' })
    await wrapper.find('.z-input__input').trigger('click')
    expect(document.querySelector('.z-date-panel--datetimerange')).not.toEqual(
      null
    )

    await wrapper.setProps({ type: 'month' })
    await wrapper.find('.z-input__input').trigger('click')
    expect(document.querySelector('.z-date-panel--month')).not.toEqual(null)

    wrapper.unmount()
  })

  it('should work with `onBlur` prop', async () => {
    const onBlur = jest.fn()
    const wrapper = mount(ZDatePicker, {
      props: { onBlur }
    })

    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(onBlur).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('should work with `onFocus` prop', async () => {
    const onFocus = jest.fn()
    const wrapper = mount(ZDatePicker, {
      props: { onFocus }
    })

    await wrapper.find('input').trigger('focus')
    expect(onFocus).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('should work with `separator` prop', async () => {
    const wrapper = mount(ZDatePicker, {
      props: { separator: '07akioni', type: 'daterange' }
    })
    expect(wrapper.text().includes('07akioni')).toBe(true)
    await wrapper.setProps({ separator: '08akioni', type: 'datetimerange' })
    expect(wrapper.text().includes('08akioni')).toBe(true)
    wrapper.unmount()
  })

  it('should work with `status` prop', async () => {
    ;(['success', 'warning', 'error'] as const).forEach((status) => {
      const wrapper = mount(ZDatePicker, {
        props: { status }
      })
      expect(wrapper.find('.z-input').classes()).toContain(
        `z-input--${status}-status`
      )
      wrapper.unmount()
    })
  })
})
