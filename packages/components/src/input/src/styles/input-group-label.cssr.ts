import { cB, cE } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-group-label-color
// --z-border-radius
// --z-group-label-text-color
// --z-font-size
// --z-height
// --z-group-label-border
export default cB('input-group-label', `
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  box-sizing: border-box;
  padding: 0 12px;
  display: inline-block;
  border-radius: var(--z-border-radius);
  background-color: var(--z-group-label-color);
  color: var(--z-group-label-text-color);
  font-size: var(--z-font-size);
  line-height: var(--z-height);
  height: var(--z-height);
  flex-shrink: 0;
  white-space: nowrap;
  transition: 
    color .3s var(--z-bezier),
    background-color .3s var(--z-bezier),
    box-shadow .3s var(--z-bezier);
`, [
  cE('border', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: inherit;
    border: var(--z-group-label-border);
    transition: border-color .3s var(--z-bezier);
  `)
])
