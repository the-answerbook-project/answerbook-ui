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
import {
  ProcessedHandwritingProps,
  ProcessedHandwritingTask,
} from './variants/handwritingTasks/ProcessedHandwritingTask'
import {
  RawHandwritingProps,
  RawHandwritingTask,
} from './variants/handwritingTasks/RawHandwritingTask'

export type TaskProps =
  | FlagTaskProps
  | NumberTaskProps
  | EssayTaskProps
  | CodeTaskProps
  | MCQOneTaskProps
  | MCQMultiTaskProps
  | ProcessedHandwritingProps
  | RawHandwritingProps

export function defaultOnChangeHandler(onChange: (v: any) => void) {
  return (e) => onChange(e.target.value)
}

const taskComponentMap = {
  [TaskType.ESSAY]: EssayTask,
  [TaskType.CODE]: CodeTask,
  [TaskType.INTEGER]: NumberTask,
  [TaskType.FLAG]: FlagTask,
  [TaskType.MULTIPLE_CHOICE_SELECT_ONE]: MCQOneTask,
  [TaskType.MULTIPLE_CHOICE_SELECT_SEVERAL]: MCQMultiTask,
  [TaskType.RAW_HANDWRITING]: RawHandwritingTask,
  [TaskType.PROCESSED_HANDWRITING]: ProcessedHandwritingTask,
} as const

type TaskComponent = FC<TaskProps & { instructions?: string }>

export const TaskFactory: TaskComponent = ({ instructions, ...taskProps }) => {
  const Component = taskComponentMap[taskProps.type] as TaskComponent
  console.log(Component)
  return (
    <Flex gap="3" direction="column">
      {instructions && <Markdown>{instructions}</Markdown>}
      <Component {...taskProps} />
    </Flex>
  )
}
