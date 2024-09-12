import { Box, Flex, Separator } from '@radix-ui/themes'
import { instanceToPlain } from 'class-transformer'
import { map, sum } from 'lodash'
import React, { FC } from 'react'

import Part from '../../components/questionStructure/Part'
import Question from '../../components/questionStructure/Question'
import Section from '../../components/questionStructure/Section'
import { TaskFactory, TaskProps } from '../../components/questionStructure/Task'
import { Answer, Question as QuestionType } from '../../types/exam'
import { MarkRoot, Student } from '../../types/marking'
import MarkInputPanel from './MarkInputPanel'
import NoAnswerBanner from './NoAnswerBanner'
import QuestionHeader from './QuestionHeader'

interface MarkableSubmissionProps {
  student: Student
  questions: Record<number, QuestionType>
  lookupMark: (student: string, question: number, part: number, section: number) => MarkRoot
  lookupAnswer: (
    student: string,
    question: number,
    part: number,
    section: number,
    task: number
  ) => Answer
  saveMark: (newMark: MarkRoot) => void
}

const MarkableSubmission: FC<MarkableSubmissionProps> = ({
  student,
  questions,
  lookupMark,
  lookupAnswer,
  saveMark,
}) => {
  return (
    <Box>
      {Object.entries(questions).map(([q_, question]) => {
        const q = Number(q_)
        return (
          <Box key={q_}>
            <Flex direction="column" gap="4" px="6">
              <QuestionHeader number={q_} title={question.title} />
              <Question instructions={question.instructions}>
                {Object.entries(question.parts).map(([p_, part]) => {
                  const p = Number(p_)
                  return (
                    <Part
                      key={p}
                      partId={p}
                      description={part.instructions}
                      marksContribution={sum(map(part.sections, 'maximumMark'))}
                    >
                      {Object.entries(part.sections).map(([s_, section], i) => {
                        const s = Number(s_)
                        const sectionId = `${q}-${p}-${s}`
                        const mark = lookupMark(student.username, q, p, s)
                        return (
                          <Section key={s} sectionId={sectionId} description={section.instructions}>
                            {section.tasks.map((task, t_) => {
                              const t = t_ + 1
                              const answer = lookupAnswer(student.username, q, p, s, t)
                              if (!answer) return <NoAnswerBanner key={t_} />
                              return (
                                <TaskFactory
                                  key={`${sectionId}-${t}`}
                                  {...({
                                    disabled: true,
                                    answer: answer,
                                    onAnswerUpdate: (v) => {},
                                    ...instanceToPlain(task),
                                  } as TaskProps)}
                                />
                              )
                            })}

                            <MarkInputPanel
                              username={student.username}
                              question={q}
                              part={p}
                              section={s}
                              currentMark={mark}
                              maximumMark={section.maximumMark}
                              onSave={saveMark}
                            />
                            {i + 1 !== Object.keys(part.sections).length && <Separator size="4" />}
                          </Section>
                        )
                      })}
                    </Part>
                  )
                })}
              </Question>
            </Flex>
          </Box>
        )
      })}
    </Box>
  )
}

export default MarkableSubmission
