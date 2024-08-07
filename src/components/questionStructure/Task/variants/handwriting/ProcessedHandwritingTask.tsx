import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Card, Dialog, Flex } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import { isEmpty } from 'lodash'
import { FC } from 'react'

import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'
import { ViewOnlyCanvas } from './components/ViewOnlyCanvas'
import { ProcessedHandwritingEditor } from './editors/ProcessedHandwritingEditor'
import { ProcessedHandwritingAnswer } from './types'

export interface ProcessedHandwritingProps extends TaskBaseProps<ProcessedHandwritingAnswer> {
  type: TaskType.PROCESSED_HANDWRITING
}

export const ProcessedHandwritingTask: FC<ProcessedHandwritingProps> = ({
  answer,
  onAnswerUpdate,
  disabled = false,
}) => {
  const strokes = answer?.raw?.elements
  return (
    <Dialog.Root>
      <Flex gap="3" align="center">
        {!disabled && (
          <Dialog.Trigger>
            <Button disabled={disabled} size="4">
              {strokes?.length ? 'Edit answer' : 'Enter answer'}{' '}
              <Pencil2Icon width="1.5rem" height="1.5rem" />
            </Button>
          </Dialog.Trigger>
        )}
        {answer?.latex && (
          <Card className="latex-preview">
            <Flex p="3">
              <MathJax>{`\\( ${answer.latex} \\)`}</MathJax>
            </Flex>
          </Card>
        )}
      </Flex>
      {!isEmpty(strokes) && <ViewOnlyCanvas initialData={strokes ?? []} />}

      <Dialog.Content className="excalidraw-dialog-content">
        <Flex direction="column" height="100%" gap="3">
          <ProcessedHandwritingEditor
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
}
