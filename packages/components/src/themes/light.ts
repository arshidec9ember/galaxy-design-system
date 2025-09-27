// The file is for internal usage, do not export it, since all the components
// have default light theme.
import { commonLight } from '../_styles/common'
import { alertLight } from '../alert/styles'
import { anchorLight } from '../anchor/styles'
import { autoCompleteLight } from '../auto-complete/styles'
import { avatarLight } from '../avatar/styles'
import { avatarGroupLight } from '../avatar-group/styles'
import { backToTopLight } from '../back-to-top/styles'
import { badgeLight } from '../badge/styles'
import { breadcrumbLight } from '../breadcrumb/styles'
import { buttonLight } from '../button/styles'
import { buttonGroupLight } from '../button-group/styles'
import { calendarLight } from '../calendar/styles'
import { cardLight } from '../card/styles'
import { carouselLight } from '../carousel/styles'
import { cascaderLight } from '../cascader/styles'
import { checkboxLight } from '../checkbox/styles'
import { codeLight } from '../code/styles'
import { jsonViewerLight } from '../json-viewer/styles'
import { accordionLight } from '../accordion/styles'
import { collapseTransitionLight } from '../collapse-transition/styles'
import { colorPickerLight } from '../color-picker/styles'
import { dataTableLight } from '../data-table/styles'
import { dataTableSettingsLight } from '../data-table-settings/styles'
import { datePickerLight } from '../date-picker/styles'
import { detailsLight } from '../details/styles'
import { detailsViewLight } from '../detail-view/styles'
import { dialogLight } from '../dialog/styles'
import { dividerLight } from '../divider/styles'
import { drawerLight } from '../drawer/styles'
import { dropdownLight } from '../dropdown/styles'
import { dynamicInputLight } from '../dynamic-input/styles'
import { dynamicTagsLight } from '../dynamic-tags/styles'
import { elementLight } from '../element/styles'
import { ellipsisLight } from '../ellipsis/styles'
import { emptyLight } from '../empty/styles'
import { equationLight } from '../equation/styles'
import { textEditorLight } from '../text-editor/styles'
import { formLight } from '../form/styles'
import { gradientTextLight } from '../gradient-text/styles'
import { iconLight } from '../icon/styles'
import { iconWrapperLight } from '../icon-wrapper/styles'
import { imageLight } from '../image/styles'
import { inputLight } from '../input/styles'
import { inputNumberLight } from '../input-number/styles'
import { layoutLight } from '../layout/styles'
import { legacyTransferLight } from '../legacy-transfer/styles'
import { listLight } from '../list/styles'
import { loadingBarLight } from '../loading-bar/styles'
import { logLight } from '../log/styles'
import { menuLight } from '../menu/styles'
import { mentionLight } from '../mention/styles'
import { messageLight } from '../message/styles'
import { modalLight } from '../modal/styles'
import { notificationLight } from '../notification/styles'
import { pageHeaderLight } from '../page-header/styles'
import { paginationLight } from '../pagination/styles'
import { popconfirmLight } from '../popconfirm/styles'
import { popoverLight } from '../popover/styles'
import { popselectLight } from '../popselect/styles'
import { progressLight } from '../progress/styles'
import { radioLight } from '../radio/styles'
import { ratingLight } from '../rating/styles'
import { resultLight } from '../result/styles'
import { rowLight } from '../row-column/styles'
import { scrollbarLight } from '../_internal/scrollbar/styles'
import { selectLight } from '../select/styles'
import { skeletonLight } from '../skeleton/styles'
import { sliderLight } from '../slider/styles'
import { spaceLight } from '../space/styles'
import { spinnerLight } from '../spinner/styles'
import { statisticLight } from '../statistic/styles'
import { stepperLight } from '../stepper/styles'
import { superDatePickerLight } from '../super-date-picker/styles'
import { switchLight } from '../switch/styles'
import { panelLight } from '../panel/styles'
import { tableLight } from '../table/styles'
import { tabsLight } from '../tabs/styles'
import { tagLight } from '../tag/styles'
import { facadeLight } from '../facade/styles'
import { timePickerLight } from '../time-picker/styles'
import { timelineLight } from '../timeline/styles'
import { tooltipLight } from '../tooltip/styles'
import { transferLight } from '../transfer/styles'
import { typographyLight } from '../typography/styles'
import { treeLight } from '../tree/styles'
import { treeSelectLight } from '../tree-select/styles'
import { uploadLight } from '../upload/styles'
import { watermarkLight } from '../watermark/styles'
import type { BuiltInGlobalTheme } from './interface'
import { linkLight } from '../link/styles'
import { cardStandardLight } from '../card-standard/styles'
import { filterLight } from '../filter/styles'
import { floatingPanelLight } from '../floating-panel/styles'

