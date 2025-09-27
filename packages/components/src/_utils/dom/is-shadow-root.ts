export function isShadowRoot (
  element: HTMLElement | Element | ShadowRoot | string | null
): boolean {
  return element instanceof ShadowRoot
}
