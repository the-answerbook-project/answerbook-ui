import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Card, Dialog, Flex } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import { isEmpty, isEqual } from 'lodash'
import { FC, useEffect, useMemo, useState } from 'react'

import { TaskType } from '../../../constants'
import { EditableTaskProps } from '../../../types'
import { ViewOnlyCanvas } from './components/ViewOnlyCanvas'
import { ProcessedHandwritingEditor } from './editors/ProcessedHandwritingEditor'

export interface ProcessedHandwritingProps extends EditableTaskProps {
  type: TaskType.PROCESSED_HANDWRITING
}

export const ProcessedHandwritingTask: FC<ProcessedHandwritingProps> = ({
  answer,
  onAnswerUpdate,
}) => {
  const initialValue = useMemo(
    () => (answer?.answer ? JSON.parse(answer.answer) : { latex: '' }),
    [answer]
  )

  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    if (!isEqual(value.latex, initialValue.latex)) {
      answer.answer = JSON.stringify(value)
      onAnswerUpdate(answer)
    }
  }, [answer, value, onAnswerUpdate, initialValue])

  const strokes = value?.raw?.elements
  return (
    <Dialog.Root>
      <Flex gap="3" align="center">
        <Dialog.Trigger>
          <Button size="4">
            {strokes?.length ? 'Edit answer' : 'Enter answer'}{' '}
            <Pencil2Icon width="1.5rem" height="1.5rem" />
          </Button>
        </Dialog.Trigger>
        {value?.latex && (
          <Card className="latex-preview">
            <Flex p="3">
              <MathJax>{`\\( ${value.latex} \\)`}</MathJax>
            </Flex>
          </Card>
        )}
      </Flex>
      {!isEmpty(strokes) && <ViewOnlyCanvas initialData={strokes ?? []} />}

      <Dialog.Content className="excalidraw-dialog-content">
        <Flex direction="column" height="100%" gap="3">
          <ProcessedHandwritingEditor answer={value} onAnswerChange={setValue} />
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
