import { Type } from 'class-transformer'

export class Task {
  task: string
  type: string
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
