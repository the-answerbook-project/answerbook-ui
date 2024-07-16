import { Box, Card } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import React, { useCallback } from 'react'

import useLiveUpdates from '../hooks/live-updates.hook'
import { GenericHandwritingEditorProps, HandwritingAnswer, MathsSingleAnswer } from '../types'
import HandwritingEditor from './HandwritingEditor'

type MathsHandwritingEditorProps = GenericHandwritingEditorProps<MathsSingleAnswer> & {
  restricted?: never
}
export const MathsHandwritingEditor: React.FC<MathsHandwritingEditorProps> = ({
  answer,
  onAnswerChange,
  questionText,
  children,
}) => {
  const { updateStrokes } = useLiveUpdates()

  const setHandwriting = useCallback(
    ({ excalidraw }: HandwritingAnswer) => {
      const result: MathsSingleAnswer = {
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
    <HandwritingEditor
      onAnswerChange={setHandwriting}
      answer={answer}
      questionText={questionText}
      restricted
    >
      <Card
        className="mathjax-card"
      >
        <Box p="3">
          <MathJax>{`\\( ${answer?.latex} \\)`}</MathJax>
        </Box>
      </Card>
      {children}
    </HandwritingEditor>
  )
}
