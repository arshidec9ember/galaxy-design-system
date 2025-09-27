import { type CNode } from './../../../_utils/css-render'
import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --z-color
// --z-title-font-weight
// --z-title-font-size
// --z-bezier-ease-out
// --z-title-text-color
// --z-bezier
// --z-toolbar-background-color
// --z-toolbar-background-color-hover
export const floatingPanelContinerStyle = c([
  cB('floating-panel-dropdown', `
    background: var(--z-toolbar-background-color);
    color: var(--z-color);
    gap: 8px;
    display: flex;
    cursor: pointer;
    align-items: center;
    font-weight: var(--z-title-font-weight);
    font-size: var(--z-title-font-size);
    transition: color .3s var(--z-bezier-ease-out);
    padding: 12px 20px;
    border: 1px solid var(--z-color);
    border-radius: var(--z-border-radius) var(--z-border-radius) 0 0;
    box-shadow: var(--z-box-shadow);
    transition:
    background-color .3s var(--z-bezier), color .3s var(--z-bezier);
    min-width: fit-content;
  `, [
    c('&:hover', `
      background: var(--z-toolbar-background-color-hover);
    `),
    cE('icon', `
      transform: rotate(270deg);
      color : var(--z-color);
    `)
  ])
])

// vars:
// --z-color
// --z-text-color
// --z-action-text-color
// --z-title-text-color
// --z-title-font-weight
// --z-title-font-size
// --z-footer-font-size
// --z-description-font-size
// --z-bezier
// --z-bezier-ease-out
// --z-bezier-ease-in
// --z-border-radius
// --z-box-shadow
// --z-close-margin
// --z-close-size
// --z-close-icon-size
// --z-close-color-hover
// --z-close-color-pressed
// --z-close-icon-color
// --z-close-icon-color-hover
// --z-close-icon-color-pressed
// --z-line-height
// --z-icon-color
// --z-width
// --z-padding-top
// --z-padding-bottom
// --z-padding-left
// --z-padding-right
// --z-container-padding-bottom
// --z-toolbar-background-color
// --z-toolbar-background-color-hover
// --z-minimize-header-height // dynamic
// --z-minimize-margin
// --z-minimize-size
// --z-minimize-icon-size
// --z-minimize-color-hover
// --z-minimize-color-pressed
// --z-minimize-icon-color
// --z-minimize-icon-color-hover
// --z-minimize-icon-color-pressed
// --z-drag-cursor
export default c([
  cB('floating-panel-container', `
    z-index: 10;
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  `, [
    c('>', [
      cB('scrollbar', `
        width: fit-content;
        max-width: 100vw;
      `, [
        c('>', [
          cB('scrollbar-container', `
            width: fit-content;
            max-width: 100vw;
          `, [
            cB('scrollbar-content', `
              align-items: flex-end;
                width: fit-content;
                display: flex;
                flex-direction: row;
                margin-bottom:0 !important;
            `)
          ])
        ])
      ])
    ]),
    cM('bottom-right, bottom-left', `
      bottom: 12px;
    `, [
      c('>', [
        cB('scrollbar', [
          c('>', [
            cB('scrollbar-container', [
              cB('scrollbar-content', `
                margin-bottom: 1px;
              `)
            ])
          ])
        ])
      ]),
      cB('floating-panel-wrapper', `
        display: flex;
        align-items: flex-end;
        margin: 8px 8px 0 8px;
      `, [

      ])
    ]),
    cM('bottom-right', `
      right: 8px;
    `, [
      placementTransformStyle('bottom-right')
    ]),
    cM('bottom-left', `
      left: 0;
    `, [
      placementTransformStyle('bottom-left')
    ]),
    cM('scrollable', [
      cM('bottom-right', `
        bottom: 0;
      `),
      cM('bottom-left', `
        bottom: 0;
      `)
    ]),
    cB('floating-panel-wrapper', `
      margin-bottom: 4px;
    `, [
      cM('draggble', `
        position: fixed;
      `, [
        cB('floating-panel-main-footer', `
          cursor: var(--z-drag-cursor);
        `)
      ]),
      c('&.floating-panel-transition-enter-from, &.floating-panel-transition-leave-to', `
        opacity: 0;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      `),
      c('&.floating-panel-transition-leave-from, &.floating-panel-transition-enter-to', `
        opacity: 1;
      `),
      c('&.floating-panel-transition-leave-active', `
        transition:
          background-color .3s var(--z-bezier),
          color .3s var(--z-bezier),
          opacity .3s var(--z-bezier),
          transform .3s var(--z-bezier-ease-in),
          max-height .3s var(--z-bezier),
          margin-top .3s linear,
          margin-bottom .3s linear,
          box-shadow .3s var(--z-bezier);
      `),
      c('&.floating-panel-transition-enter-active', `
        transition:
          background-color .3s var(--z-bezier),
          color .3s var(--z-bezier),
          opacity .3s var(--z-bezier),
          transform .3s var(--z-bezier-ease-out),
          max-height .3s var(--z-bezier),
          margin-top .3s linear,
          margin-bottom .3s linear,
          box-shadow .3s var(--z-bezier);
      `)
    ]),
    cB('floating-panel', `
      background-color: var(--z-color);
      color: var(--z-text-color);
      transition:
        background-color .3s var(--z-bezier),
        color .3s var(--z-bezier),
        opacity .3s var(--z-bezier),
        box-shadow .3s var(--z-bezier);
      font-size: var(--z-font-size);
      font-weight: 400;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      flex-shrink: 0;
      width: var(--z-width);
      border-radius: var(--z-border-radius) var(--z-border-radius) 0 0;
      border: 1px solid var(--z-panel-divider-color);
      box-shadow: var(--z-box-shadow);
    `, [
      cM('draggable', `
        z-index: 1;
        position: fixed;
        border-radius: var(--z-border-radius);
      `, [
        cB('floating-panel-main', [
          cE('header', `
            cursor: var(--z-drag-cursor);
          `)
        ])
      ]),
      cM('minimize', [
        cB('floating-panel-main', [
          cE('header', `
          background-color: var(--z-toolbar-background-color);
          color: var(--z-color);
          cursor: unset;
          border-color: transparent;
        `, [
            c('&:hover', `
            background-color: var(--z-toolbar-background-color-hover);
          `),
            cB('base-toggle', `
            color: var(--z-color);
          `),
            cB('base-close', `
            color: var(--z-color);
          `),
            cB('base-new-tab', `
            color: var(--z-color);
          `)
          ])
        ])
      ]),
      cB('floating-panel-content', `
        position: relative;
        cursor: default;
      `, [
        cM('expand', `
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        background: var(--z-color);
        height: 100vh;
        width: 100vw;
        `, [
          cB('collapse-transition', `
            height: 100%;
            display: flex;
            flex-direction: column;
          `),
          cB('floating-panel-main', `
            height: 100%;
            display: flex;
            flex-direction: column;
          `, [
            cE('header, footer', `
            flex: 0 0 auto
            `),
            cE('content', `
              flex: 1 1 auto;
              overflow-y: auto;
              max-height: calc(100vh - var(--z-expand-header-height) - var(--z-container-padding-bottom));
            `)
          ])
        ])
      ]),
      cM('closable', [
        cE('close', `
          transition:
            background-color .3s var(--z-bezier),
            color .3s var(--z-bezier);
        `)
      ]),
      cB('floating-panel-main', `
        display: flex;
        flex-direction: column;
      `, [
        cB('floating-panel-main-footer', `
          font-size: var(--z-footer-font-size);
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
          border-top: 1px solid var(--z-panel-divider-color);
          padding: 12px 20px;
        `, [
          cE('action', `
            cursor: pointer;
            transition: color .3s var(--z-bezier-ease-out);
            color: var(--z-action-text-color);
          `)
        ]),
        cE('header', `
          display: flex;
          align-items: center;
          cursor: grab;
          font-weight: var(--z-title-font-weight);
          font-size: var(--z-title-font-size);
          transition: color .3s var(--z-bezier-ease-out);
          color: var(--z-title-text-color);
          border-bottom: 1px solid var(--z-panel-divider-color);
          padding: 12px 20px;
          transition:
          background-color .3s var(--z-bezier), color .3s var(--z-bezier);
        `, [

        ]),
        cE('header-main', `
          flex: 1;
        `),
        cE('header-end', `
        display: flex;
        align-items: center;
        `),
        cE('content', `
          padding: 12px 20px;
          max-height: calc(var(--z-height) - 60px);
          overflow: auto;
          line-height: var(--z-line-height);
          margin: 4px 0 0 0;
          font-family: inherit;
          font-size: var(--z-font-size);
          white-space: pre-wrap;
          word-wrap: break-word;
          transition: color .3s var(--z-bezier-ease-out);
          color: var(--z-text-color);
        `, [
          c('&:first-child', {
            margin: 0
          })
        ])
      ])
    ])
  ])
])

function placementTransformStyle (placement: string): CNode {
  const direction = placement.split('-')[1]
  const transformXEnter = direction === 'left' ? 'calc(-100%)' : 'calc(100%)'
  const transformXLeave = '0'
  return cB('floating-panel-wrapper', [
    c('&.floating-panel-transition-enter-from, &.floating-panel-transition-leave-to', `
      transform: translate(0, ${transformXEnter});
    `),
    c('&.floating-panel-transition-leave-from, &.notification-transition-enter-to', `
      transform: translate(0, ${transformXLeave});
    `)
  ])
}
