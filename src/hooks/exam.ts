import { plainToInstance } from 'class-transformer'
import { useCallback, useEffect, useMemo, useState } from 'react'

import axiosInstance from '../api/axiosInstance'
import routes from '../api/routes'
import { Answer, Question, QuestionMap, Summary } from '../types/exam'
import { buildAnswerLookupTable } from '../utils/answers'

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

export const useQuestionAnswers = (number: number | undefined) => {
  const [answers, setAnswers] = useState<Answer[]>([])
  const [answersAreLoaded, setAnswersAreLoaded] = useState(false)
  useEffect(() => {
    if (number === undefined) return
    axiosInstance
      .get(routes.questionAnswers(number))
      .then(({ data }) => setAnswers(data.map((d) => plainToInstance(Answer, d))))
      .finally(() => setAnswersAreLoaded(true))
  }, [number])

  const answersLookup: QuestionMap = useMemo(() => buildAnswerLookupTable(answers), [answers])

  const lookupAnswer = useCallback(
    (question: number, part: number, section: number, task: number) =>
      answersLookup[question]?.[part]?.[section]?.[task] ?? '',
    [answersLookup]
  )

  return { lookupAnswer, answersAreLoaded }
}

export const useAssessmentSummary = () => {
  const [summary, setSummary] = useState<Summary>()
  const [summaryIsLoaded, setSummaryIsLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.summary)
      .then(({ data }) => setSummary(plainToInstance(Summary, data)))
      .finally(() => setSummaryIsLoaded(true))
  }, [])
  return { summary, summaryIsLoaded }
}
