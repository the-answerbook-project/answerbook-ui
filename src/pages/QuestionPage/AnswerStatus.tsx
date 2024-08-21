import { CheckIcon } from '@radix-ui/react-icons'
import { Text } from '@radix-ui/themes'
import { formatDistanceToNow } from 'date-fns'
import React, { FC } from 'react'

interface AnswerStatusProps {
  timestamp?: Date
}

const AnswerStatus: FC<AnswerStatusProps> = ({ timestamp }) => {
  const formattedTimestamp = timestamp
    ? formatDistanceToNow(timestamp, {
        includeSeconds: true,
        addSuffix: true,
      })
    : 'never'
  return (
    <>
      <CheckIcon color="green" />
      <Text size="1" color="gray">
        Last updated: {formattedTimestamp}
      </Text>
    </>
  )
}

export default AnswerStatus
