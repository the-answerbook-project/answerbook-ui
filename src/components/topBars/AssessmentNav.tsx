import { Container, Section, Tabs } from '@radix-ui/themes'
import { range } from 'lodash'
import React, { FC } from 'react'

interface AssessmentNavProps {
  questionCount: number
  currentPage: string
  onPageChange: (_: string) => void
}

const AssessmentNav: FC<AssessmentNavProps> = ({ currentPage, onPageChange, questionCount }) => {
  return (
    <Section
      p="3"
      position="fixed"
      top="0"
      width="100%"
      style={{ backgroundColor: 'var(--gray-8)', zIndex: 1000 }}
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
    </Section>
  )
}

export default AssessmentNav
