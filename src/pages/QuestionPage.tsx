import { Separator } from '@radix-ui/themes'
import { instanceToPlain } from 'class-transformer'
import { map, sum } from 'lodash'
import React, { FC, useEffect } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import Body from '../components/pageStructure/Body'
import Header from '../components/pageStructure/Header'
import Part from '../components/questionStructure/Part'
import Question from '../components/questionStructure/Question'
import Section from '../components/questionStructure/Section'
import { TaskFactory, TaskProps } from '../components/questionStructure/Task'
import { useQuestion } from '../hooks/question'

const QuestionPage: FC = () => {
  const { pathname } = useLocation()
  const pathMatch = matchPath({ path: '/questions/:number' }, pathname)

  const { question, questionIsLoaded } = useQuestion(Number(pathMatch?.params?.number))
  useEffect(() => console.log({ question }), [question])

  if (!pathMatch || !questionIsLoaded) return <div>Placeholder</div>

  const handler = (v) => {}
  if (question === undefined) return <div>404</div>

  return (
    <>
      <Header primaryText={`Question ${pathMatch.params.number}`} secondaryText="TDD" />
      <Body>
        <Question instructions={question.instructions}>
          {Object.entries(question.parts).map(([partNumber, part]) => (
            <Part
              key={partNumber}
              partId={partNumber}
              description={part.instructions}
              marksContribution={sum(map(part.sections, 'maximumMark'))}
              onSave={handler}
            >
              {Object.entries(part.sections).map(([sectionNumber, section], i) => (
                <Section
                  key={sectionNumber}
                  sectionId={sectionNumber}
                  description={section.instructions}
                >
                  {section.tasks.map((task, i) => (
                    <TaskFactory
                      key={i}
                      {...({ onAnswerUpdate: handler, ...instanceToPlain(task) } as TaskProps)}
                    />
                  ))}
                  {i + 1 !== Object.keys(part.sections).length && <Separator size="4" />}
                </Section>
              ))}
            </Part>
          ))}
        </Question>
      </Body>
    </>
  )
}

export default QuestionPage
