import { CheckboxGroup, RadioGroup } from '@radix-ui/themes'
import { map } from 'lodash'
import React, { FC, useCallback, useEffect, useState } from 'react'

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
  return (
    <RadioGroup.Root
      variant="soft"
      disabled={disabled}
      value={answer}
      onClick={defaultOnChangeHandler(onAnswerUpdate)}
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
  const handleOnClick = useCallback(
    (e) => {
      const newAnswer = e.target.value
      const oldAnswer = answer ?? []
      const newAnswersArray = oldAnswer.includes(newAnswer)
        ? oldAnswer.filter((v) => v !== newAnswer)
        : [...oldAnswer, newAnswer]

      onAnswerUpdate(newAnswersArray.join(','))
    },
    [answer, onAnswerUpdate]
  )

  return (
    <CheckboxGroup.Root disabled={disabled} variant="soft" value={answer} onClick={handleOnClick}>
      {map(choices, (o) => (
        <CheckboxGroup.Item key={o.value} value={o.value}>
          {o.label}
        </CheckboxGroup.Item>
      ))}
    </CheckboxGroup.Root>
  )
}
