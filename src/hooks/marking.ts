import { instanceToPlain, plainToInstance } from 'class-transformer'
import { groupBy, mapValues } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

import axiosInstance from '../api/axiosInstance'
import routes from '../api/routes'
import { Answer, AnswerMap, Question } from '../types/exam'
import { MarkMap, MarkRoot, Student } from '../types/marking'
import { buildResourceLookupTable } from '../utils/answers'

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [studentsAreLoaded, setStudentsAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.students)
      .then(({ data }) => {
        console.log(data)
        setStudents(data.map((d) => plainToInstance(Student, d)))
      })
      .finally(() => setStudentsAreLoaded(true))
  }, [])

  return { students, studentsAreLoaded }
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

export const useMarks = () => {
  const [marks, setMarks] = useState<MarkRoot[]>([])
  const [marksAreLoaded, setMarksAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.marks)
      .then(({ data }) => setMarks(data.map((d) => plainToInstance(MarkRoot, d))))
      .finally(() => setMarksAreLoaded(true))
  }, [])

  const marksLookup: { [username: string]: MarkMap } = useMemo(
    () => mapValues(groupBy(marks, 'username'), (ms) => buildResourceLookupTable(ms)),
    [marks]
  )

  const lookupMark = useCallback(
    (student: string, question: number, part: number, section: number) =>
      marksLookup[student]?.[question]?.[part]?.[section],
    [marksLookup]
  )

  function saveMark(newMark: MarkRoot) {
    axiosInstance.post(routes.marks, instanceToPlain(newMark)).then(({ data }) => {
      const newMark = plainToInstance(MarkRoot, data)
      setMarks((ms) => {
        const otherMarks = ms.filter((m) => m.id !== newMark.id)
        return [...otherMarks, newMark]
      })
    })
  }

  return { lookupMark, marksAreLoaded, saveMark }
}

export const useAnswers = () => {
  const [answers, setAnswers] = useState<Answer[]>([])
  const [answersAreLoaded, setAnswersAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.answers)
      .then(({ data }) => setAnswers(data.map((d) => plainToInstance(Answer, d))))
      .finally(() => setAnswersAreLoaded(true))
  }, [])

  const answersLookup: { [username: string]: AnswerMap } = useMemo(
    () => mapValues(groupBy(answers, 'username'), (as) => buildResourceLookupTable(as, 'answer')),
    [answers]
  )

  const lookupAnswer = useCallback(
    (student: string, question: number, part: number, section: number, task: number) =>
      answersLookup[student]?.[question]?.[part]?.[section]?.[task] ?? '',
    [answersLookup]
  )

  return { lookupAnswer, answersAreLoaded }
}
