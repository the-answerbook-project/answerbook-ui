import { TaskType } from './constants'

export interface TaskBaseProps<V> {
  type: TaskType
  answer?: V
  onAnswerUpdate: (value: V) => void
  disabled?: boolean
}
