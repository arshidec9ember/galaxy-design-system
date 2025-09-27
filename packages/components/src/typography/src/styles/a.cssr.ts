import { cB } from '../../../_utils/cssr'

// vars:
// --z-text-color
// --z-bezier
export default cB('a', `
  cursor: pointer;
  transition:
    color .3s var(--z-bezier),
    text-decoration-color .3s var(--z-bezier);
  text-decoration-color: var(--z-text-color);
  color: var(--z-text-color);
  font: var(--z-font);
`)
