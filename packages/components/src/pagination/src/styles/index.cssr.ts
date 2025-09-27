import { cB, c, cM, cE, cNotM } from '../../../_utils/cssr'

const hoverStyleProps = `
  background: var(--z-item-color-hover);
  color: var(--z-item-text-color-hover);
`

const hoverStyleChildren = [
  cM('button', `
    background: var(--z-button-color-hover);
  `)
]

// vars:
// --z-item-font-size
// --z-select-width
// --z-input-width
// --z-input-margin
// --z-item-size
// --z-item-text-color
// --z-item-text-color-disabled
// --z-item-text-color-hover
// --z-item-text-color-active
// --z-item-color
// --z-item-color-hover
// --z-item-color-disabled
// --z-item-color-active
// --z-item-color-active-hover
// --z-item-border
// --z-item-border-hover
// --z-item-border-disabled
// --z-item-border-active
// --z-item-padding
// --z-item-font-size
// --z-item-border-radius
// --z-bezier
// --z-jumper-font-size
// --z-jumper-text-color
// --z-jumper-text-color-disabled
// --z-item-margin
// --z-button-icon-size
// --z-button-icon-color
// --z-button-icon-color-hover
// --z-button-icon-color-pressed
// --z-prefix-margin
// --z-suffix-margin
// --z-button-color
// --z-button-color-hover
// --z-button-color-pressed
// --z-shadow-box-shadow
// --z-shadow-background-color
// --z-shadow-border-radius
// --z-shadow-padding
export default cB('pagination', `
  display: flex;
  vertical-align: middle;
  font-size: var(--z-item-font-size);
  flex-wrap: nowrap;
`, [
  c('.z-base-selection:not(.z-base-selection--active) .z-base-selection-overlay__wrapper', `
    text-align: left;
    top: -2px;
    position: relative;
  `),
  cM('shadow', `
    box-shadow: var(--z-shadow-box-shadow);
    padding: var(--z-shadow-padding);
  `),
  cB('pagination-prefix', `
    display: flex;
    align-items: center;
    margin: var(--z-prefix-margin);
  `),
  cB('pagination-suffix', `
    display: flex;
    align-items: center;
    margin: var(--z-suffix-margin);
  `),
  c('> *:not(:first-child)', `
    margin: var(--z-item-margin);
  `),
  cB('select', `
    width: var(--z-select-width);
  `),
  c('&.transition-disabled', [
    cB('pagination-item', 'transition: none!important;')
  ]),
  cB('pagination-size-picker', `
    margin-right: auto;
    width: var(--z-select-width);
    display: flex;
    align-items: center;
  `, [
    cE('select', `
        width: max-content;
    `),
    cE('button', `
        font-size: var(--z-item-font-size);
    `),
    cE('button-content', `
        display: flex;
        align-items: center;
    `),
    cE('button-suffix', `
        font-size: var(--z-arrow-size);
        color: var(--z-arrow-color);
        transition: color .3s var(--z-bezier);
    `)

  ]),
  cB('pagination-right-section', `
        display: flex; 
        align-items: center;
        flex: 1; 
        gap: var(--gds-space-3);
        justify-content: flex-end;
  `),
  cB('pagination-quick-jumper__input', `
        text-align: center;
        margin-right: 0.5rem;
    `),
  cB('pagination-quick-jumper__select', `
        text-align: center;
        justify-content: center;
    `, [
  ]),
  cB('pagination-quick-jumper-content', `
        margin: unset;
        user-select: none;
        color: var(--gds-color-text-neutral);
        padding-right: 0.5rem;
    `),
  cB('pagination-quick-jumper', `
    white-space: nowrap;
    display: flex;
    color: var(--gds-color-text-neutral);
    transition: color .3s var(--z-bezier);
    align-items: center;
    font-size: var(--z-jumper-font-size);
  `, [
    cE('select', `
        width: var(--z-select-width);
    `),

    cB('input', `
      margin: var(--z-input-margin);
      width: var(--z-input-width);
      text-align: center;
    `)
  ]),
  cB('pagination-quick-jumper-label', `
    user-select: none;
    color: var(--gds-color-text-neutral);
    font-size: var(--z-jumper-font-size);
    white-space: nowrap;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  `),
  cB('pagination-item', `
    position: relative;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: var(--z-item-size);
    height: var(--z-item-size);
    padding: var(--z-item-padding);
    background-color: var(--z-item-color);
    color: var(--z-item-text-color);
    border-radius: var(--z-item-border-radius);
    fill: var(--z-button-icon-color);
    text-align: center;
    line-height: 1;
    transition:
      color .3s var(--z-bezier),
      border-color .3s var(--z-bezier),
      background-color .3s var(--z-bezier),
      fill .3s var(--z-bezier);
  `, [
    cM('button', `
      background: var(--z-button-color);
      color: var(--z-button-icon-color);
      margin-right: var(--gds-space-3);
      padding: 0;
    `, [
      cB('base-icon', `
        font-size: var(--z-button-icon-size);
        background: var(--z-button-color);
        color: var(--z-button-icon-color);
      `)
    ]),
    cNotM('disabled', [
      cM('hover', hoverStyleProps, hoverStyleChildren),
      c('&:hover', hoverStyleProps, hoverStyleChildren),
      c('&:active', `
        background: var(--z-item-color-pressed);
        color: var(--z-item-text-color-pressed);
      `, [
        cM('button', `
          background: var(--z-button-color-pressed);
          color: var(--z-button-icon-color-pressed);
        `)
      ]),
      cM('active', `
        background: var(--z-item-color-active);
        color: var(--z-item-text-color-active);
      `, [
        c('&:hover', `
          background: var(--z-item-color-active-hover);
        `)
      ])
    ]),
    cM('disabled', `
      cursor: not-allowed;
    `, [
      cM('active, button', `
        background-color: var(--z-item-color-disabled);
      `)
    ])
  ]),
  cM('disabled', `
    cursor: not-allowed;
  `),
  cM('simple', `
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  `, [
    cB('pagination-quick-jumper', [
      cB('input', `
        margin: 0;
      `)
    ])
  ])
])
