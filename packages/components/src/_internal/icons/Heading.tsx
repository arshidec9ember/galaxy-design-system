import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'Heading',
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
          d="M10.4 7.33333H5.6V3.66667C5.6 3.3 5.24 3 4.8 3C4.36 3 4 3.3 4 3.66667V12.3333C4 12.7 4.36 13 4.8 13C5.24 13 5.6 12.7 5.6 12.3333V8.66667H10.4V12.3333C10.4 12.7 10.76 13 11.2 13C11.64 13 12 12.7 12 12.3333V3.66667C12 3.3 11.64 3 11.2 3C10.76 3 10.4 3.3 10.4 3.66667V7.33333Z"
          fill="#4C5675"
        />
      </svg>
    )
  }
})
