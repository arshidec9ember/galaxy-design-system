import { mount } from '@vue/test-utils'
import { ZAvatarGroup } from '../index'

describe('z-avatar-group', () => {
  it('should work with `options` prop in `avatar group`', async () => {
    const options = [
      {
        name: 'test1',
        src: 'https://github.githubassets.com/assets/open_collective-0a706523753d.svg'
      },
      {
        name: 'test2',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'test3',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'test4',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      }
    ]
    const wrapper = mount(ZAvatarGroup, {
      props: {
        options,
        maxItems: 2
      }
    })
    expect(wrapper.findAll('.z-avatar').length).toBe(2)

    await wrapper.setProps({ vertical: true })
    expect(wrapper.find('[role="group"]').classes()).toContain(
      'z-avatar-group--vertical'
    )

    await wrapper.setProps({ maxItems: 4 })
    expect(wrapper.find('.z-avatar__text').exists()).toBe(false)

    await wrapper.setProps({ options: [] })
    expect(wrapper.findAll('.z-avatar').length).toBe(0)
    wrapper.unmount()
  })
})
