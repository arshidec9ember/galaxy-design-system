import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { isYesterday, format, addMonths, getYear } from 'date-fns/esm'
import { ZCalendar } from '../index'
import { ZButton } from '../../button'

describe('z-calendar', () => {
  const now = Date.now()

  it('should work with import on demand', () => {
    mount(ZCalendar)
  })

  it('props.onUpdate has correct type', () => {
    ;<ZCalendar
      onUpdateModelValue={(
        modelValue: number,
        time: {
          date: number
          month: number
          year: number
        }
      ) => {}}
    />
  })

  it('should follow `default-model-value` to display month', () => {
    // May 19 2022
    const wrapper = mount(ZCalendar, {
      props: { defaultModelValue: 1652956953562 }
    })
    expect(wrapper.find('.z-calendar-header__title').text()).toContain('May')
    wrapper.unmount()
  })

  it('should work with `default-model-value` prop', async () => {
    const wrapper = mount(ZCalendar, { props: { defaultModelValue: now } })
    expect(wrapper.find('.z-calendar-cell--selected').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(ZCalendar, { props: { modelValue: now } })
    expect(wrapper.find('.z-calendar-cell--selected').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `is-date-disabled` prop', async () => {
    function disableFunction (timestamp: number): boolean {
      return isYesterday(timestamp)
    }
    const wrapper = mount(ZCalendar, {
      props: { 'is-date-disabled': disableFunction }
    })
    expect(wrapper.find('.z-calendar-cell--disabled').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `on-update:model-value` prop', async () => {
    const onUpdate = jest.fn()
    const wrapper = mount(ZCalendar, {
      props: { 'on-update:model-value': onUpdate }
    })

    await wrapper.findAll('.z-calendar-date')[1].trigger('click')
    expect(onUpdate).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with clicked `prev` and `next`', async () => {
    const wrapper = mount(ZCalendar, { props: { defaultModelValue: now } })

    const nowDate = wrapper.find('.z-calendar-header__title').text()
    const buttons = wrapper.findAllComponents(ZButton)

    await buttons[0].trigger('click')
    const prevDate = addMonths(now, -1)
    expect(wrapper.find('.z-calendar-header__title').text()).toBe(
      `${format(prevDate, 'MMMM')} ${getYear(prevDate)}`
    )

    await buttons[1].trigger('click')
    expect(wrapper.find('.z-calendar-header__title').text()).toBe(nowDate)
    expect(
      wrapper
        .find('.z-calendar-cell--current')
        .find('.z-calendar-date__date')
        .attributes('title')
    ).toBe(format(now, 'yyyy-MM-dd'))

    await buttons[2].trigger('click')
    const nextDate = addMonths(now, 1)
    expect(wrapper.find('.z-calendar-header__title').text()).toBe(
      `${format(nextDate, 'MMMM')} ${getYear(nextDate)}`
    )
    wrapper.unmount()
  })
})
