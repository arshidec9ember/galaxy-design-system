import { cB, cE, cM } from '../../../_utils/cssr'

export default cB('accordion', [
  cM('rtl', `
    direction: rtl;
  `, [
    cB('accordion-item', [
      cB('accordion-item', {
        marginRight: '32px',
        marginLeft: 0
      }),
      cM('left-arrow-placement', [
        cE('header', [
          cB('accordion-item-arrow', {
            marginRight: 0,
            marginLeft: '4px'
          })
        ])
      ]),
      cM('right-arrow-placement', [
        cE('header', [
          cB('accordion-item-arrow', {
            marginLeft: 0,
            marginRight: '4px'
          })
        ])
      ]),
      cM('active', [
        cE('header', [
          cM('active', [
            cB('accordion-item-arrow', {
              transform: 'rotate(-90deg)'
            })
          ])
        ])
      ])
    ])
  ])
])
