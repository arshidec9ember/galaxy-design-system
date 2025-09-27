import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { ZTabPane, ZTabs } from '../index'
import { AddIcon } from '../../_internal/icons'
import { sleep } from 'seemly'

describe('z-tabs', () => {
  it('should work with import on demand', () => {
    mount(ZTabs)
  })

  it('should work with callback types', () => {
    function onUpdateModelValue1 (name: number): void {}
    function onUpdateModelValue2 (name: string): void {}
    function onUpdateModelValue3 (name: number | string): void {}
    mount(ZTabs, {
      props: {
        onUpdateModelValue: onUpdateModelValue1
      }
    })
    mount(ZTabs, {
      props: {
        onUpdateModelValue: onUpdateModelValue2
      }
    })
    mount(ZTabs, {
      props: {
        onUpdateModelValue: onUpdateModelValue3
      }
    })
  })

  it('should work with empty tab-pane', () => {
    mount(ZTabs, {
      props: {
        defaultModelValue: 'a'
      },
      slots: {
        default: () =>
          h(ZTabPane, {
            tab: 'a',
            name: 'a'
          })
      }
    })
  })

  it('should show AddIcon with `addable` `on-add` prop', async () => {
    const onAdd = jest.fn()
    const wrapper = mount(ZTabs, {
      props: {
        variant: 'card',
        addable: true,
        onAdd
      }
    })

    expect(wrapper.findComponent(AddIcon).exists()).toBe(true)
    const addIcon = wrapper.find('.z-tabs-tab--addable')
    await addIcon.trigger('click')
    expect(onAdd).toHaveBeenCalled()
  })

  it('should work with `justify-content` prop', async () => {
    const wrapper = mount(ZTabs)

    await wrapper.setProps({ justifyContent: 'space-between' })
    expect(wrapper.find('.z-tabs-wrapper').attributes('style')).toContain(
      'justify-content: space-between;'
    )

    await wrapper.setProps({ justifyContent: 'space-around' })
    expect(wrapper.find('.z-tabs-wrapper').attributes('style')).toContain(
      'justify-content: space-around;'
    )

    await wrapper.setProps({ justifyContent: 'space-evenly' })
    expect(wrapper.find('.z-tabs-wrapper').attributes('style')).toContain(
      'justify-content: space-evenly;'
    )
  })

  it('should work with `closable` prop', async () => {
    const wrapper = mount(ZTabs, {
      props: {
        variant: 'card',
        defaultModelValue: '1'
      },
      slots: {
        default: () => [
          h(ZTabPane, {
            tab: '1',
            name: '1'
          })
        ]
      }
    })
    expect(wrapper.find('.z-base-close').exists()).toBe(false)

    await wrapper.setProps({ closable: true })
    expect(wrapper.find('.z-base-close').exists()).toBe(true)
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(ZTabs)

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.z-tabs').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.z-tabs').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.z-tabs').attributes('style')).toMatchSnapshot()
  })

  it('should work with `tabs-padding` prop', async () => {
    const wrapper = mount(ZTabs)

    expect(
      wrapper.find('.z-tabs-scroll-padding').attributes('style')
    ).toContain('width: 0px;')

    await wrapper.setProps({ tabsPadding: 100 })
    expect(
      wrapper.find('.z-tabs-scroll-padding').attributes('style')
    ).toContain('width: 100px;')
  })

  it('should work with `display-directive` prop', async () => {
    const displayDirectives: Array<'show' | 'if' | 'show:lazy'> = [
      'show',
      'if',
      'show:lazy'
    ]
    const wrapper = mount(ZTabs, {
      props: { value: 'show' },
      slots: {
        default: () =>
          displayDirectives.map((directive) => (
            <ZTabPane
              displayDirective={directive}
              tab={directive}
              name={directive}
            >
              {{
                default: () => (
                  <span class={`test-${directive.replace(':', '-')}`} />
                )
              }}
            </ZTabPane>
          ))
      }
    })
    await wrapper.setProps({ modelValue: 'if' })
    expect(wrapper.find('.test-show').exists()).toEqual(true)
    expect(wrapper.find('.test-if').exists()).toEqual(true)
    expect(wrapper.find('.test-show-lazy').exists()).toEqual(false)
    await wrapper.setProps({ modelValue: 'show:lazy' })
    expect(wrapper.find('.test-show').exists()).toEqual(true)
    expect(wrapper.find('.test-if').exists()).toEqual(false)
    expect(wrapper.find('.test-show-lazy').exists()).toEqual(true)
    await wrapper.setProps({ modelValue: 'show' })
    expect(wrapper.find('.test-show').exists()).toEqual(true)
    expect(wrapper.find('.test-if').exists()).toEqual(false)
    expect(wrapper.find('.test-show-lazy').exists()).toEqual(true)
  })

  it('should work with `on-before-leave` prop', async () => {
    const wrapper = mount(ZTabs, {
      props: {
        variant: 'card',
        defaultModelValue: '3',
        onBeforeLeave: async (name: string) => {
          switch (name) {
            case '1':
              return false
            case '2':
              return await new Promise<boolean>((resolve) => {
                setTimeout(() => {
                  resolve(true)
                }, 1000)
              })
            default:
              return true
          }
        }
      },
      slots: {
        default: () => [
          h(ZTabPane, {
            tab: '1',
            name: '1'
          }),
          h(ZTabPane, {
            tab: '2',
            name: '2'
          }),
          h(ZTabPane, {
            tab: '3',
            name: '3'
          })
        ]
      }
    })
    const tabs = wrapper.findAll('.z-tabs-tab')
    expect(tabs[2].classes()).toContain('z-tabs-tab--active')
    await tabs[0].trigger('click')
    expect(tabs[2].classes()).toContain('z-tabs-tab--active')
    await tabs[1].trigger('click')
    expect(tabs[2].classes()).toContain('z-tabs-tab--active')
    await sleep(1000)
    expect(tabs[1].classes()).toContain('z-tabs-tab--active')
  })

  it('should work with `pane-class` prop', () => {
    const wrapper = mount(ZTabs, {
      props: {
        paneClass: 'test'
      },
      slots: {
        default: () =>
          h(
            ZTabPane,
            {
              tab: 'Home',
              name: 'home'
            },
            'Wonderwall'
          )
      }
    })

    expect(wrapper.find('.z-tab-pane').classes('test')).toBe(true)
  })

  it('should work with `pane-style` prop', () => {
    const wrapper = mount(ZTabs, {
      props: {
        paneStyle: {
          color: 'red'
        }
      },
      slots: {
        default: () =>
          h(
            ZTabPane,
            {
              tab: 'Home',
              name: 'home'
            },
            'Wonderwall'
          )
      }
    })

    expect(wrapper.find('.z-tab-pane').attributes('style')).toBe('color: red;')
  })

  it('should work with `tab-style` prop', () => {
    const wrapper = mount(ZTabs, {
      props: {
        tabStyle: {
          color: 'red'
        }
      },
      slots: {
        default: () =>
          h(
            ZTabPane,
            {
              tab: 'Home',
              name: 'home'
            },
            'Wonderwall'
          )
      }
    })

    expect(wrapper.find('.z-tabs-tab').attributes('style')).toContain(
      'color: red;'
    )
  })

  it('should work with `variant` prop', () => {
    ;(['bar', 'line', 'card', 'segment'] as const).forEach((variant) => {
      const wrapper = mount(ZTabs, {
        props: {
          variant
        },
        slots: {
          default: () =>
            h(
              ZTabPane,
              {
                tab: 'Home',
                name: 'home'
              },
              { default: () => 'Wonderwall' }
            )
        }
      })

      expect(wrapper.find('.z-tabs').classes()).toContain(
        `z-tabs--${variant}-type`
      )
      wrapper.unmount()
    })
  })

  it('should work with `on-close` prop', async () => {
    const onClose = jest.fn()
    const wrapper = mount(ZTabs, {
      props: {
        variant: 'card',
        defaultModelValue: '1',
        closable: true,
        onClose
      },
      slots: {
        default: () => [
          h(ZTabPane, {
            tab: '1',
            name: '1'
          })
        ]
      }
    })

    const addIcon = wrapper.find('.z-base-close')
    await addIcon.trigger('click')
    expect(onClose).toHaveBeenCalled()
  })

  it('should work with `start` `end` slots', async () => {
    const wrapper = mount(ZTabs, {
      props: {
        defaultModelValue: '1'
      },
      slots: {
        default: () => [
          h(ZTabPane, {
            tab: '1',
            name: '1'
          })
        ],
        start: () => 'test-start',
        end: () => 'test-end'
      }
    })

    expect(wrapper.find('.z-tabs-nav__start').exists()).toBe(true)
    expect(wrapper.find('.z-tabs-nav__start').text()).toBe('test-start')
    expect(wrapper.find('.z-tabs-nav__end').exists()).toBe(true)
    expect(wrapper.find('.z-tabs-nav__end').text()).toBe('test-end')
  })
})
