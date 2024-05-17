import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes'
import React, { FC } from 'react'

interface ContextCardProps {
  text: string
}

const ContextCard: FC<ContextCardProps> = ({ text }) => {
  return (
    <Box width="100%">
      <Card size="3">
        <Flex gap="4" direction="column">
          <Heading>Context</Heading>
          <Text>{text}</Text>
        </Flex>
      </Card>
    </Box>
  )
}

export default ContextCard
