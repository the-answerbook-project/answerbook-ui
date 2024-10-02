import { Answer } from '../../../types/exam'
import { TaskType } from './constants'

export interface TaskBaseProps {
  type: TaskType
  answer: Answer
}

export interface AssessmentTaskProps extends TaskBaseProps {
  onAnswerUpdate: (answer: Answer) => void
  disabled?: boolean
}
