import { Box, Card, Flex, Heading, Separator, Text } from '@radix-ui/themes'
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
          <Separator size="4" />
          <Text>{text}</Text>
        </Flex>
      </Card>
    </Box>
  )
}

export default ContextCard
