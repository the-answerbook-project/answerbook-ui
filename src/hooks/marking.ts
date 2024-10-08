import { instanceToPlain, plainToInstance } from 'class-transformer'
import { entries, flatMap, groupBy, keys, map, mapValues } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

import axiosInstance from '../api/axiosInstance'
import routes from '../api/routes'
import { Answer, AnswerMap, Question } from '../types/exam'
import { MarkMap, MarkRoot, Student } from '../types/marking'
import { buildResourceLookupTable } from '../utils/answers'
import { useAssessmentParams } from './assessmentParams'

export const useStudents = () => {
  const { assessmentID } = useAssessmentParams()
  const [students, setStudents] = useState<Student[]>([])
  const [studentsAreLoaded, setStudentsAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.students(assessmentID))
      .then(({ data }) => setStudents(data.map((d) => plainToInstance(Student, d))))
      .finally(() => setStudentsAreLoaded(true))
  }, [assessmentID])

  return { students, studentsAreLoaded }
}

export const useQuestions = () => {
  const { assessmentID } = useAssessmentParams()
  const [questions, setQuestions] = useState<Record<number, Question>>()
  const [questionsAreLoaded, setQuestionsAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.questions(assessmentID))
      .then(({ data }) => setQuestions(mapValues(data, (q) => plainToInstance(Question, q))))
      .finally(() => setQuestionsAreLoaded(true))
  }, [assessmentID])

  const allSectionIDs: string[] = useMemo(
    () =>
      flatMap(entries(questions), ([qn, q]) =>
        flatMap(entries(q.parts), ([pn, p]) => map(keys(p.sections), (sn) => `${qn}-${pn}-${sn}`))
      ),
    [questions]
  )

  return { questions, allSectionIDs, questionsAreLoaded }
}

export const useMarks = () => {
  const { assessmentID } = useAssessmentParams()
  const [marks, setMarks] = useState<MarkRoot[]>([])
  const [marksAreLoaded, setMarksAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.marks(assessmentID))
      .then(({ data }) => setMarks(data.map((d) => plainToInstance(MarkRoot, d))))
      .finally(() => setMarksAreLoaded(true))
  }, [assessmentID])

  const rawMarksTable = useMemo(() => groupBy(marks, 'username'), [marks])

  const marksLookup: { [username: string]: MarkMap } = useMemo(
    () => mapValues(rawMarksTable, (ms) => buildResourceLookupTable(ms)),
    [rawMarksTable]
  )

  const lookupMark = useCallback(
    (student: string, question: number, part: number, section: number) =>
      marksLookup[student]?.[question]?.[part]?.[section],
    [marksLookup]
  )

  function saveMark(newMark: MarkRoot) {
    axiosInstance.post(routes.marks(assessmentID), instanceToPlain(newMark)).then(({ data }) => {
      const newMark = plainToInstance(MarkRoot, data)
      setMarks((ms) => {
        const otherMarks = ms.filter((m) => m.id !== newMark.id)
        return [...otherMarks, newMark]
      })
    })
  }

  return { lookupMark, rawMarksTable, marksAreLoaded, saveMark }
}

export const useAnswers = () => {
  const { assessmentID } = useAssessmentParams()
  const [answers, setAnswers] = useState<Answer[]>([])
  const [answersAreLoaded, setAnswersAreLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.answers(assessmentID))
      .then(({ data }) => setAnswers(data.map((d) => plainToInstance(Answer, d))))
      .finally(() => setAnswersAreLoaded(true))
  }, [assessmentID])

  const answersLookup: { [username: string]: AnswerMap } = useMemo(
    () => mapValues(groupBy(answers, 'username'), (as) => buildResourceLookupTable(as)),
    [answers]
  )

  const lookupAnswer = useCallback(
    (student: string, question: number, part: number, section: number, task: number) =>
      answersLookup[student]?.[question]?.[part]?.[section]?.[task],
    [answersLookup]
  )

  return { lookupAnswer, answersAreLoaded }
}
