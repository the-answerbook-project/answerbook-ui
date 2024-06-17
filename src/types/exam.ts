import { Transform, Type } from 'class-transformer'
import { addMinutes } from 'date-fns'

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
}

export class Rubric {
  instructions: string
  questionsToAnswer: number
}

export class Summary {
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
  question: number
  part: number
  section: number
  task: number
  answer: string
}

export type TaskMap = Record<number, string>
export type SectionMap = Record<number, TaskMap>
export type PartMap = Record<number, SectionMap>
export type QuestionMap = Record<number, PartMap>
