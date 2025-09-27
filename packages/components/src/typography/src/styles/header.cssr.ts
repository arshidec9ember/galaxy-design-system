import { cB } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-font-size
// --z-margin
// --z-font-weight
// --z-text-color
export default cB('h', `
  font-size: var(--z-font-size);
  font-weight: var(--z-font-weight);
  margin: var(--z-margin);
  transition: color .3s var(--z-bezier);
  color: var(--z-text-color);
  line-height: var(--z-line-height);
`)
