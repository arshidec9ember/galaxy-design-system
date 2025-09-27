import { c, cB } from '../../../_utils/cssr'

// vars:
// --z-color-start
// --z-color-end
// --z-bezier
export default c([
  cB('skeleton', `
    width: 100%;
    transition: background-color .3s var(--z-bezier);
    transition:
      var(--z-color-start) .3s var(--z-bezier),
      var(--z-color-end) .3s var(--z-bezier),
      background-color .3s var(--z-bezier);
  `)
])
