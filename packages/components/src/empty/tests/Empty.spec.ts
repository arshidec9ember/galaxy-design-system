import { mount } from '@vue/test-utils'
import { ZEmpty } from '../index'

describe('z-empty', () => {
  it('should work with import on demand', () => {
    mount(ZEmpty)
  })

  __FAILED__TESTCASES__ &&
    it('should work with slots', () => {
      const wrapper = mount(ZEmpty, {
        slots: {
          default: () => 'test-description',
          icon: () => 'test-icon',
          actions: () => 'test-actions'
        }
      })

      expect(wrapper.find('.z-empty__description').exists()).toBe(true)
      expect(wrapper.find('.z-empty__description').text()).toBe(
        'test-description'
      )
      expect(wrapper.find('.z-empty__icon').exists()).toBe(true)
      expect(wrapper.find('.z-empty__icon').text()).toBe('test-icon')
      expect(wrapper.find('.z-empty__actions').exists()).toBe(true)
      expect(wrapper.find('.z-empty__actions').text()).toBe('test-actions')
      wrapper.unmount()
    })

  it('should work with `description` prop', () => {
    const wrapper = mount(ZEmpty, {
      props: {
        description: 'test-description'
      }
    })

    expect(wrapper.find('.z-empty__description').exists()).toBe(true)
    expect(wrapper.find('.z-empty__description').text()).toContain(
      'test-description'
    )
    wrapper.unmount()
  })

  it('should work with `show-description` prop', async () => {
    const wrapper = mount(ZEmpty)
    expect(wrapper.find('.z-empty__description').exists()).toBe(true)

    await wrapper.setProps({ showDescription: false })
    expect(wrapper.find('.z-empty__description').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `show-icon` prop', async () => {
    const wrapper = mount(ZEmpty)
    expect(wrapper.find('.z-empty__icon').exists()).toBe(true)

    await wrapper.setProps({ showIcon: false })
    expect(wrapper.find('.z-empty__icon').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(ZEmpty)

    expect(wrapper.find('.z-empty').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.z-empty').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.z-empty').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.z-empty').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'x-large' })
    expect(wrapper.find('.z-empty').attributes('style')).toMatchSnapshot()

    wrapper.unmount()
  })
})
