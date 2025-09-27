import { c, cB, cE, cM, insideModal, insidePopover } from '../../../_utils/cssr'
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'

// vars:
// --z-label-line-height
// --z-bezier
// --z-size
// --z-border
// --z-border-focus
// --z-border-checked
// --z-border-disabled
// --z-border-disabled-checked
// --z-box-shadow-focus
// --z-color
// --z-color-checked
// --z-color-table
// --z-color-table-modal
// --z-color-disabled
// --z-color-disabled-checked
// --z-text-color
// --z-text-color-disabled
// --z-check-mark-color
// --z-check-mark-color-disabled
// --z-check-mark-color-disabled-checked
// --z-border-radius
// --z-font-size
// --z-label-padding
// --z-border-hover
// --z-color-checked-hover
// --z-opacity-disabled
export default c([
  cB('checkbox', `
    font-size: var(--z-font-size);
    outline: none;
    cursor: pointer;
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    word-break: break-word;
    line-height: var(--z-size);
    --z-merged-color-table: var(--z-color-table);
  `, [
    cM('show-label', 'line-height: var(--z-label-line-height);'),
    c('&:hover', [
      cB('checkbox-box', [
        cE('border', 'border: var(--z-border-hover);')
      ])
    ]),
    c('&:focus-visible:not(:active)', [
      cB('checkbox-box', [
        cE('border', `
          border: var(--z-border-focus);
          box-shadow: var(--z-box-shadow-focus);
        `)
      ])
    ]),
    cM('inside-table', [
      cB('checkbox-box', `
        background-color: var(--z-merged-color-table);
      `)
    ]),
    cM('checked', [
      c('&:hover', [
        cB('checkbox-box', `
          background-color: var(--z-color-checked-hover);
        `, [
          cE('border', `
            border: 2px solid var(--z-color-checked-hover);
          `)
        ])
      ]),
      cB('checkbox-box', `
        background-color: var(--z-color-checked);
      `, [
        cB('checkbox-icon', [
          // if not set width to 100%, safari & old chrome won't display the icon
          c('.check-icon', `
            opacity: 1;
            transform: scale(1);
          `)
        ])
      ])
    ]),
    cM('indeterminate', [
      cB('checkbox-box', [
        cB('checkbox-icon', [
          c('.check-icon', `
            opacity: 0;
            transform: scale(.5);
          `),
          c('.line-icon', `
            opacity: 1;
            transform: scale(1);
          `)
        ])
      ])
    ]),
    cM('checked, indeterminate', [
      c('&:focus-visible:not(:active)', [
        cB('checkbox-box', [
          cE('border', `
            border: var(--z-border-checked);
            box-shadow: var(--z-box-shadow-focus);
          `)
        ])
      ]),
      cB('checkbox-box', `
        background-color: var(--z-color-checked);
        border-left: 0;
        border-top: 0;
      `, [
        cE('border', {
          border: 'var(--z-border-checked)'
        })
      ])
    ]),
    cM('disabled', `
      cursor: not-allowed;
      opacity: var(--z-opacity-disabled);
    `, [
      // to reset the css for hover, checked and intermediate state
      c('&:hover', [
        cB('checkbox-box', [
          cE('border', `
            border: var(--z-border);
          `)
        ])
      ]),
      cM('checked, indeterminate', [
        c('&:focus-visible:not(:active)', [
          cB('checkbox-box', [
            cE('border', `
              border: var(--z-border-checked);
              box-shadow: var(--z-box-shadow-focus);
            `)
          ])
        ]),
        cB('checkbox-box', `
          background-color: var(--z-color-checked);
        `, [
          cE('border', {
            border: 'var(--z-border-checked)'
          })
        ])
      ])
    ]),
    cB('checkbox-box-wrapper', `
      padding: var(--z-padding);
      position: relative;
      width: var(--z-size);
      flex-shrink: 0;
      flex-grow: 0;
      user-select: none;
      -webkit-user-select: none;
    `),
    cB('checkbox-box', `
      position: absolute;
      box-sizing: border-box;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: var(--z-size);
      width: var(--z-size);
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      border-radius: var(--z-border-radius);
      background-color: var(--z-color);
      transition: background-color 0.3s var(--z-bezier);
    `, [
      cE('border', `
        transition:
          border-color .3s var(--z-bezier),
          box-shadow .3s var(--z-bezier);
        border-radius: inherit;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border: var(--z-border);
      `),
      cB('checkbox-icon', `
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 1px;
        right: 1px;
        top: 1px;
        bottom: 1px;
      `, [
        c('.check-icon, .line-icon', `
          width: 100%;
          fill: var(--z-check-mark-color);
          opacity: 0;
          transform: scale(0.5);
          transform-origin: center;
          transition:
            fill 0.3s var(--z-bezier),
            transform 0.3s var(--z-bezier),
            opacity 0.3s var(--z-bezier),
            border-color 0.3s var(--z-bezier);
        `),
        iconSwitchTransition({
          left: '1px',
          top: '1px'
        })
      ])
    ]),
    cE('label', `
      display: flex;
      align-items: center;
      color: var(--z-text-color);
      transition: color .3s var(--z-bezier);
      user-select: none;
      -webkit-user-select: none;
      padding: var(--z-label-padding);
      font-weight: var(--z-label-font-weight);
    `, [
      c('&:empty', {
        display: 'none'
      })
    ])
  ]),
  // modal table header checkbox
  insideModal(
    cB('checkbox', `
      --z-merged-color-table: var(--z-color-table-modal);
    `)
  ),
  // popover table header checkbox
  insidePopover(
    cB('checkbox', `
      --z-merged-color-table: var(--z-color-table-popover);
    `)
  )
])
