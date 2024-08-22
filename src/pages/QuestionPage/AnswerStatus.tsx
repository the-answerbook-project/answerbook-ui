import { CheckIcon } from '@radix-ui/react-icons'
import { Text } from '@radix-ui/themes'
import { formatDistanceToNow } from 'date-fns'
import React, { FC, useEffect, useState } from 'react'

interface AnswerStatusProps {
  timestamp?: Date
}

const AnswerStatus: FC<AnswerStatusProps> = ({ timestamp }) => {
  const [formattedTimestamp, setFormattedTimestamp] = useState('')

  useEffect(() => {
    if (timestamp) {
      const updateFormattedTimestamp = () => {
        setFormattedTimestamp(
          formatDistanceToNow(timestamp, {
            includeSeconds: true,
            addSuffix: true,
          })
        )
      }

      // Update the timestamp immediately when the component mounts
      updateFormattedTimestamp()

      // Set up an interval to update the timestamp every 10 seconds
      const intervalId = setInterval(updateFormattedTimestamp, 10000)

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId)
    } else setFormattedTimestamp('never')
  }, [timestamp])

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
