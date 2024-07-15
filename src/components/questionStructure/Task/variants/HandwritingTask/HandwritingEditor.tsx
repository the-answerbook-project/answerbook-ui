import { Box, Card, Flex } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import React, { useCallback, useEffect } from 'react'

import './handwritingEditor.css'
import Canvas from '../components/Canvas'
import useLiveUpdates from './live-updates.hook'
import { HandwritingAnswer, MathsSingleAnswer } from './types'

interface HandwritingEditorProps<ShowLatex extends boolean> {
  username: string
  answer?: ShowLatex extends true ? MathsSingleAnswer : HandwritingAnswer
  onAnswerChange: (value: string) => void
  questionText: string
  showLatex?: ShowLatex
}

function isMathsSingleAnswer(answer: HandwritingAnswer | undefined): answer is MathsSingleAnswer {
  return answer ? 'latex' in answer : false
}

const LiveUpdatingLatex: React.FC<{
  username: string
  answer: MathsSingleAnswer
  setLatex: (latex: string) => void
}> = ({ answer, username, setLatex }) => {
  const { updateStrokes } = useLiveUpdates(username, setLatex)

  useEffect(() => {
    if (answer.raw) {
      updateStrokes(answer.raw)
    }
  }, [updateStrokes, answer])

  return (
    <Box p="3">
      <MathJax>{`\\( ${answer?.latex ?? ''} \\)`}</MathJax>
    </Box>
  )
}

function HandwritingEditor<ShowLatex extends boolean>({
  username,
  answer,
  onAnswerChange,
  questionText,
  showLatex,
}: HandwritingEditorProps<ShowLatex>) {
  const setHandwriting = useCallback(
    (raw: HandwritingAnswer['raw']) => {
      const result: HandwritingAnswer = {
        ...answer,
        raw,
      }
      onAnswerChange(JSON.stringify(result))
    },
    [answer, onAnswerChange]
  )

  const setLatex = useCallback(
    (latex: string) => {
      onAnswerChange(
        JSON.stringify({
          ...answer,
          latex,
        })
      )
    },
    [answer, onAnswerChange]
  )

  console.log(answer)
  // @ts-ignore
  return (
    <Flex direction="column" flexGrow="1" align="center" gap="3">

      {answer && isMathsSingleAnswer(answer) && (
        <Card
          className="mathjax-card"
        >
          <LiveUpdatingLatex setLatex={setLatex} username={username} answer={answer} />
        </Card>
      )}

      <Card
        className="excalidraw-canvas-card"
      >
        <Canvas
          username={username}
          updateStrokes={setHandwriting}
          // @ts-expect-error: this is not just initialData
          initialData={answer?.raw ?? {}}
        />
      </Card>
    </Flex>
  )
}

export default HandwritingEditor
