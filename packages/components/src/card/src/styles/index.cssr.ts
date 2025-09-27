import { asModal, c, cB, cE, cM, insidePopover, insideModal, insideCheckbox, insideRadio } from '../../../_utils/cssr'

const ringSize = '10px'

// media-layer -> media experimental
// vars:
// --z-bezier
// --z-border-radius
// --z-color
// --z-color-modal
// --z-color-popover
// --z-text-color
// --z-line-height
// --z-padding-top
// --z-padding-bottom
// --z-padding-left
// --z-font-size
// --z-action-background-color
// --z-title-font-weight
// --z-title-font-size
// --z-title-text-color
// --z-close-size
// --z-close-icon-size
// --z-close-color-hover
// --z-close-color-pressed
// --z-close-icon-color
// --z-close-icon-color-hover
// --z-close-icon-color-pressed
// --z-border-color
// --z-box-shadow
export default c([
  cB('card-selector', [
    c('&.z-radio-group', `
      display: block;
    `)
  ]),
  cB('card', `
    font-size: var(--z-font-size);
    line-height: var(--z-line-height);
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    border-radius: var(--z-border-radius);
    background-color: var(--z-color);
    color: var(--z-text-color);
    word-break: break-word;
    overflow: hidden;
    transition: 
      color .3s var(--z-bezier),
      background-color .3s var(--z-bezier),
      box-shadow .3s var(--z-bezier),
      border-color .3s var(--z-bezier);
  `, [
    asModal({
      background: 'var(--z-color-modal)'
    }),
    cM('hoverable', [
      c('&:hover', 'box-shadow: var(--z-box-shadow);')
    ]),
    cM('has-background', `
      position: relative;
      z-index: 0;
    `, [
      c('>', [
        cE('content, footer, header, action', `
          z-index: 1;
        `)
      ]),
      cB('card-media-layer', `
        z-index: -1;
      `)
    ]),
    cM('content-divider', [
      c('>', [
        cE('content', {
          paddingTop: 'var(--z-padding-bottom)'
        })
      ])
    ]),
    cM('content-inset-divider', [
      c('>', [
        cE('content', `
          margin: 0 var(--z-padding-left);
          padding: var(--z-padding-bottom) 0;
        `)
      ])
    ]),
    cM('footer-divider', [
      c('>', [
        cE('footer', {
          paddingTop: 'var(--z-padding-bottom)'
        })
      ])
    ]),
    cM('footer-inset-divider', [
      c('>', [
        cE('footer', `
          padding: var(--z-padding-bottom) 0;
          margin: 0 var(--z-padding-left);
        `)
      ])
    ]),
    cB('card-header', `
        display: flex;
        align-items: center;
        font-size: var(--z-title-font-size);
        padding:
          var(--z-padding-top)
          var(--z-padding-left)
          var(--z-padding-bottom)
          var(--z-padding-left);
      `, [
      cE('main', `
          font-weight: var(--z-title-font-weight);
          transition: color .3s var(--z-bezier);
          flex: 1;
          min-width: 0;
          color: var(--z-title-text-color);
        `),
      cE('end', `
          display: flex;
          align-items: center;
          font-size: var(--z-font-size);
          font-weight: 400;
          transition: color .3s var(--z-bezier);
          color: var(--z-text-color);
        `),
      cE('close', `
          margin: 0 0 0 8px;
          transition:
            background-color .3s var(--z-bezier),
            color .3s var(--z-bezier);
        `)
    ]),
    cE('action', `
        display: flex;
        align-items: center;
        background-color: var(--z-action-background-color);
          transition:
            background-color .3s var(--z-bezier),
            border-color .3s var(--z-bezier);
        background-clip: padding-box;
    `),
    cE('content', `
        flex: 1;
        min-width: 0; 
        color: var(--z-text-content-color);
    `),
    c('&:first-child', [
      cE('content, footer', {
        paddingTop: 'var(--z-padding-bottom)'
      })
    ]),
    cE('content, footer', `
      padding: 0 var(--z-padding-left) var(--z-padding-bottom) var(--z-padding-left);
    `),
    cE('action', `
        padding: var(--z-padding-bottom) var(--z-padding-left);
    `),
    cE('action-area', `
        position: relative;
        cursor: pointer;
        overflow: hidden;
        user-select: none;
      `, [
      cB('card-media-layer', `
        width: 100%;
        height: 100%;
      `),
      cM('shine', `
        position: relative;
        overflow: hidden;
        background-size: 400% 400%;
        animation: n-background-shine 10s ease infinite;
        transition: 0.3s;
      `, [
        c('&::before', `
          content: '';
          opacity: 0;
          display: block;
          position: absolute;
          background: rgba(255, 255, 255, 0.5);
          width: 60px;
          height: 100%;
          top: 0;
          filter: blur(30px);
          transform: translateX(-100px) skewX(-15deg);
        `),
        c('&::after', `
          content: '';
          display: block;
          opacity: 0;
          position: absolute;
          background: rgba(255, 255, 255, 0.2);
          width: 30px;
          height: 100%;
          top: 0;
          filter: blur(5px);
          transform: translateX(-100px) skewX(-15deg);
        `),
        c('&:hover', `
        cursor: pointer;
        `, [
          c('&::before, &::after', `
            transform: translateX(300px) skewX(-15deg);
            transition: 0.7s;
            opacity: 1;
          `)
        ])
      ]),
      c('&::after', `
        content: '';
        display: block;
        position: absolute;
        left: var(--z-action-area-ripple-left);
        top: var(--z-action-area-ripple-top);
        pointer-events: none;
        background-color: var(--z-action-background-color);
        opacity: 0.75;
        width: 0;
        height: 0;
        margin-left: 0;
        margin-top: 0;
        border-radius: var(--gds-border-radius-circle);
        transition:
          background-color 0.3s var(--z-bezier),
          width 0.3s var(--z-bezier),
          height 0.3s var(--z-bezier),
          margin-left 0.3s var(--z-bezier),
          margin-top 0.3s var(--z-bezier);
      `),
      cM('hover', `
        transition: background-color 0.3s var(--z-bezier), opacity 0.3s var(--z-bezier);
      `, [
        c('&:hover', `
          background-color: var(--z-action-area-color);
        `)
      ])
    ]),
    cB('card-media', `
      overflow: hidden;
      width: 100%;
    `, [
      cM('cover', `
        object-fit: cover;
        height: 100%;
        width: 100%;
      `)
    ]),
    cB('card-media-layer', `
        overflow: hidden;
        background: var(--z-card-media-image);
        display: block;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      `, [
      c('img, video', `
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin: 0;
        padding: 0;        
      `),
      cM('background', `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: var(--z-border-radius);
      `)
    ]),
    cM('bordered', `
      box-shadow: var(--z-border-shadow);
      border: var(--z-border-width) solid var(--z-border-color);
    `, [
      c('&:target', `
        border-color: var(--z-color-target);
        box-shadow: var(--z-border-selection-shadow);
      `)
    ]),
    cM('action-divider', [
      c('>', [
        cE('action', [
          c('&:not(:first-child)', `
            border-top: 1px solid var(--z-divider-border-color);
          `)
        ])
      ])
    ]),
    cM('content-divider, content-inset-divider', [
      c('>', [
        cE('content', {
          transition: 'border-color 0.3s var(--z-bezier)'
        }, [
          c('&:not(:first-child)', `
            border-top: 1px solid var(--z-divider-border-color);
          `)
        ])
      ])
    ]),
    cM('footer-divider, footer-inset-divider', [
      c('>', [
        cE('footer', {
          transition: 'border-color 0.3s var(--z-bezier)'
        }, [
          c('&:not(:first-child)', `
            border-top: 1px solid var(--z-divider-border-color);
          `)
        ])
      ])
    ])
  ]),
  insideModal(cB('card', `
    background: var(--z-color-modal);
  `)),
  insideCheckbox([cM('checked', `
  `, [
    cB('card', `
      box-shadow: var(--z-border-selection-shadow);
    `)
  ]),
  cM('card-control', `
    width: 100%;
    display: block;
  `, [
    cB('checkbox-box', `
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
  `),
    cB('checkbox-box-wrapper', `
    height:0;
    width: 0;
    z-index: 1;
  `, [
      c('&::before', `
        content: ' ';
        position: absolute;
        left: calc(-1 * (var(--z-size) - 6px));
        top: calc(-1 * (var(--z-size) - 6px));
        width: calc(var(--z-size) + 6px);
        height: calc(var(--z-size) + 6px);
        
        box-shadow: var(--z-selector-box-shadow);
        background-color: var(--z-color);
        border-radius: var(--z-border-radius);
      `)
    ]),
    cE('label', `
          padding: 0;
          width: 100%;
      `)
  ])
  ]),
  insideRadio([
    cM('checked', `
  `, [
      cB('card', `
      box-shadow: var(--z-border-selection-shadow);
    `)
    ]),
    cM('card-control', `
      display: block;
      width: 100%;
  `, [
      cE('dot', `
      left: 0;
      top: 0;
      transform: translate(-50%, -50%);
    `),
      cE('dot-wrapper', `
      height:0;
      width: 0;
      z-index: 1;
    `, [
        c('&::before', `
          content: ' ';
          position: absolute;
          left: calc(-1 * (${ringSize} + 2px));
          top: calc(-1 * (${ringSize} + 2px));
          width: calc(${ringSize} * 2 + 4px);
          height: calc(${ringSize} * 2 + 4px);
          box-shadow: var(--z-selector-box-shadow);
          background-color: var(--z-color);
          border-radius: var(--gds-border-radius-circle);
        `)
      ]),
      cE('label', `
      padding: 0;
      width: 100%;
  `)
    ])]),
  insidePopover(cB('card', `
    background: var(--z-color-popover);
  `)),
  c('@keyframes n-background-shine', `{
    0% {
      background-position: 1% 0%;
    }
    50% {
      background-position: 99% 100%;
    }
    100% {
      background-position: 1% 0%;
    }
`)
])
