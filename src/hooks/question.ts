import { plainToInstance } from 'class-transformer'
import { useEffect, useState } from 'react'

import axiosInstance from '../api/axiosInstance'
import routes from '../api/routes'
import { Question } from '../types/exam'

export const useQuestion = (number: number | undefined) => {
  const [question, setQuestion] = useState<Question>()
  const [questionIsLoaded, setQuestionIsLoaded] = useState(false)
  useEffect(() => {
    if (number === undefined) return
    axiosInstance
      .get(routes.question(number))
      .then(({ data }) => setQuestion(plainToInstance(Question, data)))
      .finally(() => setQuestionIsLoaded(true))
  }, [number])
  return { question, questionIsLoaded }
}
