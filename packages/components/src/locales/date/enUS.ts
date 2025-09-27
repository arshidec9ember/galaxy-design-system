import enUS from 'date-fns/esm/locale/en-US'
import type { Locale } from 'date-fns'

interface ZDateLocale {
  name: string
  locale: Locale
}

const dateEnUs: ZDateLocale = {
  name: 'en-US',
  locale: enUS
}

export type { ZDateLocale }
export default dateEnUs
