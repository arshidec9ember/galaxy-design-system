import { cB, c, cM, cE, insideModal, insidePopover } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --z-bezier
// --z-dot-border
// --z-dot-border-active
// --z-dot-border-radius
// --z-dot-box-shadow
// --z-dot-color
// --z-dot-color-modal
// --z-dot-color-popover
// --z-dot-height
// --z-dot-width
// --z-fill-color
// --z-fill-color-hover
// --z-font-size
// --z-handle-box-shadow
// --z-handle-box-shadow-active
// --z-handle-box-shadow-focus
// --z-handle-box-shadow-hover
// --z-handle-color
// --z-handle-size
// --z-indicator-border-radius
// --z-indicator-box-shadow
// --z-indicator-color
// --z-indicator-text-color
// --z-rail-color
// --z-rail-color-hover
// --z-rail-height
// --z-rail-width-vertical
// --z-mark-font-size
export default c([
  cB('slider', `
    display: block;
    padding: calc((var(--z-handle-size) - var(--z-rail-height)) / 2) 0;
    position: relative;
    z-index: 0;
    width: 100%;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  `, [
    cM('reverse', [
      cB('slider-handles', [
        cB('slider-handle-wrapper', `
          transform: translate(50%, -50%);
        `)
      ]),
      cB('slider-dots', [
        cB('slider-dot', `
          transform: translateX(50%, -50%);
        `)
      ]),
      cM('vertical', [
        cB('slider-handles', [
          cB('slider-handle-wrapper', `
            transform: translate(-50%, -50%);
          `)
        ]),
        cB('slider-marks', [
          cB('slider-mark', `
            transform: translateY(calc(-50% + var(--z-dot-height) / 2));
          `)
        ]),
        cB('slider-dots', [
          cB('slider-dot', `
            transform: translateX(-50%) translateY(0);
          `)
        ])
      ])
    ]),
    cM('vertical', `
      padding: 0 calc((var(--z-handle-size) - var(--z-rail-height)) / 2);
      width: var(--z-rail-width-vertical);
      height: 100%;
    `, [
      cB('slider-handles', `
        top: calc(var(--z-handle-size) / 2);
        right: 0;
        bottom: calc(var(--z-handle-size) / 2);
        left: 0;
      `, [
        cB('slider-handle-wrapper', `
          top: unset;
          left: 50%;
          transform: translate(-50%, 50%);
        `)
      ]),
      cB('slider-rail', `
        height: 100%;
      `, [
        cE('fill', `
          top: unset;
          right: 0;
          bottom: unset;
          left: 0;
        `)
      ]),
      cM('with-mark', `
        width: var(--z-rail-width-vertical);
        margin: 0 32px 0 8px;
      `),
      cB('slider-marks', `
        top: calc(var(--z-handle-size) / 2);
        right: unset;
        bottom: calc(var(--z-handle-size) / 2);
        left: 22px;
        font-size: var(--z-mark-font-size);
      `, [
        cB('slider-mark', `
          transform: translateY(50%);
          white-space: nowrap;
        `)
      ]),
      cB('slider-dots', `
        top: calc(var(--z-handle-size) / 2);
        right: unset;
        bottom: calc(var(--z-handle-size) / 2);
        left: 50%;
      `, [
        cB('slider-dot', `
          transform: translateX(-50%) translateY(50%);
        `)
      ])
    ]),
    cM('disabled', `
      cursor: not-allowed;
      opacity: var(--z-opacity-disabled);
    `, [
      cB('slider-handle', `
        cursor: not-allowed;
      `)
    ]),
    cM('with-mark', `
      width: 100%;
      margin: 8px 0 32px 0;
    `),
    c('&:hover', [
      cB('slider-rail', {
        backgroundColor: 'var(--z-rail-color-hover)'
      }, [
        cE('fill', {
          backgroundColor: 'var(--z-fill-color-hover)'
        })
      ]),
      cB('slider-handle', {
        boxShadow: 'var(--z-handle-box-shadow-hover)'
      })
    ]),
    cM('active', [
      cB('slider-rail', {
        backgroundColor: 'var(--z-rail-color-hover)'
      }, [
        cE('fill', {
          backgroundColor: 'var(--z-fill-color-hover)'
        })
      ]),
      cB('slider-handle', {
        boxShadow: 'var(--z-handle-box-shadow-hover)'
      })
    ]),
    cB('slider-marks', `
      position: absolute;
      top: 18px;
      left: calc(var(--z-handle-size) / 2);
      right: calc(var(--z-handle-size) / 2);
    `, [
      cB('slider-mark', `
        position: absolute;
        transform: translateX(-50%);
        white-space: nowrap;
      `)
    ]),
    cB('slider-rail', `
      width: 100%;
      position: relative;
      height: var(--z-rail-height);
      background-color: var(--z-rail-color);
      transition: background-color .3s var(--z-bezier);
      border-radius: calc(var(--z-rail-height) / 2);
    `, [
      cE('fill', `
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: calc(var(--z-rail-height) / 2);
        transition: background-color .3s var(--z-bezier);
        background-color: var(--z-fill-color);
      `)
    ]),
    cB('slider-handles', `
      position: absolute;
      top: 0;
      right: calc(var(--z-handle-size) / 2);
      bottom: 0;
      left: calc(var(--z-handle-size) / 2);
    `, [
      cB('slider-handle-wrapper', `
        outline: none;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        display: flex;
      `, [
        cB('slider-handle', `
          height: var(--z-handle-size);
          width: var(--z-handle-size);
          border-radius: var(--gds-border-radius-circle);
          overflow: hidden;
          transition: box-shadow .2s var(--z-bezier), background-color .3s var(--z-bezier);
          background-color: var(--z-handle-color);
          box-shadow: var(--z-handle-box-shadow);
        `, [
          c('&:hover', `
            box-shadow: var(--z-handle-box-shadow-hover);
          `)
        ]),
        c('&:focus', [
          cB('slider-handle', `
            box-shadow: var(--z-handle-box-shadow-focus);
          `, [
            c('&:hover', `
              box-shadow: var(--z-handle-box-shadow-active);
            `)
          ])
        ])
      ])
    ]),
    cB('slider-dots', `
      position: absolute;
      top: 50%;
      left: calc(var(--z-handle-size) / 2);
      right: calc(var(--z-handle-size) / 2);
    `, [
      cM('transition-disabled', [
        cB('slider-dot', 'transition: none;')
      ]),
      cB('slider-dot', `
        transition:
          border-color .3s var(--z-bezier),
          box-shadow .3s var(--z-bezier),
          background-color .3s var(--z-bezier);
        position: absolute;
        transform: translate(-50%, -50%);
        height: var(--z-dot-height);
        width:  var(--z-dot-width);
        border-radius: var(--z-dot-border-radius);
        overflow: hidden;
        box-sizing: border-box;
        border: var(--z-dot-border);
        background-color: var(--z-dot-color);
      `, [
        cM('active', 'border: var(--z-dot-border-active);')
      ])
    ])
  ]),
  cB('slider-handle-indicator', `
    font-size: var(--z-font-size);
    padding: 6px 10px;
    border-radius: var(--z-indicator-border-radius);
    color: var(--z-indicator-text-color);
    background-color: var(--z-indicator-color);
    box-shadow: var(--z-indicator-box-shadow);
  `, [
    fadeInScaleUpTransition()
  ]),
  cB('slider-handle-indicator', `
    font-size: var(--z-font-size);
    padding: 6px 10px;
    border-radius: var(--z-indicator-border-radius);
    color: var(--z-indicator-text-color);
    background-color: var(--z-indicator-color);
    box-shadow: var(--z-indicator-box-shadow);
  `, [
    cM('top', `
      margin-bottom: 12px;
    `),
    cM('right', `
      margin-left: 12px;
    `),
    cM('bottom', `
      margin-top: 12px;
    `),
    cM('left', `
      margin-right: 12px;
    `),
    fadeInScaleUpTransition()
  ]),
  insideModal(
    cB('slider', [
      cB('slider-dot', 'background-color: var(--z-dot-color-modal);')
    ])
  ),
  insidePopover(
    cB('slider', [
      cB('slider-dot', 'background-color: var(--z-dot-color-popover);')
    ])
  )
])
