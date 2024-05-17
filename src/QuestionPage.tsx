import { Separator, Text } from '@radix-ui/themes'
import React, { FC } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import ContextCard from './components/ContextCard'
import Body from './components/pageStructure/Body'
import Header from './components/pageStructure/Header'
import Part from './components/questionStructure/Part'
import Section from './components/questionStructure/Section'

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
        sections: {
          i: {
            description: 'This is section i description',
          },
          ii: {
            description: 'This is section ii description',
          },
        },
      },
      b: {
        description:
          'For this question, look at the code in the Q1 directory, related to streaming services. You have a class Subscription which can be constructed with different options (for example, the number of users, the video stream quality, whether the subscription includes movies, comedy, sports, etc).',
        marksContribution: 30,
        sections: {
          i: {
            description:
              'For this question, look at the code in the Q1 directory, related to streaming services. You have a class Subscription which can be constructed with different options (for example, the number of users, the video stream quality, whether the subscription includes movies, comedy, sports, etc).',
          },
          ii: {
            description:
              'For this question, look at the code in the Q1 directory, related to streaming services. You have a class Subscription which can be constructed with different options (for example, the number of users, the video stream quality, whether the subscription includes movies, comedy, sports, etc).',
          },
        },
      },
    },
  }

  return (
    <>
      <Header primaryText={`Question ${pathMatch.params.number}`} secondaryText="TDD" />
      <Body>
        <ContextCard text={question.instructions} />
        {Object.entries(question.parts).map(([partId, part]) => (
          <Part
            key={partId}
            partId={partId}
            description={part.description}
            marksContribution={part.marksContribution}
          >
            {Object.entries(part.sections).map(([sectionId, section], i) => (
              <Section key={sectionId} sectionId={sectionId} description={section.description}>
                <Text>Here goes the tasks</Text>
                {i + 1 !== Object.keys(part.sections).length && <Separator size="4" />}
              </Section>
            ))}
          </Part>
        ))}
      </Body>
    </>
  )
}

export default QuestionPage
