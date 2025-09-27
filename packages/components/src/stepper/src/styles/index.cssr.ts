import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'

// vars:
// --z-bezier
// --z-description-text-color
// --z-header-text-color
// --z-indicator-border-color
// --z-indicator-color
// --z-indicator-icon-size
// --z-indicator-index-font-size
// --z-indicator-size
// --z-indicator-text-color
// --z-splitor-color
// --z-step-header-font-size
// --z-step-header-font-weight
export default cB('stepper', `
  width: 100%;
  display: flex;
`, [
  cB('step', `
    position: relative;
    display: flex;
    flex: 1;
  `, [
    cM('clickable', '', [
      c('&:hover', `
        color: var(--z-hover-indicator-color);
    `,
      [
        cB('step-indicator', `
       `, [
          cB('step-indicator-slot', '', [
            cE('index', `
            background-color: var(--z-hover-indicator-color)`
            )
          ])
        ]),
        cB('step-splitor', 'color: var(--z-hover-text-color);', []),
        cB('step-content', '', [
          cB('step-content-header', '', [
            cE('title', `
                color: var(--z-hover-text-color);
            `)
          ]),
          cE('description', `
            color: var(--z-hover-description-color);
        `)
        ])
      ])
    ]),

    cM('disabled', `
      cursor: not-allowed;
      opacity: 0.4;
    `),
    cM('clickable', `
      cursor: pointer;
    `),
    c('&:last-child', [
      cB('step-splitor', 'display: none;')
    ])
  ]),
  cB('step-splitor', `
    
    margin-top: calc(var(--z-step-header-font-size) / 2);
    height: 1px;
    flex: 1;
    align-self: flex-start;
    margin-left: 12px;
    margin-right: 12px;
    transition:
      color .3s var(--z-bezier),
      background-color .3s var(--z-bezier);
  `),
  cB('step-content', 'flex: 1', [
    cB('step-content-header', `
      color: var(--z-header-text-color);
      margin-top: calc(var(--z-indicator-size) / 2 - var(--z-step-header-font-size) / 2);
      line-height: var(--z-step-header-font-size);
      font-size: var(--z-step-header-font-size);
      position: relative;
      display: flex;
      font-weight: var(--z-step-header-font-weight);
      margin-left: 9px;
      transition:
        color .3s var(--z-bezier),
        background-color .3s var(--z-bezier);
    `, [
      cE('title', `
        white-space: nowrap;
        font-weight: var(--z-step-header-font-weight);
        color: var(--z-header-text-color);
        margin: 0;
        flex: 0;
      `)
    ]),
    cE('description', `
      color: var(--z-description-text-color);
      margin-top: 12px;
      margin-left: 9px;
      transition:
        color .3s var(--z-bezier),
        background-color .3s var(--z-bezier);
    `)
  ]),
  cB('step-indicator', `
    height: var(--z-indicator-size);
    width: var(--z-indicator-size);
    border-radius: var(--gds-border-radius-circle);
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color .3s var(--z-bezier);
  `, [
    cB('step-indicator-slot', `
      position: relative;
      width: var(--z-indicator-icon-size);
      height: var(--z-indicator-icon-size);
      font-size: var(--z-indicator-icon-size);
      line-height: var(--z-indicator-icon-size);
    `, [
      cE('index', `
        display: inline-block;
        text-align: center;
        position: absolute;
        background-color: var(--z-indicator-color);
        box-shadow: inset 0 0 0 1px var(--z-indicator-border-color);
        border-radius: var(--gds-border-radius-circle);
        left: 0;
        top: 0;
        white-space: nowrap;
        box-sizing: border-box;
        width: calc(var(--z-indicator-icon-size));
        height:  calc(var(--z-indicator-icon-size));
        color: var(--z-indicator-text-color);
        transition: color .3s var(--z-bezier);
        justify-content: center;
        align-items: center;
        padding-left: 0.0625rem;
        display: inline-flex;
      `, [
        iconSwitchTransition()
      ]),
      cB('icon', `
        color: var(--z-indicator-icon-color);
        transition: color .3s var(--z-bezier);
      `, [
        iconSwitchTransition()
      ]),
      cB('base-icon', `
        color: var(--z-indicator-text-color);
        transition: color .3s var(--z-bezier);
      `, [
        iconSwitchTransition()
      ])
    ])
  ]),
  cM('horizontal', `
    `, [
    cB('step', `
        padding-bottom: 8px;
        flex-direction: column;
        align-items: center;
        text-align: center;
    `),
    cB('step-content', '', [
      cB('step-content-header', `
        padding-top: 8px;
      `, [
        cE('title', `
            width: 100%;
            text-align: center;
            flex: unset;
            white-space: unset;
          `)
      ]),
      cE('description', '')
    ]),
    cNotM('show-description', [
      c('>', [
        cB('step', 'padding-bottom: 8px;')
      ])
    ]),
    c('>', [
      cB('step', 'margin-bottom: 16px;', [
        c('&:last-child', 'margin-bottom: 0;'),
        c('>', [
          cB('step-indicator', [
            c('>', [
              cB('step-splitor', `
                  position: absolute;
                  margin: 0 !important;
                  height: 0;
                  top: calc(var(--z-indicator-size)/2);
                  left: calc((100% / 2) + var(--z-indicator-size));
                  border-bottom: 1px var(--z-splitor-border-style) var(--z-splitor-color);
                  width: calc(100% - var(--z-indicator-size) * 2 );
                `)
            ])
          ]),
          cB('step-content', [
            cE('description', 'margin-top: 8px;')
          ])
        ])
      ])
    ])
  ]),
  cM('vertical', 'flex-direction: column;', [
    cNotM('show-description', [
      c('>', [
        cB('step', 'padding-bottom: 8px;')
      ])
    ]),
    c('>', [
      cB('step', 'margin-bottom: var(--gds-space-2);', [
        c('&:last-child', 'margin-bottom: 0;'),
        c('>', [
          cB('step-indicator', [
            c('>', [
              cB('step-splitor', `
                position: absolute;
                bottom: -14px;
                width: 1px;
                margin: 0;
                border-left: 1px var(--z-splitor-border-style) var(--z-splitor-color);
                left: calc(var(--z-indicator-size) / 2);
                height: calc(100% - (var(--z-indicator-size) / 2));
              `)
            ])
          ]),
          cB('step-content', [
            cB('step-content-header', `
              margin-top:  var(--gds-space-1);
              `, [
              cE('title', `
                  font-size: var(--gds-font-size-14);
                  line-height: var(--gds-line-height-20);
              `)
            ]),
            cE('description', `
              margin-top: 8px;
              margin-bottom: 2px;
              `
            )
          ])
        ])
      ])
    ])
  ])
])
