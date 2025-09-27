import { mount } from '@vue/test-utils'
import { h } from 'vue'
import {
  ZUpload,
  ZUploadDragger,
  ZUploadFileList,
  ZUploadTrigger
} from '../index'
import { sleep } from 'seemly'
import { ZButton } from '../../button'
import { ZButtonGroup } from '../../button-group'
import { ZCard } from '../../card'
import { ZImageGroup } from '../../image'
import { matchType } from '../src/utils'

const getMockFile = (element: Element, files: File[]): void => {
  Object.defineProperty(element, 'files', {
    get () {
      return files
    }
  })
}

describe('z-upload', () => {
  it('should work with import on demand', () => {
    mount(ZUpload)
  })

  it('should work with `show-file-list` prop', async () => {
    const wrapper = mount(ZUpload)

    await wrapper.setProps({ showFileList: true })
    expect(wrapper.find('.z-upload-file-list').exists()).toBe(true)

    await wrapper.setProps({ showFileList: false })
    expect(wrapper.find('.z-upload-file-list').exists()).not.toBe(true)
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(ZUpload)
    const disabledClasses = ['z-upload-trigger--disabled']
    for (const disabledClass of disabledClasses) {
      expect(wrapper.find(disabledClass).exists()).not.toBe(true)
    }
    await wrapper.setProps({ disabled: true })
    for (const disabledClass of disabledClasses) {
      expect(
        wrapper.find('.' + disabledClass.split('--')[0]).classes()
      ).toContain(disabledClass)
    }
  })

  it('should work with `on-before-upload` prop', async () => {
    const onBeforeUpload = jest.fn(async () => true)
    const onChange = jest.fn()
    const wrapper = mount(ZUpload, {
      props: {
        onBeforeUpload,
        onChange
      }
    })
    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.txt')]

    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)
    expect(onBeforeUpload).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalled()
  })
  it('should work with `create-thumbnail-url` prop', async () => {
    const createThumbnailUrl = async (): Promise<string> => '/testThumbUrl.png'
    const wrapper = mount(ZUpload, {
      props: {
        listType: 'image',
        createThumbnailUrl,
        // It should be aligned with prop's default implementation
        shouldUseThumbnailUrl: () => true
      }
    })
    const input = wrapper.find('input')
    const fileList = [new File(['index'], 'file.jpeg')]
    getMockFile(input.element, fileList)
    await input.trigger('change')
    await sleep(0)
    expect(
      wrapper.find('.z-upload-file-info__thumbnail img').attributes('src')
    ).toEqual('/testThumbUrl.png')
  })

  __FAILED__TESTCASES__ &&
    it('should work with `list-type` prop', async () => {
      const wrapper = mount(ZUpload, {
        props: {
          listType: 'text',
          action: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f'
        },
        slots: {
          default: () => 'test'
        }
      })
      const input = wrapper.find('input')
      const fileList = [new File(['index'], 'file.txt')]

      getMockFile(input.element, fileList)
      await input.trigger('change')

      await sleep(0)
      expect(wrapper.findAll('.z-upload-file--text-type').length).toBe(1)

      await wrapper.setProps({
        listType: 'image'
      })
      expect(wrapper.findAll('.z-upload-file--image-type').length).toBe(1)

      await wrapper.setProps({
        listType: 'image-card'
      })
      expect(wrapper.findAll('.z-upload-file--image-card-type').length).toBe(1)
      expect(wrapper.findAll('.z-upload-trigger--image-card').length).toBe(1)
      expect(wrapper.findAll('.z-upload-dragger').length).toBe(1)
    })

  __FAILED__TESTCASES__ &&
    it('should work with `on-preview` prop', async () => {
      const onPreview = jest.fn()
      const wrapper = mount(ZUpload, {
        props: {
          defaultFileList: [
            {
              name: 'test.png',
              url: '/testUrl.png',
              status: 'finished',
              id: 'test',
              percentage: 100,
              file: null
            }
          ],
          onPreview
        }
      })
      const urlName = wrapper.findAll('.z-upload-file-info__name > a')[0]
      await urlName.trigger('click')

      expect(onPreview).toHaveBeenCalled()
    })

  __FAILED__TESTCASES__ &&
    it('should work with `show-remove-button` and `on-remove` prop', async () => {
      const onRemove = jest.fn()
      const wrapper = mount(ZUpload, {
        props: {
          defaultFileList: [
            {
              name: 'test.png',
              url: '/testUrl.png',
              status: 'finished',
              id: 'test',
              percentage: 100,
              file: null
            }
          ],
          onRemove,
          showRemoveButton: false
        }
      })
      let button = wrapper.find('.z-button--default-type')
      expect(button.exists()).not.toBe(true)

      await wrapper.setProps({
        showRemoveButton: true
      })

      button = wrapper.find('.z-button--default-type')
      expect(button.exists()).toBe(true)

      await button.trigger('click')
      expect(onRemove).toHaveBeenCalled()
    })

  __FAILED__TESTCASES__ &&
    it('should work with `show-cancel-button` and `on-remove` prop', async () => {
      const onRemove = jest.fn()
      const wrapper = mount(ZUpload, {
        props: {
          defaultFileList: [
            {
              name: 'test.png',
              url: '/testUrl.png',
              status: 'error',
              id: 'test',
              percentage: 0,
              file: null
            }
          ],
          onRemove,
          showCancelButton: false
        }
      })
      let button = wrapper.findAll('.z-button--error-type')
      expect(button.length).toEqual(1)

      await wrapper.setProps({
        showCancelButton: true
      })

      button = wrapper.findAll('.z-button--error-type')
      expect(button.length).toEqual(2)

      await button[0].trigger('click')
      expect(onRemove).toHaveBeenCalled()
    })

  it('should work with `abstract` prop', async () => {
    const wrapper = mount(ZUpload, {
      props: { abstract: true },
      slots: {
        default: () => [
          h(ZButtonGroup, null, {
            default: () => [
              h(ZButton, null, { default: () => 'button1' }),
              h(
                ZUploadTrigger,
                { abstract: true },
                {
                  default: () =>
                    h(
                      ZButton,
                      { class: 'upload-button' },
                      { default: () => 'upload button' }
                    )
                }
              )
            ]
          }),
          h(ZCard, null, { default: () => h(ZUploadFileList, null) })
        ]
      }
    })
    const uploadWrapperDom = wrapper.find('.z-upload')
    const uploadTriggerDom = wrapper.find('.upload-button')
    const uploadFileLIstDom = wrapper.find('.z-upload-file-list')

    expect(uploadWrapperDom.exists()).toBe(false)
    expect(uploadTriggerDom.exists()).toBe(true)
    expect(uploadFileLIstDom.exists()).toBe(true)
  })

  it('should work with `accept` prop', async () => {
    const wrapper = mount(ZUpload)
    expect(wrapper.find('input').attributes('accept')).not.toBe('.doc')

    await wrapper.setProps({
      accept: '.doc'
    })
    expect(wrapper.find('input').attributes('accept')).toBe('.doc')
  })

  it('should work with `multiple` prop', async () => {
    const wrapper = mount(ZUpload)
    expect(wrapper.find('input').attributes('multiple')).not.toBe('')

    await wrapper.setProps({
      multiple: true
    })
    expect(wrapper.find('input').attributes('multiple')).toBe('')
  })
  it('should work with `abstract`prop when `list-type` is not image-card', async () => {
    try {
      mount(ZUpload, {
        props: {
          abstract: true,
          listType: 'image-card'
        }
      })
    } catch (error) {
      expect(String(error)).toBe(
        'Error: [@zeta-gds/components/upload]: when the list-type is image-card, abstract is not supported.'
      )
    }
  })
  it('should work with `max` prop', async () => {
    const wrapper = mount(ZUpload, {
      props: {
        defaultFileList: [
          {
            name: 'test.png',
            url: '/testUrl.png',
            status: 'finished',
            id: 'test',
            percentage: 100,
            file: null
          }
        ],
        max: 1
      }
    })
    const triggerDisabledElement = wrapper.find('.z-upload-trigger--disabled')

    expect(triggerDisabledElement.exists()).toBe(true)
  })
})

