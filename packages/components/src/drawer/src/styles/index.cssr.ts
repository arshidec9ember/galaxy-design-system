import { c, cB, cE, cM } from '../../../_utils/cssr'
import { slideInFromRightTransition } from '../../../_styles/transitions/slide-in-from-right'
import { slideInFromLeftTransition } from '../../../_styles/transitions/slide-in-from-left'
import { slideInFromTopTransition } from '../../../_styles/transitions/slide-in-from-top'
import { slideInFromBottomTransition } from '../../../_styles/transitions/slide-in-from-bottom'
import { fadeInTransition } from '../../../_styles/transitions/fade-in.cssr'

// vars:
// --z-line-height
// --z-color
// --z-text-color
// --z-box-shadow
// --z-bezier
// --z-bezier-out
// --z-bezier-in
// --z-body-padding
// --z-header-padding
// --z-footer-padding
// --z-title-font-size
// --z-title-text-color
// --z-title-font-weight
// --z-header-border-bottom
// --z-footer-border-top
// --z-close-border-radius
// --z-close-color-hover
// --z-close-color-pressed
// --z-close-icon-color
// --z-close-icon-color-hover
// --z-close-icon-color-pressed
// --z-close-size
// --z-close-icon-size
// --z-description-text-color
export default c([
  cB('drawer', `
    word-break: break-word;
    line-height: var(--z-line-height);
    position: absolute;
    pointer-events: all;
    box-shadow: var(--z-box-shadow);
    transition:
      background-color .3s var(--z-bezier),
      color .3s var(--z-bezier);
    background-color: var(--z-color);
    color: var(--z-text-color);
    box-sizing: border-box;
  `,
  [
    slideInFromRightTransition(),
    slideInFromLeftTransition(),
    slideInFromTopTransition(),
    slideInFromBottomTransition(),
    cM('unselectable', `
      user-select: none; 
      -webkit-user-select: none;
    `),
    cM('native-scrollbar', [
      cB('drawer-content-wrapper', `
        overflow: auto;
        height: 100%;
      `)
    ]),
    cE('resize-trigger', `
      position: absolute;
      background-color: #0000;
      transition: background-color .3s var(--z-bezier);
    `, [
      cM('hover', `
        background-color: var(--z-resize-trigger-color-hover);
      `)
    ]),
    cB('drawer-content-wrapper', `
      box-sizing: border-box;
    `),
    cB('drawer-content', `
      height: 100%;
      display: flex;
      flex-direction: column;
    `, [
      cM('native-scrollbar', [
        cB('drawer-body-content-wrapper', `
          height: 100%;
          overflow: auto;
        `)
      ]),
      cB('drawer-body', `
        flex: 1 0 0;
        overflow: hidden;
      `),
      cB('drawer-body-content-wrapper', `
        box-sizing: border-box;
        padding: var(--z-body-padding);
      `),
      cB('drawer-header', `
        padding: var(--z-header-padding);
        border-bottom: 1px solid var(--z-divider-color);
        border-bottom: var(--z-header-border-bottom);
      `, [
        cE('container', `
          display: flex;
        `, [
          cE('left', `
            display: flex;
          `),
          cE('center', [
            cE('title', `
              font-weight: var(--z-title-font-weight);
              font-size: var(--z-title-font-size);
              color: var(--z-title-text-color);
              transition: border .3s var(--z-bezier);
              display: flex;
              align-items: center;
            `),
            cE('description', `
              color: var(--z-description-text-color);
              transition: border .3s var(--z-bezier);
              display: flex;
              align-items: center;
            `)
          ]),
          cE('right', `
            display: flex;
            margin-left: auto;
            padding-left: 32px;
          `, [
            cE('close', `
              margin-top: 8px;
            `)
          ])
        ])
      ]),
      cB('drawer-footer', `
        display: flex;
        border-top: var(--z-footer-border-top);
        transition: border .3s var(--z-bezier);
        padding: var(--z-footer-padding);
      `)
    ]),
    cM('right-placement', `
      top: 0;
      bottom: 0;
      right: 0;
    `, [
      cE('resize-trigger', `
        width: 3px;
        height: 100%;
        top: 0;
        left: 0;
        transform: translateX(-1.5px);
        cursor: ew-resize;
      `)
    ]),
    cM('left-placement', `
      top: 0;
      bottom: 0;
      left: 0;
    `, [
      cE('resize-trigger', `
        width: 3px;
        height: 100%;
        top: 0;
        right: 0;
        transform: translateX(1.5px);
        cursor: ew-resize;
      `)
    ]),
    cM('top-placement', `
      top: 0;
      left: 0;
      right: 0;
    `, [
      cE('resize-trigger', `
        width: 100%;
        height: 3px;
        bottom: 0;
        left: 0;
        transform: translateY(1.5px);
        cursor: ns-resize;
      `)
    ]),
    cM('bottom-placement', `
      left: 0;
      bottom: 0;
      right: 0;
    `, [
      cE('resize-trigger', `
        width: 100%;
        height: 3px;
        top: 0;
        left: 0;
        transform: translateY(-1.5px);
        cursor: ns-resize;
      `)
    ])
  ]),
  c('body', [
    c('>', [
      cB('drawer-container', {
        position: 'fixed'
      })
    ])
  ]),
  cB('drawer-container', `
    position: relative;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
  `, [
    c('> *', {
      pointerEvents: 'all'
    })
  ]),
  cB('drawer-mask', `
    background-color: rgba(0, 0, 0, .3);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `, [
    cM('invisible', `
      background-color: rgba(0, 0, 0, 0)
    `),
    fadeInTransition({
      enterDuration: '0.2s',
      leaveDuration: '0.2s',
      enterCubicBezier: 'var(--z-bezier-in)',
      leaveCubicBezier: 'var(--z-bezier-out)'
    })
  ])
])
