import { CheckboxGroup, RadioGroup } from '@radix-ui/themes'
import { isEqual, map } from 'lodash'
import React, { FC, useEffect, useMemo, useState } from 'react'

import { TaskType } from '../constants'
import { TaskBaseProps } from '../types'

type MCQOption = {
  value: string
  label: string
}

export interface MCQOneTaskProps extends TaskBaseProps {
  type: TaskType.MULTIPLE_CHOICE_SELECT_ONE
  choices: MCQOption[]
}

export interface MCQMultiTaskProps extends TaskBaseProps {
  type: TaskType.MULTIPLE_CHOICE_SELECT_SEVERAL
  choices: MCQOption[]
}

export const MCQOneTask: FC<MCQOneTaskProps> = ({
  answer,
  onAnswerUpdate,
  choices,
  disabled = false,
}) => {
  const initialValue = useMemo(() => answer?.answer ?? '', [answer])
  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    if (!isEqual(value, initialValue)) {
      answer.answer = value
      onAnswerUpdate(answer)
    }
  }, [answer, value, onAnswerUpdate, initialValue])

  const handleOnClick = (e) => {
    const newValue = e.target.value
    setValue(newValue)
  }

  return (
    <RadioGroup.Root variant="soft" disabled={disabled} value={value} onClick={handleOnClick}>
      {map(choices, (o) => (
        <RadioGroup.Item key={o.value} value={o.value}>
          {o.label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}
export const MCQMultiTask: FC<MCQMultiTaskProps> = ({
  answer,
  onAnswerUpdate,
  choices,
  disabled = false,
}) => {
  const initialValue = useMemo(() => answer?.answer?.split(',') ?? [], [answer])
  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    if (!isEqual(value, initialValue)) {
      answer.answer = value.join(',')
      onAnswerUpdate(answer)
    }
  }, [value, onAnswerUpdate, answer, initialValue])

  const handleOnClick = (e) => {
    const newAnswer = e.target.value
    setValue((curr) =>
      curr.includes(newAnswer) ? curr.filter((v) => v !== newAnswer) : [...curr, newAnswer]
    )
  }

  return (
    <CheckboxGroup.Root disabled={disabled} variant="soft" value={value}>
      {map(choices, (o) => (
        <CheckboxGroup.Item key={o.value} value={o.value} onClick={handleOnClick}>
          {o.label}
        </CheckboxGroup.Item>
      ))}
    </CheckboxGroup.Root>
  )
}
