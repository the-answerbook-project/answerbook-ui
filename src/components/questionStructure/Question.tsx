import { Flex } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

import FormattedCard from '../FormattedCard'
import Markdown from '../Markdown'

interface QuestionProps {
  instructions?: string
  children: ReactNode
}

const Question: FC<QuestionProps> = ({ instructions, children }) => {
  return (
    <>
      {instructions && (
        <FormattedCard title="Instructions">
          <Markdown>{instructions}</Markdown>
        </FormattedCard>
      )}
      <Flex gap="3" direction="column" width="100%">
        {children}
      </Flex>
    </>
  )
}

export default Question
