import { TextField } from '@radix-ui/themes'
import { isEqual } from 'lodash'
import React, { FC, useEffect, useMemo, useState } from 'react'

import useDebounce from '../../../../../hooks/debouncing'
import { TaskType } from '../../constants'
import { AssessmentTaskProps } from '../../types'

export interface NumberTaskProps extends AssessmentTaskProps {
  type: TaskType.INTEGER
}

export const NumberTask: FC<NumberTaskProps> = ({ answer, onAnswerUpdate }) => {
  const initialValue = useMemo(() => answer?.answer ?? '', [answer])
  const [value, setValue] = useState(initialValue)
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    // Call save half a second after the last typed character
    if (!isEqual(debouncedValue, initialValue)) {
      answer.answer = debouncedValue
      onAnswerUpdate(answer)
    }
  }, [debouncedValue, answer, onAnswerUpdate, initialValue])

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
  }

  return (
    <TextField.Root
      value={value}
      onChange={handleChange}
      type="number"
      variant="soft"
      placeholder="Your number here..."
    />
  )
}
