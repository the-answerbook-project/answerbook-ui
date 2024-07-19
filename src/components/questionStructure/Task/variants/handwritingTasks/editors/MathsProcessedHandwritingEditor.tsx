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
import './mathjax.css'

type MathsProcessedHandwritingEditorProps =
  GenericHandwritingEditorProps<MathsProcessedHandwritingAnswer> & {
    restricted?: never
  }
export const MathsProcessedHandwritingEditor: React.FC<MathsProcessedHandwritingEditorProps> = ({
  answer,
  onAnswerChange,
  children,
}) => {
  const { updateStrokes } = useLiveUpdates()

  const setHandwriting = useCallback(
    ({ raw }: RawHandwritingAnswer) => {
      const result: MathsProcessedHandwritingAnswer = {
        latex: '',
        ...answer,
        raw: {
          ...answer?.raw,
          ...raw,
        },
      }

      if (raw) {
        updateStrokes(raw).then((latex) => {
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
    <RawHandwritingEditor onAnswerChange={setHandwriting} answer={answer} restricted>
      <Card className="mathjax-card">
        <Box p="3" style={{ fontSize: '1.5em' }}>
          <MathJax>{`\\( ${answer?.latex ?? ''} \\)`}</MathJax>
        </Box>
      </Card>
      {children}
    </RawHandwritingEditor>
  )
}
