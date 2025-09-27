import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-item-color
// --z-item-color-active
export default cB('rating', {
  display: 'inline-flex',
  flexWrap: 'nowrap'
}, [
  c('&:hover', [
    cE('item', `
      transition:
        transform .1s var(--z-bezier),
        color .3s var(--z-bezier);
    `)
  ]),
  cE('item', `
    position: relative;
    display: flex;
    transition:
      transform .1s var(--z-bezier),
      color .3s var(--z-bezier);
    transform: scale(1);
    font-size: var(--z-item-size);
    color: var(--z-item-color);
  `, [
    c('&:not(:first-child)', `
      margin-left: 6px;
    `),
    cM('active', `
      color: var(--z-item-color-active);
    `)
  ]),
  cNotM('readonly', `
    cursor: pointer;
  `, [
    cE('item', [
      c('&:hover', `
        transform: scale(1.05);
      `),
      c('&:active', `
        transform: scale(0.96);
      `)
    ])
  ]),
  cE('half', `
    display: flex;
    transition: inherit;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 50%;
    overflow: hidden;
    color: rgba(255, 255, 255, 0);
  `, [
    cM('active', `
      color: var(--z-item-color-active);
    `)
  ])
])
