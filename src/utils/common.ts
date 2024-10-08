const ASCII_LOWERCASE_OFFSET = 96

export function numberToLetter(num: number): string {
  if (num < 1 || num > 26) {
    throw new Error('Number out of range (1-26)')
  }
  return String.fromCharCode(ASCII_LOWERCASE_OFFSET + num)
}

export function numberToRoman(num: number): string {
  if (num <= 0 || num >= 4000) {
    throw new Error('Number out of range (must be between 1 and 3999)')
  }

  const romanNumeralMap: [number, string][] = [
    [1000, 'm'],
    [900, 'cm'],
    [500, 'd'],
    [400, 'cd'],
    [100, 'c'],
    [90, 'xc'],
    [50, 'l'],
    [40, 'xl'],
    [10, 'x'],
    [9, 'ix'],
    [5, 'v'],
    [4, 'iv'],
    [1, 'i'],
  ]

  return romanNumeralMap.reduce((result, [value, numeral]) => {
    const repeatCount = Math.floor(num / value)
    num -= repeatCount * value
    return result + numeral.repeat(repeatCount)
  }, '')
}

export function hasPrefix(collection: string[], prefix: string): boolean {
  return collection.some((s) => s.startsWith(prefix))
}
