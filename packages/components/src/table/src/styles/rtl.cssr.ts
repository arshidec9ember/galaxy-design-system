import { c, cB, cM } from '../../../_utils/cssr'

export default c([
  cB('table', [
    cM('rtl', `
      direction: rtl;
      text-align: right;
    `, [
      c('th, td', `
        border-right: 0px solid var(--z-merged-border-color);
        border-left: 1px solid var(--z-merged-border-color);
      `, [
        c('&:last-child', `
          border-left: none;
          border-right: inherit;
        `)
      ]),
      cM('hide-column-separator', [
        c('th, td', `
          border-left: 0px solid var(--z-merged-border-color);
        `)
      ])
    ])
  ])
])
