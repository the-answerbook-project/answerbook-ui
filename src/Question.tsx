import { Text } from '@radix-ui/themes'
import React, { FC } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import Body from './components/pageStructure/Body'
import Header from './components/pageStructure/Header'

const Question: FC = () => {
  const { pathname } = useLocation()
  const pathMatch = matchPath({ path: '/questions/:number' }, pathname)

  if (!pathMatch) return <div>Placeholder</div>

  return (
    <>
      <Header primaryText={`Question ${pathMatch.params.number}`} secondaryText="TDD" />
      <Body>
        <Text>{`Question ${pathMatch.params.number}`}</Text>
      </Body>
    </>
  )
}

export default Question
