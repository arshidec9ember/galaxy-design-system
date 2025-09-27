import { cB, cM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-font-size
// --z-margin
// --z-font-weight
// --z-text-color
export default cB('title', `
  font: var(--z-font);
  transition: color .3s var(--z-bezier);
  color: var(--z-text-color);
  letter-spacing: var(--z-letter-spacing);
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
  cM('delete', `
    text-decoration: line-through;
  `)
])
