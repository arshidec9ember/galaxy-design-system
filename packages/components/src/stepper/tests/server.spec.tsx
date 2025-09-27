/**
 * @jest-environment node
 */
import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { ZStepper } from '..'
import { setup } from './../../_utils/css-render/vue3-ssr'

describe('SSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => <ZStepper />)
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
