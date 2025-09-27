import { c, cB, cE, cM } from '../../../_utils/cssr'
// vars:
// --z-font-size
// --z-bezier
// --z-font-family
// --z-font-size-x-large
// --z-line-number-color
// --z-copy-icon-color
// --z-chevron-color
// --z-background-color
// --z-line-number-background-color
// --z-bracket-color
// --z-key-color
// --z-number-color
// --z-boolean-color
// --z-undefined-color
// --z-string-color
// --z-bg-color
// --z-null-color
// --z-comment-color
// --z-scroll-color
// --z-option-color
// --z-border-radius
// --z-padding
// --z-label-padding
// --z-content-margin-right
// --z-copy-button-margin
export default c([
  cB('json-viewer', `
    font-size: var(--z-font-size);
    word-break: normal;
    position: relative;
    border: 1px solid var(--z-border-color);
    border-radius: var(--z-border-radius);
    color: var(--z-bracket-color);
    overflow: hidden;
    background-color: var(--z-bg-color);
  `, [
    cE('wrapper', `
      overflow:hidden;
      background: var(--z-bg-color);
      background-clip: content-box, padding-box;
    `, [
      cE('content', `
        background: var(--z-background-color);
        background-clip: content-box, padding-box;
      `, [
        c('.vjs-tree-node', `
            padding:0 var(--z-padding);
            font: var(--gds-font-code-1-r);
            white-space: unset;
            border-left: 1px solid var(--z-border-color);
        `, [
          c('&:first-child', `
            padding-top:var(--z-padding);
          `),
          c('&:last-child', `
            padding-bottom:var(--z-padding);
          `),
          c('&.has-carets', `
            padding-left: 20px;
          `),
          c('&:hover', `
            background-color:var(--z-background-color);
          `),
          c('.vjs-indent', `
            color: var(--z-chevron-color);
          `, [
            c('.vjs-carets', `
            transition: transform 0.3s var(--z-bezier); 
            `),
            c('.vjs-carets:hover', `
            color: var(--z-chevron-color);
            `)
          ]),
          c('.vjs-key', `
            color: var(--z-key-color);
          `, [
            c('.vjs-colon', `
              color: var(--z-bracket-color);
            `)
          ]),
          c('.vjs-tree-brackets', `
            color: var(--z-bracket-color);
          `),
          c('.vjs-value-number', `
            color: var(--z-number-color);
          `),
          c('.vjs-value-string', `
          color: var(--z-string-color);
          `),
          c('.vjs-value-null', `
          color: var(--z-null-color);
          `),
          c('.vjs-value-undefined', `
          color: var(--z-undefined-color);
          `),
          c('.vjs-value-boolean', `
          color: var(--z-boolean-color);
          `),
          c('.vjs-comment', `
          color: var(--z-comment-color);
          `),
          c('.vjs-node-index', `
          margin-right: var(--z-padding);
          color: var(--z-line-number-color);
        `)
        ]),
        c('&::-webkit-scrollbar', `
            width: 4px;
            height: 4px;
        `),
        c('&::-webkit-scrollbar-thumb', `
          background-color: var(--z-scroll-color);
          border-radius: var(--z-border-radius);
        `)
      ])
    ]),
    cE('toggle-option', `
      position: absolute;
      width:100%;
      bottom: 0;
      background-color:var(--z-background-color);
      opacity: 1;
    `, [
      cE('option-button', [
        cE('show-option', `
            display: flex;
        `),
        cE('ellipses', `
          background-color: var(--z-line-number-background-color);
          color: var(--z-line-number-color);
          padding: var(--z-label-padding) 0;
          padding-right: var(--z-label-padding);
          box-sizing: border-box;
          text-align: end;
          height: inherit;
        `, [
          c('&:hover', `
            color: var(--z-line-number-color);
          `)
        ]),
        cE('show-label', `
          padding: var(--z-label-padding);
          display: flex;
          align-items: center;
          color: var(--z-option-color);
          border-left: 1px solid var(--z-border-color);
        `, [
          c('&:hover', `
            color: var(--z-option-color);
          `),
          c('.z-base-icon', `
            margin-left: 2px; 
            font-size: var(--z-font-size-x-large);
          `)
        ])
      ])
    ]),
    cE('show', `
        position: unset;
    `),
    cM('copyable', [
      cE('wrapper', [
        cE('content', [
          c('.vjs-tree-node', `
          padding-right: var(--z-content-margin-right);
      `)])]),
      cE('copy-button', `
      position: absolute;
      margin: var(--z-copy-button-margin);
      font-size:var(--z-font-size-x-large);
      right: 0;
      color: var(--z-copy-icon-color);
      z-index: 10;
    `)
    ]),
    cM('line-number', [
      cE('wrapper', `
        padding-left: var(--z-padding);
      `)
    ])
  ])
])
