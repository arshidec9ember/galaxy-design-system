export type OnUpdateModelValue = (value: number | null) => void
export type Size = 'x-small' | 'small' | 'medium' | 'large'

export interface InputNumberInst {
  focus: () => void
  blur: () => void
  select: () => void
}
