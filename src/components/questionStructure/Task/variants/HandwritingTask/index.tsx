import { Pencil2Icon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import classnames from 'classnames'
import React, { FC, useEffect, useState } from 'react'

import { TaskType } from '../../constants'
import { defaultOnChangeHandler } from '../../index'
import { TaskBaseProps } from '../../types'
import HandwritingEditor from './HandwritingEditor'
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
    <Dialog.Root>
      <Card className={classnames('latex-preview')}>
        <Flex gap="3" p="3" align="center" justify="between">
          <MathJax style={{ flex: '1 0 0', textAlign: 'center' }}>
            <Text>\( 2x \)</Text>
          </MathJax>
          <Dialog.Trigger>
            <IconButton variant="surface" disabled={disabled}>
              <Pencil2Icon />
            </IconButton>
          </Dialog.Trigger>
        </Flex>
      </Card>

      <Dialog.Content style={{ minWidth: '90vw', height: '80vh' }}>
        <Flex direction="column" height="100%">
          <HandwritingEditor />
          <Flex justify="end">
            <Dialog.Close>
              <Button>Save LaTeX</Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
