import type { VNodeChild, Ref } from 'vue'
import type { CNode } from './../../_utils/css-render'
import type { AlertTheme } from '../../alert/styles'
import type { AnchorTheme } from '../../anchor/styles'
import type { AutoCompleteTheme } from '../../auto-complete/styles'
import type { AvatarTheme } from '../../avatar/styles'
import type { AvatarGroupTheme } from '../../avatar-group/styles'
import type { BackToTopTheme } from '../../back-to-top/styles'
import type { BadgeTheme } from '../../badge/styles'
import type { LinkTheme } from '../../link/styles'
import type { BreadcrumbTheme } from '../../breadcrumb/styles'
import type { ButtonTheme } from '../../button/styles'
import type { CalendarTheme } from '../../calendar/styles'
import type { CardTheme } from '../../card/styles'
import type { CarouselTheme } from '../../carousel/styles'
import type { CascaderTheme } from '../../cascader/styles'
import type { CheckboxTheme } from '../../checkbox/styles'
import type { CodeTheme } from '../../code/styles'
import type { JsonViewerTheme } from '../../json-viewer/styles'
import type { AccordionTheme } from '../../accordion/styles'
import type { ColorPickerTheme } from '../../color-picker/styles'
import type { DataTableTheme } from '../../data-table/styles'
import type { DataTableSettingsTheme } from '../../data-table-settings/styles'
import type { DatePickerTheme } from '../../date-picker/styles'
import type { DetailsTheme } from '../../details/styles'
import type { DetailsViewTheme } from '../../detail-view/styles'
import type { DialogTheme } from '../../dialog/styles'
import type { DividerTheme } from '../../divider/styles'
import type { DrawerTheme } from '../../drawer/styles'
import type { DropdownTheme } from '../../dropdown/styles'
import type { DynamicInputTheme } from '../../dynamic-input/styles'
import type { DynamicTagsTheme } from '../../dynamic-tags/styles'
import type { ElementTheme } from '../../element/styles'
import type { EllipsisTheme } from '../../ellipsis/styles'
import type { EmptyTheme } from '../../empty/styles'
import type { EquationTheme } from '../../equation/styles'
import type { TextEditorTheme } from '../../text-editor/styles'
import type { FormTheme } from '../../form/styles'
import type { FilterTheme } from '../../filter/styles'
import type { GradientTextTheme } from '../../gradient-text/styles'
import type { IconTheme } from '../../icon/styles'
import type { IconWrapperTheme } from '../../icon-wrapper/styles'
import type { ImageTheme } from '../../image/styles'
import type { InputTheme } from '../../input/styles'
import type { InputNumberTheme } from '../../input-number/styles'
import type { LayoutTheme } from '../../layout/styles'
import type { LegacyTransferTheme } from '../../legacy-transfer/styles'
import type { ListTheme } from '../../list/styles'
import type { LoadingBarTheme } from '../../loading-bar/styles'
import type { LogTheme } from '../../log/styles'
import type { MenuTheme } from '../../menu/styles'
import type { MentionTheme } from '../../mention/styles'
import type { MessageTheme } from '../../message/styles'
import type { ModalTheme } from '../../modal/styles'
import type { NotificationTheme } from '../../notification/styles'
import type { PageHeaderTheme } from '../../page-header/styles'
import type { PaginationTheme } from '../../pagination/styles'
import type { PopconfirmTheme } from '../../popconfirm/styles'
import type { PopoverTheme } from '../../popover/styles'
import type { PopselectTheme } from '../../popselect/styles'
import type { ProgressTheme } from '../../progress/styles'
import type { RadioTheme } from '../../radio/styles'
import type { RatingTheme } from '../../rating/styles'
import type { ResultTheme } from '../../result/styles'
import type { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import type { SelectTheme } from '../../select/styles'
import type { SkeletonTheme } from '../../skeleton/styles'
import type { SliderTheme } from '../../slider/styles'
import type { SpaceTheme } from '../../space/styles'
import type { SpinnerTheme } from '../../spinner/styles'
import type { StatisticTheme } from '../../statistic/styles'
import type { StepperTheme } from '../../stepper/styles'
import type { SuperDatePickerTheme } from '../../super-date-picker/styles'
import type { SwitchTheme } from '../../switch/styles'
import type { PanelTheme } from '../../panel/styles'
import type { FloatingPanelTheme } from '../../floating-panel/styles'
import type { TableTheme } from '../../table/styles'
import type { TabsTheme } from '../../tabs/styles'
import type { TagTheme } from '../../tag/styles'
import type { FacadeTheme } from '../../facade/styles'
import type { TimePickerTheme } from '../../time-picker/styles'
import type { TimelineTheme } from '../../timeline/styles'
import type { TooltipTheme } from '../../tooltip/styles'
import type { TransferTheme } from '../../transfer/styles'
import type { TreeTheme } from '../../tree/styles'
import type { TreeSelectTheme } from '../../tree-select/styles'
import type { TypographyTheme } from '../../typography/styles'
import type { UploadTheme } from '../../upload/styles'
import type { WatermarkTheme } from '../../watermark/styles'
import type { InternalSelectMenuTheme } from '../../_internal/select-menu/styles'
import type { InternalSelectionTheme } from '../../_internal/selection/styles'
import type { ZDateLocale, ZLocale } from '../../locales'
import type { Hljs } from '../../_mixins'
import type { Size as TimePickerSize } from '../../time-picker/src/interface'
import type { Size as InputSize } from '../../input/src/interface'
import type { Size as SelectSize } from '../../select/src/interface'
import type { Size as ButtonSize } from '../../button/src/interface'
import type {
  DataTableRenderFilter,
  DataTableRenderSorter
} from '../../data-table'
import type { IconPlacement } from '../../dialog/src/interface'
import type { GlobalTheme, GlobalThemeOverrides } from './interface'
import type { EmptyProps } from '../../empty'
import type { CollapseTransitionTheme } from '../../collapse-transition/styles'
import type { ButtonGroupTheme } from '../../button-group/styles/light'
import type { RowTheme } from '../../row-column/styles'
import type { Katex } from './katex'
import { type PopselectSize } from '../../popselect/src/interface'
import { type CardStandardTheme } from '../../card-standard/styles'

export interface GlobalThemeWithoutCommon {
  Link?: LinkTheme
  Alert?: AlertTheme
  Anchor?: AnchorTheme
  AutoComplete?: AutoCompleteTheme
  Avatar?: AvatarTheme
  AvatarGroup?: AvatarGroupTheme
  BackToTop?: BackToTopTheme
  Badge?: BadgeTheme
  Breadcrumb?: BreadcrumbTheme
  Button?: ButtonTheme
  ButtonGroup?: ButtonGroupTheme
  Calendar?: CalendarTheme
  Card?: CardTheme
  CardStandard?: CardStandardTheme
  Carousel?: CarouselTheme
  Cascader?: CascaderTheme
  Checkbox?: CheckboxTheme
  Code?: CodeTheme
  JsonViewer?: JsonViewerTheme
  Accordion?: AccordionTheme
  CollapseTransition?: CollapseTransitionTheme
  ColorPicker?: ColorPickerTheme
  DataTableSettings?: DataTableSettingsTheme
  DataTable?: DataTableTheme
  DatePicker?: DatePickerTheme
  Details?: DetailsTheme
  DetailsView?: DetailsViewTheme
  Dialog?: DialogTheme
  Divider?: DividerTheme
  Drawer?: DrawerTheme
  Dropdown?: DropdownTheme
  DynamicInput?: DynamicInputTheme
  DynamicTags?: DynamicTagsTheme
  Element?: ElementTheme
  Ellipsis?: EllipsisTheme
  Empty?: EmptyTheme
  Equation?: EquationTheme
  TextEditor?: TextEditorTheme
  Form?: FormTheme
  Filter?: FilterTheme
  GradientText?: GradientTextTheme
  Icon?: IconTheme
  IconWrapper?: IconWrapperTheme
  Image?: ImageTheme
  Input?: InputTheme
  InputNumber?: InputNumberTheme
  Layout?: LayoutTheme
  LegacyTransfer?: LegacyTransferTheme
  List?: ListTheme
  LoadingBar?: LoadingBarTheme
  Log?: LogTheme
  Menu?: MenuTheme
  Mention?: MentionTheme
  Message?: MessageTheme
  Modal?: ModalTheme
  Notification?: NotificationTheme
  PageHeader?: PageHeaderTheme
  Pagination?: PaginationTheme
  Popconfirm?: PopconfirmTheme
  Popover?: PopoverTheme
  Popselect?: PopselectTheme
  Progress?: ProgressTheme
  Radio?: RadioTheme
  Rating?: RatingTheme
  Result?: ResultTheme
  Scrollbar?: ScrollbarTheme
  Select?: SelectTheme
  Skeleton?: SkeletonTheme
  Slider?: SliderTheme
  Space?: SpaceTheme
  Spinner?: SpinnerTheme
  Statistic?: StatisticTheme
  Stepper?: StepperTheme
  SuperDatePicker?: SuperDatePickerTheme
  Switch?: SwitchTheme
  Panel?: PanelTheme
  FloatingPanelContainer?: FloatingPanelTheme
  FloatingPanel?: FloatingPanelTheme
  Table?: TableTheme
  Tabs?: TabsTheme
  Tag?: TagTheme
  Facade?: FacadeTheme
  TimePicker?: TimePickerTheme
  Timeline?: TimelineTheme
  Tooltip?: TooltipTheme
  Transfer?: TransferTheme
  Tree?: TreeTheme
  TreeSelect?: TreeSelectTheme
  Typography?: TypographyTheme
  Upload?: UploadTheme
  Watermark?: WatermarkTheme
  Row?: RowTheme
  // internal
  InternalSelectMenu?: InternalSelectMenuTheme
  InternalSelection?: InternalSelectionTheme
}

export interface GlobalComponentConfig {
  Pagination?: {
    inputSize?: InputSize
    selectSize?: SelectSize
    popSelectSize?: PopselectSize
  }
  DatePicker?: {
    timePickerSize?: TimePickerSize
  }
  Dialog?: {
    iconPlacement?: IconPlacement
  }
  DataTable?: {
    renderFilter?: DataTableRenderFilter
    renderSorter?: DataTableRenderSorter
  }
  DynamicInput?: {
    buttonSize?: ButtonSize
  }
  Empty?: Pick<EmptyProps, 'title' | 'description' | 'renderIcon'>
}

export interface GlobalIconConfig {
  attach?: () => VNodeChild
  cancel?: () => VNodeChild
  clear?: () => VNodeChild
  close?: () => VNodeChild
  arrowDropDown?: () => VNodeChild
  arrowDropUp?: () => VNodeChild
  copy?: () => VNodeChild
  date?: () => VNodeChild
  download?: () => VNodeChild
  error?: () => VNodeChild
  info?: () => VNodeChild
  retry?: () => VNodeChild
  success?: () => VNodeChild
  time?: () => VNodeChild
  to?: () => VNodeChild
  trash?: () => VNodeChild
  warning?: () => VNodeChild
  rotateClockwise?: () => VNodeChild
  rotateCounterclockwise?: () => VNodeChild
  zoomIn?: () => VNodeChild
  zoomOut?: () => VNodeChild
  overflowHorizontal?: () => VNodeChild
  newTab?: () => VNodeChild
  fullScreen?: () => VNodeChild
  fullScreenSquare?: () => VNodeChild
  closeFullScreen?: () => VNodeChild
  keyboardArrowUp?: () => VNodeChild
  keyboardArrowDown?: () => VNodeChild
}

export interface RtlItem {
  name: keyof GlobalThemeWithoutCommon
  style: CNode
  peers?: RtlItem[]
}
export type RtlProp = RtlItem[]

export type RtlEnabledState = Partial<
  Record<keyof GlobalThemeWithoutCommon, RtlItem>
>

export type Breakpoints = Record<string, number> | undefined

export interface ConfigProviderInjection {
  mergedBreakpointsRef: Ref<Breakpoints | undefined>
  mergedClsPrefixRef: Ref<string>
  mergedBorderedRef: Ref<boolean | undefined>
  mergedNamespaceRef: Ref<string | undefined>
  mergedLocaleRef: Ref<ZLocale | undefined>
  mergedDateLocaleRef: Ref<ZDateLocale | undefined>
  mergedHljsRef: Ref<Hljs | undefined>
  mergedKatexRef: Ref<Katex | undefined>
  mergedComponentPropsRef: Ref<GlobalComponentConfig | undefined>
  mergedIconsRef: Ref<GlobalIconConfig | undefined>
  mergedThemeRef: Ref<GlobalTheme | undefined>
  mergedThemeOverridesRef: Ref<GlobalThemeOverrides | undefined>
  mergedRtlRef: Ref<RtlEnabledState | undefined>
  mergedThemeHashRef: Ref<string>
  mergedGDSTokenRef: Ref<any>
  // non-reactive
  inlineThemeDisabled: boolean
  preflightStyleDisabled: boolean
  shadowMode: boolean
  shadowRootNodeRef: Ref<ShadowRoot | null>
}
