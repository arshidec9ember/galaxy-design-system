/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  defineComponent,
  ref,
  type PropType,
  h,
  toRef,
  computed,
  type CSSProperties
} from 'vue'
import {
  MdEditor,
  MdPreview,
  type ToolbarNames,
  type Footers,
  type ConfigOption
} from 'md-editor-v3'
import { config } from 'md-editor-v3'
import {
  useStyle,
  useConfig,
  useTheme,
  useThemeClass,
  useLocale
} from '../../_mixins'
import style from './styles/index.cssr'
import { textEditorLight } from '../styles'
import type { TextEditorTheme } from '../styles'
import type { ThemeProps } from '../../_mixins'
import { type ExtractPublicPropTypes } from '../../_utils'
import { editorLanguageConfig, defaultCustomIcon } from './constants'

export const textEditorProps = {
  // Common props to MDEditor and MDPreview
  ...(useTheme.props as ThemeProps<TextEditorTheme>),
  value: {
    type: String as PropType<string>,
    default: ''
  },
  clsPrefix: {
    type: String,
    required: true,
    default: 'z'
  },
  class: {
    type: String as PropType<string>,
    default: ''
  },
  language: {
    type: String as PropType<string>,
    default: 'en-US'
  },
  editorId: {
    type: String as PropType<string>,
    default: 'md-editor-v3'
  },
  showCodeRowNumber: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  previewTheme: {
    type: String as PropType<string>,
    default: 'default'
  },
  style: {
    type: [String, Object] as PropType<string>,
    default: () => ({})
  },
  noMermaid: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  noKatex: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  codeTheme: {
    type: String as PropType<string>,
    default: 'atom'
  },
  mdHeadingId: {
    type: Function as PropType<
    (text: string, level: number, index: number) => string
    >,
    default: (text: string) => text
  },
  sanitize: {
    type: Function as PropType<(html: string) => string>,
    default: (html: string) => html
  },
  formatCopiedText: {
    type: Function as PropType<(text: string) => string>,
    default: (text: string) => text
  },
  codeStyleReverse: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  codeStyleReverseList: {
    type: Array as PropType<string[]>,
    default: ['default', 'mk-cute']
  },
  noHighlight: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  noImgZoomIn: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  customIcon: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  sanitizeMermaid: {
    type: Function as PropType<(h: string) => Promise<string>>,
    default: async (h: string) => h
  },
  codeFoldable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  autoFoldThreshold: {
    type: Number as PropType<number>,
    default: 30
  },
  // Common events to MDEditor and MDPreview
  onChange: {
    type: Function as PropType<(event: string) => void>,
    default: undefined
  },
  onHtmlChanged: {
    type: Function as PropType<(html: string) => void>,
    default: undefined
  },
  // ONLY MD editor specific props listed below:
  pageFullscreen: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  preview: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  previewOnly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  htmlPreview: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  toolbars: {
    type: Array as PropType<ToolbarNames[]>,
    default: () => ['all']
  },
  toolbarsExclude: {
    type: Array as PropType<ToolbarNames[]>,
    default: () => []
  },
  noPrettier: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  tabWidth: {
    type: Number as PropType<number>,
    default: 2
  },
  tableShape: {
    type: Array as PropType<number[]>,
    default: () => [6, 4]
  },
  placeholder: {
    type: String as PropType<string>,
    default: ''
  },
  footers: {
    type: Array as PropType<Footers[]>,
    default: ['markdownTotal', '=', 'scrollSwitch']
  },
  scrollAuto: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  noUploadImg: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  autoFocus: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  readOnly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  maxLength: {
    type: Number as PropType<number>,
    default: undefined
  },
  autoDetectCode: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showToolbarName: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  inputBoxWidth: {
    type: String as PropType<string>,
    default: ''
  },
  transformImgUrl: {
    type: Function as PropType<(url: string) => string | Promise<string>>,
    default: (url: string) => url
  },
  // ONLY MD editor specific events listed below:
  onSave: {
    type: Function as PropType<(v: string, h: Promise<string>) => void>,
    default: undefined
  },
  onUploadImg: {
    type: Function as PropType<
    (
      files: File[],
      callBack: (
        urls:
        | string[]
        | Array<{
          url: string
          alt: string
          title: string
        }>
      ) => void
    ) => void
    >,
    default: undefined
  },
  onError: {
    type: Function as PropType<(error: Error) => void>,
    default: undefined
  },
  onBlur: {
    type: Function as PropType<(event: FocusEvent) => void>,
    default: undefined
  },
  onFocus: {
    type: Function as PropType<(event: FocusEvent) => void>,
    default: undefined
  },
  onInput: {
    type: Function as PropType<(event: Event) => void>,
    default: undefined
  },
  onDrop: {
    type: Function as PropType<(event: DragEvent) => void>,
    default: undefined
  },
  onInputBoxWidthChange: {
    type: Function as PropType<(width: string) => void>,
    default: undefined
  }
} as const

