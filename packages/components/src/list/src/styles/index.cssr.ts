import { cB, c, cE, cM, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --z-font-size
// --z-bezier
// --z-text-color
// --z-color
// --z-color-hover
// --z-border-radius
// --z-border-color
// --z-border-color-modal
// --z-border-color-popover
// --z-color-modal
// --z-color-popover
// --z-color-hover-modal
// --z-color-hover-popover
// --z-description-text-color
export default c([
  cB('list', `
    --z-merged-border-color: var(--z-border-color);
    --z-merged-color: var(--z-color);
    --z-merged-color-hover: var(--z-color-hover);
    --z-selected-color: var(--z-color-hover);
    margin: 0;
    font-size: var(--z-font-size);
    transition:
      background-color .3s var(--z-bezier),
      color .3s var(--z-bezier),
      border-color .3s var(--z-bezier);
    padding: 0;
    list-style-type: none;
    color: var(--z-text-color);
    background-color: var(--z-merged-color);
  `, [
    cB('radio', `
      align-items:flex-start;`,
    [
      cE('dot-wrapper', `
          margin-top:2px;
      `)
    ]
    ),
    cB('checkbox', `
          align-items:flex-start;
    `),
    cB('checkbox-box-wrapper', `
          margin-top:2px;
    `),
    cM('show-divider', [
      cB('list-item', [
        c('&:not(:last-child)', [
          cE('divider', `
            background-color: var(--z-merged-border-color);
          `)
        ])
      ])
    ]),
    cM('clickable', [
      cB('list-item', `
        cursor: pointer;
      `)
    ]),
    cM('bordered', `
      border: 1px solid var(--z-merged-border-color);
      border-radius: var(--z-border-radius);
    `),
    cM('hoverable', [
      cB('list-item', `
        border-radius: var(--z-border-radius);
      `, [
        c('&:hover', `
          background-color: var(--z-merged-color-hover);
        `)
      ])
    ]),
    cM('bordered, hoverable', [
      cB('list-item', `
        padding: 8px 16px;
      `),
      cE('header, footer', `
        padding: 8px 16px;
        `),
      cE('footer', `
        font-size: 12px;
      `)
    ]),
    cE('header, footer', `
      padding: 12px 0;
      box-sizing: border-box;
      transition: border-color .3s var(--z-bezier);
    `, [
      c('&:not(:last-child)', `
        border-bottom: 1px solid var(--z-merged-border-color);
      `)
    ]),
    cE('footer', `
       font-size: 12px;
      `),
    cB('list-item', `
      position: relative;
      padding: 12px 0; 
      box-sizing: border-box;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      transition:
        background-color .3s var(--z-bezier),
        border-color .3s var(--z-bezier);
    `, [
      cM('selected', 'background-color: var(--z-selected-color);'),
      cE('prefix', `
        margin-right: 20px;
        flex: 0;
      `),
      cE('suffix', `
        margin-left: 20px;
        flex: 0;
      `),
      cE('main', `
        flex: 1;
      `),
      cE('divider', `
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: transparent;
        transition: background-color .3s var(--z-bezier);
        pointer-events: none;
      `)
    ])
  ]),
  insideModal(
    cB('list', `
      --z-merged-color-hover: var(--z-color-hover-modal);
      --z-merged-color: var(--z-color-modal);
      --z-merged-border-color: var(--z-border-color-modal);
    `)
  ),
  insidePopover(
    cB('list', `
      --z-merged-color-hover: var(--z-color-hover-popover);
      --z-merged-color: var(--z-color-popover);
      --z-merged-border-color: var(--z-border-color-popover);
    `)
  )
])
