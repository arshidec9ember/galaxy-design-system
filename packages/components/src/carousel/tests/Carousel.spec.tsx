import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { ZCarousel, ZCarouselItem } from '../index'
import { sleep } from 'seemly'

describe('z-carousel', () => {
  it('should work with import on demand', () => {
    const wrapper = mount(ZCarousel)
    wrapper.unmount()
  })

  it('should work with `autoplay` and `interval` prop', async () => {
    const wrapper = mount(ZCarousel, {
      slots: {
        default: () => {
          return [...Array(3).keys()].map((i) => {
            return h('div', {}, i.toString())
          })
        }
      }
    })

    await wrapper.setProps({ autoplay: true, interval: 50 })

    await sleep(25)
    // Because `autoplay` is `true`, `[data-index="${0}"]` `aria-hidden` must not be `false` at the moment
    expect(wrapper.find(`[data-index="${0}"]`).attributes('aria-hidden')).toBe(
      'true'
    )

    await sleep(25)
    // Because `autoplay` is `true` and `interval` is `50`, both `[data-index="${0}"]` and `[data-index="${0}"]` `aria-hidden` must not be `false` at the moment
    ;([0, 1] as const).forEach((i) => {
      expect(
        wrapper.find(`[data-index="${i}"]`).attributes('aria-hidden')
      ).toBe('true')
    })
    wrapper.unmount()
  })

  it('should work with `dot-placement` prop', async () => {
    const wrapper = mount(ZCarousel)

    for (const placement of ['top', 'bottom', 'left', 'right'] as const) {
      await wrapper.setProps({ dotPlacement: placement })
      expect(wrapper.find('.z-carousel').classes()).toContain(
        `z-carousel--${placement}`
      )
    }
    wrapper.unmount()
  })

  it('should work with `interval` prop', async () => {
    const wrapper = mount(ZCarousel, {
      props: {
        interval: 100,
        autoplay: true
      },
      slots: {
        default: () => {
          return [...Array(3).keys()].map((i) => {
            return h('div', {}, i.toString())
          })
        }
      }
    })

    await sleep(100)
    expect(
      wrapper
        .find('.z-carousel__slides')
        .find('[data-index="2"]')
        .attributes('aria-hidden')
    ).toBe('false')
    expect(
      wrapper
        .find('.z-carousel__dots')
        .findAll('.z-carousel__dot')[1]
        .attributes('aria-selected')
    ).toBe('true')
    wrapper.unmount()
  })

  it('should work with `show-arrow` prop', async () => {
    const wrapper = mount(ZCarousel)

    await wrapper.setProps({
      showArrow: true
    })

    expect(wrapper.find('.z-carousel__arrow-group').exists()).toBe(true)
    expect(wrapper.find('.z-carousel__arrow').exists()).toBe(true)
    wrapper.unmount()
  })

  it('arrow button should work', async () => {
    const wrapper = mount(ZCarousel, {
      props: {
        loop: false
      },
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            })
          ]
        }
      }
    })

    await wrapper.setProps({
      showArrow: true
    })

    const slidesDOMArray = wrapper.findAll('.z-carousel__slide')

    expect(slidesDOMArray[0].attributes('aria-hidden')).toBe('false')

    await wrapper.findAll('.z-carousel__arrow')[1].trigger('click')
    expect(slidesDOMArray[1].attributes('aria-hidden')).toBe('false')

    await wrapper.findAll('.z-carousel__arrow')[0].trigger('click')
    expect(slidesDOMArray[0].attributes('aria-hidden')).toBe('false')
    wrapper.unmount()
  })

  it('should work with `centered-slides` prop', async () => {
    const wrapper = mount(ZCarousel, {
      props: {
        slidesPerView: 'auto',
        loop: false
      },
      attrs: {
        style: 'width: 240px;height: 300px;'
      },
      slots: {
        default: () => {
          return [...Array(5).keys()].map((i) => {
            return h(ZCarouselItem, {
              style: `width: ${(i + 1) * 10}%;`,
              slots: {
                default: () => h('div', {}, i.toString())
              }
            })
          })
        }
      }
    })

    const wrapperRect = wrapper.element.getBoundingClientRect()

    const slidesDOMArray = wrapper.findAll('.z-carousel__slide')
    for (let i = 0; i < slidesDOMArray.length; i++) {
      const slideDOM = slidesDOMArray[i]
      const rect = slideDOM.element.getBoundingClientRect()
      expect(rect.left - wrapperRect.left).toBe(
        (wrapperRect.width - rect.width) / 2
      )

      wrapper.vm.next()
      await nextTick()
    }
    wrapper.unmount()
  })

  it('should work with `trigger` prop', async () => {
    const wrapper = mount(ZCarousel, {
      props: {
        loop: false
      },
      slots: {
        default: () => {
          return [...Array(3).keys()].map((i) => {
            return h('div', {}, i.toString())
          })
        }
      }
    })

    const dotsDOMArray = wrapper.findAll('.z-carousel__dot')
    const slidesDOMArray = wrapper.findAll('.z-carousel__slide')

    const triggerEvent = {
      click: 'click',
      hover: 'mouseenter'
    }
    const triggers = Object.keys(triggerEvent) as Array<
    keyof typeof triggerEvent
    >
    for (let i = 0; i < triggers.length; i++) {
      const trigger = triggers[i]
      const event = triggerEvent[triggers[i]]
      await wrapper.setProps({
        trigger
      })

      for (let j = 0; j < dotsDOMArray.length; j++) {
        const dotsDOM = dotsDOMArray[j]
        await dotsDOM.trigger(event)
        expect(slidesDOMArray[j].attributes('aria-hidden')).toBe('false')
      }
    }
    wrapper.unmount()
  })

  it('should work with `current-index` prop', async () => {
    const wrapper = mount(ZCarousel, {
      props: {
        currentIndex: 0
      },
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            })
          ]
        }
      }
    })

    await sleep(100)
    expect(
      wrapper
        .find('.z-carousel__slide--current')
        .element.children[0].getAttribute('src')
    ).toBe(
      'https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    )
    await wrapper.setProps({ currentIndex: 1 })
    await sleep(100)
    expect(
      wrapper
        .find('.z-carousel__slide--current')
        .element.children[0].getAttribute('src')
    ).toBe(
      'https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    )
    wrapper.unmount()
  })

  it('should work with `dot-type` prop', async () => {
    const wrapper = mount(ZCarousel, {
      props: {
        currentIndex: 0
      },
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            })
          ]
        }
      }
    })

    await sleep(100)
    expect(wrapper.find('.z-carousel__dots').classes()).toContain(
      'z-carousel__dots--dot'
    )
    await wrapper.setProps({ dotType: 'line' })
    await sleep(100)
    expect(wrapper.find('.z-carousel__dots').classes()).toContain(
      'z-carousel__dots--line'
    )
    wrapper.unmount()
  })

  it('should work with `effect` prop', async () => {
    const wrapper = mount(ZCarousel)

    for (const effect of ['slide', 'fade', 'card', 'custom'] as const) {
      await wrapper.setProps({ effect })
      await sleep(100)
      expect(wrapper.find('.z-carousel').classes()).toContain(
        `z-carousel--${effect}`
      )
    }

    wrapper.unmount()
  })

  it('should work with `keyboard` prop', async () => {
    const wrapper = mount(ZCarousel, {
      props: {
        keyboard: true
      },
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            })
          ]
        }
      }
    })

    await sleep(100)
    await wrapper.find('.z-carousel__dot').trigger('click')
    await wrapper.find('.z-carousel__dot').trigger('keydown', {
      code: 'ArrowRight'
    })
    await sleep(100)
    expect(
      wrapper.findAll('.z-carousel__dot')[1].attributes('aria-selected')
    ).toBe('true')
    await wrapper.find('.z-carousel__dot').trigger('keydown', {
      code: 'ArrowLeft'
    })
    await sleep(100)
    expect(
      wrapper.findAll('.z-carousel__dot')[0].attributes('aria-selected')
    ).toBe('true')
    wrapper.unmount()
  })

  it('should work with `space-between` prop', async () => {
    const wrapper = mount(ZCarousel, {
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            })
          ]
        }
      }
    })

    await sleep(100)
    expect(
      wrapper.find('.z-carousel__slide').attributes('style')
    ).not.toContain('margin-right: 25px;')

    await wrapper.setProps({ spaceBetween: 25 })
    expect(wrapper.find('.z-carousel__slide').attributes('style')).toContain(
      'margin-right: 25px;'
    )
    wrapper.unmount()
  })

  it('should work with `show-dots` prop', async () => {
    const wrapper = mount(ZCarousel, {
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            })
          ]
        }
      }
    })
    await sleep(100)
    expect(wrapper.find('.z-carousel__dots').exists()).toBe(true)

    await wrapper.setProps({
      showDots: false
    })
    await sleep(100)
    expect(wrapper.find('.z-carousel__dots').exists()).not.toBe(true)
    wrapper.unmount()
  })

  it('should work with `on-update:current-index` prop', async () => {
    const onUpdate = jest.fn()
    const wrapper = mount(ZCarousel, {
      props: {
        onUpdateCurrentIndex: onUpdate
      },
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            })
          ]
        }
      }
    })

    await sleep(100)
    await wrapper.findAll('.z-carousel__dot')[1].trigger('click')
    expect(onUpdate).toHaveBeenCalled()
    wrapper.unmount()
  })
})
