import { ChevronUpIcon } from '@radix-ui/react-icons'
import { Box, Card, Flex, Section as RadixUISection, Separator, Text } from '@radix-ui/themes'
import { instanceToPlain } from 'class-transformer'
import { map, sum } from 'lodash'
import React, { FC, useState } from 'react'

import Body from '../../components/pageStructure/Body'
import Part from '../../components/questionStructure/Part'
import Question from '../../components/questionStructure/Question'
import Section from '../../components/questionStructure/Section'
import { TaskFactory, TaskProps } from '../../components/questionStructure/Task'
import MarkingToolbar from '../../components/topBars/MarkingToolbar'
import { useAnswers, useMarks, useQuestions, useStudents } from '../../hooks/marking'
import { Student } from '../../types/marking'
import { parseAnswer } from '../../utils/answers'
import MarkInputPanel from './MarkInputPanel'
import NoAnswerBanner from './NoAnswerBanner'
import QuestionHeader from './QuestionHeader'

const MarkingPage: FC = () => {
  const { questions, questionsAreLoaded } = useQuestions()
  const { students, studentsAreLoaded } = useStudents()
  const { lookupMark, saveMark, marksAreLoaded } = useMarks()
  const { lookupAnswer, answersAreLoaded } = useAnswers()
  const [student, setStudent] = useState<Student>()

  const onSelect = (s: Student | undefined) => setStudent(s)
  const handler = (v) => {}

  const Landing = () => (
    <Body>
      <Box width="80%">
        <Card>
          <Flex py="8" gap="2" align="center" justify="center">
            <ChevronUpIcon />
            <Text color="gray">Select a student from the menu above to start marking</Text>
            <ChevronUpIcon />
          </Flex>
        </Card>
      </Box>
    </Body>
  )

  if (!questionsAreLoaded) return <div>Loading...</div>
  if (!questions) return <div>Failed to load questions</div>

  return (
    <RadixUISection pt="9">
      <MarkingToolbar candidateSelectorProps={{ students, student, onSelect }} />
      {!student ? (
        <Landing />
      ) : (
        Object.entries(questions).map(([questionIDString, question]) => {
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
                          const mark = lookupMark(student.username, questionID, partID, sectionID)
                          return (
                            <Section
                              key={sectionID}
                              sectionId={sectionID}
                              description={section.instructions}
                            >
                              {section.tasks.map((task, t) => {
                                const taskID = t + 1
                                const answer = lookupAnswer(
                                  student.username,
                                  questionID,
                                  partID,
                                  sectionID,
                                  taskID
                                )
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

                              <MarkInputPanel
                                username={student.username}
                                question={questionID}
                                part={partID}
                                section={sectionID}
                                currentMark={mark}
                                maximumMark={section.maximumMark}
                                onSave={saveMark}
                              />
                              {i + 1 !== Object.keys(part.sections).length && (
                                <Separator size="4" />
                              )}
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
        })
      )}
    </RadixUISection>
  )
}

export default MarkingPage
