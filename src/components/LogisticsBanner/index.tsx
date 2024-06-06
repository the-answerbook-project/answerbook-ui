import { ClockIcon } from '@radix-ui/react-icons'
import { Callout, Strong, Text } from '@radix-ui/themes'
import { format, isAfter, isBefore } from 'date-fns'
import React, { FC, useMemo } from 'react'

export enum AssessmentStatus {
  OPEN,
  CLOSED,
  NOT_STARTED,
}

interface LogisticsBannerProps {
  start: Date
  end: Date
}

export const DATE_FMT = "'on' cccc d MMMM y 'at' hh:mma"

const LogisticsBanner: FC<LogisticsBannerProps> = ({ start, end }) => {
  const status = useMemo(() => {
    const now = new Date()
    if (isBefore(now, start)) return AssessmentStatus.NOT_STARTED
    if (isAfter(now, end)) return AssessmentStatus.CLOSED
    return AssessmentStatus.OPEN
  }, [start, end])

  const colourMap: Record<AssessmentStatus, 'red' | 'amber' | 'blue'> = {
    [AssessmentStatus.OPEN]: 'amber',
    [AssessmentStatus.CLOSED]: 'red',
    [AssessmentStatus.NOT_STARTED]: 'blue',
  }
  const testMap = {
    [AssessmentStatus.OPEN]: (
      <Text>
        This assessment <Strong>ends {format(end, DATE_FMT)} (UK time)</Strong>, after which
        submissions will not be accepted.
      </Text>
    ),
    [AssessmentStatus.CLOSED]: (
      <Text>
        This assessment <Strong>ended {format(end, DATE_FMT)} (UK time).</Strong> Submissions are no
        longer accepted.
      </Text>
    ),
    [AssessmentStatus.NOT_STARTED]: (
      <Text>
        This assessment<Strong>begins {format(start, DATE_FMT)} (UK time)</Strong>, when the
        questions will be released
      </Text>
    ),
  }
  return (
    <Callout.Root color={colourMap[status]} role="status">
      <Callout.Icon>
        <ClockIcon />
      </Callout.Icon>
      <Callout.Text>{testMap[status]}</Callout.Text>
    </Callout.Root>
  )
}

export default LogisticsBanner
