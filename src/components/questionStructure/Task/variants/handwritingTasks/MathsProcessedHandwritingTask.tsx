import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Card, Dialog, Flex, Text } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import { isEmpty } from 'lodash'
import { FC } from 'react'

import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'
import { ViewOnlyCanvas } from './components/ViewOnlyCanvas'
import { MathsProcessedHandwritingEditor } from './editors/MathsProcessedHandwritingEditor'
import { MathsProcessedHandwritingAnswer } from './types'

export interface MathsProcessedHandwriting extends TaskBaseProps<MathsProcessedHandwritingAnswer> {
  type: TaskType.PROCESSED_HANDWRITING
}

export const MathsProcessedHandwritingTask: FC<MathsProcessedHandwriting> = ({
  answer,
  onAnswerUpdate,
  disabled = false,
}) => (
  <Dialog.Root>
    <Flex gap="3" align="center">
      {!disabled && (
        <Dialog.Trigger>
          <Button disabled={disabled} size="4">
            {answer?.raw?.elements.length ? 'Edit answer' : 'Enter answer'}{' '}
            <Pencil2Icon width="1.5rem" height="1.5rem" />
          </Button>
        </Dialog.Trigger>
      )}
      {answer?.latex && (
        <Card style={{ flexGrow: 1 }}>
          <Flex gap="3" p="3" align="center" justify="between">
            <MathJax style={{ flex: '1 0 0', textAlign: 'center', fontSize: '1.5em' }}>
              <Text>{`\\( ${answer.latex} \\)`}</Text>
            </MathJax>
          </Flex>
        </Card>
      )}
    </Flex>
    {!isEmpty(answer?.raw?.elements) && (
      <ViewOnlyCanvas initialData={answer?.raw?.elements ?? []} />
    )}

    <Dialog.Content className="excalidraw-dialog-content">
      <Flex direction="column" height="100%" gap="3">
        <MathsProcessedHandwritingEditor
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
