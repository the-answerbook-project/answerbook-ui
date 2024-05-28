import React, { FC } from 'react'

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

type TaskComponent = FC<TaskProps>

export const Task: TaskComponent = (props) => {
  const Component = taskComponentMap[props.type] as TaskComponent
  return <Component {...props} />
}
