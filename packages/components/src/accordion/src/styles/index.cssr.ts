import { c, cB, cE, cM } from '../../../_utils/cssr'
import { fadeInHeightExpandTransition } from '../../../_styles/transitions/fade-in-height-expand.cssr'

// vars:
// --z-font-size
// --z-title-font-size
// --z-bezier
// --z-text-color
// --z-content-color
// --z-content-color
// --z-divider-color
// --z-title-font-weight
// --z-arrow-color
// --z-item-margin
// --z-content-margin
// --z-boxed-padding
// --z-boxed-content-padding
// --z-padding
// --z-arrow-bg-color
// --z-content-padding
// --z-border-radius
// --z-boxed-bg-color
// --z-hover-color
// --z-active-color
// --z-active-title-font-weight
// --z-arrow-active-color
// --z-disabled-opacity

export default cB('accordion', 'width: 100%;', [
  cM('bordered', `
    border: 1px solid var(--z-divider-color);
    border-radius: var(--z-border-radius);
    overflow: hidden;
  `,
  [
    cB('accordion-item', [
      c('&:not(:first-child)', 'border-top: 1px solid var(--z-divider-color);'),
      cE('header', `
          padding: var(--z-boxed-padding);
          background-color: var(--z-boxed-bg-color);
      `, [
        c('&:hover', `
        background-color: var(--z-hover-color);
        `),
        cM('active', ` 
        background-color: var(--z-active-color);
        `),
        cE('header-main', `
          font-size: var(--z-title-font-size);
        `)
      ]),
      cE('content-wrapper', [
        cE('content-inner', `
          color: var(--z-content-color);
          padding: var(--z-boxed-content-padding);
        `)
      ])
    ])
  ]),
  cB('accordion-item', `
    font-size: var(--z-font-size);
    color: var(--z-content-color)
    transition:
      color .3s var(--z-bezier),
      border-color .3s var(--z-bezier);
  `, [
    cM('disabled', `
       cursor: not-allowed;
    `, [
      cE('header', `
        pointer-events: none;
        opacity: var(--z-disabled-opacity);
      `)
    ]),
    c('&:first-child', 'margin-top: 0;'),
    cM('start-arrow-placement', [
      cE('header', [
        cB('accordion-item-arrow', `
          margin-right: var(--z-content-margin);
        `)
      ])
    ]),
    cM('end-arrow-placement', [
      cE('header', [
        cB('accordion-item-arrow', `
          margin-left: var(--z-content-margin);
        `)
      ])
    ]),
    cE('content-wrapper', [
      cE('content-inner', `
        color: var(--z-content-color);
        padding: var(--z-content-padding);
      `),
      fadeInHeightExpandTransition({ duration: '0.15s' })
    ]),
    cM('active', [
      cE('header', [
        cM('active', [
          cB('accordion-item-arrow', 'transform: rotate(90deg);')
        ])
      ])
    ]),
    cE('header', `
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      transition: color .3s var(--z-bezier);
      position: relative;
      padding: var(--z-padding);
      background-color: transparent;
      cursor: pointer;
    `, [
      c('&:hover', `
        background-color: var(--z-hover-color);
      `),
      cE('header-main', `
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        transition: color .3s var(--z-bezier);
        flex: 1;
        color: var(--z-text-color)
      `),
      cE('header-end', `
        display: flex;
        align-items: center;
        transition: color .3s var(--z-bezier);
        color: var(--z-text-color);
      `, [
        c('&:not(:empty)', ` 
          margin: var(--z-item-margin);
        `)
      ]),
      cB('accordion-item-arrow', `
        display: flex;
        transition:
          transform .15s var(--z-bezier),
          color .3s var(--z-bezier);
          font-size: 24px;
          color: var(--z-arrow-color);
          border-radius: var(--z-border-radius);
      `, [
        c('&:hover', `
          background-color: var(--z-arrow-bg-color);
        `),
        c('&:active', `
          background-color: var(--z-arrow-active-color);
        `)
      ])
    ])
  ])
])
