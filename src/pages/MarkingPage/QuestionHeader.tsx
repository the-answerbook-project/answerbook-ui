import { Flex, Heading, Section } from '@radix-ui/themes'
import React, { FC } from 'react'

interface QuestionHeaderProps {
  number: string | number
  title?: string
}

const QuestionHeader: FC<QuestionHeaderProps> = ({ number, title }) => {
  return (
    <Section pb="0">
      <Flex gap="2">
        <Heading size="8" id={`q${number}`}>
          Question {number}
        </Heading>
        {title && (
          <Heading size="8" as="h2" color="gray" weight="medium">
            {title}
          </Heading>
        )}
      </Flex>
    </Section>
  )
}

export default QuestionHeader
