import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'Minimize',
  render () {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.66667 16H15.3333C15.7 16 16 16.3 16 16.6667C16 17.0333 15.7 17.3333 15.3333 17.3333H8.66667C8.3 17.3333 8 17.0333 8 16.6667C8 16.3 8.3 16 8.66667 16Z"
          fill="currentColor"
        />
      </svg>
    )
  }
})
