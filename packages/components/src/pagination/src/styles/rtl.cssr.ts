import { c, cB, cM } from '../../../_utils/cssr'

export default cB('pagination', [
  cM('rtl', `
    direction: rtl;
  `, [
    c('> *:not(:first-child)', `
      margin: var(--z-item-margin-rtl);
    `),
    cB('pagination-quick-jumper', [
      cB('input', `
        margin: var(--z-input-margin-rtl);
      `)
    ])
  ])
])
