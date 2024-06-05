import { ClockIcon } from '@radix-ui/react-icons'
import { Callout, Strong, Text } from '@radix-ui/themes'
import { addMinutes, format, isAfter, isBefore } from 'date-fns'
import React, { FC } from 'react'

import FormattedCard from './components/FormattedCard'
import Markdown from './components/Markdown'
import Body from './components/pageStructure/Body'
import Header from './components/pageStructure/Header'
import { useAssessmentSummary } from './hooks/assessmentSummary'

const FrontCover: FC = () => {
  const { summary, summaryIsLoaded } = useAssessmentSummary()

  if (!summaryIsLoaded) return <div>Loading...</div>
  if (summary === undefined) return <div>Error</div>

  function bannerColour(start: Date, end: Date) {
    if (isBefore(new Date(), start)) return 'blue'
    if (isAfter(new Date(), end)) return 'red'
    return 'amber'
  }

  function bannerText(start: Date, end: Date) {
    const FMT = "'on' cccc d MMMM Y 'at' hh:mma"
    if (isBefore(new Date(), start))
      return (
        <Text>
          This assessment<Strong>begins {format(start, FMT)} (UK time)</Strong>, when the questions
          will be released
        </Text>
      )
    if (isAfter(new Date(), end))
      return (
        <Text>
          This assessment <Strong>ended {format(end, FMT)} (UK time).</Strong> Submissions are no
          longer accepted.
        </Text>
      )
    return (
      <Text>
        This assessment <Strong>ends {format(end, FMT)} (UK time)</Strong>, after which submissions
        will not be accepted.
      </Text>
    )
  }

  return (
    <>
      <Header primaryText={summary.courseCode} secondaryText={summary.courseName} />
      <Body>
        <FormattedCard title="Instructions">
          <Markdown>{summary.rubric.instructions}</Markdown>
          <Callout.Root
            color={bannerColour(summary.begins, addMinutes(summary.begins, summary.duration))}
          >
            <Callout.Icon>
              <ClockIcon />
            </Callout.Icon>
            <Callout.Text>
              {bannerText(summary.begins, addMinutes(summary.begins, summary.duration))}
            </Callout.Text>
          </Callout.Root>
        </FormattedCard>
      </Body>
    </>
  )
}

export default FrontCover
