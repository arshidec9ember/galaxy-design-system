import type { VNodeChild } from 'vue'

export type OnUpdateModelValue = (value: string & null) => void
export type OnConfirm = OnUpdateModelValue
export type OnUpdateModelValueImpl = (value: string | null) => void
export type OnConfirmImpl = OnUpdateModelValueImpl

export type RenderLabel = (value: string | null) => VNodeChild
