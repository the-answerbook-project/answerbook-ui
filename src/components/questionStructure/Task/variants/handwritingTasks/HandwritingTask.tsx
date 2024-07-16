import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { FC } from 'react'

import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'
import { HandwritingAnswer } from './types'
import HandwritingEditor from './variants/HandwritingEditor'
import { ViewOnlyCanvas } from './variants/ViewOnlyCanvas'
import { isEmpty } from "lodash"

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
    {!disabled && (
      <Flex gap="3" align="center">
        <Dialog.Trigger>
          <Button disabled={disabled} size="4">
            {answer?.raw?.elements.length ? 'Edit answer' : 'Enter answer'}{' '}
            <Pencil2Icon width="1.5rem" height="1.5rem" />
          </Button>
        </Dialog.Trigger>
      </Flex>
    )}
    <ViewOnlyCanvas initialData={answer?.raw?.elements ?? []} />

    <Dialog.Content className="excalidraw-dialog-content">
      <Flex direction="column" height="100%" gap="3">
        <HandwritingEditor
          answer={answer}
          onAnswerChange={(value) => onAnswerUpdate(JSON.stringify(value))}
        />
        <Flex justify="end">
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Flex>
    </Dialog.Content>
  </Dialog.Root>
)
