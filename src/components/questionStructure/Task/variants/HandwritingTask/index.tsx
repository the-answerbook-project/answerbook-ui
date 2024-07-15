import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Card, Dialog, Flex } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { DEFAULT_TEST_USERNAME } from '../../../../../utils/globalConstants'
import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'
import HandwritingEditor from './HandwritingEditor'
import { ViewOnlyCanvas } from './ViewOnlyCanvas'
import './index.scss'
import { HandwritingAnswer } from './types'

export interface HandwritingTaskProps extends TaskBaseProps<HandwritingAnswer> {
  type: TaskType.PROCESSED_HANDWRITING
}

export const HandwritingTask: FC<HandwritingTaskProps> = ({
  answer,
  onAnswerUpdate,
  disabled = false,
}) => {
  const { username = DEFAULT_TEST_USERNAME } = useParams()

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <ViewOnlyCanvas initialData={answer?.excalidraw?.elements ?? []} />
      </Dialog.Trigger>
      <Flex gap="3" align="center">
        <Card className="latex-preview">
          <Flex p="3">
            <MathJax>{answer ? `\\( ${answer} \\)` : 'No Answer'}</MathJax>
          </Flex>
        </Card>
        <Dialog.Trigger>
          <Button disabled={disabled} size="4">
            Edit answer <Pencil2Icon width="1.5rem" height="1.5rem" />
          </Button>
        </Dialog.Trigger>
      </Flex>

      <Dialog.Content className="excalidraw-dialog-content">
        <Flex direction="column" height="100%" gap="3">
          <HandwritingEditor
            latex={answer?.latex ?? ''}
            onAnswerChange={onAnswerUpdate}
            username={username}
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
