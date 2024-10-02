import { Flex, TextField } from '@radix-ui/themes'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { FC, useEffect, useMemo, useState } from 'react'

import useDebounce from '../../../../../hooks/debouncing'
import { TaskType } from '../../constants'
import '../../flagTask.css'
import { AssessmentTaskProps } from '../../types'

export interface FlagTaskProps extends AssessmentTaskProps {
  type: TaskType.FLAG
  showOrnament?: boolean
}

export const FlagTask: FC<FlagTaskProps> = ({
  answer,
  onAnswerUpdate,
  showOrnament = true,
  disabled = false,
}) => {
  const FLAG_LENGTH = 32
  const initialValue = useMemo(() => answer?.answer ?? '', [answer])
  const [value, setValue] = useState(initialValue)
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    // Call save half a second after the last typed character
    if (!isEqual(debouncedValue, initialValue)) {
      answer.answer = debouncedValue
      onAnswerUpdate(answer)
    }
  }, [debouncedValue, answer, onAnswerUpdate, initialValue])

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\s+/g, '')
    setValue(newValue)
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
        value={value}
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
