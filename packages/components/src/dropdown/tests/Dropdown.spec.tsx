import type { VueWrapper } from '@vue/test-utils/dist/vueWrapper'
import { mount } from '@vue/test-utils'
import { type ComponentPublicInstance, h, nextTick, type VNodeChild } from 'vue'
import { ZIcon } from '../../icon'
import type { DropdownMixedOption } from '../src/interface'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { ZDropdown, type DropdownProps } from '../index'

const pendingOptionClassName =
  'z-dropdown-option-body z-dropdown-option-body--pending'
const optionBodySelector = '.z-dropdown-option-body'
const options = [
  {
    type: 'group',
    label: 'Names',
    key: 'main',
    children: [
      {
        label: 'Jay Gatsby',
        key: 'jay gatsby'
      },
      {
        type: 'divider',
        key: 'd1'
      },
      {
        label: 'Daisy Buchanan',
        icon () {
          return h(ZIcon, null, {
            default: () => h(CashIcon)
          })
        },
        key: 'daisy buchanan',
        disabled: true
      }
    ]
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: 'Others',
    key: 'others1',
    children: [
      {
        label: 'Jordan Baker',
        key: 'jordan baker'
      }
    ]
  }
]

const mountDropdown = ({
  onSelect,
  inverted = false,
  onClickoutside = undefined,
  options: data = options,
  show = undefined,
  renderOptionLabel = undefined,
  renderOptionIcon = undefined
}: DropdownProps = {}): VueWrapper<ComponentPublicInstance> => {
  return mount(ZDropdown, {
    attachTo: document.body,
    props: {
      options: data,
      trigger: 'click',
      onSelect,
      inverted,
      onClickoutside,
      show,
      renderOptionLabel,
      renderOptionIcon
    },
    slots: {
      default: () => 'star kirby'
    }
  })
}

