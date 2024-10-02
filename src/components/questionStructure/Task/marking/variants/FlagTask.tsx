import { Code, Flex } from '@radix-ui/themes'
import classnames from 'classnames'
import React, { FC } from 'react'

import { TaskType } from '../../constants'
import '../../flagTask.css'
import '../../index.css'
import { AssessmentTaskProps } from '../../types'

export interface FlagTaskProps extends AssessmentTaskProps {
  type: TaskType.FLAG
  showOrnament?: boolean
}

export const FlagTask: FC<FlagTaskProps> = ({ answer, showOrnament = true }) => {
  return (
    <Flex align="stretch">
      {showOrnament && (
        <Flex pl="2" align="center" className={classnames('ornament', 'left-flag-ornament')}>
          <span className="monospaced">{'FLAG {'}</span>
        </Flex>
      )}
      <Code variant="ghost" className="flag">
        {answer.answer}
      </Code>
      {showOrnament && (
        <Flex pr="2" align="center" className={classnames('ornament', 'right-flag-ornament')}>
          <span className="monospaced">{'}'}</span>
        </Flex>
      )}
    </Flex>
  )
}
