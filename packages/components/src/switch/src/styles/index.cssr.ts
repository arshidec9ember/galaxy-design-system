import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'
import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-button-border-radius
// --z-button-box-shadow
// --z-button-color
// --z-button-width
// --z-button-width-pressed
// --z-height
// --z-offset
// --z-rail-border-radius
// --z-rail-color
// --z-rail-color-active
// --z-rail-color-hover
// --z-rail-color-active-hover
// --z-rail-height
// --z-rail-width
// --z-width
// --z-box-shadow-focus
// --z-loading-color
// --z-text-color
// --z-icon-color
export default cB('switch', `
  height: var(--z-height);
  min-width: var(--z-width);
  vertical-align: middle;
  user-select: none;
  -webkit-user-select: none;
  display: inline-flex;
  outline: none;
  justify-content: center;
  align-items: center;
`, [
  cE('children-placeholder', `
    height: var(--z-rail-height);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
  `),
  cE('rail-placeholder', `
    display: flex;
    flex-wrap: none;
  `),
  cE('button-placeholder', `
    width: calc(1.75 * var(--z-rail-height));
    height: var(--z-rail-height);
  `),
  cB('base-loading', `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: calc(var(--z-button-width) - 4px);
    color: var(--z-loading-color);
    transition: color .3s var(--z-bezier);
  `, [
    iconSwitchTransition({
      left: '50%',
      top: '50%',
      originalTransform: 'translateX(-50%) translateY(-50%)'
    })
  ]),
  cE('checked, unchecked', `
    transition: color .3s var(--z-bezier);
    color: var(--z-text-color);
    box-sizing: border-box;
    position: absolute;
    white-space: nowrap;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    line-height: 1;
  `),
  cE('checked', `
    right: 0;
    padding-right: calc(1.25 * var(--z-rail-height) - var(--z-offset));
  `),
  cE('unchecked', `
    left: 0;
    justify-content: flex-end;
    padding-left: calc(1.25 * var(--z-rail-height) - var(--z-offset));
  `),
  c('&:focus', [
    cE('rail', `
    `)
  ]),
  cM('round', [
    cE('rail', 'border-radius: calc(var(--z-rail-height) / 2);', [
      cE('button', 'border-radius: calc(var(--z-button-height) / 2);')
    ])
  ]),
  cNotM('disabled', [
    c('&:hover', [
      cE('rail', 'background-color: var(--z-rail-color-hover)')
    ]),
    cM('active', [
      cE('rail', 'background-color: var(--z-rail-color-active)'),
      c('&:hover', [
        cE('rail', 'background-color: var(--z-rail-color-active-hover)')
      ])
    ]),
    cNotM('icon', [
      cM('rubber-band', [
        cM('pressed', [
          cE('rail', [
            cE('button', 'max-width: var(--z-button-width-pressed);')
          ])
        ]),
        cE('rail', [
          c('&:active', [
            cE('button', 'max-width: var(--z-button-width-pressed);')
          ])
        ]),
        cM('active', [
          cM('pressed', [
            cE('rail', [
              cE('button', 'left: calc(100% - var(--z-offset) - var(--z-button-width-pressed));')
            ])
          ]),
          cE('rail', [
            c('&:active', [
              cE('button', 'left: calc(100% - var(--z-offset) - var(--z-button-width-pressed));')
            ])
          ])
        ])
      ])
    ])
  ]),
  cM('active', [
    cE('rail', [
      cE('button', 'left: calc(100% - var(--z-button-width) - var(--z-offset))')
    ])
  ]),
  cE('rail', `
    overflow: hidden;
    height: var(--z-rail-height);
    min-width: var(--z-rail-width);
    border-radius: var(--z-rail-border-radius);
    cursor: pointer;
    position: relative;
    transition:
      opacity .3s var(--z-bezier),
      background .3s var(--z-bezier),
      box-shadow .3s var(--z-bezier);
    background-color: var(--z-rail-color);
  `, [
    cE('button-icon', `
      color: var(--z-icon-color);
      transition: color .3s var(--z-bezier);
      font-size: calc(var(--z-button-height) - 4px);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
    `, [
      iconSwitchTransition()
    ]),
    cE('button', `
      align-items: center;    
      top: var(--z-offset);
      left: var(--z-offset);
      height: var(--z-button-height);
      width: var(--z-button-width-pressed);
      max-width: var(--z-button-width);
      border-radius: var(--z-button-border-radius);
      background-color: var(--z-button-color);
      box-shadow: var(--z-button-box-shadow);
      box-sizing: border-box;
      cursor: inherit;
      content: "";
      position: absolute;
      transition:
        background-color .3s var(--z-bezier),
        left .3s var(--z-bezier),
        opacity .3s var(--z-bezier),
        max-width .3s var(--z-bezier),
        box-shadow .3s var(--z-bezier);
    `)
  ]),
  cM('active', [
    cE('rail', 'background-color: var(--z-rail-color-active);')
  ]),
  cM('loading', [
    cE('rail', `
      cursor: wait;
    `)
  ]),
  cM('disabled', [
    cE('rail', `
      cursor: not-allowed;
      opacity: var(--z-opacity-disabled);
    `),
    cE('button', `
      cursor: not-allowed;
      opacity: var(--z-opacity-disabled);
    `)
  ])
])
