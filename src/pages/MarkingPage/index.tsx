import { ChevronUpIcon } from '@radix-ui/react-icons'
import { Box, Card, Flex, Grid, Section as RadixUISection, Text } from '@radix-ui/themes'
import { keyBy, mapValues, sumBy, values } from 'lodash'
import React, { FC, useMemo, useState } from 'react'

import Body from '../../components/pageStructure/Body'
import MarkingToolbar from '../../components/topBars/MarkingToolbar'
import useActiveIdOnScroll from '../../hooks/interactiveScrollspy'
import { useAnswers, useMarks, useQuestions, useStudents } from '../../hooks/marking'
import { Student } from '../../types/marking'
import HorizontalMarkingPane from './HorizontalMarkingPane'
import MarkableSubmission from './MarkableSubmission'
import Scrollspy from './Scrollspy'
import './index.css'

const MarkingPage: FC = () => {
  const { questions, allSectionIDs, questionsAreLoaded } = useQuestions()
  const { students, studentsAreLoaded } = useStudents()
  const { lookupMark, rawMarksTable, saveMark, marksAreLoaded } = useMarks()
  const { lookupAnswer, answersAreLoaded } = useAnswers()
  const [student, setStudent] = useState<Student>()
  const activeId = useActiveIdOnScroll(allSectionIDs)
  const [visibleSectionIDs, setVisibleSectionIDs] = useState<string[]>(allSectionIDs)

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
      <RadixUISection pb="0">
        <Grid columns="2fr 6fr 2fr" height="calc(100vh - var(--space-9))">
          <Box p="2" className="sticky-sidebar">
            <HorizontalMarkingPane
              questions={questions}
              sectionIDs={allSectionIDs}
              onActiveSectionsUpdate={setVisibleSectionIDs}
            />
          </Box>
          <Box pt="2" pb="60vh" className="scrollable-col">
            {!student ? (
              <Landing />
            ) : (
              <MarkableSubmission
                questions={questions}
                visibleSectionIDs={visibleSectionIDs}
                student={student}
                lookupAnswer={lookupAnswer}
                lookupMark={lookupMark}
                saveMark={saveMark}
              />
            )}
          </Box>

          {student && (
            <Box className="sticky-sidebar">
              <Scrollspy
                questions={questions}
                marks={rawMarksTable[student.username]}
                activeId={activeId}
              />
            </Box>
          )}
        </Grid>
      </RadixUISection>
    </>
  )
}

export default MarkingPage
export { NO_MARK } from './constants'
