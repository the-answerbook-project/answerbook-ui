import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Badge, Button, Flex, Section } from '@radix-ui/themes'
import { first, indexOf, isUndefined, last } from 'lodash'
import React, { FC, ReactNode, useMemo } from 'react'
import Select from 'react-select'

import { Student } from '../../../types/marking'

type Option = {
  value: string
  label: string
}

type GroupedOption = {
  label: string
  options: Option[]
}

interface ToolbarProps {
  students: Student[]
  selected: Student | undefined
  onSelect: (student: Student | undefined) => void
}

const Toolbar: FC<ToolbarProps> = ({ students, selected, onSelect }) => {
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
      isUndefined(selected)
        ? undefined
        : {
            value: selected.username,
            label: selected.cid,
          },
    [selected]
  )

  function handleChange(newValue) {
    onSelect(students.find((s) => s.username === newValue.value))
  }

  const prev = () => onSelect(students[indexOf(students, selected) - 1])
  const next = () => onSelect(students[indexOf(students, selected) + 1])

  const formatGroupLabel = (data): ReactNode => (
    <Flex justify="between">
      <span>{data.label}</span>
      <Badge color="gray" radius="full">
        {data.options.length}
      </Badge>
    </Flex>
  )

  return (
    <Section
      p="3"
      position="fixed"
      top="0"
      width="100%"
      style={{ backgroundColor: 'var(--gray-8)', zIndex: 1000 }}
    >
      <Flex align="center" justify="center">
        <Button
          color="gray"
          size="3"
          disabled={isUndefined(selected) || selected === first(students)}
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
        <Button color="gray" size="3" disabled={selected === last(students)} onClick={next}>
          <ChevronRightIcon />
        </Button>
      </Flex>
    </Section>
  )
}

export default Toolbar
