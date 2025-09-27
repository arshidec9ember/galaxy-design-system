import type { CNode, SsrAdapter } from './../_utils/css-render'
import { type Ref, onBeforeMount, inject, onMounted } from 'vue'
import { useSsrAdapter } from './../_utils/css-render/vue3-ssr'
import { configProviderInjectionKey } from '../config-provider/src/context'
import globalStyle from '../_styles/global/index.cssr'
import { throwError } from '../_utils'
import { cssrAnchorMetaName } from './common'

export default function useStyle (
  mountId: string,
  style: CNode,
  clsPrefixRef: Ref<string | undefined>
): void {
  if (!style) {
    if (__DEV__) throwError('use-style', 'No style is specified.')
    return
  }
  const ssrAdapter = useSsrAdapter()
  const ZConfigProvider = inject(configProviderInjectionKey, null)
  const mountStyle = (): void => {
    const clsPrefix = clsPrefixRef.value
    const rootNode = ZConfigProvider?.shadowRootNodeRef?.value as any
    style.mount({
      id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
      head: true,
      anchorMetaName: cssrAnchorMetaName,
      props: {
        bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
      },
      // parent:  if shadowMode, pass the shadowRoot element provided by ZConfigProvider
      parent: rootNode,
      ssr: ssrAdapter as SsrAdapter
    })
    if (!ZConfigProvider?.preflightStyleDisabled) {
      globalStyle.mount({
        id: 'z-global',
        head: true,
        anchorMetaName: cssrAnchorMetaName,
        parent: rootNode,
        ssr: ssrAdapter as SsrAdapter
      })
    }
  }

  // if shadowMode is true then attach the style onMounted (to get ref of config provider)
  if (ssrAdapter) {
    mountStyle()
  } else if (ZConfigProvider?.shadowMode) {
    onMounted(mountStyle)
  } else {
    onBeforeMount(mountStyle)
  }
}
