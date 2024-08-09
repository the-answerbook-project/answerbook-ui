import { plainToInstance } from 'class-transformer'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import axiosInstance from '../api/axiosInstance'
import routes from '../api/routes'
import { Answer, AnswerMap, Question, Summary } from '../types/exam'
import { buildResourceLookupTable } from '../utils/answers'
import { DEFAULT_TEST_USERNAME } from '../utils/globalConstants'
import { useAssessmentParams } from './assessmentParams'

export const useQuestion = (number: number | undefined) => {
  const { assessmentID } = useAssessmentParams()
  const [question, setQuestion] = useState<Question>()
  const [questionIsLoaded, setQuestionIsLoaded] = useState(false)
  useEffect(() => {
    if (number === undefined) return
    axiosInstance
      .get(routes.question(assessmentID, number))
      .then(({ data }) => setQuestion(plainToInstance(Question, data)))
      .finally(() => setQuestionIsLoaded(true))
  }, [assessmentID, number])
  return { question, questionIsLoaded }
}

export const useQuestionAnswers = (number: number | undefined) => {
  const { assessmentID } = useAssessmentParams()

  const [answers, setAnswers] = useState<Answer[]>([])
  const [answersAreLoaded, setAnswersAreLoaded] = useState(false)

  const { username = DEFAULT_TEST_USERNAME } = useParams()

  useEffect(() => {
    if (number === undefined) return
    axiosInstance
      .get(routes.questionAnswers(number, username))
      .then(({ data }) => setAnswers(data.map((d) => plainToInstance(Answer, d))))
      .finally(() => setAnswersAreLoaded(true))
  }, [assessmentID, number, username])

  const answersLookup: AnswerMap = useMemo(() => {
    return buildResourceLookupTable(answers, 'answer')
  }, [answers])

  const lookupAnswer = useCallback(
    (question: number, part: number, section: number, task: number) =>
      answersLookup[question]?.[part]?.[section]?.[task] ?? '',
    [answersLookup]
  )

  const setAnswer = useCallback(
    (question: number, part: number, section: number, task: number, newAnswer: string) => {
      const newAnswers = answers.filter(
        (a) =>
          !(a.question === question && a.part === part && a.section === section && a.task === task)
      )
      newAnswers.push({ question, part, section, task, answer: newAnswer })
      setAnswers(newAnswers)
    },
    [answers]
  )

  const saveAnswers = useCallback(() => {
    if (number === undefined) return
    axiosInstance.post(routes.questionAnswers(number, username), answers).then(() => {})
  }, [answers, assessmentID, number, username])

  return { lookupAnswer, answersAreLoaded, setAnswer, saveAnswers }
}

export const useAssessmentSummary = () => {
  const { assessmentID } = useAssessmentParams()
  const [summary, setSummary] = useState<Summary>()
  const [summaryIsLoaded, setSummaryIsLoaded] = useState(false)
  useEffect(() => {
    if (!assessmentID) return
    axiosInstance
      .get(routes.summary(assessmentID))
      .then(({ data }) => setSummary(plainToInstance(Summary, data)))
      .finally(() => setSummaryIsLoaded(true))
  }, [assessmentID])
  return { summary, summaryIsLoaded }
}
