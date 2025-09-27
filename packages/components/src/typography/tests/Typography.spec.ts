import { h } from 'vue'
import { mount } from '@vue/test-utils'
import {
  ZA,
  ZText,
  ZH1,
  ZH2,
  ZH6,
  ZH5,
  ZH4,
  ZH3,
  ZUl,
  ZOl,
  ZLi,
  ZBlockquote
} from '../index'

describe('z-a', () => {
  it('should work with import on demand', () => {
    mount(ZA)
  })

  it('should work with normal', () => {
    const wrapper = mount(ZA, { props: { href: '/test' } })

    expect(wrapper.find('a').classes()).toContain('z-a')
    expect(wrapper.find('a').attributes('href')).toBe('/test')
  })
})

describe('z-text', () => {
  it('should work with import on demand', () => {
    mount(ZText)
  })

  it('should work with `color` prop', async () => {
    const wrapper = mount(ZText, { slots: { default: () => 'test' } })

    expect(wrapper.find('.z-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ color: 'info' })
    expect(wrapper.find('.z-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ color: 'success' })
    expect(wrapper.find('.z-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ color: 'warning' })
    expect(wrapper.find('.z-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ color: 'error' })
    expect(wrapper.find('.z-text').attributes('style')).toMatchSnapshot()
  })

  it('should work with Font style', () => {
    let wrapper

    wrapper = mount(ZText, {
      props: { strong: true },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.z-text').classes()).toContain('z-text--strong')

    wrapper = mount(ZText, {
      props: { italic: true },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.z-text').classes()).toContain('z-text--italic')

    wrapper = mount(ZText, {
      props: { underline: true },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.z-text').classes()).toContain('z-text--underline')

    wrapper = mount(ZText, {
      props: { delete: true },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.z-text').classes()).toContain('z-text--delete')

    wrapper = mount(ZText, {
      props: { code: true },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.z-text').classes()).toContain('z-text--code')
  })

  it('should work with `opacity` prop', async () => {
    const wrapper = mount(ZText, { slots: { default: () => 'test' } })

    expect(wrapper.find('.z-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ opacity: 1 })
    expect(wrapper.find('.z-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ opacity: 2 })
    expect(wrapper.find('.z-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ opacity: 3 })
    expect(wrapper.find('.z-text').attributes('style')).toMatchSnapshot()
  })

  it('should work with `tag` prop', async () => {
    const wrapper = mount(ZText, {
      props: { tag: 'div' },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.z-text').html()).toContain('test</div>')
  })
})

describe('z-h1 z-h2 z-h3 z-h4 z-h5 z-h6', () => {
  it('should work with import on demand', () => {
    mount(ZH1)
    mount(ZH2)
    mount(ZH3)
    mount(ZH4)
    mount(ZH5)
    mount(ZH6)
  })

  __FAILED__TESTCASES__ &&
    it('should work with normal', async () => {
      let wrapper: any

      wrapper = mount(ZH1, {
        props: { prefix: 'bar', indent: true },
        slots: { default: () => 'test' }
      })
      ;(['z-h1', 'z-h--prefix-bar', 'z-h--indent'] as const).forEach((item) => {
        expect(wrapper.find('.z-h').classes()).toContain(item)
      })
      expect(wrapper.find('.z-h').attributes('style')).toMatchSnapshot()

      wrapper = mount(ZH2, {
        props: { prefix: 'bar', indent: true, type: 'default' },
        slots: { default: () => 'test' }
      })
      ;(['z-h2', 'z-h--prefix-bar', 'z-h--indent'] as const).forEach((item) => {
        expect(wrapper.find('.z-h').classes()).toContain(item)
      })
      expect(wrapper.find('.z-h').attributes('style')).toMatchSnapshot()

      wrapper = mount(ZH3, {
        props: { prefix: 'bar', indent: true, type: 'success' },
        slots: { default: () => 'test' }
      })
      ;(['z-h3', 'z-h--prefix-bar', 'z-h--indent'] as const).forEach((item) => {
        expect(wrapper.find('.z-h').classes()).toContain(item)
      })
      expect(wrapper.find('.z-h').attributes('style')).toMatchSnapshot()

      wrapper = mount(ZH4, {
        props: { prefix: 'bar', indent: true, type: 'info' },
        slots: { default: () => 'test' }
      })
      ;(['z-h4', 'z-h--prefix-bar', 'z-h--indent'] as const).forEach((item) => {
        expect(wrapper.find('.z-h').classes()).toContain(item)
      })
      expect(wrapper.find('.z-h').attributes('style')).toMatchSnapshot()

      wrapper = mount(ZH5, {
        props: { prefix: 'bar', indent: true, type: 'warning' },
        slots: { default: () => 'test' }
      })
      ;(['z-h5', 'z-h--prefix-bar', 'z-h--indent'] as const).forEach((item) => {
        expect(wrapper.find('.z-h').classes()).toContain(item)
      })
      expect(wrapper.find('.z-h').attributes('style')).toMatchSnapshot()

      wrapper = mount(ZH6, {
        props: { prefix: 'bar', indent: true, type: 'error' },
        slots: { default: () => 'test' }
      })
      ;(['z-h6', 'z-h--prefix-bar', 'z-h--indent'] as const).forEach((item) => {
        expect(wrapper.find('.z-h').classes()).toContain(item)
      })
      expect(wrapper.find('.z-h').attributes('style')).toMatchSnapshot()
    })
})

describe('z-ul z-ol z-li', () => {
  it('should work with import on demand', () => {
    mount(ZUl)
    mount(ZOl)
    mount(ZLi)
  })

  it('should work with normal', () => {
    let wrapper = mount(ZUl, {
      props: { indent: true },
      slots: {
        default: () =>
          h(ZLi, null, {
            default: () => 'test'
          })
      }
    })
    ;(['z-ul', 'z-ul--indent'] as const).forEach((item) => {
      expect(wrapper.find('ul').classes()).toContain(item)
    })
    expect(wrapper.find('li').text()).toBe('test')
    expect(wrapper.find('ul').attributes('style')).toMatchSnapshot()

    wrapper = mount(ZOl, {
      props: { indent: true },
      slots: {
        default: () =>
          h(ZLi, null, {
            default: () => 'test'
          })
      }
    })
    ;(['z-ol', 'z-ol--indent'] as const).forEach((item) => {
      expect(wrapper.find('ol').classes()).toContain(item)
    })
    expect(wrapper.find('li').text()).toBe('test')
    expect(wrapper.find('ol').attributes('style')).toMatchSnapshot()
  })
})

describe('z-blockquote', () => {
  it('should work with import on demand', () => {
    mount(ZBlockquote)
  })

  it('should work with normal', () => {
    const wrapper = mount(ZBlockquote, {
      props: { indent: true },
      slots: { default: () => 'test' }
    })

    ;(['z-blockquote', 'z-blockquote--indent'] as const).forEach((item) => {
      expect(wrapper.find('blockquote').classes()).toContain(item)
    })
    expect(wrapper.find('blockquote').attributes('style')).toMatchSnapshot()
  })
})
