import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --z-font-size
// --z-font-family
// --z-font-weight-strong
// --z-bezier
// --z-text-color
// --z-mono-3
// --z-hue-1
// --z-hue-2
// --z-hue-3
// --z-hue-4
// --z-hue-5
// --z-hue-5-2
// --z-hue-6
// --z-hue-6-2
// --z-line-number-color
// --z-line-number-text-color
// --z-line-number-background-color
export default c([
  cB('code', `
    font-size: var(--z-font-size);
    font-family: var(--z-font-family);
  `, [
    cM('show-line-numbers', `
      display: flex;
    `),
    cE('line-numbers', `
      user-select: none;
      padding-right: 8px;
      padding-left: 8px;
      margin-right: 8px;
      text-align: right;
      background: var(--z-line-number-background-color);
      transition: color .3s var(--z-bezier);
      color: var(--z-line-number-text-color);
    `),
    cM('word-wrap', [
      c('pre', `
        white-space: pre-wrap;
        word-break: break-all;
      `)
    ]),
    c('pre', `
      margin: 0;
      line-height: inherit;
      font-size: inherit;
      font-family: inherit;
    `),
    c('[class^=hljs]', `
      color: var(--z-text-color);
      transition: 
        color .3s var(--z-bezier),
        background-color .3s var(--z-bezier);
    `)
  ]), ({ props }) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const codeClass = `${props.bPrefix}code`
    return [
      `${codeClass} .hljs-comment,
      ${codeClass} .hljs-quote {
        color: var(--z-mono-3);
        font-style: italic;
      }`,
      `${codeClass} .hljs-doctag,
      ${codeClass} .hljs-keyword,
      ${codeClass} .hljs-formula {
        color: var(--z-hue-3);
      }`,
      `${codeClass} .hljs-section,
      ${codeClass} .hljs-name,
      ${codeClass} .hljs-selector-tag,
      ${codeClass} .hljs-deletion,
      ${codeClass} .hljs-subst {
        color: var(--z-hue-5);
      }`,
      `${codeClass} .hljs-literal {
        color: var(--z-hue-1);
      }`,
      `${codeClass} .hljs-string,
      ${codeClass} .hljs-regexp,
      ${codeClass} .hljs-addition,
      ${codeClass} .hljs-attribute,
      ${codeClass} .hljs-meta-string {
        color: var(--z-hue-4);
      }`,
      `${codeClass} .hljs-built_in,
      ${codeClass} .hljs-class .hljs-title {
        color: var(--z-hue-6-2);
      }`,
      `${codeClass} .hljs-attr,
      ${codeClass} .hljs-variable,
      ${codeClass} .hljs-template-variable,
      ${codeClass} .hljs-type,
      ${codeClass} .hljs-selector-class,
      ${codeClass} .hljs-selector-attr,
      ${codeClass} .hljs-selector-pseudo,
      ${codeClass} .hljs-number {
        color: var(--z-hue-6);
      }`,
      `${codeClass} .hljs-symbol,
      ${codeClass} .hljs-bullet,
      ${codeClass} .hljs-link,
      ${codeClass} .hljs-meta,
      ${codeClass} .hljs-selector-id,
      ${codeClass} .hljs-title {
        color: var(--z-hue-2);
      }`,
      `${codeClass} .hljs-emphasis {
        font-style: italic;
      }`,
      `${codeClass} .hljs-strong {
        font-weight: var(--z-font-weight-strong);
      }`,
      `${codeClass} .hljs-link {
        text-decoration: underline;
      }`
    ]
  }
])
