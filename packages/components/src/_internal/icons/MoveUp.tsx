import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'MoveUp',
  render () {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M3.505 13.576a4.985 4.985 0 014.07-5.18l-.79.78a.996.996 0 101.41 1.41l2.59-2.59a.996.996 0 000-1.41l-2.58-2.59a.996.996 0 10-1.41 1.41l.88.88v.06a6.995 6.995 0 00-6.15 7.47c.26 3.7 3.52 6.48 7.23 6.48h1.74c.55 0 1-.45 1-1s-.45-1-1-1h-1.78c-2.7 0-5.07-2.04-5.21-4.72zM13.495 15.296v3c0 1.1.9 2 2 2h5c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2h-5c-1.1 0-2 .9-2 2zm7 3h-5v-3h5v3zM20.495 4.296h-5c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h5c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2z"
          fill="currentColor"
        ></path>
      </svg>
    )
  }
})
