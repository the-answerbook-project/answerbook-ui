import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Badge, Button, Flex } from '@radix-ui/themes'
import { first, indexOf, isUndefined, last } from 'lodash'
import React, { FC, ReactNode, useMemo } from 'react'
import Select from 'react-select'

import { Student } from '../../../../../types/marking'

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

  return (
    <Flex align="center" justify="center">
      <Button
        color="gray"
        size="3"
        disabled={isUndefined(student) || student === first(students)}
        onClick={prev}
      >
        <ChevronLeftIcon />
      </Button>
      <div style={{ width: '30%' }}>
        <Select
          placeholder={'Select a student...'}
          value={value}
          onChange={handleChange}
          options={groupedOptions}
          formatGroupLabel={formatGroupLabel}
        />
      </div>
      <Button color="gray" size="3" disabled={student === last(students)} onClick={next}>
        <ChevronRightIcon />
      </Button>
    </Flex>
  )
}

export default CandidateSelector
