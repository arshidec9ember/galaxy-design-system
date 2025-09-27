import { mount, type VueWrapper } from '@vue/test-utils'
import { h, Fragment, createCommentVNode } from 'vue'
import { ZSpace } from '../index'
import { ZConfigProvider } from '../../config-provider'
import type { Justify } from '../src/Space'
import { c } from '../../_utils/cssr'

const getChildrenNode = (wrapper: VueWrapper<any>): any[] => {
  return (
    wrapper.findAll('div').filter((v) => {
      return !v.classes().includes('z-space')
    }) || []
  )
}

describe('z-space', () => {
  it('should work with import on demand', () => {
    mount(ZSpace)
  })

  it('render empty children', () => {
    const wrapper = mount({
      render () {
        return <ZSpace />
      }
    })
    expect(wrapper.find('.z-space')).not.toBe(null)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('render space string size', () => {
    const wrapper = mount({
      render () {
        return <ZSpace size="large">{{ default: () => 'kirby' }}</ZSpace>
      }
    })
    expect(wrapper.attributes('style')).toContain('margin')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('render space number size', () => {
    const size = 20
    const wrapper = mount({
      render () {
        return <ZSpace size={size}>{{ default: () => 'kirby' }}</ZSpace>
      }
    })
    expect(wrapper.attributes('style')).toContain(`margin-top: -${size / 2}px`)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('render space array size', async () => {
    const wrapper = mount({
      render () {
        return (
          <ZSpace size={[20, 30]}>
            {{
              default: () => [<div>1</div>, <div>2</div>]
            }}
          </ZSpace>
        )
      }
    })

    const childNodes = getChildrenNode(wrapper)
    expect(childNodes[0].attributes('style')).toContain('margin-right: 20px;')

    // await wrapper.setProps({ vertical: true })
    // expect(childNodes[0].attributes('style')).toContain('margin-bottom: 30px;')
    wrapper.unmount()
  })

  it('render vertical space', () => {
    const wrapper = mount({
      render () {
        return (
          <ZSpace vertical>
            {{
              default: () => [<div>1</div>, <div>2</div>]
            }}
          </ZSpace>
        )
      }
    })
    expect(wrapper.attributes('style')).toContain('flex-direction: column;')
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `inline` prop', () => {
    const wrapper = mount(ZSpace, {
      props: {
        inline: true
      },
      slots: {
        default: () => '07akioni'
      }
    })

    expect(wrapper.attributes('style')).toContain('display: inline-flex;')
    wrapper.unmount()
  })

  it('should render with invalidElement', () => {
    const wrapper = mount({
      render () {
        return (
          <ZSpace>
            {{
              default: () => (
                <>
                  text1<span>text1</span>
                  text1
                </>
              )
            }}
          </ZSpace>
        )
      }
    })

    const childNodes = getChildrenNode(wrapper)
    expect(childNodes.length).toBe(3)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('render justify space', () => {
    const justifyList: Justify[] = [
      'start',
      'end',
      'center',
      'space-around',
      'space-between',
      'space-evenly'
    ]

    justifyList.forEach((pos) => {
      const wrapper = mount({
        render () {
          return (
            <ZSpace justify={pos}>
              {{
                default: () => [<div>1</div>, <div>2</div>]
              }}
            </ZSpace>
          )
        }
      })

      expect(wrapper.attributes('style')).toContain(
        `justify-content: ${
          ['start', 'end'].includes(pos) ? 'flex-' + pos + ';' : pos
        }`
      )
      expect(wrapper.html()).toMatchSnapshot()
      wrapper.unmount()
    })

    justifyList.forEach((pos) => {
      const wrapper = mount({
        render () {
          return (
            <ZConfigProvider rtl={[{ name: 'Space', style: c(null) }]}>
              {{
                default: () => {
                  return (
                    <ZSpace justify={pos}>
                      {{
                        default: () => [<div>1</div>, <div>2</div>]
                      }}
                    </ZSpace>
                  )
                }
              }}
            </ZConfigProvider>
          )
        }
      })

      expect(wrapper.find('.z-space').attributes('style')).toContain(
        `justify-content: ${
          ['start', 'end'].includes(pos) ? 'flex-' + pos + ';' : pos
        }`
      )
      expect(wrapper.html()).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('render custom style space', () => {
    const wrapper = mount(
      {
        render () {
          return <ZSpace>{{ default: () => 'div' }}</ZSpace>
        }
      },
      {
        props: {
          itemStyle: { backgroundColor: 'red', color: 'yellow' }
        }
      }
    )
    const childNodes = getChildrenNode(wrapper)

    expect(childNodes[0].attributes('style')).toContain(
      'background-color: red; color: yellow;'
    )
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should not render while v-if is false', () => {
    const wrapper = mount({
      render () {
        return <ZSpace>{{ default: () => false && 'div' }}</ZSpace>
      }
    })
    const childNodes = getChildrenNode(wrapper)
    expect(childNodes.length).toEqual(0)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should work with `wrap` prop', async () => {
    const wrapper = mount({
      render () {
        return (
          <ZSpace>{{ default: () => [<div>1</div>, <div>2</div>] }}</ZSpace>
        )
      }
    })
    expect(wrapper.find('.z-space').attributes('style')).toContain(
      'flex-wrap: wrap'
    )

    // await wrapper.setProps({ wrap: false })
    // expect(wrapper.find('.z-space').attributes('style')).toContain(
    //   'flex-wrap: nowrap'
    // )
    wrapper.unmount()
  })

  it('should not render while slot is Comment', () => {
    const wrapper = mount({
      render () {
        return (
          <ZSpace>
            {{
              default: () => createCommentVNode('random comment text')
            }}
          </ZSpace>
        )
      }
    })
    const childNodes = getChildrenNode(wrapper)
    expect(childNodes.length).toEqual(0)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should not render a container to wrap child elements', () => {
    const wrapper = mount(
      {
        render () {
          return (
            <ZSpace>
              {{
                default: () => [<div>1</div>, <div>2</div>]
              }}
            </ZSpace>
          )
        }
      },
      {
        props: {
          wrapItem: false,
          internalUseGap: true
        }
      }
    )

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})
