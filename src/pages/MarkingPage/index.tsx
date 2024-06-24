import { Box, Separator } from '@radix-ui/themes'
import { instanceToPlain } from 'class-transformer'
import { map, sum } from 'lodash'
import React, { FC } from 'react'

import Body from '../../components/pageStructure/Body'
import Part from '../../components/questionStructure/Part'
import Question from '../../components/questionStructure/Question'
import Section from '../../components/questionStructure/Section'
import { TaskFactory, TaskProps } from '../../components/questionStructure/Task'
import { useQuestions, useStudentAnswers, useStudentMarks } from '../../hooks/marking'
import { parseAnswer } from '../../utils/answers'
import MarkInputPanel from './MarkInputPanel'
import NoAnswerBanner from './NoAnswerBanner'
import QuestionHeader from './QuestionHeader'

const MarkingPage: FC = () => {
  const { questions, questionsAreLoaded } = useQuestions()
  const { lookupAnswer, answersAreLoaded } = useStudentAnswers('hpotter')
  const { lookupMark, saveMark, marksAreLoaded } = useStudentMarks('hpotter')

  const handler = (v) => {}

  if (!questionsAreLoaded) return <div>Loading...</div>
  if (!questions) return <div>Failed to load questions</div>

  return (
    <>
      {Object.entries(questions).map(([questionIDString, question]) => {
        const questionID = Number(questionIDString)
        return (
          <Box key={questionIDString}>
            <QuestionHeader number={questionIDString} title={question.title} />
            <Body>
              <Question instructions={question.instructions}>
                {Object.entries(question.parts).map(([partIDString, part]) => {
                  const partID = Number(partIDString)
                  return (
                    <Part
                      key={partID}
                      partId={partID}
                      description={part.instructions}
                      marksContribution={sum(map(part.sections, 'maximumMark'))}
                      onSave={handler}
                    >
                      {Object.entries(part.sections).map(([sectionIDString, section], i) => {
                        const sectionID = Number(sectionIDString)
                        const mark = lookupMark(questionID, partID, sectionID)
                        return (
                          <Section
                            key={sectionID}
                            sectionId={sectionID}
                            description={section.instructions}
                          >
                            {section.tasks.map((task, t) => {
                              const taskID = t + 1
                              const answer = lookupAnswer(questionID, partID, sectionID, taskID)
                              if (!answer) return <NoAnswerBanner key={t} />
                              return (
                                <TaskFactory
                                  key={`${sectionID}-${taskID}`}
                                  {...({
                                    disabled: true,
                                    answer: parseAnswer(answer, task.type),
                                    onAnswerUpdate: handler,
                                    ...instanceToPlain(task),
                                  } as TaskProps)}
                                />
                              )
                            })}
                            {mark && (
                              <MarkInputPanel
                                question={questionID}
                                part={partID}
                                section={sectionID}
                                currentMark={mark}
                                maximumMark={section.maximumMark}
                                onSave={saveMark}
                              />
                            )}
                            {i + 1 !== Object.keys(part.sections).length && <Separator size="4" />}
                          </Section>
                        )
                      })}
                    </Part>
                  )
                })}
              </Question>
            </Body>
          </Box>
        )
      })}
    </>
  )
}

export default MarkingPage
