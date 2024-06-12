import { reduce, set } from 'lodash'

import { TaskType } from '../components/questionStructure/Task/constants'
import { Answer } from '../types/exam'

export function buildAnswerLookupTable(answers: Answer[]) {
  return reduce(
    answers,
    (res, { question, part, section, task, answer }) => {
      set(res, [question, part, section, task], answer)
      return res
    },
    {}
  )
}

export function parseAnswer(answer: string, targetTaskType: TaskType) {
  switch (targetTaskType) {
    case TaskType.INTEGER:
      return Number(answer)
    case TaskType.MULTIPLE_CHOICE_SELECT_SEVERAL:
      return answer.split(',')
    default:
      return answer
  }
}
