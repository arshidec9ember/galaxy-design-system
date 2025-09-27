import { h, provide, defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { ZAccordion, ZAccordionItem } from '../index'
import { detailsViewInjectionKey } from '../../detail-view/src/context'

describe('z-accordion', () => {
  it('should work with import on demand', () => {
    mount(ZAccordion)
  })

  it('can customize icon', () => {
    const wrapper = mount(() => {
      return (
        <ZAccordion>
          {{
            arrow: () => <div class="my-icon"></div>,
            default: () => <ZAccordionItem name="1"></ZAccordionItem>
          }}
        </ZAccordion>
      )
    })
    expect(wrapper.find('.my-icon').exists()).toEqual(true)
    wrapper.unmount()
  })

  it('should work with `multiple` prop', async () => {
    const wrapper = mount(ZAccordion, {
      props: {
        multiple: true
      },
      slots: {
        default: () => [
          <ZAccordionItem name="1">
            {{ default: () => <div class="ci1">ci1</div> }}
          </ZAccordionItem>,
          <ZAccordionItem name="2">
            {{ default: () => <div class="ci2">ci2</div> }}
          </ZAccordionItem>,
          <ZAccordionItem name="3">
            {{ default: () => <div class="ci3">ci3</div> }}
          </ZAccordionItem>
        ]
      }
    })

    const headerMains = wrapper.findAll('.z-accordion-item__header-main')
    await headerMains[0].trigger('click')
    await headerMains[1].trigger('click')

    expect(wrapper.findAll('.z-accordion-item__header')[0].classes()).toContain(
      'z-accordion-item__header--active'
    )
    expect(wrapper.findAll('.z-accordion-item__header')[1].classes()).toContain(
      'z-accordion-item__header--active'
    )

    await wrapper.setProps({
      multiple: false
    })

    await headerMains[2].trigger('click')
    expect(
      wrapper.findAll('.z-accordion-item__header')[0].classes()
    ).not.toContain('z-accordion-item__header--active')
    expect(
      wrapper.findAll('.z-accordion-item__header')[1].classes()
    ).not.toContain('z-accordion-item__header--active')
    expect(wrapper.findAll('.z-accordion-item__header')[2].classes()).toContain(
      'z-accordion-item__header--active'
    )
    wrapper.unmount()
  })

  it('should work with `arrow-placement` prop', async () => {
    const wrapper = mount(ZAccordion, {
      slots: {
        default: () => <ZAccordionItem name="1"></ZAccordionItem>
      }
    })
    expect(wrapper.find('.z-accordion-item').classes()).toContain(
      'z-accordion-item--start-arrow-placement'
    )

    await wrapper.setProps({ arrowPlacement: 'end' })
    expect(wrapper.find('.z-accordion-item').classes()).toContain(
      'z-accordion-item--end-arrow-placement'
    )
    wrapper.unmount()
  })

  it('should work with nested structure', async () => {
    const wrapper = mount(ZAccordion, {
      slots: {
        default: () =>
          h(
            ZAccordionItem,
            { name: '1' },
            {
              default: () =>
                h(ZAccordion, null, {
                  default: () => h(ZAccordionItem, { name: '2' })
                })
            }
          )
      }
    })

    await wrapper.find('.z-accordion-item__header-main').trigger('click')
    expect(wrapper.find('.z-accordion-item__header').classes()).toContain(
      'z-accordion-item__header--active'
    )
    await wrapper
      .find('.z-accordion-item__content-wrapper')
      .find('.z-accordion-item__header-main')
      .trigger('click')
    expect(
      wrapper
        .find('.z-accordion-item__content-wrapper')
        .find('.z-accordion-item__header')
        .classes()
    ).toContain('z-accordion-item__header--active')
    wrapper.unmount()
  })

  it('should work with `display-directive` prop', async () => {
    const wrapper = mount(ZAccordion, {
      props: {
        displayDirective: 'show'
      },
      slots: {
        default: () =>
          h(
            ZAccordionItem,
            { name: '1' },
            { default: () => h('div', null, { default: () => 'test' }) }
          )
      }
    })

    await wrapper.find('.z-accordion-item__header-main').trigger('click')
    await wrapper.find('.z-accordion-item__header-main').trigger('click')
    expect(
      wrapper.find('.z-accordion-item__content-wrapper').attributes('style')
    ).toBe('display: none;')

    await wrapper.setProps({
      displayDirective: 'if'
    })

    await wrapper.find('.z-accordion-item__header-main').trigger('click')
    await wrapper.find('.z-accordion-item__header-main').trigger('click')
    expect(wrapper.find('.z-accordion-item__content-wrapper').exists()).toBe(
      false
    )
    wrapper.unmount()
  })

  it('should work with `on-item-header-click` prop', async () => {
    const onClick = jest.fn()
    const wrapper = mount(ZAccordion, {
      props: {
        onItemHeaderClick: onClick
      },
      slots: {
        default: () => <ZAccordionItem name="1"></ZAccordionItem>
      }
    })
    const triggerNodeWrapper = wrapper.find('.z-accordion-item__header-main')
    await triggerNodeWrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `slots` ', async () => {
    const wrapper = mount(ZAccordion, {
      slots: {
        header: () => 'header',
        'header-end': () => 'header-end',
        default: () => <ZAccordionItem name="1" />,
        arrow: () => 'arrow'
      }
    })
    expect(wrapper.find('.z-accordion-item__header-main').exists()).toBe(true)
    expect(wrapper.find('.z-accordion-item__header-main').text()).toBe('arrow')

    expect(wrapper.find('.z-accordion-item__header-end').exists()).toBe(true)
    expect(wrapper.find('.z-accordion-item__header-end').text()).toBe(
      'header-end'
    )

    expect(wrapper.find('.z-accordion-item-arrow').exists()).toBe(true)
    expect(wrapper.find('.z-accordion-item-arrow').text()).toBe('arrow')
    wrapper.unmount()
  })

  it('props.defaultExpandedNames', async () => {
    let wrapper = mount(ZAccordion, {
      props: {
        defaultExpandedNames: ['1']
      },
      slots: {
        default: () => [
          <ZAccordionItem name="1">
            {{ default: () => <div class="ci1"></div> }}
          </ZAccordionItem>,
          <ZAccordionItem name="2">
            {{ default: () => <div class="ci2"></div> }}
          </ZAccordionItem>
        ]
      }
    })
    expect(wrapper.find('.ci1').isVisible()).toEqual(true)
    expect(wrapper.find('.ci2').exists()).toEqual(false)
    wrapper = mount(ZAccordion, {
      props: {
        multiple: true,
        defaultExpandedNames: '1'
      },
      slots: {
        default: () => [
          <ZAccordionItem name="1">
            {{ default: () => <div class="ci1"></div> }}
          </ZAccordionItem>,
          <ZAccordionItem name="2">
            {{ default: () => <div class="ci2"></div> }}
          </ZAccordionItem>
        ]
      }
    })
    expect(wrapper.find('.ci1').isVisible()).toEqual(true)
    expect(wrapper.find('.ci2').exists()).toEqual(false)
    wrapper.unmount()
  })

  it('should work with collapseItem component `title` prop', async () => {
    const wrapper = mount(ZAccordion, {
      slots: {
        default: () => <ZAccordionItem title="test"></ZAccordionItem>
      }
    })

    await wrapper.find('.z-accordion-item__header-main').trigger('click')
    expect(wrapper.find('.z-accordion-item__header-main').text()).toBe('test')
    wrapper.unmount()
  })

  it('should use variant "4-r" when collapsed and "4-m" when expanded, and always "5-m" when inside detailsView', async () => {
    // Test default variant (4-r) when collapsed and not inside detailsView
    const wrapperDefault = mount(ZAccordion, {
      slots: {
        default: () => <ZAccordionItem title="test"></ZAccordionItem>
      }
    })

    const accordionItemComponent = wrapperDefault.findComponent(ZAccordionItem)
    expect(accordionItemComponent.vm.titleVariant).toBe('4-r')

    // Click to expand and test variant changes to 4-m
    await wrapperDefault.find('.z-accordion-item__header').trigger('click')
    expect(accordionItemComponent.vm.titleVariant).toBe('4-m')
    wrapperDefault.unmount()

    // Test variant always "5-m" when inside detailsView (regardless of collapsed/expanded state)
    const TestComponentWithDetailsView = defineComponent({
      setup () {
        provide(detailsViewInjectionKey, {
          // Mock details view context - just needs to be truthy
        })
        return () => (
          <ZAccordion>
            <ZAccordionItem title="test"></ZAccordionItem>
          </ZAccordion>
        )
      }
    })

    const wrapperInDetailsView = mount(TestComponentWithDetailsView)

    const accordionItemComponentInDetailsView =
      wrapperInDetailsView.findComponent(ZAccordionItem)
    expect(accordionItemComponentInDetailsView.vm.titleVariant).toBe('5-m')

    // Click to expand and test variant remains 5-m
    await wrapperInDetailsView
      .find('.z-accordion-item__header')
      .trigger('click')
    expect(accordionItemComponentInDetailsView.vm.titleVariant).toBe('5-m')
    wrapperInDetailsView.unmount()
  })
})
