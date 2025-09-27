import { cB, cM } from '../../../_utils/cssr'

export default cB('facade', [
  cM('rtl', `
    direction: rtl;
    text-align: right;
  `, [
    cB('facade-avatar', `
      margin-left: 12px;
      margin-right: 0;
    `)
  ])
])
