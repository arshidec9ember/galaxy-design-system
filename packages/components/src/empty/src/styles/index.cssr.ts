import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --z-font-size
// --z-icon-size
// --z-icon-color
// --z-bezier
// --z-text-color
// --z-actions-text-color
export default c([
  cB('empty', `
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: var(--z-font-size);
  `, [
    cE('icon', `
      width: var(--z-icon-size);
      height: var(--z-icon-size);
      font-size: var(--z-icon-size);
      line-height: var(--z-icon-size);
      color: var(--z-icon-color);
      transition: color .3s var(--z-bezier);
      display: flex;
      align-items: center;
      justify-content: center;
    `, [
      c('svg', `
        width: 100%;
        height: 100%;
        max-width: var(--z-icon-size);
        max-height: var(--z-icon-size);
      `),
      c('+', [
        cE('description', `
          margin-top: 8px;
        `)
      ])
    ]),
    cE('description', `
      transition: color .3s var(--z-bezier);
      color: var(--z-empty-description-text-color);
      font-size: var(--z-empty-description-font-size);
      margin:12px 0 0;
    `),
    cE('title', `
      transition: color .3s var(--z-bezier);
      color: var(--z-empty-title-text-color);
      margin: 24px auto 0px;
      font-size: var(--z-empty-title-font-size);
    `),
    cE('actions', `
      margin-top: 24px;
      text-align: center;
      transition: color .3s var(--z-bezier);
      color: var(--z-actions-text-color);
    `)]
  ),
  cB('empty-small', [
    cE('description', `
      margin: 8px 0 0;
  `),
    cE('title', `
    margin: 8px auto 0px;
  `),
    cE('actions', `
    margin-top: 16px;
  `)
  ])
])
