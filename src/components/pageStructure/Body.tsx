import { Container, Flex, Section } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

interface PageBodyProps {
  children: ReactNode
}

const Body: FC<PageBodyProps> = ({ children }) => {
  return (
    <Section>
      <Container size="4" px="6">
        <Flex direction="column" gap="4" align="center">
          {children}
        </Flex>
      </Container>
    </Section>
  )
}

export default Body
