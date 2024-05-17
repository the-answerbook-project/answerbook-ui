import React, { FC } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import ContextCard from './components/ContextCard'
import Body from './components/pageStructure/Body'
import Header from './components/pageStructure/Header'
import Part from './components/questionStructure/Part'

const QuestionPage: FC = () => {
  const { pathname } = useLocation()
  const pathMatch = matchPath({ path: '/questions/:number' }, pathname)

  if (!pathMatch) return <div>Placeholder</div>

  const question = {
    instructions:
      'For this question, look at the code in the Q1 directory, related to streaming services. You have a class Subscription which can be constructed with different options (for example, the number of users, the video stream quality, whether the subscription includes movies, comedy, sports, etc).',
    parts: {
      a: {
        description: 'This is part a description',
        marksContribution: 20,
      },
      b: {
        description: 'This is part b description',
        marksContribution: 30,
      },
    },
  }

  return (
    <>
      <Header primaryText={`Question ${pathMatch.params.number}`} secondaryText="TDD" />
      <Body>
        <ContextCard text={question.instructions} />
        {Object.entries(question.parts).map(([partId, part]) => {
          return (
            <Part
              key={partId}
              partId={partId}
              description={part.description}
              marksContribution={part.marksContribution}
            >
              Here goes Part {partId} sections
            </Part>
          )
        })}
      </Body>
    </>
  )
}

export default QuestionPage
