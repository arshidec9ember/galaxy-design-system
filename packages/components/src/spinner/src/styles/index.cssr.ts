import { c, cM, cB } from '../../../_utils/cssr'
import { fadeInTransition } from '../../../_styles/transitions/fade-in.cssr'

// vars:
// --z-bezier
// --z-opacity-spinning
// --z-size
// --z-color
// --z-text-color
// --z-scrim-color
export default c([
  c('@keyframes spin-rotate', `
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  `),
  cB('spinner-container', {
    position: 'relative',
    background: 'var(--z-scrim-color)'
  }, [
    cB('spinner-body', `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    `, [
      fadeInTransition()
    ])
  ]),
  cB('spinner-body', `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `),
  cB('spinner', `
    display: inline-flex;
    height: var(--z-size);
    width: var(--z-size);
    font-size: var(--z-size);
    color: var(--z-color);
  `, [
    cM('rotate', `
      animation: spin-rotate 2s linear infinite;
    `)
  ]),
  cB('spinner-description', `
    display: inline-block;
    font-weight: 500;
    color: var(--z-text-color);
    transition: color .3s var(--z-bezier);
    text-align: center;
  `),
  cB('spinner-content', `
    opacity: 1;
    transition: opacity .3s var(--z-bezier);
    pointer-events: all;
  `, [
    cM('spinning', `
      user-select: none;
      -webkit-user-select: none;
      pointer-events: none;
      opacity: var(--z-opacity-spinning);
    `)
  ])
])
