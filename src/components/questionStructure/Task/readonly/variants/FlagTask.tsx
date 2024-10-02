import { Flex, TextField } from '@radix-ui/themes'
import classnames from 'classnames'
import React, { FC } from 'react'

import { TaskType } from '../../constants'
import '../../styles/common.css'
import '../../styles/flag.css'
import { TaskBaseProps } from '../../types'

export interface FlagTaskProps extends TaskBaseProps {
  type: TaskType.FLAG
}

export const FlagTask: FC<FlagTaskProps> = ({ answer }) => {
  return (
    <Flex align="stretch">
      <Flex pl="2" align="center" className={classnames('ornament', 'left-flag-ornament')}>
        <span className="monospaced">{'FLAG {'}</span>
      </Flex>
      <TextField.Root
        disabled
        value={answer.answer}
        radius="none"
        type="text"
        maxLength={32}
        variant="soft"
        className={classnames('flag', 'monospaced')}
      />
      <Flex pr="2" align="center" className={classnames('ornament', 'right-flag-ornament')}>
        <span className="monospaced">{'}'}</span>
      </Flex>
    </Flex>
  )
}
