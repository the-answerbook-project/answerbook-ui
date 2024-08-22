import { TextArea, TextField } from '@radix-ui/themes'
import React, { FC, useEffect, useState } from 'react'

import useDebounce from '../../../../hooks/debouncing'
import { TaskType } from '../constants'
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
  const [value, setValue] = useState(answer)
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    // Call save half a second after the last typed character
    if (debouncedValue !== undefined) onAnswerUpdate(debouncedValue)
  }, [debouncedValue, onAnswerUpdate])

  useEffect(() => {
    // Call save on unmounting in any case
    return () => {
      if (value !== undefined) onAnswerUpdate(value)
    }
  }, [])

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
    className: 'monospaced',
  }
  if (lines === 1) return <TextField.Root {...commonProps} />
  return <TextArea {...commonProps} resize="vertical" rows={lines} />
}
