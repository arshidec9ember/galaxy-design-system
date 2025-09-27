import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { ZStep, ZStepper } from '../index'
import { ZIcon } from '../../icon'
import { CloseIcon as ErrorIcon } from '../../_internal/icons'

describe('z-stepper', () => {
  it('should work with import on demand', () => {
    mount(ZStepper)
  })

  __FAILED__TESTCASES__ &&
    it('should work with `current` prop', async () => {
      const processStyle =
        '--z-description-text-color: rgb(51, 54, 57); --z-header-text-color: rgb(31, 34, 37); --z-indicator-border-color: #000; --z-indicator-color: #18a058;'
      const waitStyle =
        '--z-description-text-color: rgba(194, 194, 194, 1); --z-header-text-color: rgba(194, 194, 194, 1); --z-indicator-border-color: rgba(194, 194, 194, 1); --z-indicator-color: #0000;'
      const finishStyle =
        ' --z-description-text-color: rgba(194, 194, 194, 1); --z-header-text-color: rgba(194, 194, 194, 1); --z-indicator-border-color: #18a058; --z-indicator-color: #0000;'
      const wrapper = mount(ZStepper, {
        slots: {
          default: () => [
            h(ZStep, {
              title: 'test1',
              description: 'test1',
              internalIndex: 1
            }),
            h(ZStep, {
              title: 'test2',
              description: 'test2',
              internalIndex: 2
            }),
            h(ZStep, { title: 'test3', description: 'test3', internalIndex: 3 })
          ]
        }
      })

      wrapper.findAll('.z-step').forEach((item) => {
        expect(item.attributes('style')).toContain(processStyle)
      })

      await wrapper.setProps({ current: 1 })
      expect(wrapper.findAll('.z-step')[0].attributes('style')).toContain(
        processStyle
      )
      expect(wrapper.findAll('.z-step')[1].attributes('style')).toContain(
        waitStyle
      )
      expect(wrapper.findAll('.z-step')[2].attributes('style')).toContain(
        waitStyle
      )

      await wrapper.setProps({ current: 2 })
      expect(wrapper.findAll('.z-step')[0].attributes('style')).toContain(
        finishStyle
      )
      expect(wrapper.findAll('.z-step')[1].attributes('style')).toContain(
        processStyle
      )
      expect(wrapper.findAll('.z-step')[2].attributes('style')).toContain(
        waitStyle
      )

      await wrapper.setProps({ current: 3 })
      expect(wrapper.findAll('.z-step')[0].attributes('style')).toContain(
        finishStyle
      )
      expect(wrapper.findAll('.z-step')[1].attributes('style')).toContain(
        finishStyle
      )
      expect(wrapper.findAll('.z-step')[2].attributes('style')).toContain(
        processStyle
      )
    })

  it('should work with `size` prop', async () => {
    const mediumStyle =
      '--z-indicator-icon-size: 24px; --z-indicator-index-font-size: 14px; --z-indicator-size: 24px;'
    const smallStyle =
      '--z-bezier: cubic-bezier(.4, 0, .2, 1); --z-description-text-color: rgb(51, 54, 57); --z-header-text-color: rgb(31, 34, 37); --z-step-header-font-weight: 500; --z-hover-text-color: #000; --z-hover-description-color: #000; --z-hover-indicator-color: #FFF; --z-hover-indicator-border-color: #000; --z-indicator-border-color: #000; --z-indicator-color: #000; --z-indicator-icon-size: 18px; --z-indicator-index-font-size: 12px; --z-indicator-size: 18px; --z-indicator-text-color: #fff; --z-indicator-icon-color: rgb(31, 34, 37); --z-splitor-color: rgba(194, 194, 194, 1); --z-splitor-border-style: dashed; --z-step-header-font-size: 12px;'
    const wrapper = mount(ZStepper, {
      props: {
        current: 1
      },
      slots: {
        default: () =>
          h(ZStep, { title: 'test1', description: 'test1', internalIndex: 1 })
      }
    })
    expect(wrapper.find('.z-step').attributes('style')).toContain(mediumStyle)
    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.z-step').attributes('style')).toContain(smallStyle)
  })

  it('should work with `vertical` prop', async () => {
    const wrapper = mount(ZStepper, {
      props: {
        current: 1
      },
      slots: {
        default: () =>
          h(ZStep, { title: 'test1', description: 'test1', internalIndex: 1 })
      }
    })
    expect(wrapper.find('.z-stepper').classes()).not.toContain(
      'z-stepper--vertical'
    )
    await wrapper.setProps({ vertical: true })
    expect(wrapper.find('.z-stepper').classes()).toContain(
      'z-stepper--vertical'
    )
  })

  it('should work with `finish-icon` and `error-icon` slots', async () => {
    const wrapper = mount(ZStepper, {
      props: {
        status: 'finish',
        current: 1
      },
      slots: {
        'finish-icon': () =>
          h(ZIcon, null, {
            default: () => 'finish'
          }),
        'error-icon': () =>
          h(ZIcon, null, {
            default: () => 'error'
          }),
        default: () =>
          h(ZStep, { title: 'test', description: 'test', internalIndex: 1 })
      }
    })

    expect(wrapper.find('.z-icon').exists()).toBe(true)
    expect(wrapper.find('.z-icon').text()).toBe('finish')

    await wrapper.setProps({ status: 'error' })
    expect(wrapper.find('.z-icon').exists()).toBe(true)
    expect(wrapper.find('.z-icon').text()).toBe('error')
  })

  __FAILED__TESTCASES__ &&
    it('should show ErrorIcon with `error` status', () => {
      const wrapper = mount(ZStepper, {
        slots: {
          default: () => h(ZStep, { internalIndex: 1, status: 'error' })
        }
      })

      expect(wrapper.findComponent(ErrorIcon).exists()).toBe(true)
    })

  it('step should work with `icon` slot', () => {
    const wrapper = mount(ZStepper, {
      props: {
        current: 1
      },
      slots: {
        default: () =>
          h(
            ZStep,
            {
              title: 'test',
              description: 'test'
            },
            {
              icon: () => h(ZIcon, null, { default: () => 'icon' })
            }
          )
      }
    })

    expect(wrapper.find('.z-icon').exists()).toBe(true)
    expect(wrapper.find('.z-icon').text()).toBe('icon')
  })
})
