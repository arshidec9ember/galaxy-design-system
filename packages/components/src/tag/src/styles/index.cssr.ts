import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-border-radius
// --z-border
// --z-close-icon-color
// --z-close-icon-color-hover
// --z-close-icon-color-pressed
// --z-close-margin
// --z-close-size
// --z-color
// --z-color-checked
// --z-border-focused
// --z-border-color-checked
// --z-color-hover
// --z-color-pressed
// --z-font-size
// --z-height
// --z-opacity-disabled
// --z-padding
// --z-padding-pill
// --z-text-color
// --z-border-color
// --z-font-weight-strong
export default cB('tag', `
  white-space: nowrap;
  position: relative;
  cursor: default;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  box-sizing: border-box;
  padding: var(--z-padding);
  border-radius: var(--z-border-radius);
  color: var(--z-text-color);
  background-color: var(--z-color);
  transition: 
    border-color .3s var(--z-bezier),
    color .3s var(--z-bezier),
    box-shadow .3s var(--z-bezier),
    opacity .3s var(--z-bezier);
  line-height: 1;
  height: var(--z-height);
  font-size: var(--z-font-size);
`, [
  cM('strong', `
    font-weight: var(--z-font-weight-strong);
  `),
  cM('readonly', `
    opacity: 0.6;
    background-color: var(--gds-color-bg-neutral);
  `),
  cE('border', `
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: inherit;
    border: var(--z-border);
    border-color: var(--z-border-color);
    transition: border-color .3s var(--z-bezier);
  `),
  cE('icon', `
    display: flex;
    margin: 0 4px 0 0;
    color: var(--z-icon-color);
    transition: color .3s var(--z-bezier);
    font-size: var(--z-avatar-size-override);
  `),
  cE('avatar', `
    display: flex;
    margin: 0 6px 0 0;
  `),
  cE('close, action', `
    display: none;
    transition:
      color .3s var(--z-bezier);
  `),
  c('&:pressed', '', [
    cE('close, action', `
        background-color: inherit;
      `, [
      c('&::before', `
            background-color: inherit;
        `)
    ])
  ]),
  c('&:hover', '', [
    cE('action-gradient', `
        position: absolute;
        right: 0;
        top: 0;
        width: 26px;
        height: 100%;
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
    `, [
      c('&::before', `
           content: " ";
            position: absolute;
            width: 50px;
            height: 100%;
            right: 0px;
            border-radius: inherit;
            top: 0;
            background: linear-gradient(90deg, transparent 1%, var(--gds-color-bg-neutral-dark1), var(--z-color-hover) 100%);
        `)
    ]),
    cE('close', 'right: 5px'),
    cE('action', 'right: 2px'),
    cE('close, action', `
        position: absolute;
        margin: 0;
        height: calc(100% - 2px);
        align-items: center;
        z-index: 1;
        display: flex;
        padding: 0 6px;
        background-color: transparent;
        border-radius: inherit;
        transition: color .3s var(--z-bezier);
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
  `, [
      c('&::before', `
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    `)
    ])
  ]),
  cM('round', `
    border-radius: calc(var(--z-height) / 2);
    padding: var(--z-padding-pill);
  `),
  cM('disabled', `
    cursor: not-allowed !important;
    opacity: var(--z-opacity-disabled);
  `),
  cM('checkable', `
    cursor: pointer;
    box-shadow: none;
  `, [
    cNotM('disabled', [
      c('&:hover', 'background-color: var(--z-color-hover);'),
      c('&:active', 'background-color: var(--z-color-pressed);')
    ]),
    cM('checked', `
      background-color: var(--z-color-checked);
    `, [
      c('&:hover', `
          `, [
        cE('close', `
                background-color:  var(--z-color-checked);
            `, [
          c('&::before', `
                    background-color:  var(--z-color-checked);
                `)
        ])
      ]),
      cNotM('disabled', [
        c('&:hover', 'background-color: var(--z-color-checked)'),
        c('&:active', 'background-color: var(--z-color-checked)')
      ]),
      cE('border', `
        border: var(--z-border-color-checked);
      `)
    ])
  ]),
  cM('closable', '', [
    cNotM('checkable', `
      background-color: var(--z-color-checked);
    `, [
      c('&:hover', `
          `, [
        cE('close', `
            background-color:  var(--z-color-checked);
        `, [
          c('&::before', `
            background-color:  var(--z-color-checked);
          `)
        ])
      ])
    ])
  ]),
  cE('content', `
    display: flex;
    align-items: center;
    font-size: var(--z-font-size);
  `, [
    c('span.value', {
      color: 'var(--gds-color-text-primary)',
      paddingLeft: 'var(--gds-space-2)'
    })
  ]),
  cE('label', `
    display: flex;
    align-items: center;
    padding-right: var(--gds-space-2);
  `),
  cM('combobox', `
    color: var(--gds-color-text-neutral-light1);
    background: var(--gds-color-bg-neutral) !important;
    height: 1.5rem;
 `, [

    cE('content', `
    `, [
      c('span',
        'line-height: var(--gds-line-height-20)'
      )
    ]),
    c('&:hover', `
    `, [
      cE('close', `
          background-color:  var(--gds-color-bg-neutral) !important;
      `, [
        c('&::before', `
            background-color: var(--gds-color-bg-neutral) !important;
          `)
      ])
    ])
  ]),
  c('&:focus-visible', `
    outline: 2px solid var(--z-border-focused);
  `, [
    cE('border', `
        border: none !important;
    `)
  ])
])
