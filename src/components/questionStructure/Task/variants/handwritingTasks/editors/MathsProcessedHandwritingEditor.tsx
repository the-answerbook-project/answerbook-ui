import { Box, Card } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import React, { useCallback } from 'react'

import useLiveUpdates from '../hooks/live-updates.hook'
import {
  GenericHandwritingEditorProps,
  MathsProcessedHandwritingAnswer,
  RawHandwritingAnswer,
} from '../types'
import RawHandwritingEditor from './RawHandwritingEditor'

type MathsProcessedHandwritingEditorProps =
  GenericHandwritingEditorProps<MathsProcessedHandwritingAnswer> & {
    restricted?: never
  }
export const MathsProcessedHandwritingEditor: React.FC<MathsProcessedHandwritingEditorProps> = ({
  answer,
  onAnswerChange,
  questionText,
  children,
}) => {
  const { updateStrokes } = useLiveUpdates()

  const setHandwriting = useCallback(
    ({ excalidraw }: RawHandwritingAnswer) => {
      const result: MathsProcessedHandwritingAnswer = {
        latex: '',
        ...answer,
        excalidraw: {
          elements: [],
          ...answer?.excalidraw,
          ...excalidraw,
        },
      }

      if (excalidraw) {
        updateStrokes(excalidraw).then((latex) => {
          result.latex = latex
          onAnswerChange(result)
        })
      } else {
        onAnswerChange(result)
      }
    },
    [answer, onAnswerChange, updateStrokes]
  )

  return (
    <RawHandwritingEditor
      onAnswerChange={setHandwriting}
      answer={answer}
      questionText={questionText}
      restricted
    >
      <Card
        className="mathjax-card"
      >
        <Box p="3" style={{ fontSize: '1.5em' }}>
          <MathJax>{`\\( ${answer?.latex} \\)`}</MathJax>
        </Box>
      </Card>
      {children}
    </RawHandwritingEditor>
  )
}
