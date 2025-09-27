import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'
import { fadeInHeightExpandTransition } from '../../../_styles/transitions/fade-in-height-expand.cssr'

const iconSwitchTransitionNode = iconSwitchTransition()

// vars:
// --z-arrow-color
// --z-bezier
// --z-font-size
// --z-node-border-radius
// --z-node-color-active
// --z-node-color-hover
// --z-node-color-pressed
// --z-node-text-color
// --z-node-text-color-hover
// --z-node-text-color-active
// --z-node-text-color-disabled
// --z-node-wrapper-padding
// --z-line-offset-top
// --z-line-offset-bottom
// --z-node-content-height
// --z-line-height
export default cB('tree', `
  font-size: var(--z-font-size);
  outline: none;
`, [
  c('ul, li', `
    margin: 0;
    padding: 0;
    list-style: none;
  `),
  c('>', [
    cB('tree-node', [
      c('&:first-child', 'margin-top: 0;')
    ])
  ]),
  cB('tree-motion-wrapper', [
    cM('expand', [
      fadeInHeightExpandTransition({
        duration: '0.2s'
      })
    ]),
    cM('collapse', [
      fadeInHeightExpandTransition({
        duration: '0.2s',
        reverse: true
      })
    ])
  ]),
  cB('tree-node-wrapper', `
    box-sizing: border-box;
    padding: var(--z-node-wrapper-padding);
  `, [
    c('&:first-child', [
      cB('tree-node--is-root', `
        border-top: none;
    `)
    ]),
    cM('draggable', `
      padding: 4px 0;
    `)
  ]),
  cB('tree-node', `
    padding: var(--z-node-padding);
    transform: translate3d(0,0,0);
    position: relative;
    display: flex;
    border-radius: var(--z-node-border-radius);
    transition: background-color .3s var(--z-bezier);
  `, [
    cM('is-root', `
        border-radius: 0;
    `),
    cM('selected', [
      cB('tree-node-content', `
        color: var(--z-node-text-color-active);
        font-weight: 500;
        &:hover {
          background: var(--z-selected-node-hover-color);
        }
      `, [
        c('i', `
          color : var(--z-node-text-color-active) !important;
        `)
      ]),
      cB('tree-node-switcher', [
        cE('icon', `
          color : var(--z-node-text-color-active);
        `)
      ])
    ]),
    cM('disabled', [
      cB('tree-node-content', `
        color: var(--z-node-text-color-disabled);
        cursor: not-allowed;
      `)
    ]),
    cNotM('disabled', [
      cM('clickable', [
        cB('tree-node-content', `
          cursor: pointer;
        `)
      ])
    ])
  ]),
  cM('block-node', [
    cB('tree-node-content', `
      flex: 1;
      min-width: 0;
    `),
    cB('tree-node-content-wrapper', `
      flex: 1;
      min-width: 0;
    `)
  ]),
  cNotM('block-line', [
    cB('tree-node', [
      cNotM('disabled', [
        cB('tree-node-content', [
          c('&:hover', 'background: var(--z-node-color-hover);')
        ]),
        cM('selectable', [
          cB('tree-node-content', [
            c('&:active', 'background: var(--z-node-color-pressed);')
          ])
        ]),
        cM('pending', [
          cB('tree-node-content', `
            background: var(--z-node-color-hover);
          `)
        ]),
        cM('selected', [
          cB('tree-node-content', 'background: var(--z-node-color-active);')
        ])
      ])
    ])
  ]),
  cM('block-line', [
    cB('tree-node', [
      cNotM('disabled', [
        c('&:hover', 'background: var(--z-node-color-hover);'),
        cM('pending', `
          background: var(--z-node-color-hover);
        `),
        cM('selectable', [
          cNotM('selected', [
            c('&:active', 'background: var(--z-node-color-pressed);')
          ])
        ]),
        cM('selected', `background: var(--z-node-color-active); 
          &:hover {
          background: var(--z-selected-node-hover-color);
        }`)
      ]),
      cM('disabled', `
        cursor: not-allowed;
      `)
    ])
  ]),
  cB('tree-node-indent', `
    flex-grow: 0;
    flex-shrink: 0;
  `, [
    cM('show-line', 'position: relative', [
      c('&::before', `
        position: absolute;
        left: 50%;
        border-left: var(--z-line-width) solid var(--z-border-color);
        transition: border-color .3s var(--z-bezier);
        transform: translate(-50%);
        content: "";
        top: var(--z-line-offset-top);
        bottom: var(--z-line-offset-bottom);
      `),
      cM('last-child', [
        c('&::before', `
          bottom: 50%;
        `)
      ]),
      cM('is-leaf', [
        c('&::after', `
          position: absolute;
          content: "";
          left: calc(50% + 0.5px);
          right: 0;
          bottom: 50%;
          transition: border-color .3s var(--z-bezier);
          border-bottom: var(--z-line-width) solid var(--z-border-color);
        `)
      ])
    ]),
    cNotM('show-line', 'height: 0;')
  ]),
  cB('tree-node-switcher', `
    cursor: pointer;
    display: inline-flex;
    flex-shrink: 0;
    height: var(--z-node-content-height);
    align-items: center;
    justify-content: center;
    transition: transform .15s var(--z-bezier);
    vertical-align: bottom;
  `, [
    cE('icon', `
      position: relative;
      height: var(--z-font-size);
      width: var(--z-font-size);
      font-size: var(--z-font-size);
      display: flex;
      color: var(--z-arrow-color);
      transition: color .3s var(--z-bezier);
    `, [
      cB('icon', [
        iconSwitchTransitionNode
      ]),
      cB('base-loading', `
        color: var(--z-loading-color);
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      `, [
        iconSwitchTransitionNode
      ]),
      cB('base-icon', [
        iconSwitchTransitionNode
      ])
    ]),
    cM('hide', 'visibility: hidden;'),
    cM('expanded', 'transform: rotate(90deg);')
  ]),
  cB('tree-node-checkbox', `
    display: inline-flex;
    height: var(--z-node-content-height);
    vertical-align: bottom;
    align-items: center;
    justify-content: center;
  `),
  cB('tree-node-content', `
    user-select: none;
    position: relative;
    display: flex;
    align-items: center;
    min-height: var(--z-node-content-height);
    box-sizing: border-box;
    line-height: var(--z-line-height);
    vertical-align: bottom;
    padding: 0 6px 0 4px;
    cursor: default;
    border-radius: var(--z-node-border-radius);
    color: var(--z-node-text-color);
    transition:
      color .3s var(--z-bezier),
      background-color .3s var(--z-bezier),
      border-color .3s var(--z-bezier);
  `, [
    c('&:hover', `
      color: var(--z-node-text-color-hover);
    `),
    c('&:active', `
      color: var(--z-node-text-color-active);
    `),
    c('&:last-child', 'margin-bottom: 0;'),
    cE('prefix', `
      display: inline-flex;
      margin-right: 8px;
    `),
    cE('text', `
      border-bottom: 1px solid #0000;
      transition: border-color .3s var(--z-bezier);
      flex-grow: 1;
      max-width: 100%;
    `, [
      cB('node-highlight', `
        color: var(--z-node-text-color);
        border-radius: var(--gds-border-radius-xxs);
        font-weight: bold;
        background: var(--z-node-color-active);
      `),
      cM('ellipsis', `
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      `)
    ]),
    cE('suffix', `
      display: inline-flex;
    `)
  ]),
  cE('empty', 'margin: auto;')
])
