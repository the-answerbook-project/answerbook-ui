import { Flex, TextField } from '@radix-ui/themes'
import classnames from 'classnames'
import React, { FC, useCallback, useEffect, useState } from 'react'

import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'
import './index.css'

export interface FlagTaskProps extends TaskBaseProps<string> {
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

  const handleChange = useCallback(
    (e) => {
      const valueWithoutSpaces = e.target.value.replace(/\s+/g, '')
      onAnswerUpdate(valueWithoutSpaces)
    },
    [onAnswerUpdate]
  )

  return (
    <Flex align="stretch">
      {showOrnament && (
        <Flex pl="2" align="center" className={classnames('ornament', 'left-flag-ornament')}>
          <span className="monospaced">{'FLAG {'}</span>
        </Flex>
      )}
      <TextField.Root
        disabled={disabled}
        value={answer}
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
