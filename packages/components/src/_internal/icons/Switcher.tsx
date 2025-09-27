import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'Switcher',
  render () {
    return (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 10.805 17.383 L 14.895 13.293 C 15.513 12.679 15.513 11.684 14.895 11.067 L 10.805 6.976 C 9.81 5.999 8.104 6.692 8.104 8.098 L 8.104 16.264 C 8.104 17.685 9.81 18.379 10.805 17.383 Z"
          fill="currentColor"
        />
      </svg>
    )
  }
})
