import { c, cB, cM } from '../../../_utils/cssr'

// vars:
// --z-bezier
// --z-font-size
// --z-line-height
// --z-prefix-color
// --z-text-color
export default cB('blockquote', `
  font-size: var(--z-font-size);
  line-height: var(--z-line-height);
  margin: 0;
  margin-top: 12px;
  margin-bottom: 12px;
  box-sizing: border-box;
  padding-left: 12px;
  border-left: 4px solid var(--z-prefix-color);
  color: var(--z-text-color);
  transition:
    color .3s var(--z-bezier),
    border-color .3s var(--z-bezier);
`, [
  c('&:first-child', {
    marginTop: 0
  }),
  c('&:last-child', {
    marginBottom: 0
  }),
  cM('indent', {
    marginLeft: '-16px'
  })
])
