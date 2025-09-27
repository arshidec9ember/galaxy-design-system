import { c, cE, cM, cB, cNotM } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --z-icon-color-override
// --z-icon-color-disabled-override
// --z-bezier
// --z-border-radius
// --z-item-color-hover
// --z-item-font-size
// --z-item-height
// --z-item-opacity-disabled
// --z-item-text-color
// --z-item-text-color-active
// --z-item-width
// --z-panel-action-padding
// --z-panel-box-shadow
// --z-panel-color
// --z-panel-divider-color
// --z-item-border-radius
export default c([
  cB('time-picker', `
    z-index: auto;
    position: relative;
  `, [
    cB('time-picker-icon', `
      color: var(--z-icon-color-override);
      transition: color .3s var(--z-bezier);
    `),
    cM('disabled', [
      cB('time-picker-icon', `
        color: var(--z-icon-color-disabled-override);
      `)
    ])
  ]),
  cB('time-picker-panel', `
    transition:
      box-shadow .3s var(--z-bezier),
      background-color .3s var(--z-bezier);
    outline: none;
    font-size: var(--z-item-font-size);
    border-radius: var(--z-border-radius);
    margin: 4px 0;
    min-width: 104px;
    overflow: hidden;
    background-color: var(--z-panel-color);
    box-shadow: var(--z-panel-box-shadow);
  `, [
    fadeInScaleUpTransition(),
    cB('time-picker-actions', `
      padding: var(--z-panel-action-padding);
      align-items: center;
      display: flex;
      justify-content: space-between;
    `, [
      cB('time-picker-actions-right', `
        align-items: center;
        display: flex;
        justify-content: flex-end;
        width: 100%;
      `)
    ]),
    cB('time-picker-cols', `
      height: calc(var(--z-item-height) * 6);
      display: flex;
      position: relative;
      transition: border-color .3s var(--z-bezier);
      border-bottom: 1px solid var(--z-panel-divider-color);
    `),
    cB('time-picker-col', `
      flex-grow: 1;
      min-width: var(--z-item-width);
      height: calc(var(--z-item-height) * 6);
      flex-direction: column;
      transition: box-shadow .3s var(--z-bezier);
    `, [
      cM('transition-disabled', [
        cE('item', 'transition: none;', [
          c('&::before', 'transition: none;')
        ])
      ]),
      c('&:first-child', 'min-width: calc(var(--z-item-width) + 4px);', [
        cE('item', [
          c('&::before', 'left: 4px;')
        ])
      ]),
      cE('item', `
        cursor: pointer;
        height: var(--z-item-height);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 
          color .3s var(--z-bezier),
          background-color .3s var(--z-bezier),
          opacity .3s var(--z-bezier),
          text-decoration-color .3s var(--z-bezier);
        background: #0000;
        text-decoration-color: #0000;
        color: var(--z-item-text-color);
        z-index: 0;
        box-sizing: border-box;
        padding-top: 4px;
        position: relative;
      `, [
        c('&::before', `
          content: "";
          transition: background-color .3s var(--z-bezier);
          z-index: -1;
          position: absolute;
          left: 0;
          right: 4px;
          top: 4px;
          bottom: 0;
          border-radius: var(--z-item-border-radius);
        `),
        cNotM('disabled', [
          c('&:hover::before', `
            background-color: var(--z-item-color-hover);
          `)
        ]),
        cM('active', `
          color: var(--z-item-text-color-active);
          font-weight: 500;
        `, [
          c('&::before', `
            background-color: var(--z-item-color-hover);
            `),
          c('&:hover::before', `
            background-color: var(--z-item-color-hover);
          `)
        ]),
        cM('disabled', `
          opacity: var(--z-item-opacity-disabled);
          cursor: not-allowed;
        `)
      ]),
      cM('invalid', [
        cE('item', [
          cM('active', `
            text-decoration: line-through;
            text-decoration-color: var(--z-item-text-color-active);
          `)
        ])
      ])
    ])
  ])
])
