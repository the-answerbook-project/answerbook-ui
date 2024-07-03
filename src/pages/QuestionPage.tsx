import { Separator } from '@radix-ui/themes'
import { instanceToPlain } from 'class-transformer'
import memoize from 'fast-memoize'
import { map, sum } from 'lodash'
import React, { FC, useMemo } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import Body from '../components/pageStructure/Body'
import Header from '../components/pageStructure/Header'
import Part from '../components/questionStructure/Part'
import Question from '../components/questionStructure/Question'
import Section from '../components/questionStructure/Section'
import { TaskFactory, TaskProps } from '../components/questionStructure/Task'
import { useQuestion, useQuestionAnswers } from '../hooks/exam'
import { parseAnswer } from '../utils/answers'

const QuestionPage: FC = () => {
  const { pathname } = useLocation()
  const pathMatch = matchPath({ path: '/questions/:number' }, pathname)

  const { question, questionIsLoaded } = useQuestion(Number(pathMatch?.params?.number))
  const { lookupAnswer, setAnswer } = useQuestionAnswers(Number(pathMatch?.params?.number))

  const handlerFactory =
    (question: number, part: number, section: number, task: number) => (newAnswer: string) => {
      if (question === 1 && part === 1 && section === 1 && task === 2) {
        console.log(
          `Question ${question}, Part ${part}, Section ${section}, Task ${task} updated to ${newAnswer}!`
        )
        setAnswer(question, part, section, task, newAnswer)
      }
    }

  if (!pathMatch || !questionIsLoaded) return <div>Placeholder</div>
  if (question === undefined) return <div>404</div>

  const questionID = Number(pathMatch.params.number)

  return (
    <>
      <Header primaryText={`Question ${pathMatch.params.number}`} secondaryText={question.title} />
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
                        const answer = lookupAnswer(questionID, partID, sectionID, taskID)
                        return (
                          <TaskFactory
                            key={i}
                            {...({
                              onAnswerUpdate: handlerFactory(questionID, partID, sectionID, taskID),
                              //onAnswerUpdate: console.log,
                              ...instanceToPlain(task),
                              answer: parseAnswer(answer, task.type),
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
