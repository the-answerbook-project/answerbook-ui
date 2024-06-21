import { Type } from 'class-transformer'

export class Mark {
  mark?: number
  feedback?: string
  marker: string
  @Type(() => Date)
  timestamp: Date
}

export class MarkRoot {
  question: number
  part: number
  section: number
  task: number
  mark?: number
  feedback?: string
  marker: string
  @Type(() => Date)
  timestamp: Date
  @Type(() => Mark)
  history: Mark[]
}

export type MarkMap = Record<number, Record<number, Record<number, MarkRoot>>>
