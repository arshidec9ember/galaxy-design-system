/**
 * @jest-environment node
 */
import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { setup } from './../../_utils/css-render/vue3-ssr'
import { ZGrid, ZGridItem } from '..'

describe('SSR', () => {
  it('works 1', async () => {
    const app = createSSRApp(() => <ZGrid />)
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      console.log(e)
      expect(e).not.toBeTruthy()
    }
  })
  it('works 2', async () => {
    const app = createSSRApp(() => (
      <ZGrid>{{ default: () => <ZGridItem /> }}</ZGrid>
    ))
    setup(app)
    try {
      await renderToString(app)
    } catch (e) {
      console.log(e)
      expect(e).not.toBeTruthy()
    }
  })
})
