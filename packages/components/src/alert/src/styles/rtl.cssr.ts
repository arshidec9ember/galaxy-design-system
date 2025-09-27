import { cB, cE, cM } from '../../../_utils/cssr'

export default cB('alert', [
  cM('rtl', `
    direction: rtl;
  `, [
    cE('icon', `
      left: unset;
      right: 0;
      margin: var(--z-icon-margin-rtl);
    `),
    cM('show-icon', [
      cB('alert-body', `
        padding-left: var(--z-padding);
        padding-right: calc(var(--z-icon-margin-left) + var(--z-icon-size) + var(--z-icon-margin-right));
      `)
    ]),
    cE('close', `
      position: absolute;
      right: unset;
      left: 0;
      margin: var(--z-close-margin-rtl);
    `)
  ])
])
