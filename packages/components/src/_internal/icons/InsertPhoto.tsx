import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'InsertPhoto',
  render () {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14 3.33333V12.6667C14 13.4 13.4 14 12.6667 14H3.33333C2.6 14 2 13.4 2 12.6667V3.33333C2 2.6 2.6 2 3.33333 2H12.6667C13.4 2 14 2.6 14 3.33333ZM7.33327 11.0066L5.93327 9.31996C5.79327 9.15329 5.53994 9.15996 5.41327 9.33329L3.75327 11.4666C3.57994 11.6866 3.73327 12.0066 4.01327 12.0066H12.0066C12.2799 12.0066 12.4399 11.6933 12.2733 11.4733L9.93327 8.35329C9.79994 8.17329 9.53327 8.17329 9.39994 8.34663L7.33327 11.0066Z"
          fill="currentColor"
        />
      </svg>
    )
  }
})
