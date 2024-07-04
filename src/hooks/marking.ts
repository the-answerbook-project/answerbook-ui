import { instanceToPlain, plainToInstance } from 'class-transformer'
import { mapValues } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

import axiosInstance from '../api/axiosInstance'
import routes from '../api/routes'
import { Answer, AnswerMap, Question } from '../types/exam'
import { MarkMap, MarkRoot } from '../types/marking'
import { buildResourceLookupTable } from '../utils/answers'

export const useStudentAnswers = (studentID: string) => {
  const [answers, setAnswers] = useState<Answer[]>([])
  const [answersAreLoaded, setAnswersAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.studentAnswers(studentID))
      .then(({ data }) => setAnswers(data.map((d) => plainToInstance(Answer, d))))
      .finally(() => setAnswersAreLoaded(true))
  }, [studentID])

  const answersLookup: AnswerMap = useMemo(
    () => buildResourceLookupTable(answers, 'answer'),
    [answers]
  )

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

export const useStudentMarks = (studentID: string) => {
  const [marks, setMarks] = useState<MarkRoot[]>([])
  const [marksAreLoaded, setMarksAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.studentMarks(studentID))
      .then(({ data }) => setMarks(data.map((d) => plainToInstance(MarkRoot, d))))
      .finally(() => setMarksAreLoaded(true))
  }, [studentID])

  const marksLookup: MarkMap = useMemo(() => buildResourceLookupTable(marks), [marks])

  const lookupMark = useCallback(
    (question: number, part: number, section: number) => marksLookup[question]?.[part]?.[section],
    [marksLookup]
  )

  function saveMark(newMark: MarkRoot) {
    axiosInstance
      .post(routes.studentMarks(studentID), instanceToPlain(newMark))
      .then(({ data }) => {
        const newMark = plainToInstance(MarkRoot, data)
        setMarks((ms) => {
          const otherMarks = ms.filter((m) => m.id !== newMark.id)
          return [...otherMarks, newMark]
        })
      })
  }

  return { lookupMark, marksAreLoaded, saveMark }
}
