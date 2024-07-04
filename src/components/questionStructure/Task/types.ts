import { TaskType } from './constants'

export interface TaskBaseProps<V> {
  type: TaskType
  answer?: V
  onAnswerUpdate: (value: string) => void
  disabled?: boolean
}
