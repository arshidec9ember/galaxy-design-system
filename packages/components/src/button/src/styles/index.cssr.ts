import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import { fadeInWidthExpandTransition } from '../../../_styles/transitions/fade-in-width-expand.cssr'
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'
import { isBrowser } from '../../../_utils'

// vars:
// --z-bezier
// --z-bezier-ease-out
// --z-ripple-duration
// --z-opacity-disabled
// --z-text-color
// --z-text-color-hover
// --z-text-color-pressed
// --z-text-color-focus
// --z-text-color-disabled
// --z-color
// --z-color-hover
// --z-color-pressed
// --z-color-focus
// --z-color-disabled
// --z-border
// --z-border-hover
// --z-border-pressed
// --z-border-focus
// --z-border-disabled
// --z-ripple-color
// --z-border-radius
// --z-height
// --z-width
// --z-font-size
// --z-padding
// --z-icon-size
// --z-icon-margin
// --z-wave-opacity
// --z-font-weight
// --z-link-color-hover
// --z-link-color-active
// --z-padding-icon-only
// --z-box-shadow
// --z-icon-color
// private-vars:
// --z-border-color-xxx, used for custom color
export default c([
  cB('button', `
    box-sizing: border-box;
    margin: 0;
    font-weight: var(--z-font-weight);
    font-family: inherit;
    padding: var(--z-padding);
    height: var(--z-height);
    font-size: var(--z-font-size);
    border-radius: var(--z-border-radius);
    border: var(--z-border);
    box-shadow: var(--z-box-shadow);
    color: var(--z-text-color);
    background-color: var(--z-color);
    width: var(--z-width);
    white-space: nowrap;
    outline: none;
    position: relative;
    z-index: auto;
    display: inline-flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    user-select: none;
    -webkit-user-select: none;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    transition:
      color .3s var(--z-bezier),
      background-color .3s var(--z-bezier),
      opacity .3s var(--z-bezier),
      border-color .3s var(--z-bezier);
  `, [
    cB('icon', `
      color: var(--z-icon-color);
    `),
    cM('color', [
      cE('border', {
        borderColor: 'var(--z-border-color)'
      }),
      cM('disabled', [
        cE('border', {
          borderColor: 'var(--z-border-color-disabled)'
        })
      ]),
      cNotM('disabled', [
        c('&:focus-visible', `
          outline: var(--z-border-color-focus) solid 2px;
          outline-offset: 1px;
          z-index: 1;
        `),
        c('&:hover', `
          border-color: var(--z-border-color-hover);
        `),
        c('&:active', `
          border-color: var(--z-border-color-pressed);
        `),
        cM('pressed', `
          border-color: var(--z-border-color-pressed);
        `)
      ])
    ]),
    cM('a', [
      cE('icon', `
        margin-top: 0;
        margin-bottom: 0;
      `),
      c(':hover', `
        text-decoration: underline;
        color: var(--z-link-color-hover);
      `),
      c(':focus-visible', `
        border: 2px solid var(--z-color);
      `),
      c(':active', `
        text-decoration: underline;
        color: var(--z-link-color-active);
      `)
    ]),
    cM('disabled', {
      backgroundColor: 'var(--z-color-disabled)',
      color: 'var(--z-text-color-disabled)'
    }, [
      cE('border', {
        border: 'var(--z-border-disabled)'
      })
    ]),
    cNotM('disabled', [
      c('&:focus-visible', `
        outline: var(--z-border-color-focus) solid 2px;
        outline-offset: 1px;
        z-index: 1;
      `),
      c('&:hover', {
        backgroundColor: 'var(--z-color-hover)',
        color: 'var(--z-text-color-hover)',
        border: 'var(--z-border-hover)'
      }),
      c('&:active', {
        backgroundColor: 'var(--z-color-pressed)',
        color: 'var(--z-text-color-pressed)',
        border: 'var(--z-border-pressed)'
      }),
      cM('icon-only', `
        padding: var(--z-padding-icon-only);
      `),
      cM('pressed', {
        backgroundColor: 'var(--z-color-pressed)',
        color: 'var(--z-text-color-pressed)',
        border: 'var(--z-border-pressed)'
      })
    ]),
    cM('loading', 'cursor: wait;'),
    cB('base-wave', `
      pointer-events: none;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      animation-iteration-count: 1;
      animation-duration: var(--z-ripple-duration);
      animation-timing-function: var(--z-bezier-ease-out), var(--z-bezier-ease-out);
    `, [
      cM('active', {
        zIndex: 1,
        animationName: 'button-wave-spread, button-wave-opacity'
      })
    ]),
    (isBrowser && 'MozBoxSizing' in document.createElement('div').style)
      ? c('&::moz-focus-inner', {
        border: 0
      })
      : null,
    cE('icon', `
      margin: var(--z-icon-margin);
      margin-left: 0;
      height: var(--z-icon-size);
      width: var(--z-icon-size);
      max-width: var(--z-icon-size);
      font-size: var(--z-icon-size);
      position: relative;
      flex-shrink: 0;
    `, [
      cB('icon-slot', `
        height: var(--z-icon-size);
        width: var(--z-icon-size);
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
      `, [
        iconSwitchTransition({
          top: '50%',
          originalTransform: 'translateY(-50%)'
        })
      ]),
      fadeInWidthExpandTransition()
    ]),
    cE('start', `
      margin: var(--z-icon-margin);
      margin-left: 0;
      height: var(--z-icon-size);
      width: var(--z-icon-size);
      max-width: var(--z-icon-size);
      font-size: var(--z-icon-size);
      position: relative;
      flex-shrink: 0;
    `),
    cE('end', `
      margin: var(--z-icon-margin);
      margin-right: 0;
      height: var(--z-icon-size);
      width: var(--z-icon-size);
      max-width: var(--z-icon-size);
      font-size: var(--z-icon-size);
      position: relative;
      flex-shrink: 0;
    `),
    cE('content', `
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      min-width: 0;
    `, [
      c('~', [
        cE('icon', {
          margin: 'var(--z-icon-margin)',
          marginRight: 0
        })
      ])
    ]),
    cM('loading', `
      position: relative;
      opacity: 40%;
    `, [
      cE('loader', `
        margin: var(--z-icon-margin);
        position: absolute;
      `),
      cE('icon', `
        visibility: hidden;
      `),
      cE('content', `
        visibility: hidden;
      `)
    ]),
    cM('loading-inline', [
      cE('loader', `
        margin: var(--z-icon-margin);
        position: absolute;
      `)
    ]),
    cM('block', `
      display: flex;
      width: 100%;
    `),
    cM('disabled', {
      cursor: 'not-allowed',
      opacity: 'var(--z-opacity-disabled)'
    })
  ]),
  c('@keyframes button-wave-spread', {
    from: {
      boxShadow: '0 0 0.5px 0 var(--z-ripple-color)'
    },
    to: {
      // don't use exact 5px since chrome will display the animation with glitches
      boxShadow: '0 0 0.5px 4.5px var(--z-ripple-color)'
    }
  }),
  c('@keyframes button-wave-opacity', {
    from: {
      opacity: 'var(--z-wave-opacity)'
    },
    to: {
      opacity: 0
    }
  })
])
