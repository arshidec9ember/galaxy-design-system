import { type CNode } from './../../../_utils/css-render'
import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --z-color
// --z-text-color
// --z-description-text-color
// --z-action-text-color
// --z-title-text-color
// --z-title-font-weight
// --z-title-font-size
// --z-meta-font-size
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
export default c([
  cB('notification-container', `
    z-index: 4000;
    position: fixed;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `, [
    c('>', [
      cB('scrollbar', `
        width: initial;
        overflow: visible;
        height: -moz-fit-content !important;
        height: fit-content !important;
        max-height: 100vh !important;
      `, [
        c('>', [
          cB('scrollbar-container', `
            height: -moz-fit-content !important;
            height: fit-content !important;
            max-height: 100vh !important;
          `, [
            cB('scrollbar-content', `
              padding-top: 12px;
              padding-bottom: 33px;
            `)
          ])
        ])
      ])
    ]),
    cM('top, top-right, top-left', `
      top: 12px;
    `, [
      c('&.transitioning >', [
        cB('scrollbar', [
          c('>', [
            cB('scrollbar-container', `
              min-height: 100vh !important;
            `)
          ])
        ])
      ])
    ]),
    cM('bottom, bottom-right, bottom-left', `
      bottom: 12px;
    `, [
      c('>', [
        cB('scrollbar', [
          c('>', [
            cB('scrollbar-container', [
              cB('scrollbar-content', `
                padding-bottom: 32px;
              `)
            ])
          ])
        ])
      ]),
      cB('notification-wrapper', `
        display: flex;
        align-items: flex-end;
        margin-bottom: 0;
        margin-top: 8px;
      `)
    ]),
    cM('top, bottom', `
      left: 50%;
      transform: translateX(-50%);
    `, [
      cB('notification-wrapper', [
        c('&.notification-transition-enter-from, &.notification-transition-leave-to', `
          transform: scale(0.85);
        `),
        c('&.notification-transition-leave-from, &.notification-transition-enter-to', `
          transform: scale(1);
        `)
      ])
    ]),
    cM('top', [
      cB('notification-wrapper', `
        transform-origin: top center;
      `)
    ]),
    cM('bottom', [
      cB('notification-wrapper', `
        transform-origin: bottom center;
      `)
    ]),
    cM('top-right, bottom-right', [
      cB('notification', `
        margin-left: 28px;
        margin-right: 24px;
      `)
    ]),
    cM('top-left, bottom-left', [
      cB('notification', `
        margin-left: 24px;
        margin-right: 28px;
      `)
    ]),
    cM('top-right', `
      right: 0;
    `, [
      placementTransformStyle('top-right')
    ]),
    cM('top-left', `
      left: 0;
    `, [
      placementTransformStyle('top-left')
    ]),
    cM('bottom-right', `
      right: 0;
    `, [
      placementTransformStyle('bottom-right')
    ]),
    cM('bottom-left', `
      left: 0;
    `, [
      placementTransformStyle('bottom-left')
    ]),
    cM('scrollable', [
      cM('top-right', `
        top: 0;
      `),
      cM('top-left', `
        top: 0;
      `),
      cM('bottom-right', `
        bottom: 0;
      `),
      cM('bottom-left', `
        bottom: 0;
      `)
    ]),
    cB('notification-wrapper', `
      margin-bottom: 12px;
    `, [
      c('&.notification-transition-enter-from, &.notification-transition-leave-to', `
        opacity: 0;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      `),
      c('&.notification-transition-leave-from, &.notification-transition-enter-to', `
        opacity: 1;
      `),
      c('&.notification-transition-leave-active', `
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
      c('&.notification-transition-enter-active', `
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
    cB('notification', `
      background-color: var(--z-color);
      color: var(--z-text-color);
      transition:
        background-color .3s var(--z-bezier),
        color .3s var(--z-bezier),
        opacity .3s var(--z-bezier),
        box-shadow .3s var(--z-bezier);
      font-family: inherit;
      font-size: var(--z-font-size);
      font-weight: 400;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      flex-shrink: 0;
      width: var(--z-width);
      border-radius: var(--z-border-radius);
      box-shadow: var(--z-box-shadow);
      box-sizing: border-box;
      opacity: 1;
    `, [
      cE('avatar', [
        cB('icon', {
          color: 'var(--z-icon-color)'
        }),
        cB('base-icon', {
          color: 'var(--z-icon-color)'
        })
      ]),
      cB('notification-content-container', `
          padding: 12px;
      `),
      cM('show-avatar', [
        cB('notification-main', `
          margin-left: 32px;
          width: calc(100% - 32px);  
        `)
      ]),
      cM('closable', [
        cB('notification-main', `
          margin-right: 32px;
          width: calc(100% - 64px);  
        `),
        cE('close', `
          position: absolute;
          top: 0;
          right: 0;
          margin: var(--z-close-margin);
          transition:
            background-color .3s var(--z-bezier),
            color .3s var(--z-bezier);
        `)
      ]),
      cE('avatar', `
        position: absolute;
        top: var(--z-padding-top);
        left: var(--z-padding-left);
        width: 24px;
        height: 24px;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      `, [
        cB('icon', 'transition: color .3s var(--z-bezier);')
      ]),
      cB('notification-main', `
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin-left: 8px;
        width: calc(100% - 8px);
      `, [
        cB('notification-main-footer', `
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
        `, [
          cE('meta', `
            font-size: var(--z-meta-font-size);
            transition: color .3s var(--z-bezier-ease-out);
            color: var(--z-description-text-color);
          `),
          cE('action', `
            cursor: pointer;
            transition: color .3s var(--z-bezier-ease-out);
            color: var(--z-action-text-color);
          `)
        ]),
        cE('header', `
          transition: color .3s var(--z-bezier-ease-out);
          color: var(--z-title-text-color);
        `),
        cE('description', `
          margin-top: 8px;
          white-space: pre-wrap;
          word-wrap: break-word;
          transition: color .3s var(--z-bezier-ease-out);
          color: var(--z-description-text-color);
        `),
        cE('content', `
          margin: 4px 0 0 0;
          font-family: inherit;
          white-space: pre-wrap;
          word-wrap: break-word;
          transition: color .3s var(--z-bezier-ease-out);
          color: var(--z-text-color);
        `, [
          c('&:first-child', {
            margin: 0
          })
        ])
      ]),
      cE('progress', [
        c('.z-progress-graph', [
          c('.z-progress-graph-line-rail', `
            background-color:var(--z-color);
            height: 2px;
          `)
        ])
      ])
    ])
  ])
])

function placementTransformStyle (placement: string): CNode {
  const direction = placement.split('-')[1]
  const transformXEnter = direction === 'left' ? 'calc(-100%)' : 'calc(100%)'
  const transformXLeave = '0'
  return cB('notification-wrapper', [
    c('&.notification-transition-enter-from, &.notification-transition-leave-to', `
      transform: translate(${transformXEnter}, 0);
    `),
    c('&.notification-transition-leave-from, &.notification-transition-enter-to', `
      transform: translate(${transformXLeave}, 0);
    `)
  ])
}
