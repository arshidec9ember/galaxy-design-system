import { c, cB, cM, cNotM } from '../../../_utils/cssr'

// --z-gap
export default cB('avatar-group', [
  cM('rtl', `
    direction: rtl;
  `, [
    cNotM('vertical', `
      flex-direction: row;
    `, [
      cB('avatar', [
        c('&:not(:first-child)', `
          margin-right: var(--z-gap);
          margin-left: 0;
        `)
      ])
    ])
  ])
])
