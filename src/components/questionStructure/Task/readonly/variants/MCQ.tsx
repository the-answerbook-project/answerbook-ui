import { CheckboxGroup, RadioGroup } from '@radix-ui/themes'
import { map } from 'lodash'
import React, { FC } from 'react'

import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'

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

export const MCQOneTask: FC<MCQOneTaskProps> = ({ answer, choices }) => {
  return (
    <RadioGroup.Root variant="soft" value={answer.answer}>
      {map(choices, (o) => (
        <RadioGroup.Item key={o.value} value={o.value} disabled>
          {o.label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

export const MCQMultiTask: FC<MCQMultiTaskProps> = ({ answer, choices }) => {
  return (
    <CheckboxGroup.Root value={answer.answer.split(',')}>
      {map(choices, (o) => (
        <CheckboxGroup.Item key={o.value} value={o.value} disabled>
          {o.label}
        </CheckboxGroup.Item>
      ))}
    </CheckboxGroup.Root>
  )
}
