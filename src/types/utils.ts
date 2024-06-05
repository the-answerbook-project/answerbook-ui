export function stringToEnumValue<T extends { [s: string]: unknown }>(
  enumObj: T,
  value: string
): T[keyof T] {
  const values = Object.values(enumObj)
  if (values.includes(value as any)) return value as unknown as T[keyof T]
  throw new Error(`Invalid value: ${value}`)
}
