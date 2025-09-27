import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-color
// --z-text-color
// --z-border-color
// --z-toggle-button-color
// --z-toggle-bar-color
// --z-toggle-bar-color-hover
// --z-sider-overlay-shadow
// --z-sider-resize-bar-color
// --z-sider-resize-icon-color
// --z-sider-resize-border-color
// --z-sider-resize-trigger-color
// --z-sider-resize-trigger-hover-color
export default cB('layout-sider', `
  flex-shrink: 0;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  color: var(--z-text-color);
  transition:
    color .3s var(--z-bezier),
    border-color .3s var(--z-bezier),
    width .3s var(--z-bezier),
    min-width .3s var(--z-bezier),
    transform .3s var(--z-bezier),
    background-color .3s var(--z-bezier);
  background-color: var(--z-color);
  display: flex;
  justify-content: flex-end;
`, [
  c('&:hover', [
    cB('layout-toggle-button', `
      visibility: visible;
    `)
  ]),
  cE('resize-container', `
    position: absolute;
    right: -15px;
    height: 100%;
    width: 30px;
    cursor: ew-resize;
  `, [
    c('&:hover', [
      cE('resize-bar', `
        visibility: visible !important;
      `)
    ])
  ]),
  cM('overlay', `
    position: absolute;
    z-index: 2;
    height: 100%;
    box-shadow: var(--z-sider-overlay-shadow);
  `),
  cM('right-alignment', [
    cE('resize-container', `
      right: 0px;
      left: -15px;
    `),
    cM('overlay', `
      right: 0;
      box-shadow: var(--z-sider-overlay-shadow);
    `)
  ]),
  cE('resize-bar', `
      height: 100%;
      width: 2px;
      background-color: var(--z-sider-resize-bar-color);
      position: absolute;
      right: 14px;
      visibility: hidden;
  `),
  cE('resize-trigger', `
    position: absolute;
    border-radius: var(--gds-border-radius-s)
    width: 8px;
    height: 30px;
    border: 1px solid var(--z-sider-resize-border-color);
    background: var(--z-sider-resize-trigger-color);
    right: 10px;
    top: 50%;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: ew-resize;
    z-index: 1;
    color: var(--z-sider-resize-icon-color);
  `, [
    c('&:hover', `
      background: var(--z-sider-resize-trigger-hover-color);
    `),
    cB('icon', `
      opacity: 0.6;
    `)
  ]),
  cM('bordered', [
    cE('border', `
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background-color: var(--z-border-color);
      transition: background-color .3s var(--z-bezier);
    `)
  ]),
  cM('left-alignment', `
    border-right: 1px solid var(--z-border-color);
  `, [
    cM('bordered', [
      cE('border', `
        right: 0;
      `)
    ])
  ]),
  cM('right-alignment', `
    justify-content: flex-start;
    border-left: 1px solid var(--z-border-color);
  `, [
    cM('bordered', [
      cE('border', `
        left: 0;
      `)
    ]),
    cM('collapsed', [
      cB('layout-toggle-button', `
        visibility: visible;
      `, [
        cB('base-icon', `
          transform: rotate(180deg);
        `)
      ]),
      cB('layout-toggle-bar', [
        c('&:hover', [
          cE('top', {
            transform: 'rotate(-12deg) scale(1.15) translateY(-2px)'
          }),
          cE('bottom', {
            transform: 'rotate(12deg) scale(1.15) translateY(2px)'
          })
        ])
      ])
    ]),
    cB('layout-toggle-button', `
      left: 0;
      transform: translateX(-50%) translateY(-50%);
    `, [
      cB('base-icon', `
        transform: rotate(0);
      `)
    ]),
    cB('layout-toggle-bar', `
      left: -28px;
      transform: rotate(180deg);
    `, [
      c('&:hover', [
        cE('top', {
          transform: 'rotate(12deg) scale(1.15) translateY(-2px)'
        }),
        cE('bottom', {
          transform: 'rotate(-12deg) scale(1.15) translateY(2px)'
        })
      ])
    ])
  ]),
  cM('collapsed', [
    cB('layout-toggle-bar', `
      visibility: visible;
    `, [
      c('&:hover', [
        cE('top', {
          transform: 'rotate(-12deg) scale(1.15) translateY(-2px)'
        }),
        cE('bottom', {
          transform: 'rotate(12deg) scale(1.15) translateY(2px)'
        })
      ])
    ]),
    cB('layout-toggle-button', `
      visibility: visible;
    `, [
      cB('base-icon', `
        transform: rotate(0);
      `)
    ])
  ]),
  cB('layout-toggle-button', `
    transition:
      color .3s var(--z-bezier),
      right .3s var(--z-bezier),
      left .3s var(--z-bezier),
      border-color .3s var(--z-bezier),
      visibility: .3s var(--z-bezier),
      background-color .3s var(--z-bezier);
    cursor: pointer;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 44px;
    right: 0;
    border-radius: var(--gds-border-radius-circle);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--z-toggle-button-icon-color);
    background-color: var(--z-toggle-button-color);
    box-shadow: 0px 0px 1px 0px rgba(2, 13, 75, 0.30), 0px 4px 8px -2px rgba(2, 13, 75, 0.25);
    transform: translateX(50%) translateY(-50%);
    z-index: 1;
    visibility: hidden;
  `, [
    cB('base-icon', `
      transition: transform .3s var(--z-bezier);
      transform: rotate(180deg);
    `)
  ]),
  cB('layout-toggle-bar', `
    cursor: pointer;
    height: 72px;
    width: 32px;
    position: absolute;
    top: calc(50% - 36px);
    right: -28px;
  `, [
    cE('top, bottom', `
      position: absolute;
      width: 4px;
      border-radius: var(--gds-border-radius-xxs);
      height: 38px;
      left: 14px;
      transition: 
        background-color .3s var(--z-bezier),
        transform .3s var(--z-bezier);
    `),
    cE('bottom', `
      position: absolute;
      top: 34px;
    `),
    c('&:hover', [
      cE('top', {
        transform: 'rotate(12deg) scale(1.15) translateY(-2px)'
      }),
      cE('bottom', {
        transform: 'rotate(-12deg) scale(1.15) translateY(2px)'
      })
    ]),
    cE('top, bottom', {
      backgroundColor: 'var(--z-toggle-bar-color)'
    }),
    c('&:hover', [
      cE('top, bottom', {
        backgroundColor: 'var(--z-toggle-bar-color-hover)'
      })
    ])
  ]),
  cE('border', `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    transition: background-color .3s var(--z-bezier);
  `),
  cB('layout-sider-scroll-container', `
    flex-grow: 1;
    flex-shrink: 0;
    box-sizing: border-box;
    height: 100%;
    opacity: 0;
    transition: opacity .3s var(--z-bezier);
    max-width: 100%;
  `),
  cM('show-content', [
    cB('layout-sider-scroll-container', {
      opacity: 1
    })
  ]),
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  `),
  c('&.show-overlay', `
    position: absolute;
    right: 0;
    height: 100%;
  `)
])
