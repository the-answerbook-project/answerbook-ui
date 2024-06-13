import React, { FC } from 'react'

import FormattedCard from '../components/FormattedCard'
import LogisticsBanner from '../components/LogisticsBanner'
import Markdown from '../components/Markdown'
import Body from '../components/pageStructure/Body'
import Header from '../components/pageStructure/Header'
import { useAssessmentSummary } from '../hooks/exam'

const FrontCover: FC = () => {
  const { summary, summaryIsLoaded } = useAssessmentSummary()

  if (!summaryIsLoaded) return <div>Loading...</div>
  if (summary === undefined) return <div>Error</div>

  return (
    <>
      <Header primaryText={summary.courseCode} secondaryText={summary.courseName} />
      <Body>
        <FormattedCard title="Instructions">
          <Markdown>{summary.rubric.instructions}</Markdown>
          <LogisticsBanner start={summary.begins} end={summary.ends} />
        </FormattedCard>
      </Body>
    </>
  )
}

export default FrontCover
