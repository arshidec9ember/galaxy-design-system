import { mount } from '@vue/test-utils'
import { ZPageHeader } from '../index'

describe('z-page-header', () => {
  it('should work with page header', () => {
    mount(ZPageHeader)
  })

  it('should work with `title` prop', async () => {
    const wrapper = mount(ZPageHeader, { props: { title: 'test-title' } })

    expect(wrapper.find('.z-page-header__title').exists()).toBe(true)
    expect(wrapper.find('.z-page-header__title').html()).toContain('test-title')
    wrapper.unmount()
  })

  it('should work with `extra` prop', async () => {
    const wrapper = mount(ZPageHeader, { props: { extra: 'test-extra' } })

    expect(wrapper.find('.z-page-header__extra').exists()).toBe(true)
    expect(wrapper.find('.z-page-header__extra').html()).toContain('test-extra')
    wrapper.unmount()
  })

  it('should work with `description` prop', async () => {
    const wrapper = mount(ZPageHeader, {
      props: { description: 'test-description' }
    })

    expect(wrapper.find('.z-page-header__description').exists()).toBe(true)
    expect(wrapper.find('.z-page-header__description').html()).toContain(
      'test-description'
    )
    wrapper.unmount()
  })

  it('should work with `on-back` prop', async () => {
    const handleOnBack = jest.fn()
    const wrapper = mount(ZPageHeader, { props: { onBack: handleOnBack } })

    expect(wrapper.find('.z-page-header-header__back').exists()).toBe(true)
    await wrapper.find('.z-page-header-header__back').trigger('click')
    expect(handleOnBack).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with slots', async () => {
    const wrapper = mount(ZPageHeader, {
      props: { onBack: () => {} },
      slots: {
        avatar: () => 'avatar-slot',
        header: () => 'header-slot',
        default: () => 'default-slot',
        extra: () => 'extra-slot',
        footer: () => 'footer-slot',
        description: () => 'description-slot',
        title: () => 'title-slot',
        back: () => 'back-slot'
      }
    })

    expect(wrapper.find('.z-page-header__avatar').exists()).toBe(true)
    expect(wrapper.find('.z-page-header__avatar').html()).toContain(
      'avatar-slot'
    )
    expect(wrapper.find('.z-page-header-header').exists()).toBe(true)
    expect(wrapper.find('.z-page-header-header').html()).toContain(
      'header-slot'
    )
    expect(wrapper.find('.z-page-header-content').exists()).toBe(true)
    expect(wrapper.find('.z-page-header-content').html()).toContain(
      'default-slot'
    )
    expect(wrapper.find('.z-page-header__extra').exists()).toBe(true)
    expect(wrapper.find('.z-page-header__extra').html()).toContain('extra-slot')
    expect(wrapper.find('.z-page-header-footer').exists()).toBe(true)
    expect(wrapper.find('.z-page-header-footer').html()).toContain(
      'footer-slot'
    )
    expect(wrapper.find('.z-page-header__description').exists()).toBe(true)
    expect(wrapper.find('.z-page-header__description').html()).toContain(
      'description-slot'
    )
    expect(wrapper.find('.z-page-header__title').exists()).toBe(true)
    expect(wrapper.find('.z-page-header__title').html()).toContain('title-slot')
    expect(wrapper.find('.z-page-header-header__back').exists()).toBe(true)
    expect(wrapper.find('.z-page-header-header__back').html()).toContain(
      'back-slot'
    )
    wrapper.unmount()
  })
})
