import { CheckboxGroup, Flex, RadioGroup, TextArea, TextField } from '@radix-ui/themes'
import classnames from 'classnames'
import { map } from 'lodash'
import React, { FC, useEffect, useState } from 'react'

import './index.css'

export enum TaskType {
  ESSAY,
  CODE,
  NUMBER,
  FLAG,
  MCQONE,
  MCQMULTI,
}

interface TaskComponentProps<V> {
  answer: V
  onAnswerUpdate: (value: V) => void
  disabled?: boolean
}

interface FlagTaskProps extends TaskComponentProps<string> {
  showOrnament?: boolean
}

interface TextTaskProps extends TaskComponentProps<string> {
  lines?: number
}

type MCQOption = {
  value: string
  label: string
}

interface MCQTaskProps {
  options: MCQOption[]
}

function defaultOnChangeHandler(onChange: (v: any) => void) {
  return (e) => onChange(e.target.value)
}

export const FlagTask: FC<FlagTaskProps> = ({
  answer,
  onAnswerUpdate,
  showOrnament = true,
  disabled = false,
}) => {
  const FLAG_LENGTH = 32
  const [inputValue, setInputValue] = useState(answer)
  useEffect(() => onAnswerUpdate(inputValue), [inputValue, onAnswerUpdate])

  function handleChange(e) {
    const valueWithoutSpaces = e.target.value.replace(/\s+/g, '')
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
        disabled={disabled}
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

export const NumberTask: FC<TaskComponentProps<number>> = ({
  answer,
  onAnswerUpdate,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(answer)
  useEffect(() => onAnswerUpdate(inputValue), [inputValue, onAnswerUpdate])

  function handleChange(e) {
    setInputValue(parseInt(e.target.value))
  }

  return (
    <TextField.Root
      value={answer}
      onChange={handleChange}
      type="number"
      variant="soft"
      disabled={disabled}
      placeholder="Your answer here…"
    />
  )
}

export const EssayTask: FC<TextTaskProps> = ({
  answer,
  onAnswerUpdate,
  lines = 5,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(answer)
  useEffect(() => onAnswerUpdate(inputValue), [inputValue, onAnswerUpdate])

  return (
    <TextArea
      value={inputValue}
      onChange={defaultOnChangeHandler(setInputValue)}
      variant="soft"
      placeholder="Your answer here…"
      rows={lines}
      disabled={disabled}
    />
  )
}

export const CodeTask: FC<TextTaskProps> = ({
  answer,
  onAnswerUpdate,
  lines = 5,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(answer)
  useEffect(() => onAnswerUpdate(inputValue), [inputValue, onAnswerUpdate])

  return (
    <TextArea
      value={inputValue}
      onChange={defaultOnChangeHandler(setInputValue)}
      className="monospaced"
      variant="soft"
      placeholder="Your answer here…"
      rows={lines}
      disabled={disabled}
    />
  )
}

export const MCQOneTask: FC<MCQTaskProps & TaskComponentProps<string>> = ({
  answer,
  onAnswerUpdate,
  options,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(answer)
  useEffect(() => onAnswerUpdate(inputValue), [inputValue, onAnswerUpdate])
  return (
    <RadioGroup.Root
      variant="soft"
      disabled={disabled}
      value={inputValue}
      onClick={defaultOnChangeHandler(setInputValue)}
    >
      {map(options, (o) => (
        <RadioGroup.Item key={o.value} value={o.value}>
          {o.label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

export const MCQMultiTask: FC<MCQTaskProps & TaskComponentProps<string[]>> = ({
  answer,
  onAnswerUpdate,
  options,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(answer)
  useEffect(() => onAnswerUpdate(inputValue), [inputValue, onAnswerUpdate])

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
