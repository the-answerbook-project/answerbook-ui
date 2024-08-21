import { Button, Separator } from '@radix-ui/themes'
import { instanceToPlain } from 'class-transformer'
import { map, sum } from 'lodash'
import React, { FC, useCallback } from 'react'

import Body from '../components/pageStructure/Body'
import Header from '../components/pageStructure/Header'
import Part from '../components/questionStructure/Part'
import Question from '../components/questionStructure/Question'
import Section from '../components/questionStructure/Section'
import { TaskFactory, TaskProps } from '../components/questionStructure/Task'
import { Answer, Question as QuestionSpec } from '../types/exam'
import { parseAnswer } from '../utils/answers'

interface QuestionPageProps {
  questionNumber: number
  question: QuestionSpec
  lookupAnswer: (part: number, section: number, task: number) => Answer | undefined
  onAnswerChange: (part: number, section: number, task: number, newAnswer: string) => void
}

const QuestionPage: FC<QuestionPageProps> = ({
  questionNumber,
  question,
  lookupAnswer,
  onAnswerChange,
}) => {
  const handlerFactory = useCallback(
    (part: number, section: number, task: number) => (newAnswer: string) => {
      console.log(newAnswer)
      // onAnswerChange(part, section, task, newAnswer)
    },
    []
  )

  return (
    <>
      <Header primaryText={`Question ${questionNumber}`} secondaryText={question.title} />
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
                onSave={() => console.log(`Part ${partID} saved!`)} // TODO: Implement
              >
                {Object.entries(part.sections).map(([sectionIDString, section], i) => {
                  const sectionID = Number(sectionIDString)
                  return (
                    <Section
                      key={sectionID}
                      sectionId={sectionID}
                      description={section.instructions}
                    >
                      {section.tasks.map((task, i) => {
                        const taskID = i + 1
                        const answer = lookupAnswer(partID, sectionID, taskID)
                        return (
                          <TaskFactory
                            {...({
                              onAnswerUpdate: handlerFactory(partID, sectionID, taskID),
                              ...instanceToPlain(task),
                              answer: parseAnswer(answer?.answer ?? '', task.type),
                            } as TaskProps)}
                          />
                        )
                      })}
                      {i + 1 !== Object.keys(part.sections).length && <Separator size="4" />}
                    </Section>
                  )
                })}
              </Part>
            )
          })}
        </Question>
        <Button size="4" color="green" type="submit" onClick={() => {}}>
          Save Answers
        </Button>
      </Body>
    </>
  )
}

export default QuestionPage
