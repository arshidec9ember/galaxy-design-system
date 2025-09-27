const hljs = require('highlight.js')
const { marked } = require('marked')

function createRenderer (wrapCodeWithCard = true) {
  const renderer = new marked.Renderer()
  const overrides = {
    table (header, body) {
      if (body) body = '<tbody>' + body + '</tbody>'
      return (
        '<div class="md-table-wrapper"><z-table :row-separator="false" class="md-table">\n' +
        '<thead>\n' +
        header +
        '</thead>\n' +
        body +
        '</z-table>\n' +
        '</div>'
      )
    },

    tablerow (content) {
      return '<tr>\n' + content + '</tr>\n'
    },

    tablecell (content, flags) {
      const type = flags.header ? 'th' : 'td'
      const tag = flags.align
        ? '<' + type + ' align="' + flags.align + '">'
        : '<' + type + '>'
      return tag + content + '</' + type + '>\n'
    },

    code: (code, language) => {
      if (language?.startsWith?.('__')) {
        language = language.replace('__', '')
      }
      const isLanguageValid = !!(language && hljs.getLanguage(language))
      if (!isLanguageValid) {
        throw new Error(
          `MdRendererError: ${language} is not valid for code - ${code}`
        )
      }
      const highlighted = hljs.highlight(code, { language }).value
      const content = `<z-code><pre v-pre>${highlighted}</pre></z-code>`
      return wrapCodeWithCard
        ? `<z-card-standard :bordered="false" class="md-card" content-style="padding: 0;background: rgb(255 213 213 / 10%);">
            <z-scrollbar x-scrollable content-style="padding: 16px;">
              ${content}
            </z-scrollbar>
          </z-card-standard>`
        : content
    },
    heading: (text, level) => {
      const id = text.replace(/ /g, '-')
      return `<z-h${level} id="${id}">${text}</z-h${level}>`
    },
    blockquote: (quote) => {
      return `<z-blockquote>${quote}</z-blockquote>`
    },
    hr: () => '<z-hr />',
    paragraph: (text) => {
      return `<z-p>${text}</z-p>`
    },
    link (href, title, text) {
      if (/^(http:|https:)/.test(href)) {
        return `<z-a href="${href}" target="_blank">${text}</z-a>`
      }
      return `<router-link to="${href}" #="{ navigate, href }" custom><z-a :href="href" @click="navigate">${text}</z-a></router-link>`
    },
    list (body, ordered, start) {
      const type = ordered ? 'z-ol' : 'z-ul'
      const startatt = ordered && start !== 1 ? ' start="' + start + '"' : ''
      return `<${type}${startatt}>\n` + body + `</${type}>\n`
    },
    listitem (text) {
      return `<z-li>${text}</z-li>`
    },
    codespan (code) {
      return `<z-text code>${code}</z-text>`
    },
    strong (text) {
      return `<z-text strong>${text}</z-text>`
    },
    checkbox (checked) {
      return `<z-checkbox :model-value="${checked}" style="vertical-align: -2px; margin-right: 8px;" />`
    }
  }

  Object.keys(overrides).forEach((key) => {
    renderer[key] = overrides[key]
  })
  return renderer
}

module.exports = createRenderer
