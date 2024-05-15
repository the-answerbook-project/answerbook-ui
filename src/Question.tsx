import React, { FC } from 'react'
import { Flex, Text } from '@radix-ui/themes'

const Question: FC = () => {
  return (
    <Flex direction="column" gap="2" style={{ backgroundColor: 'blue' }}>
      <Text>Frontcover</Text>
    </Flex>
  )
}

export default Question
