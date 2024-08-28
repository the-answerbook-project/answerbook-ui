import { ChevronUpIcon } from '@radix-ui/react-icons'
import {
  Box,
  Card,
  Flex,
  Grid,
  Section as RadixUISection,
  ScrollArea,
  Separator,
  Text,
} from '@radix-ui/themes'
import { instanceToPlain } from 'class-transformer'
import { keyBy, map, mapValues, sum, sumBy, values } from 'lodash'
import React, { FC, useMemo, useState } from 'react'

import Body from '../../components/pageStructure/Body'
import Part from '../../components/questionStructure/Part'
import Question from '../../components/questionStructure/Question'
import Section from '../../components/questionStructure/Section'
import { TaskFactory, TaskProps } from '../../components/questionStructure/Task'
import MarkingToolbar from '../../components/topBars/MarkingToolbar'
import { useAnswers, useMarks, useQuestions, useStudents } from '../../hooks/marking'
import { Student } from '../../types/marking'
import MarkInputPanel from './MarkInputPanel'
import NoAnswerBanner from './NoAnswerBanner'
import QuestionHeader from './QuestionHeader'

const MarkingPage: FC = () => {
  const { questions, questionsAreLoaded } = useQuestions()
  const { students, studentsAreLoaded } = useStudents()
  const { lookupMark, rawMarksTable, saveMark, marksAreLoaded } = useMarks()
  const { lookupAnswer, answersAreLoaded } = useAnswers()
  const [student, setStudent] = useState<Student>()

  const markingStatus = useMemo(() => {
    const sectionsToMark = sumBy(values(questions), 'totalSections')
    return mapValues(
      keyBy(students, 'username'),
      ({ username }) => sectionsToMark - (rawMarksTable[username]?.length ?? 0)
    )
  }, [questions, rawMarksTable, students])

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
    <>
      <MarkingToolbar candidateSelectorProps={{ students, student, markingStatus, onSelect }} />
      <RadixUISection>
        <Grid columns="2fr 6fr 2fr">
          <Box p="2">Left</Box>
          <Box py="2">
            <ScrollArea type="always" scrollbars="vertical" style={{ height: '80vh' }}>
              {!student ? (
                <Landing />
              ) : (
                Object.entries(questions).map(([questionIDString, question]) => {
                  const questionID = Number(questionIDString)
                  return (
                    <Box key={questionIDString}>
                      <Flex direction="column" gap="4" px="6">
                        <QuestionHeader number={questionIDString} title={question.title} />
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
                                {Object.entries(part.sections).map(
                                  ([sectionIDString, section], i) => {
                                    const sectionID = Number(sectionIDString)
                                    const mark = lookupMark(
                                      student.username,
                                      questionID,
                                      partID,
                                      sectionID
                                    )
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
                                              key={`${questionID}-${partID}-${sectionID}-${taskID}`}
                                              {...({
                                                disabled: true,
                                                answer: answer,
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
                                  }
                                )}
                              </Part>
                            )
                          })}
                        </Question>
                      </Flex>
                    </Box>
                  )
                })
              )}
            </ScrollArea>
          </Box>
          <Box>Right</Box>
        </Grid>
      </RadixUISection>
    </>
  )
}

export default MarkingPage
