import { Box, Card, Flex } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import React, { useCallback } from 'react'

import './handwritingEditor.css'
import Canvas from '../components/Canvas'
import useLiveUpdates from './live-updates.hook'
import { HandwritingAnswer, MathsSingleAnswer } from './types'

interface HandwritingEditorProps {
  answer?: HandwritingAnswer
  onAnswerChange: (value: HandwritingAnswer['raw']) => void
  children?: React.ReactNode // This line allows children
}

interface MathsHandwritingEditorProps {
  answer?: MathsSingleAnswer
  onAnswerChange: (value: MathsSingleAnswer) => void
  children?: React.ReactNode // This line allows children
}

const HandwritingEditor: React.FC<HandwritingEditorProps> = ({
  answer,
  onAnswerChange,
  children,
}) => {
  return (
    <Flex direction="column" flexGrow="1" align="center" gap="3">
      {children}
      <Card
        style={{
          flexGrow: 1,
          flexShrink: 0,
          width: '100%',
        }}
      >
        <Canvas
          updateStrokes={onAnswerChange}
          // @ts-expect-error: this is not just initialData
          initialData={answer?.excalidraw ?? {}}
        />
      </Card>
    </Flex>
  )
}

export const MathsHandwritingEditor: React.FC<MathsHandwritingEditorProps> = ({
  answer,
  onAnswerChange,
}) => {
  const setLatex = useCallback(
    (latex: string) => {
      console.log('SET LATEX')
      onAnswerChange({
        ...answer,
        latex,
      })
    },
    [answer, onAnswerChange]
  )

  const { updateStrokes } = useLiveUpdates(setLatex)

  const setHandwriting = useCallback(
    (raw: HandwritingAnswer['raw']) => {
      console.log('SET HANDWRITING')
      const result: MathsSingleAnswer = {
        latex: '',
        ...answer,
        raw,
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
    <HandwritingEditor onAnswerChange={setHandwriting} answer={answer}>
      {
        <Card
          className="mathjax-card"
        >
          <Box p="3">
            <MathJax>{`\\( ${answer?.latex} \\)`}</MathJax>
          </Box>
        </Card>
      }
    </HandwritingEditor>
  )
}

export default HandwritingEditor
