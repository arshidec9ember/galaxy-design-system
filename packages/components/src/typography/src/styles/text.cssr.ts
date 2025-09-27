import { cB, cM } from '../../../_utils/cssr'

// vars:
// --z-text-color
// --z-font-weight-strong
// --z-font-family-mono
// --z-code-border-radius
// --z-code-text-color
// --z-code-color
// --z-code-border
// '--z-text-opacity
// '--z-text-transform'

export default cB('text', `
  transition: color .3s var(--z-bezier);
  color: var(--z-text-color);
  opacity: var(--z-text-opacity);
  text-transform: var(--z-text-transform);
`, [
  cM('strong', `
    font-weight: var(--z-font-weight-strong);
  `),
  cM('italic', {
    fontStyle: 'italic'
  }),
  cM('underline', {
    textDecoration: 'underline'
  }),
  cM('no-tag', `
    font: var(--z-font);
  `),
  cM('code', `
    display: inline-block;
    font: var(--z-font);
    transition: 
      color .3s var(--z-bezier),
      border-color .3s var(--z-bezier),
      background-color .3s var(--z-bezier);
    box-sizing: border-box;
    padding: .05em .35em 0 .35em;
    background-color: var(--z-code-color);
    border: var(--z-code-border);
  `)
])
