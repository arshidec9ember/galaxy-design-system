let PIXELS_PER_INCH: number = 96

export function parseUnit (
  str: string | number,
  out?: [number, string]
): [number, string] {
  if (!out) {
    out = [0, '']
  }

  str = String(str)
  const num = parseFloat(str)
  out[0] = num
  // eslint-disable-next-line no-useless-escape
  out[1] = str?.match(/[\d.\-\+]*\s*(.*)/)?.[1] || ''
  return out
}
function getPropertyInPX (element: HTMLElement, prop: string): number {
  const parts: [number, string] = parseUnit(
    getComputedStyle(element).getPropertyValue(prop)
  )
  return parts[0] * (toPX(parts[1], element) ?? 0)
}

// This brutal hack is needed
function getSizeBrutal (unit: string, element: HTMLElement): number {
  const testDIV = document.createElement('div')
  testDIV.style.height = `128${unit}`
  element.appendChild(testDIV)
  const size = getPropertyInPX(testDIV, 'height') / 128
  element.removeChild(testDIV)
  return size
}

/**
 * DEVNOTE: since document can be undefined
 * if we run the build in node environment.
 *  */
if (typeof document !== 'undefined') {
  PIXELS_PER_INCH = getSizeBrutal('in', document.body)
}

export function toPX (
  str: string | number,
  element: HTMLElement = document.body
): number | null {
  if (!str && str !== 0) return null

  str = (`${str}` || 'px').trim().toLowerCase()
  if ((element as unknown) === window || (element as unknown) === document) {
    element = document.body
  }

  switch (str) {
    case '%': // Ambiguous, not sure if we should use width or height
      return element.clientHeight / 100.0
    case 'ch':
    case 'ex':
      return getSizeBrutal(str, element)
    case 'em':
      return getPropertyInPX(element, 'font-size')
    case 'rem':
      return getPropertyInPX(document.body, 'font-size')
    case 'vw':
      return window.innerWidth / 100
    case 'vh':
      return window.innerHeight / 100
    case 'vmin':
      return Math.min(window.innerWidth, window.innerHeight) / 100
    case 'vmax':
      return Math.max(window.innerWidth, window.innerHeight) / 100
    case 'in':
      return PIXELS_PER_INCH
    case 'cm':
      return PIXELS_PER_INCH / 2.54
    case 'mm':
      return PIXELS_PER_INCH / 25.4
    case 'pt':
      return PIXELS_PER_INCH / 72
    case 'pc':
      return PIXELS_PER_INCH / 6
    case 'px':
      return 1
  }

  // detect number of units
  const parts: [number, string] | null = parseUnit(str)
  if (!isNaN(parts[0])) {
    if (parts[1]) {
      const px = toPX(parts[1], element)
      return typeof px === 'number' ? parts[0] * px : null
    } else {
      return parts[0]
    }
  }
  return null
}
