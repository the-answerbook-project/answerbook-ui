import { Text } from '@radix-ui/themes'
import React, { FC } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

const Question: FC = () => {
  const { pathname } = useLocation()
  const pathMatch = matchPath({ path: '/questions/:number' }, pathname)

  if (!pathMatch) return <div>Placeholder</div>

  return <Text>{`Question ${pathMatch.params.number}`}</Text>
}

export default Question
