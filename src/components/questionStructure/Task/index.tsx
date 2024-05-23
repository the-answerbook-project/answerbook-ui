import { CheckboxGroup, Flex, RadioGroup, TextArea, TextField } from '@radix-ui/themes'
import classnames from 'classnames'
import { map } from 'lodash'
import React, { FC, useState } from 'react'

import './index.css'

export enum TaskType {
  ESSAY,
  CODE,
  NUMBER,
  FLAG,
  MCQONE,
  MCQMULTI,
}

interface TaskComponentProps {
  disabled?: boolean
}

interface FlagTaskProps extends TaskComponentProps {
  showOrnament?: boolean
}

interface TextTaskProps extends TaskComponentProps {
  lines?: number
}

type MCQOption = {
  value: string
  label: string
}

interface MCQTaskProps extends TaskComponentProps {
  options: MCQOption[]
}

export const FlagTask: FC<FlagTaskProps> = ({ showOrnament = true, disabled = false }) => {
  const FLAG_LENGTH = 32
  const [inputValue, setInputValue] = useState('')

  function handleChange(e) {
    // Get the input value and remove spaces
    const valueWithoutSpaces = e.target.value.replace(/\s+/g, '')
    // Update the state with the value without spaces
    setInputValue(valueWithoutSpaces)
  }

  return (
    <Flex align="stretch">
      {showOrnament && (
        <Flex pl="2" align="center" className={classnames('ornament', 'left-flag-ornament')}>
          <span className="monospaced">{'FLAG {'}</span>
        </Flex>
      )}
      <TextField.Root
        value={inputValue}
        onChange={handleChange}
        radius="none"
        type="text"
        maxLength={FLAG_LENGTH}
        variant="soft"
        placeholder={'x'.repeat(FLAG_LENGTH)}
        className={classnames('flag', 'monospaced')}
      />
      {showOrnament && (
        <Flex pr="2" align="center" className={classnames('ornament', 'right-flag-ornament')}>
          <span className="monospaced">{'}'}</span>
        </Flex>
      )}
    </Flex>
  )
}

export const NumberTask: FC<TaskComponentProps> = ({ disabled = false }) => {
  return (
    <TextField.Root
      type="number"
      variant="soft"
      disabled={disabled}
      placeholder="Your answer here…"
    />
  )
}

export const EssayTask: FC<TextTaskProps> = ({ lines = 5, disabled = false }) => {
  return (
    <TextArea variant="soft" placeholder="Your answer here…" rows={lines} disabled={disabled} />
  )
}

export const CodeTask: FC<TextTaskProps> = ({ lines = 5, disabled = false }) => {
  return (
    <TextArea
      className="monospaced"
      variant="soft"
      placeholder="Your answer here…"
      rows={lines}
      disabled={disabled}
    />
  )
}

export const MCQOneTask: FC<MCQTaskProps> = ({ options, disabled = false }) => {
  return (
    <RadioGroup.Root variant="soft" disabled={disabled}>
      {map(options, (o) => (
        <RadioGroup.Item key={o.value} value={o.value}>
          {o.label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

export const MCQMultiTask: FC<MCQTaskProps> = ({ options, disabled = false }) => {
  return (
    <CheckboxGroup.Root variant="soft">
      {map(options, (o) => (
        <CheckboxGroup.Item key={o.value} value={o.value}>
          {o.label}
        </CheckboxGroup.Item>
      ))}
    </CheckboxGroup.Root>
  )
}

type TaskComponent =
  | typeof EssayTask
  | typeof CodeTask
  | typeof MCQMultiTask
  | typeof MCQOneTask
  | typeof NumberTask
  | typeof FlagTask

export default function toComponent(task: TaskType): TaskComponent {
  switch (task) {
    case TaskType.FLAG:
      return FlagTask
    case TaskType.NUMBER:
      return NumberTask
    case TaskType.ESSAY:
      return EssayTask
    case TaskType.CODE:
      return CodeTask
    case TaskType.MCQMULTI:
      return MCQMultiTask
    case TaskType.MCQONE:
      return MCQOneTask
    default:
      throw new Error(`Unknown task type: ${task}`)
  }
}
