import { Separator } from '@radix-ui/themes'
import { instanceToPlain } from 'class-transformer'
import { map, sum } from 'lodash'
import React, { FC } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import Body from '../components/pageStructure/Body'
import Header from '../components/pageStructure/Header'
import Part from '../components/questionStructure/Part'
import Question from '../components/questionStructure/Question'
import Section from '../components/questionStructure/Section'
import { TaskFactory, TaskProps } from '../components/questionStructure/Task'
import { useQuestion, useQuestionAnswers } from '../hooks/exam'

const QuestionPage: FC = () => {
  const { pathname } = useLocation()
  const pathMatch = matchPath({ path: '/questions/:number' }, pathname)

  const { question, questionIsLoaded } = useQuestion(Number(pathMatch?.params?.number))
  const { lookupAnswer } = useQuestionAnswers(Number(pathMatch?.params?.number))

  if (!pathMatch || !questionIsLoaded) return <div>Placeholder</div>
  if (question === undefined) return <div>404</div>

  const questionID = Number(pathMatch.params.number)
  const handler = (v) => {}

  return (
    <>
      <Header primaryText={`Question ${pathMatch.params.number}`} secondaryText="TDD" />
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
                  return (
                    <Section
                      key={sectionID}
                      sectionId={sectionID}
                      description={section.instructions}
                    >
                      {section.tasks.map((task, i) => {
                        const taskID = i + 1
                        return (
                          <TaskFactory
                            key={i}
                            {...({
                              onAnswerUpdate: handler,
                              ...instanceToPlain(task),
                              answer: lookupAnswer(questionID, partID, sectionID, taskID),
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
      </Body>
    </>
  )
}

export default QuestionPage
