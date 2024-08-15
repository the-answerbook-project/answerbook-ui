import React, { FC } from 'react'

import FormattedCard from '../components/FormattedCard'
import LogisticsBanner from '../components/LogisticsBanner'
import Markdown from '../components/Markdown'
import Body from '../components/pageStructure/Body'
import Header from '../components/pageStructure/Header'
import { Heading } from '../types/exam'

interface FrontCoverProps {
  heading: Heading
}

const FrontCover: FC<FrontCoverProps> = ({ heading }) => {
  return (
    <>
      <Header primaryText={heading.courseCode} secondaryText={heading.courseName} />
      <Body>
        <FormattedCard title="Instructions">
          <Markdown>{heading.rubric.instructions}</Markdown>
          <LogisticsBanner start={heading.begins} end={heading.ends} />
        </FormattedCard>
      </Body>
    </>
  )
}

export default FrontCover
