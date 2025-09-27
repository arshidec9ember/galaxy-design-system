import { cB, cM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-color
// --z-border-color
// --z-text-color
export default cB('layout-footer', `
  transition:
    box-shadow .3s var(--z-bezier),
    color .3s var(--z-bezier),
    background-color .3s var(--z-bezier),
    border-color .3s var(--z-bezier);
  color: var(--z-text-color);
  background-color: var(--z-color);
  box-sizing: border-box;
`, [
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  `),
  cM('bordered', `
    border-top: solid 1px var(--z-border-color);
  `)
])
