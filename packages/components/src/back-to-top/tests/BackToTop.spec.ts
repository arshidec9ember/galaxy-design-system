import { mount } from '@vue/test-utils'
import { ZBackToTop } from '../index'

describe('z-back-to-top', () => {
  it('should work with import on demand', () => {
    mount(ZBackToTop, {
      attachTo: document.body
    })
  })

  it('should work with `show` prop', async () => {
    document.body.innerHTML =
      document.body.innerHTML +
      `
      <div id="test" style="height: 3000px; width: 100%;"></div>
    `

    const wrapper = mount(ZBackToTop, {
      attachTo: document.getElementById('test') ?? undefined,
      props: {
        show: true
      }
    })

    wrapper.element.scrollTop = 1000
    await wrapper.trigger('scroll')
    expect(wrapper.html()).toContain('teleport start')
    wrapper.unmount()
  })
})
