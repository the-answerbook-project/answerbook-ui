import { TextArea, TextField } from '@radix-ui/themes'
import { isEqual } from 'lodash'
import React, { FC, useEffect, useMemo, useState } from 'react'

import useDebounce from '../../../../../hooks/debouncing'
import { TaskType } from '../../constants'
import '../../index.css'
import { AssessmentTaskProps } from '../../types'

export interface CodeTaskProps extends AssessmentTaskProps {
  type: TaskType.CODE
  lines?: number
}

export const CodeTask: FC<CodeTaskProps> = ({
  answer,
  onAnswerUpdate,
  lines = 5,
  disabled = false,
}) => {
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
