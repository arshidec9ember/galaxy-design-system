import { cB, cE } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-label-font-size
// --z-label-font-weight
// --z-label-text-color
// --z-value-font-weight
// --z-value-font-size
// --z-value-prefix-text-color
// --z-value-suffix-text-color
// --z-value-text-color
export default cB('statistic', [
  cE('label', `
    font-weight: var(--z-label-font-weight);
    transition: .3s color var(--z-bezier);
    font-size: var(--z-label-font-size);
    color: var(--z-label-text-color);
  `),
  cB('statistic-value', `
    margin-top: 4px;
    font-weight: var(--z-value-font-weight);
  `, [
    cE('prefix', `
      margin: 0 4px 0 0;
      font-size: var(--z-value-font-size);
      transition: .3s color var(--z-bezier);
      color: var(--z-value-prefix-text-color);
    `, [
      cB('icon', {
        verticalAlign: '-0.125em'
      })
    ]),
    cE('content', `
      font-size: var(--z-value-font-size);
      transition: .3s color var(--z-bezier);
      color: var(--z-value-text-color);
    `),
    cE('suffix', `
      margin: 0 0 0 4px;
      font-size: var(--z-value-font-size);
      transition: .3s color var(--z-bezier);
      color: var(--z-value-suffix-text-color);
    `, [
      cB('icon', {
        verticalAlign: '-0.125em'
      })
    ])
  ])
])
