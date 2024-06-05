import { CheckboxGroup, RadioGroup } from '@radix-ui/themes'
import { map } from 'lodash'
import React, { FC, useEffect, useState } from 'react'

import { TaskType } from '../constants'
import { defaultOnChangeHandler } from '../index'
import { TaskBaseProps } from '../types'

type MCQOption = {
  value: string
  label: string
}

export interface MCQOneTaskProps extends TaskBaseProps<string> {
  type: TaskType.MULTIPLE_CHOICE_SELECT_ONE
  choices: MCQOption[]
}

export interface MCQMultiTaskProps extends TaskBaseProps<string[]> {
  type: TaskType.MULTIPLE_CHOICE_SELECT_SEVERAL
  choices: MCQOption[]
}

export const MCQOneTask: FC<MCQOneTaskProps> = ({
  answer,
  onAnswerUpdate,
  choices,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(answer)
  useEffect(() => {
    if (inputValue !== undefined) onAnswerUpdate(inputValue)
  }, [inputValue, onAnswerUpdate])
  return (
    <RadioGroup.Root
      variant="soft"
      disabled={disabled}
      value={inputValue}
      onClick={defaultOnChangeHandler(setInputValue)}
    >
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
  const [inputValue, setInputValue] = useState(answer ?? [])
  useEffect(() => {
    if (inputValue !== undefined) onAnswerUpdate(inputValue)
  }, [inputValue, onAnswerUpdate])
  const handleOnClick = (e) => {
    const newAnswer = e.target.value
    if (inputValue.includes(newAnswer)) setInputValue((vs) => vs.filter((v) => v !== newAnswer))
    else setInputValue((vs) => [...vs, newAnswer])
  }

  return (
    <CheckboxGroup.Root
      disabled={disabled}
      variant="soft"
      defaultValue={inputValue}
      onClick={handleOnClick}
    >
      {map(choices, (o) => (
        <CheckboxGroup.Item key={o.value} value={o.value}>
          {o.label}
        </CheckboxGroup.Item>
      ))}
    </CheckboxGroup.Root>
  )
}
