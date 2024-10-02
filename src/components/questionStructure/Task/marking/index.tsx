import { Flex } from '@radix-ui/themes'
import React, { FC } from 'react'

import Markdown from '../../../Markdown'
import { TaskType } from '../constants'
import '../index.css'
import { CodeTask, CodeTaskProps } from './variants/CodeTask'
import { EssayTask, EssayTaskProps } from './variants/EssayTask'
import { FlagTask, FlagTaskProps } from './variants/FlagTask'
import { MCQMultiTask, MCQMultiTaskProps, MCQOneTask, MCQOneTaskProps } from './variants/MCQ'
import NoAnswerBanner from './variants/NoAnswerBanner'
import { NumberTask, NumberTaskProps } from './variants/NumberTask'
import {
  ProcessedHandwritingProps,
  ProcessedHandwritingTask,
} from './variants/handwriting/ProcessedHandwritingTask'
import { RawHandwritingProps, RawHandwritingTask } from './variants/handwriting/RawHandwritingTask'

export type TaskProps =
  | FlagTaskProps
  | NumberTaskProps
  | EssayTaskProps
  | CodeTaskProps
  | MCQOneTaskProps
  | MCQMultiTaskProps
  | ProcessedHandwritingProps
  | RawHandwritingProps

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
  return (
    <Flex gap="3" direction="column">
      {instructions && <Markdown>{instructions}</Markdown>}
      {taskProps.answer ? <Component {...taskProps} /> : <NoAnswerBanner />}
    </Flex>
  )
}
