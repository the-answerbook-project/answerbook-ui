import { Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Card, Flex, IconButton, Text, TextArea, TextField } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import classnames from 'classnames'
import React, { FC, useEffect, useState } from 'react'

import { TaskType } from '../../constants'
import { defaultOnChangeHandler } from '../../index'
import { TaskBaseProps } from '../../types'
import './index.css'

export interface HandwritingTaskProps extends TaskBaseProps<string> {
  type: TaskType.ESSAY
}

export const HandwritingTask: FC<HandwritingTaskProps> = ({
  answer,
  onAnswerUpdate,
  disabled = false,
}) => {
  return (
    <Card className={classnames('latex-preview')}>
      <Flex gap="3" p="3" align="center" justify="between">
        <MathJax style={{ flex: '1 0 0', textAlign: 'center' }}>
          <Text>\( 2x \)</Text>
        </MathJax>
        <IconButton variant="surface" disabled={disabled}>
          <Pencil2Icon />
        </IconButton>
      </Flex>
    </Card>
  )
}
