import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Card, Dialog, Flex } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import { isEmpty } from 'lodash'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { DEFAULT_TEST_USERNAME } from '../../../../../utils/globalConstants'
import { TaskType } from '../../constants'
import { TaskBaseProps } from '../../types'
import HandwritingEditor, { MathsHandwritingEditor } from './HandwritingEditor'
import { ViewOnlyCanvas } from './ViewOnlyCanvas'
import './index.scss'
import { MathsSingleAnswer } from './types'

export interface MathsSingleAnswerProps extends TaskBaseProps<MathsSingleAnswer> {
  type: TaskType.MATHS_SINGLE_ANSWER
  questionText: string
}

export const MathsSingleAnswerTask: FC<MathsSingleAnswerProps> = ({
  answer,
  onAnswerUpdate,
  disabled = false,
}) => {

  return (
    <Dialog.Root>
      {!isEmpty(answer?.raw?.elements) && (
        <Dialog.Trigger>
          <ViewOnlyCanvas initialData={answer!.raw.elements} />
        </Dialog.Trigger>
      )}
      <Flex gap="3" align="center">
        <Card className="latex-preview">
          <Flex p="3">
            <MathJax>{answer?.latex ? `\\( ${answer.latex} \\)` : 'No Answer'}</MathJax>
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
          <MathsHandwritingEditor
            answer={answer}
            onAnswerChange={(value) => onAnswerUpdate(JSON.stringify(value))}
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
