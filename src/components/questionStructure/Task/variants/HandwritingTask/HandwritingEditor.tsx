import { Box, Card, Flex } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import React from 'react'

import Markdown from '../../../../Markdown'
import Canvas from './Canvas'
import './handwritingEditor.css'

interface HandwritingEditorProps {
  username: string
  latex: string
  onAnswerChange: (value: string) => void
  questionText: string
}

const HandwritingEditor: React.FC<HandwritingEditorProps> = ({
  username,
  latex,
  onAnswerChange,
  questionText,
}) => {
  return (
    <Flex direction="column" flexGrow="1" align="center" gap="3">
      <Markdown>{questionText}</Markdown>
      <Card className="mathjax-card">
        <Box p="3">
          <MathJax>{`\\( ${latex} \\)`}</MathJax>
        </Box>
      </Card>
      <Card className="excalidraw-canvas-card">
        <Canvas username={username} onAnswerChange={onAnswerChange} />
      </Card>
    </Flex>
  )
}

export default HandwritingEditor
