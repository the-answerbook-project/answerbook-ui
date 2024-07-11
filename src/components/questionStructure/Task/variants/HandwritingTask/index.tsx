import { TextArea, TextField } from '@radix-ui/themes'
import React, { FC, useEffect, useState } from 'react'

import { TaskType } from '../../constants'
import { defaultOnChangeHandler } from '../../index'
import { TaskBaseProps } from '../../types'

export interface HandwritingTaskProps extends TaskBaseProps<string> {
  type: TaskType.ESSAY
}

export const HandwritingTask: FC<HandwritingTaskProps> = ({
  answer,
  onAnswerUpdate,
  disabled = false,
}) => {
  const commonProps = {
    value: answer,
    onChange: defaultOnChangeHandler(onAnswerUpdate),
    placeholder: 'Your answer here…',
    disabled: disabled,
    variant: 'soft' as 'soft',
  }
  return <TextArea {...commonProps} resize="vertical" />
}
