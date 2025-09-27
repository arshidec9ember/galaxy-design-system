import { c, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  cB('radio', [
    cM('rtl', `
      direction: rtl;
    `)
  ]),
  cB('radio-group', [
    cM('rtl', `
      direction: rtl;
    `, [
      cB('radio-button', [
        c('&:first-child', `
          border-radius: 0 var(--z-button-border-radius) var(--z-button-border-radius) 0;
          border-right: 1px solid var(--z-button-border-color);
          border-left: 0;
        `, [
          cE('state-border', `
            border-radius: 0 var(--z-button-border-radius) var(--z-button-border-radius) 0;
          `)
        ]),
        c('&:last-child', `
          border-radius: var(--z-button-border-radius) 0 0 var(--z-button-border-radius);
          border-left: 1px solid var(--z-button-border-color);
          border-right: 0;
        `, [
          cE('state-border', `
            border-radius: var(--z-button-border-radius) 0 0 var(--z-button-border-radius);
          `)
        ]),
        cM('checked', `
          border-color: var(--z-button-border-color-active);
        `)
      ])
    ])
  ])
])
