import { TextField } from '@radix-ui/themes'
import React, { FC } from 'react'

import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'

export interface NumberTaskProps extends TaskBaseProps {
  type: TaskType.INTEGER
}

export const NumberTask: FC<NumberTaskProps> = ({ answer }) => {
  return <TextField.Root disabled value={answer.answer} type="number" variant="soft" />
}
