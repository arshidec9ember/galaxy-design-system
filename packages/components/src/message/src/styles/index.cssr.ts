import { c, cB, cE, cM } from '../../../_utils/cssr'
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'
import { fadeInHeightExpandTransition } from '../../../_styles/transitions/fade-in-height-expand.cssr'

// vars:
// --z-margin
// --z-bezier
// --z-padding
// --z-max-width
// --z-font-size
// --z-icon-margin
// --z-icon-size
// --z-text-color
// --z-color
// --z-box-shadow
// --z-icon-color-default
// --z-icon-color-info
// --z-icon-color-success
// --z-icon-color-warning
// --z-icon-color-error
// --z-icon-color-loading
// --z-close-size
// --z-close-icon-size
// --z-close-margin
// --z-close-color-hover
// --z-close-color-pressed
// --z-close-border-radius
// --z-close-icon-color
// --z-close-icon-color-pressed
// --z-close-icon-color-hover
// --z-border-radius
export default c([
  cB('message-wrapper', `
    margin: var(--z-margin);
    z-index: 0;
    transform-origin: top center;
    display: flex;
  `, [
    fadeInHeightExpandTransition({
      overflow: 'visible',
      originalTransition: 'transform .3s var(--z-bezier)',
      enterToProps: {
        transform: 'scale(1)'
      },
      leaveToProps: {
        transform: 'scale(0.85)'
      }
    })
  ]),
  cB('message', `
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition:
      color .3s var(--z-bezier),
      box-shadow .3s var(--z-bezier),
      background-color .3s var(--z-bezier),
      opacity .3s var(--z-bezier),
      transform .3s var(--z-bezier),
      margin-bottom .3s var(--z-bezier);
    padding: var(--z-padding);
    border-radius: var(--z-border-radius);
    flex-wrap: nowrap;
    overflow: hidden;
    max-width: var(--z-max-width);
    color: var(--z-text-color);
    background-color: var(--z-color);
    box-shadow: var(--z-box-shadow);
  `, [
    cE('content', `
      display: inline-block;
      line-height: var(--z-line-height);
      font-size: var(--z-font-size);
    `),
    cE('icon', `
      position: relative;
      margin: var(--z-icon-margin);
      height: var(--z-icon-size);
      width: var(--z-icon-size);
      font-size: var(--z-icon-size);
      flex-shrink: 0;
    `, [
      ['default', 'info', 'success', 'warning', 'error', 'loading'].map((type) =>
        cM(`${type}-type`, [
          c('> *', `
            color: var(--z-icon-color-${type});
            transition: color .3s var(--z-bezier);
          `)
        ])
      ),
      c('> *', `
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      `,
      [iconSwitchTransition()])
    ]),
    cE('close', `
      margin: var(--z-close-margin);
      transition:
        background-color .3s var(--z-bezier),
        color .3s var(--z-bezier);
      flex-shrink: 0;
    `, [
      c('&:hover', `
        color: var(--z-close-icon-color-hover);
      `),
      c('&:active', `
        color: var(--z-close-icon-color-pressed);
      `)
    ])
  ]),
  cB('message-container', `
    z-index: 6000;
    position: fixed;
    height: 0;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
  `, [
    cM('top', `
      top: 12px;
      left: 0;
      right: 0;
    `),
    cM('top-left', `
      top: 12px;
      left: 12px;
      right: 0;
      align-items: flex-start;
    `),
    cM('top-right', `
      top: 12px;
      left: 0;
      right: 12px;
      align-items: flex-end;
    `),
    cM('bottom', `
      bottom: 4px;
      left: 0;
      right: 0;
      justify-content: flex-end;
    `),
    cM('bottom-left', `
      bottom: 4px;
      left: 12px;
      right: 0;
      justify-content: flex-end;
      align-items: flex-start;
    `),
    cM('bottom-right', `
      bottom: 4px;
      left: 0;
      right: 12px;
      justify-content: flex-end;
      align-items: flex-end;
    `)
  ])
])
