import { mount } from '@vue/test-utils'
import { HappyOutline } from '@vicons/ionicons5'
import { h, Comment } from 'vue'
import { sleep } from 'seemly'
import {
  ZMenu,
  type MenuOption,
  type MenuGroupOption,
  type MenuDividerOption
} from '../index'
import { ZIcon } from '../../icon'

describe('z-menu', () => {
  it('should work with import on demand', () => {
    mount(ZMenu)
  })

  it('props.options type', () => {
    const options: Array<MenuOption | MenuGroupOption | MenuDividerOption> = [
      {
        label: 'l',
        key: 'key'
      },
      {
        type: 'group',
        children: [
          {
            label: 'l',
            key: 'key2'
          },
          {
            type: 'divider',
            key: 'key3'
          }
        ]
      }
    ]
    mount(ZMenu, { props: { options } })
  })

  it('props.onUpdateModelValue type', () => {
    const stringCb = (v: string): void => {}
    const numberCb = (v: number): void => {}
    const snCb = (v: string | number): void => {}
    const stringArrCb = (v: string[]): void => {}
    const numberArrCb = (v: number[]): void => {}
    const snArrCb = (v: Array<string | number>): void => {}
    mount(ZMenu, {
      props: {
        onUpdateModelValue: stringCb,
        onUpdateExpandedKeys: stringArrCb
      }
    })
    mount(ZMenu, {
      props: {
        onUpdateModelValue: numberCb,
        onUpdateExpandedKeys: numberArrCb
      }
    })
    mount(ZMenu, {
      props: {
        onUpdateModelValue: snCb,
        onUpdateExpandedKeys: snArrCb
      }
    })
  })

  it('should work with `render-icon` props', async () => {
    const options = [
      {
        label: 'fantasy',
        key: 'fantasy'
      },
      {
        label: 'mojito',
        key: 'mojito'
      },
      {
        label: 'initialj',
        key: 'initialj'
      }
    ]
    function renderMenuIcon (option: any): any {
      // return comment vnode, render placeholder for indent
      if (option.key === 'mojito') return h(Comment)
      // return falsy, don't render icon placeholder
      if (option.key === 'initialj') return null
      // otherwise, render returns vnode
      return h(ZIcon, null, { default: () => h(HappyOutline) })
    }
    const wrapper = mount(ZMenu, {
      props: {
        options,
        renderIcon: renderMenuIcon
      }
    })
    expect(wrapper.findAll('.z-menu-item-content__icon').length).toBe(2)
    expect(wrapper.findAll('.z-icon').length).toBe(1)
    wrapper.unmount()
  })

  it('should tooltip work with `render-label` props', async () => {
    const options = [
      {
        label: () =>
          h(
            'a',
            {
              href: 'test1',
              target: '_blank',
              rel: 'test1'
            },
            'test1'
          ),
        key: 'test1'
      },
      {
        label: 'test2',
        key: 'test2'
      }
    ]
    const renderLabel = (option: any): any => {
      if (typeof option.label === 'function') {
        return option.label()
      }
      return h(
        'a',
        {
          href: option.key,
          rel: option.key
        },
        { default: () => option.label }
      )
    }
    const wrapper = mount(ZMenu, {
      props: {
        options
      }
    })
    expect(wrapper.find('[href="test1"]').exists()).toBe(true)
    expect(wrapper.find('[href="test2"]').exists()).toBe(false)

    await wrapper.setProps({ renderLabel })
    expect(wrapper.find('[href="test1"]').exists()).toBe(true)
    expect(wrapper.find('[target="_blank"]').exists()).toBe(true)
    expect(wrapper.find('[href="test2"]').exists()).toBe(true)
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should dropdown work with `render-label` props', async () => {
      const options = [
        {
          label: 'jj',
          key: 'jj'
        },
        {
          label: 'jay',
          key: 'jay',
          children: [
            {
              type: 'group',
              label: 'song-group',
              key: 'group',
              children: [
                {
                  label: 'fantasy',
                  key: 'fantasy'
                },
                {
                  label: 'mojito',
                  key: 'mojito'
                }
              ]
            }
          ]
        }
      ]
      const renderLabel = (option: any): any => {
        return h(
          'a',
          {
            class: option.key,
            href: option.key,
            rel: option.key
          },
          { default: () => option.label }
        )
      }
      const wrapper = mount(ZMenu, {
        props: {
          options,
          collapsed: true,
          renderLabel
        }
      })
      expect(wrapper.find('.z-submenu').exists()).toBe(true)
      await wrapper.find('.z-submenu').trigger('mouseenter')
      // Popover has delay, so we need to wait
      await sleep(150)
      expect(document.body.querySelector('.z-dropdown')).not.toEqual(null)
      expect(document.querySelectorAll('a').length).toEqual(3)
      expect(document.querySelectorAll('a.fantasy').length).toEqual(1)
      wrapper.unmount()
    })

  __FAILED__TESTCASES__ &&
    it('should dropdown work with `render-icon` props', async () => {
      const options = [
        {
          label: 'jj',
          key: 'jj'
        },
        {
          label: 'jay',
          key: 'jay',
          children: [
            {
              type: 'group',
              label: 'song-group',
              key: 'group',
              children: [
                {
                  label: 'fantasy',
                  key: 'fantasy'
                },
                {
                  label: 'mojito',
                  key: 'mojito'
                }
              ]
            }
          ]
        }
      ]
      function renderMenuIcon (): any {
        return h(ZIcon, null, { default: () => h(HappyOutline) })
      }
      const wrapper = mount(ZMenu, {
        props: {
          options,
          collapsed: true,
          renderIcon: renderMenuIcon
        }
      })
      expect(wrapper.find('.z-submenu').exists()).toBe(true)
      await wrapper.find('.z-submenu').trigger('mouseenter')
      // Popover has delay, so we need to wait
      await sleep(150)
      expect(document.body.querySelector('.z-dropdown')).not.toEqual(null)
      expect(document.querySelectorAll('.z-icon').length).toEqual(2)
      wrapper.unmount()
    })

  it('should dropdown work with `expand-icon` props', () => {
    const options = [
      {
        label: 'jj',
        key: 'jj'
      },
      {
        label: 'jay',
        key: 'jay',
        children: [
          {
            type: 'group',
            label: 'song-group',
            key: 'group',
            children: [
              {
                label: 'fantasy',
                key: 'fantasy'
              },
              {
                label: 'mojito',
                key: 'mojito'
              }
            ]
          }
        ]
      }
    ]
    function renderExpandIcon (): any {
      return h('span', { class: 'expand-icon' }, '1')
    }
    const wrapper = mount(ZMenu, {
      props: {
        options,
        expandIcon: renderExpandIcon
      }
    })
    expect(wrapper.find('.expand-icon').text()).toEqual('1')
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should dropdown work with `render-end` props', async () => {
      const options = [
        {
          label: 'jj',
          key: 'jj'
        },
        {
          label: 'jay',
          key: 'jay',
          children: [
            {
              type: 'group',
              label: 'song-group',
              key: 'group',
              children: [
                {
                  label: 'fantasy',
                  key: 'fantasy'
                },
                {
                  label: 'mojito',
                  key: 'mojito'
                }
              ]
            }
          ]
        }
      ]
      function renderMenuEnd (): any {
        return 'test'
      }
      const wrapper = mount(ZMenu, {
        props: {
          defaultExpandAll: true,
          options,
          renderEnd: renderMenuEnd
        }
      })
      expect(
        wrapper.findAll('.z-menu-item-content-header__extra').length
      ).toEqual(4)
      wrapper.unmount()
    })

  it('should accept empty object in type-checking phase', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const menu = <ZMenu options={[{}]} />
  })

  it('should work with `defaultExpandedKeys` props', async () => {
    const menuOptions = [
      {
        label: '且听风吟',
        key: 'hear-the-wind-sing'
      },
      {
        label: '舞，舞，舞',
        key: 'dance-dance-dance',
        children: [
          {
            label: '叙事者',
            key: 'narrator'
          },
          {
            label: '食物',
            key: 'food',
            children: [
              {
                label: '三明治',
                key: 'sandwich'
              }
            ]
          },
          {
            label: '过去增多，未来减少',
            key: 'the-past-increases-the-future-recedes'
          }
        ]
      }
    ]
    const defaultExpandedKeys = ['dance-dance-dance']
    const wrapper = mount(ZMenu, {
      props: {
        defaultExpandedKeys,
        options: menuOptions
      }
    })
    expect(wrapper.find('.z-submenu-children').element.children.length).toBe(3)
    wrapper.unmount()
  })

  it('accepts proper options', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const menu = (
      <ZMenu
        options={[
          {
            type: 'divider'
          },
          {
            type: 'group',
            key: 'foo'
          },
          {
            key: 'blabla',
            label: 'kirby'
          },
          {
            key: 'xxxx',
            children: [
              {
                type: 'divider'
              },
              {
                type: 'group',
                key: 'foo1'
              },
              {
                key: 'blabla1',
                label: 'kirby'
              }
            ]
          }
        ]}
      />
    )
  })

  it('should work with `hidden` prop', async () => {
    const options = [
      {
        label: 'fantasy',
        key: 'fantasy',
        show: false
      },
      {
        label: 'mojito',
        key: 'mojito'
      },
      {
        label: 'initialj',
        key: 'initialj'
      }
    ]
    const wrapper = mount(ZMenu, {
      props: {
        options
      }
    })
    expect(wrapper.findAll('.z-menu-item-content').length).toBe(2)
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should work submenu extra', async () => {
      const options: MenuOption[] = [
        {
          label: 'fantasy',
          key: 'fantasy',
          extra: 'bar',
          children: [
            {
              label: 'foo',
              key: 'foo'
            }
          ]
        }
      ]
      const wrapper = mount(ZMenu, {
        props: {
          options
        }
      })
      expect(wrapper.html()).toContain('bar')
      wrapper.unmount()
    })
})
