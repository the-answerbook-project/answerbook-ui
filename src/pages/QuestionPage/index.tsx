import { Button, Flex, Grid, Separator } from '@radix-ui/themes'
import { instanceToPlain } from 'class-transformer'
import { map, sum } from 'lodash'
import React, { FC } from 'react'

import Body from '../../components/pageStructure/Body'
import Header from '../../components/pageStructure/Header'
import Part from '../../components/questionStructure/Part'
import Question from '../../components/questionStructure/Question'
import Section from '../../components/questionStructure/Section'
import { TaskFactory, TaskProps } from '../../components/questionStructure/Task'
import { Answer, Question as QuestionSpec } from '../../types/exam'
import AnswerStatus from './AnswerStatus'

interface QuestionPageProps {
  questionNumber: number
  question: QuestionSpec
  lookupAnswer: (question: number, part: number, section: number, task: number) => Answer
  saveAnswer: (answer: Answer) => void
}

const QuestionPage: FC<QuestionPageProps> = ({
  questionNumber,
  question,
  lookupAnswer,
  saveAnswer,
}) => {
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
                        const answer = lookupAnswer(questionNumber, partID, sectionID, taskID)
                        return (
                          <Grid
                            columns="7fr 3fr"
                            key={`${questionNumber}-${partID}-${sectionID}-${taskID}`}
                          >
                            <TaskFactory
                              {...({
                                ...instanceToPlain(task),
                                onAnswerUpdate: saveAnswer,
                                answer: answer,
                              } as TaskProps)}
                            />
                            {answer.timestamp && (
                              <Flex direction="column" justify="end">
                                <Flex justify="end" gap="1">
                                  <AnswerStatus timestamp={answer.timestamp} />
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
