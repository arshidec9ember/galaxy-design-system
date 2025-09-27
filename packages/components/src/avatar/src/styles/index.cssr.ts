import { c, cE, cB } from '../../../_utils/cssr'

// vars:
// --z-font-size
// --z-border-radius
// --z-color
// --z-color-modal
// --z-color-popover
// --z-bezier
// --z-text-color
// --z-icon-color
// --z-merged-size
export default cB('avatar', `
  width: var(--z-merged-size);
  height: var(--z-merged-size);
  color: var(--z-icon-color);
  font-size: var(--z-font-size);
  display: inline-flex;
  position: relative;
  overflow: hidden;
  text-align: center;
  border: var(--z-border);
  border-radius: var(--z-border-radius);
  --z-merged-color: var(--z-color);
  background-color: var(--z-merged-color);
  transition:
    border-color .3s var(--z-bezier),
    background-color .3s var(--z-bezier),
    color .3s var(--z-bezier);
`, [
  c('img', `
    width: 100%;
    height: 100%;
  `),
  c('.z-base-icon', `
    vertical-align: bottom;
    font-size: calc(var(--z-merged-size) - 6px);
  `),
  cE('text', `
    white-space: nowrap;
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
  `),
  cE('initial', `
    color: var(--z-text-color);
  `, [
    c('.z-title', `
    color: var(--z-text-color-avatar);
  `)
  ]),
  cB('icon', `
    vertical-align: bottom;
    font-size: calc(var(--z-merged-size) - 6px);
  `),
  cE('text', 'line-height: 1.25')
])
