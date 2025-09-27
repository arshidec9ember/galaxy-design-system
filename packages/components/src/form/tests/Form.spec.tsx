import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { ZInput } from '../../input'
import { ZForm, ZFormItem } from '../index'

describe('z-form', () => {
  it('should work with import on demand', () => {
    mount(ZForm)
  })
  describe('require mark', () => {
    it("doesn't show by default", () => {
      const wrapper = mount(() => (
        <ZForm>
          {{
            default: () => {
              return (
                <ZFormItem label="star kirby">
                  {{
                    default: () => <ZInput />
                  }}
                </ZFormItem>
              )
            }
          }}
        </ZForm>
      ))
      expect(wrapper.find('.z-form-item-label__asterisk').exists()).toEqual(
        false
      )
      wrapper.unmount()
    })
    it('shows when props.showIndicator and props.required is set for required', () => {
      const wrapper = mount(() => (
        <ZForm>
          {{
            default: () => {
              return (
                <ZFormItem showIndicator required label="star kirby">
                  {{
                    default: () => <ZInput />
                  }}
                </ZFormItem>
              )
            }
          }}
        </ZForm>
      ))
      expect(wrapper.find('.z-form-item-label__asterisk').exists()).toEqual(
        true
      )
      wrapper.unmount()
    })

    __FAILED__TESTCASES__ &&
      it('shows when props.showIndicator and props.required is set for optional', () => {
        const wrapper = mount(() => (
          <ZForm>
            {{
              default: () => {
                return (
                  <ZFormItem showIndicator optional label="star kirby">
                    {{
                      default: () => <ZInput />
                    }}
                  </ZFormItem>
                )
              }
            }}
          </ZForm>
        ))
        expect(
          wrapper.find('.z-form-item-label__optional-placeholder').exists()
        ).toEqual(true)
        wrapper.unmount()
      })

    it('shows when required rule is set in form', () => {
      const wrapper = mount(() => (
        <ZForm rules={{ starKirby: { required: true } }}>
          {{
            default: () => {
              return (
                <ZFormItem label="star kirby" path="starKirby">
                  {{
                    default: () => <ZInput />
                  }}
                </ZFormItem>
              )
            }
          }}
        </ZForm>
      ))
      expect(wrapper.find('.z-form-item-label__asterisk').exists()).toEqual(
        true
      )
      wrapper.unmount()
    })
    it('shows when required rule is set in form item', () => {
      const wrapper = mount(() => (
        <ZForm>
          {{
            default: () => {
              return (
                <ZFormItem label="star kirby" rule={{ required: true }}>
                  {{
                    default: () => <ZInput />
                  }}
                </ZFormItem>
              )
            }
          }}
        </ZForm>
      ))
      expect(wrapper.find('.z-form-item-label__asterisk').exists()).toEqual(
        true
      )
      wrapper.unmount()
    })
    it('show require mark placement left when set indicator-placement is "start"', () => {
      const wrapper = mount(() => (
        <ZForm showIndicator={true} indicatorPlacement={'start'}>
          {{
            default: () => {
              return (
                <ZFormItem required label="star kirby">
                  {{
                    default: () => <ZInput />
                  }}
                </ZFormItem>
              )
            }
          }}
        </ZForm>
      ))
      const requireMark = wrapper.find('.z-form-item-label__asterisk')
      const nextSibling = requireMark.element.nextSibling as HTMLElement
      expect(nextSibling.textContent).toEqual('star kirby')
      wrapper.unmount()
    })

    it('show require mark placement left when set indicator-placement is "end"', () => {
      const wrapper = mount(() => (
        <ZForm showIndicator={true} indicatorPlacement={'end'}>
          {{
            default: () => {
              return (
                <ZFormItem required label="star kirby">
                  {{
                    default: () => <ZInput />
                  }}
                </ZFormItem>
              )
            }
          }}
        </ZForm>
      ))
      const requireMark = wrapper.find('.z-form-item-label__asterisk')
      const previousSibling = requireMark.element.previousSibling as HTMLElement
      expect(previousSibling.textContent).toEqual('star kirby')
      wrapper.unmount()
    })

    it('show require mark placement left when set indicator-placement is "end" in form-item', () => {
      const wrapper = mount(() => (
        <ZForm showIndicator={true} indicatorPlacement={'start'}>
          {{
            default: () => {
              return (
                <ZFormItem
                  required
                  label="star kirby"
                  indicatorPlacement={'end'}
                >
                  {{
                    default: () => <ZInput />
                  }}
                </ZFormItem>
              )
            }
          }}
        </ZForm>
      ))
      const requireMark = wrapper.find('.z-form-item-label__asterisk')
      const previousSibling = requireMark.element.previousSibling as HTMLElement
      expect(previousSibling.textContent).toEqual('star kirby')
      wrapper.unmount()
    })
  })

  it('should work with `show-label` prop', async () => {
    let wrapper = mount(ZForm, {
      slots: {
        default: () =>
          [1, 2, 3].map((num) => (
            <ZFormItem label={`label${num}`}>
              {{
                default: () => <ZInput />
              }}
            </ZFormItem>
          ))
      }
    })
    // show-label default is true in component
    expect(wrapper.findAll('.z-form-item-label').length).toBe(3)
    expect(wrapper.findAll('.z-form-item--no-label').length).toBe(0)

    await wrapper.setProps({ showLabel: true })
    expect(wrapper.findAll('.z-form-item-label').length).toBe(3)
    expect(wrapper.findAll('.z-form-item--no-label').length).toBe(0)

    await wrapper.setProps({ showLabel: false })
    expect(wrapper.findAll('.z-form-item-label').length).toBe(0)
    expect(wrapper.findAll('.z-form-item--no-label').length).toBe(3)

    // The ZFormItem show-label has a higher weight than the ZForm
    wrapper = mount(ZForm, {
      props: { showLabel: true },
      slots: {
        default: () => (
          <ZFormItem label="label" show-label={false}>
            {{
              default: () => <ZInput />
            }}
          </ZFormItem>
        )
      }
    })
    expect(
      wrapper.find('.z-form-item').classes().includes('z-form-item--no-label')
    ).toBe(true)
    expect(wrapper.findAll('.z-form-item-label').length).toBe(0)
    wrapper.unmount()
  })

  it('includes `for` attribute in label', () => {
    const wrapper = mount(() => (
      <ZForm>
        {{
          default: () => {
            return (
              <ZFormItem label="star kirby" labelProps={{ for: 'input' }}>
                {{
                  default: () => <ZInput />
                }}
              </ZFormItem>
            )
          }
        }}
      </ZForm>
    ))
    expect(wrapper.find('.z-form-item-label').attributes('for')).toBe('input')
    wrapper.unmount()
  })
})
