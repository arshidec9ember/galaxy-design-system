// const mdLoader = require('./GdsComponentsMdLoader')
// const { marked } = require('marked')
const fs = require('fs')
const path = require('path')
const content = fs
  .readFileSync(path.resolve(__dirname, '../../../CHANGELOG.zh-CN.md'))
  .toString()
// console.log('rendered', mdLoader(content))

const mdLoader = require('../GdsComponentsMdLoader')

// function parseMdAsAnchor (content) {
//   const tokens = marked.lexer(content)
//   const titles = tokens.filter(token => token.type === 'heading' && token.depth === 2).map(token => token.text)
//   const linkTags = titles.map(title => {
//     const href = title.replace(/ /g, '-')
//     return `<z-anchor-link title="${title}" href="#${href}"/>`
//   })
//   return `<z-anchor :top="32" position="absolute" affix style="width: 132px;">${linkTags.join('\n')}</z-anchor>`
// }

console.log(mdLoader.call({ resourcePath: 'xxx' }, content, 'xxx'))
