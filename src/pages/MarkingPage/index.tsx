import { ChevronUpIcon } from '@radix-ui/react-icons'
import {
  Box,
  Card,
  Flex,
  Grid,
  Section as RadixUISection,
  ScrollArea,
  Text,
} from '@radix-ui/themes'
import { keyBy, mapValues, sumBy, values } from 'lodash'
import React, { FC, useMemo, useState } from 'react'

import Body from '../../components/pageStructure/Body'
import MarkingToolbar from '../../components/topBars/MarkingToolbar'
import { useAnswers, useMarks, useQuestions, useStudents } from '../../hooks/marking'
import { Student } from '../../types/marking'
import MarkableSubmission from './MarkableSubmission'

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
                <MarkableSubmission
                  student={student}
                  questions={questions}
                  lookupAnswer={lookupAnswer}
                  lookupMark={lookupMark}
                  saveMark={saveMark}
                />
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
