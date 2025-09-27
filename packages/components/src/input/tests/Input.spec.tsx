import { mount } from '@vue/test-utils'
import { defineComponent, h, onMounted, ref } from 'vue'
import { ZInput } from '../index'
import InputGroup from '../src/InputGroup'
import InputGroupLabel from '../src/InputGroupLabel'
import WordCount from '../src/WordCount'

describe('z-input', () => {
  it('should work with import on demand', () => {
    mount(ZInput)
  })

  it('should call input callbacks', async () => {
    const onUpdateModelValue = jest.fn()
    const wrapper = mount(ZInput, {
      props: {
        onUpdateModelValue
      }
    })
    wrapper.find('input').element.value = 'cool'
    await wrapper.find('input').trigger('input')
    expect(onUpdateModelValue).toHaveBeenCalledWith('cool')
    wrapper.unmount()
  })

  it('`loading` prop', async () => {
    const wrapper = mount(ZInput)
    expect(wrapper.find('.z-input__suffix').exists()).toBe(false)
    expect(wrapper.find('.z-base-loading__container').exists()).toBe(false)
    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.z-input__suffix').exists()).toBe(true)
    expect(wrapper.find('.z-base-loading__container').exists()).toBe(false)
    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.z-base-loading__container').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `clearable` prop', async () => {
    const wrapper = mount(ZInput)
    expect(wrapper.find('.z-base-clear').exists()).not.toBe(true)
    await wrapper.setProps({
      clearable: true
    })
    expect(wrapper.find('.z-base-clear').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(ZInput)
    expect(wrapper.find('.z-input').classes()).not.toContain(
      'z-input--disabled'
    )
    await wrapper.setProps({
      disabled: true
    })
    expect(wrapper.find('.z-input').classes()).toContain('z-input--disabled')
    wrapper.unmount()
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(ZInput)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Please Input')
    await wrapper.setProps({
      placeholder: 'test-placeholder'
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'test-placeholder'
    )
    wrapper.unmount()
  })

  it('should work with `readonly` prop', async () => {
    const wrapper = mount(ZInput)
    expect(wrapper.find('input').attributes('readonly')).not.toBe('')

    await wrapper.setProps({ readonly: true })
    expect(wrapper.find('input').attributes('readonly')).toBe('')
    wrapper.unmount()
  })

  it('should work with `round` prop', async () => {
    const wrapper = mount(ZInput)
    expect(wrapper.find('.z-input').classes()).not.toContain('z-input--round')

    await wrapper.setProps({ round: true })
    expect(wrapper.find('.z-input').classes()).toContain('z-input--round')
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should work with `rows` prop', async () => {
      const wrapper = mount(ZInput, { props: { type: 'textarea' } })
      expect(wrapper.find('textarea').attributes('rows')).toBe('3')

      await wrapper.setProps({ type: 'textarea', rows: 5 })
      expect(wrapper.find('textarea').attributes('rows')).toBe('5')
      wrapper.unmount()
    })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((size) => {
      const wrapper = mount(ZInput, { props: { size } })
      expect(wrapper.find('.z-input').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `status` prop', async () => {
    ;(['success', 'warning', 'error'] as const).forEach((status) => {
      const wrapper = mount(ZInput, { props: { status } })
      expect(wrapper.find('.z-input').classes()).toContain(
        `z-input--${status}-status`
      )
      wrapper.unmount()
    })
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(ZInput)
    await wrapper.setProps({ type: 'text' })
    expect(wrapper.find('input').exists()).toBe(true)

    await wrapper.setProps({ type: 'textarea' })
    expect(wrapper.find('.z-input').classes()).toContain('z-input--textarea')
    expect(wrapper.find('textarea').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `show-password-on` prop', async () => {
    let wrapper = mount(ZInput, {
      props: { type: 'password', showPasswordOn: 'click' }
    })
    expect(wrapper.find('input').attributes('type')).toBe('password')
    await wrapper.find('.z-base-icon').trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')

    wrapper = mount(ZInput, {
      props: { type: 'password', showPasswordOn: 'mousedown' }
    })
    expect(wrapper.find('input').attributes('type')).toBe('password')
    await wrapper.find('.z-base-icon').trigger('mousedown')
    expect(wrapper.find('input').attributes('type')).toBe('text')

    wrapper.unmount()
  })

  it('should work with `show-count` prop', async () => {
    const maxlength = 30
    const wrapper = mount(ZInput)
    expect(wrapper.findComponent(WordCount).exists()).not.toBe(true)

    await wrapper.setProps({ showCount: true, maxlength })
    expect(
      wrapper.find('.z-input__suffix').findComponent(WordCount).exists()
    ).toBe(true)
    expect(wrapper.find('.z-input-word-count').text()).toBe(`0 / ${maxlength}`)

    await wrapper.setProps({ showCount: true, maxlength, type: 'textarea' })
    expect(
      wrapper.find('.z-input--textarea').findComponent(WordCount).exists()
    ).toBe(true)
    expect(wrapper.find('.z-input-word-count').text()).toBe(`0 / ${maxlength}`)
    wrapper.unmount()
  })

  it('should work with `pair` `separator` `placeholder` prop', async () => {
    const wrapper = mount(ZInput, {
      props: { pair: true, separator: '-', placeholder: ['从', '到'] }
    })

    expect(wrapper.find('.z-input').classes()).toContain('z-input--pair')
    expect(wrapper.find('.z-input__separator').text()).toBe('-')
    expect(wrapper.findAll('input')[0].attributes('placeholder')).toBe('从')
    expect(wrapper.findAll('input')[1].attributes('placeholder')).toBe('到')

    wrapper.unmount()
  })

  it('should work with `on-blur` prop', async () => {
    const onBlur = jest.fn()
    const wrapper = mount(ZInput, {
      props: { onBlur }
    })
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(onBlur).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-change` prop', async () => {
    const onChange = jest.fn()
    const wrapper = mount(ZInput, {
      props: { onChange }
    })
    wrapper.find('input').element.focus()
    await wrapper.find('input').setValue('test')
    await wrapper.find('input').trigger('blur')
    expect(onChange).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-focus` prop', async () => {
    const onFocus = jest.fn()
    const wrapper = mount(ZInput, {
      props: { onFocus }
    })
    await wrapper.find('input').trigger('focus')
    expect(onFocus).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-input` prop', async () => {
    const onInput = jest.fn()
    const wrapper = mount(ZInput, {
      props: { onInput }
    })
    wrapper.find('input').element.focus()
    await wrapper.find('input').setValue('test')
    expect(onInput).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-update:model-value` prop', async () => {
    const onUpdateModelValue = jest.fn()
    const wrapper = mount(ZInput, {
      props: { onUpdateModelValue }
    })
    wrapper.find('input').element.focus()
    await wrapper.find('input').setValue('test')
    expect(onUpdateModelValue).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `prefix` slots', async () => {
    const wrapper = mount(ZInput, {
      slots: { prefix: '￥' }
    })
    expect(wrapper.find('.z-input__prefix').exists()).toBe(true)
    expect(wrapper.find('.z-input__prefix').text()).toBe('￥')
    wrapper.unmount()
  })

  it('should work with `suffix` slots', async () => {
    const wrapper = mount(ZInput, {
      slots: { suffix: '元' }
    })
    expect(wrapper.find('.z-input__suffix').exists()).toBe(true)
    expect(wrapper.find('.z-input__suffix').text()).toBe('元')
    wrapper.unmount()
  })

  it('should work with `separator` slot', async () => {
    const wrapper = mount(ZInput, {
      props: { pair: true },
      slots: { separator: '-' }
    })

    expect(wrapper.find('.z-input').classes()).toContain('z-input--pair')
    expect(wrapper.find('.z-input__separator').text()).toBe('-')
    wrapper.unmount()
  })

  it('should work with `InputGroup` `InputGroupLabel` slot', async () => {
    const wrapper = mount(InputGroup, {
      slots: {
        default: () => [
          h(InputGroupLabel, null, { default: () => 'test1' }),
          h(ZInput),
          h(InputGroupLabel, null, { default: () => 'test2' })
        ]
      }
    })

    expect(wrapper.find('.z-input-group').exists()).toBe(true)
    expect(wrapper.find('.z-input-group').element.children.length).toBe(3)
    expect(
      wrapper.find('.z-input-group').element.children[0].getAttribute('class')
    ).toContain('z-input-group-label')
    expect(wrapper.find('.z-input-group').element.children[0].textContent).toBe(
      'test1'
    )
    expect(
      wrapper.find('.z-input-group').element.children[1].getAttribute('class')
    ).toContain('z-input')
    expect(
      wrapper.find('.z-input-group').element.children[2].getAttribute('class')
    ).toContain('z-input-group-label')
    expect(wrapper.find('.z-input-group').element.children[2].textContent).toBe(
      'test2'
    )
    wrapper.unmount()
  })

  it('should work with `blur` `focus` `select` methods', async () => {
    const onBlur = jest.fn()
    const onFocus = jest.fn()
    const onSelect = jest.fn()
    const Mock = defineComponent({
      setup () {
        const inputInstRef: any = ref(null)
        onMounted(() => {
          inputInstRef.value?.focus()
          inputInstRef.value?.blur()
          inputInstRef.value?.select()
        })
        return () => {
          ;<z-input
            ref={inputInstRef}
            onBlur={onBlur}
            onFocus={onFocus}
            onSelect={onSelect}
          />
        }
      }
    })

    const wrapper = mount(() => <Mock />)
    setTimeout(() => {
      expect(onBlur).toHaveBeenCalled()
      expect(onFocus).toHaveBeenCalled()
      expect(onSelect).toHaveBeenCalled()
    }, 0)

    wrapper.unmount()
  })
})
