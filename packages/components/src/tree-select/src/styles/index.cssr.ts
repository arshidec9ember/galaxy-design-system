import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'
import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-menu-height
// --z-menu-border-radius
// --z-menu-box-shadow
// --z-menu-color
// --z-action-padding
// --z-action-text-color
// --z-action-divider-color
export default c([
  cB('tree-select', `
    z-index: auto;
    outline: none;
    width: 100%;
    position: relative;
  `),
  cB('tree-select-menu', `
    position: relative;
    overflow: hidden;
    margin: 4px 0;
    transition: box-shadow .3s var(--z-bezier), background-color .3s var(--z-bezier);
    border-radius: var(--z-menu-border-radius);
    box-shadow: var(--z-menu-box-shadow);
    background-color: var(--z-menu-color);
    outline: none;
  `, [
    cB('tree', 'max-height: var(--z-menu-height);'),
    cE('empty', `
      display: flex;
      padding: 12px 32px;
      flex: 1;
      justify-content: center;
    `),
    cE('action', `
      padding: var(--z-action-padding);
      transition: 
        color .3s var(--z-bezier);
        border-color .3s var(--z-bezier);
      border-top: 1px solid var(--z-action-divider-color);
      color: var(--z-action-text-color);
    `),
    fadeInScaleUpTransition()
  ])
])
