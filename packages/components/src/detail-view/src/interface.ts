import type {
  Ref,
  StyleValue,
  DataHTMLAttributes,
  Slots,
  VNode,
  VNodeChild
} from 'vue'

import { type AccordionProps } from '../../accordion'

// Define common types
export type Key = string
export type Val = string | number | any

export type DetailsViewData = any

// Define the supported render types
export type RenderType =
  | 'accordion'
  | 'header'
  | 'json'
  | 'text'
  | 'link'
  | 'array'
  | 'status'
  | 'avatar'
  | 'template'
  | 'child'
  | 'slot'
  | 'divider'
  | 'default'

// Define the base properties shared by various components
export interface BaseAttributes {
  // Styles
  keyStyle?: StyleValue
  valueStyle?: StyleValue
  contentStyle?: StyleValue
  sectionStyle?: StyleValue
  // Attributes
  keyAttrs?: DataHTMLAttributes
  valueAttrs?: DataHTMLAttributes
  contentAttrs?: DataHTMLAttributes
  sectionAttrs?: DataHTMLAttributes
  // Helpers
  tooltipContent?: string
  hasBottomDivider?: boolean
}

// Define specific properties for each component type
interface SlotAttributes extends BaseAttributes {
  slotLabel: string
  slotValue: string
}
interface AccordionAttributes extends BaseAttributes {
  accordionStyle?: StyleValue
  accordionItemStyle?: StyleValue
}
interface HeaderAttributes extends BaseAttributes {
  hasBottomDivider: boolean
}
interface JsonAttributes extends BaseAttributes {
  height: number
}
interface TextAttributes extends BaseAttributes {
  label: string
}
interface DefaultAttributes extends BaseAttributes {
  label?: (dataItem: DetailsViewItem<'default'>) => VNode | Key
  value?: (dataItem: DetailsViewItem<'default'>) => VNode | Val
}
interface LinkAttributes extends BaseAttributes {
  alt?: string
  src?: string
  href?: string
  target?: string
  isVisited?: boolean
}
interface ArrayAttributes extends BaseAttributes {
  variant: 'text' | 'badge'
  value: Val[]
}
interface StatusAttributes extends BaseAttributes {
  type?: string
  indicator?: string
  emphasis?: string
  label?: string
}
interface AvatarAttributes extends BaseAttributes {
  size?: string
  alt?: string
  src?: string
}
interface TemplateAttributes extends BaseAttributes {
  renderValue?: (dataItem?: DetailsViewItem<'template'>) => VNode | Val
  renderLabel?: (dataItem?: DetailsViewItem<'template'>) => VNode | Val
}
interface DividerAttributes extends BaseAttributes {}

// Define the properties for each component based on RenderType
export type Attributes<T extends RenderType> = T extends 'accordion'
  ? AccordionAttributes
  : T extends 'header'
    ? HeaderAttributes
    : T extends 'default'
      ? DefaultAttributes
      : T extends 'slot'
        ? SlotAttributes
        : T extends 'json'
          ? JsonAttributes
          : T extends 'text'
            ? TextAttributes
            : T extends 'link'
              ? LinkAttributes
              : T extends 'array'
                ? ArrayAttributes
                : T extends 'status'
                  ? StatusAttributes
                  : T extends 'avatar'
                    ? AvatarAttributes
                    : T extends 'template'
                      ? TemplateAttributes
                      : T extends 'divider'
                        ? DividerAttributes
                        : BaseAttributes

// Define the structure of data items
export interface DetailsViewItem<T extends RenderType>
  extends KeyValPair,
  UISlots {
  type?: T
  attributes?: Attributes<T>
}

interface KeyValPair {
  label: Key
  value?: Val
}

interface UISlots {
  child?: Array<DetailsViewItem<RenderType>>
  slots?: Slots
}

// Define the root data type
export type DetailsViewRoot = Array<DetailsViewItem<RenderType>>

// ------------------------------------------------------------------------------

export enum RenderDirection {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL'
}

export type RenderLabel = (label: string, value?: any, data?: any) => VNodeChild
export type RenderValue = (value: any, label?: string, data?: any) => VNodeChild
export type RenderNode = (node: ViewNode) => VNodeChild

interface ViewRenderers {
  renderLabel: RenderLabel
  renderValue: RenderValue
  renderNode: RenderNode
}

type FunctionType<T> = (args: any[]) => T

export interface ViewRendererOptions extends Partial<ViewRenderers> {
  formatLabel?: (label: string | number) => string
  formatValue?: <T>(value: T) => T
  prefixValue?: string | RenderValue
  prefixLabel?: string | RenderLabel
  suffixValue?: string | RenderValue
  suffixLabel?: string | RenderLabel
  prefixNode?: string | RenderNode
  suffixNode?: string | RenderNode
  nodeStyles?: Record<string, string>
  labelStyles?: Record<string, string>
  valueStyles?: Record<string, string>
  nodeClass?: string
  labelClass?: string
  valueClass?: string
  divider?: boolean
  keyOrder?: string[] | FunctionType<string[]>
  hideNilValues?: boolean | FunctionType<boolean>
  defaultValue?: boolean | FunctionType<boolean>
  options?: Partial<{
    tooltip?: string | FunctionType<string>
    gridSize: number
    labelSpan: number
    valueSpan: number
    arrayDirection: 'vertical' | 'horizontal'
    accordionProps: AccordionProps
  }>
}

export type OverridesOptions = Record<string, ViewRendererOptions>

export type DataTypes =
  | 'string' // could use `text`
  | 'boolean'
  | 'number'
  | 'object'
  | 'array'
  | 'string-array'

export interface ViewNode extends ViewRendererOptions {
  data: {
    key: string
    value: any
  }
  level: number
  path: string
}

export interface DetailsViewOptions {
  gridSize: number
  labelSpan: number
  valueSpan: number
  arrayDirection: 'vertical' | 'horizontal'
  accordionProps: AccordionProps
  renderType: 'accordion'
  tooltip: string | FunctionType<string>
  accordionLevelLimit: number
  jsonViewerLevelOffset: number
}

export interface DetailsViewInjection {
  labelClassRef?: Ref<string | undefined>
  labelStylesRef?: Ref<Record<string, string> | undefined>
  valueClassRef?: Ref<string | undefined>
  valueStylesRef?: Ref<Record<string, string> | undefined>
  nodeClassRef?: Ref<string | undefined>
  nodeStylesRef?: Ref<Record<string, string> | undefined>
  renderLabelRef?: Ref<RenderLabel | undefined>
  renderPrefixLabelRef?: Ref<RenderLabel | undefined>
  renderSuffixLabelRef?: Ref<RenderLabel | undefined>
  renderValueRef?: Ref<RenderValue | undefined>
  renderPrefixValueRef?: Ref<RenderValue | undefined>
  renderSuffixValueRef?: Ref<RenderValue | undefined>
  renderNodeRef?: Ref<RenderNode | undefined>
  renderPrefixNodeRef?: Ref<RenderNode | undefined>
  renderSuffixNodeRef?: Ref<RenderNode | undefined>
  overridesRef?: Ref<OverridesOptions | undefined>
  dividerRef?: Ref<boolean | undefined>
  options?: Ref<Partial<DetailsViewOptions> | undefined>
  contentHeight?: () => void
}
