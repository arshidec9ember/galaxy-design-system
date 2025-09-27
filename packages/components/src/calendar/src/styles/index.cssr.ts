import { cB, cE, cM, c, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-border-color
// --z-border-color-modal
// --z-border-color-popover
// --z-border-radius
// --z-text-color
// --z-title-font-weight
// --z-title-font-size
// --z-title-text-color
// --z-day-text-color
// --z-font-size
// --z-line-height
// --z-date-color-current
// --z-cell-color
// --z-cell-color-hover
// --z-cell-color-hover-modal
// --z-cell-color-hover-popover
// --z-bar-color
export default c([
  cB('calendar', `
    line-height: var(--z-line-height);
    font-size: var(--z-font-size);
    color: var(--z-text-color);
    height: 720px;
    display: flex;
    flex-direction: column;
  `, [
    cB('calendar-prev-btn', `
      cursor: pointer;
    `),
    cB('calendar-next-btn', `
      cursor: pointer;
    `),
    cB('calendar-header', `
      display: flex;
      align-items: center;
      line-height: 1;
      font-size: var(--z-title-font-size);
      padding: 0 0 18px 0;
      justify-content: space-between;
    `, [
      cE('title', `
        color: var(--z-title-text-color);
        font-weight: var(--z-title-font-weight);
        transition: color .3s var(--z-bezier);
      `),
      cE('extra', `
        display: flex;
        align-items: center;
      `)
    ]),
    cB('calendar-dates', `
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      grid-auto-rows: 1fr;
      border-radius: var(--z-border-radius);
      flex: 1;
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: var(--z-border-color);
      transition: border-color .3s var(--z-bezier);
    `),
    cB('calendar-cell', `
      box-sizing: border-box;
      padding: 10px;
      border-right: 1px solid;
      border-bottom: 1px solid;
      border-color: var(--z-border-color);
      cursor: pointer;
      position: relative;
      transition:
        color .3s var(--z-bezier),
        border-color .3s var(--z-bezier),
        background-color .3s var(--z-bezier);
    `, [
      c('&:nth-child(7)', `
        border-top-right-radius: var(--z-border-radius);
      `),
      c('&:nth-last-child(7)', `
        border-bottom-left-radius: var(--z-border-radius);
      `),
      c('&:last-child', `
        border-bottom-right-radius: var(--z-border-radius);
      `),
      c('&:hover', `
        background-color: var(--z-cell-color-hover);
      `),
      cE('bar', `
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        height: 3px;
        background-color: #0000;
        transition: background-color .3s var(--z-bezier);
      `),
      cM('selected', [
        cE('bar', `
          background-color: var(--z-bar-color);
        `)
      ]),
      cB('calendar-date', `
        transition:
          color .3s var(--z-bezier),
          border-color .3s var(--z-bezier),
          background-color .3s var(--z-bezier);
        color: var(--z-text-color);
      `, [
        cE('date', `
          color: var(--z-text-color);
        `)
      ]),
      cM('disabled, other-month', `
        color: var(--z-day-text-color);
      `, [
        cB('calendar-date', [
          cE('date', `
            color: var(--z-day-text-color);
          `)
        ])
      ]),
      cM('disabled', `
        cursor: not-allowed;
      `),
      cM('current', [
        cB('calendar-date', [
          cE('date', `
            color: var(--z-date-text-color-current);
            background-color: var(--z-date-color-current);
          `)
        ])
      ]),
      cB('calendar-date', `
        position: relative;
        line-height: 1;
        display: flex;
        align-items: center;
        height: 1em;
        justify-content: space-between;
        padding-bottom: .75em;
      `, [
        cE('date', `
          border-radius: var(--gds-border-radius-circle);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -0.4em;
          width: 1.8em;
          height: 1.8em;
          transition:
            color .3s var(--z-bezier),
            background-color .3s var(--z-bezier);
        `),
        cE('day', `
          color: var(--z-day-text-color);
          transition: color .3s var(--z-bezier);
        `)
      ])
    ])
  ]),
  insideModal(cB('calendar', [
    cB('calendar-dates', `
      border-color: var(--z-border-color-modal);
    `),
    cB('calendar-cell', `
      border-color: var(--z-border-color-modal);
    `, [
      c('&:hover', `
        background-color: var(--z-cell-color-hover-modal);
      `)
    ])
  ])),
  insidePopover(cB('calendar', [
    cB('calendar-dates', `
      border-color: var(--z-border-color-popover);
    `),
    cB('calendar-cell', `
      border-color: var(--z-border-color-popover);
    `, [
      c('&:hover', `
        background-color: var(--z-cell-color-hover-popover);
      `)
    ])
  ]))
])
