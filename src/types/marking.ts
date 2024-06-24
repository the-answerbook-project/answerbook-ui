import { Exclude, Transform, Type } from 'class-transformer'

function ReplaceEmptyStringWithUndefined() {
  return Transform(({ value }) => (value === '' ? undefined : value), { toPlainOnly: true })
}

export class Mark {
  mark?: number
  feedback?: string
  marker: string
  @Type(() => Date)
  timestamp: Date
}

export class MarkRoot {
  @Exclude({ toPlainOnly: true })
  id: number
  question: number
  part: number
  section: number

  @ReplaceEmptyStringWithUndefined()
  mark?: number

  @ReplaceEmptyStringWithUndefined()
  feedback?: string

  @Exclude({ toPlainOnly: true })
  marker: string

  @Exclude({ toPlainOnly: true })
  @Type(() => Date)
  timestamp: Date

  @Exclude({ toPlainOnly: true })
  @Type(() => Mark)
  history: Mark[]
}

export type MarkMap = Record<number, Record<number, Record<number, MarkRoot>>>
