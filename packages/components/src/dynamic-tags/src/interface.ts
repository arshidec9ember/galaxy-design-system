export type OnUpdateModelValue =
  | ((value: string[]) => void)
  | ((value: DynamicTagsOption[]) => void)

export type OnUpdateModelValueImpl = (
  value: Array<string | DynamicTagsOption>
) => void

export type OnCreate = (label: string) =>
| {
  label: string
  value: string
}
| string

export interface DynamicTagsOption {
  label: string
  value: string
}
