import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { ZTree, type TreeOption } from '../index'

describe('z-tree', () => {
  it('should work with import on demand', () => {
    mount(ZTree)
  })

  it('should accept proper options', () => {
    mount(ZTree, {
      props: {
        data: [
          {
            label: '123',
            key: '123',
            children: [
              {
                label: '123',
                key: '123'
              }
            ]
          }
        ]
      }
    })
    mount(ZTree, {
      props: {
        data: [
          {
            label: '123',
            key: '123',
            unknown: 'unknown'
          }
        ]
      }
    })
  })

  it('should work with `prefix` and `suffix`', async () => {
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            prefix: () => 'prefix',
            suffix: () => 'suffix',
            children: [
              {
                label: '123',
                key: '123'
              }
            ]
          }
        ]
      }
    })

    expect(wrapper.find('.z-tree-node-content__prefix').exists()).toBe(true)
    expect(wrapper.find('.z-tree-node-content__prefix').text()).toBe('prefix')
    expect(wrapper.find('.z-tree-node-content__text').exists()).toBe(true)
    expect(wrapper.find('.z-tree-node-content__text').text()).toBe('test')
    expect(wrapper.find('.z-tree-node-content__suffix').exists()).toBe(true)
    expect(wrapper.find('.z-tree-node-content__suffix').text()).toBe('suffix')
  })

  it('should work with `render-option-label`, `render-option-start` and `render-option-end`', async () => {
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '123',
                key: '123'
              }
            ]
          }
        ],
        renderOptionStart: () => 'prefix',
        renderOptionLabel: () => 'label',
        renderOptionEnd: () => 'suffix'
      }
    })

    expect(wrapper.find('.z-tree-node-content__prefix').exists()).toBe(true)
    expect(wrapper.find('.z-tree-node-content__prefix').text()).toBe('prefix')
    expect(wrapper.find('.z-tree-node-content__text').exists()).toBe(true)
    expect(wrapper.find('.z-tree-node-content__text').text()).toBe('label')
    expect(wrapper.find('.z-tree-node-content__suffix').exists()).toBe(true)
    expect(wrapper.find('.z-tree-node-content__suffix').text()).toBe('suffix')
  })

  it('should work with `expand`', async () => {
    const wrapper = mount(ZTree, {
      props: {
        defaultExpandedKeys: ['1'],
        data: [
          {
            type: 'group',
            label: 'test1',
            key: '1',
            children: [
              {
                label: 'test1-1',
                key: '1-1'
              }
            ]
          },
          {
            type: 'group',
            label: 'test2',
            key: '2',
            children: [
              {
                type: 'group',
                label: 'test2-1',
                key: '2-1'
              }
            ]
          }
        ]
      }
    })
    const expandNode = async (nodeText: string): Promise<void> => {
      const node = wrapper
        .findAll('.z-tree-node')
        .find((el) => el.text() === nodeText)
      if (node) {
        const switcher = node.find('.z-base-icon')
        if (switcher) {
          await switcher.trigger('click')
        }
      }
      await nextTick()
    }
    const test1Child = wrapper
      .findAll('.z-tree-node')
      .find((el) => el.text() === 'test1-1')
    let test2Child = wrapper
      .findAll('.z-tree-node')
      .find((el) => el.text() === 'test2-1')

    expect(test1Child).toBeDefined()
    expect(test2Child).not.toBeDefined()

    await expandNode('test2')
    test2Child = wrapper
      .findAll('.z-tree-node')
      .find((el) => el.text() === 'test2-1')
    expect(test2Child).toBeDefined()
  })

  it('should work with `default-expand-all`', async () => {
    const wrapper = mount(ZTree, {
      props: {
        defaultExpandAll: true
      }
    })
    await wrapper.setProps({
      data: [
        {
          label: 'test1',
          key: '1',
          children: [
            {
              label: 'test1-1',
              key: '1-1'
            }
          ]
        },
        {
          label: 'test2',
          key: '2',
          children: [
            {
              label: 'test2-1',
              key: '2-1'
            }
          ]
        }
      ]
    })
    const test1Child = wrapper
      .findAll('.z-tree-node')
      .find((el) => el.text() === 'test1-1')
    const test2Child = wrapper
      .findAll('.z-tree-node')
      .find((el) => el.text() === 'test2-1')

    expect(test1Child).toBeDefined()
    expect(test2Child).toBeDefined()
  })

  it('should work with `checkable` and `defaultCheckedKeys`', () => {
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        checkable: true,
        defaultCheckedKeys: ['1231']
      }
    })

    expect(wrapper.html()).toContain('z-tree-node--checkable')
  })

  it('should work with `draggable`', () => {
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        draggable: true
      }
    })

    expect(wrapper.find('.z-tree-node-content').html()).toContain(
      'draggable="true"'
    )
  })

  it('should work with `blockNode`', () => {
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        blockNode: true
      }
    })

    expect(wrapper.find('.z-tree--block-node').exists()).toBe(true)
  })

  it('should work with `blockLine`', () => {
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        blockLine: true
      }
    })

    expect(wrapper.find('.z-tree--block-line').exists()).toBe(true)
  })

  it('should work witch `selectable`', async () => {
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ]
      }
    })
    expect(wrapper.find('.z-tree-node--selectable').exists()).toBe(true)
    await wrapper.setProps({ selectable: false })
    expect(wrapper.find('.z-tree-node--selectable').exists()).not.toBe(true)
  })

  it('should work witch `cancelable`', async () => {
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ]
      }
    })

    const node = wrapper.findAll('.z-tree-node-content')
    await node[0].trigger('click')
    expect(wrapper.find('.z-tree-node--selected').exists()).toBe(true)
    await node[0].trigger('click')
    expect(wrapper.find('.z-tree-node--selected').exists()).not.toBe(true)

    await wrapper.setProps({ cancelable: false })
    await node[0].trigger('click')
    expect(wrapper.find('.z-tree-node--selected').exists()).toBe(true)
    await node[0].trigger('click')
    expect(wrapper.find('.z-tree-node--selected').exists()).toBe(true)
  })

  it('should work with `disabled`', () => {
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            disabled: true,
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ]
      }
    })

    expect(wrapper.find('.z-tree-node--disabled').exists()).toBe(true)
  })

  it('should work with `children-field`', () => {
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            disabled: true,
            nodes: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        childrenField: 'nodes',
        defaultExpandAll: true
      }
    })

    expect(wrapper.findAll('.z-tree-node')[1].text()).toBe('1231')
  })

  it('should work with `onLoad`', async () => {
    const onLoad = jest.fn()
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: 'test',
            key: 1,
            disabled: true,
            children: [
              {
                label: '1231',
                key: 3
              }
            ]
          },
          {
            label: 'test',
            key: 2,
            disabled: true,
            children: [
              {
                label: '1231',
                key: 4
              }
            ]
          }
        ],
        'expanded-keys': [1],
        remote: true,
        onLoad
      }
    })
    setTimeout(() => {
      void (async () => {
        expect(onLoad).toHaveBeenCalled()
        await wrapper.setProps({ expandedKeys: [1, 2] })
        expect(onLoad).toHaveBeenCalled()
      })()
    }, 0)
  })

  it('should work witch `multiple`', async () => {
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          },
          {
            label: '3',
            key: '3'
          }
        ]
      }
    })
    const node = wrapper.findAll('.z-tree-node-content')
    await node[0].trigger('click')
    await node[1].trigger('click')
    expect(wrapper.findAll('.z-tree-node--selected').length).toBe(1)
    await wrapper.setProps({ multiple: true })
    await node[0].trigger('click')
    expect(wrapper.findAll('.z-tree-node--selected').length).toBe(2)
  })

  it('should work with `click line to checked`', async () => {
    const wrapper = mount(ZTree, {
      props: {
        cascade: true,
        checkable: true,
        checkOnClick: true,
        data: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          },
          {
            label: '3',
            key: '3'
          }
        ]
      }
    })
    const node = wrapper.findAll('.z-tree-node-content')
    await node[0].trigger('click')
    expect(wrapper.findAll('.z-checkbox--checked').length).toBe(1)
    await node[0].trigger('click')
    expect(wrapper.findAll('.z-checkbox--checked').length).toBe(0)
    await node[0].trigger('click')
    await node[1].trigger('click')
    expect(wrapper.findAll('.z-checkbox--checked').length).toBe(2)
    await wrapper.setProps({ checkOnClick: false })
    await node[0].trigger('click')
    expect(wrapper.findAll('.z-checkbox--checked').length).toBe(2)
    await node[1].trigger('click')
    expect(wrapper.findAll('.z-checkbox--checked').length).toBe(2)
  })

  it('should work with `click line to checked when checkOnClick is function`', async () => {
    function checkOnClick (node: TreeOption): boolean {
      return node.label === '1-1'
    }

    const wrapper = mount(ZTree, {
      props: {
        expandOnClick: true,
        checkOnClick,
        cascade: true,
        checkable: true,
        data: [
          {
            label: '1',
            key: '1',
            children: [
              {
                label: '1-1',
                key: '1-1'
              },
              {
                label: '1-2',
                key: '1-2'
              }
            ]
          },
          {
            label: '2',
            key: '2',
            children: [
              {
                label: '2-1',
                key: '2-1'
              },
              {
                label: '2-2',
                key: '2-2'
              }
            ]
          },
          {
            label: '3',
            key: '3'
          }
        ]
      }
    })
    const node = wrapper.findAll('.z-tree-node-content')
    await node[0].trigger('click')
    expect(wrapper.findAll('.z-checkbox--checked').length).toBe(0)
    const childNode = wrapper.findAll('.z-tree-node-content')
    await childNode[1].trigger('click')
    expect(wrapper.findAll('.z-checkbox--checked').length).toBe(1)
    expect(wrapper.findAll('.z-checkbox--indeterminate').length).toBe(1)
    await childNode[2].trigger('click')
    expect(wrapper.findAll('.z-checkbox--checked').length).toBe(1)
    expect(wrapper.findAll('.z-checkbox--indeterminate').length).toBe(1)
  })

  it('should work with `node-props` prop', async () => {
    const testClass = 'menu-test'
    const wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          },
          {
            label: '3',
            key: '3'
          }
        ],
        nodeProps: () => ({ class: testClass })
      }
    })
    expect(wrapper.find('.z-tree-node').classes()).toContain(testClass)
  })

  it('should work with `checkbox-placement` prop', async () => {
    let wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          },
          {
            label: '3',
            key: '3'
          }
        ],
        checkable: true
      }
    })
    expect(wrapper.find('.z-tree-node-checkbox--right').exists()).toBe(false)

    wrapper = mount(ZTree, {
      props: {
        data: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          },
          {
            label: '3',
            key: '3'
          }
        ],
        checkable: true,
        checkboxPlacement: 'right'
      }
    })
    expect(wrapper.find('.z-tree-node-checkbox--right').exists()).toBe(true)

    wrapper.unmount()
  })
})
