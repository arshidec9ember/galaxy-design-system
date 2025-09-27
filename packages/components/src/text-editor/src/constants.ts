import {
  Bold,
  Checklist,
  Save,
  Code,
  FlowChart,
  FullScreenEnter,
  FullScreenExit,
  InsertPhoto,
  Italic,
  Quote,
  Link,
  Undo,
  Redo,
  PreviewOff,
  UnorderedList,
  OrderedList,
  Strikethrough,
  PreviewOnly,
  Heading,
  Underline,
  Lowercase,
  Uppercase,
  BlockLevelCode,
  TableView,
  Katex,
  Prettier,
  FullScreenInPage,
  Catalog,
  Github,
  HTMLPreview,
  FullScreenInPageExit
} from '../../_internal/icons'
import { type ConfigOption } from 'md-editor-v3'
import type { Ref } from 'vue'
import type { ZLocale } from '../../locales'
export const editorLanguageConfig = (
  locale: Ref<ZLocale['TextEditor']>,
  lang: string
): Partial<ConfigOption> => {
  return {
    editorConfig: {
      languageUserDefined: {
        [lang]: {
          toolbarTips: {
            bold: locale.value.toolbarTips.bold,
            underline: locale.value.toolbarTips.underline,
            italic: locale.value.toolbarTips.italic,
            strikeThrough: locale.value.toolbarTips.strikeThrough,
            title: locale.value.toolbarTips.title,
            sub: locale.value.toolbarTips.sub,
            sup: locale.value.toolbarTips.sup,
            quote: locale.value.toolbarTips.quote,
            unorderedList: locale.value.toolbarTips.unorderedList,
            orderedList: locale.value.toolbarTips.orderedList,
            task: locale.value.toolbarTips.task,
            codeRow: locale.value.toolbarTips.codeRow,
            code: locale.value.toolbarTips.code,
            link: locale.value.toolbarTips.link,
            image: locale.value.toolbarTips.image,
            table: locale.value.toolbarTips.table,
            mermaid: locale.value.toolbarTips.mermaid,
            katex: locale.value.toolbarTips.katex,
            revoke: locale.value.toolbarTips.revoke,
            next: locale.value.toolbarTips.next,
            save: locale.value.toolbarTips.save,
            prettier: locale.value.toolbarTips.prettier,
            pageFullscreen: locale.value.toolbarTips.pageFullscreen,
            fullscreen: locale.value.toolbarTips.fullscreen,
            preview: locale.value.toolbarTips.preview,
            previewOnly: locale.value.toolbarTips.previewOnly,
            htmlPreview: locale.value.toolbarTips.htmlPreview,
            catalog: locale.value.toolbarTips.catalog,
            github: locale.value.toolbarTips.github
          },
          titleItem: {
            h1: locale.value.titleItem.h1,
            h2: locale.value.titleItem.h2,
            h3: locale.value.titleItem.h3,
            h4: locale.value.titleItem.h4,
            h5: locale.value.titleItem.h5,
            h6: locale.value.titleItem.h6
          },
          imgTitleItem: {
            link: locale.value.imgTitleItem.link,
            upload: locale.value.imgTitleItem.upload,
            clip2upload: locale.value.imgTitleItem.clip2upload
          },
          linkModalTips: {
            linkTitle: locale.value.linkModalTips.linkTitle,
            imageTitle: locale.value.linkModalTips.imageTitle,
            descLabel: locale.value.linkModalTips.descLabel,
            descLabelPlaceHolder:
              locale.value.linkModalTips.descLabelPlaceHolder,
            urlLabel: locale.value.linkModalTips.urlLabel,
            urlLabelPlaceHolder: locale.value.linkModalTips.urlLabelPlaceHolder,
            buttonOK: locale.value.linkModalTips.buttonOK
          },
          clipModalTips: {
            title: locale.value.clipModalTips.title,
            buttonUpload: locale.value.clipModalTips.buttonUpload
          },
          copyCode: {
            text: locale.value.copyCode.text,
            successTips: locale.value.copyCode.successTips,
            failTips: locale.value.copyCode.failTips
          },
          mermaid: {
            flow: locale.value.mermaid.flow,
            sequence: locale.value.mermaid.sequence,
            gantt: locale.value.mermaid.gantt,
            class: locale.value.mermaid.class,
            state: locale.value.mermaid.state,
            pie: locale.value.mermaid.pie,
            relationship: locale.value.mermaid.relationship,
            journey: locale.value.mermaid.journey
          },
          katex: {
            inline: locale.value.katex.inline,
            block: locale.value.katex.block
          },
          footer: {
            markdownTotal: locale.value.footer.markdownTotal,
            scrollAuto: locale.value.footer.scrollAuto
          }
        }
      }
    }
  }
}

export const defaultCustomIcon = {
  bold: {
    component: Bold
  },
  underline: {
    component: Underline
  },
  sub: {
    component: Uppercase
  },
  sup: {
    component: Lowercase
  },
  title: {
    component: Heading
  },
  blockLevelCode: {
    component: BlockLevelCode
  },
  prettier: {
    component: Prettier
  },
  formula: {
    component: Katex
  },
  italic: {
    component: Italic
  },
  'strike-through': {
    component: Strikethrough
  },
  mermaid: {
    component: FlowChart
  },
  quote: {
    component: Quote
  },
  'unordered-list': {
    component: UnorderedList
  },
  'ordered-list': {
    component: OrderedList
  },
  task: {
    component: Checklist
  },
  code: {
    component: BlockLevelCode
  },
  'code-row': {
    component: Code
  },
  link: {
    component: Link
  },
  image: {
    component: InsertPhoto
  },
  table: {
    component: TableView
  },
  revoke: {
    component: Undo
  },
  next: {
    component: Redo
  },
  baocun: {
    component: Save
  },
  fullscreen: {
    component: FullScreenEnter
  },
  'fullscreen-exit': {
    component: FullScreenExit
  },
  fangda: {
    component: FullScreenInPage
  },
  suoxiao: {
    component: FullScreenInPageExit
  },
  preview: {
    component: PreviewOff
  },
  'preview-only': {
    component: PreviewOnly
  },
  coding: {
    component: HTMLPreview
  },
  catalog: {
    component: Catalog
  },
  github: {
    component: Github
  }
}
