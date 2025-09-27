import { c, cB, cM } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --z-bezier
// --z-border-radius
// --z-height
// --z-width
// --z-box-shadow
// --z-box-shadow-hover
// --z-box-shadow-pressed
// --z-color
// --z-icon-size
// --z-icon-color
// --z-icon-color-hover
// --z-icon-color-pressed
// --z-text-color
export default cB('back-to-top', `
  position: fixed;
  right: 40px;
  bottom: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--z-text-color);
  transition:
    color .3s var(--z-bezier),
    box-shadow .3s var(--z-bezier),
    background-color .3s var(--z-bezier);
  border-radius: var(--z-border-radius);
  height: var(--z-height);
  min-width: var(--z-width);
  box-shadow: var(--z-box-shadow);
  background-color: var(--z-color);
`, [
  fadeInScaleUpTransition(),
  cM('transition-disabled', {
    transition: 'none !important'
  }),
  cB('base-icon', `
    font-size: var(--z-icon-size);
    color: var(--z-icon-color);
    transition: color .3s var(--z-bezier);
  `),
  c('svg', {
    pointerEvents: 'none'
  }),
  c('&:hover', {
    boxShadow: 'var(--z-box-shadow-hover)'
  }, [
    cB('base-icon', {
      color: 'var(--z-icon-color-hover)'
    })
  ]),
  c('&:active', {
    boxShadow: 'var(--z-box-shadow-pressed)'
  }, [
    cB('base-icon', {
      color: 'var(--z-icon-color-pressed)'
    })
  ])
])
