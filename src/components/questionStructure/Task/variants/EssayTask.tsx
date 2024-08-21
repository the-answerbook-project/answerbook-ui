import { TextArea, TextField } from '@radix-ui/themes'
import React, { FC, useEffect, useState } from 'react'

import { TaskType } from '../constants'
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
  const [value, setValue] = useState(answer)
  useEffect(() => {
    if (value !== undefined) onAnswerUpdate(value)
  }, [value, onAnswerUpdate])

  const handleOnChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
  }

  const commonProps = {
    value: value,
    onChange: handleOnChange,
    placeholder: 'Your answer here…',
    disabled: disabled,
    variant: 'soft' as 'soft',
  }
  if (lines === 1) return <TextField.Root {...commonProps} />
  return <TextArea {...commonProps} resize="vertical" rows={lines} />
}
