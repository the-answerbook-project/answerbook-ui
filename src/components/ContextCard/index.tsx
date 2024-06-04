import { Box, Card, Flex, Heading } from '@radix-ui/themes'
import React, { FC } from 'react'

import Markdown from '../Markdown'

interface ContextCardProps {
  text: string
}

const ContextCard: FC<ContextCardProps> = ({ text }) => {
  return (
    <Box width="100%">
      <Card size="3">
        <Flex gap="4" direction="column">
          <Heading>Context</Heading>
          <Markdown>{text}</Markdown>
        </Flex>
      </Card>
    </Box>
  )
}

export default ContextCard
