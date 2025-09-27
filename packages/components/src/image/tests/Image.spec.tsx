import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { ZImage, ZImageGroup } from '../index'
import ZImagePreview from '../src/ImagePreview'

describe('z-image', () => {
  it('should work with import on demand', () => {
    mount(ZImage)
  })

  it('should work with `alt` prop', async () => {
    const wrapper = mount(ZImage)

    await wrapper.setProps({ alt: 'This is just a picture' })

    expect(wrapper.find('img').attributes('alt')).toBe('This is just a picture')
    expect(wrapper.find('img').attributes('aria-label')).toBe(
      'This is just a picture'
    )
    wrapper.unmount()
  })

  it('should work with `width` prop', async () => {
    const wrapper = mount(ZImage)

    await wrapper.setProps({ width: '200' })

    expect(wrapper.find('img').attributes('width')).toBe('200')

    await wrapper.setProps({ width: 200 })

    expect(wrapper.find('img').attributes('width')).toBe('200')
    wrapper.unmount()
  })

  it('should work with `height` prop', async () => {
    const wrapper = mount(ZImage)

    await wrapper.setProps({ height: '300' })

    expect(wrapper.find('img').attributes('height')).toBe('300')

    await wrapper.setProps({ height: 300 })

    expect(wrapper.find('img').attributes('height')).toBe('300')
    wrapper.unmount()
  })

  it('should work with `src` prop', async () => {
    const wrapper = mount(ZImage)

    await wrapper.setProps({
      src: 'https://github.githubassets.com/assets/open_collective-0a706523753d.svg'
    })

    expect(wrapper.find('img').attributes('src')).toBe(
      'https://github.githubassets.com/assets/open_collective-0a706523753d.svg'
    )
    wrapper.unmount()
  })

  it('should work with `previewSrc` prop', async () => {
    const wrapper = mount(ZImage)

    await wrapper.setProps({
      previewSrc:
        'https://github.githubassets.com/assets/open_collective-0a706523753d.svg'
    })

    expect(wrapper.find('img').attributes('data-preview-src')).toBe(
      'https://github.githubassets.com/assets/open_collective-0a706523753d.svg'
    )
    wrapper.unmount()
  })

  it('should work with `showToolbar` prop', async () => {
    const wrapper = mount(ZImage)

    await wrapper.setProps({
      showToolbar: true
    })

    await wrapper.find('img').trigger('click')

    expect(document.querySelector('.z-image-preview-toolbar')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should work with `image group` prop', async () => {
    const wrapper = mount(ZImageGroup, {
      slots: {
        default: () => [
          h(ZImage, null, {
            default: () =>
              'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
          }),
          h(ZImage, null, {
            default: () =>
              'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
          })
        ]
      }
    })

    expect(wrapper.findAll('img').length).toBe(2)

    await wrapper.findAll('img')[0].trigger('click')
    expect(wrapper.findComponent(ZImagePreview).exists()).toBe(true)
    wrapper.unmount()
  })
  it('should inherit attrs', () => {
    const wrapper = mount(ZImage, {
      attrs: {
        'data-cool': true
      }
    })
    expect(wrapper.find('[data-cool]').exists()).toEqual(true)
    wrapper.unmount()
  })

  it('should work with `onError` prop', async () => {
    const onError = jest.fn()
    const wrapper = mount(ZImage, {
      props: {
        src: 'https:// 07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        onError
      }
    })
    await wrapper.find('img').trigger('error')
    expect(onError).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `objectFit` prop', () => {
    const wrapper = mount(ZImage, {
      props: {
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        objectFit: 'contain'
      }
    })
    expect(wrapper.find('img').attributes('style')).toContain(
      'object-fit: contain;'
    )
    wrapper.unmount()
  })
  it('should work with `showToolbar close` prop', async () => {
    const wrapper = mount(ZImage, {
      props: {
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      }
    })
    await wrapper.find('img').trigger('click')
    expect(document.querySelector('.z-image-preview-toolbar')).not.toEqual(null)
    expect(wrapper.findComponent(ZImagePreview).exists()).toBe(true)
    const toolbars = document.querySelector('.z-image-preview-toolbar')
    toolbars?.children[toolbars?.children.length - 1].dispatchEvent(
      new MouseEvent('click')
    )
    await nextTick()
    expect(document.querySelector('.z-image-preview-toolbar')).toEqual(null)
    wrapper.unmount()
  })

  it('should work with `onLoad` prop', async () => {
    const onLoad = jest.fn()
    const wrapper = mount(ZImage, {
      props: {
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        onLoad
      }
    })
    await wrapper.find('img').trigger('load')
    expect(onLoad).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `canPreview` prop', async () => {
    const wrapper = mount(ZImage, {
      props: {
        previewDisabled: true
      }
    })

    await wrapper.find('img').trigger('click')
    expect(document.querySelector('.z-image-preview-overlay')).toEqual(null)
    wrapper.unmount()
  })
})
