import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { ZRow, ZCol } from '../index'

describe('z-grid', () => {
  it('should work with import on demand', () => {
    mount(
      defineComponent({
        render () {
          return (
            <ZRow>
              {{
                default: () => [<ZCol />]
              }}
            </ZRow>
          )
        }
      })
    )
  })
})
