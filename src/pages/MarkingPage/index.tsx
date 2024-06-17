import { Box, Callout, Separator } from '@radix-ui/themes'
import { instanceToPlain } from 'class-transformer'
import { map, sum } from 'lodash'
import React, { FC, useEffect } from 'react'

import Body from '../../components/pageStructure/Body'
import Part from '../../components/questionStructure/Part'
import Question from '../../components/questionStructure/Question'
import Section from '../../components/questionStructure/Section'
import { TaskFactory, TaskProps } from '../../components/questionStructure/Task'
import { useQuestions } from '../../hooks/exam'
import QuestionHeader from './QuestionHeader'

const NoAnswerBanner = () => (
  <Callout.Root color="blue">
    <Callout.Text>No answer was submitted for this task.</Callout.Text>
  </Callout.Root>
)

const MarkingPage: FC = () => {
  const { questions, questionsAreLoaded } = useQuestions()

  useEffect(() => console.log({ questions }), [questions])

  const handler = (v) => {}

  if (!questionsAreLoaded) return <div>Loading...</div>
  if (!questions) return <div>Failed to load questions</div>

  return (
    <>
      {Object.entries(questions).map(([questionIDString, question]) => {
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
                        return (
                          <Section
                            key={sectionID}
                            sectionId={sectionID}
                            description={section.instructions}
                          >
                            {section.tasks.map((task, i) => {
                              const answer = false
                              if (!answer) return <NoAnswerBanner />
                              return (
                                <TaskFactory
                                  key={i}
                                  {...({
                                    disabled: true,
                                    onAnswerUpdate: handler,
                                    ...instanceToPlain(task),
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
          </Box>
        )
      })}
    </>
  )
}

export default MarkingPage
