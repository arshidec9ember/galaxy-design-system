import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { ZEllipsis } from '../index'

describe('z-ellipsis', () => {
  it('should work with import on demand', () => {
    mount(ZEllipsis)
  })

  it('should work with base', async () => {
    const wrapper = mount(ZEllipsis, {
      props: { style: 'max-width: 10px;' },
      slots: { default: () => 'test z-ellipsis' }
    })

    expect(wrapper.find('.z-ellipsis').exists()).toBe(true)
    expect(wrapper.find('.z-ellipsis').attributes('style')).toContain(
      'text-overflow: ellipsis;'
    )
    wrapper.unmount()
  })

  it('should work with `line-clamp` prop', async () => {
    const wrapper = mount(ZEllipsis, {
      props: { lineClamp: 2 },
      slots: {
        default: () => (
          <div>
            电灯熄灭 物换星移 泥牛入海
            <br />
            黑暗好像 一颗巨石 按在胸口
            <br />
            独脚大盗 百万富翁 摸爬滚打
          </div>
        )
      }
    })

    expect(wrapper.find('.z-ellipsis').classes()).toContain(
      'z-ellipsis--line-clamp'
    )
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('should work with `expand-trigger` prop', async () => {
      const wrapper = mount(ZEllipsis, {
        props: {
          expandTrigger: 'click',
          tooltip: false
        },
        slots: { default: () => 'test z-ellipsis' }
      })

      await wrapper.trigger('click')
      expect(wrapper.find('.z-ellipsis').attributes('style')).not.toContain(
        'text-overflow: ellipsis;'
      )

      await wrapper.trigger('click')
      expect(wrapper.find('.z-ellipsis').attributes('style')).toContain(
        'text-overflow: ellipsis;'
      )
      wrapper.unmount()
    })
})
