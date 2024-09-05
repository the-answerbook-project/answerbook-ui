import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { isEmpty, isEqual } from 'lodash'
import { FC, useEffect, useMemo, useState } from 'react'

import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'
import { ViewOnlyCanvas } from './components/ViewOnlyCanvas'
import RawHandwritingEditor from './editors/RawHandwritingEditor/rawHandwritingEditor'

export interface RawHandwritingProps extends TaskBaseProps {
  type: TaskType.RAW_HANDWRITING
}

export const RawHandwritingTask: FC<RawHandwritingProps> = ({
  answer,
  onAnswerUpdate,
  disabled = false,
}) => {
  const initialValue = useMemo(() => (answer?.answer ? JSON.parse(answer.answer) : {}), [answer])

  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    if (!isEqual(value.latex, initialValue.latex)) {
      answer.answer = JSON.stringify(value)
      onAnswerUpdate(answer)
    }
  }, [answer, value, onAnswerUpdate, initialValue])

  return (
    <Dialog.Root>
      {!disabled && (
        <Flex gap="3" align="center">
          <Dialog.Trigger>
            <Button disabled={disabled} size="4">
              {value?.raw?.elements.length ? 'Edit answer' : 'Enter answer'}{' '}
              <Pencil2Icon width="1.5rem" height="1.5rem" />
            </Button>
          </Dialog.Trigger>
        </Flex>
      )}
      {!isEmpty(value?.raw?.elements) && (
        <ViewOnlyCanvas initialData={value?.raw?.elements ?? []} minHeight="500px" />
      )}

      <Dialog.Content className="excalidraw-dialog-content">
        <Flex direction="column" height="100%" gap="3">
          <RawHandwritingEditor answer={value} onAnswerChange={setValue} />
          <Flex justify="end">
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
