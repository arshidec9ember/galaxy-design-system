export {}

declare global {
  const __DEV__: boolean
  const __FAILED__TESTCASES__: boolean
}

declare module 'vue' {
  export type PublicProps = Record<string, any>
}
declare module '*.css'
