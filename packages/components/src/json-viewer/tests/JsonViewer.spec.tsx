import { mount } from '@vue/test-utils'
import { ZJsonViewer } from '../../index'

describe('z-json-viewer', () => {
  it('should work with import on demand', () => {
    mount(ZJsonViewer)
  })
})
