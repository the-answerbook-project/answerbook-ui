import { Flex, Text } from '@radix-ui/themes'
import React, { FC } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

const Question: FC = () => {
  const { pathname } = useLocation()
  const pathMatch = matchPath({ path: '/questions/:number' }, pathname)

  if (!pathMatch) return <div>Placeholder</div>

  return (
    <Flex direction="column" gap="2" style={{ backgroundColor: 'blue' }}>
      <Text>{`Question ${pathMatch.params.number}`}</Text>
    </Flex>
  )
}

export default Question
