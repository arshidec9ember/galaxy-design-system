import { c, cE, cB, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --z-link-color
// --z-link-font-size
// --z-link-text-color
// --z-link-text-color-hover
// --z-link-text-color-active
// --z-link-text-color-pressed
// --z-bezier
// --z-rail-color
// --z-rail-color-active
// --z-rail-width
// --z-rail-bar-width
// --z-link-padding
// --z-link-border-radius
export default cB('anchor', `
  position: relative;
`, [
  cNotM('block', `
    padding-left: var(--z-rail-width);
  `, [
    cB('anchor-link-background', `
      max-width: 0;
      border-top-right-radius: var(--z-link-border-radius);
      border-bottom-right-radius: var(--z-link-border-radius);
    `),
    cNotM('show-rail', [
      c('>', [
        cB('anchor-link', 'padding-left: 0;')
      ])
    ])
  ]),
  cM('block', [
    cB('anchor-link', `
      margin-bottom: 4px;
      padding: 2px 8px;
      transition: background-color .3s var(--z-bezier);
      background-color: transparent;
      border-radius: var(--z-link-border-radius);
    `, [
      cM('active', `
        background-color: var(--z-link-color);
      `)
    ])
  ]),
  cB('anchor-link-background', `
    position: absolute;
    left: calc(var(--z-rail-width) / 2);
    background-color: var(--z-link-color);
    width: 100%;
    transition:
      top .15s var(--z-bezier),
      max-width .15s var(--z-bezier),
      background-color .3s var(--z-bezier);
  `),
  cB('anchor-rail', `
    position: absolute;
    left: 1px;
    top: 0;
    bottom: 0;
    width: var(--z-rail-width);
    transition: background-color .3s var(--z-bezier);
    background-color: var(--z-rail-color);
  `, [
    cE('bar', `
      position: absolute;
      left: 0;
      width: var(--z-rail-bar-width);
      height: var(--z-link-cell-height); /* Match cell height for proper design alignment */
    `, [
      cM('active', `
        background-color: var(--z-rail-color-active);
      `)
    ])
  ]),
  cB('anchor-link', `
    padding: var(--z-link-padding);
    position: relative;
    display: flex;
    flex-direction: column;
  `, [
    cM('header', [
      cE('title', `
        cursor: default; /* Non-interactive header per Figma design */
        pointer-events: none; /* Prevent interaction for "ON THIS PAGE" header */
      `)
    ]),
    cM('active', `
      background-color: var(--z-link-color);
    `, [
      c('>', [
        cE('title', `
          color: var(--z-link-text-color-active);
        `)
      ])
    ]),
    cE('title', `
      outline: none;
      max-width: 100%;
      text-decoration: none;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
      display: inline-block;
      padding: var(--z-link-title-padding);
      transition: color .3s var(--z-bezier);
      color: var(--z-link-text-color);
    `, [
      c('&:hover', `
        color: var(--z-link-text-color-hover);
      `),
      c('&:focus-visible', `
        border: 2px solid var(--z-link-text-color-hover);
      `)
      // Removed pressed state per Figma design
    ])
  ])
])
