import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Badge, Button, Flex } from '@radix-ui/themes'
import { first, indexOf, isUndefined, last } from 'lodash'
import React, { FC, ReactNode, useMemo } from 'react'
import Select, { StylesConfig } from 'react-select'

import { Student } from '../../../../../types/marking'
import './index.css'

type Option = {
  value: string
  label: string
}

type GroupedOption = {
  label: string
  options: Option[]
}

export interface CandidateSelectorProps {
  students: Student[]
  student: Student | undefined
  onSelect: (student: Student | undefined) => void
}

const CandidateSelector: FC<CandidateSelectorProps> = ({ students, student, onSelect }) => {
  const groupedOptions: GroupedOption[] = useMemo(
    () => [
      {
        label: 'Students',
        options: students.map((s) => ({ value: s.username, label: s.cid })),
      },
    ],
    [students]
  )
  const value = useMemo(
    () =>
      isUndefined(student)
        ? undefined
        : {
            value: student.username,
            label: student.cid,
          },
    [student]
  )

  function handleChange(newValue) {
    onSelect(students.find((s) => s.username === newValue.value))
  }

  const prev = () => onSelect(students[indexOf(students, student) - 1])
  const next = () => onSelect(students[indexOf(students, student) + 1])

  const formatGroupLabel = (data): ReactNode => (
    <Flex justify="between">
      <span>{data.label}</span>
      <Badge color="gray" radius="full">
        {data.options.length}
      </Badge>
    </Flex>
  )

  const selectStyles: StylesConfig = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: 'none',
      height: '100%',
      borderRadius: 'none',
    }),
    container: (baseStyles, state) => ({
      ...baseStyles,
      height: 'var(--space-7)',
      width: '30%',
    }),
  }

  return (
    <Flex align="center" justify="center">
      <Button
        className="left-arrow-button"
        color="gray"
        size="3"
        disabled={isUndefined(student) || student === first(students)}
        onClick={prev}
      >
        <ChevronLeftIcon />
      </Button>
      <Select
        styles={selectStyles}
        placeholder={'Select a student...'}
        value={value}
        onChange={handleChange}
        options={groupedOptions}
        formatGroupLabel={formatGroupLabel}
      />
      <Button
        className="right-arrow-button"
        color="gray"
        size="3"
        disabled={student === last(students)}
        onClick={next}
      >
        <ChevronRightIcon />
      </Button>
    </Flex>
  )
}

export default CandidateSelector
