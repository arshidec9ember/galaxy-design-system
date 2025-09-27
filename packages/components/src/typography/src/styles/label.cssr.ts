import { cB } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-font-size
// --z-line-height
// --z-margin
// --z-text-color
export default cB('label', `
  box-sizing: border-box;
  transition: color .3s var(--z-bezier);
  font:  var(--z-font);
  color: var(--z-text-color);
`)
