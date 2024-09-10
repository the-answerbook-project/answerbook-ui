import { Flex, Grid, Separator } from '@radix-ui/themes'
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
                  const sectionId = `${questionNumber}-${p}-${s}`
                  return (
                    <Section key={s} sectionId={sectionId} description={section.instructions}>
                      {section.tasks.map((task, t_) => {
                        const t = t_ + 1
                        const answer = lookupAnswer(questionNumber, p, s, t)
                        return (
                          <Grid columns="7fr 3fr" key={`${sectionId}-${t}`}>
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
      </Body>
    </>
  )
}

export default QuestionPage
