import { instanceToPlain, plainToInstance } from 'class-transformer'
import { mapValues } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

import axiosInstance from '../api/axiosInstance'
import routes from '../api/routes'
import { Answer, AnswerMap, Heading, Question } from '../types/exam'
import { buildResourceLookupTable } from '../utils/answers'

export const useAssessmentHeading = (assessmentID: string) => {
  const [heading, setHeading] = useState<Heading>()
  const [headingIsLoaded, setHeadingIsLoaded] = useState(false)
  useEffect(() => {
    if (!assessmentID) return
    axiosInstance
      .get(routes.candidate.heading(assessmentID))
      .then(({ data }) => setHeading(plainToInstance(Heading, data)))
      .finally(() => setHeadingIsLoaded(true))
  }, [assessmentID])
  return { heading, headingIsLoaded }
}

export const useQuestions = (assessmentID: string) => {
  const [questions, setQuestions] = useState<Record<number, Question>>()
  const [questionsAreLoaded, setQuestionsAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.candidate.questions(assessmentID))
      .then(({ data }) => setQuestions(mapValues(data, (q) => plainToInstance(Question, q))))
      .finally(() => setQuestionsAreLoaded(true))
  }, [assessmentID])
  return { questions, questionsAreLoaded }
}

export const useAnswers = (assessmentID: string) => {
  const [answers, setAnswers] = useState<Answer[]>([])
  const [answersAreLoaded, setAnswersAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.candidate.answers(assessmentID))
      .then(({ data }) => setAnswers(data.map((d) => plainToInstance(Answer, d))))
      .finally(() => setAnswersAreLoaded(true))
  }, [assessmentID])

  const answersLookup: AnswerMap = useMemo(() => buildResourceLookupTable(answers), [answers])

  const lookupAnswer = useCallback(
    (question: number, part: number, section: number, task: number) =>
      answersLookup?.[question]?.[part]?.[section]?.[task] ??
      plainToInstance(Answer, {
        question,
        part,
        section,
        task,
      }),
    [answersLookup]
  )

  const saveAnswer = useCallback(
    (answer: Answer) => {
      axiosInstance
        .post(routes.candidate.answers(assessmentID), instanceToPlain(answer))
        .then(({ data }) => plainToInstance(Answer, data))
        .then((response) =>
          setAnswers((as) =>
            answer.id ? as.map((a) => (a.id === response.id ? response : a)) : [...as, response]
          )
        )
        .catch(console.error)
    },
    [assessmentID]
  )

  return { answers, lookupAnswer, answersAreLoaded, saveAnswer }
}
