function escapeStringRegexp (string: string): string {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string')
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
}

const regexpCache: Map<string, RegExp> = new Map<string, RegExp>()

type UnSanitizedInput = string | undefined | string[]

const sanitizeArray = (
  input: UnSanitizedInput,
  inputName: string
): string[] => {
  if (!Array.isArray(input)) {
    switch (typeof input) {
      case 'string':
        input = [input]
        break
      case 'undefined':
        input = []
        break
      default:
        throw new TypeError(
          `Expected '${inputName}' to be a string or an array, but got a type of '${typeof input}'`
        )
    }
  }

  return input.filter((string: string | undefined) => {
    if (typeof string !== 'string') {
      if (typeof string === 'undefined') {
        return false
      }

      throw new TypeError(
        `Expected '${inputName}' to be an array of strings, but found a type of '${typeof string}' in the array`
      )
    }

    return true
  })
}

const makeRegexp = (
  pattern: string,
  options: { caseSensitive?: boolean }
): RegExp => {
  options = {
    caseSensitive: false,
    ...options
  }

  const cacheKey = pattern + JSON.stringify(options)

  if (regexpCache.has(cacheKey)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return regexpCache.get(cacheKey) as RegExp
  }

  const negated = pattern[0] === '!'

  if (negated) {
    pattern = pattern.slice(1)
  }

  pattern = escapeStringRegexp(pattern).replace(/\\\*/g, '[\\s\\S]*')

  const regexp = new RegExp(`^${pattern}$`, options.caseSensitive ? '' : 'i')
  ;(regexp as any).negated = negated
  regexpCache.set(cacheKey, regexp)

  return regexp
}

const baseMatcher = (
  inputs: UnSanitizedInput,
  patterns: UnSanitizedInput,
  options: { caseSensitive?: boolean, allPatterns?: boolean },
  firstMatchOnly: boolean
): string[] => {
  inputs = sanitizeArray(inputs, 'inputs') as any[]
  patterns = sanitizeArray(patterns, 'patterns') as any[]

  if (patterns.length === 0) {
    return []
  }

  const { allPatterns } = options || {}
  const result: string[] = []

  const compiledPatterns = patterns.map((pattern) =>
    makeRegexp(pattern, options)
  )

  for (const input of inputs) {
    // String is included only if it matches at least one non-negated pattern supplied.
    // Note: the `allPatterns` option requires every non-negated pattern to be matched once.
    // Matching a negated pattern excludes the string.
    let matches: boolean | undefined
    const didFit: boolean[] = [...compiledPatterns].fill(false as any) as any

    for (const [index, pattern] of compiledPatterns.entries()) {
      if (pattern.test(input)) {
        didFit[index] = true
        matches = !(pattern as any).negated

        if (!matches) {
          break
        }
      }
    }

    if (
      !(
        matches === false ||
        (matches === undefined &&
          compiledPatterns.some((pattern) => !(pattern as any).negated)) ||
        (allPatterns &&
          didFit.some(
            (yes, index) => !yes && !(compiledPatterns[index] as any).negated
          ))
      )
    ) {
      result.push(input)

      if (firstMatchOnly) {
        break
      }
    }
  }

  return result
}

export function matcher (
  inputs: UnSanitizedInput,
  patterns: UnSanitizedInput,
  options?: { caseSensitive?: boolean, allPatterns?: boolean }
): string[] {
  return baseMatcher(inputs, patterns, options || {}, false)
}

export function isMatch (
  inputs: UnSanitizedInput,
  patterns: UnSanitizedInput,
  options?: { caseSensitive?: boolean, allPatterns?: boolean }
): boolean {
  return baseMatcher(inputs, patterns, options || {}, true).length > 0
}
