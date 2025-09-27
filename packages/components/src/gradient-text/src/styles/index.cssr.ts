import { cB } from '../../../_utils/cssr'

// vars:
// --z-font-weight
// --z-rotate
// --z-bezier
// --z-color-start
// --z-color-end
export default cB('gradient-text', `
  display: inline-block;
  font-weight: var(--z-font-weight);
  -webkit-background-clip: text;
  background-clip: text;
  color: #0000;
  white-space: nowrap;
  background-image: linear-gradient(var(--z-rotate), var(--z-color-start) 0%, var(--z-color-end) 100%);
  transition:
    --z-color-start .3s var(--z-bezier),
    --z-color-end .3s var(--z-bezier);
`)
