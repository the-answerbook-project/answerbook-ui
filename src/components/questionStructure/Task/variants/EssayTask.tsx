import { TextArea } from '@radix-ui/themes'
import React, { FC, useEffect, useState } from 'react'

import { TaskType } from '../constants'
import { defaultOnChangeHandler } from '../index'
import { TaskBaseProps } from '../types'

export interface EssayTaskProps extends TaskBaseProps<string> {
  type: TaskType.ESSAY
  lines?: number
}

export const EssayTask: FC<EssayTaskProps> = ({
  answer,
  onAnswerUpdate,
  lines = 5,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(answer)
  useEffect(() => onAnswerUpdate(inputValue), [inputValue, onAnswerUpdate])

  return (
    <TextArea
      value={inputValue}
      onChange={defaultOnChangeHandler(setInputValue)}
      variant="soft"
      placeholder="Your answer here…"
      rows={lines}
      disabled={disabled}
    />
  )
}
