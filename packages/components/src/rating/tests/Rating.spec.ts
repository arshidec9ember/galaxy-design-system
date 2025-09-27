import { mount } from '@vue/test-utils'
import { ZRating } from '../index'

describe('z-rating', () => {
  it('should work with import on demand', () => {
    mount(ZRating)
  })

  it('should work with `count` prop', async () => {
    const wrapper = mount(ZRating)

    await wrapper.setProps({ count: 10 })
    expect(wrapper.findAll('.z-rating__item').length).toBe(10)

    wrapper.unmount()
  })

  it('should work with `model-value` prop', async () => {
    const wrapper = mount(ZRating)

    await wrapper.setProps({ modelValue: 3, count: 10 })
    expect(wrapper.findAll('.z-rating__item--active').length).toBe(3)
    await wrapper.setProps({ modelValue: 10 })
    expect(wrapper.findAll('.z-rating__item--active').length).toBe(10)

    wrapper.unmount()
  })

  it('should work with `default-model-value` prop', async () => {
    const wrapper = mount(ZRating, {
      props: { defaultModelValue: 8, count: 10 }
    })

    expect(wrapper.findAll('.z-rating__item--active').length).toBe(8)

    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(ZRating)

    await wrapper.setProps({ size: 20 })
    expect(wrapper.find('.z-rating').attributes('style')).toContain(
      '--z-item-size: 20px'
    )

    for (const size of ['small', 'medium', 'large'] as const) {
      await wrapper.setProps({ size })
      expect(wrapper.find('.z-rating').attributes('style')).toMatchSnapshot()
    }

    wrapper.unmount()
  })

  it('should work with `color` prop', async () => {
    const wrapper = mount(ZRating)

    await wrapper.setProps({ color: '#4fb233' })
    expect(wrapper.find('.z-rating').attributes('style')).toContain(
      '--z-item-color-active: #4fb233'
    )

    wrapper.unmount()
  })

  it('should work with `readonly` prop', async () => {
    const wrapper = mount(ZRating)

    await wrapper.setProps({ readonly: true })

    expect(wrapper.find('.z-rating').classes()).toContain('z-rating--readonly')

    await wrapper.setProps({ readonly: true, modelValue: 3 })
    expect(wrapper.findAll('.z-rating__item--active').length).toBe(3)

    await wrapper.findAll('.z-rating__item')[3].trigger('click')
    expect(wrapper.findAll('.z-rating__item--active').length).toBe(3)

    await wrapper.findAll('.z-rating__item')[3].trigger('mousemove')
    expect(wrapper.findAll('.z-rating__item--active').length).toBe(3)

    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should work with `on-update:model-value` prop', async () => {
      const onUpdateModelValue = jest.fn()
      const onUpdateModelValue2 = jest.fn()
      const wrapper = mount(ZRating)

      const testNumber = 2

      await wrapper.setProps({
        onUpdateModelValue,
        'onUpdate:modelValue': onUpdateModelValue
      })
      await wrapper.findAll('.z-rating__item')[testNumber].trigger('click')
      expect(onUpdateModelValue).toHaveBeenCalledWith(testNumber + 1)
      expect(onUpdateModelValue).toHaveBeenCalledTimes(2)

      await wrapper.setProps({
        onUpdateModelValue: [onUpdateModelValue, onUpdateModelValue2],
        'onUpdate:modelValue': [onUpdateModelValue, onUpdateModelValue2]
      })
      await wrapper.findAll('.z-rating__item')[testNumber].trigger('click')
      expect(onUpdateModelValue).toHaveBeenCalledWith(testNumber + 1)
      expect(onUpdateModelValue2).toHaveBeenCalledWith(testNumber + 1)
      expect(onUpdateModelValue).toHaveBeenCalledTimes(4)

      wrapper.unmount()
    })

  __FAILED__TESTCASES__ &&
    it('should work with `allowHalf` prop', async () => {
      const onUpdateModelValue = jest.fn()
      const wrapper = mount(ZRating)
      await wrapper.setProps({ allowHalf: true })

      const testNumber = 2

      await wrapper.setProps({ onUpdateModelValue })
      await wrapper.findAll('.z-rating__half')[testNumber].trigger('click')
      expect(onUpdateModelValue).toHaveBeenCalledWith(testNumber + 0.5)

      wrapper.unmount()
    })

  it('should work with `clearable` prop', async () => {
    const wrapper = mount(ZRating)
    await wrapper.setProps({ clearable: true })

    const testNumber = 2

    await wrapper.findAll('.z-rating__item')[testNumber].trigger('click')
    expect(wrapper.findAll('.z-rating__item--active').length).toEqual(
      testNumber + 1
    )

    await wrapper.findAll('.z-rating__item')[testNumber].trigger('click')
    expect(wrapper.findAll('.z-rating__item--active').length).toEqual(0)

    wrapper.unmount()
  })
})
