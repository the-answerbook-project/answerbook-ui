import { Answer } from '../../../types/exam'
import { TaskType } from './constants'

export interface TaskBaseProps {
  type: TaskType
  answer: Answer
  onAnswerUpdate: (answer: Answer) => void
  disabled?: boolean
}
