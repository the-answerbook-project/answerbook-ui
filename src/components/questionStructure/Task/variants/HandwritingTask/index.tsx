import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Card, Dialog, Flex, IconButton, Text } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import classnames from 'classnames'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { DEFAULT_TEST_USERNAME } from '../../../../../utils/globalConstants'
import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'
import HandwritingEditor from './HandwritingEditor'
import './index.scss'

export interface HandwritingTaskProps extends TaskBaseProps<string> {
  type: TaskType.MATHS_SINGLE_ANSWER
  questionText: string
}

export const HandwritingTask: FC<HandwritingTaskProps> = ({
  answer,
  onAnswerUpdate,
  disabled = false,
  questionText,
}) => {
  const { username = DEFAULT_TEST_USERNAME } = useParams()

  return (
    <Dialog.Root>
      <Card className={classnames('latex-preview')}>
        <Flex gap="3" p="3" align="center" justify="between">
          <MathJax style={{ flex: '1 0 0', textAlign: 'center' }}>
            <Text>{answer}</Text>
          </MathJax>
          <Dialog.Trigger>
            <IconButton variant="surface" disabled={disabled}>
              <Pencil2Icon />
            </IconButton>
          </Dialog.Trigger>
        </Flex>
      </Card>

      <Dialog.Content style={{ minWidth: '90vw', height: '80vh' }}>
        <Flex direction="column" height="100%" gap="3">
          <HandwritingEditor
            latex={answer ?? ''}
            onAnswerChange={onAnswerUpdate}
            username={username}
            questionText={questionText}
          />
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
