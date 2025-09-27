import { c, cB, cM, cE, cNotM } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --z-bezier
// --z-font-size
// --z-padding
// --z-border-radius
// --z-option-height
// --z-option-prefix-width
// --z-option-icon-prefix-width
// --z-option-suffix-width
// --z-option-icon-suffix-width
// --z-color
// --z-option-color-hover
// --z-option-color-active
// --z-divider-color
// --z-option-text-color
// --z-option-text-color-hover
// --z-option-text-color-active
// --z-option-text-color-child-active
// --z-prefix-color
// --z-suffix-color
// --z-option-icon-size
// --z-option-opacity-disabled
// --z-option-icon-color

// shared with popover
// --z-box-shadow

export default cB('dropdown-menu', `
  transform-origin: var(--v-transform-origin);
  background-color: var(--z-color);
  border-radius: var(--z-border-radius);
  box-shadow: var(--z-box-shadow);
  position: relative;
  transition:
    background-color .3s var(--z-bezier),
    box-shadow .3s var(--z-bezier);
`, [
  fadeInScaleUpTransition(),
  cB('dropdown-option', `
    position: relative;
  `, [
    c('a', `
      text-decoration: none;
      color: inherit;
      outline: none;
    `, [
      c('&::before', `
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      `)
    ]),
    cB('dropdown-option-body', `
      display: flex;
      cursor: pointer;
      position: relative;
      height: var(--z-option-height);
      line-height: var(--z-option-height);
      font-size: var(--z-font-size);
      color: var(--z-option-text-color);
      transition: color .3s var(--z-bezier);
    `, [
      c('&::before', `
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0px;
        right: 0px;
        transition: background-color .3s var(--z-bezier);
      `),
      cNotM('disabled', [
        cM('pending', `
          color: var(--z-option-text-color-hover);
        `, [
          cE('prefix, suffix', `
            color: var(--z-option-text-color-hover);
          `),
          c('&::before', 'background-color: var(--z-option-color-hover);')
        ]),
        cM('active', `
          color: var(--z-option-text-color-active);
        `, [
          cE('prefix, suffix', `
            color: var(--z-option-text-color-active);
          `),
          c('&::before', 'background-color: var(--z-option-color-active);')
        ]),
        cM('child-active', `
          color: var(--z-option-text-color-child-active);
        `, [
          cE('prefix, suffix', `
            color: var(--z-option-text-color-child-active);
          `)
        ])
      ]),
      cM('disabled', `
        cursor: not-allowed;
        opacity: var(--z-option-opacity-disabled);
      `),
      cM('group', `
        font-size: calc(var(--z-font-size) - 1px);
        color: var(--z-group-header-text-color);
      `, [
        cE('prefix', `
          width: calc(var(--z-option-prefix-width) / 2);
        `, [
          cM('show-icon', `
            width: calc(var(--z-option-icon-prefix-width) / 2);
          `)
        ])
      ]),
      cE('prefix', `
        min-width: var(--z-option-prefix-width);
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--z-prefix-color);
        transition: color .3s var(--z-bezier);
        z-index: 1;
      `, [
        cM('show-icon', `
          width: var(--z-option-icon-prefix-width);
        `),
        cB('icon', `
          color: var(--z-option-icon-color);
          font-size: var(--z-option-icon-size);
        `)
      ]),
      cE('label', `
        width: calc(100% - (var(--z-option-suffix-width) + var(--z-option-prefix-width)));
        white-space: nowrap;
        flex: 1;
        z-index: 1;
      `, [
        cB('breadcrumb-item', `
          list-style:none;
        `, [
          cE('separator', `
            display: none;
          `),
          cE('link', `
            display: inline-flex;
            align-items: center;
          `, [
            cE('start', `
            margin-inline-end: 4px;
            display: inline-flex;
            `),
            cE('end', `
            margin-inline-start: 4px;
            display: inline-flex;
            `)
          ])
        ])
      ]),
      cE('suffix', `
        box-sizing: border-box;
        flex-grow: 0;
        flex-shrink: 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        min-width: var(--z-option-suffix-width);
        padding: 0 8px;
        transition: color .3s var(--z-bezier);
        color: var(--z-suffix-color);
        z-index: 1;
      `, [
        cM('has-submenu', `
          width: var(--z-option-icon-suffix-width);
        `),
        cB('icon', `
          color: var(--z-option-icon-color);
          font-size: var(--z-option-icon-size);
        `)
      ]),
      cB('dropdown-menu', 'pointer-events: all;')
    ]),
    cB('dropdown-offset-container', `
      pointer-events: none;
      position: absolute;
      left: 0;
      right: 0;
      top: -4px;
      bottom: -4px;
    `)
  ]),
  cB('dropdown-divider', `
    transition: background-color .3s var(--z-bezier);
    background-color: var(--z-divider-color);
    height: 1px;
    margin: 4px 0;
  `),
  cB('dropdown-menu-wrapper', `
    transform-origin: var(--v-transform-origin);
    width: fit-content;
  `),
  c('>', [
    cB('scrollbar', `
      height: inherit;
      max-height: inherit;
    `)
  ]),
  cNotM('scrollable', `
    padding: var(--z-padding);
  `),
  cM('scrollable', [
    cE('content', `
      padding: var(--z-padding);
    `)
  ])
])
