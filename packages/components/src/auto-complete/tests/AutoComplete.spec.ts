import { mount } from '@vue/test-utils'
import { ZAutoComplete, type AutoCompleteProps } from '../index'

describe('z-auto-complete', () => {
  it('should work with import on demand', () => {
    mount(ZAutoComplete)
  })

  it('should work with `clearable` prop', async () => {
    const wrapper = mount(ZAutoComplete)
    expect(wrapper.find('.z-base-clear').exists()).not.toBe(true)
    await wrapper.setProps({
      clearable: true
    })
    expect(wrapper.find('.z-base-clear').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(ZAutoComplete)
    expect(wrapper.find('.z-input').classes()).not.toContain(
      'z-input--disabled'
    )
    await wrapper.setProps({
      disabled: true
    })
    expect(wrapper.find('.z-input').classes()).toContain('z-input--disabled')
    wrapper.unmount()
  })

  it('should work with `loading` prop', async () => {
    const options: AutoCompleteProps['options'] = [
      '@gmail.com',
      '@163.com',
      '@qq.com'
    ].map((suffix) => {
      const prefix = 'test'
      return {
        label: prefix + suffix,
        value: prefix + suffix
      }
    })
    const wrapper = mount(ZAutoComplete, {
      props: {
        options
      }
    })
    expect(wrapper.find('.z-base-loading__container').exists()).toBe(false)
    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.z-base-loading__container').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(ZAutoComplete)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Please Input')
    await wrapper.setProps({
      placeholder: 'test-placeholder'
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'test-placeholder'
    )
    wrapper.unmount()
  })

  // FIXME: fix sizes in the component
  // it('should work with `size` prop', async () => {
  //   ;(['small', 'medium', 'large'] as const).forEach((size) => {
  //     const wrapper = mount(ZAutoComplete, { props: { size } })
  //     expect(wrapper.find('.z-input').attributes('style')).toMatchSnapshot()
  //     wrapper.unmount()
  //   })
  // })

  it('should work with `getShow` prop', async () => {
    const options: AutoCompleteProps['options'] = [
      '@gmail.com',
      '@163.com',
      '@qq.com'
    ].map((suffix) => {
      const prefix = 'test'
      return {
        label: prefix + suffix,
        value: prefix + suffix
      }
    })
    const wrapper = mount(ZAutoComplete)
    await wrapper.setProps({
      getShow: (value: string | null) => {
        if (value === 'a') {
          return true
        }
        return false
      },
      options
    })
    expect(document.querySelector('.z-auto-complete-menu')).toEqual(null)
    wrapper.find('input').setValue('a')
    await wrapper.find('input').trigger('focus')
    expect(document.querySelector('.z-auto-complete-menu')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should work with `input-props` prop', async () => {
    const wrapper = mount(ZAutoComplete, {
      props: {
        inputProps: {
          id: 'input',
          max: '10'
        }
      }
    })
    expect(wrapper.find('input').attributes('max')).toEqual('10')
    wrapper.unmount()
  })

  it('should work with `on-blur` prop', async () => {
    const onBlur = jest.fn()
    const wrapper = mount(ZAutoComplete, {
      props: { onBlur }
    })
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(onBlur).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-focus` prop', async () => {
    const onFocus = jest.fn()
    const wrapper = mount(ZAutoComplete, {
      props: { onFocus }
    })
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(onFocus).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `status` prop', async () => {
    ;(['success', 'warning', 'error'] as const).forEach((status) => {
      const wrapper = mount(ZAutoComplete, { props: { status } })
      expect(wrapper.find('.z-input').classes()).toContain(
        `z-input--${status}-status`
      )
      wrapper.unmount()
    })
  })

  it('should work with `placement` prop', async () => {
    ;(
      [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end'
      ] as const
    ).forEach((placement) => {
      const wrapper = mount(ZAutoComplete, { props: { placement } })
      setTimeout(() => {
        expect(
          document
            .querySelector('.v-binder-follower-content')
            ?.getAttribute('v-placement')
        ).toBe(placement)
        wrapper.unmount()
      })
    })
  })
})
