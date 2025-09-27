import { c, cB } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --z-bezier
// --z-menu-box-shadow
export default c([
  cB('auto-complete', `
    z-index: auto;
    position: relative;
    display: inline-flex;
    width: 100%;
  `),
  cB('auto-complete-menu', `
    margin: 4px 0;
    box-shadow: var(--z-menu-box-shadow);
  `, [
    fadeInScaleUpTransition({
      originalTransition: 'background-color .3s var(--z-bezier), box-shadow .3s var(--z-bezier)'
    })
  ])
])
