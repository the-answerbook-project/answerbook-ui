import { reduce, set } from 'lodash'

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
