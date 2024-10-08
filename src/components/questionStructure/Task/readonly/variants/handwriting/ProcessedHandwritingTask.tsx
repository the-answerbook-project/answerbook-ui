import { Box, Card, Flex } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import { isEmpty } from 'lodash'
import { FC } from 'react'

import { TaskType } from '../../../constants'
import { TaskBaseProps } from '../../../types'
import { ViewOnlyCanvas } from './components/ViewOnlyCanvas'

export interface ProcessedHandwritingProps extends TaskBaseProps {
  type: TaskType.PROCESSED_HANDWRITING
}

export const ProcessedHandwritingTask: FC<ProcessedHandwritingProps> = ({ answer }) => {
  const value = JSON.parse(answer.answer)
  const strokes = value?.raw?.elements
  return (
    <Box width="100%">
      <Flex gap="3" align="center">
        {value?.latex && (
          <Card className="latex-preview">
            <Flex p="3">
              <MathJax>{`\\( ${value.latex} \\)`}</MathJax>
            </Flex>
          </Card>
        )}
      </Flex>
      {!isEmpty(strokes) && <ViewOnlyCanvas initialData={strokes ?? []} />}
    </Box>
  )
}
