import { TextField } from '@radix-ui/themes'
import React, { FC, useCallback } from 'react'

import { TaskType } from '../constants'
import { TaskBaseProps } from '../types'

export interface NumberTaskProps extends TaskBaseProps<number | ''> {
  type: TaskType.INTEGER
}

export const NumberTask: FC<NumberTaskProps> = ({ answer, onAnswerUpdate, disabled = false }) => {
  const handleChange = useCallback((e) => onAnswerUpdate(e.target.value ?? ''), [onAnswerUpdate])

  return (
    <TextField.Root
      value={answer ?? ''}
      onChange={handleChange}
      type="number"
      variant="soft"
      disabled={disabled}
      placeholder="0"
    />
  )
}
