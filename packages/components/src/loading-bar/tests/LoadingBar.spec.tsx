import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { sleep } from 'seemly'
import { ZLoadingBarProvider, useLoadingBar } from '../index'

const Provider = defineComponent({
  render () {
    return <ZLoadingBarProvider>{this.$slots}</ZLoadingBarProvider>
  }
})

describe('z-loading-bar', () => {
  it('should work with import on demand', () => {
    mount(ZLoadingBarProvider)
  })

  it('should have start type', async () => {
    const Test = defineComponent({
      setup () {
        const loadingBar = useLoadingBar()
        loadingBar.start()
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await sleep(0)
    expect(document.querySelector('.z-loading-bar')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should have finish type', async () => {
    const Test = defineComponent({
      setup () {
        const loadingBar = useLoadingBar()
        loadingBar.start()
        setTimeout(() => {
          loadingBar.finish()
        }, 0)
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await sleep(0)
    expect(document.querySelector('.z-loading-bar--finishing')).not.toEqual(
      null
    )
    wrapper.unmount()
  })

  it('should have error type', () => {
    const Test = defineComponent({
      setup () {
        const loadingBar = useLoadingBar()
        loadingBar.error()
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    setTimeout(() => {
      expect(document.querySelector('.z-loading-bar--error')).not.toEqual(null)
      wrapper.unmount()
    }, 0)
  })

  it('should have loadingBarStyle prop', async () => {
    const Test = defineComponent({
      setup () {
        const loadingBar = useLoadingBar()
        loadingBar.error()
      },
      render () {
        return null
      }
    })
    const wrapper = mount(ZLoadingBarProvider, {
      props: {
        loadingBarStyle: {
          error: {
            height: '5px',
            color: '#ccc'
          }
        }
      },
      slots: {
        default: () => <Test />
      }
    })
    await sleep(0)
    expect(
      document.querySelector('.z-loading-bar--error')?.getAttribute('style')
    ).toContain('height: 5px;')
    wrapper.unmount()
  })
})
