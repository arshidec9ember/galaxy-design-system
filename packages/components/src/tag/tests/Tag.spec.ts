import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { ZAvatar } from '../../avatar'
import { ZTag } from '../index'

describe('z-tag', () => {
  it('should work with import on demand', () => {
    mount(ZTag)
  })

  it('should work with `bordered` prop', () => {
    const wrapper = mount(ZTag, {
      props: {
        bordered: true
      }
    })

    expect(wrapper.find('.z-tag__border').exists()).toBe(true)
  })

  it('should be clickable', () => {
    const onClick = jest.fn()
    const wrapper = mount(ZTag, {
      props: {
        onClick
      }
    })

    wrapper.trigger('click')
    expect(onClick).toBeCalled()
  })

  it('should be `checkable` prop', async () => {
    const wrapper = mount(ZTag, {
      props: {
        checkable: true
      }
    })

    await wrapper.setProps({ checked: true })
    expect(wrapper.find('.z-tag').classes()).toContain('z-tag--checkable')

    await wrapper.setProps({ checked: false })
    expect(wrapper.find('.z-tag').classes()).not.toContain('z-tag--checked')
  })

  it('should work with `on-update:checked` prop', () => {
    const onChecked = jest.fn()
    const wrapper = mount(ZTag, {
      props: {
        checkable: true,
        'onUpdate:checked': onChecked,
        onUpdateChecked: onChecked
      }
    })

    wrapper.trigger('click')
    expect(onChecked).toBeCalled()
    expect(onChecked).toBeCalledTimes(2)
  })

  it('should work with `closable` `on-close` prop', () => {
    const onClose = jest.fn()
    const wrapper = mount(ZTag, {
      props: {
        closable: true,
        onClose
      }
    })

    expect(wrapper.find('.z-tag__close').exists()).toBe(true)
    wrapper.find('.z-tag__close').trigger('click')
    expect(onClose).toBeCalled()
  })

  it('should work with `disabled` prop', async () => {
    const onClose = jest.fn()
    const wrapper = mount(ZTag, {
      props: {
        disabled: true,
        closable: true,
        onClose
      }
    })

    expect(wrapper.find('.z-tag').classes()).toContain('z-tag--disabled')
    wrapper.find('.z-tag__close').trigger('click')
    expect(onClose).not.toBeCalled()
  })

  it('should work with `round` prop', () => {
    const wrapper = mount(ZTag, {
      props: {
        round: true
      }
    })

    expect(wrapper.find('.z-tag').classes()).toContain('z-tag--round')
  })

  it('should work with `size` prop', () => {
    ;(['small', 'medium', 'large'] as const).forEach((size) => {
      const wrapper = mount(ZTag)
      wrapper.setProps({ size })
      expect(wrapper.find('.z-tag').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `color` prop', () => {
    ;(
      ['neutral', 'primary', 'success', 'info', 'warning', 'error'] as const
    ).forEach((color) => {
      const wrapper = mount(ZTag)

      wrapper.setProps({ color })
      expect(wrapper.find('.z-tag').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with default slot', () => {
    const wrapper = mount(ZTag, {
      slots: {
        default: () => 'default'
      }
    })

    expect(wrapper.find('.z-tag__content').exists()).toBe(true)
    expect(wrapper.find('.z-tag__content').element.textContent).toBe('default')
    expect(wrapper.find('.z-tag__content').html()).toMatchSnapshot()
  })

  it('should work with `color` object prop', () => {
    const wrapper = mount(ZTag, {
      props: {
        color: {
          color: '#ccc',
          textColor: '#555',
          borderColor: 'rgb(85, 85, 85)'
        }
      }
    })
    expect(wrapper.find('.z-tag').attributes('style')).toContain(
      '--z-color: #ccc;'
    )
    expect(wrapper.find('.z-tag').attributes('style')).toContain(
      '--z-text-color: #555;'
    )
    expect(wrapper.find('.z-tag').attributes('style')).toContain(
      '--z-border-color: rgb(85, 85, 85);'
    )
  })

  it('should use custom text color when textColor is provided', () => {
    const wrapper = mount(ZTag, {
      props: {
        color: {
          color: '#0F1B59',
          textColor: '#FFFFFF',
          borderColor: '#0F1B59'
        }
      },
      slots: {
        default: () => 'Custom Color Tag'
      }
    })

    const textElement = wrapper.find('.z-tag__content')
    expect(textElement.exists()).toBe(true)

    const textComponent = wrapper.findComponent({ name: 'Text' })
    expect(textComponent.props('color')).toBe('inherit')

    const tagStyle = wrapper.find('.z-tag').attributes('style')
    expect(tagStyle).toContain('--z-text-color: #FFFFFF')
  })

  it('should use default text color when no custom textColor is provided', () => {
    const wrapper = mount(ZTag, {
      props: {
        color: 'primary'
      },
      slots: {
        default: () => 'Primary Tag'
      }
    })

    const textElement = wrapper.find('.z-tag__content')
    expect(textElement.exists()).toBe(true)

    const textStyle = textElement.attributes('style')
    expect(textStyle).toContain('--z-text-color')
  })

  it('should work with `avatar` slot', () => {
    const wrapper = mount(ZTag, {
      slots: {
        avatar: () =>
          h(ZAvatar, {
            src: 'https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg'
          })
      }
    })

    expect(wrapper.find('.z-tag__avatar').exists()).toBe(true)
    expect(wrapper.find('.z-avatar').attributes('style')).toContain(
      '--z-merged-size: var(--z-avatar-size-override, 2rem);'
    )
  })
})
