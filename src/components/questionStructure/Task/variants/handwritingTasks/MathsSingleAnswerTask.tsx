import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Card, Dialog, Flex, Text } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import { FC } from 'react'

import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'
import { MathsSingleAnswer } from './types'
import { MathsHandwritingEditor } from './variants/MathsHandwritingEditor'
import { ViewOnlyCanvas } from './variants/ViewOnlyCanvas'

export interface MathsSingleAnswerProps extends TaskBaseProps<MathsSingleAnswer> {
  type: TaskType.MATHS_SINGLE_ANSWER
  questionText: string
}

export const MathsSingleAnswerTask: FC<MathsSingleAnswerProps> = ({
  answer,
  onAnswerUpdate,
  disabled = false,
  questionText,
}) => (
  <Dialog.Root>
    <Dialog.Trigger>
      <ViewOnlyCanvas initialData={answer?.raw?.elements ?? []} />
    </Dialog.Trigger>
    <Flex gap="3" align="center">
      <Card style={{ flexGrow: 1 }}>
        <Flex gap="3" p="3" align="center" justify="between">
          <MathJax style={{ flex: '1 0 0', textAlign: 'center' }}>
            <Text>{answer?.latex ? `\\( ${answer.latex} \\)` : 'No Answer'}</Text>
          </MathJax>
        </Flex>
      </Card>
      <Dialog.Trigger>
        <Button variant="surface" disabled={disabled} style={{ cursor: 'pointer' }} size="4">
          Edit answer <Pencil2Icon width="1.5rem" height="1.5rem" />
        </Button>
      </Dialog.Trigger>
    </Flex>

    <Dialog.Content className="excalidraw-dialog-content">
      <Flex direction="column" height="100%" gap="3">
        <MathsHandwritingEditor
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
