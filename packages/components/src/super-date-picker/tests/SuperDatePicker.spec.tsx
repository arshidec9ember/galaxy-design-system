import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { format } from 'date-fns'
import { ZSuperDatePicker } from '../index'

describe('z-super-date-picker', () => {
  // Mock Date.now to ensure consistent test results
  const mockDate = new Date('2023-01-15T10:30:00.000Z')
  const originalDateNow = Date.now

  beforeAll(() => {
    Date.now = jest.fn(() => mockDate.getTime())
  })

  afterAll(() => {
    Date.now = originalDateNow
  })

  it('should work with import on demand', () => {
    mount(ZSuperDatePicker)
  })

  it('should render with default props', () => {
    const wrapper = mount(ZSuperDatePicker)
    expect(wrapper.find('.z-super-date-picker').exists()).toBe(true)
    expect(wrapper.find('.z-input').exists()).toBe(true)
  })

  it('should work with `value` prop', async () => {
    const testDate = new Date('2023-06-15').getTime()
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        value: testDate
      }
    })

    await nextTick()
    expect(wrapper.vm.localValue).toBe(testDate)
    expect(wrapper.vm.displayValue).toBe(
      format(new Date(testDate), 'dd-MMM-yyyy')
    )
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        size: 'large'
      }
    })

    await nextTick()
    expect(wrapper.vm.size).toBe('large')
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        type: 'datetime'
      }
    })

    await nextTick()
    expect(wrapper.vm.type).toBe('datetime')
  })

  it('should work with `format` and `displayFormat` props', async () => {
    const testDate = new Date('2023-06-15').getTime()
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        value: testDate,
        format: 'yyyy-MM-dd',
        displayFormat: 'MM/dd/yyyy'
      }
    })

    await nextTick()
    expect(wrapper.vm.displayValue).toBe(
      format(new Date(testDate), 'MM/dd/yyyy')
    )
  })

  it('should open popover when trigger is clicked', async () => {
    const wrapper = mount(ZSuperDatePicker)

    expect(wrapper.vm.show).toBe(false)

    await wrapper.find('.z-input').trigger('click')
    expect(wrapper.vm.show).toBe(true)
  })

  it('should not open when disabled', async () => {
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.vm.show).toBe(false)

    await wrapper.find('.z-input').trigger('click')
    expect(wrapper.vm.show).toBe(false)
  })

  it('should emit `update:value` and `change` events', async () => {
    const onUpdateValue = jest.fn()
    const onChange = jest.fn()
    const testDate = new Date('2023-06-15').getTime()

    const wrapper = mount(ZSuperDatePicker, {
      props: {
        'onUpdate:value': onUpdateValue,
        onChange
      }
    })

    wrapper.vm.handleDatePickerChange(testDate)

    await nextTick()
    expect(onUpdateValue).toHaveBeenCalledWith(testDate)
    expect(onChange).toHaveBeenCalledWith(testDate)
    expect(wrapper.emitted('update:value')).toEqual([[testDate]])
    expect(wrapper.emitted('change')).toEqual([[testDate]])
  })

  it('should handle clear functionality', async () => {
    const onUpdateValue = jest.fn()
    const onChange = jest.fn()
    const testDate = new Date('2023-06-15').getTime()

    const wrapper = mount(ZSuperDatePicker, {
      props: {
        value: testDate,
        'onUpdate:value': onUpdateValue,
        onChange
      }
    })

    wrapper.vm.handleClear()

    await nextTick()
    expect(onUpdateValue).toHaveBeenCalledWith(null)
    expect(onChange).toHaveBeenCalledWith(null)
    expect(wrapper.emitted('update:value')).toEqual([[null]])
    expect(wrapper.emitted('change')).toEqual([[null]])
  })

  it('should handle now button click', async () => {
    const onUpdateValue = jest.fn()
    const onChange = jest.fn()

    const wrapper = mount(ZSuperDatePicker, {
      props: {
        showNow: true,
        'onUpdate:value': onUpdateValue,
        onChange
      }
    })

    wrapper.vm.handleNowClick()

    await nextTick()
    expect(onUpdateValue).toHaveBeenCalledWith(mockDate.getTime())
    expect(onChange).toHaveBeenCalledWith(mockDate.getTime())
    expect(wrapper.vm.show).toBe(false) // Should close popover
  })

  it('should handle relative date calculations with rounding', async () => {
    const onUpdateValue = jest.fn()

    const wrapper = mount(ZSuperDatePicker, {
      props: {
        showRelative: true,
        defaultTab: 'relative',
        'onUpdate:value': onUpdateValue
      }
    })

    await nextTick()

    // Should have calculated a relative date on mount
    expect(wrapper.vm.localValue).toBeDefined()
  })

  it('should handle interval number changes', async () => {
    const onUpdateValue = jest.fn()

    const wrapper = mount(ZSuperDatePicker, {
      props: {
        showRelative: true,
        defaultTab: 'relative',
        'onUpdate:value': onUpdateValue
      }
    })

    await nextTick()

    // Changing interval should trigger recalculation
    wrapper.vm.handleIntervalNumberChange(10)

    await nextTick()
    expect(wrapper.vm.intervalNumber).toBe(10)
    // Should have triggered value updates
    expect(onUpdateValue).toHaveBeenCalled()
  })

  it('should update absolute date/time correctly', async () => {
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        showAbsolute: true
      }
    })

    const testDate = new Date('2023-06-15T14:30:00').getTime()

    wrapper.vm.handleAbsoluteDateChange(testDate)

    await nextTick()
    expect(wrapper.vm.absoluteDate).toEqual(new Date(testDate))
  })

  it('should handle apply and cancel actions', async () => {
    const wrapper = mount(ZSuperDatePicker)

    // Open popover
    wrapper.vm.show = true

    // Test apply
    wrapper.vm.handleApply()
    expect(wrapper.vm.show).toBe(false)

    // Open again and test cancel
    wrapper.vm.show = true
    wrapper.vm.handleCancel()
    expect(wrapper.vm.show).toBe(false)
  })

  it('should handle click outside to close popover', async () => {
    const wrapper = mount(ZSuperDatePicker)

    wrapper.vm.show = true

    wrapper.vm.handleClickOutside()
    expect(wrapper.vm.show).toBe(false)
  })

  it('should update display value based on current value', async () => {
    const testDate = new Date('2023-06-15').getTime()
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        value: testDate,
        displayFormat: 'dd/MM/yyyy'
      }
    })

    await nextTick()
    expect(wrapper.vm.displayValue).toBe(
      format(new Date(testDate), 'dd/MM/yyyy')
    )

    // Test with null value
    await wrapper.setProps({ value: null })
    expect(wrapper.vm.displayValue).toBe('')
  })

  it('should work with different default tabs', async () => {
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        defaultTab: 'relative'
      }
    })

    expect(wrapper.vm.activeTab).toBe('relative')
  })

  it('should handle external value changes', async () => {
    const testDate1 = new Date('2023-06-15').getTime()
    const testDate2 = new Date('2023-07-15').getTime()

    const wrapper = mount(ZSuperDatePicker, {
      props: {
        value: testDate1
      }
    })

    await nextTick()
    expect(wrapper.vm.localValue).toBe(testDate1)

    // Update external value
    await wrapper.setProps({ value: testDate2 })
    expect(wrapper.vm.localValue).toBe(testDate2)
  })
  it('should handle disabled picker values correctly', async () => {
    const testDate = new Date('2023-06-15').getTime()
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        value: testDate
      }
    })

    await nextTick()
    expect(wrapper.vm.disabledPickerValue).toBe(testDate)
    expect(wrapper.vm.relativeDisabledPickerValue).toBe(testDate)
  })

  it('should format disabled values correctly', () => {
    const wrapper = mount(ZSuperDatePicker)
    const testDate = new Date('2023-06-15')

    const formatted = wrapper.vm.formatDisabledValue(testDate.getTime())
    expect(formatted).toBe(format(testDate, 'dd-MMM-yyyy'))

    // Test with null
    const formattedNull = wrapper.vm.formatDisabledValue(null)
    expect(formattedNull).toBeDefined()
  })

  it('should work with time picker props', async () => {
    const timeProps = { format: 'HH:mm:ss' }
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        type: 'datetime',
        timePickerProps: timeProps
      }
    })

    expect(wrapper.vm.timePickerProps).toEqual(timeProps)
  })

  it('should work with first day of week prop', async () => {
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        firstDayOfWeek: 1 // Monday
      }
    })

    expect(wrapper.vm.firstDayOfWeek).toBe(1)
  })

  it('should handle bordered prop', async () => {
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        bordered: false
      }
    })

    expect(wrapper.vm.bordered).toBe(false)
  })

  it('should render Apply/Cancel buttons only in relative tab and input mode', async () => {
    const wrapper = mount(ZSuperDatePicker, {
      props: {
        panel: false, // input mode
        showAbsolute: true,
        showRelative: true,
        showNow: true
      }
    })

    // Open the popover
    await wrapper.find('.z-input').trigger('click')
    await nextTick()

    // Initially on "now" tab - no buttons should be visible
    expect(wrapper.find('.z-super-date-picker__apply-button').exists()).toBe(
      false
    )
    expect(wrapper.find('.z-super-date-picker__cancel-button').exists()).toBe(
      false
    )

    // Switch to relative tab - buttons should appear
    const relativeTabs = wrapper.findAll('.z-tab')
    const relativeTab = relativeTabs.find((tab) =>
      tab.text().includes('Relative')
    )
    if (relativeTab) {
      await relativeTab.trigger('click')
      await nextTick()

      expect(wrapper.find('.z-super-date-picker__apply-button').exists()).toBe(
        true
      )
      expect(wrapper.find('.z-super-date-picker__cancel-button').exists()).toBe(
        true
      )
    }

    // Switch to absolute tab - buttons should disappear
    const absoluteTab = relativeTabs.find((tab) =>
      tab.text().includes('Absolute')
    )
    if (absoluteTab) {
      await absoluteTab.trigger('click')
      await nextTick()

      expect(wrapper.find('.z-super-date-picker__apply-button').exists()).toBe(
        false
      )
      expect(wrapper.find('.z-super-date-picker__cancel-button').exists()).toBe(
        false
      )
    }
  })

  it('should work with panel prop and emit events', async () => {
    const onUpdateValue = jest.fn()
    const onChange = jest.fn()
    const testDate = new Date('2023-06-15').getTime()

    const wrapper = mount(ZSuperDatePicker, {
      props: {
        panel: true,
        'onUpdate:value': onUpdateValue,
        onChange
      }
    })

    wrapper.vm.handleDatePickerChange(testDate)

    await nextTick()
    expect(onUpdateValue).toHaveBeenCalledWith(testDate)
    expect(onChange).toHaveBeenCalledWith(testDate)
  })
})
