import { Flex } from '@radix-ui/themes'
import React, { FC, ReactNode } from 'react'

import ContextCard from '../ContextCard'

interface QuestionProps {
  description: string
  children: ReactNode
}

const Question: FC<QuestionProps> = ({ description, children }) => {
  return (
    <>
      <ContextCard text={description} />
      <Flex gap="3" direction="column">
        {children}
      </Flex>
    </>
  )
}

export default Question