export type TextEditorProps = ExtractPublicPropTypes<typeof textEditorProps>

export default defineComponent({
  name: 'TextEditor',
  props: textEditorProps,
  emits: ['update:value'],
  setup (props, { emit }) {
    useStyle('-base-md-editor', style, toRef(props, 'clsPrefix'))
    const localValue = ref(props.value)

    const updateValue = (val: string) => {
      localValue.value = val
      emit('update:value', val)
    }

    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'TextEditor',
      '-text-editor',
      undefined,
      textEditorLight,
      props,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      const theme = themeRef.value
      const {
        self: { toolbarBorderColor, toolbarPadding, toolbarHeight, buttonSize }
      } = theme
      return {
        '--z-toolbar-border-color': toolbarBorderColor,
        '--z-toolbar-padding': toolbarPadding,
        '--z-toolbar-height': toolbarHeight,
        '--z-button-size': buttonSize
      }
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('text-editor', undefined, cssVarsRef, props)
      : undefined

    const { localeRef } = useLocale('TextEditor')
    const editorConfig: Partial<ConfigOption> = editorLanguageConfig(
      localeRef,
      props.language
    )
    config(editorConfig)
    return {
      localValue,
      updateValue,
      defaultCustomIcon,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    this.onRender?.()
    return (
      <div
        id={`editor-container-${this.editorId}`}
        class={[`${this.clsPrefix}-base-md-editor`, this.themeClass]}
        style={this.cssVars as CSSProperties}
      >
        {this.previewOnly ? (
          <MdPreview
            modelValue={this.localValue}
            onUpdate:modelValue={this.updateValue}
            class={this.class}
            language={this.language}
            showCodeRowNumber={this.showCodeRowNumber}
            editorId={this.editorId}
            previewTheme={this.previewTheme}
            style={this.style}
            noMermaid={this.noMermaid}
            noKatex={this.noKatex}
            codeTheme={this.codeTheme}
            mdHeadingId={this.mdHeadingId}
            sanitize={this.sanitize}
            formatCopiedText={this.formatCopiedText}
            codeStyleReverse={this.codeStyleReverse}
            codeStyleReverseList={this.codeStyleReverseList}
            noHighlight={this.noHighlight}
            noImgZoomIn={this.noImgZoomIn}
            customIcon={{ ...this.defaultCustomIcon, ...this.customIcon }}
            sanitizeMermaid={this.sanitizeMermaid}
            codeFoldable={this.codeFoldable}
            autoFoldThreshold={this.autoFoldThreshold}
            onChange={this.onChange}
            onHtmlChanged={this.onHtmlChanged}
          />
        ) : (
          <MdEditor
            modelValue={this.localValue}
            onUpdate:modelValue={this.updateValue}
            class={`custom-editor ${this.class}`}
            language={this.language}
            showCodeRowNumber={this.showCodeRowNumber}
            editorId={this.editorId}
            previewTheme={this.previewTheme}
            style={this.style}
            noMermaid={this.noMermaid}
            noKatex={this.noKatex}
            codeTheme={this.codeTheme}
            mdHeadingId={this.mdHeadingId}
            sanitize={this.sanitize}
            formatCopiedText={this.formatCopiedText}
            codeStyleReverse={this.codeStyleReverse}
            codeStyleReverseList={this.codeStyleReverseList}
            noHighlight={this.noHighlight}
            noImgZoomIn={this.noImgZoomIn}
            customIcon={{ ...this.defaultCustomIcon, ...this.customIcon }}
            sanitizeMermaid={this.sanitizeMermaid}
            codeFoldable={this.codeFoldable}
            autoFoldThreshold={this.autoFoldThreshold}
            onChange={this.onChange}
            onHtmlChanged={this.onHtmlChanged}
            pageFullscreen={this.pageFullscreen}
            preview={this.preview}
            htmlPreview={this.htmlPreview}
            placeholder={this.placeholder}
            disabled={this.disabled}
            v-bind="{ toolbars: this.toolbars.length > 0 ? this.toolbars : undefined }"
            toolbarsExclude={this.toolbarsExclude}
            noPrettier={this.noPrettier}
            tabWidth={this.tabWidth}
            tableShape={this.tableShape}
            footers={this.footers}
            scrollAuto={this.scrollAuto}
            noUploadImg={this.noUploadImg}
            autoFocus={this.autoFocus}
            readOnly={this.readOnly}
            maxLength={this.maxLength}
            autoDetectCode={this.autoDetectCode}
            showToolbarName={this.showToolbarName}
            inputBoxWitdh={this.inputBoxWidth}
            transformImgUrl={this.transformImgUrl}
            onSave={this.onSave}
            onUploadImg={this.onUploadImg}
            onError={this.onError}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onInput={this.onInput}
            onDrop={this.onDrop}
            onInputBoxWitdhChange={this.onInputBoxWidthChange}
          />
        )}
      </div>
    )
  }
})
