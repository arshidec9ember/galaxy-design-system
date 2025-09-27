
import { cB, cE, c } from '../../../_utils/cssr'

// var(--z-font-size)
// var(--z-text-color)
// var(--z-label-text-color)
// var(--z-value-text-color)

// var(--z-active-value-color)
// var(--z-reset-color)
// var(--z-tag-hover-color)
// var(--z-tag-active-color)
export default cB('filter', `
    display: flex;
    gap: 1rem;
   `, [
  cB('action-reset', `
      position: relative;
  `, [
    cE('button', `
        font-size: var(--z-font-size);
        color: var(--z-text-color);
    `, [
      c('&:hover', `
          color: var(--z-reset-text-color-hover);
        `),
      c('&:active', `
          color: var(--z-reset-text-color-active);
        `)
    ])
  ]),
  cB('input-group', `
      margin-bottom: 10px;
  `),
  cE('tag-label', `
      display: flex;
      align-items: center;
      color: var(--z-label-text-color);
  `),
  cE('tag-value', `
      display: flex;
      align-items: center;
      margin-left: 3px;
      color: var(--z-value-text-color);
  `),
  c('&.z-remaining-filter-wrapper', `
    max-height: 250px;
  `),
  c('.z-tag.z-tag--checkable:not(.z-tag--disabled)', [
    c('&:hover', `
        background: var(--z-tag-hover-color);
    `),
    c('&:active', `
        background: var(--z-tag-active-color);
        border-color:red
    `)
  ])
])
