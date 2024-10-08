import { Box, Container, Tabs } from '@radix-ui/themes'
import { range } from 'lodash'
import React, { FC } from 'react'

interface AssessmentNavProps {
  questionCount: number
  currentPage: string
  onPageChange: (_: string) => void
}

const AssessmentNav: FC<AssessmentNavProps> = ({ currentPage, onPageChange, questionCount }) => {
  return (
    <Box
      position="fixed"
      top="0"
      width="100%"
      style={{ zIndex: 1000, backgroundColor: 'var(--color-background)' }}
    >
      <Container>
        <Tabs.Root value={currentPage} onValueChange={onPageChange}>
          <Tabs.List>
            <Tabs.Trigger value="frontcover">Frontcover</Tabs.Trigger>
            {range(1, questionCount + 1).map((q) => (
              <Tabs.Trigger key={q} value={`question${q}`}>
                Question {q}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </Container>
    </Box>
  )
}

export default AssessmentNav
