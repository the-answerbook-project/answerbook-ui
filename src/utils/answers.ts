import { reduce, set } from 'lodash'

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
