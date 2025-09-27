const path = require('path')
const fse = require('fs-extra')
const { marked } = require('marked')
const camelCase = require('lodash/camelCase')
const createRenderer = require('./md-renderer')
const projectPath = require('./project-path')
const mdRenderer = createRenderer()

async function resolveDemoTitle (fileName, demoEntryPath) {
  const demoStr = await fse.readFile(
    path.resolve(projectPath, demoEntryPath, '..', fileName),
    'utf-8'
  )
  return demoStr.match(/# ([^\n]+)/)[1]
}

async function resolveDemoInfos (literal, url, env) {
  const ids = literal
    .split('\n')
    .map((line) => line.trim())
    .filter((id) => id.length)
  const infos = []
  for (const id of ids) {
    const debug = id.includes('debug') || id.includes('Debug')
    if (env === 'production' && debug) {
      continue
    }
    let fileName
    if (id.includes('.vue')) {
      fileName = id.slice(0, -4) + '.demo.vue'
    } else {
      fileName = `${id}.demo.md`
    }
    const variable = `${camelCase(id)}Demo`
    infos.push({
      id,
      variable,
      fileName,
      title: await resolveDemoTitle(fileName, url),
      tag: `<${variable} />`,
      debug
    })
  }
  return infos
}

function genDemosTemplate (demoInfos, colSpan) {
  return `<component-demos :span="${colSpan}">${demoInfos
    .map(({ tag }) => tag)
    .join('\n')}</component-demos>`
}

function genAnchorTemplate (
  children,
  options = {
    ignoreGap: false
  }
) {
  return `
    <z-anchor
      :show-rail="true"
      :show-background="true"
      internal-scrollable
      :bound="16"
      style="width: 192px; position: sticky; top: 32px; max-height: calc(100vh - 32px - 64px); height: auto;"
      offset-target="#doc-layout"
      :ignore-gap="${options.ignoreGap}"
    >
      ${children}
    </z-anchor>
  `
}

function genDemosApiAnchorTemplate (tokens) {
  const api = [
    {
      id: 'API',
      title: 'API',
      debug: false
    }
  ]
  return api.concat(
    tokens
      .filter((token) => token.type === 'heading' && token.depth === 3)
      .map((token) => ({
        id: token.text.replace(/ /g, '-'),
        title: token.text,
        debug: false
      }))
  )
}

function genDemosAnchorTemplate (demoInfos, hasApi, tokens) {
  const links = (
    hasApi ? demoInfos.concat(genDemosApiAnchorTemplate(tokens)) : demoInfos
  ).map(
    ({ id, title, debug }) => `<z-anchor-link
      v-if="(displayMode === 'debug') || ${!debug}"
      title="${title}"
      href="#${id}"
    />`
  )
  return genAnchorTemplate(links.join('\n'), {
    ignoreGap: hasApi
  })
}

function genPageAnchorTemplate (tokens) {
  const titles = tokens
    .filter((token) => token.type === 'heading' && token.depth === 2)
    .map((token) => token.text)
  const links = titles.map((title) => {
    const href = title.replace(/ /g, '-')
    return `<z-anchor-link title="${title}" href="#${href}"/>`
  })
  return genAnchorTemplate(links.join('\n'), { ignoreGap: true })
}

function genScript (
  demoInfos,
  components = [],
  url,
  forceShowAnchor,
  htmlContent,
  overviewHtmlContent,
  figmaLink
) {
  const showAnchor = !!(demoInfos.length || forceShowAnchor)
  const importStmts = demoInfos
    .map(({ variable, fileName }) => `import ${variable} from './${fileName}'`)
    .concat(components.map(({ importStmt }) => importStmt))
    .join('\n')
  const componentStmts = demoInfos
    .map(({ variable }) => variable)
    .concat(components.map(({ ids }) => ids).flat())
    .join(',\n')

  const rootPath = path.resolve(__dirname, '../../src')
  const script = `<script>
${importStmts}
import { computed } from 'vue'
import { useMemo } from '@zeta-gds/components/_external-dependencies/vooks'
import { useDisplayMode } from '${rootPath}/store'
import { useIsMobile } from '${rootPath}/utils/composables'
import { useRoute } from 'vue-router'

export default {
  components: {
    ${componentStmts}
  },
  setup () {
    const isMobileRef = useIsMobile()
    const route = useRoute()
    const showAnchorRef = useMemo(() => {
      if (isMobileRef.value) return false
      return ${showAnchor}
    })
    const useSmallPaddingRef = isMobileRef
    return {
      htmlContent: \`${htmlContent}\`,
      overviewHtmlContent: \`${overviewHtmlContent}\`,
      figmaLink: \`${figmaLink}\`,
      route,
      showAnchor: showAnchorRef,
      displayMode: useDisplayMode(),
      wrapperStyle: computed(() => {
        return !useSmallPaddingRef.value
          ? 'display: flex; flex-wrap: nowrap; padding-left: 2px;'
          : 'padding: 16px 16px 24px 16px;'
      }),
      contentStyle: computed(() => {
        return showAnchorRef.value
          ? 'width: calc(100% - 228px); margin-right: 36px;'
          : 'width: 100%; padding-right: 12px;'; 
      }),
      paneWrapperStyle: "overflow: visible;",
      url: ${JSON.stringify(url)}
    }
  }
}
</script>`
  return script
}

async function processToken (tokens, type, lang, url, env, colSpan) {
  const tokenIndex = tokens.findIndex(
    (token) => token.type === type && token.lang === lang
  )
  let infos = []

  if (~tokenIndex) {
    const resolvedInfos = await resolveDemoInfos(
      tokens[tokenIndex].text,
      url,
      env
    )
    tokens.splice(tokenIndex, 1, {
      type: 'html',
      pre: false,
      text: genDemosTemplate(resolvedInfos, colSpan)
    })
    infos = resolvedInfos
  }

  return infos
}
async function convertMd2ComponentDocumentation (
  text,
  url,
  env = 'development'
) {
  const forceShowAnchor = !!~text.search('<!--anchor:on-->')
  const colSpan = ~text.search('<!--single-column-->') ? 1 : 2
  const hasApi = !!~text.search('## API')
  const tokens = marked.lexer(text)
  // resolve external components
  const componentsIndex = tokens.findIndex(
    (token) => token.type === 'code' && token.lang === 'component'
  )
  let components = []
  if (~componentsIndex) {
    components = tokens[componentsIndex].text
    components = components
      .split('\n')
      .map((component) => {
        const [ids, importStmt] = component.split(':')
        if (!ids.trim()) throw new Error('No component id')
        if (!importStmt.trim()) throw new Error('No component source url')
        return {
          ids: ids.split(',').map((id) => id.trim()),
          importStmt: importStmt.trim()
        }
      })
      .filter(({ ids, importStmt }) => ids && importStmt)
    tokens.splice(componentsIndex, 1)
  }
  const figmaIndex = tokens.findIndex(
    (token) => token.type === 'code' && token.lang === 'figma'
  )

  const cautionAlertIndex = tokens.findIndex(
    (token) => token.type === 'heading' && token.text === 'CautionAlert'
  )
  let cautionAlert = false
  if (~cautionAlertIndex) {
    cautionAlert = true

    tokens.splice(cautionAlertIndex, 1)
  }
  const htmlIndex = tokens.findIndex(
    (token) => token.type === 'code' && token.lang === 'inject-html'
  )
  let htmlFilePath = ''
  let htmlContent = ''
  if (~htmlIndex) {
    htmlFilePath = tokens[htmlIndex].text
    tokens.splice(htmlIndex, 1)
    const htmlFile = path.resolve(__dirname, '../../src/pages', htmlFilePath)
    const rawHtmlContent = fse.readFileSync(htmlFile, 'utf-8')
    htmlContent = rawHtmlContent.replace(
      /src="attachments/g,
      'src="/src/assets/attachments'
    )
  }

  const overviewIndex = tokens.findIndex(
    (token) => token.type === 'code' && token.lang === 'overview-html'
  )
  let overviewHtmlFilePath = ''
  let overviewHtmlContent = ''
  if (~overviewIndex) {
    overviewHtmlFilePath = tokens[overviewIndex].text
    tokens.splice(overviewIndex, 1)
    const htmlFilePath = path.resolve(
      __dirname,
      '../../../../packages/components/src',
      overviewHtmlFilePath
    )
    const rawHtmlContent = fse.readFileSync(htmlFilePath, 'utf-8')
    overviewHtmlContent = rawHtmlContent.replace(
      /src="attachments/g,
      'src="/src/assets/attachments'
    )
  }
  // add edit on github button on title
  const titleIndex = tokens.findIndex(
    (token) => token.type === 'heading' && token.depth === 1
  )
  let figmaLink = ''
  if (~titleIndex) {
    if (~figmaIndex) {
      const figmaId = tokens[figmaIndex].text
      figmaLink = figmaId
      tokens.splice(figmaIndex, 1)
    }

    figmaLink = figmaLink.replace('https://', '')

    const titleText = JSON.stringify(tokens[titleIndex].text)
    const descriptionText = JSON.stringify(
      tokens[titleIndex + 1].type === 'paragraph'
        ? tokens[titleIndex + 1]?.text || ''
        : ''
    )
    const btnTemplate = `<edit-on-bitbucket-header relative-url="${url}" description=${descriptionText} text=${titleText} :alert=${cautionAlert}></edit-on-bitbucket-header>`
    tokens.splice(titleIndex, 2, {
      type: 'html',
      pre: false,
      text: btnTemplate
    })
  }

  const demosIndex = await processToken(
    tokens,
    'code',
    'demo',
    url,
    env,
    colSpan
  )
  const customizationIndex = await processToken(
    tokens,
    'code',
    'customization',
    url,
    env,
    colSpan
  )

  const demoInfos = demosIndex.concat(customizationIndex)

  const introductionToken = tokens[titleIndex]
  tokens.splice(titleIndex, 1)

  let introductionTemplate = ''
  if (introductionToken) {
    introductionTemplate = marked.parser([introductionToken], {
      gfm: true,
      renderer: mdRenderer
    })
  }
  const docMainTemplate = marked.parser(tokens, {
    gfm: true,
    renderer: mdRenderer
  })
  // generate page
  const docTemplate = `
<template>
  <div class="doc-wrapper">
    <div class="introduction">
      ${introductionTemplate}
    </div>
    <z-tabs class="tabs" :pane-wrapper-style="paneWrapperStyle" v-if="route.path.includes('/components')" default-model-value="${'implementation'}" variant="line" animated>
      <z-tab-pane name="implementation" tab="Implementation">
        <div
          class="doc"
          :style="wrapperStyle"
        >
          <div :style="contentStyle">
            ${docMainTemplate}
          </div>
          <div style="width: 192px;" v-if="showAnchor">
            ${
              demoInfos.length
                ? genDemosAnchorTemplate(demoInfos, hasApi, tokens)
                : genPageAnchorTemplate(tokens)
            }
          </div>
        </div>
      </z-tab-pane>
      <z-tab-pane name="design-documentation" tab="Design Documentation">
        <div v-if="overviewHtmlContent" v-html="overviewHtmlContent"></div>
        <div v-else>
          Design documentation is in progress for this component.
        </div>
      </z-tab-pane>
      <z-tab-pane name="figma" tab="Figma" :disabled="!figmaLink">
        <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="540" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2F${figmaLink}" allowfullscreen></iframe>
      </z-tab-pane>
    </z-tabs>
    <div v-else>${docMainTemplate}</div>
    <div v-if="htmlContent" v-html="htmlContent"></div>
  </div>
</template>`
  const docScript = await genScript(
    demoInfos,
    components,
    url,
    forceShowAnchor,
    htmlContent,
    overviewHtmlContent,
    figmaLink
  )
  return `${docTemplate}\n\n${docScript}`
}

module.exports = convertMd2ComponentDocumentation
