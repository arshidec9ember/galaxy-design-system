import os
import re

# Define the mapping of texts to be replaced
replace_mapping = {
    'NA': 'ZA', 'NAffix': 'ZAffix', 'NAlert': 'ZAlert',
    'NAnchor': 'ZAnchor', 'NAnchorLink': 'ZAnchorLink', 'NAvatar':
    'ZAvatar', 'NAvatarGroup': 'ZAvatarGroup', 'NBackTop': 'ZBackTop',
    'NBadge': 'ZBadge', 'NBlockquote': 'ZBlockquote', 'NBreadcrumb':
    'ZBreadcrumb', 'NBreadcrumbItem': 'ZBreadcrumbItem', 'NButton':
    'ZButton', 'NButtonGroup': 'ZButtonGroup', 'NCalendar': 'ZCalendar',
    'NCard': 'ZCard', 'NCarousel': 'ZCarousel', 'NCarouselItem':
    'ZCarouselItem', 'NCascader': 'ZCascader', 'NCheckbox': 'ZCheckbox',
    'NCheckboxGroup': 'ZCheckboxGroup', 'NCode': 'ZCode', 'NCol': 'ZCol',
    'NAccordion': 'ZAccordion', 'NAccordionItem': 'ZAccordionItem',
    'NCollapseTransition': 'ZCollapseTransition', 'NColorPicker':
    'ZColorPicker', 'NConfigProvider': 'ZConfigProvider', 'NCountdown':
    'ZCountdown', 'NDataTable': 'ZDataTable', 'NDatePicker': 'ZDatePicker',
    'NDescriptions': 'ZDescriptions', 'NDescriptionsItem':
    'ZDescriptionsItem', 'NDialog': 'ZDialog', 'NDialogProvider':
    'ZDialogProvider', 'NDivider': 'ZDivider', 'NDrawer': 'ZDrawer',
    'NDrawerContent': 'ZDrawerContent', 'NDropdown': 'ZDropdown',
    'NDynamicInput': 'ZDynamicInput', 'NDynamicTags': 'ZDynamicTags',
    'NEllipsis': 'ZEllipsis', 'NEmpty': 'ZEmpty', 'NForm': 'ZForm',
    'NFormItem': 'ZFormItem', 'NFormItemCol': 'ZFormItemCol', 'NFormItemGi':
    'ZFormItemGi', 'NFormItemGridItem': 'ZFormItemGridItem', 'NFormItemRow':
    'ZFormItemRow', 'NGi': 'ZGi', 'NGlobalStyle': 'ZGlobalStyle',
    'NGradientText': 'ZGradientText', 'NGrid': 'ZGrid', 'NGridItem':
    'ZGridItem', 'NH1': 'ZH1', 'NH2': 'ZH2', 'NH3': 'ZH3', 'NH4': 'ZH4',
    'NH5': 'ZH5', 'NH6': 'ZH6', 'NHr': 'ZHr', 'NIcon': 'ZIcon',
    'NIconWrapper': 'ZIconWrapper', 'NImage': 'ZImage', 'NImageGroup':
    'ZImageGroup', 'NInput': 'ZInput', 'NInputGroup': 'ZInputGroup',
    'NInputGroupLabel': 'ZInputGroupLabel', 'NInputNumber': 'ZInputNumber',
    'NJsonViewer': 'ZJsonViewer', 'NLayout': 'ZLayout', 'NLayoutContent':
    'ZLayoutContent', 'NLayoutFooter': 'ZLayoutFooter', 'NLayoutHeader':
    'ZLayoutHeader', 'NLayoutSider': 'ZLayoutSider', 'NLi': 'ZLi', 'NList':
    'ZList', 'NListItem': 'ZListItem', 'NLoadingBarProvider':
    'ZLoadingBarProvider', 'NMention': 'ZMention', 'NMenu': 'ZMenu',
    'NMessageProvider': 'ZMessageProvider', 'NModal': 'ZModal',
    'NNotificationProvider': 'ZNotificationProvider', 'NNumberAnimation':
    'ZNumberAnimation', 'NOl': 'ZOl', 'NP': 'ZP', 'NPageBanner':
    'ZPageBanner', 'NPagination': 'ZPagination', 'NPopconfirm':
    'ZPopconfirm', 'NPopover': 'ZPopover', 'NPopselect': 'ZPopselect',
    'NProgress': 'ZProgress', 'NRadio': 'ZRadio', 'NRadioButton':
    'ZRadioButton', 'NRadioGroup': 'ZRadioGroup', 'NRate': 'ZRate',
    'NResult': 'ZResult', 'NRow': 'ZRow', 'NScrollbar': 'ZScrollbar',
    'NSelect': 'ZSelect', 'NSkeleton': 'ZSkeleton', 'NSlider': 'ZSlider',
    'NSpace': 'ZSpace', 'NSpin': 'ZSpin', 'NStep': 'ZStep', 'NSteps':
    'ZSteps', 'NSwitch': 'ZSwitch', 'NTab': 'ZTab', 'NTabPane': 'ZTabPane',
    'NTable': 'ZTable', 'NTabs': 'ZTabs', 'NTag': 'ZTag', 'NTbody':
    'ZTbody', 'NTd': 'ZTd', 'NText': 'ZText', 'NTh': 'ZTh', 'NThead':
    'ZThead', 'NThing': 'ZThing', 'NTime': 'ZTime', 'NTimePicker':
    'ZTimePicker', 'NTimeline': 'ZTimeline', 'NTimelineItem':
    'ZTimelineItem', 'NTooltip': 'ZTooltip', 'NTr': 'ZTr', 'NTransfer':
    'ZTransfer', 'NTree': 'ZTree', 'NTreeSelect': 'ZTreeSelect', 'NUl':
    'ZUl', 'NUpload': 'ZUpload', 'NUploadDragger': 'ZUploadDragger',
    'n-base-close': 'z-base-close', 'n-base-icon': 'z-base-icon',
    'n-statistic': 'z-statistic', 'n-content':'z-content', 
    'n-log':'z-log', 'n-submenu':'z-submenu', 'n-message-api':'z-message-api',
    'n-legacy-transfer':'z-legacy-transfer', 'n-loading-bar': 'z-loading-bar',
    'NUploadFileList': 'ZUploadFileList', 'NUploadTrigger':
    'ZUploadTrigger', 'NWatermark': 'ZWatermark', 'NEquation': 'ZEquation',
    'NPerformantEllipsis': 'ZPerformantEllipsis', 'NLink': 'ZLink',
    'NButtonOverflow': 'ZButtonOverflow', 'n-a': 'z-a', 'n-affix':
    'z-affix', 'n-alert': 'z-alert', 'n-anchor': 'z-anchor',
    'n-anchor-link': 'z-anchor-link', 'n-avatar': 'z-avatar',
    'n-avatar-group': 'z-avatar-group', 'n-back-top': 'z-back-top',
    'n-badge': 'z-badge', 'n-blockquote': 'z-blockquote', 'n-breadcrumb':
    'z-breadcrumb', 'n-breadcrumb-item': 'z-breadcrumb-item', 'n-button':
    'z-button', 'n-button-group': 'z-button-group', 'n-calendar':
    'z-calendar', 'n-card': 'z-card', 'n-carousel': 'z-carousel',
    'n-carousel-item': 'z-carousel-item', 'n-cascader': 'z-cascader',
    'n-checkbox': 'z-checkbox', 'n-checkbox-group': 'z-checkbox-group',
    'n-code': 'z-code', 'n-col': 'z-col', 'n-accordion': 'z-accordion',
    'n-accordion-item': 'z-accordion-item', 'n-collapse-transition':
    'z-collapse-transition', 'n-color-picker': 'z-color-picker',
    'n-config-provider': 'z-config-provider', 'n-countdown': 'z-countdown',
    'n-data-table': 'z-data-table', 'n-date-picker': 'z-date-picker',
    'n-descriptions': 'z-descriptions', 'n-descriptions-item':
    'z-descriptions-item', 'n-dialog': 'z-dialog', 'n-dialog-provider':
    'z-dialog-provider', 'n-divider': 'z-divider', 'n-drawer': 'z-drawer',
    'n-drawer-content': 'z-drawer-content', 'n-dropdown': 'z-dropdown',
    'n-dynamic-input': 'z-dynamic-input', 'n-dynamic-tags':
    'z-dynamic-tags', 'n-ellipsis': 'z-ellipsis', 'n-empty': 'z-empty',
    'n-form': 'z-form', 'n-form-item': 'z-form-item', 'n-form-item-col':
    'z-form-item-col', 'n-form-item-gi': 'z-form-item-gi',
    'n-form-item-grid-item': 'z-form-item-grid-item', 'n-form-item-row':
    'z-form-item-row', 'n-gi': 'z-gi', 'n-global-style': 'z-global-style',
    'n-gradient-text': 'z-gradient-text', 'n-grid': 'z-grid', 'n-grid-item':
    'z-grid-item', 'n-h1': 'z-h1', 'n-h2': 'z-h2', 'n-h3': 'z-h3', 'n-h4':
    'z-h4', 'n-h5': 'z-h5', 'n-h6': 'z-h6', 'n-hr': 'z-hr', 'n-icon':
    'z-icon', 'n-icon-wrapper': 'z-icon-wrapper', 'n-image': 'z-image',
    'n-image-group': 'z-image-group', 'n-input': 'z-input', 'n-input-group':
    'z-input-group', 'n-input-group-label': 'z-input-group-label',
    'n-input-number': 'z-input-number', 'n-json-viewer': 'z-json-viewer',
    'n-layout': 'z-layout', 'n-layout-content': 'z-layout-content',
    'n-layout-footer': 'z-layout-footer', 'n-layout-header':
    'z-layout-header', 'n-layout-sider': 'z-layout-sider', 'n-li': 'z-li',
    'n-list': 'z-list', 'n-list-item': 'z-list-item',
    'n-loading-bar-provider': 'z-loading-bar-provider', 'n-mention':
    'z-mention', 'n-menu': 'z-menu', 'n-message-provider':
    'z-message-provider', 'n-modal': 'z-modal', 'n-notification-provider':
    'z-notification-provider', 'n-number-animation': 'z-number-animation',
    'n-ol': 'z-ol', 'n-p': 'z-p', 'n-page-banner': 'z-page-banner',
    'n-pagination': 'z-pagination', 'n-popconfirm': 'z-popconfirm',
    'n-popover': 'z-popover', 'n-popselect': 'z-popselect', 'n-progress':
    'z-progress', 'n-radio': 'z-radio', 'n-radio-button': 'z-radio-button',
    'n-radio-group': 'z-radio-group', 'n-rate': 'z-rate', 'n-result':
    'z-result', 'n-row': 'z-row', 'n-scrollbar': 'z-scrollbar', 'n-select':
    'z-select', 'n-skeleton': 'z-skeleton', 'n-slider': 'z-slider',
    'n-space': 'z-space', 'n-spin': 'z-spin', 'n-step': 'z-step', 'n-steps':
    'z-steps', 'n-switch': 'z-switch', 'n-tab': 'z-tab', 'n-tab-pane':
    'z-tab-pane', 'n-table': 'z-table', 'n-tabs': 'z-tabs', 'n-tag':
    'z-tag', 'n-tbody': 'z-tbody', 'n-td': 'z-td', 'n-text': 'z-text',
    'n-th': 'z-th', 'n-thead': 'z-thead', 'n-thing': 'z-thing', 'n-time':
    'z-time', 'n-time-picker': 'z-time-picker', 'n-timeline': 'z-timeline',
    'n-timeline-item': 'z-timeline-item', 'n-tooltip': 'z-tooltip', 'n-tr':
    'z-tr', 'n-transfer': 'z-transfer', 'n-tree': 'z-tree', 'n-tree-select':
    'z-tree-select', 'n-ul': 'z-ul', 'n-upload': 'z-upload',
    'n-upload-dragger': 'z-upload-dragger', 'n-upload-file-list':
    'z-upload-file-list', 'n-upload-trigger': 'z-upload-trigger',
    'n-watermark': 'z-watermark', 'n-equation': 'z-equation',
    'n-performant-ellipsis': 'z-performant-ellipsis', 'n-link': 'z-link',
    "n-auto-complete":"z-auto-complete",
    'n-button-overflow': 'z-button-overflow',
    "n-h": "z-h",
    "n-element": "z-element",
    "n-theme-editor": "z-theme-editor",
    "n-input": "z-input",
    "n-config-provider": "z-config-provider",
    "n-select": "z-select",
    "n-button": "z-button",
    "n-global-style": "z-global-style",
    "n-internal-select-menu":"z-internal-select-menu",
    "n-alert": "z-alert",
    "n-text": "z-text",
    "n-date-picker": "z-date-picker",
    "n-space": "z-space",
    "n-card": "z-card",
    "n-icon": "z-icon",
    "n-scrollbar": "z-scrollbar",
    "n-avatar-group": "z-avatar-group",
    "n-affix": "z-affix",
    "n-watermark": "z-watermark",
    "n-anchor": "z-anchor",
    "n-el": "z-el",
    "n-global": "z-global",
    "n-data-table": "z-data-table",
    "n-alert": "z-alert",
    "NH": "ZH",
    "NElement": "ZElement",
    "NThemeEditor": "ZThemeEditor",
    "NInput": "ZInput",
    "NConfigProvider": "ZConfigProvider",
    "NSelect": "ZSelect",
    "NButton": "ZButton",
    "NGlobalStyle": "ZGlobalStyle",
    "NAlert": "ZAlert",
    "NText": "ZText",
    "NDatePicker": "ZDatePicker",
    "NSpace": "ZSpace",
    "NCard": "ZCard",
    "NIcon": "ZIcon",
    "NScrollbar": "ZScrollbar",
    "NAvatarGroup": "ZAvatarGroup",
    "NAffix": "ZAffix",
    "NWatermark": "ZWatermark",
    "NAnchor": "ZAnchor",
    "NEl": "ZEl",
    "NGlobal": "ZGlobal",
    "NDataTable": "ZDataTable",
    "NAlert": "ZAlert",
    "NPopselectPanel": "ZPopselectPanel",
    "NIconSwitchTransition": "ZIconSwitchTransition",
    "NBaseIcon": "ZBaseIcon",
    "NUploadProgress": "ZUploadProgress",
    "NInternalSelectMenu": "ZInternalSelectMenu",
    "NUploadFile":"ZUploadFile",
    "NFadeInExpandTransition":"ZFadeInExpandTransition",
    "NInternalSelection":"ZInternalSelection",
    "NBaseFocusDetector":"ZBaseFocusDetector",
    "NxScrollbar": "ZxScrollbar",
    "NTreeNode": "ZTreeNode",
    "NTreeNodeSwitcher": "ZTreeNodeSwitcher",
    "NTreeNodeCheckbox": "ZTreeNodeCheckbox",
    "NTreeNodeContent": "ZTreeNodeContent",
    "NBaseLoading": "ZBaseLoading",
    "NTreeSwitcher": "ZTreeSwitcher",
    "NTransferHeader":"ZTransferHeader",
    "NTransferList": "ZTransferList",
    "NTransferFilter": "ZTransferFilter",
    "NBaseClose": "ZBaseClose",
    "NPopoverBody": "ZPopoverBody",
    "NMessage": "ZMessage",
    "NMenuOptionContent": "ZMenuOptionContent",
    "NLogLoader": "ZLogLoader",
    "NLogLine": "ZLogLine",
    "NLocale": "ZLocale",
    "NPartialLocale": "ZPartialLocale",
    "NLoadingBar": "ZLoadingBar",
    "NTransferListItem": "ZTransferListItem",
    "NDateLocale": "ZDateLocale",
    "NxButton": "ZxButton",
    "NBaseClear": "ZBaseClear",
    "NBaseSuffix": "ZBaseSuffix",
    "NImagePreview": "ZImagePreview",
    "NGridInjection": "ZGridInjection",
    "NDynamicInputInputPreset": "ZDynamicInputInputPreset",
    "NDynamicInputPairPreset": "ZDynamicInputPairPreset",
    "NDropdownMenuInjection": "ZDropdownMenuInjection",
    "NDropdownOptionInjection": "ZDropdownOptionInjection",
    "NDropdownMenu": "ZDropdownMenu",
    "NDropdownOption": "ZDropdownOption",
    "NDropdownDivider": "ZDropdownDivider",
    "NDropdownGroupHeader": "ZDropdownGroupHeader",
    "NDropdownGroup": "ZDropdownGroup",
    "NDropdownRenderOption": "ZDropdownRenderOption",
    "NDrawerBodyWrapper": "ZDrawerBodyWrapper",
    "NInjectionExtractor": "ZInjectionExtractor",
    "NDialogEnvironment": "ZDialogEnvironment",
    "NDataTableFilterMenu": "ZDataTableFilterMenu",
    "NCollapse": "ZCollapse",
    "NCascaderSubmenu": "ZCascaderSubmenu",
    "NBaseMenuMask": "ZBaseMenuMask",
    "NCascaderSubmenu": "ZCascaderSubmenu",
    "NCarouselDots": "ZCarouselDots",
    "NCarouselArrow": "ZCarouselArrow",
    "NBaseSlotMachine": "ZBaseSlotMachine",
    "NBaseWave":"ZBaseWave",
    "NBaseAnchor": "ZBaseAnchor",
    "NInternalLoading": "ZInternalLoading",
    "NFocusDetector": "ZFocusDetector",
    "NSelectOption": "ZSelectOption",
    "NSelectGroupHeader": "ZSelectGroupHeader",
    "NBaseSelectOption": "ZBaseSelectOption",
    "NCascaderOption": "ZCascaderOption"
    }

