import { c, cB, cE, cM } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --z-menu-border-radius
// --z-menu-box-shadow
// --z-menu-height
// --z-menu-color
// --z-menu-divider-color
// --z-option-height
// --z-option-font-size
// --z-option-text-color
// --z-option-text-color-disabled
// --z-option-text-color-active
// --z-option-color-hover
// --z-option-check-mark-color
// --z-option-arrow-color
// --z-menu-mask-color
// --z-loading-color
export default c([
  cB('cascader-menu', `
    outline: none;
    position: relative;
    margin: 4px 0;
    display: flex;
    flex-flow: column nowrap;
    border-radius: var(--z-menu-border-radius);
    overflow: hidden;
    box-shadow: var(--z-menu-box-shadow);
    color: var(--z-option-text-color);
    background-color: var(--z-menu-color);
  `, [
    fadeInScaleUpTransition({ transformOrigin: 'inherit', duration: '0.2s' }),
    cE('empty', `
      display: flex;
      padding: 12px 32px;
      flex: 1;
      justify-content: center;
    `),
    cB('scrollbar', {
      // if width not set, cascader select menu's inner scroll area's width is
      // not correct, which won't change after select menu width is set
      width: '100%'
    }),
    cB('base-menu-mask', {
      backgroundColor: 'var(--z-menu-mask-color)'
    }),
    cB('base-loading', {
      color: 'var(--z-loading-color)'
    }),
    cB('cascader-submenu-wrapper', `
      position: relative;
      display: flex;
      flex-wrap: nowrap;
    `),
    cB('cascader-submenu', `
      height: var(--z-menu-height);
      min-width: var(--z-column-width);
      position: relative;
    `, [
      cM('virtual', `
        width: var(--z-column-width);
      `),
      cB('scrollbar-content', {
        position: 'relative'
      }),
      c('&:first-child', `
        border-top-left-radius: var(--z-menu-border-radius);
        border-bottom-left-radius: var(--z-menu-border-radius);
      `),
      c('&:last-child', `
        border-top-right-radius: var(--z-menu-border-radius);
        border-bottom-right-radius: var(--z-menu-border-radius);
      `),
      c('&:not(:first-child)', `
        border-left: 1px solid var(--z-menu-divider-color);
      `)
    ]),
    cB('cascader-menu-action', `
      box-sizing: border-box;
      padding: 8px;
      border-top: 1px solid var(--z-menu-divider-color);
    `),
    cB('cascader-option', `
      height: var(--z-option-height);
      line-height: var(--z-option-height);
      font-size: var(--z-option-font-size);
      padding: 0 0 0 18px;
      box-sizing: border-box;
      min-width: 182px;
      background-color: #0000;
      display: flex;
      align-items: center;
      white-space: nowrap;
      position: relative;
      cursor: pointer;
      transition:
        background-color .2s var(--z-bezier),
        color 0.2s var(--z-bezier);
    `, [
      cM('show-prefix', {
        paddingLeft: 0
      }),
      cE('label', `
        flex: 1 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
      `),
      cE('prefix', {
        width: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }),
      cE('suffix', {
        width: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }),
      cB('cascader-option-icon-placeholder', {
        lineHeight: 0,
        position: 'relative',
        width: '16px',
        height: '16px',
        fontSize: '16px'
      }, [
        cB('cascader-option-icon', [
          cM('checkmark', {
            color: 'var(--z-option-check-mark-color)'
          }, [
            fadeInScaleUpTransition({
              originalTransition: 'background-color .3s var(--z-bezier), box-shadow .3s var(--z-bezier)'
            })
          ]),
          cM('arrow', {
            color: 'var(--z-option-arrow-color)'
          })
        ])
      ]),
      cM('selected', {
        color: 'var(--z-option-text-color-active)'
      }),
      cM('active', {
        color: 'var(--z-option-text-color-active)',
        backgroundColor: 'var(--z-option-color-hover)'
      }),
      cM('pending', {
        backgroundColor: 'var(--z-option-color-hover)'
      }),
      c('&:hover', {
        backgroundColor: 'var(--z-option-color-hover)'
      }),
      cM('disabled', `
        color: var(--z-option-text-color-disabled);
        background-color: #0000;
        cursor: not-allowed;
      `, [
        cB('cascader-option-icon', [
          cM('arrow', {
            color: 'var(--z-option-text-color-disabled)'
          })
        ])
      ])
    ])
  ]),
  cB('cascader', `
    z-index: auto;
    position: relative;
    width: 100%;
  `)
])
