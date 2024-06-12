import { numberToLetter, numberToRoman } from '../../utils/common'

describe('numberToLetter', () => {
  test.each([
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
    [4, 'd'],
    [5, 'e'],
    [10, 'j'],
    [26, 'z'],
  ])('should convert %i to %s', (input, expected) => {
    expect(numberToLetter(input)).toBe(expected)
  })

  test.each([[0], [27], [-1], [100]])('should throw error for invalid input %i', (input) => {
    expect(() => numberToLetter(input)).toThrow('Number out of range (1-26)')
  })
})

describe('numberToRoman', () => {
  test.each([
    [1, 'i'],
    [4, 'iv'],
    [9, 'ix'],
    [14, 'xiv'],
    [44, 'xliv'],
    [99, 'xcix'],
    [3999, 'mmmcmxcix'],
    [1000, 'm'],
    [500, 'd'],
    [100, 'c'],
    [50, 'l'],
    [10, 'x'],
    [5, 'v'],
    [40, 'xl'],
    [90, 'xc'],
    [400, 'cd'],
    [900, 'cm'],
  ])('should convert %i to %s', (input, expected) => {
    expect(numberToRoman(input)).toBe(expected)
  })

  test.each([[0], [4000], [-1], [10000]])('should throw error for invalid input %i', (input) => {
    expect(() => numberToRoman(input)).toThrow('Number out of range (must be between 1 and 3999)')
  })
})
