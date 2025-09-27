import { cB, c } from '../../../_utils/cssr'
import { fadeInTransition } from '../../../_styles/transitions/fade-in.cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --z-bezier-ease-out
// --z-box-shadow-container
// --z-color
// --z-text-color
export default c([
  cB('modal-container', `
    position: fixed;
    left: 0;
    top: 0;
    height: 0;
    width: 0;
    display: flex;
  `),
  cB('modal-mask', `
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(2, 13, 77, .4);
  `, [
    fadeInTransition({
      enterDuration: '.25s',
      leaveDuration: '.25s',
      enterCubicBezier: 'var(--z-bezier-ease-out)',
      leaveCubicBezier: 'var(--z-bezier-ease-out)'
    })
  ]),
  cB('modal-body-wrapper', `
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: visible;
  `, [
    cB('modal-scroll-content', `
      min-height: 100%;
      display: flex;
      position: relative;
    `)
  ]),
  cB('modal', `
    position: relative;
    align-self: center;
    color: var(--z-text-color);
    margin: auto;
    box-shadow: var(--z-box-shadow-container);
  `, [
    fadeInScaleUpTransition({
      duration: '.25s',
      enterScale: '.5'
    })
  ])
])
