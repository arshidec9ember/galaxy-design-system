import { inject, provide } from 'vue'
import type { Ref } from 'vue'
import { createInjectionKey } from '../../_utils'

export interface CardContextValue {
  size: Ref<string>
  bordered: Ref<boolean>
  setHasBackground: (value: boolean) => void
}

export interface CardSelectorContextValue {
  multipleRef: Ref<boolean>
}

const cardInjectionKey = createInjectionKey<CardContextValue>('z-card')
const cardSelectorInjectionKey =
  createInjectionKey<CardSelectorContextValue>('z-card-selector')

export const provideCardContext = (contextValue: CardContextValue): void => {
  provide(cardInjectionKey, contextValue)
}
export const provideCardSelectorContext = (
  contextValue: CardSelectorContextValue
): void => {
  provide(cardSelectorInjectionKey, contextValue)
}

export const useCardContext = (): CardContextValue | undefined => {
  const CardContext = inject(cardInjectionKey)
  return CardContext
}

export const useCardSelectorContext = ():
| CardSelectorContextValue
| undefined => {
  const CardSelectorContext = inject(cardSelectorInjectionKey, undefined)
  return CardSelectorContext
}
