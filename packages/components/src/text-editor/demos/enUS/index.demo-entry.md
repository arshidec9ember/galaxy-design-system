# Text Editor

The Text Editor mimics a markdown editor thats provide capabilities like writing content in Markdown format, a real-time preview of the content, and a toolbar showcasing capabilities that a Markdown file supports (if the user is not familiar with the standard conventions/ formats used in an Md file).

<!--single-column-->

## Import CSS file in your app

```html
<script src="md-editor-v3/lib/style.css"></script>
```

or

```ts
import 'md-editor-v3/lib/style.css'
```

## Demos

```demo
basic.vue
full.vue
toolbars.vue
toolbarsExclude.vue
previewTheme.vue
showCodeRowNumber.vue
codeTheme.vue
disabled.vue
placeholder.vue
tableShape.vue
uploadImg.vue
```

## API

### MD Preview Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | The initial content value of the editor. |
| theme | `'light' \| 'dark'` | `'light'` | Editor theme. |
| class | `string` | `''` | Additional CSS classes. |
| language | `string` | `'en-US'` | Editor language. Supports 'zh-CN' and 'en-US'. |
| editorId | `string` | `'md-editor-v3'` | Editor unique identifier. |
| showCodeRowNumber | `boolean` | `true` | Display line numbers in code blocks. |
| previewTheme | `'default' \| 'github' \| 'vuepress' \| 'mk-cute' \| 'smart-blue' \| 'cyanosis'` | `'default'` | Preview content theme. |
| style | `string \| CSSProperties` | `''` | Editor inline styles. |
| noMermaid | `boolean` | `false` | Disable mermaid chart rendering. |
| noKatex | `boolean` | `false` | Disable KaTeX math formula rendering. |
| codeTheme | `'atom' \| 'a11y' \| 'github' \| 'gradient' \| 'kimbie' \| 'paraiso' \| 'qtcreator' \| 'stackoverflow'` | `'atom'` | Code block highlighting style. |
| mdHeadingId | `(text: string, level: number, index: number) => string` | `(text) => text` | Custom heading ID generator. |
| sanitize | `(html: string) => string` | `(html) => html` | HTML content sanitizer. |
| formatCopiedText | `(text: string) => string` | `(text) => text` | Format copied text. |
| codeStyleReverse | `boolean` | `true` | Auto-adjust code style for dark themes. |
| noHighlight | `boolean` | `false` | Disable code highlighting. |
| noImgZoomIn | `boolean` | `false` | Disable image zoom feature. |
| customIcon | `CustomIcon` | `{}` | Customized icons. Icons for copy and collapse-tips must be strings; others can be components or strings. |
| sanitizeMermaid | `(h: string) => Promise<string>` | `(h: string) => Promise.resolve(h)` | Convert the generated mermaid code. |
| codeFoldable | `boolean` | `true` | Enable code folding. |
| autoFoldThreshold | `number` | `30` | Line count for auto code folding. |

