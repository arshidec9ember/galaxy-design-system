import { cB } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-border-radius
// --z-color
// --z-icon-color
export default cB('icon-wrapper', `
  transition:
    color .3s var(--z-bezier),
    background-color .3s var(--z-bezier);
  background-color: var(--z-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--z-icon-color);
`)
