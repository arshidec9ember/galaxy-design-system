import type { Component } from 'vue'
import { ZMessageProvider } from '../../message'
import { ZDialogProvider } from '../../dialog'
import { ZNotificationProvider } from '../../notification'
import { ZLoadingBarProvider } from '../../loading-bar'
import { createDiscreteApp } from './discreteApp'
import type {
  DiscreteApi,
  DiscreteApiOptions,
  DiscreteApiType
} from './interface'

export function createDiscreteApi<T extends DiscreteApiType> (
  includes: T[],
  {
    configProviderProps,
    messageProviderProps,
    dialogProviderProps,
    notificationProviderProps,
    loadingBarProviderProps
  }: DiscreteApiOptions = {}
): DiscreteApi<T> {
  const providersAndProps: Array<{
    type: DiscreteApiType
    Provider: Component
    props: any
  }> = []

  includes.forEach((type) => {
    switch (type) {
      case 'message':
        providersAndProps.push({
          type,
          Provider: ZMessageProvider,
          props: messageProviderProps
        })
        break
      case 'notification':
        providersAndProps.push({
          type,
          Provider: ZNotificationProvider,
          props: notificationProviderProps
        })
        break
      case 'dialog':
        providersAndProps.push({
          type,
          Provider: ZDialogProvider,
          props: dialogProviderProps
        })
        break
      case 'loadingBar':
        providersAndProps.push({
          type,
          Provider: ZLoadingBarProvider,
          props: loadingBarProviderProps
        })
        break
    }
  })

  const discreteApp = createDiscreteApp({
    providersAndProps,
    configProviderProps
  })

  return discreteApp as any
}
