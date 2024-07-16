import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { FC } from 'react'

import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'
import './index.scss'
import { HandwritingAnswer } from './types'
import HandwritingEditor from './variants/HandwritingEditor'
import { ViewOnlyCanvas } from './variants/ViewOnlyCanvas'

export interface HandwritingProps extends TaskBaseProps<HandwritingAnswer> {
  type: TaskType.HANDWRITING
  questionText: string
}

export const HandwritingTask: FC<HandwritingProps> = ({
  answer,
  onAnswerUpdate,
  disabled = false,
  questionText,
}) => (
  <Dialog.Root>
    <Dialog.Trigger>
      <ViewOnlyCanvas initialData={answer?.excalidraw?.elements ?? []} />
    </Dialog.Trigger>
    <Flex gap="3" align="center">
      <Dialog.Trigger>
        <Button variant="surface" disabled={disabled} style={{ cursor: 'pointer' }} size="4">
          Edit answer <Pencil2Icon width="1.5rem" height="1.5rem" />
        </Button>
      </Dialog.Trigger>
    </Flex>

    <Dialog.Content style={{ minWidth: '90vw', height: '80vh' }}>
      <Flex direction="column" height="100%" gap="3">
        <HandwritingEditor
          answer={answer}
          onAnswerChange={(value) => onAnswerUpdate(JSON.stringify(value))}
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
