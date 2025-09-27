import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { ZBreadcrumb, ZBreadcrumbItem } from '../index'

describe('z-breadcrumb', () => {
  it('should work with import on demand', () => {
    mount(ZBreadcrumb)
  })

  it('should raise an error if breadcrumbItem is not inside a BreadCrumb', () => {
    const mockErrorLogger = jest.spyOn(console, 'error').mockImplementation()
    const wrapper = mount(ZBreadcrumbItem)

    expect(wrapper.isVisible()).toBe(false)
    expect(mockErrorLogger).toBeCalledWith(
      '[@zeta-gds/components/breadcrumb]: `z-breadcrumb-item` must be placed inside `z-breadcrumb`.'
    )
    wrapper.unmount()
  })

  it('should work with Breadcrumb, BreadcrumbItem slots', async () => {
    const wrapper = mount(ZBreadcrumb, {
      slots: {
        default: () => [
          h(ZBreadcrumbItem, null, { default: () => 'test-item1' }),
          h(ZBreadcrumbItem, null, { default: () => 'test-item2' })
        ]
      }
    })

    expect(wrapper.find('ul').element.children.length).toBe(2)
    expect(
      wrapper.find('ul').element.children[0].getAttribute('class')
    ).toContain('z-breadcrumb-item')
    const itemList = wrapper.findAll('.z-breadcrumb-item__link')
    expect(itemList[0].text()).toBe('test-item1')
    expect(itemList[1].text()).toBe('test-item2')
    wrapper.unmount()
  })

  it("should work with Breadcrumb's `separator` prop", async () => {
    const wrapper = mount(ZBreadcrumb, {
      props: { separator: '@' },
      slots: {
        default: () => [
          h(ZBreadcrumbItem, null, { default: () => 'test-item1' }),
          h(ZBreadcrumbItem, null, { default: () => 'test-item2' })
        ]
      }
    })

    expect(
      wrapper
        .findAll('.z-breadcrumb-item__separator')
        .every((i) => i.text() === '@')
    ).toBe(true)
    wrapper.unmount()
  })

  it("should work with BreadcrumbItem's `separator` prop", async () => {
    const wrapper = mount(ZBreadcrumb, {
      slots: {
        default: () => [
          h(
            ZBreadcrumbItem,
            { separator: '@' },
            { default: () => 'test-item1' }
          ),
          h(ZBreadcrumbItem, null, { default: () => 'test-item2' })
        ]
      }
    })

    expect(wrapper.findAll('.z-breadcrumb-item__separator')[0].text()).toBe('@')
    expect(wrapper.findAll('.z-breadcrumb-item__separator')[1].text()).toBe('/')
    wrapper.unmount()
  })

  it('should work with BreadcrumbItem`s `maxItems` prop', async () => {
    const wrapper = mount(ZBreadcrumb, {
      slots: {
        default: () => [
          h(ZBreadcrumbItem, { maxItems: 1 }, { default: () => 'test-item1' }),
          h(ZBreadcrumbItem, null, { default: () => 'test-item2' })
        ]
      }
    })

    expect(wrapper.findAll('.z-breadcrumb-item__separator')[0].text()).toBe('/')
    expect(wrapper.findAll('.z-breadcrumb-item__separator')[1].text()).toBe('/')
    wrapper.unmount()
  })

  it('should work with BreadcrumbItem`s `ellipsis` prop', async () => {
    const wrapper = mount(ZBreadcrumb, {
      slots: {
        default: () => [
          h(
            ZBreadcrumbItem,
            { ellipsis: true },
            { default: () => 'test-item1' }
          ),
          h(ZBreadcrumbItem, null, { default: () => 'test-item2' })
        ]
      }
    })

    expect(wrapper.findAll('.z-breadcrumb-item__separator')[0].text()).toBe('/')
    expect(wrapper.findAll('.z-breadcrumb-item__separator')[1].text()).toBe('/')
    wrapper.unmount()
  })

  it('should be possible to pass `href` props to ZBreadcrumbItem', () => {
    const wrapper = mount(ZBreadcrumb, {
      slots: {
        default: () => [
          h(ZBreadcrumbItem, null, { default: () => 'Home' }),
          h(ZBreadcrumbItem, { href: '/path1' }, { default: () => 'Path1' })
        ]
      }
    })

    const breadcrumbItems = wrapper.findAll('a.z-breadcrumb-item__link')
    const firstBreadcrumbItem = breadcrumbItems[0]
    const secondBreadcrumbItem = breadcrumbItems[1]

    expect(firstBreadcrumbItem.exists()).toBe(true)
    expect(firstBreadcrumbItem.text()).toMatch('Home')
    expect(firstBreadcrumbItem.attributes('href')).toBe(undefined)
    expect(secondBreadcrumbItem.exists()).toBe(true)
    expect(secondBreadcrumbItem.attributes('href')).toMatch('/path1')
    wrapper.unmount()
  })

  describe('accessibility', () => {
    it('should labelled the landmark region', () => {
      const wrapper = mount(ZBreadcrumb)
      expect(wrapper.find('.z-breadcrumb').attributes('aria-label')).toBe(
        'Breadcrumb'
      )
      wrapper.unmount()
    })

    __FAILED__TESTCASES__ &&
      it('should add `aria-current` if the item is the current location', () => {
        const originalWindow = window
        const windowSpy = jest.spyOn(globalThis, 'window', 'get')
        const currentUrl = 'http://some-domaine/path2'
        const url = 'http://some-domaine/path1'
        windowSpy.mockImplementation(() => {
          const mockedWindow = Object.create(originalWindow)
          Object.defineProperty(mockedWindow, 'location', {
            value: {
              href: currentUrl
            }
          })
          return mockedWindow
        })
        const wrapper = mount(ZBreadcrumb, {
          slots: {
            default: () => [
              h(ZBreadcrumbItem, { default: () => 'Home' }),
              h(
                ZBreadcrumbItem,
                {
                  href: url
                },
                { default: () => 'Path1' }
              ),
              h(
                ZBreadcrumbItem,
                {
                  href: currentUrl
                },
                { default: () => 'Path2' }
              )
            ]
          }
        })

        expect(
          wrapper
            .find('span.z-breadcrumb-item__link')
            .attributes('aria-current')
        ).toBe(undefined)
        expect(
          wrapper
            .find(`a.z-breadcrumb-item__link[href="${url}"]`)
            .attributes('aria-current')
        ).toBe(undefined)
        expect(
          wrapper
            .find(`a.z-breadcrumb-item__link[href="${currentUrl}"]`)
            .attributes('aria-current')
        ).toBe('location')
        windowSpy.mockRestore()
        wrapper.unmount()
      })

    it('should add `aria-hidden` to the separator', () => {
      const wrapper = mount(ZBreadcrumb, {
        slots: {
          default: () => [
            h(ZBreadcrumbItem, { default: () => 'Home' }),
            h(
              ZBreadcrumbItem,
              { href: '/path1', isCurrent: true },
              { default: () => 'Path1' }
            )
          ]
        }
      })

      expect(
        wrapper.find('.z-breadcrumb-item__separator').attributes('aria-hidden')
      ).toBe('true')
      wrapper.unmount()
    })
  })
})
