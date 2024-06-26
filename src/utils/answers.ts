import { reduce, set } from 'lodash'

import { TaskType } from '../components/questionStructure/Task/constants'
import AnswerBookRootResource from '../types/common'

export function buildResourceLookupTable<T extends AnswerBookRootResource>(
  resources: T[],
  valueAttribute?: keyof T
) {
  return reduce(
    resources,
    (res, current) => {
      const { question, part, section } = current
      let subKeys = [question, part, section]
      if (current['task'] !== undefined) subKeys = [...subKeys, current['task']]
      set(res, subKeys, valueAttribute ? current[valueAttribute] : current)
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
