import { merge } from 'lodash-es'
import { type ZLocale } from '../common/enUS'

export type ZPartialLocale = {
  [key in keyof ZLocale]+?: {
    [childKey in keyof ZLocale[key]]+?: ZLocale[key][childKey]
  }
}

export function createLocale (locale: ZLocale): ZLocale
export function createLocale (
  locale: ZPartialLocale,
  fallbackLocale: ZLocale
): ZLocale
export function createLocale (
  locale: ZPartialLocale,
  fallbackLocale?: ZLocale
): ZLocale {
  return merge({}, fallbackLocale, locale)
}