describe('z-upload-file-list', () => {
  it('should work', async () => {
    const wrapper = mount(ZUpload, {
      props: {
        abstract: true,
        defaultFileList: [
          {
            name: 'test.png',
            url: '/testUrl.png',
            status: 'finished',
            id: 'test',
            percentage: 100,
            file: null
          }
        ]
      },
      slots: {
        default: () => [
          h(ZCard, null, { default: () => h(ZUploadFileList, null) })
        ]
      }
    })

    const fileList = wrapper.findAll('.z-upload-file')
    expect(fileList.length).toEqual(1)
  })
  it('should work with `list-type` prop', async () => {
    const wrapper = mount(ZUpload, {
      props: {
        listType: 'image-card',
        defaultFileList: [
          {
            name: 'test.png',
            url: '/testUrl.png',
            status: 'finished',
            id: 'test',
            percentage: 100,
            file: null
          }
        ]
      }
    })
    expect(wrapper.findAll('.z-upload-file--image-card-type').length).toBe(1)
    expect(wrapper.findComponent(ZImageGroup).exists()).toBe(true)
  })
  it('should work inside `z-upload`', async () => {
    try {
      mount(ZUploadFileList)
    } catch (error) {
      expect(String(error)).toBe(
        'Error: [@zeta-gds/components/upload-file-list]: `z-upload-file-list` must be placed inside `z-upload`.'
      )
    }
  })
})

