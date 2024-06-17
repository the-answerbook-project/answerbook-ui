import { plainToInstance } from 'class-transformer'
import { mapValues } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

import axiosInstance from '../api/axiosInstance'
import routes from '../api/routes'
import { Answer, Question, QuestionMap } from '../types/exam'
import { buildAnswerLookupTable } from '../utils/answers'

export const useStudentAnswers = (studentID: string) => {
  const [answers, setAnswers] = useState<Answer[]>([])
  const [answersAreLoaded, setAnswersAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.studentAnswers(studentID))
      .then(({ data }) => setAnswers(data.map((d) => plainToInstance(Answer, d))))
      .finally(() => setAnswersAreLoaded(true))
  }, [studentID])

  const answersLookup: QuestionMap = useMemo(() => buildAnswerLookupTable(answers), [answers])

  const lookupAnswer = useCallback(
    (question: number, part: number, section: number, task: number) =>
      answersLookup[question]?.[part]?.[section]?.[task] ?? '',
    [answersLookup]
  )

  return { lookupAnswer, answersAreLoaded }
}

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Record<number, Question>>()
  const [questionsAreLoaded, setQuestionsAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.questions)
      .then(({ data }) => setQuestions(mapValues(data, (q) => plainToInstance(Question, q))))
      .finally(() => setQuestionsAreLoaded(true))
  }, [])
  return { questions, questionsAreLoaded }
}
