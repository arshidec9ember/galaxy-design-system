import { mount } from '@vue/test-utils'
import { type CSSProperties, h } from 'vue'
import { ZSwitch } from '../index'

describe('z-switch', () => {
  it('should work with import on demand', () => {
    mount(ZSwitch)
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(ZSwitch)
    expect(wrapper.find('.z-switch--disabled').exists()).not.toBe(true)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.z-switch').classes()).toContain('z-switch--disabled')
  })

  __FAILED__TESTCASES__ &&
    it('should work with `checked-value` prop', async () => {
      const onUpdateModelValue = jest.fn()
      const wrapper = mount(ZSwitch, {
        props: {
          checkedValue: 'foo',
          uncheckedValue: 'bar',
          onUpdateModelValue
        }
      })
      await wrapper.trigger('click')
      expect(onUpdateModelValue).toHaveBeenCalledWith('foo')
      await wrapper.trigger('click')
      expect(onUpdateModelValue).toHaveBeenCalledWith('bar')
      await wrapper.trigger('click')
      expect(onUpdateModelValue).toHaveBeenCalledWith('foo')
    })

  it('should work with `checked-value` prop in type layer', () => {
    const onUpdateModelValue1: (value: string) => void = () => {}
    const onUpdateModelValue2: (value: number) => void = () => {}
    const onUpdateModelValue3: (value: boolean) => void = () => {}
    let _ = (
      <ZSwitch
        onUpdateModelValue={onUpdateModelValue1}
        modelValue={'123'}
        defaultModelValue={'123'}
      />
    )
    _ = (
      <ZSwitch
        onUpdateModelValue={onUpdateModelValue2}
        modelValue={123}
        defaultModelValue={123}
      />
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ = (
      <ZSwitch
        onUpdateModelValue={onUpdateModelValue3}
        modelValue={true}
        defaultModelValue={false}
      />
    )
  })

  it('should work with `round` prop', async () => {
    const wrapper = mount(ZSwitch)
    expect(wrapper.find('.z-switch--round').exists()).toBe(true)
    await wrapper.setProps({ round: false })
    expect(wrapper.find('.z-switch--round').exists()).not.toBe(true)
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(ZSwitch)

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.z-switch').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.z-switch').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.z-switch').attributes('style')).toMatchSnapshot()
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(ZSwitch, { props: { modelValue: true } })
    expect(wrapper.find('.z-switch--active').exists()).toBe(true)

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.find('.z-switch--active').exists()).not.toBe(true)
  })

  it('should work with `on-update:model-value` prop', async () => {
    const onUpdate = jest.fn()
    const wrapper = mount(ZSwitch, {
      props: { 'on-update:model-value': onUpdate }
    })

    await wrapper.trigger('click')
    expect(onUpdate).toHaveBeenCalled()
  })

  it('should work with `loading` prop', () => {
    const wrapper = mount(ZSwitch, {
      props: {
        loading: true
      }
    })
    expect(wrapper.find('.z-base-loading').exists()).toBe(true)
  })

  it('should work with `rail-style` prop', () => {
    const color = 'rgb(32, 128, 240)'
    const railStyle = ({
      focused,
      checked
    }: {
      focused: boolean
      checked: boolean
    }): CSSProperties | string => {
      const style: any = {}
      if (!checked) {
        style.background = color
        if (focused) {
          style.boxShadow = '0 0 0 2px #d0305040'
        }
      }
      return style
    }
    const wrapper = mount(ZSwitch, {
      props: {
        railStyle
      }
    })
    expect(wrapper.find('.z-switch__rail').attributes('style')).toContain(color)
  })

  it('should work with slot', () => {
    const wrapper = mount(ZSwitch, {
      slots: {
        checked: () => 'checked',
        unchecked: () => 'unchecked'
      }
    })
    expect(wrapper.find('.z-switch__checked').text()).toEqual('checked')
    expect(wrapper.find('.z-switch__unchecked').text()).toEqual('unchecked')
  })
  it('should work with `icon` slot', () => {
    const wrapper = mount(ZSwitch, {
      slots: {
        icon: () => h('div', null, 'icon')
      }
    })
    expect(wrapper.find('.z-switch__button').text()).toEqual('icon')
  })
  it('should work with `checked-icon` & `unchecked-icon` slots', async () => {
    const wrapper = mount(ZSwitch, {
      slots: {
        'checked-icon': () => h('div', null, 'checked-icon'),
        'unchecked-icon': () => h('div', null, 'unchecked-icon')
      }
    })
    expect(wrapper.find('.z-switch__button').text()).toEqual('unchecked-icon')
    await wrapper.trigger('click')
    expect(wrapper.find('.z-switch__button').text()).toEqual('checked-icon')
  })
})
