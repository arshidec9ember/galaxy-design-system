import { cB, cM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-color
// --z-text-color
export default cB('layout', `
  color: var(--z-text-color);
  background-color: var(--z-color);
  box-sizing: border-box;
  position: relative;
  z-index: auto;
  flex: auto;
  overflow: hidden;
  transition:
    box-shadow .3s var(--z-bezier),
    background-color .3s var(--z-bezier),
    color .3s var(--z-bezier);
`, [
  cB('layout-scroll-container', `
    overflow-x: hidden;
    box-sizing: border-box;
    height: 100%;
  `),
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `)
])
