import { camelCase } from 'lodash-es'

interface CharacterMap {
  0: '0'
  1: '1'
  2: '2'
  3: '3'
  4: '4'
  5: '5'
  6: '6'
  7: '7'
  8: '8'
  9: '9'
  a: 'A'
  b: 'B'
  c: 'C'
  d: 'D'
  e: 'E'
  f: 'F'
  g: 'G'
  h: 'H'
  i: 'I'
  j: 'J'
  k: 'K'
  l: 'L'
  m: 'M'
  n: 'N'
  o: 'O'
  p: 'P'
  q: 'Q'
  r: 'R'
  s: 'S'
  t: 'T'
  u: 'U'
  v: 'V'
  w: 'W'
  x: 'X'
  y: 'Y'
  z: 'Z'
  [key: string]: string
}

type Char =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'

type RestChars<T> = T extends `${Char}${infer P}` ? P : ''
type UpperFirst<T> = T extends `${infer P}${string}`
  ? `${CharacterMap[P]}${RestChars<T>}`
  : T

type CamelCase<S extends string> =
  S extends `${infer P1}-${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : S

type CreateKeyResult<P extends string, S extends string> = S extends 'default'
  ? P
  : `${P}${S extends `${infer First}${string}`
    ? First extends Uppercase<First>
      ? S
      : UpperFirst<CamelCase<S>>
    : ''}`

/**
 * @param prefix
 * @param suffix
 * @returns camelCase
 * @example
 * createKey('abc', createKey('abc', 'small')) // Output: abcAbcSmall
 * createKey('abc', 'x-x-x-x-small') // Output: abcXXXXSmall
 * createKey('abc', 'x-small') // Output: abcXSmall
 * createKey('abc', 'extra-small') // Output: abcExtraSmall
 */
export function createKey<P extends string, S extends string> (
  prefix: P,
  suffix: S
): CreateKeyResult<P, S> {
  return (prefix +
    (suffix === 'default'
      ? ''
      : camelCase(suffix).replace(/^[a-z]/, (startChar) =>
        startChar.toUpperCase()
      ))) as CreateKeyResult<P, S>
}
