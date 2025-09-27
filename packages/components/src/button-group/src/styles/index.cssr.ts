import { type CNode } from './../../../_utils/css-render'
import type { Type } from '../../../button/src/interface'
import { c, cB, cM, cNotM } from '../../../_utils/cssr/index'

export const zero = '0!important'
export const n1 = '-1px!important'

function createLeftBorderStyle (type: Type): CNode {
  return cM(type + '-type', [
    c('& +', [
      cB('button', {}, [
        cM(type + '-type', {
          borderLeftWidth: zero
        })
      ])
    ])
  ])
}

function createTopBorderStyle (type: Type): CNode {
  return cM(type + '-type', [
    c('& +', [
      cB('button', [
        cM(type + '-type', {
          borderTopWidth: zero
        })
      ])
    ])
  ])
}

export default cB('button-group', `
  flex-wrap: nowrap;
  display: inline-flex;
  position: relative;
`, [
  cNotM('vertical', {
    flexDirection: 'row'
  }, [
    cNotM('rtl', [
      cB('button', [
        c('&:first-child:not(:last-child)', `
          margin-right: ${zero};
          border-top-right-radius: ${zero};
          border-bottom-right-radius: ${zero};
        `),
        c('&:last-child:not(:first-child)', `
          margin-left: ${zero};
          border-top-left-radius: ${zero};
          border-bottom-left-radius: ${zero};
        `),
        c('&:not(:first-child):not(:last-child)', `
          margin-left: ${zero};
          margin-right: ${zero};
          border-radius: ${zero};
        `),
        createLeftBorderStyle('neutral'),
        cM('ghost', [
          createLeftBorderStyle('primary'),
          createLeftBorderStyle('info'),
          createLeftBorderStyle('success'),
          createLeftBorderStyle('warning'),
          createLeftBorderStyle('error')
        ])
      ])
    ])
  ]),
  cM('vertical', {
    flexDirection: 'column'
  }, [
    cB('button', [
      c('&:first-child:not(:last-child)', `
        margin-bottom: ${zero};
        margin-left: ${zero};
        margin-right: ${zero};
        border-bottom-left-radius: ${zero};
        border-bottom-right-radius: ${zero};
      `),
      c('&:last-child:not(:first-child)', `
        margin-top: ${zero};
        margin-left: ${zero};
        margin-right: ${zero};
        border-top-left-radius: ${zero};
        border-top-right-radius: ${zero};
      `),
      c('&:not(:first-child):not(:last-child)', `
        margin: ${zero};
        border-radius: ${zero};
      `),
      createTopBorderStyle('neutral'),
      cM('ghost', [
        createTopBorderStyle('primary'),
        createTopBorderStyle('info'),
        createTopBorderStyle('success'),
        createTopBorderStyle('warning'),
        createTopBorderStyle('error')
      ])
    ])
  ])
])