describe('z-dropdown', () => {
  it('should work with import on demand', () => {
    const wrapper = mount(ZDropdown, {
      slots: {
        default: () => 'star kirby'
      }
    })
    wrapper.unmount()
  })

  it('shows menu after click', async () => {
    const wrapper = mountDropdown()

    const triggerNodeWrapper = wrapper.find('span')
    expect(triggerNodeWrapper.exists()).toBe(true)
    await triggerNodeWrapper.trigger('click')

    expect(document.querySelector('.z-dropdown')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('shows arrow', async () => {
    const wrapper = mountDropdown()

    const triggerNodeWrapper = wrapper.find('span')
    expect(triggerNodeWrapper.exists()).toBe(true)
    await triggerNodeWrapper.trigger('click')

    expect(document.querySelector('.z-popover-arrow-wrapper')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('dropdown disabled', async () => {
    const onSelect = jest.fn()
    const wrapper = mountDropdown({ onSelect })

    const triggerNodeWrapper = wrapper.find('span')
    expect(triggerNodeWrapper.exists()).toBe(true)
    await triggerNodeWrapper.trigger('click')

    const disabledMenu = document.querySelector(
      '.z-dropdown-option-body--disabled'
    ) as HTMLDivElement

    expect(disabledMenu).not.toEqual(null)

    disabledMenu.click()

    expect(onSelect).not.toHaveBeenCalledWith()

    wrapper.unmount()
  })

  it('inverted style', async () => {
    const wrapper = mountDropdown({ inverted: true })

    const triggerNodeWrapper = wrapper.find('span')
    expect(triggerNodeWrapper.exists()).toBe(true)
    await triggerNodeWrapper.trigger('click')

    expect(document.querySelector('.z-dropdown')).toMatchSnapshot()
    wrapper.unmount()
  })

  __FAILED__TESTCASES__ &&
    it('keyboard event', async () => {
      const onSelect = jest.fn()
      let wrapper = mountDropdown({ onSelect })

      let triggerNodeWrapper = wrapper.find('span')
      await triggerNodeWrapper.trigger('click')

      await triggerNodeWrapper.trigger('keydown', {
        key: 'ArrowDown'
      })
      let options = document.querySelectorAll(optionBodySelector)
      expect(options[1].className).toEqual(pendingOptionClassName)

      await triggerNodeWrapper.trigger('keydown', {
        key: 'ArrowDown'
      })
      await triggerNodeWrapper.trigger('keydown', {
        key: 'ArrowRight'
      })
      options = document.querySelectorAll(optionBodySelector)
      expect(options.length).toBe(5)
      expect(options[3].className).toEqual(pendingOptionClassName)
      expect(options[4].className).toEqual(pendingOptionClassName)

      await triggerNodeWrapper.trigger('keydown', {
        key: 'ArrowLeft'
      })
      options = document.querySelectorAll(optionBodySelector)
      expect(options.length).toBe(4)

      await triggerNodeWrapper.trigger('keydown', {
        key: 'ArrowUp'
      })
      expect(options[1].className).toEqual(pendingOptionClassName)
      await triggerNodeWrapper.trigger('keydown', {
        key: 'Enter'
      })
      expect(onSelect).toHaveBeenCalledWith('jay gatsby', {
        key: 'jay gatsby',
        label: 'Jay Gatsby'
      })

      wrapper.unmount()
      wrapper = mountDropdown({ onSelect })

      triggerNodeWrapper = wrapper.find('span')
      await triggerNodeWrapper.trigger('click')
      await triggerNodeWrapper.trigger('keydown', {
        key: 'Escape'
      })
      expect(document.querySelector('.z-dropdown')).toBeNull()

      wrapper.unmount()
    })

  __FAILED__TESTCASES__ &&
    it('option mouse event', async () => {
      const onSelect = jest.fn()
      const wrapper = mountDropdown({ onSelect })

      const triggerNodeWrapper = wrapper.find('span')
      expect(triggerNodeWrapper.exists()).toBe(true)
      await triggerNodeWrapper.trigger('click')

      const options = document.querySelectorAll(optionBodySelector)

      const mouseEnter = new Event('mouseenter')
      options[1].dispatchEvent(mouseEnter)
      await nextTick(() => {
        expect(options[1].className).toEqual(pendingOptionClassName)
      })

      const mouseMove = new Event('mousemove')
      options[3].dispatchEvent(mouseMove)
      await nextTick(() => {
        expect(options[1].className).not.toEqual(pendingOptionClassName)
        expect(options[3].className).toEqual(pendingOptionClassName)
      })
      ;(options[3] as HTMLDivElement).click()
      expect(onSelect).not.toHaveBeenCalledWith()

      const mouseLeave = new Event('mouseleave')
      Object.defineProperty(mouseLeave, 'relatedTarget', {
        writable: false,
        value: options[1]
      })
      options[1].dispatchEvent(mouseEnter)
      options[3].dispatchEvent(mouseLeave)
      await nextTick(() => {
        expect(options[3].className).not.toEqual(pendingOptionClassName)
      })
      wrapper.unmount()
    })

  __FAILED__TESTCASES__ &&
    it('dropdown clickoutside', async () => {
      const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
      const mouseupEvent = new MouseEvent('mouseup', { bubbles: true })

      const onClickoutside = jest.fn()
      const wrapper = mountDropdown({ onClickoutside })

      const triggerNodeWrapper = wrapper.find('span')
      expect(triggerNodeWrapper.exists()).toBe(true)
      await triggerNodeWrapper.trigger('click')
      expect(document.querySelector('.z-dropdown')).toMatchSnapshot()
      document.body.dispatchEvent(mousedownEvent)
      document.body.dispatchEvent(mouseupEvent)
      await nextTick(() => {
        const nextOptions = document.querySelectorAll(optionBodySelector)
        expect(nextOptions.length).toBe(0)
      })
      expect(onClickoutside).toHaveBeenCalled()
    })

  __FAILED__TESTCASES__ &&
    it('should work with `render-option-label` props', async () => {
      const renderDropdownLabel = (option: DropdownMixedOption): VNodeChild => {
        return h(
          'a',
          {
            href: 'renderLabel'
          },
          { default: () => option.label }
        )
      }
      const wrapper = mountDropdown({
        renderOptionLabel: renderDropdownLabel
      })
      const triggerNodeWrapper = wrapper.find('span')
      await triggerNodeWrapper.trigger('click')
      expect(document.querySelector('.z-dropdown')).toMatchSnapshot()
      expect(
        document.querySelectorAll('.z-dropdown a[href="renderLabel"]').length
      ).toBe(4)
      wrapper.unmount()
    })

  __FAILED__TESTCASES__ &&
    it('should work with `render-option-icon` props', async () => {
      const renderDropdownIcon = (option: DropdownMixedOption): VNodeChild => {
        return h(ZIcon, null, {
          default: () => h(CashIcon)
        })
      }
      const wrapper = mountDropdown({
        renderOptionIcon: renderDropdownIcon
      })
      const triggerNodeWrapper = wrapper.find('span')
      await triggerNodeWrapper.trigger('click')
      expect(document.querySelector('.z-dropdown')).toMatchSnapshot()
      expect(
        document.querySelectorAll('.z-dropdown i[class="z-icon"]').length
      ).toBe(4)
      wrapper.unmount()
    })

  it('should accept empty object in type-checking phase', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dropdown = <ZDropdown options={[{}]} />
  })
})
