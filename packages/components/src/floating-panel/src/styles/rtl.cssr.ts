import { cB, cM, cE, c } from '../../../_utils/cssr'

export default cB('floatingPanel', [
  cM('rtl', `
    direction: rtl;
  `, [
    cB('floatingPanel-main', `
      margin-left: unset;
      margin-right: 8px;
    `, [
      cE('header', `
        margin: var(--z-icon-margin);
        margin-right: 0;
      `)
    ]),
    cM('closable', [
      cB('floatingPanel-main', [
        c('> *:first-child', `
          padding-left: 20px;
          padding-right: unset;
        `)
      ]),
      cE('close', `
        right: unset;
        left: 0;
      `)
    ])
  ])
])
