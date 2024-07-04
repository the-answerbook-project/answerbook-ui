import { Container, Section, TabNav } from '@radix-ui/themes'
import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'

import { DEFAULT_TEST_USERNAME } from '../../utils/globalConstants'
import UserSelector from './UserSelector'

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
              href={`/questions/${i + 1}/${DEFAULT_TEST_USERNAME}`}
              key={i}
              active={pathname.startsWith(`/questions/${i + 1}`)}
            >
              {`Question ${i + 1}`}
            </TabNav.Link>
          ))}

          <UserSelector />
        </TabNav.Root>
      </Container>
    </Section>
  )
}

export default NavBar
