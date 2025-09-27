import { h, defineComponent, ref } from 'vue'
import { ZButton } from '@zeta-gds/components'

const App = defineComponent({
  setup () {
    return {
      count: ref(0)
    }
  },
  render () {
    return [
      h(
        ZButton,
        {
          onClick: () => this.count++
        },
        { default: () => this.count }
      )
    ]
  }
})

export default App
