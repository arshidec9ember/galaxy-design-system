import { isShadowRoot } from '../../../../_utils/dom/is-shadow-root'
import { type Rect } from './interface'

const MEASURER_ID = 'v-binder-view-measurer'

type RootNode = HTMLElement | ShadowRoot | 'body'

export function ensureViewBoundingRect (root: RootNode): DOMRect {
  let viewMeasurer: HTMLElement | null = null
  const isShadow = isShadowRoot(root)
  if (viewMeasurer === null) {
    viewMeasurer = (isShadow ? (root as ShadowRoot) : document)?.getElementById(
      MEASURER_ID
    )
    if (viewMeasurer === null) {
      viewMeasurer = document.createElement('div')
      viewMeasurer.id = MEASURER_ID
      const { style } = viewMeasurer
      style.position = 'fixed'
      style.left = '0'
      style.right = '0'
      style.top = '0'
      style.bottom = '0'
      style.pointerEvents = 'none'
      style.visibility = 'hidden'

      const _root = root === 'body' ? document.body : root
      if (typeof _root.appendChild === 'function') {
        _root.appendChild(viewMeasurer)
      } else {
        throw new Error('Unable to append view-measurer in the root node.')
      }
    }
  }
  return viewMeasurer.getBoundingClientRect()
}

export function getPointRect (x: number, y: number, root: RootNode): Rect {
  const viewRect = ensureViewBoundingRect(root)
  return {
    top: y,
    left: x,
    height: 0,
    width: 0,
    right: viewRect.width - x,
    bottom: viewRect.height - y
  }
}

export function getRect (el: HTMLElement, root: RootNode): Rect {
  const elRect = el.getBoundingClientRect()
  const viewRect = ensureViewBoundingRect(root)
  return {
    left: elRect.left - viewRect.left,
    top: elRect.top - viewRect.top,
    bottom: viewRect.height + viewRect.top - elRect.bottom,
    right: viewRect.width + viewRect.left - elRect.right,
    width: elRect.width,
    height: elRect.height
  }
}

export function getParentNode (node: Node): Node | null {
  // document type
  if (node.nodeType === 9) {
    return null
  }
  return node.parentNode
}

export function getScrollParent (
  node: Node | null
): HTMLElement | Document | null {
  if (node === null) return null

  const parentNode = getParentNode(node)

  if (parentNode === null) {
    return null
  }

  // DEVNOTE: for handling shadow root
  if (parentNode.nodeType === 11) {
    return document
  }

  // Document
  if (parentNode.nodeType === 9) {
    return document
  }

  // Element
  if (parentNode.nodeType === 1) {
    // Firefox want us to check `-x` and `-y` variations as well
    const { overflow, overflowX, overflowY } = getComputedStyle(
      parentNode as HTMLElement
    )
    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return parentNode as HTMLElement
    }
  }

  return getScrollParent(parentNode)
}
