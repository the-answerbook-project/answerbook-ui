import { TextField } from '@radix-ui/themes'
import React, { FC, useEffect, useState } from 'react'

import { TaskType } from '../constants'
import { TaskBaseProps } from '../types'

export interface NumberTaskProps extends TaskBaseProps<number | ''> {
  type: TaskType.INTEGER
}

export const NumberTask: FC<NumberTaskProps> = ({ answer, onAnswerUpdate, disabled = false }) => {
  const [value, setValue] = useState<string | number | undefined>(answer)
  useEffect(() => {
    if (value !== undefined) onAnswerUpdate(value.toString())
  }, [value, onAnswerUpdate])

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
      disabled={disabled}
      placeholder="Your number here..."
    />
  )
}
