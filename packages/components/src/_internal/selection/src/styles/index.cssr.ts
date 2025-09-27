import {
  c,
  cB,
  cE,
  cM,
  cNotM
} from '../../../../_utils/cssr'

// vars:
// --z-bezier
// --z-border
// --z-border-active
// --z-border-focus
// --z-border-hover
// --z-border-radius
// --z-box-shadow-active
// --z-box-shadow-focus
// --z-box-shadow-hover
// --z-caret-color
// --z-color
// --z-color-active
// --z-color-disabled
// --z-font-size
// --z-height
// --z-padding-single
// --z-padding-multiple
// --z-placeholder-color
// --z-placeholder-color-disabled
// --z-text-color
// --z-text-color-disabled
// --z-arrow-color
// --z-arrow-size
// --z-arrow-right-offset
// --z-loading-color
// ...clear vars
// ...form item vars
export default c([
  cB('base-selection', `
    position: relative;
    z-index: auto;
    box-shadow: none;
    width: 100%;
    max-width: 100%;
    display: inline-block;
    vertical-align: bottom;
    border-radius: var(--z-border-radius);
    min-height: var(--z-height);
    line-height: 1.5;
    font-size: var(--z-font-size);
  `, [
    cB('base-loading', `
      color: var(--z-loading-color);
    `),
    cB('base-selection-tags', 'min-height: var(--z-height);'),
    cE('border, state-border', `
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      border: 1px solid var(--gds-color-border-neutral-dark1);
      border-radius: inherit;
      transition:
        box-shadow .3s var(--z-bezier),
        border-color .3s var(--z-bezier);
    `),
    cE('state-border', `
      z-index: 1;
      border-color: #0000;
    `),
    cB('base-suffix', `
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: var(--z-arrow-right-offset);
    `, [
      cE('arrow', `
        font-size: var(--z-arrow-size);
        color: var(--z-arrow-color);
        transition: color .3s var(--z-bezier);
      `)
    ]),
    cB('base-selection-overlay', `
      display: flex;
      align-items: center;
      white-space: nowrap;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: var(--z-padding-single);
      transition: color .3s var(--z-bezier);
    `, [
      cE('wrapper', `
        flex-basis: 0;
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--gds-color-text-neutral-light3);
      `)
    ]),
    cB('base-selection-placeholder', `
      color: var(--gds-color-text-neutral-light3);
    `, [
      cE('inner', `
        max-width: 100%;
        overflow: hidden;
        color: var(--gds-color-text-neutral-light3);
      `)
    ]),
    cB('base-selection-tags', `
      cursor: pointer;
      outline: none;
      box-sizing: border-box;
      position: relative;
      z-index: auto;
      display: flex;
      gap: 4px;
      padding: var(--z-padding-multiple);
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      vertical-align: bottom;
      background-color: var(--z-color);
      border-radius: inherit;
      transition:
        color .3s var(--z-bezier),
        box-shadow .3s var(--z-bezier),
        background-color .3s var(--z-bezier);
    `, [
      c('.v-overflow', [
        cB('base-selection-tag-wrapper', `
          padding-right: 4px;
        `)
      ])
    ]),
    cB('base-selection-label', `
      height: var(--z-height);
      display: inline-flex;
      width: 100%;
      vertical-align: bottom;
      cursor: pointer;
      outline: none;
      z-index: auto;
      box-sizing: border-box;
      position: relative;
      transition:
      color .3s var(--z-bezier),
      box-shadow .3s var(--z-bezier),
      background-color .3s var(--z-bezier);
      border-radius: inherit;
      background-color: var(--z-color);
      align-items: center;
    `, [
      cB('base-selection-input', `
        font-size: inherit;
        line-height: inherit;
        outline: none;
        cursor: pointer;
        box-sizing: border-box;
        border:none;
        width: 100%;
        padding: var(--z-padding-single);
        background-color: #0000;
        color: var(--z-text-color);
        transition: color .3s var(--z-bezier);
        caret-color: var(--z-caret-color);
      `, [
        cE('content', `
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;  
        `)
      ]),
      cE('render-label', `
        color: var(--z-text-color);
      `)
    ]),
    cNotM('disabled', [
      c('&:hover', [
        cE('state-border', `
          box-shadow: var(--z-box-shadow-hover);
          border-color: var(--gds-color-border-neutral-dark3);
        `)
      ]),
      cM('focus', [
        cE('state-border', `
          
          border: var(--z-border-focus);
        `)
      ]),
      cM('active', [
        cE('state-border', `
          border: var(--z-border-active);
        `),
        cB('base-selection-label', ''),
        cB('base-selection-tags', '')
      ])
    ]),
    cM('disabled', 'cursor: not-allowed;', [
      cE('border, state-border', `
      `),
      cB('base-suffix', `
    `, [
        cE('arrow', `
        color: var(--z-arrow-color-disabled);
      `)
      ]),
      cB('base-selection-label', `
        cursor: not-allowed;
        background-color: var(--z-color);
        border: var(--gds-color-border-neutral-dark1);
      `, [
        cB('base-selection-input', `
          cursor: not-allowed;
          color: var(--z-text-color-disabled);
        `),
        cE('render-label', `
          color: var(--z-text-color-disabled);
        `)
      ]),
      cB('base-selection-tags', `
        cursor: not-allowed;
        background-color: var(--z-color);
      `),
      cB('base-selection-placeholder', `
        cursor: not-allowed;
        color: var(--z-placeholder-color-disabled);
      `)
    ]),
    cB('base-selection-input-tag', `
      height: calc(var(--z-height) - 6px);
      line-height: calc(var(--z-height) - 6px);
      outline: none;
      display: none;
      position: relative;
      max-width: 100%;
      vertical-align: bottom;
    `, [
      cE('input', `
        font-size: inherit;
        font-family: inherit;
        min-width: 1px;
        padding: 0;
        background-color: #0000;
        outline: none;
        border: none;
        max-width: 100%;
        overflow: hidden;
        width: 1em;
        line-height: inherit;
        cursor: pointer;
        color: var(--z-text-color);
        caret-color: var(--z-caret-color);
      `),
      cE('mirror', `
        position: absolute;
        left: 0;
        top: 0;
        white-space: pre;
        visibility: hidden;
        user-select: none;
        -webkit-user-select: none;
        opacity: 0;
      `)
    ]),
    ['warning', 'error'].map(status => cM(`${status}-status`, [
      cE('state-border', `border: var(--z-border-${status});`),
      cNotM('disabled', [
        c('&:hover', [
          cE('state-border', `
            box-shadow: var(--z-box-shadow-hover-${status});
          `)
        ]),
        cM('active', [
          cE('state-border', `
            box-shadow: var(--z-box-shadow-active-${status});
            border: 1px var(--z-border-active-${status});
          `),
          cB('base-selection-label', ''),
          cB('base-selection-tags', '')
        ]),
        cM('focus', [
          cE('state-border', `
            box-shadow: var(--z-box-shadow-focus-${status});
            border: var(--z-border-focus-${status});
          `)
        ])
      ]),
      cM('disabled', [
        cE('state-border', `border: var(--z-border-${status}-disabled);`)
      ])
    ]))
  ]),
  cB('base-selection-popover', `
    margin-bottom: -3px;
    display: flex;
    flex-wrap: wrap;
    margin-right: -8px;
    gap: 4px;
  `),
  cB('base-selection-tag-wrapper', `
    max-width: 100%;
    display: inline-flex;
    padding:  0;
  `, [
    c('&:last-child', 'padding-right: 0;'),
    cB('tag', `
      font-size: 14px;
      max-width: 100%;
    `, [
      cE('content', `
        line-height: 1.25;
        text-overflow: ellipsis;
          overflow: hidden;
      `)
    ])
  ])
])
