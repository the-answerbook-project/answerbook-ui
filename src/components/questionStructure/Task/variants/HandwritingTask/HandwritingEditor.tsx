import { Box, Card, Flex } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import React from 'react'

import Markdown from '../../../../Markdown'
import Canvas from './Canvas'
import './handwritingEditor.css'
import { HandwritingAnswer } from './types'

interface HandwritingEditorProps {
  username: string
  answer?: HandwritingAnswer
  onAnswerChange: (value: string) => void
}

const HandwritingEditor: React.FC<HandwritingEditorProps> = ({
  username,
  answer,
  onAnswerChange,
}) => {
  return (
    <Flex direction="column" flexGrow="1" align="center" gap="3">
      <Card className="mathjax-card">
        <Box p="3">
          <MathJax>{`\\( ${answer?.latex} \\)`}</MathJax>
        </Box>
      </Card>
      <Card className="excalidraw-canvas-card">
        <Canvas username={username} onAnswerChange={onAnswerChange} initialData={answer?.excalidraw?.elements ?? []} />
      </Card>
    </Flex>
  )
}

export default HandwritingEditor
