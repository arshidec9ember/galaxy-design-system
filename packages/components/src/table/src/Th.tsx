import { defineComponent, h, Fragment } from 'vue'

import { ZTitle } from '../../typography'

export default defineComponent({
  name: 'Th',
  render () {
    return (
      <>
        <th>
          <ZTitle variant="5-m">{this.$slots}</ZTitle>
        </th>
      </>
    )
  }
})
