import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-font-size
// --z-text-color
// --z-title-font-weight
// --z-title-text-color
export default cB('facade', `
  display: flex;
  transition: color .3s var(--z-bezier);
  font-size: var(--z-font-size);
  color: var(--z-text-color);
`, [
  cB('facade-avatar', `
    margin-right: 12px;
    margin-top: 2px;
  `),
  cB('facade-avatar-header-wrapper', `
    display: flex;
    flex-wrap: nowrap;
  `, [
    cB('facade-header-wrapper', `
      flex: 1;
    `)
  ]),
  cB('facade-main', `
    flex-grow: 1;
  `, [
    cB('facade-header', `
      display: flex;
      margin-bottom: 4px;
      justify-content: space-between;
      align-items: center;
    `, [
      cE('title', `
        font-size: 16px;
        font-weight: var(--z-title-font-weight);
        transition: color .3s var(--z-bezier);
        color: var(--z-title-text-color);
        .z-list-item--selected & {
          color: var(--gds-color-text-primary);
        }
      `)
    ]),
    cE('description', `
        color: var(--z-text-color);
      `, [
      c('sub', `
          font-size: unset;
        `),
      c('&:not(:last-child)', `
          margin-bottom: 4px;
        `)
    ]),
    cE('content', [
      c('&:not(:first-child)', `
        margin-top: 12px;
      `)
    ]),
    cE('footer', [
      c('&:not(:first-child)', `
        margin-top: 12px;
      `)
    ]),
    cE('action', [
      c('&:not(:first-child)', `
        margin-top: 12px;
      `)
    ])
  ])
])
