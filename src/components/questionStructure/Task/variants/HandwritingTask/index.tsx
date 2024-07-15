import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Card, Dialog, Flex, Text } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { DEFAULT_TEST_USERNAME } from '../../../../../utils/globalConstants'
import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'
import HandwritingEditor from './HandwritingEditor'
import { ViewOnlyCanvas } from './ViewOnlyCanvas'
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
      <Dialog.Trigger>
        <ViewOnlyCanvas initialData={{}} />
      </Dialog.Trigger>
      <Flex gap="3" align="center">
        <Card className="latex-preview">
          <Flex gap="3" p="3" align="center" justify="between">
            <MathJax style={{ flex: '1 0 0', textAlign: 'center' }}>
              <Text>{answer ? `\\( ${answer} \\)` : 'No Answer'}</Text>
            </MathJax>
          </Flex>
        </Card>
        <Dialog.Trigger>
          <Button variant="surface" disabled={disabled} style={{ cursor: 'pointer' }} size="4">
            Edit answer <Pencil2Icon width="1.5rem" height="1.5rem" />
          </Button>
        </Dialog.Trigger>
      </Flex>

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
