import {
  defineComponent,
  h,
  ref,
  type CSSProperties,
  computed,
  type PropType,
  watchEffect
} from 'vue'
import {
  useTheme,
  useConfig,
  type ThemeProps,
  useThemeClass
} from '../../_mixins'
import { call, resolveWrappedSlotWithProps } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { jsonViewerLight, type JsonViewerTheme } from '../styles'
import style from './styles/index.cssr'
import VueJsonPretty from 'vue-json-pretty'
import { ZButton } from '../../button'
import {
  CopyIcon,
  MoreIcon,
  ArrowDropDownIcon,
  ArrowDropUpIcon
} from '../../_internal/icons'
import { ZBaseIcon } from '../../_internal'
import { ZTooltip } from '../../tooltip'

interface NodeDataType {
  key?: string
  index?: number
  showComma: boolean
  length: number
  type:
  | 'content'
  | 'objectStart'
  | 'objectEnd'
  | 'objectCollapsed'
  | 'arrayStart'
  | 'arrayEnd'
  | 'arrayCollapsed'
  content: string | number | null | boolean
  level: number
  path: string
  id: number
}

type JSONDataType =
  | string
  | number
  | boolean
  | unknown[]
  | Record<string, unknown>
  | null

// TODO: any in for test case
export const jsonViewerProps = {
  ...(useTheme.props as ThemeProps<JsonViewerTheme>),
  data: {
    type: [Object, Number, Boolean, String, null] as PropType<JSONDataType>,
    required: true,
    default: ''
  },
  showLength: Boolean,
  showLineNumber: {
    type: Boolean,
    default: true
  },
  collapsedOnClickBrackets: {
    type: Boolean,
    default: true
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  showDoubleQuotes: {
    type: Boolean,
    default: true
  },
  depth: Number,
  copyable: Boolean,
  scrollable: {
    type: Boolean,
    default: false
  },
  height: {
    type: Number as PropType<number>
  },
  itemHeight: Number,
  onNodeClick: {
    type: Function as PropType<(node: NodeDataType) => void>
  },
  onBracketsClick: {
    type: Function as PropType<(collapsed: boolean) => void>
  },
  darkTheme: {
    type: Boolean,
    default: false
  },
  onIconClick: {
    type: Function as PropType<(collapsed: boolean) => void>
  },
  onCopy: [Function, Array] as PropType<
  MaybeArray<(value: string | Record<string, any>) => void>
  >
}

export type JsonViewerProps = ExtractPublicPropTypes<typeof jsonViewerProps>

export default defineComponent({
  name: 'JsonViewer',
  props: jsonViewerProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'JsonViewer',
      '-json-viewer',
      style,
      jsonViewerLight,
      props,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut, fontFamilyMono },
        self: {
          fontSize,
          padding,
          lineNumberTextColor,
          copyIconColor,
          chevronIconColor,
          bgColor,
          backgroundColor,
          lineNumberbackgroundColor,
          bracketColor,
          keyColor,
          borderRadius,
          contentMarginRight,
          labelPadding,
          copyButtonMargin,
          numberValueColor,
          booleanValueColor,
          undefinedValueColor,
          stringValueColor,
          nullvalueColor,
          scrollbarColor,
          commentColor,
          optionColor,
          fontSizeXLarge
        }
      } = themeRef.value
      const darkModeInLightThemeVars = {
        '--z-line-number-color': themeRef.value.self.lineNumberTextColorDark,
        '--z-copy-icon-color': themeRef.value.self.copyIconColorDark,
        '--z-chevron-color': themeRef.value.self.chevronIconColorDark,
        '--z-background-color': themeRef.value.self.backgroundColorDark,
        '--z-bg-color': themeRef.value.self.backgroundColorDark,
        '--z-line-number-background-color':
          themeRef.value.self.lineNumberbackgroundColorDark,
        '--z-bracket-color': themeRef.value.self.bracketColorDark,
        '--z-key-color': themeRef.value.self.keyColorDark,
        '--z-number-color': themeRef.value.self.numberValueColorDark,
        '--z-boolean-color': themeRef.value.self.booleanValueColorDark,
        '--z-undefined-color': themeRef.value.self.undefinedValueColorDark,
        '--z-string-color': themeRef.value.self.stringValueColorDark,
        '--z-null-color': themeRef.value.self.nullvalueColorDark,
        '--z-comment-color': themeRef.value.self.commentColorDark,
        '--z-scroll-color': themeRef.value.self.scrollbarColorDark,
        '--z-option-color': themeRef.value.self.optionColorDark,
        '--z-border-color': themeRef.value.self.borderColorDark
      }
      return {
        '--z-font-size': fontSize,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-font-family': fontFamilyMono,
        '--z-font-size-x-large': fontSizeXLarge,
        '--z-border-radius': borderRadius,
        '--z-padding': padding,
        '--z-label-padding': labelPadding,
        '--z-content-margin-right': contentMarginRight,
        '--z-copy-button-margin': copyButtonMargin,
        '--z-line-number-color': lineNumberTextColor,
        '--z-copy-icon-color': copyIconColor,
        '--z-chevron-color': chevronIconColor,
        '--z-background-color': backgroundColor,
        '--z-bg-color': bgColor,
        '--z-line-number-background-color': lineNumberbackgroundColor,
        '--z-bracket-color': bracketColor,
        '--z-key-color': keyColor,
        '--z-number-color': numberValueColor,
        '--z-boolean-color': booleanValueColor,
        '--z-undefined-color': undefinedValueColor,
        '--z-string-color': stringValueColor,
        '--z-null-color': nullvalueColor,
        '--z-comment-color': commentColor,
        '--z-scroll-color': scrollbarColor,
        '--z-option-color': optionColor,
        '--z-border-color': themeRef.value.self.borderColor,
        ...(props.darkTheme ? darkModeInLightThemeVars : {})
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('json-viewer', undefined, cssVarsRef, props)
      : undefined

    const jsonViewerRef = ref(null)
    const jsonContainerRef = ref<Element | null>(null)
    const hideData = ref(true)
    const internalLeftPadding = ref('0px')

    const currentHeight = ref(0)
    const copyText = ref('Copy Code')

    const contentHeight = (): void => {
      if (jsonViewerRef.value) {
        const jsonViewerContainer = (jsonViewerRef.value as any)?.$el
        currentHeight.value = jsonViewerContainer.getBoundingClientRect().height
        handleLeftPadding()
        return
      }
      currentHeight.value = 0
    }

    const showOption = computed((): boolean => {
      if (!props.scrollable && props.height) {
        return currentHeight.value > props.height
      }
      return false
    })

    const handleLeftPadding = (): void => {
      const el: Element = (jsonViewerRef.value as any)?.$el
      if (el) {
        const styles = window.getComputedStyle(el)
        const currenPadding =
          parseFloat(styles.getPropertyValue('padding-left')) + 8
        internalLeftPadding.value = `${currenPadding}px`
      }
    }

    const toggleOption = (): void => {
      hideData.value = !hideData.value
    }
    const copyData = (): void => {
      const { onCopy, data } = props
      if (onCopy) call(onCopy, data as Record<string, unknown>)

      navigator.clipboard
        .writeText(JSON.stringify(data, null, 2))
        .then(() => {
          copyText.value = 'Copied'
        })
        .catch((err: Error) => {
          throw err
        })
    }

    const handleBracketsClick = (collapsed: boolean): void => {
      const { onBracketsClick } = props
      if (onBracketsClick) call(onBracketsClick, collapsed)
    }

    const handleIconClick = (collapsed: boolean): void => {
      const { onIconClick } = props
      if (onIconClick) call(onIconClick, collapsed)
    }

    const handleNodeClick = (node: NodeDataType): void => {
      const { onNodeClick } = props
      if (onNodeClick) call(onNodeClick, node)
      contentHeight()
    }

    const resetCopyText = (): void => {
      copyText.value = 'Copy Code'
    }

    watchEffect(contentHeight)

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      jsonViewerRef,
      jsonContainerRef,
      hideData,
      showOption,
      toggleOption,
      copyData,
      internalLeftPadding,
      copyText,
      resetCopyText,
      handleNodeClick,
      handleBracketsClick,
      handleIconClick,
      onRender: themeClassHandle?.onRender,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass
    }
  },

  render () {
    const { mergedClsPrefix, onRender, $slots } = this
    const nodeValue = $slots['node-value']
    const nodeKey = $slots['node-key']
    onRender?.()
    const jsonViewer = (
      <VueJsonPretty
        ref="jsonViewerRef"
        data={this.data}
        class={`${mergedClsPrefix}-json-viewer__content`}
        showLength={this.showLength}
        showLine={false}
        showLineNumber={this.showLineNumber}
        showIcon={this.showIcon}
        showDoubleQuotes={this.showDoubleQuotes}
        collapsedOnClickBrackets={this.collapsedOnClickBrackets}
        virtual={this.scrollable}
        height={this.height}
        deep={this.depth}
        itemHeight={this.itemHeight}
        onBracketsClick={this.handleBracketsClick}
        onIconClick={this.handleIconClick}
        onNodeClick={this.handleNodeClick}
      >
        {{
          renderNodeKey: ({
            node,
            defaultKey
          }: {
            node: NodeDataType
            defaultKey: string | JSX.Element
          }) => {
            return resolveWrappedSlotWithProps(
              nodeKey,
              { node, defaultKey },
              (children) => children || defaultKey
            )
          },
          renderNodeValue: ({
            node,
            defaultValue
          }: {
            node: NodeDataType
            defaultValue: string | JSX.Element
          }) => {
            return resolveWrappedSlotWithProps(
              nodeValue,
              { node, defaultValue },
              (children) => children || defaultValue
            )
          }
        }}
      </VueJsonPretty>
    )

    const optionButton = this.showOption ? (
      <ZButton
        onClick={this.toggleOption}
        class={`${mergedClsPrefix}-json-viewer__option-button`}
        variant="text"
      >
        {{
          default: () => [
            this.hideData ? (
              <div class={`${mergedClsPrefix}-json-viewer__show-option`}>
                <ZBaseIcon
                  clsPrefix={this.mergedClsPrefix}
                  class={`${mergedClsPrefix}-json-viewer__ellipses`}
                  style={{ width: this.internalLeftPadding }}
                >
                  {{
                    default: () => <MoreIcon />
                  }}
                </ZBaseIcon>
                <div class={`${mergedClsPrefix}-json-viewer__show-label`}>
                  Show More
                  <ZBaseIcon clsPrefix={this.mergedClsPrefix}>
                    {{
                      default: () => <ArrowDropDownIcon />
                    }}
                  </ZBaseIcon>
                </div>
              </div>
            ) : (
              <div class={`${mergedClsPrefix}-json-viewer__show-label`}>
                Show Less
                <ZBaseIcon clsPrefix={this.mergedClsPrefix}>
                  {{
                    default: () => <ArrowDropUpIcon />
                  }}
                </ZBaseIcon>
              </div>
            )
          ]
        }}
      </ZButton>
    ) : null

    const copyOption = this.copyable ? (
      <ZButton
        onClick={this.copyData}
        onBlur={this.resetCopyText}
        class={`${mergedClsPrefix}-json-viewer__copy-button`}
        variant="text"
      >
        {{
          default: () => (
            <ZTooltip>
              {{
                trigger: () => [
                  <ZBaseIcon clsPrefix={`${mergedClsPrefix}`}>
                    {{
                      default: () => <CopyIcon />
                    }}
                  </ZBaseIcon>
                ],
                default: () => this.copyText
              }}
            </ZTooltip>
          )
        }}
      </ZButton>
    ) : null
    return (
      <div
        class={[
          `${mergedClsPrefix}-json-viewer`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-json-viewer--copyable`]: this.copyable,
            [`${mergedClsPrefix}-json-viewer--line-number`]: this.showLineNumber
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {copyOption}
        <div
          ref="jsonContainerRef"
          class={`${mergedClsPrefix}-json-viewer__wrapper`}
          style={{
            maxHeight:
              this.hideData && this.height ? `${this.height}px` : '100%'
          }}
        >
          {jsonViewer}
        </div>
        <div
          class={[
            `${mergedClsPrefix}-json-viewer__toggle-option`,
            {
              [`${mergedClsPrefix}-json-viewer__show`]: !this.hideData
            }
          ]}
          style={{
            marginLeft:
              !this.hideData && this.internalLeftPadding
                ? this.internalLeftPadding
                : '0px'
          }}
        >
          {optionButton}
        </div>
      </div>
    )
  }
})
