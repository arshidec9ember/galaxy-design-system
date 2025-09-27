import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --z-font-size
// --z-bezier
// --z-item-text-color
// --z-item-text-color-hover
// --z-item-text-color-pressed
// --z-item-text-color-active
// --z-separator-color
// --z-font-weight-active
// --z-item-border-radius
// --z-item-color-hover
// --z-item-color-active
// --z-item-line-height
// --z-separator-padding
// --z-padding
// --z-link-decor
export default cB('breadcrumb', `
  white-space: nowrap;
  cursor: default;
  line-height: var(--z-item-line-height);
`, [
  c('ul', `
    list-style: none;
    display: inline-flex;
    padding: 0;
    margin: 0;
  `),
  c('a', `
    color: inherit;
    text-decoration: inherit;
  `),
  cB('breadcrumb-item', `
    font-size: var(--z-font-size);
    transition: color .3s var(--z-bezier);
    display: inline-flex;
    align-items: center;
  `, [
    cB('icon', `
      font-size: var(--z-font-size);
      transition: color .3s var(--z-bezier);
      color: var(--z-item-text-color);
    `),
    c('&:not(:last-child)', [
      cM('clickable', [
        cE('link', `
          cursor: pointer;
        `, [
          c('&:hover', `
            background-color: var(--z-item-color-hover);
            text-decoration: var(--z-link-decor);
          `),
          c('&:active', `
            background-color: var(--z-item-color-pressed);  
            text-decoration: var(--z-link-decor);
          `)
        ])
      ])
    ]),
    cE('link', `
      padding: var(--z-padding);
      border-radius: var(--z-item-border-radius);
      transition:
        background-color .3s var(--z-bezier),
        color .3s var(--z-bezier);
      color: var(--z-item-text-color);
      display: inline-flex;
      position: relative;
    `, [
      cE('start', `
        margin-inline-end: 4px;
        display: inline-flex;
        align-items: center;
      `),
      cE('end', `
        margin-inline-start: 4px;
        display: inline-flex;
        align-items: center;
      `),
      c('&:hover', `
        color: var(--z-item-text-color-hover);
      `, [
        cB('icon', `
          color: var(--z-item-text-color-hover);
        `)
      ]),
      c('&:active', `
        color: var(--z-item-text-color-pressed);
      `, [
        cB('icon', `
          color: var(--z-item-text-color-pressed);
        `)
      ])

    ]),
    cE('separator', `
      margin: var(--z-separator-padding);
      color: var(--z-separator-color);
      transition: color .3s var(--z-bezier);
      user-select: none;
      display: inline-flex;
      -webkit-user-select: none;
    `, [
      cB('icon', `
        color: var(--z-separator-color);
      `)
    ]),
    c('&:last-child', [
      cE('link', `
        cursor: unset;
        color: var(--z-item-text-color-active);
      `, [
        cB('icon', `
          color: var(--z-item-text-color-active);
        `)
      ]),
      cE('separator', `
        display: none;
      `)
    ])
  ])
])
