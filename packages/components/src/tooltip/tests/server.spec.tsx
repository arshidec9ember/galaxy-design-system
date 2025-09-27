/**
 * @jest-environment node
 */
import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from './../../_utils/css-render/vue3-ssr'
import { ZTooltip } from '..'

describe('SSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <ZTooltip>
        {{
          trigger: () => 'kirby'
        }}
      </ZTooltip>
    ))
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
