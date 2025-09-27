import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --z-font-size
// --z-line-height
// --z-border-radius
// --z-color
// --z-text-color
// --z-bezier
// --z-details-view-node-min-height
// --z-details-view-node-padding-y
// --z-details-view-node-padding-y
// --z-details-view-label-color
// --z-details-view-value-color
// --z-details-view-expanded-background-color

export default c([
  cB('details-view', `
    font-size: var(--z-font-size);
    line-height: var(--z-line-height);
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--z-color);
    color: var(--z-text-color);
    word-break: break-word;
    transition: 
      color .3s var(--z-bezier),
      background-color .3s var(--z-bezier),
      box-shadow .3s var(--z-bezier),
      border-color .3s var(--z-bezier);
  `, [
    c('& .z-accordion .z-accordion-item .z-accordion-item__content-wrapper .z-accordion-item__content-inner', `
        margin-left: 16px;
        padding-top: 0;
        padding-bottom: 0;
    `),
    c('& .z-accordion-item-arrow', `
        margin-left: -8px;
    `),
    // cE('details-node', `
    //   border-bottom: 1px solid var(--z-divider-color);
    // `),
    c('& .z-divider:not(.z-divider--vertical)', `
    margin-top: 0px;
    margin-bottom: 0px;
    border-color: var(--z-divider-color)
    `, [
      c('.z-divider__line', 'background-color: var(--z-divider-color)')
    ]),

    cE('details-node-label-cell', [
      cM('horizontal', `
          padding: 0.5rem 0.5rem 0.5rem 0; 
      `),
      cM('vertical', 'padding: 0.5rem 0.5rem 0.25rem; ')]
    ),
    cE('details-node-value-cell', [
      cM('horizontal', 'padding: 0.5rem; '),
      cM('vertical', 'padding: 0.25rem 0.5rem 0.5rem; ')]
    ),
    cE('details-node-wrapper', `
        margin-left: 0.5rem;
    `, [
      c('&:last-child', '', [
        c('> .z-divider', `
             display: none;
        `)
      ])
    ]),
    cE('container', `
        padding: 0.25rem;
    `),
    cE('expanded-option', `
        position: sticky;
        bottom: 0;
        display: flex;
        height: 32px;
        padding: 4px 8px;
        background: var(--z-details-view-expanded-background-color);
        cursor: pointer;
    `),
    cE('expanded-option-hide', `
        display: flex;
        align-items: center;
    `),
    cE('expanded-option-show', `
        display: flex;
        align-items: center;
    `),
    cE('details-node:last-child', `
    border-bottom: none;
  `),
    cB('details-view-section', `
      display: block;
    `, [
      cM('level-1', `
      `)
    ]),
    cB('details-view-content', `
        align-items: flex-start;
        display: flex;
        color: var(--z-details-view-label-color);
    `, [
      c('& .z-icon', `
             margin-left: 4px;
        `),
      cE('key', `
        display: flex;
        align-items: center;
        max-width: 100%;
        color: var(--z-details-view-label-color);
      `, [
        cB('base-icon', `
          margin-left: 4px;
        `)
      ]),
      cE('value', `
        display: flex;
        align-items: center;
        max-width: 100%;
        color: var(--z-details-view-value-color);
      `),
      cE('array', `
        display: inline;
        flex: 6;
        align-items: center;
        color: var(--z-details-view-value-color);
      `)
    ])
  ])
])