### MD Editor Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | The initial content value of the editor. |
| class | `string` | `''` | Additional CSS classes. |
| language | `string` | `'en-US'` | Editor language. Supports 'zh-CN' and 'en-US'. |
| editorId | `string` | `'md-editor-v3'` | Editor unique identifier. |
| showCodeRowNumber | `boolean` | `true` | Display line numbers in code blocks. |
| previewTheme | `'default' \| 'github' \| 'vuepress' \| 'mk-cute' \| 'smart-blue' \| 'cyanosis'` | `'default'` | Preview content theme. |
| style | `string \| CSSProperties` | `''` | Editor inline styles. |
| noMermaid | `boolean` | `false` | Disable mermaid chart rendering. |
| noKatex | `boolean` | `false` | Disable KaTeX math formula rendering. |
| codeTheme | `'atom' \| 'a11y' \| 'github' \| 'gradient' \| 'kimbie' \| 'paraiso' \| 'qtcreator' \| 'stackoverflow'` | `'atom'` | Code block highlighting style. |
| mdHeadingId | `(text: string, level: number, index: number) => string` | `(text) => text` | Custom heading ID generator. |
| sanitize | `(html: string) => string` | `(html) => html` | HTML content sanitizer. |
| formatCopiedText | `(text: string) => string` | `(text) => text` | Format copied text. |
| codeStyleReverse | `boolean` | `true` | Auto-adjust code style for dark themes. |
| noHighlight | `boolean` | `false` | Disable code highlighting. |
| noImgZoomIn | `boolean` | `false` | Disable image zoom feature. |
| customIcon | `CustomIcon` | `{}` | Customized icons. Icons for copy and collapse-tips must be strings; others can be components or strings. |
| sanitizeMermaid | `(h: string) => Promise<string>` | `(h: string) => Promise.resolve(h)` | Convert the generated mermaid code. |
| codeFoldable | `boolean` | `true` | Enable code folding. |
| autoFoldThreshold | `number` | `30` | Line count for auto code folding. |
| pageFullscreen | `boolean` | `false` | Full screen within the page. |
| preview | `boolean` | `true` | Whether to show preview or not. |
| previewOnly | `boolean` | `true` | Whether to show only preview and not editor |
| htmlPreview | `boolean` | `false` | Whether to display HTML preview. When true, preview must be false. |
| toolbars | `Array` | `[]` | Selectively display the toolbar. Available options: 'bold', 'underline', 'italic', 'title', 'strikeThrough', 'sub', 'sup', 'quote', 'unorderedList', 'orderedList', 'task', 'codeRow', 'code', 'link', 'image', 'table', 'mermaid', 'katex', 'revoke', 'next', 'save', 'pageFullscreen', 'fullscreen', 'preview', 'previewOnly', 'htmlPreview', 'catalog', 'github'. Can be reordered and split with '-' or '='. |
| toolbarsExclude | `Array` | `[]` | Selectively hide toolbar items. Options same as above |
| noPrettier | `boolean` | `false` | Whether to disable prettier optimization. |
| tabWidth | `number` | `2` | Number of spaces for TAB key. |
| tableShape | `[number, number] \| [number, number, number, number]` | `[6, 4]` | Table size presets. |
| placeholder | `string` | `''` | Input placeholder text. |
| footers | `Array<'markdownTotal' \| '=' \| 'scrollSwitch' \| number>` | `['markdownTotal', '=', 'scrollSwitch']` | The footer displays content, '='split left and right, and is set []not to display the footer. |
| scrollAuto | `boolean` | `true` | Default left-right sync scrolling state. |
| noUploadImg | `boolean` | `false` | Hide image upload option. |
| autoFocus | `boolean` | `false` | Auto-focus text area. |
| disabled | `boolean` | `false` | Disable text area. |
| readOnly | `boolean` | `false` | Make text area read-only. |
| maxLength | `number` | `` | Maximum character limit. |
| autoDetectCode | `boolean` | `false` | Enable auto code language detection. |
| completions | `Array<CompletionSource>` | `[]` | Additional autocomplete sources. |
| showToolbarName | `boolean` | `false` | Whether to display the corresponding text name below the toolbar |
| inputBoxWidth | `string` | `'50%'` | Input box default width. |
| transformImgUrl | `(imgUrl: string) => string \| Promise<string>` | `t => t` | Image URL transformer. |

### MD Preview Methods

| Name | Type | Description |
| --- | --- | --- |
| onChange | `(v: string) => void` | Content change event (currently bound to textarea's oninput event, triggers on each character input). |
| onHtmlChanged | `(h: string) => void` | HTML change callback event to obtain preview HTML code. |

### MD Editor Methods

| Name | Type | Description |
| --- | --- | --- |
| onChange | `(v: string) => void` | Content change event (currently bound to textarea's oninput event, triggers on each character input). |
| onHtmlChanged | `(h: string) => void` | HTML change callback event to obtain preview HTML code. |
| onSave | `(v: string, h: Promise<string>) => void` | Save event triggered by shortcut keys and save buttons. |
| onUploadImg | `(files: Array<File>, callback: (urls: string[] \| { url: string; alt: string; title: string }[]) => void)` | Image upload event handler. Requires callback with uploaded URL. |
| onError | `(err: InnerError) => void` | Captures execution errors (Cropper, fullscreen, prettier, overlength, mermaid). |
| onBlur | `(event: FocusEvent) => void` | Input box blur event handler. |
| onFocus | `(event: FocusEvent) => void` | Input box focus event handler. |
| onInput | `(event: Event) => void` | Input box typing event handler. |
| onDrop | `(event: DragEvent) => void` | Drag and drop content event handler. |
| onInputBoxWidthChange | `(width: string) => void` | Input box width adjustment event handler. |
