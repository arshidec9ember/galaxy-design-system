import { cB, cE, c } from '../../../_utils/cssr'

// --z-bezier
// --z-font-size
// --z-icon-size
// --z-variant-size
// --z-line-height
// --z-text-color
// --z-description-text-color
// --z-title-font-size
// --z-title-font-weight
// --z-title-text-color
export default c([
  cB('result', `
    color: var(--z-text-color);
    line-height: var(--z-line-height);
    font-size: var(--z-font-size);
    text-align: var(--z-text-align);
    transition:
      color .3s var(--z-bezier);
  `, [
    cB('result-icon-image', ''),
    cB('result-icon', `
      display: flex;
      justify-content: var(--z-text-align);
      transition: color .3s var(--z-bezier);
    `, [
      cE('status-image', `
        font-size: var(--z-variant-size);
        width: 1em;
        height: 1em;
      `),
      cB('base-icon', `
        color: var(--z-icon-color);
        font-size: var(--z-variant-size);
      `)
    ]),
    cE('actions', `
      margin-top: 24px;
      text-align: var(--z-text-align);
    `),
    cE('title', `
      margin-top: 8px;
      margin-bottom: 0;
      font-weight: var(--z-title-font-weight);
      transition: color .3s var(--z-bezier);
      text-align: var(--z-text-align);
      color: var(--z-title-text-color);
      font-size: var(--z-title-font-size);
    `),
    cE('description', `
      margin-top: 4px;
      margin-bottom: 0;
      text-align: var(--z-text-align);
      font-size: var(--z-font-size);
      color: var(--z-description-text-color);
      transition: color .3s var(--z-bezier);
    `)
  ]),
  // Size-specific styles
  cB('result-small', [
    c('.z-result__description', `
      margin-top: 0.5rem;
    `),

    c('.z-result__title', `
      margin-top: 0.5rem;
    `)
  ]),
  cB('result-medium', [
    c('.z-result__description', `
      margin-top: 0.75rem;
    `),
    c('.z-result__title', `
      margin-top: 1.5rem;
    `)
  ])
])
