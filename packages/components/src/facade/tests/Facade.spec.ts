import { mount } from '@vue/test-utils'
import { ZFacade } from '../index'

describe('z-facade', () => {
  it('should work with import on demand', () => {
    mount(ZFacade)
  })

  __FAILED__TESTCASES__ &&
    it('should work with `content`, `description`, `title-end`, `title` props', async () => {
      const wrapper = mount(ZFacade, {
        props: {
          content: 'test-content',
          description: 'test-description',
          'title-end': 'test-title-end',
          title: 'test-title'
        }
      })

      expect(wrapper.find('.z-facade-main__content').exists()).toBe(true)
      expect(wrapper.find('.z-facade-main__content').text()).toBe(
        'test-content'
      )
      expect(wrapper.find('.z-facade-main__description').exists()).toBe(true)
      expect(wrapper.find('.z-facade-main__description').text()).toBe(
        'test-description'
      )
      expect(wrapper.find('.z-facade-header__title').exists()).toBe(true)
      expect(wrapper.find('.z-facade-header__title').text()).toBe('test-title')
      expect(wrapper.find('.z-facade-header__end').exists()).toBe(true)
      expect(wrapper.find('.z-facade-header__end').text()).toBe(
        'test-title-end'
      )
    })

  it('should work with `content-indented` prop', async () => {
    const wrapper = mount(ZFacade, {
      props: {
        content: 'test-content',
        description: 'test-description',
        'title-end': 'test-title-end',
        title: 'test-title'
      },
      slots: { avatar: () => 'test-avatar' }
    })
    expect(wrapper.find('.z-facade').element.children.length).toBe(1)
    expect(
      wrapper.find('.z-facade').element.children[0].getAttribute('class')
    ).toContain('z-facade-main')

    await wrapper.setProps({ contentIndented: true })
    expect(wrapper.find('.z-facade').element.children.length).toBe(2)
    expect(
      wrapper.find('.z-facade').element.children[0].getAttribute('class')
    ).toContain('z-facade-avatar')
    expect(
      wrapper.find('.z-facade').element.children[1].getAttribute('class')
    ).toContain('z-facade-main')
  })

  it('should work with `avatar` `action` `default` `description` `header-end` `header` `footer` Slots', async () => {
    const wrapper = mount(ZFacade, {
      slots: {
        avatar: () => 'test-avatar',
        action: () => 'test-action',
        default: () => 'test-default',
        description: () => 'test-description',
        'header-end': () => 'test-header-end',
        header: () => 'test-header',
        footer: () => 'test-footer'
      }
    })

    expect(wrapper.find('.z-facade-avatar').exists()).toBe(true)
    expect(wrapper.find('.z-facade-avatar').text()).toBe('test-avatar')
    expect(wrapper.find('.z-facade-main__action').exists()).toBe(true)
    expect(wrapper.find('.z-facade-main__action').text()).toBe('test-action')
    expect(wrapper.find('.z-facade-main__content').exists()).toBe(true)
    expect(wrapper.find('.z-facade-main__content').text()).toBe('test-default')
    expect(wrapper.find('.z-facade-main__description').exists()).toBe(true)
    expect(wrapper.find('.z-facade-main__description').text()).toBe(
      'test-description'
    )
    expect(wrapper.find('.z-facade-header__end').exists()).toBe(true)
    expect(wrapper.find('.z-facade-header__end').text()).toBe('test-header-end')
    expect(wrapper.find('.z-facade-header__title').exists()).toBe(true)
    expect(wrapper.find('.z-facade-header__title').text()).toBe('test-header')
    expect(wrapper.find('.z-facade-main__footer').exists()).toBe(true)
    expect(wrapper.find('.z-facade-main__footer').text()).toBe('test-footer')
  })
})