describe('z-upload-trigger', () => {
  it('should work', async () => {
    const wrapper = mount(ZUpload, {
      props: { abstract: true },
      slots: {
        default: () => [
          h(ZButtonGroup, null, {
            default: () => [
              h(ZButton, null, { default: () => 'button1' }),
              h(
                ZUploadTrigger,
                { abstract: true },
                {
                  default: () =>
                    h(
                      ZButton,
                      { class: 'upload-button' },
                      { default: () => 'upload button' }
                    )
                }
              )
            ]
          }),
          h(ZCard, null, { default: () => h(ZUploadFileList, null) })
        ]
      }
    })

    const uploadButton = wrapper.findAll('.upload-button')
    expect(uploadButton.length).toEqual(1)
  })
  it('should work inside `z-upload`', async () => {
    try {
      mount(ZUploadTrigger)
    } catch (error) {
      expect(String(error)).toBe(
        'Error: [@zeta-gds/components/upload-trigger]: `z-upload-trigger` must be placed inside `z-upload`.'
      )
    }
  })

  it('should work with drag and drop', async () => {
    const wrapper = mount(ZUpload, {
      slots: {
        default: () => h(ZButton, null, { default: () => 'button1' })
      }
    })
    const triggerItem = wrapper.find('.z-upload-trigger')
    await triggerItem.trigger('click')
    await triggerItem.trigger('drop')

    expect(wrapper.vm.dragOver).toBe(false)

    await triggerItem.trigger('dragenter')
    expect(wrapper.vm.dragOver).toBe(true)

    await triggerItem.trigger('dragleave')
    expect(wrapper.vm.dragOver).toBe(false)

    await triggerItem.trigger('dragover')
    expect(wrapper.vm.dragOver).toBe(true)
  })
})

describe('z-upload-dragger', () => {
  it('should work', () => {
    mount(ZUpload, {
      slots: {
        default: () => h(ZUploadDragger, null)
      }
    })
  })
  it('should work inside `z-upload`', async () => {
    try {
      mount(ZUploadDragger)
    } catch (error) {
      expect(String(error)).toBe(
        'Error: [@zeta-gds/components/upload-dragger]: `z-upload-dragger` must be placed inside `z-upload`.'
      )
    }
  })
})

describe('match-type', () => {
  it('works', () => {
    expect(matchType('123', '', '*/*')).toEqual(true)
    expect(matchType('123', '123/123', '*/*')).toEqual(true)
    expect(matchType('123.gigig', '', '*/*')).toEqual(true)
    expect(matchType('123.jpg', 'image/jpeg', 'image/*')).toEqual(true)
    expect(matchType('123.jpg', 'image/jpeg', 'image/jpeg')).toEqual(true)
    expect(matchType('123.jpg', 'image/jpeg', 'image/gif')).toEqual(false)
    expect(matchType('123.jpeg', 'image/jpeg', 'image/*')).toEqual(true)
    expect(matchType('123.jpeg', 'image/jpeg', 'image/jpeg')).toEqual(true)
    expect(matchType('123.jpeg', 'image/jpeg', 'image/gif')).toEqual(false)
    expect(matchType('123.vue', '', 'image/gif')).toEqual(false)
    expect(matchType('123.vue', '', 'image/gif, .vue')).toEqual(true)
    expect(matchType('123.vue', '', 'image/gif, .vUe')).toEqual(true)
    expect(matchType('123.Vue', '', 'image/gif, .VUE')).toEqual(true)
    expect(matchType('123.json', 'application/json', '.json')).toEqual(true)
    expect(
      matchType('123.json', 'application/json', 'application/json')
    ).toEqual(true)
    expect(
      matchType('123.json', 'application/json', 'application/json , .json')
    ).toEqual(true)
    expect(
      matchType('123.JSON', 'application/json', 'application/json , .json')
    ).toEqual(true)
  })
})

describe('test type', () => {
  it('works', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = <ZUpload onError={() => {}} onFinish={() => {}} />
  })
})
