import { Container, Flex, Heading, Section } from '@radix-ui/themes'
import React, { FC } from 'react'

import UserSelector from '../../components/NavBar/UserSelector'

interface QuestionHeaderProps {
  number: string | number
  title?: string
}

const QuestionHeader: FC<QuestionHeaderProps> = ({ number, title }) => {
  return (
    <Section pb="0" mb="-6">
      <Container size="4" px="6">
        <Flex gap="2">
          <Heading size="8">Question {number}</Heading>
          {title && (
            <Heading size="8" as="h2" color="gray" weight="medium">
              {title}
            </Heading>
          )}
          <UserSelector />
        </Flex>
      </Container>
    </Section>
  )
}

export default QuestionHeader
