import { Container, Flex, Heading, Section as LayoutSection, Separator } from '@radix-ui/themes'
import { instanceToPlain } from 'class-transformer'
import { map, sum } from 'lodash'
import React, { FC, useEffect } from 'react'

import Body from '../components/pageStructure/Body'
import Part from '../components/questionStructure/Part'
import Question from '../components/questionStructure/Question'
import Section from '../components/questionStructure/Section'
import { TaskFactory, TaskProps } from '../components/questionStructure/Task'
import { useQuestions } from '../hooks/exam'

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
          <>
            <LayoutSection pb="0" mb="-6">
              <Container size="4" px="6">
                <Flex direction="column" gap="4">
                  <Flex gap="2">
                    <Heading size="8">{`Question ${questionIDString}`}</Heading>
                    {question.title && (
                      <Heading size="8" as="h2" color="gray" weight="medium">
                        {question.title}
                      </Heading>
                    )}
                  </Flex>
                  <Separator size="4" />
                </Flex>
              </Container>
            </LayoutSection>
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
                              return (
                                <TaskFactory
                                  key={i}
                                  {...({
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
          </>
        )
      })}
    </>
  )
}

export default MarkingPage
