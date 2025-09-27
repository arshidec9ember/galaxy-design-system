import { asModal, c, cB, cE, cM, insideModal } from '../../../_utils/cssr'

// vars:
// --z-icon-color
// --z-bezier
// --z-icon-margin
// --z-icon-size
// --z-close-border-radius
// --z-close-margin
// --z-close-size
// --z-close-color-hover
// --z-close-color-pressed
// --z-close-icon-color
// --z-close-icon-color-hover
// --z-close-icon-color-pressed
// --z-color
// --z-text-color
// --z-border-radius
// --z-padding
// --z-line-height
// --z-border
// --z-content-margin
// --z-title-font-size
// --z-title-font-weight
// --z-title-text-color
// --z-action-margin
// --z-action-space
export default c([
  cB('dialog', `
    word-break: break-word;
    line-height: var(--z-line-height);
    position: relative;
    background: var(--z-color);
    color: var(--z-text-color);
    box-sizing: border-box;
    margin: auto;
    border-radius: var(--z-border-radius);
    padding: var(--z-padding);
    transition: 
      border-color .3s var(--z-bezier),
      background-color .3s var(--z-bezier),
      color .3s var(--z-bezier);
  `, [
    cE('icon', {
      color: 'var(--z-icon-color)'
    }),
    cM('bordered', {
      border: 'var(--z-border)'
    }),
    cM('icon-top', [
      cE('close', {
        margin: 'var(--z-close-margin)'
      }),
      cE('icon', {
        margin: 'var(--z-icon-margin)'
      }),
      cE('content', {
        textAlign: 'center'
      }),
      cE('title', {
        justifyContent: 'center'
      }),
      cE('action', {
        justifyContent: 'center'
      })
    ]),
    cM('icon-left', [
      cE('icon', {
        margin: 'var(--z-icon-margin)'
      }),
      cM('closable', [
        cE('title', `
          padding-right: calc(var(--z-close-size) + 6px);
        `)
      ])
    ]),
    cE('close', `
      position: absolute;
      right: 0;
      top: 0;
      margin: var(--z-close-margin);
      transition:
        background-color .3s var(--z-bezier),
        color .3s var(--z-bezier);
      z-index: 1;
    `),
    cE('content', `
      font-size: var(--z-font-size);
      position: relative;
      word-break: break-word;
    `, [
      cM('last', 'margin-bottom: 0;')
    ]),
    cE('action', `
      display: flex;
      margin: var(--z-action-margin);
      justify-content: flex-end;
    `, [
      c('> *:not(:last-child)', {
        marginRight: 'var(--z-action-space)'
      })
    ]),
    cE('icon', {
      fontSize: 'var(--z-icon-size)',
      transition: 'color .3s var(--z-bezier)'
    }),
    cE('title', `
      transition: color .3s var(--z-bezier);
      display: flex;
      align-items: center;
      font-size: var(--z-title-font-size);
      font-weight: var(--z-title-font-weight);
      color: var(--z-title-text-color);
    `, [
      c('& + .z-dialog__content', `
        margin: var(--z-content-margin);
      `)
    ]),
    cB('dialog-icon-container', {
      display: 'flex',
      justifyContent: 'center'
    })
  ]),
  insideModal(
    cB('dialog', `
      width: 446px;
      max-width: calc(100vw - 32px);
    `)
  ),
  cB('dialog', [
    asModal(`
      width: 446px;
      max-width: calc(100vw - 32px);
    `)
  ])
])
