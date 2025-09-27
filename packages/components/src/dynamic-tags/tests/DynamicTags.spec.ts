import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { ZDynamicTags } from '../index'
import { ZAutoComplete } from '../../auto-complete/index'
import { ZButton } from '../../button/index'
import { ZTag } from '../../tag'

describe('z-dynamic-tags', () => {
  it('should work with import on demand', () => {
    mount(ZDynamicTags)
  })

  it('should work with `closable` prop', async () => {
    const wrapper = mount(ZDynamicTags, {
      props: {
        defaultModelValue: ['teacher', 'programmer']
      }
    })
    expect(wrapper.find('.z-tag__close').exists()).toBe(true)
    await wrapper.setProps({ closable: false })
    expect(wrapper.find('.z-tag__close').exists()).toBe(false)
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should work with `color` prop', async () => {
      const wrapper = mount(ZDynamicTags, {
        props: {
          color: {
            color: '#ccc',
            textColor: '#555',
            borderColor: 'rgb(85, 85, 85)'
          },
          defaultModelValue: ['teacher', 'programmer']
        }
      })
      expect(wrapper.find('.z-tag').attributes('style')).toContain(
        '--z-color: #ccc;'
      )
      expect(wrapper.find('.z-tag').attributes('style')).toContain(
        '--z-text-color: #555;'
      )
      expect(wrapper.find('.z-tag__border').attributes('style')).toContain(
        'border-color: rgb(85, 85, 85);'
      )
      wrapper.unmount()
    })

  it('should work with `disabled` prop', async () => {
    const onClose = jest.fn()
    const wrapper = mount(ZDynamicTags, {
      props: {
        disabled: true,
        closable: true,
        defaultModelValue: ['teacher', 'programmer'],
        onClose
      }
    })

    expect(wrapper.find('.z-tag').classes()).toContain('z-tag--disabled')
    wrapper.find('.z-tag__close').trigger('click')
    expect(onClose).not.toBeCalled()
    expect(wrapper.find('.z-button').classes()).toContain('z-button--disabled')
    wrapper.unmount()
  })

  it('should work with `max` prop', async () => {
    const wrapper = mount(ZDynamicTags, {
      props: {
        max: 2,
        modelValue: ['teacher']
      }
    })

    expect(wrapper.find('.z-button').classes()).not.toContain(
      'z-button--disabled'
    )
    await wrapper.setProps({ modelValue: ['teacher', 'programmer'] })
    expect(wrapper.find('.z-button').classes()).toContain('z-button--disabled')
    wrapper.unmount()
  })

  it('should work with `round` prop', async () => {
    const wrapper = mount(ZDynamicTags, {
      props: {
        round: true,
        defaultModelValue: ['teacher']
      }
    })
    expect(wrapper.find('.z-tag').classes()).toContain('z-tag--round')
    await wrapper.setProps({ round: false })
    expect(wrapper.find('.z-tag').classes()).not.toContain('z-tag--round')
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(ZDynamicTags, {
      props: {
        size: 'small',
        defaultModelValue: ['teacher']
      }
    })
    expect(wrapper.find('.z-tag').attributes('style')).toMatchSnapshot()
    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.z-tag').attributes('style')).toMatchSnapshot()
    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.z-tag').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with semantic `color` prop', async () => {
    const wrapper = mount(ZDynamicTags, {
      props: {
        size: 'small',
        defaultModelValue: ['teacher']
      }
    })
    expect(wrapper.find('.z-tag').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ color: 'info' })
    expect(wrapper.find('.z-tag').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ color: 'success' })
    expect(wrapper.find('.z-tag').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ color: 'warning' })
    expect(wrapper.find('.z-tag').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ color: 'error' })
    expect(wrapper.find('.z-tag').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `tag-style` prop', async () => {
    const wrapper = mount(ZDynamicTags, {
      props: {
        tagStyle: {
          color: 'rgb(79, 178, 51)'
        },
        defaultModelValue: ['teacher']
      }
    })
    expect(wrapper.find('.z-tag').attributes('style')).toContain(
      'color: rgb(79, 178, 51);'
    )
    await wrapper.setProps({ tagStyle: { width: '100px' } })
    expect(wrapper.find('.z-tag').attributes('style')).toContain(
      'width: 100px;'
    )
    wrapper.unmount()
  })

  it('should work with `on-update:model-value` prop', () => {
    const onUpdateModelValue = jest.fn()
    const wrapper = mount(ZDynamicTags, {
      props: {
        modelValue: ['teacher', 'programmer'],
        onUpdateModelValue
      }
    })
    wrapper.find('.z-tag__close').trigger('click')
    expect(onUpdateModelValue).toBeCalled()
    wrapper.unmount()
  })

  it('should work with `input-props` prop', async () => {
    const wrapper = mount(ZDynamicTags, {
      props: {
        defaultModelValue: ['teacher']
      }
    })
    await wrapper.find('.z-button').trigger('click')
    expect(wrapper.find('.z-input').classes()).not.toContain(
      'z-input--disabled'
    )

    await wrapper.setProps({ inputProps: { disabled: true } })
    expect(wrapper.find('.z-input').classes()).toContain('z-input--disabled')
    wrapper.unmount()
  })

  it('should work with `input-style` prop', async () => {
    const wrapper = mount(ZDynamicTags, {
      props: {
        defaultModelValue: ['teacher']
      }
    })
    await wrapper.find('.z-button').trigger('click')
    expect(wrapper.find('.z-input').attributes('style')).not.toContain(
      'color: red'
    )

    await wrapper.setProps({ inputStyle: { color: 'red' } })
    expect(wrapper.find('.z-input').attributes('style')).toContain('color: red')
    wrapper.unmount()
  })

  it('should work with `render-tag` prop', async () => {
    const wrapper = mount(ZDynamicTags, {
      props: {
        modelValue: ['teacher'],
        renderTag: (tag: string) =>
          h(ZTag, null, {
            default: () => `test-${tag}`
          })
      }
    })

    expect(wrapper.find('.z-tag__content').text()).toContain('test-teacher')
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should work with `input` slot', async () => {
      const wrapper = mount(ZDynamicTags, {
        props: {
          modelValue: ['teacher', 'programmer']
        },
        slots: {
          input: () => h(ZAutoComplete)
        }
      })
      await wrapper.find('.z-button').trigger('click')
      expect(wrapper.find('.z-select').exists()).toBe(true)
      wrapper.unmount()
    })

  it('should work with `trigger` slot', async () => {
    const wrapper = mount(ZDynamicTags, {
      props: {
        modelValue: ['teacher', 'programmer']
      },
      slots: {
        trigger: () =>
          h(ZButton, null, {
            default: () => 'Add'
          })
      }
    })
    expect(wrapper.find('.z-button__content').text()).toEqual('Add')
    wrapper.unmount()
  })
})
