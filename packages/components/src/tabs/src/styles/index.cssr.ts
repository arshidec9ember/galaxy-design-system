import { c, cM, cB, cE, cNotM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-close-size
// --z-close-color-hover
// --z-close-color-pressed
// --z-close-icon-size
// --z-close-icon-color
// --z-close-icon-color-hover
// --z-close-icon-color-pressed
// --z-bar-color
// --z-tab-font-size
// --z-tab-text-color
// --z-tab-text-color-active
// --z-tab-text-color-disabled
// --z-tab-text-color-hover
// --z-pane-text-color
// --z-tab-border-color
// --z-tab-border-radius
// --z-tab-color
// --z-tab-font-weight
// --z-tab-font-weight-active
// --z-tab-gap
// --z-tab-gap-vertical
// --z-tab-padding
// --z-pane-padding-left
// --z-pane-padding-right
// --z-pane-padding-top
// --z-pane-padding-bottom
// --z-color-segment
// --z-font-weight-strong
// --z-tab-color-segment
export default cB('tabs', `
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition:
    background-color .3s var(--z-bezier),
    border-color .3s var(--z-bezier);
`, [
  c('.z-tabs-tab__label--active', `
      color: var(--z-tab-icon-color);
    `),
  cM('segment-type', [
    cB('tabs-rail', [
      c('&.transition-disabled', [
        cB('tabs-tab', `
          transition: none;
        `)
      ])
    ])
  ]),
  cM('top', [
    cB('tab-pane', `
      padding: var(--z-pane-padding-top) var(--z-pane-padding-right) var(--z-pane-padding-bottom) var(--z-pane-padding-left);
    `)
  ]),
  cM('left', [
    cB('tab-pane', `
      padding: var(--z-pane-padding-right) var(--z-pane-padding-bottom) var(--z-pane-padding-left) var(--z-pane-padding-top);
    `)
  ]),
  cM('left, right', `
    flex-direction: row;
  `, [
    cB('tabs-bar', `
      width: 2px;
      right: 0;
      transition:
        top .2s var(--z-bezier),
        max-height .2s var(--z-bezier),
        background-color .3s var(--z-bezier);
    `),
    cB('tabs-tab', `
      padding: var(--z-tab-padding-vertical); 
    `)
  ]),
  cM('right', `
    flex-direction: row-reverse;
  `, [
    cB('tab-pane', `
      padding: var(--z-pane-padding-left) var(--z-pane-padding-top) var(--z-pane-padding-right) var(--z-pane-padding-bottom);
    `),
    cB('tabs-bar', `
      left: 0;
    `)
  ]),
  cM('bottom', `
    flex-direction: column-reverse;
    justify-content: flex-end;
  `, [
    cB('tab-pane', `
      padding: var(--z-pane-padding-bottom) var(--z-pane-padding-right) var(--z-pane-padding-top) var(--z-pane-padding-left);
    `),
    cB('tabs-bar', `
      top: 0;
    `)
  ]),
  cB('tabs-rail', `
    padding: 4px;
    border-radius: var(--z-tab-border-radius);
    width: 100%;
    background-color: var(--z-color-segment);
    transition: background-color .3s var(--z-bezier);
    display: flex;
    align-items: center;
  `, [
    cB('tabs-tab-wrapper', `
      flex-basis: 0;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    `, [
      cB('tabs-tab', `
        overflow: hidden;
        border-radius: var(--z-tab-border-radius);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `, [
        cM('active', `
          font-weight: var(--z-font-weight-strong);
          color: var(--z-tab-text-color-active);
          background-color: var(--z-tab-color-segment);
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
        `)
      ])
    ])
  ]),
  cM('flex', [
    cB('tabs-nav', {
      width: '100%'
    }, [
      cB('tabs-wrapper', {
        width: '100%'
      }, [
        cB('tabs-tab', {
          marginRight: 0
        })
      ])
    ])
  ]),
  cB('tabs-nav', `
    box-sizing: border-box;
    line-height: 1.5;
    display: flex;
    transition: border-color .3s var(--z-bezier);
  `, [
    cE('start, end', `
      display: flex;
      align-items: center;
    `),
    cE('start', 'padding-right: 16px;'),
    cE('end', 'padding-left: 16px;')
  ]),
  cM('top, bottom', [
    cB('tabs-nav-scroll-wrapper', [
      c('&::before', `
        top: 0;
        bottom: 0;
        left: 0;
        width: 20px;
      `),
      c('&::after', `
        top: 0;
        bottom: 0;
        right: 0;
        width: 20px;
      `),
      cM('shadow-start', [
        c('&::before', `
          box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
        `)
      ]),
      cM('shadow-end', [
        c('&::after', `
          box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
        `)
      ])
    ])
  ]),
  cM('left, right', [
    cB('tabs-nav-scroll-wrapper', [
      c('&::before', `
        top: 0;
        left: 0;
        right: 0;
        height: 20px;
      `),
      c('&::after', `
        bottom: 0;
        left: 0;
        right: 0;
        height: 20px;
      `),
      cM('shadow-start', [
        c('&::before', `
          box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
        `)
      ]),
      cM('shadow-end', [
        c('&::after', `
          box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
        `)
      ])
    ])
  ]),
  cB('tabs-nav-scroll-wrapper', `
    flex: 1;
    position: relative;
    overflow: hidden;
  `, [
    cB('tabs-nav-y-scroll', `
      height: 100%;
      width: 100%;
      overflow-y: auto; 
      scrollbar-width: none;
    `, [
      c('&::-webkit-scrollbar', `
        width: 0;
        height: 0;
      `)
    ]),
    c('&::before, &::after', `
      transition: box-shadow .3s var(--z-bezier);
      pointer-events: none;
      content: "";
      position: absolute;
      z-index: 1;
    `)
  ]),
  cB('tabs-nav-scroll-content', `
    display: flex;
    position: relative;
    min-width: 100%;
    width: fit-content;
    box-sizing: border-box;
  `),
  cB('tabs-wrapper', `
    display: inline-flex;
    flex-wrap: nowrap;
    position: relative;
  `),
  cB('tabs-tab-wrapper', `
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    flex-grow: 0;
  `),
  cB('tabs-tab', `
    cursor: pointer;
    white-space: nowrap;
    flex-wrap: nowrap;
    display: inline-flex;
    align-items: center;
    color: var(--z-tab-text-color);
    font-size: var(--z-tab-font-size);
    background-clip: padding-box;
    padding: var(--z-tab-padding);
    transition:
      box-shadow .3s var(--z-bezier),
      color .3s var(--z-bezier),
      background-color .3s var(--z-bezier),
      border-color .3s var(--z-bezier);
  `, [
    cNotM('disabled', [
      c('&:hover', `
        color: var(--z-tab-text-color-hover);
      `),
      c('&:active', `
        color: var(--z-tab-text-color-active);
      `)
    ]),
    cM('disabled', `
      cursor: not-allowed;
      opacity: 40%;
      color: var(--z-tab-text-color-disabled);
    `),
    cE('close', `
      margin-left: 6px;
      transition:
        background-color .3s var(--z-bezier),
        color .3s var(--z-bezier);
    `),
    cE('label', `
      display: flex;
      align-items: center;
      gap: 0.25rem;
    `),
    cE('label', [
      cB('icon', `
        font-size: 1.25rem;
        width: 1.25rem;
        height: 1.25rem;
      `, [
      ])
    ])
  ]),
  cB('tabs-bar', `
    position: absolute;
    bottom: 0;
    height: 2px;
    border-top-left-radius: var(--gds-border-radius-xs);
    border-top-right-radius: var(--gds-border-radius-xs);
    background-color: var(--z-bar-color);
    transition:
      left .2s var(--z-bezier),
      max-width .2s var(--z-bezier),
      background-color .3s var(--z-bezier);
  `, [
    c('&.transition-disabled', `
      transition: none;
    `),
    cM('disabled', `
      background-color: var(--z-tab-text-color-disabled)
    `)
  ]),
  cB('tabs-pane-wrapper', `
    position: relative;
    overflow: hidden;
    transition: max-height .2s var(--z-bezier);
  `),
  cB('tab-pane', `
    color: var(--z-pane-text-color);
    width: 100%;
    transition:
      color .3s var(--z-bezier),
      background-color .3s var(--z-bezier),
      opacity .2s var(--z-bezier);
    left: 0;
    right: 0;
    top: 0;
  `, [
    c('&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active', `
      transition:
      color .3s var(--z-bezier),
      background-color .3s var(--z-bezier),
      transform .2s var(--z-bezier),
      opacity .2s var(--z-bezier);
    `),
    c('&.next-transition-leave-active, &.prev-transition-leave-active', `
      position: absolute;
    `),
    c('&.next-transition-enter-from, &.prev-transition-leave-to', `
      transform: translateX(32px);
      opacity: 0;
    `),
    c('&.next-transition-leave-to, &.prev-transition-enter-from', `
      transform: translateX(-32px);
      opacity: 0;
    `),
    c('&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to', `
      transform: translateX(0);
      opacity: 1;
    `)
  ]),
  cB('tabs-tab-pad', `
    box-sizing: border-box;
    width: var(--z-tab-gap);
    flex-grow: 0;
    flex-shrink: 0;
  `),
  cM('line-type, bar-type', [
    cB('tabs-tab', `
      font-weight: var(--z-tab-font-weight);
      box-sizing: border-box;
      vertical-align: bottom;
    `, [
      cM('active', `
        color: var(--z-tab-text-color-active);
        font-weight: var(--z-tab-font-weight-active);
          `)
    ])
  ]),
  cB('tabs-nav', [
    cM('line-type', [
      cM('top', [
        cE('start, end', `
          border-bottom: 1px solid var(--z-tab-border-color);
        `),
        cB('tabs-nav-scroll-content', `
          border-bottom: 1px solid var(--z-tab-border-color);
        `),
        cB('tabs-bar', `
          bottom: -1px;
        `)
      ]),
      cM('left', [
        cE('start, end', `
          border-right: 1px solid var(--z-tab-border-color);
        `),
        cB('tabs-nav-scroll-content', `
          border-right: 1px solid var(--z-tab-border-color);
        `),
        cB('tabs-bar', `
          right: -1px;
        `)
      ]),
      cM('right', [
        cE('start, end', `
          border-left: 1px solid var(--z-tab-border-color);
        `),
        cB('tabs-nav-scroll-content', `
          border-left: 1px solid var(--z-tab-border-color);
        `),
        cB('tabs-bar', `
          left: -1px;
        `)
      ]),
      cM('bottom', [
        cE('start, end', `
          border-top: 1px solid var(--z-tab-border-color);
        `),
        cB('tabs-nav-scroll-content', `
          border-top: 1px solid var(--z-tab-border-color);
        `),
        cB('tabs-bar', `
          top: -1px;
        `)
      ]),
      cE('start, end', `
        transition: border-color .3s var(--z-bezier);
      `),
      cB('tabs-nav-scroll-content', `
        transition: border-color .3s var(--z-bezier);
      `)
    ]),
    cM('card-type', [
      cE('start, end', `
        transition: border-color .3s var(--z-bezier);
        border-bottom: 1px solid var(--z-tab-border-color);
      `),
      cB('tabs-pad', `
        flex-grow: 1;
        transition: border-color .3s var(--z-bezier);
        border-bottom: 1px solid var(--z-tab-border-color);
      `),
      cB('tabs-tab-pad', `
        transition: border-color .3s var(--z-bezier);
      `),
      cB('tabs-tab', `
        font-weight: var(--z-tab-font-weight);
        border: 1px solid var(--z-tab-border-color);
        background-color: var(--z-tab-color);
        box-sizing: border-box;
        position: relative;
        vertical-align: bottom;
        display: flex;
        justify-content: space-between;
        font-size: var(--z-tab-font-size);
      `, [
        cM('addable', `
          padding-left: 8px;
          padding-right: 8px;
          font-size: 16px;
        `, [
          cE('height-placeholder', `
            width: 0;
            font-size: var(--z-tab-font-size);
          `)
        ]),
        cM('closable', 'padding-right: 8px;'),
        cM('active', `
          background-color: #0000;
          font-weight: var(--z-tab-font-weight-active);
          color: var(--z-tab-text-color-active);
        `)
      ]),
      cB('tabs-scroll-padding', 'border-bottom: 1px solid var(--z-tab-border-color);')
    ]),
    cM('left, right', [
      cB('tabs-wrapper', `
        flex-direction: column;
      `, [
        cB('tabs-tab-wrapper', `
          flex-direction: column;
        `, [
          cB('tabs-tab-pad', `
            height: var(--z-tab-gap-vertical);
            width: 100%;
          `)
        ])
      ])
    ]),
    cM('top', [
      cM('card-type', [
        cB('tabs-tab', `
          border-top-left-radius: var(--z-tab-border-radius);
          border-top-right-radius: var(--z-tab-border-radius);
        `, [
          cM('active', `
            border-bottom: 1px solid #0000;
          `)
        ]),
        cB('tabs-tab-pad', `
          border-bottom: 1px solid var(--z-tab-border-color);
        `)
      ])
    ]),
    cM('left', [
      cM('card-type', [
        cB('tabs-tab', `
          border-top-left-radius: var(--z-tab-border-radius);
          border-bottom-left-radius: var(--z-tab-border-radius);
        `, [
          cM('active', `
            border-right: 1px solid #0000;
          `)
        ]),
        cB('tabs-tab-pad', `
          border-right: 1px solid var(--z-tab-border-color);
        `)
      ])
    ]),
    cM('right', [

      cM('card-type', [
        cB('tabs-tab', `
          border-top-right-radius: var(--z-tab-border-radius);
          border-bottom-right-radius: var(--z-tab-border-radius);
        `, [
          cM('active', `
            border-left: 1px solid #0000;
          `)
        ]),
        cB('tabs-tab-pad', `
          border-left: 1px solid var(--z-tab-border-color);
        `)
      ])
    ]),
    cM('bottom', [
      cM('card-type', [
        cB('tabs-tab', `
          border-bottom-left-radius: var(--z-tab-border-radius);
          border-bottom-right-radius: var(--z-tab-border-radius);
        `, [
          cM('active', `
            border-top: 1px solid #0000;
          `)
        ]),
        cB('tabs-tab-pad', `
          border-top: 1px solid var(--z-tab-border-color);
        `)
      ])
    ])
  ])
])
