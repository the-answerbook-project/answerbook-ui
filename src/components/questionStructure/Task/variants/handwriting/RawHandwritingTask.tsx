import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { isEmpty } from 'lodash'
import { FC } from 'react'

import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'
import { ViewOnlyCanvas } from './components/ViewOnlyCanvas'
import RawHandwritingEditor from './editors/RawHandwritingEditor/rawHandwritingEditor'
import { RawHandwritingAnswer } from './types'

export interface RawHandwritingProps extends TaskBaseProps<RawHandwritingAnswer> {
  type: TaskType.RAW_HANDWRITING
}

export const RawHandwritingTask: FC<RawHandwritingProps> = ({
  answer,
  onAnswerUpdate,
  disabled = false,
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
    {!isEmpty(answer?.raw?.elements) && (
      <ViewOnlyCanvas initialData={answer?.raw?.elements ?? []} minHeight="500px" />
    )}

    <Dialog.Content className="excalidraw-dialog-content">
      <Flex direction="column" height="100%" gap="3">
        <RawHandwritingEditor
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
