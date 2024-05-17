import { Container, Flex, Section } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

interface PageFrameProps {
  children: ReactNode
}

const PageFrame: FC<PageFrameProps> = ({ children }) => {
  return (
    <Section>
      <Container size="3">
        <Flex direction="column" gap="2" px="4">
          {children}
        </Flex>
      </Container>
    </Section>
  )
}

export default PageFrame
