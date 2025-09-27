import { mount } from '@vue/test-utils'
import { ZConfigProvider } from '../index'

describe('z-config-provider', () => {
  it('should work with import on demand', () => {
    mount(ZConfigProvider)
  })
})
