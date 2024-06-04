import { Flex } from '@radix-ui/themes'
import React, { FC } from 'react'

import Markdown from '../../Markdown'
import { TaskType } from './constants'
import './index.css'
import { CodeTask, CodeTaskProps } from './variants/CodeTask'
import { EssayTask, EssayTaskProps } from './variants/EssayTask'
import { FlagTask, FlagTaskProps } from './variants/FlagTask'
import { MCQMultiTask, MCQMultiTaskProps, MCQOneTask, MCQOneTaskProps } from './variants/MCQ'
import { NumberTask, NumberTaskProps } from './variants/NumberTask'

type TaskProps =
  | FlagTaskProps
  | NumberTaskProps
  | EssayTaskProps
  | CodeTaskProps
  | MCQOneTaskProps
  | MCQMultiTaskProps

export function defaultOnChangeHandler(onChange: (v: any) => void) {
  return (e) => onChange(e.target.value)
}

const taskComponentMap = {
  [TaskType.ESSAY]: EssayTask,
  [TaskType.CODE]: CodeTask,
  [TaskType.NUMBER]: NumberTask,
  [TaskType.FLAG]: FlagTask,
  [TaskType.MCQONE]: MCQOneTask,
  [TaskType.MCQMULTI]: MCQMultiTask,
} as const

type TaskComponent = FC<TaskProps & { description?: string }>

export const Task: TaskComponent = ({ description, ...taskProps }) => {
  const Component = taskComponentMap[taskProps.type] as TaskComponent
  return (
    <Flex gap="3" direction="column">
      {description && <Markdown>{description}</Markdown>}
      <Component {...taskProps} />
    </Flex>
  )
}
