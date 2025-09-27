import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'FlowChart',
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
          d="M2.66658 9.99992H3.99992V7.33325L7.33325 7.33325V5.99992L5.99992 5.99992V1.33325L9.99992 1.33325V5.99992H8.66658V7.33325H11.9999V9.99992H13.3333V14.6666H9.33325V9.99992H10.6666V8.66658H5.33325V9.99992H6.66658V14.6666H2.66658V9.99992ZM3.99992 11.3333V13.3333H5.33325V11.3333H3.99992ZM7.33325 2.66659V4.66658H8.66658V2.66659L7.33325 2.66659ZM10.6666 11.3333V13.3333H11.9999V11.3333H10.6666Z"
          fill="#4C5675"
        />
      </svg>
    )
  }
})
