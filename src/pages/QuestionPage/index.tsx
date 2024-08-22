import { Button, Flex, Grid, Separator } from '@radix-ui/themes'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { map, sum } from 'lodash'
import React, { FC, useCallback } from 'react'

import Body from '../../components/pageStructure/Body'
import Header from '../../components/pageStructure/Header'
import Part from '../../components/questionStructure/Part'
import Question from '../../components/questionStructure/Question'
import Section from '../../components/questionStructure/Section'
import { TaskFactory, TaskProps } from '../../components/questionStructure/Task'
import { Answer, Question as QuestionSpec } from '../../types/exam'
import { parseAnswer } from '../../utils/answers'
import AnswerStatus from './AnswerStatus'

interface QuestionPageProps {
  questionNumber: number
  question: QuestionSpec
  lookupAnswer: (part: number, section: number, task: number) => Answer | undefined
  saveAnswer: (answer: Answer) => void
}

const QuestionPage: FC<QuestionPageProps> = ({
  questionNumber,
  question,
  lookupAnswer,
  saveAnswer,
}) => {
  const handleSave = useCallback(
    (part: number, section: number, task: number) => (answer: string) => {
      if (answer !== lookupAnswer(part, section, task)?.answer) {
        const rawAnswer = { question: questionNumber, part, section, task, answer }
        saveAnswer(plainToInstance(Answer, rawAnswer))
      }
    },
    [lookupAnswer, questionNumber, saveAnswer]
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
                          <Grid columns="6fr 2fr" key={i}>
                            <TaskFactory
                              {...({
                                ...instanceToPlain(task),
                                onAnswerUpdate: handleSave(partID, sectionID, taskID),
                                answer: parseAnswer(answer?.answer ?? '', task.type),
                              } as TaskProps)}
                            />
                            {answer && (
                              <Flex direction="column" justify="end">
                                <Flex justify="end" gap="1">
                                  <AnswerStatus timestamp={answer.timestamp} />{' '}
                                </Flex>
                              </Flex>
                            )}
                          </Grid>
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
