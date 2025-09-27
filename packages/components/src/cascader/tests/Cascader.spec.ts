/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { mount } from '@vue/test-utils'
import { ZCascader } from '../index'
import type { CascaderOption } from '../src/interface'
import { nextTick } from 'vue'

function getOptions (depth = 3, iterator = 1, prefix = ''): CascaderOption[] {
  const length = 12
  const options: CascaderOption[] = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, '' + String(i))
      })
    } else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    } else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}

describe('z-cascader', () => {
  it('should work with import on demand', () => {
    mount(ZCascader)
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(ZCascader)
    expect(wrapper.find('.z-base-selection').classes()).not.toContain(
      'z-base-selection--disabled'
    )

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.z-base-selection').classes()).toContain(
      'z-base-selection--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large'] as const).forEach((i) => {
      const wrapper = mount(ZCascader, { props: { size: i } })
      expect(
        wrapper.find('.z-base-selection').attributes('style')
      ).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `status` prop', async () => {
    ;(['success', 'warning', 'error'] as const).forEach((status) => {
      const wrapper = mount(ZCascader, { props: { status } })
      expect(wrapper.find('.z-base-selection').classes()).toContain(
        `z-base-selection--${status}-status`
      )
      wrapper.unmount()
    })
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(ZCascader, {
      props: { placeholder: 'test-placeholder' }
    })
    expect(wrapper.find('.z-base-selection-placeholder').text()).toBe(
      'test-placeholder'
    )
    wrapper.unmount()
  })

  it('should work with `placement` prop', async () => {
    ;(
      [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end'
      ] as const
    ).forEach((placement) => {
      const wrapper = mount(ZCascader, { props: { placement } })
      setTimeout(() => {
        expect(
          document
            .querySelector('.v-binder-follower-content')
            ?.getAttribute('v-placement')
        ).toBe(placement)
        wrapper.unmount()
      })
    })
  })

  it('should work with `filterable` prop', async () => {
    const wrapper = mount(ZCascader, {
      props: { filterable: false }
    })
    expect(wrapper.find('input').exists()).not.toBe(true)

    await wrapper.setProps({ filterable: true })
    expect(wrapper.find('input').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `default-model-value` prop', async () => {
    const wrapper = mount(ZCascader, {
      props: { options: getOptions(), defaultModelValue: 'l-1-1-2' }
    })
    expect(wrapper.find('.z-base-selection-input').text()).toBe('l-1-1-2')
    wrapper.unmount()
  })

  it('should work with `multiple` prop', async () => {
    const wrapper = mount(ZCascader, {
      props: { options: getOptions() }
    })
    expect(wrapper.find('.z-base-selection-label').exists()).toBe(true)
    expect(wrapper.find('.z-base-selection-tags').exists()).not.toBe(true)

    await wrapper.setProps({ multiple: true })

    expect(wrapper.find('.z-base-selection-tags').exists()).toBe(true)
    expect(wrapper.find('.z-base-selection-label').exists()).not.toBe(true)
    wrapper.unmount()
  })

  it('should work with `label-field` `value-field` `children-field` props', async () => {
    const wrapper = mount(ZCascader, {
      props: {
        options: [
          {
            whateverLabel: 'Rubber Soul',
            whateverValue: 'Rubber Soul',
            whateverChildren: [
              {
                whateverLabel:
                  "Everybody's Got Something to Hide Except Me and My Monkey",
                whateverValue:
                  "Everybody's Got Something to Hide Except Me and My Monkey"
              }
            ]
          }
        ],
        'label-field': 'whateverLabel',
        'value-field': 'whateverValue',
        'children-field': 'whateverChildren',
        'default-model-value':
          "Everybody's Got Something to Hide Except Me and My Monkey"
      }
    })
    expect(wrapper.find('.z-base-selection-label').text()).toBe(
      "Rubber Soul / Everybody's Got Something to Hide Except Me and My Monkey"
    )
    wrapper.unmount()
  })

  it('should work with `check-strategy=child`', async () => {
    const wrapper = mount(ZCascader, {
      attachTo: document.body,
      props: { options: getOptions(), virtualScroll: false }
    })
    await wrapper.setProps({ show: true })

    expect(document.querySelector('.z-checkbox')).not.toEqual(null)

    await wrapper.setProps({ checkStrategy: 'child' })

    expect(document.querySelector('.z-checkbox')).toEqual(null)
    wrapper.unmount()
  })

  it('should work with `on-blur` prop', async () => {
    const onBlur = jest.fn()
    const wrapper = mount(ZCascader, {
      props: { options: getOptions(), onBlur }
    })
    await wrapper.find('.z-base-selection').trigger('focusout')
    expect(onBlur).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-focus` prop', async () => {
    const onFocus = jest.fn()
    const wrapper = mount(ZCascader, {
      props: { options: getOptions(), onFocus }
    })
    await wrapper.find('.z-base-selection').trigger('focusin')
    expect(onFocus).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should be active after clicked', async () => {
    const wrapper = mount(ZCascader, {
      attachTo: document.body,
      props: {
        options: getOptions()
      }
    })

    await wrapper.find('.z-base-selection').trigger('click')
    expect(wrapper.find('.z-base-selection--active').exists()).toBe(true)
    expect(document.querySelector('.z-cascader-menu')).not.toEqual(null)

    await wrapper.find('.z-base-selection').trigger('click')
    expect(wrapper.find('.z-base-selection--active').exists()).toBe(false)
    expect(document.querySelector('.z-cascader-menu')).toEqual(null)
    wrapper.unmount()
  })

  it('should be active after click outside', async () => {
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true })
    const wrapper = mount(ZCascader, {
      attachTo: document.body,
      props: {
        options: getOptions()
      }
    })

    await wrapper.find('.z-base-selection').trigger('click')
    expect(document.querySelector('.z-cascader-menu')).not.toEqual(null)
    document.body.click()
    document.body.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mouseupEvent)
    await nextTick()
    expect(document.querySelector('.z-cascader-menu')).toEqual(null)
    wrapper.unmount()
  })
})
