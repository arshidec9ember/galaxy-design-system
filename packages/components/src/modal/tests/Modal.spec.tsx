import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { type ModalProps, ZModal } from '../index'
import { ZButton } from '../../button'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function mountModal ({
  modalProps,
  show
}: {
  modalProps?: ModalProps
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
          <ZModal
            show={this.show}
            onUpdateShow={(show) => {
              this.show = show
            }}
            {...modalProps}
          >
            {{
              default: () => 'test'
            }}
          </ZModal>
        ]
      }
    }),
    {
      attachTo: document.body
    }
  )
}

describe('z-modal', () => {
  it('should work with import on demand', () => {
    mount(ZModal)
  })

  it('should work with `display-directive` prop', async () => {
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true })
    let wrapper = mountModal({})
    expect(document.querySelector('.z-modal-body-wrapper')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.z-modal-body-wrapper')).not.toEqual(null)
    document.querySelector('.z-modal-mask')?.dispatchEvent(mousedownEvent)
    document.querySelector('.z-modal-mask')?.dispatchEvent(mouseupEvent)
    setTimeout(() => {
      expect(
        document.querySelector('.z-modal-body-wrapper')?.children.length
      ).toBe(0)
    }, 300)
    wrapper.unmount()
    wrapper = mountModal({ modalProps: { displayDirective: 'show' } })
    expect(document.querySelector('.z-modal-body-wrapper')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.z-modal-body-wrapper')).not.toEqual(null)
    document.querySelector('.z-modal-mask')?.dispatchEvent(mousedownEvent)
    document.querySelector('.z-modal-mask')?.dispatchEvent(mouseupEvent)
    setTimeout(() => {
      expect(
        document.querySelector('.z-modal-body-wrapper')?.children.length
      ).not.toBe(0)
      expect(
        document.querySelector('.z-modal-body-wrapper')?.getAttribute('style')
      ).toContain('display: none')
    }, 300)
    wrapper.unmount()
  })

  it('should work with `preset` prop', async () => {
    let wrapper = mountModal({ modalProps: { preset: 'card' } })
    expect(document.querySelector('.z-modal-body-wrapper')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.z-modal-body-wrapper')).not.toEqual(null)
    expect(document.querySelector('.z-card-standard')).not.toEqual(null)
    wrapper.unmount()

    wrapper = mountModal({ modalProps: { preset: 'dialog' } })
    expect(document.querySelector('.z-modal-body-wrapper')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.z-modal-body-wrapper')).not.toEqual(null)
    expect(document.querySelector('.z-dialog')).not.toEqual(null)
    wrapper.unmount()
  })
})
