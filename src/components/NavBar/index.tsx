import { Container, Section, TabNav } from '@radix-ui/themes'
import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'

interface NavBarProps {
  questionCount: number
}

const NavBar: FC<NavBarProps> = ({ questionCount }) => {
  const { pathname } = useLocation()

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
          <TabNav.Link href="/frontcover" active={pathname === '/frontcover'}>
            Frontcover
          </TabNav.Link>
          {[...Array(questionCount).keys()].map((i) => (
            <TabNav.Link
              href={`/questions/${i + 1}`}
              key={i}
              active={pathname === `/questions/${i + 1}`}
            >
              {`Question ${i + 1}`}
            </TabNav.Link>
          ))}
        </TabNav.Root>
      </Container>
    </Section>
  )
}

export default NavBar
