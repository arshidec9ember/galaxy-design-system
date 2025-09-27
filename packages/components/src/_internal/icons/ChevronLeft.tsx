import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'ChevronLeft',
  render () {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 15.875L11.12 11.995L15 8.11496C15.39 7.72496 15.39 7.09496 15 6.70496C14.8132 6.51771 14.5595 6.41248 14.295 6.41248C14.0305 6.41248 13.7769 6.51771 13.59 6.70496L9.00002 11.295C8.61002 11.685 8.61002 12.315 9.00002 12.705L13.59 17.295C13.98 17.685 14.61 17.685 15 17.295C15.38 16.905 15.39 16.265 15 15.875Z"
          fill="currentColor"
        />
      </svg>
    )
  }
})
