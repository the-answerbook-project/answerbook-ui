import { Box, Separator } from '@radix-ui/themes'
import React, { FC, useEffect, useState } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import ContextCard from './components/ContextCard'
import Body from './components/pageStructure/Body'
import Header from './components/pageStructure/Header'
import Part from './components/questionStructure/Part'
import Section from './components/questionStructure/Section'
import { Task } from './components/questionStructure/Task'
import { TaskType } from './components/questionStructure/Task/constants'

const QuestionPage: FC = () => {
  const { pathname } = useLocation()
  const pathMatch = matchPath({ path: '/questions/:number' }, pathname)
  const [multiState, setMultiState] = useState(['Option A'])
  const defaultAnswers = {
    '1_1_1_1': 'This is my current text',
  }

  useEffect(() => console.log({ multiState }), [multiState])
  const [answers, setAnswers] = useState(defaultAnswers)

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
            tasks: [
              {
                type: TaskType.ESSAY,
              },
            ],
          },
          ii: {
            description: 'This is section ii description',
            tasks: [],
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
            tasks: [],
          },
          ii: {
            description:
              'For this question, look at the code in the Q1 directory, related to streaming services. You have a class Subscription which can be constructed with different options (for example, the number of users, the video stream quality, whether the subscription includes movies, comedy, sports, etc).',
            tasks: [],
          },
        },
      },
    },
  }

  const handler = () => {}

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
            onSave={handler}
          >
            {Object.entries(part.sections).map(([sectionId, section], i) => (
              <Section key={sectionId} sectionId={sectionId} description={section.description}>
                <Box>
                  <Task
                    answer={'My current answer'}
                    onAnswerUpdate={handler}
                    type={TaskType.ESSAY}
                  />
                </Box>
                <Box>
                  <Task
                    description="This is the description of a task"
                    type={TaskType.FLAG}
                    answer={'qazwsxedcrfvtgbyhnujmikolp123456'}
                    onAnswerUpdate={handler}
                  />
                </Box>
                <Box>
                  <Task type={TaskType.NUMBER} answer={12} onAnswerUpdate={handler} />
                </Box>
                <Box>
                  <Task
                    type={TaskType.MCQONE}
                    answer="Option A"
                    onAnswerUpdate={handler}
                    options={[
                      { value: 'Option A', label: 'Level 1' },
                      { value: 'Option B', label: 'Level 2' },
                    ]}
                  />
                </Box>
                <Box>
                  <Task
                    type={TaskType.CODE}
                    lines={1}
                    answer={'My current answer'}
                    onAnswerUpdate={handler}
                  />
                </Box>
                <Box>
                  <Task
                    type={TaskType.MCQMULTI}
                    answer={multiState}
                    onAnswerUpdate={setMultiState}
                    options={[
                      { value: 'Option A', label: 'Level 1' },
                      { value: 'Option B', label: 'Level 2' },
                    ]}
                  />
                </Box>
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
