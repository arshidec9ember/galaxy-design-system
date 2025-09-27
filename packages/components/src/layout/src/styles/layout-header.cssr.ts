import { cB, cM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-text-color
// --z-color
// --z-border-color
export default cB('layout-header', `
  transition:
    color .3s var(--z-bezier),
    background-color .3s var(--z-bezier),
    box-shadow .3s var(--z-bezier),
    border-color .3s var(--z-bezier);
  box-sizing: border-box;
  width: 100%;
  background-color: var(--z-color);
  color: var(--z-text-color);
`, [
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  `),
  cM('bordered', `
    border-bottom: solid 1px var(--z-border-color);
  `)
])
