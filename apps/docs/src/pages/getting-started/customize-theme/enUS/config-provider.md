# Config Provider

`z-config-provider` is a Vue component that provides a global configuration for all components in the component library. It is a wrapper component that allows you to set the theme and other global configurations for all components inside it.

In this case, we are specifically looking into how to customize the theme using `z-config-provider`.

## Usage

```html
<template>
  <z-config-provider>
    <my-app />
  </z-config-provider>
</template>

<script>
  import { ZConfigProvider } from '@zeta-gds/components'

  export default {
    components: {
      ZConfigProvider
    }
  }
</script>
```

### `themeOverrides` prop

The `themeOverrides` prop is used to override the default theme variables for each component.

```ts
export interface GlobalThemeWithoutCommon {
  /**
   * Link component theme.
   **/
  Link?: LinkTheme
  /**
   * All the themes that can be found in the component library.
   **/
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
  Switch?: SwitchTheme
  Panel?: PanelTheme
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
```

## API

`ConfigProvider` accepts the following props:

### ConfigProvider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| shadowMode | `boolean` | `undefined` | When true, ensures the library adjusts to being rendered in a custom element with shadow DOM. |
| onShadowRootFound | `(found: boolean, rootNode?: ShadowRoot) => void` | `undefined` | Callback function triggered when the shadow root is found. |
| abstract | `boolean` | `undefined` | Indicates if the component is abstract. |
| bordered | `boolean \| undefined` | `undefined` | Whether the component has a border. |
| clsPrefix | `string` | `defaultClsPrefix` | Prefix for CSS classes to avoid conflicts. |
| locale | `ZLocale \| null` | `undefined` | Locale settings for internationalization. |
| dateLocale | `ZDateLocale \| null` | `undefined` | Locale settings specifically for dates. |
| namespace | `string` | `undefined` | Namespace to scope CSS styles. |
| rtl | `RtlProp` | `undefined` | Configuration for right-to-left text direction support. |
| tag | `string` | `'div'` | HTML tag to use for the component. |
| hljs | `Hljs` | `undefined` | Configuration for syntax highlighting with highlight.js. |
| katex | `Katex` | `undefined` | Configuration for rendering mathematical expressions with KaTeX. |
| theme | `GlobalTheme \| null` | `undefined` | Theme settings for styling the component. |
| `themeOverrides` | `GlobalThemeOverrides \| null` | `undefined` | Overrides for the theme settings. |
| componentOptions | `GlobalComponentConfig` | `undefined` | Configuration for individual component options. |
| icons | `GlobalIconConfig` | `undefined` | Configuration for icons used in the component. |
| breakpoints | `Breakpoints` | `undefined` | Configuration for responsive design breakpoints. |
| preflightStyleDisabled | `boolean` | `undefined` | Whether to disable preflight styles. |
| inlineThemeDisabled | `boolean` | `undefined` | Whether to disable inline themes. |
