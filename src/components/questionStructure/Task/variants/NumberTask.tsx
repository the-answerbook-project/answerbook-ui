import { TextField } from '@radix-ui/themes'
import React, { FC, useEffect, useState } from 'react'

import { TaskType } from '../constants'
import { TaskBaseProps } from '../types'

export interface NumberTaskProps extends TaskBaseProps<number> {
  type: TaskType.NUMBER
}

export const NumberTask: FC<NumberTaskProps> = ({ answer, onAnswerUpdate, disabled = false }) => {
  const [inputValue, setInputValue] = useState<number | ''>(answer !== undefined ? answer : '')
  useEffect(() => {
    if (inputValue !== '') onAnswerUpdate(inputValue)
  }, [inputValue, onAnswerUpdate])

  const handleChange = (e) => setInputValue(e.target.value ? Number(e.target.value) : '')

  return (
    <TextField.Root
      value={inputValue}
      onChange={handleChange}
      type="number"
      variant="soft"
      disabled={disabled}
      placeholder="Your answer here…"
    />
  )
}
