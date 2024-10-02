import { TextArea, TextField } from '@radix-ui/themes'
import React, { FC } from 'react'

import { TaskType } from '../../constants'
import '../../index.css'
import { TaskBaseProps } from '../../types'

export interface CodeTaskProps extends TaskBaseProps {
  type: TaskType.ESSAY
  lines?: number
}

export const CodeTask: FC<CodeTaskProps> = ({ answer, lines }) => {
  const commonProps = {
    value: answer.answer,
    disabled: true,
    variant: 'soft' as 'soft',
    className: 'monospaced',
  }
  if (lines === 1) return <TextField.Root {...commonProps} />
  return <TextArea {...commonProps} resize="vertical" rows={lines} />
}
