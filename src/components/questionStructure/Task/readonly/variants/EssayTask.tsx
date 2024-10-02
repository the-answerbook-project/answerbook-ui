import { TextArea, TextField } from '@radix-ui/themes'
import { countBy } from 'lodash'
import React, { FC } from 'react'

import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'

export interface EssayTaskProps extends TaskBaseProps {
  type: TaskType.ESSAY
}

const LINES_PADDING = 2
export const EssayTask: FC<EssayTaskProps> = ({ answer }) => {
  const lines = countBy(answer.answer)['\n']
  const commonProps = {
    value: answer.answer,
    disabled: true,
    variant: 'soft' as 'soft',
  }
  if (lines === 1) return <TextField.Root {...commonProps} />
  return <TextArea {...commonProps} resize="vertical" rows={lines + LINES_PADDING} />
}