cwd = os.getcwd()

# Define the directory where you want to perform the search and replace
directory_to_search = cwd

# Define the file extensions to search for (e.g., .ts, .js, .json, .vue, .tsx)
file_extensions = ['.ts', '.js', '.json', '.vue', '.tsx', '.md', '.css', '.snap']

# Define a regular expression pattern to match any of the old texts
old_texts_pattern = '|'.join(re.escape(old_text) for old_text in replace_mapping.keys())

# Iterate through the directory and its subdirectories
for root, _, files in os.walk(directory_to_search):
    if  root.find('/es/')>0 or root.find('/node_modules/')>0 or root.find('/dist/')>0 or root.find('/lib/')>0:
        continue  # Skip the 'node_modules' directory
    for file in files:
        if file.endswith(tuple(file_extensions)):
            file_path = os.path.join(root, file)
            
            # Read the file content
            with open(file_path, 'r') as f:
                file_content = f.read()

            # Create a regular expression pattern to find all occurrences of old texts
            pattern = re.compile(r'\b({})\b'.format(old_texts_pattern))

            # Replace the old texts with the updated texts
            updated_content = pattern.sub(lambda x: replace_mapping[x.group()], file_content)
            updated_content = re.compile('--n-').sub(lambda x: '--z-', updated_content)
            updated_content = re.compile('\.n-').sub(lambda x: '.z-', updated_content)
            updated_content = re.compile("'n-").sub(lambda x: "'z-", updated_content)
            updated_content = re.compile("TsConfigProvider").sub(lambda x: "ThemeConfigProvider", updated_content)
            updated_content = re.compile("NCard").sub(lambda x: "ZCard", updated_content)
            updated_content = re.compile("ts-config-provider").sub(lambda x: "theme-config-provider", updated_content)
            updated_content = re.compile('"naive-ui"').sub(lambda x: '"@zeta-gds/components"', updated_content)
            updated_content = re.compile("'naive-ui'").sub(lambda x: "'@zeta-gds/components'", updated_content)
            updated_content = re.compile("'naive-ui").sub(lambda x: "'zeta-gds", updated_content)
            updated_content =  re.compile(r'\b\w*Rate\w*\b').sub(lambda x: x.group().replace('Rate', 'Rating'), updated_content)
            updated_content =  re.compile(r'\brate\w+').sub(lambda x: "rating" + x.group()[4:], updated_content)
            updated_content =  re.compile(r'\w*-rate\w*').sub(lambda x: x.group().replace('rate', 'rating'), updated_content)
            updated_content =  re.compile(r'\w*/rate\w*').sub(lambda x: x.group().replace('/rate','/rating'), updated_content)
            updated_content =  re.compile(r'\'rate\w*').sub(lambda x: x.group().replace('\'rate', '\'rating'), updated_content)

            updated_content =  re.compile(r'\b\w*Steps\w*\b').sub(lambda x: x.group().replace('Steps', 'Stepper'), updated_content)
            updated_content =  re.compile(r'\bsteps\w+').sub(lambda x: "stepper" + x.group()[5:], updated_content)
            updated_content =  re.compile(r'\w*-steps\w*').sub(lambda x: x.group().replace('steps', 'stepper'), updated_content)
            updated_content =  re.compile(r'\w*/steps\w*').sub(lambda x: x.group().replace('/steps','/stepper'), updated_content)
            updated_content =  re.compile(r'\'steps\w*').sub(lambda x: x.group().replace('\'steps', '\'stepper'), updated_content)

            updated_content =  re.compile(r'\b\w*BackTop\w*\b').sub(lambda x: x.group().replace('BackTop', 'BackToTop'), updated_content)
            updated_content =  re.compile(r'\b\w*Back Top\w*\b').sub(lambda x: x.group().replace('Back Top', 'Back To Top'), updated_content)
            updated_content =  re.compile(r'\b\w*backTop\w*\b').sub(lambda x: x.group().replace('backTop', 'backToTop'), updated_content)
            updated_content =  re.compile(r'\bback-top\w+').sub(lambda x: "back-to-top" + x.group()[8:], updated_content)
            updated_content =  re.compile(r'\w*-back-top\w*').sub(lambda x: x.group().replace('back-top', 'back-to-top'), updated_content)
            updated_content =  re.compile(r'\w*/back-top\w*').sub(lambda x: x.group().replace('/back-top','/back-to-top'), updated_content)
            updated_content =  re.compile(r'\'back-top\w*').sub(lambda x: x.group().replace('\'back-top', '\'back-to-top'), updated_content)

            # updated_content =  re.compile(r'\b\w*Spin(?!ning)\w*\b').sub(lambda x: x.group().replace('Spin', 'Spinner'), updated_content)
            # updated_content =  re.compile(r'\bspin(?!ning)\w+').sub(lambda x: "spinner" + x.group()[4:], updated_content)
            # updated_content =  re.compile(r'\w*-spin(?!ning)\w*').sub(lambda x: x.group().replace('spin','spinner'), updated_content)
            # updated_content =  re.compile(r'\w*/spin(?!ning)\w*').sub(lambda x: x.group().replace('/spin','/spinner'), updated_content)
            # updated_content =  re.compile(r'\'spin(?!ning)\w*').sub(lambda x: x.group().replace('\'spin', '\'spinner'), updated_content)

            # updated_content =  re.compile(r'\b\w*Thing(?!s)\w*\b').sub(lambda x: x.group().replace('Thing', 'Facade'), updated_content)
            # updated_content =  re.compile(r'\bthing\w+').sub(lambda x: "facade" + x.group()[5:], updated_content)
            # updated_content =  re.compile(r'\w*-thing\w*').sub(lambda x: x.group().replace('thing', 'facade'), updated_content)
            # updated_content =  re.compile(r'\w*/thing\w*').sub(lambda x: x.group().replace('/thing','/facade'), updated_content)
            # updated_content =  re.compile(r'\'thing\w*').sub(lambda x: x.group().replace('\'thing', '\'facade'), updated_content)

            updated_content =  re.compile(r'\b\w*PageBanner\w*\b').sub(lambda x: x.group().replace('PageBanner', 'PageHeader'), updated_content)
            updated_content =  re.compile(r'\b\w*Page Banner\w*\b').sub(lambda x: x.group().replace('Page Banner', 'Page Header'), updated_content)
            updated_content =  re.compile(r'\b\w*pageBanner\w*\b').sub(lambda x: x.group().replace('pageBanner', 'pageHeader'), updated_content)
            # updated_content =  re.compile(r'\w*-banner\w*').sub(lambda x: x.group().replace('banner', 'header'), updated_content)

            # updated_content =  re.compile(r'\b\w*Descriptions\w*\b').sub(lambda x: x.group().replace('Descriptions', 'Details'), updated_content)
            # updated_content =  re.compile(r'\b\w*Description\w*\b').sub(lambda x: x.group().replace('Description', 'Detail'), updated_content)
            updated_content =  re.compile(r'\bdescriptions\w+').sub(lambda x: "details" + x.group()[12:], updated_content)
            updated_content =  re.compile(r'\w*-descriptions\w*').sub(lambda x: x.group().replace('descriptions', 'details'), updated_content)
            updated_content =  re.compile(r'\w*/descriptions\w*').sub(lambda x: x.group().replace('/descriptions','/details'), updated_content)
            updated_content =  re.compile(r'\'descriptions\w*').sub(lambda x: x.group().replace('\'descriptions', '\'details'), updated_content)

            updated_content =  re.compile(r'\b\w*Legacy Grid\w*\b').sub(lambda x: x.group().replace('Legacy Grid', 'Row Column'), updated_content)
            updated_content =  re.compile(r'\w*legacy-grid\w*').sub(lambda x: x.group().replace('legacy-grid', 'row-column'), updated_content)



            if file_path.endswith('.md'):
                updated_content = re.compile("naive-ui").sub(lambda x: "@zeta-gds/components", updated_content)
                updated_content = re.compile("naive").sub(lambda x: "zeta-gds", updated_content)


            # Write the updated content back to the file
            with open(file_path, 'w') as f:
                f.write(updated_content)

            print("Modified: {}".format(file_path))

print("Code modification complete.")