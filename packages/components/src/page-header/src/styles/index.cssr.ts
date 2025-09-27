import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --z-title-font-size
// --z-title-text-color
// --z-font-size
// --z-description-text-color
// --z-back-color
// --z-back-color-hover
// --z-back-color-pressed
// --z-back-size
// --z-text-color
// --z-title-font-weight
// --z-bezier
export default c([
  cB('page-header-header', `
    margin-bottom: 4px;
    display: inline-flex;
    color: var(--z-text-color);
  `, [
    cE('back', `
      display: flex;
      margin-right: 16px;
      align-items: center;
      font-size: var(--z-back-size);
      cursor: pointer;
      color: var(--z-back-color);
      transition: color .3s var(--z-bezier);
    `, [
      c('&:hover', 'color: var(--z-back-color-hover);'),
      c('&:active', 'color: var(--z-back-color-pressed);')
    ]),
    cE('head', `
      display: flex;
    `)
  ]),
  cB('page-header-wrapper', `
    background-color: var(--z-page-header-wrapper-background-color);
    padding: var(--z-page-header-wrapper-padding);
    border-radius: var(--z-page-header-wrapper-border-radius);
  `, [
    cM('cover', `
      position: relative;
      overflow: hidden;
    `),
    cB('page-header-cover', `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: row-reverse;
    `, [
      c('img', `
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        position: absolute;
        height: 100%;
        object-fit: cover;
        margin: 0px;
        padding: 0px;
      `)
    ]),
    cB('page-header-header', `
      z-index: 1;
      position: inherit;
    `),
    cB('page-header', `
      z-index: 1;
      position: inherit;
    `),
    cB('page-header-content', `
      z-index: 1;
      position: inherit;
    `),
    cB('page-header-footer', `
      z-index: 1;
      position: inherit;
    `)
  ]),
  cB('page-header-actions-wrapper', `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    `),
  cB('page-header', `
    display: flex;
    flex-direction: column;
    flex: 1;
    line-height: 1.5;
    font-size: var(--z-font-size);
  `, [
    cE('main', `
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
    `),

    cE('avatar', `
      display: flex;
      margin-right: 12px
    `),
    cE('title-wrapper', `
      display: inline-block;
    `),
    cE('title', `
      margin-right: 16px;
      transition: color .3s var(--z-bezier);
      font-size: var(--z-title-font-size);
      font-weight: var(--z-title-font-weight);
      color: var(--z-title-text-color);
    `),
    cE('description', `
      font-size: var(--z-description-font-size);
      transition: color .3s var(--z-bezier);
      color: var(--z-description-text-color);
    `)
  ]),
  cB('page-header-content', `
    color: var(--z-description-text-color);
    font-size: var(--z-font-size);
  `, [
    c('&:not(:first-child)', 'margin-top: 16px;')
  ]),
  cB('page-header-footer', `
    color: var(--z-description-text-color);
    font-size: var(--z-font-size);
  `, [
    c('&:not(:first-child)', 'margin-top: 16px;')
  ])
])
