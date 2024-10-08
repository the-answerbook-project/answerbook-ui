import { Box, Flex, Separator } from '@radix-ui/themes'
import { instanceToPlain } from 'class-transformer'
import { map, sum } from 'lodash'
import React, { FC } from 'react'

import Part from '../../components/questionStructure/Part'
import Question from '../../components/questionStructure/Question'
import Section from '../../components/questionStructure/Section'
import { ReadOnlyTaskFactory, TaskProps } from '../../components/questionStructure/Task/readonly'
import { Answer, Question as QuestionType } from '../../types/exam'
import { MarkRoot, Student } from '../../types/marking'
import MarkInputPanel from './MarkInputPanel'
import QuestionHeader from './QuestionHeader'

interface MarkableSubmissionProps {
  questions: Record<number, QuestionType>
  visibleSectionIDs: string[]
  student: Student
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
  questions,
  visibleSectionIDs,
  student,
  lookupMark,
  lookupAnswer,
  saveMark,
}) => {
  const visibleByPrefix = (p: string) => visibleSectionIDs.some((id) => id.startsWith(p))

  return (
    <Box>
      {Object.entries(questions)
        .filter(([q, _]) => visibleByPrefix(`${q}-`))
        .map(([q_, question]) => {
          const q = Number(q_)
          return (
            <Box key={q_}>
              <Flex direction="column" gap="4" px="6">
                <QuestionHeader number={q_} title={question.title} />
                <Question instructions={question.instructions}>
                  {Object.entries(question.parts)
                    .filter(([p, _]) => visibleByPrefix(`${q}-${p}-`))
                    .map(([p_, part]) => {
                      const p = Number(p_)
                      return (
                        <Part
                          key={p}
                          partId={p}
                          description={part.instructions}
                          marksContribution={sum(map(part.sections, 'maximumMark'))}
                        >
                          {Object.entries(part.sections)
                            .filter(([s, _]) => visibleByPrefix(`${q}-${p}-${s}`))
                            .map(([s_, section], i) => {
                              const s = Number(s_)
                              const sectionId = `${q}-${p}-${s}`
                              const mark = lookupMark(student.username, q, p, s)
                              return (
                                <Section
                                  key={s}
                                  sectionId={sectionId}
                                  description={section.instructions}
                                >
                                  {section.tasks.map((task, t_) => {
                                    const t = t_ + 1
                                    const answer = lookupAnswer(student.username, q, p, s, t)
                                    return (
                                      <ReadOnlyTaskFactory
                                        key={`${sectionId}-${t}`}
                                        {...({
                                          answer: answer,
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
                                  {i + 1 !== Object.keys(part.sections).length && (
                                    <Separator size="4" />
                                  )}
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
