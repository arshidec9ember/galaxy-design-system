import { cB, cE, cM, c, cNotM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-button-border-color
// --z-button-border-color-active
// --z-height
// --z-opacity-disabled
// --z-font-size
// --z-button-bg-color-hover
// --z-button-bg-color-active
// --z-button-bg-color-active-hover
export default cB('checkbox-group', `
  display: flex;
  font-size: var(--z-font-size);
`, [
  cE('splitor', `
    display: inline-flex;
    vertical-align: bottom;
    border-right: 1px solid var(--z-button-border-color);
    transition:
      background-color .3s var(--z-bezier),
      opacity .3s var(--z-bezier);
  `, [
    cM('checked', `
      border-right: 1px solid var(--z-button-border-color-active);
    `),
    cM('disabled', {
      opacity: 'var(--z-opacity-disabled)'
    })
  ]),
  cM('borderless', `
      gap: 1px;
    `),
  cM('button-group', `
    white-space: nowrap;
    height: var(--z-height);
    line-height: var(--z-height);
  `, [
    cB('checkbox-button', {
      height: 'var(--z-height)',
      lineHeight: 'var(--z-height)'
    })
  ]),
  cB('checkbox-button', `
    vertical-align: bottom;
    outline: none;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    display: inline-flex;
    box-sizing: border-box;
    padding-left: 8px;
    padding-right: 8px;
    white-space: nowrap;
    transition:
      background-color .3s var(--z-bezier),
      opacity .3s var(--z-bezier),
      border-color .3s var(--z-bezier),
      color .3s var(--z-bezier);
    color: var(--z-button-text-color);
    border-top: 1px solid var(--z-button-border-color);
    border-bottom: 1px solid var(--z-button-border-color);
  `, [
    cE('label', `
      display: flex;
      align-items: center;
    `),
    cB('checkbox-input', `
      pointer-events: none;
      position: absolute;
      border: 0;
      border-radius: inherit;
      left: 0;
      margin: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
      z-index: 1;
    `),
    cE('state-border', `
      z-index: 1;
      pointer-events: none;
      position: absolute;
      box-shadow: var(--z-button-box-shadow);
      transition: box-shadow .3s var(--z-bezier);
      left: -1px;
      bottom: -1px;
      right: -1px;
      top: -1px;
    `),
    c('&:first-child', `
      border-top-left-radius: var(--z-button-border-radius);
      border-bottom-left-radius: var(--z-button-border-radius);
      border-left: 1px solid var(--z-button-border-color);
    `, [
      cE('state-border', `
        border-top-left-radius: var(--z-button-border-radius);
        border-bottom-left-radius: var(--z-button-border-radius);
      `)
    ]),
    c('&:last-child', `
      border-top-right-radius: var(--z-button-border-radius);
      border-bottom-right-radius: var(--z-button-border-radius);
      border-right: 1px solid var(--z-button-border-color);
    `, [
      cE('state-border', `
        border-top-right-radius: var(--z-button-border-radius);
        border-bottom-right-radius: var(--z-button-border-radius);
      `)
    ]),
    cM('borderless', `
      border: 1px solid var(--z-button-color-active);
      border-radius: var(--z-button-border-radius);
    `, [
      cM('checked', `
        background-color: var(--z-button-bg-color-hover);
        border: 1px solid var(--z-button-border-color-active);
        color: var(--z-button-text-color-active);
      `),
      cE('state-border', `
        border-radius: var(--z-button-border-radius);
        padding-left: 5px;
        padding-right: 5px;
      `),
      cNotM('disabled', `
        cursor: pointer;
    `, [
        c('&:hover', `
          border-radius: var(--z-button-border-radius);
        `),
        c('&:active', `
          background-color: var(--z-button-bg-color-hover);
          border: 1px solid var(--z-button-border-color-active);
          color: var(--z-button-text-color-active);
          border-radius: var(--z-button-border-radius);
        `),
        c('&:focus', [
          c('&:not(:active)', [
            cE('state-border', {
              boxShadow: 'var(--z-button-box-shadow-focus)',
              borderRadius: 'var(--z-button-border-radius)'
            })
          ])
        ])
      ])
    ]),
    cNotM('disabled', `
      cursor: pointer;
    `, [
      c('&:hover', [
        cE('state-border', `
          transition: box-shadow .3s var(--z-bezier);
          box-shadow: var(--z-button-box-shadow-hover);
        `),
        cNotM('checked', {
          backgroundColor: 'var(--z-button-bg-color-hover)'
        })
      ]),
      c('&:focus', [
        c('&:not(:active)', [
          cE('state-border', {
            boxShadow: 'var(--z-button-box-shadow-focus)'
          })
        ])
      ])
    ]),
    cM('checked', `
      background: var(--z-button-bg-color-active);
      color: var(--z-button-text-color-active);
      border-color: var(--z-button-border-color-active);
    `, [
      c('&:hover', {
        background: 'var(--z-button-bg-color-active-hover)'
      })
    ]),
    cM('disabled', `
      cursor: not-allowed;
      opacity: var(--z-opacity-disabled);
    `, [
      c('&:hover', `
        background-color: var(--z-button-bg-color-hover)
      `)
    ])
  ])
])
