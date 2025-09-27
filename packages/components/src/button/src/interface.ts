export type Size = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

export type Justify = 'center' | 'space-between' | 'space-evenly'

export type Type =
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'

export interface ButtonColor {
  color: string
  textColor: string
  iconColor: string
}

export enum Variant {
  FILLED = 'filled',
  OUTLINED = 'outlined',
  LIGHT = 'light',
  SUBTLE = 'subtle',
  TEXT = 'text',
  LINK = 'link',
  DEFAULT = 'default'
}
