import { TextArea, TextField } from '@radix-ui/themes'
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
  // const [inputValue, setInputValue] = useState(answer)
  // useEffect(() => {
  //   if (inputValue !== undefined) onAnswerUpdate(inputValue)
  // }, [inputValue, onAnswerUpdate])
  const commonProps = {
    value: answer,
    onChange: defaultOnChangeHandler(onAnswerUpdate),
    placeholder: 'Your answer here…',
    disabled: disabled,
    variant: 'soft' as 'soft',
    className: 'monospaced',
  }
  if (lines === 1) return <TextField.Root {...commonProps} />
  return <TextArea {...commonProps} resize="vertical" rows={lines} />
}
