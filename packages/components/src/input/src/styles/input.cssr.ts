import { cB, c, cE, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-color
// --z-font-size
// --z-border-radius
// --z-height
// --z-padding-left
// --z-padding-right
// --z-text-color
// --z-text-color-disabled
// --z-caret-color
// --z-text-decoration-color
// --z-border
// --z-border-disabled
// --z-border-hover
// --z-border-focus
// --z-placeholder-color
// --z-placeholder-color-disabled
// --z-line-height-textarea
// --z-color-disabled
// --z-color-focus
// --z-box-shadow-focus
// --z-clear-color
// --z-clear-size
// --z-clear-color-hover
// --z-clear-color-pressed
// --z-suffix-text-color
// --z-icon-color
// --z-icon-color-hover
// --z-icon-color-pressed
// --z-icon-color-disabled
// --z-count-text-color
// --z-count-text-color-disabled
// --z-loading-color
// ...form item vars
export default cB('input', `
  max-width: 100%;
  cursor: text;
  line-height: 1.5;
  z-index: auto;
  outline: none;
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  border-radius: var(--z-border-radius);
  transition: background-color .3s var(--z-bezier);
  font-size: var(--z-font-size);
  background-color: var(--z-input-background-color);
  --z-padding-vertical: calc((var(--z-height) - 1.5 * var(--z-font-size)) / 2);
`, [
  // common
  cE('input, textarea', `
    overflow: hidden;
    flex-grow: 1;
    position: relative;
  `),
  cE('input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder', `
    box-sizing: border-box;
    font-size: inherit;
    line-height: 1.5;
    font-family: inherit;
    border: none;
    outline: none;
    text-align: inherit;
    transition:
      -webkit-text-fill-color .3s var(--z-bezier),
      caret-color .3s var(--z-bezier),
      color .3s var(--z-bezier),
      text-decoration-color .3s var(--z-bezier);
  `),
  cE('input-el, textarea-el', `
    -webkit-appearance: none;
    scrollbar-width: none;
    width: 100%;
    min-width: 0;
    text-decoration-color: var(--z-text-decoration-color);
    color: var(--z-text-color);
    caret-color: var(--z-caret-color);
    background-color: transparent;
  `, [
    c('&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb', `
      width: 0;
      height: 0;
      display: none;
    `),
    c('&::placeholder', `
      color: #0000;
      -webkit-text-fill-color: transparent !important;
    `),
    c('&:-webkit-autofill ~', [
      cE('placeholder', 'display: none;')
    ])
  ]),
  cM('round', [
    cNotM('textarea', 'border-radius: calc(var(--z-height) / 2);')
  ]),
  cE('placeholder', `
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    color: var(--z-placeholder-color);
  `, [
    c('span', `
      width: 100%;
      display: inline-block;
    `)
  ]),
  cM('textarea', [
    cE('placeholder', 'overflow: visible;')
  ]),
  cNotM('autosize', 'width: 100%;'),
  cM('autosize', [
    cE('textarea-el, input-el', `
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    `)
  ]),
  // input
  cB('input-wrapper', `
    overflow: hidden;
    display: inline-flex;
    flex-grow: 1;
    position: relative;
    padding-left: var(--z-padding-left);
    padding-right: var(--z-padding-right);
  `),
  cE('input-mirror', `
    padding: 0;
    height: var(--z-height);
    line-height: var(--z-height);
    overflow: hidden;
    visibility: hidden;
    position: static;
    white-space: pre;
    pointer-events: none;
  `),
  cE('input-el', `
    padding: 0;
    height: var(--z-height);
    line-height: var(--z-height);
  `, [
    c('+', [
      cE('placeholder', `
        display: flex;
        align-items: center;  
      `)
    ])
  ]),
  cNotM('textarea', [
    cE('placeholder', 'white-space: nowrap;')
  ]),
  cE('eye', `
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color .3s var(--z-bezier);
  `),
  // textarea
  cM('textarea', 'width: 100%;', [
    cB('input-word-count', `
      position: absolute;
      right: var(--z-padding-right);
      bottom: var(--z-padding-vertical);
    `),
    cM('resizable', [
      cB('input-wrapper', `
        resize: vertical;
        min-height: var(--z-height);
      `)
    ]),
    cE('textarea-el, textarea-mirror, placeholder', `
      height: 100%;
      padding-left: 0;
      padding-right: 0;
      padding-top: var(--z-padding-vertical);
      padding-bottom: var(--z-padding-vertical);
      word-break: break-word;
      display: inline-block;
      vertical-align: bottom;
      box-sizing: border-box;
      line-height: var(--z-line-height-textarea);
      margin: 0;
      resize: none;
      white-space: pre-wrap;
      scroll-padding-block-end: var(--z-padding-vertical);
    `),
    cE('textarea-mirror', `
      width: 100%;
      pointer-events: none;
      overflow: hidden;
      visibility: hidden;
      position: static;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    `)
  ]),
  // pair
  cM('pair', [
    cE('input-el, placeholder', 'text-align: center;'),
    cE('separator', `
      display: flex;
      align-items: center;
      transition: color .3s var(--z-bezier);
      color: var(--z-text-color);
      white-space: nowrap;
    `, [
      cB('icon', `
        color: var(--z-icon-color);
      `),
      cB('base-icon', `
        color: var(--z-icon-color);
      `)
    ])
  ]

  ),
  cM('disabled', `
    cursor: not-allowed;
    
    opacity: 40%;
  `, [
    // cE('border', 'border: var(--z-border-disabled);'),
    cE('input-el, textarea-el', `
      cursor: not-allowed;
      color: var(--z-text-color-disabled);
      text-decoration-color: var(--z-text-color-disabled);
    `),
    cE('placeholder', 'color: var(--z-placeholder-color-disabled);'),
    cE('separator', 'color: var(--z-text-color-disabled);', [
      cB('icon', `
        color: var(--z-icon-color-disabled);
      `),
      cB('base-icon', `
        color: var(--z-icon-color-disabled);
      `)
    ]),
    cB('input-word-count', `
      color: var(--z-count-text-color-disabled);
    `),
    cE('suffix, prefix', 'color: var(--z-text-color-disabled);', [
      cB('icon', `
        color: var(--z-icon-color-disabled);
      `),
      cB('internal-icon', `
        color: var(--z-icon-color-disabled);
      `)
    ])
  ]),
  cNotM('disabled', [
    cE('eye', `
      color: var(--z-icon-color);
      cursor: pointer;
    `, [
      c('&:hover', `
        color: var(--z-icon-color-hover);
      `),
      c('&:active', `
        color: var(--z-icon-color-pressed);
      `)
    ]),
    c('&:hover', [
      cE('state-border', 'border: var(--z-border-hover);')
    ]),
    cM('focus', '', [
      cE('state-border', `
        border: var(--z-border-focus);
        box-shadow: var(--z-box-shadow-focus);
      `)
    ])
  ]),
  cE('border, state-border', `
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: inherit;
    border: var(--z-border);
    transition:
      box-shadow .3s var(--z-bezier),
      border-color .3s var(--z-bezier);
  `),
  cE('state-border', `
    border-color: #0000;
    z-index: 1;
  `),
  cE('prefix', 'margin-right: 4px;'),
  cE('suffix', `
    margin-left: 4px;
  `),
  cE('suffix, prefix', `
    transition: color .3s var(--z-bezier);
    flex-wrap: nowrap;
    flex-shrink: 0;
    line-height: var(--z-height);
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--z-suffix-text-color);
  `, [
    cB('base-loading', `
      font-size: var(--z-icon-size);
      margin: 0 2px;
      color: var(--z-loading-color);
    `),
    cB('base-clear', `
      font-size: var(--z-icon-size);
    `, [
      cE('placeholder', [
        cB('base-icon', `
          transition: color .3s var(--z-bezier);
          color: var(--z-icon-color);
          font-size: var(--z-icon-size);
        `)
      ])
    ]),
    c('>', [
      cB('icon', `
        transition: color .3s var(--z-bezier);
        color: var(--z-icon-color);
        font-size: var(--z-icon-size);
      `)
    ]),
    cB('base-icon', `
      font-size: var(--z-icon-size);
    `)
  ]),
  cB('input-word-count', `
    pointer-events: none;
    line-height: 1.5;
    font-size: .85em;
    color: var(--z-count-text-color);
    transition: color .3s var(--z-bezier);
    margin-left: 4px;
    font-variant: tabular-nums;
  `),
  ['warning', 'error'].map(status => cM(`${status}-status`, [
    cNotM('disabled', [
      cB('base-loading', `
        color: var(--z-loading-color-${status})
      `),
      cE('input-el, textarea-el', `
        caret-color: var(--z-caret-color-${status});
      `),
      cE('state-border', `
        border: var(--z-border-${status});
        box-shadow: var(--z-box-shadow-${status});
      `),
      c('&:hover', [
        cE('state-border', `
          border: var(--z-border-hover-${status});
          box-shadow: var(--z-box-shadow-hover-${status});
        `)
      ]),
      c('&:focus', `
        // background-color: var(--z-color-focus-${status});
      `, [
        cE('state-border', `
          border: var(--z-border-focus-${status});
          box-shadow: var(--z-box-shadow-focus-${status});
        `)
      ]),
      cM('focus', `
      `, [
        cE('state-border', `
          border: var(--z-border-focus-${status});
          box-shadow: var(--z-box-shadow-focus-${status});
        `)
      ])
    ])
  ]))
])

export const safariStyle = cB('input', [
  cM('disabled', [
    cE('input-el, textarea-el', `
      -webkit-text-fill-color: var(--z-text-color-disabled);
    `)
  ])
])
