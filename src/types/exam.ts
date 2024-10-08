import { Exclude, Transform, Type } from 'class-transformer'
import { addMinutes } from 'date-fns'
import { reduce, size } from 'lodash'

import { TaskType } from '../components/questionStructure/Task/constants'
import { stringToEnumValue } from '../utils/types'

export class MCQOption {
  value: string
  label: string
}

export class Task {
  instructions?: string

  @Transform(({ value }) => stringToEnumValue(TaskType, value), { toClassOnly: true })
  type: TaskType
  lines?: string

  @Type(() => MCQOption)
  choices?: MCQOption[]
}

export class Section {
  instructions?: string
  maximumMark: number

  @Type(() => Task)
  tasks: Task[]
}

export class Part {
  instructions?: string
  sections: Record<number, Section>
}

export class Question {
  instructions?: string
  title: string
  showPartWeights: boolean
  parts: Record<number, Part>

  get totalSections() {
    return reduce(this.parts, (sum, p, _) => sum + size(p.sections), 0)
  }

  get availableMarks() {
    const reduceParts = (psum, p) =>
      psum + reduce(p.sections, (sSum, s) => sSum + (s.maximumMark || 0), 0)
    return reduce(this.parts, reduceParts, 0)
  }
}

export class Rubric {
  instructions: string
  questionsToAnswer: number
}

export class Heading {
  courseCode: string
  courseName: string
  duration: number

  @Type(() => Date)
  begins: Date

  @Type(() => Rubric)
  rubric: Rubric

  get ends(): Date {
    return addMinutes(this.begins, this.duration)
  }
}

export class Answer {
  @Exclude({ toPlainOnly: true })
  id: number
  question: number
  part: number
  section: number
  task: number
  answer: string

  @Exclude({ toPlainOnly: true })
  @Type(() => Date)
  timestamp: Date
}

export type AnswerMap = Record<number, Record<number, Record<number, Record<number, Answer>>>>
