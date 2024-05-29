import { TextArea, TextField } from '@radix-ui/themes'
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
  const commonProps = {
    value: inputValue,
    onChange: defaultOnChangeHandler(setInputValue),
    placeholder: 'Your answer here…',
    disabled: disabled,
    variant: 'soft' as 'soft',
  }
  if (lines === 1) return <TextField.Root {...commonProps} />
  return <TextArea {...commonProps} resize="vertical" rows={lines} />
}
