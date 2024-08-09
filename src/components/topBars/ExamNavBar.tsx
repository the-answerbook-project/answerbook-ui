import { Container, Section, TabNav } from '@radix-ui/themes'
import { range } from 'lodash'
import React, { FC, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

interface NavBarProps {
  questionCount: number
}

enum Pages {
  QUESTION,
  FRONTCOVER,
}

function pathToPage(pathname: string): Pages {
  if (pathname.includes('questions')) return Pages.QUESTION
  return Pages.FRONTCOVER
}

const ExamNavBar: FC<NavBarProps> = ({ questionCount }) => {
  const { pathname } = useLocation()
  const currentPage = useMemo(() => pathToPage(pathname), [pathname])
  const linkPrefix = useMemo(() => (currentPage === Pages.QUESTION ? '../' : ''), [currentPage])

  return (
    <Section
      p="3"
      position="fixed"
      top="0"
      width="100%"
      style={{ backgroundColor: 'var(--gray-8)', zIndex: 1000 }}
    >
      <Container>
        <TabNav.Root size="2">
          <TabNav.Link href={`${linkPrefix}frontcover`} active={currentPage === Pages.FRONTCOVER}>
            Frontcover
          </TabNav.Link>
          {range(1, questionCount + 1).map((q) => (
            <TabNav.Link
              key={q}
              href={`${linkPrefix}questions/${q}`}
              active={pathname.endsWith(`/questions/${q}`)}
            >
              {`Question ${q}`}
            </TabNav.Link>
          ))}
        </TabNav.Root>
      </Container>
    </Section>
  )
}

export default ExamNavBar
