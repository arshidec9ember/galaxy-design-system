import { c, cB, cM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-color
// --z-opacity
export default cB('icon', `
  height: 1em;
  width: 1em;
  line-height: 1em;
  text-align: center;
  display: inline-block;
  position: relative;
  fill: currentColor;
  transform: translateZ(0);
`, [
  cM('color-transition', {
    transition: 'color .3s var(--z-bezier)'
  }),
  cM('opacity', {
    color: 'var(--z-color)'
  }, [
    c('svg', {
      opacity: 'var(--z-opacity)',
      transition: 'opacity .3s var(--z-bezier)'
    })
  ]),
  c('svg', {
    height: '1em',
    width: '1em'
  })
])
