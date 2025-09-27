import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'overflowHorizontal',
  render () {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <circle cx="8" cy="16" r="2" fill="currentColor"></circle>
        <circle cx="16" cy="16" r="2" fill="currentColor"></circle>
        <circle cx="24" cy="16" r="2" fill="currentColor"></circle>
      </svg>
    )
  }
})
