import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'FullScreenInPage',
  render () {
    return (
      <svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M21.294 4.124l-4.59 4.59 1.59 1.59c.63.63.18 1.71-.71 1.71h-4.58c-.55 0-1-.45-1-1v-4.6c0-.89 1.08-1.34 1.71-.71l1.59 1.59 4.59-4.59a.996.996 0 011.41 0c.38.4.38 1.03-.01 1.42zm-17.17 17.17l4.59-4.59 1.59 1.59c.63.63 1.71.18 1.71-.71v-4.58c0-.55-.45-1-1-1h-4.6c-.89 0-1.34 1.08-.71 1.71l1.59 1.59-4.59 4.59a.996.996 0 000 1.41c.4.38 1.03.38 1.42-.01z"
          fill="currentColor"
        ></path>
      </svg>
    )
  }
})
