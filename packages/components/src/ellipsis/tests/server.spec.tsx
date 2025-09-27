/**
 * @jest-environment node
 */
import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from './../../_utils/css-render/vue3-ssr'
import { ZEllipsis } from '..'

describe('SSR', () => {
  it('works', async () => {
    const app = createSSRApp(() => (
      <ZEllipsis>
        {{
          trigger: () => 'kirby'
        }}
      </ZEllipsis>
    ))
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
