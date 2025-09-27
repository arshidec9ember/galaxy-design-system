import type { VNodeChild } from 'vue'
import type { MessageSetupProps } from './message-props'

export type MessageType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'loading'
  | 'neutral'

// We should export keepAliveOnHover since it's not managed by users
export type RenderMessageProps = Pick<
MessageSetupProps,
'closable' | 'content' | 'icon' | 'onClose' | 'color'
>

export type MessageRenderMessage = (props: RenderMessageProps) => VNodeChild

export interface MessageOptions {
  color?: MessageType
  render?: MessageRenderMessage
  duration?: number
  closable?: boolean
  keepAliveOnHover?: boolean
  icon?: () => VNodeChild
  showIcon?: boolean
  onClose?: () => void
  onLeave?: () => void
  onAfterLeave?: () => void
}
