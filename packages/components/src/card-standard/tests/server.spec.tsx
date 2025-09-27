/**
 * @jest-environment node
 */
import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { ZCardStandard } from '..'
import { setup } from './../../_utils/css-render/vue3-ssr'

describe('SSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => <ZCardStandard />)
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
