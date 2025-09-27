import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'BrokenImagePlaceHolder',
  render () {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M35 8.33333V19.3167L31.1833 15.4833C30.5333 14.8333 29.4667 14.8333 28.8167 15.4833L23.3333 20.9833L17.85 15.5C17.2 14.85 16.15 14.85 15.5 15.5L10 20.9833L5 15.9667V8.33333C5 6.5 6.5 5 8.33333 5H31.6667C33.5 5 35 6.5 35 8.33333ZM30 19.0333L35 24.05V31.6667C35 33.5 33.5 35 31.6667 35H8.33333C6.5 35 5 33.5 5 31.6667V20.7L8.81667 24.5167C9.46667 25.1667 10.5167 25.1667 11.1667 24.5167L16.6667 19.0167L22.15 24.5C22.8 25.15 23.85 25.15 24.5 24.5L30 19.0333Z"
          fill="currentColor"
        />
      </svg>
    )
  }
})
