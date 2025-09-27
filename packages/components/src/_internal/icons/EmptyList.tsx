import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'Empty',
  render () {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none">
        <path d="M10 12H0V14H10V12Z" fill="currentColor" />
        <path d="M22 12H12V14H22V12Z" fill="currentColor" />
        <path d="M10 16H0V18H10V16Z" fill="currentColor" />
        <path d="M22 16H12V18H22V16Z" fill="currentColor" />
        <path d="M10 20H0V22H10V20Z" fill="currentColor" />
        <path d="M22 20H12V22H22V20Z" fill="currentColor" />
        <path
          d="M0 1V9C0 9.26522 0.105357 9.51957 0.292893 9.70711C0.48043 9.89464 0.734784 10 1 10H21C21.2652 10 21.5196 9.89464 21.7071 9.70711C21.8946 9.51957 22 9.26522 22 9V1C22 0.734784 21.8946 0.48043 21.7071 0.292893C21.5196 0.105357 21.2652 0 21 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1ZM10 7H3V3H10V7ZM19 7H12V3H19V7Z"
          fill="currentColor"
        />
      </svg>
    )
  }
})
