import { c, cB, cM, cNotM, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-td-color
// --z-td-color-modal
// --z-td-color-popover
// --z-td-text-color
// --z-border-color
// --z-border-color-modal
// --z-border-color-popover
// --z-border-radius
// --z-font-size
// --z-th-color
// --z-th-color-modal
// --z-th-color-popover
// --z-th-font-weight
// --z-th-text-color
// --z-line-height
// --z-td-padding
// --z-th-padding
export default c([
  cB('table', `
    font-size: var(--z-font-size);
    font-variant-numeric: tabular-nums;
    line-height: var(--z-line-height);
    width: 100%;
    border-radius: var(--z-border-radius) var(--z-border-radius) 0 0;
    text-align: left;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    background-color: var(--z-td-color);
    border-color: var(--z-merged-border-color);
    transition:
      background-color .3s var(--z-bezier),
      border-color .3s var(--z-bezier),
      color .3s var(--z-bezier);
    --z-merged-border-color: var(--z-border-color);
  `, [
    c('th', `
      white-space: nowrap;
      transition:
        background-color .3s var(--z-bezier),
        border-color .3s var(--z-bezier),
        color .3s var(--z-bezier);
      text-align: inherit;
      padding: var(--z-th-padding);
      vertical-align: inherit;
      text-transform: none;
      border: 0px solid var(--z-merged-border-color);
      font-weight: var(--z-th-font-weight);
      color: var(--z-th-text-color);
      background-color: var(--z-th-color);
      border-bottom: 2px solid var(--z-merged-border-color);
      border-right: 1px solid var(--z-merged-border-color);
    `, [
      c('&:last-child', `
        border-right: 0px solid var(--z-merged-border-color);
      `)
    ]),
    c('td', `
      transition:
        background-color .3s var(--z-bezier),
        border-color .3s var(--z-bezier),
        color .3s var(--z-bezier);
      padding: var(--z-td-padding);
      color: var(--z-td-text-color);
      background-color: var(--z-td-color);
      border: 0px solid var(--z-merged-border-color);
      border-right: 1px solid var(--z-merged-border-color);
      border-bottom: 1px solid var(--z-merged-border-color);
    `, [
      c('&:last-child', `
        border-right: 0px solid var(--z-merged-border-color);
      `)
    ]),
    cM('bordered', `
      border: 1px solid var(--z-merged-border-color);
      border-radius: var(--z-border-radius);
    `, [
      c('tr', [
        c('&:last-child', [
          c('td', `
            border-bottom: 0 solid var(--z-merged-border-color);
          `)
        ])
      ])
    ]),
    cM('hide-column-separator', [
      c('th', `
        border-right: 0px solid var(--z-merged-border-color);
      `),
      c('td', `
        border-right: 0px solid var(--z-merged-border-color);
      `)
    ]),
    cM('hide-row-separator', [
      c('tr', [
        c('&:not(:last-child)', [
          c('td', `
            border-bottom: 0px solid var(--z-merged-border-color);
          `)
        ])
      ])
    ]),
    cM('striped', [
      c('tr:nth-of-type(even)', [c('td', 'background-color: var(--z-td-color-striped)')])
    ]),
    cNotM('bottom-bordered', [
      c('tr', [
        c('&:last-child', [
          c('td', `
            border-bottom: 0px solid var(--z-merged-border-color);
          `)
        ])
      ])
    ])
  ]),
  insideModal(
    cB('table', `
      background-color: var(--z-td-color-modal);
      --z-merged-border-color: var(--z-border-color-modal);
    `, [
      c('th', `
        background-color: var(--z-th-color-modal);
      `),
      c('td', `
        background-color: var(--z-td-color-modal);
      `)
    ])
  ),
  insidePopover(
    cB('table', `
      background-color: var(--z-td-color-popover);
      --z-merged-border-color: var(--z-border-color-popover);
    `, [
      c('th', `
        background-color: var(--z-th-color-popover);
      `),
      c('td', `
        background-color: var(--z-td-color-popover);
      `)
    ])
  )
])
