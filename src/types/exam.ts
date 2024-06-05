import { Transform, Type } from 'class-transformer'

import { TaskType } from '../components/questionStructure/Task/constants'
import { stringToEnumValue } from './utils'

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