export const lightTheme: BuiltInGlobalTheme = {
  name: 'light',
  common: commonLight,
  Alert: alertLight,
  Anchor: anchorLight,
  AutoComplete: autoCompleteLight,
  Avatar: avatarLight,
  AvatarGroup: avatarGroupLight,
  BackToTop: backToTopLight,
  Badge: badgeLight,
  Breadcrumb: breadcrumbLight,
  Button: buttonLight,
  ButtonGroup: buttonGroupLight,
  Calendar: calendarLight,
  Card: cardLight,
  CardStandard: cardStandardLight,
  Carousel: carouselLight,
  Cascader: cascaderLight,
  Checkbox: checkboxLight,
  Code: codeLight,
  JsonViewer: jsonViewerLight,
  Accordion: accordionLight,
  CollapseTransition: collapseTransitionLight,
  ColorPicker: colorPickerLight,
  DataTable: dataTableLight,
  DataTableSettings: dataTableSettingsLight,
  DatePicker: datePickerLight,
  Details: detailsLight,
  DetailsView: detailsViewLight,
  Dialog: dialogLight,
  Divider: dividerLight,
  Drawer: drawerLight,
  Dropdown: dropdownLight,
  DynamicInput: dynamicInputLight,
  DynamicTags: dynamicTagsLight,
  Element: elementLight,
  Empty: emptyLight,
  Equation: equationLight,
  TextEditor: textEditorLight,
  Ellipsis: ellipsisLight,
  Filter: filterLight,
  Form: formLight,
  GradientText: gradientTextLight,
  Icon: iconLight,
  IconWrapper: iconWrapperLight,
  Image: imageLight,
  Input: inputLight,
  InputNumber: inputNumberLight,
  Layout: layoutLight,
  LegacyTransfer: legacyTransferLight,
  List: listLight,
  LoadingBar: loadingBarLight,
  Log: logLight,
  Menu: menuLight,
  Mention: mentionLight,
  Message: messageLight,
  Modal: modalLight,
  Notification: notificationLight,
  PageHeader: pageHeaderLight,
  Pagination: paginationLight,
  Popconfirm: popconfirmLight,
  Popover: popoverLight,
  Popselect: popselectLight,
  Progress: progressLight,
  Radio: radioLight,
  Rating: ratingLight,
  Row: rowLight,
  Result: resultLight,
  Scrollbar: scrollbarLight,
  Skeleton: skeletonLight,
  Select: selectLight,
  Slider: sliderLight,
  Space: spaceLight,
  Spinner: spinnerLight,
  Statistic: statisticLight,
  Stepper: stepperLight,
  SuperDatePicker: superDatePickerLight,
  Switch: switchLight,
  Panel: panelLight,
  Table: tableLight,
  Tabs: tabsLight,
  Tag: tagLight,
  Facade: facadeLight,
  TimePicker: timePickerLight,
  Timeline: timelineLight,
  Tooltip: tooltipLight,
  Transfer: transferLight,
  Tree: treeLight,
  TreeSelect: treeSelectLight,
  Typography: typographyLight,
  Upload: uploadLight,
  Watermark: watermarkLight,
  Link: linkLight,
  FloatingPanel: floatingPanelLight,
  FloatingPanelContainer: floatingPanelLight
}
