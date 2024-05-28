import { TextArea } from '@radix-ui/themes'
import React, { FC, useEffect, useState } from 'react'

import { TaskType } from '../constants'
import { defaultOnChangeHandler } from '../index'
import '../index.css'
import { TaskBaseProps } from '../types'

export interface CodeTaskProps extends TaskBaseProps<string> {
  type: TaskType.CODE
  lines?: number
}

export const CodeTask: FC<CodeTaskProps> = ({
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
      className="monospaced"
      variant="soft"
      placeholder="Your answer here…"
      rows={lines}
      disabled={disabled}
    />
  )
}
