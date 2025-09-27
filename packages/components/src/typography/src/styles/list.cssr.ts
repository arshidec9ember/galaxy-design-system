import { c, cB, cM } from '../../../_utils/cssr'

const liStyle = c('li', {
  transition: 'color .3s var(--z-bezier)',
  lineHeight: 'var(--z-line-height)',
  margin: 'var(--z-li-margin)',
  marginBottom: 0,
  color: 'var(--z-text-color)'
})

const childStyle = [
  c('&:first-child', `
    margin-top: 0;
  `),
  c('&:last-child', `
    margin-bottom: 0;
  `)
]

// vars:
// --z-bezier
// --z-font-size
// --z-line-height
// --z-text-color
// --z-li-margin
// --z-ol-padding
// --z-ul-padding
export default c([
  cB('ol', {
    fontSize: 'var(--z-font-size)',
    padding: 'var(--z-ol-padding)'
  }, [
    cM('indent', {
      paddingLeft: 0
    }),
    liStyle,
    childStyle
  ]),
  cB('ul', {
    fontSize: 'var(--z-font-size)',
    padding: 'var(--z-ul-padding)'
  }, [
    cM('indent', {
      paddingLeft: 0
    }),
    liStyle,
    childStyle
  ])
])
