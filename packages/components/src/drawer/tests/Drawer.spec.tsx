import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { ZButton } from '../../button'
import {
  type DrawerContentProps,
  type DrawerProps,
  ZDrawer,
  ZDrawerContent
} from '../index'

// It seems due to special handling of transition in @zeta-gds/components, the drawer's DOM
// won't disappear even if its `show` prop is false. No time to find out the
// exact reason, so I create a util here.
function expectDrawerExists (): void {
  const drawer = document.querySelector('.z-drawer')
  if (drawer !== null) return
  expect(
    (document.querySelector('.z-drawer') as HTMLElement).style.display
  ).toEqual('none')
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function mountDrawer ({
  drawerProps,
  drawerContentProps,
  hasOnUpdateShow,
  show
}: {
  drawerProps?: DrawerProps
  drawerContentProps?: DrawerContentProps
  hasOnUpdateShow?: boolean
  show?: boolean
}) {
  return mount(
    defineComponent({
      setup () {
        return {
          show: ref(!!show)
        }
      },
      render () {
        return [
          <ZButton
            onClick={() => {
              this.show = true
            }}
          >
            {{ default: () => 'Show' }}
          </ZButton>,
          <ZDrawer
            show={this.show}
            onUpdateShow={
              hasOnUpdateShow
                ? drawerProps?.onUpdateShow
                : (show) => {
                    this.show = show
                  }
            }
            {...drawerProps}
          >
            {{
              default: () => (
                <ZDrawerContent {...drawerContentProps}></ZDrawerContent>
              )
            }}
          </ZDrawer>
        ]
      }
    }),
    {
      attachTo: document.body
    }
  )
}

describe('z-drawer', () => {
  it('should work with import on demand', () => {
    mount(ZDrawer)
  })

  it('closable', async () => {
    const wrapper = mountDrawer({ drawerContentProps: { closable: true } })
    expect(document.querySelector('.z-drawer')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.z-drawer')).not.toEqual(null)
    document
      .querySelector('.z-base-close')
      ?.dispatchEvent(new MouseEvent('click'))
    await nextTick()
    expectDrawerExists()
    wrapper.unmount()
  })

  it('should work with `placement` prop', async () => {
    let wrapper = mountDrawer({ drawerProps: { placement: 'top' } })
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.z-drawer')?.className).toContain(
      'z-drawer--top-placement'
    )
    expectDrawerExists()
    wrapper.unmount()

    wrapper = mountDrawer({ drawerProps: { placement: 'right' } })
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.z-drawer')?.className).toContain(
      'z-drawer--right-placement'
    )
    expectDrawerExists()
    wrapper.unmount()

    wrapper = mountDrawer({ drawerProps: { placement: 'bottom' } })
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.z-drawer')?.className).toContain(
      'z-drawer--bottom-placement'
    )
    expectDrawerExists()
    wrapper.unmount()

    wrapper = mountDrawer({ drawerProps: { placement: 'left' } })
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.z-drawer')?.className).toContain(
      'z-drawer--left-placement'
    )
    expectDrawerExists()
    wrapper.unmount()
  })

  it('should work with `show` prop', async () => {
    const wrapper1 = mountDrawer({
      show: false
    })
    expect(document.querySelector('.z-drawer')).toEqual(null)
    wrapper1.unmount()
    const wrapper2 = mountDrawer({
      show: true
    })
    expect(document.querySelector('.z-drawer')).not.toEqual(null)
    wrapper2.unmount()
  })

  it('should work with `on-update:show` prop', async () => {
    const onUpdate = jest.fn()
    const wrapper = mountDrawer({
      hasOnUpdateShow: true,
      drawerProps: { onUpdateShow: onUpdate },
      drawerContentProps: { closable: true }
    })
    await wrapper.find('button').trigger('click')
    setTimeout(() => {
      expect(onUpdate).toHaveBeenCalled()
    }, 300)
    wrapper.unmount()
  })

  it('should work with `mask-closable` prop', async () => {
    const onUpdate = jest.fn()
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true })
    const wrapper = mountDrawer({
      show: true,
      hasOnUpdateShow: true,
      drawerProps: { onUpdateShow: onUpdate },
      drawerContentProps: { closable: true }
    })
    document.querySelector('.z-drawer-mask')?.dispatchEvent(mousedownEvent)
    document.querySelector('.z-drawer-mask')?.dispatchEvent(mouseupEvent)
    setTimeout(() => {
      expect(onUpdate).toHaveBeenCalled()
    }, 300)
    wrapper.unmount()
  })

  it('should work with `header-style` prop', async () => {
    const wrapper = mountDrawer({
      drawerContentProps: {
        title: 'test',
        headerStyle: { backgroundColor: 'red' }
      },
      show: true
    })

    expect(
      (document.querySelector('.z-drawer-header') as HTMLElement).style
        .backgroundColor
    ).toEqual('red')

    wrapper.unmount()
  })

  it('should work with `body-style` prop', async () => {
    const wrapper = mountDrawer({
      drawerContentProps: {
        title: 'test',
        bodyStyle: { backgroundColor: 'red' }
      },
      show: true
    })

    expect(
      (document.querySelector('.z-drawer-body') as HTMLElement).style
        .backgroundColor
    ).toEqual('red')

    wrapper.unmount()
  })

  it('should work with `resizable` prop', async () => {
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetHeight'
    )
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetWidth'
    )

    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 251
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 251
    })
    // placement top
    let wrapper = mountDrawer({
      show: true,
      drawerProps: { placement: 'top', resizable: true, defaultHeight: 251 }
    })
    expect(document.querySelector('.z-drawer')?.className).toContain(
      'z-drawer--top-placement'
    )
    expect(document.querySelector('.z-drawer__resize-trigger')).not.toEqual(
      null
    )

    let mousedownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 0,
      clientY: 251
    })
    let mousemoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      clientX: 0,
      clientY: 600
    })
    let mouseupEvent = new MouseEvent('mouseup', { bubbles: true })

    document
      .querySelector('.z-drawer__resize-trigger')
      ?.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mousemoveEvent)
    document.body.dispatchEvent(mouseupEvent)

    await nextTick()
    expect(document.querySelector('.z-drawer')?.getAttribute('style')).toBe(
      'height: 600px;'
    )

    wrapper.unmount()

    // placement bottom
    wrapper = mountDrawer({
      show: true,
      drawerProps: { placement: 'bottom', resizable: true, defaultHeight: 251 }
    })
    expect(document.querySelector('.z-drawer')?.className).toContain(
      'z-drawer--bottom-placement'
    )
    expect(document.querySelector('.z-drawer__resize-trigger')).not.toEqual(
      null
    )

    mousedownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 0,
      clientY: 600
    })
    mousemoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      clientX: 0,
      clientY: 251
    })
    mouseupEvent = new MouseEvent('mouseup', { bubbles: true })

    document
      .querySelector('.z-drawer__resize-trigger')
      ?.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mousemoveEvent)
    document.body.dispatchEvent(mouseupEvent)

    await nextTick()
    expect(document.querySelector('.z-drawer')?.getAttribute('style')).toBe(
      'height: 600px;'
    )

    wrapper.unmount()

    // placement left
    wrapper = mountDrawer({
      show: true,
      drawerProps: { placement: 'left', resizable: true, defaultWidth: 251 }
    })
    expect(document.querySelector('.z-drawer')?.className).toContain(
      'z-drawer--left-placement'
    )
    expect(document.querySelector('.z-drawer__resize-trigger')).not.toEqual(
      null
    )

    mousedownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 251,
      clientY: 0
    })
    mousemoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      clientX: 600,
      clientY: 0
    })
    mouseupEvent = new MouseEvent('mouseup', { bubbles: true })

    document
      .querySelector('.z-drawer__resize-trigger')
      ?.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mousemoveEvent)
    document.body.dispatchEvent(mouseupEvent)

    await nextTick()
    expect(document.querySelector('.z-drawer')?.getAttribute('style')).toBe(
      'width: 600px;'
    )

    wrapper.unmount()

    // placement right
    wrapper = mountDrawer({
      show: true,
      drawerProps: { placement: 'right', resizable: true, defaultWidth: 251 }
    })
    expect(document.querySelector('.z-drawer')?.className).toContain(
      'z-drawer--right-placement'
    )
    expect(document.querySelector('.z-drawer__resize-trigger')).not.toEqual(
      null
    )

    mousedownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 600,
      clientY: 0
    })
    mousemoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      clientX: 251,
      clientY: 0
    })
    mouseupEvent = new MouseEvent('mouseup', { bubbles: true })

    document
      .querySelector('.z-drawer__resize-trigger')
      ?.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mousemoveEvent)
    document.body.dispatchEvent(mouseupEvent)

    await nextTick()
    expect(document.querySelector('.z-drawer')?.getAttribute('style')).toBe(
      'width: 600px;'
    )

    wrapper.unmount()

    Object.defineProperty(
      HTMLElement.prototype,
      'offsetHeight',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      originalOffsetHeight!
    )
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      originalOffsetWidth!
    )
  })
})
