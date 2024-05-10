import { Section, TabNav } from '@radix-ui/themes'
import React, { FC } from 'react'

interface NavBarProps {
  questionCount: number
}

const NavBar: FC<NavBarProps> = ({ questionCount }) => {
  return (
    <Section p="4" pt="3" style={{ backgroundColor: 'var(--gray-a2)' }}>
      <TabNav.Root size="2">
        <TabNav.Link href="/frontcover" active>
          Frontcover
        </TabNav.Link>
        {[...Array(questionCount).keys()].map((i) => (
          <TabNav.Link href={`/questions/${i + 1}`} key={i}>{`Question ${i + 1}`}</TabNav.Link>
        ))}
      </TabNav.Root>
    </Section>
  )
}

export default NavBar
