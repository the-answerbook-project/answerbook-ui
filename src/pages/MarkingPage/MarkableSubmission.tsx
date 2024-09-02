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
      {Object.entries(questions).map(([questionIDString, question]) => {
        const questionID = Number(questionIDString)
        return (
          <Box key={questionIDString}>
            <Flex direction="column" gap="4" px="6">
              <QuestionHeader number={questionIDString} title={question.title} />
              <Question instructions={question.instructions}>
                {Object.entries(question.parts).map(([partIDString, part]) => {
                  const partID = Number(partIDString)
                  return (
                    <Part
                      key={partID}
                      partId={partID}
                      description={part.instructions}
                      marksContribution={sum(map(part.sections, 'maximumMark'))}
                    >
                      {Object.entries(part.sections).map(([sectionIDString, section], i) => {
                        const sectionID = Number(sectionIDString)
                        const mark = lookupMark(student.username, questionID, partID, sectionID)
                        return (
                          <Section
                            key={sectionID}
                            sectionId={sectionID}
                            description={section.instructions}
                          >
                            {section.tasks.map((task, t) => {
                              const taskID = t + 1
                              const answer = lookupAnswer(
                                student.username,
                                questionID,
                                partID,
                                sectionID,
                                taskID
                              )
                              if (!answer) return <NoAnswerBanner key={t} />
                              return (
                                <TaskFactory
                                  key={`${questionID}-${partID}-${sectionID}-${taskID}`}
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
                              question={questionID}
                              part={partID}
                              section={sectionID}
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
      )
    </Box>
  )
}

export default MarkableSubmission
