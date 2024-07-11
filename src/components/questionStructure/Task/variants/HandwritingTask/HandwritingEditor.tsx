import { Box, Flex } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import React from 'react'

import Canvas from './Canvas'

const HandwritingEditor: React.FC<{
  username: string
  latex: string
  onAnswerChange: (value: string) => void
}> = ({ username, latex, onAnswerChange }) => {
  return (
    <Flex direction="column" flexGrow="1" align="center">
      <Box>
        <MathJax>{latex}</MathJax>
      </Box>
      <Canvas username={username} onAnswerChange={onAnswerChange} />
    </Flex>
  )
}

export default HandwritingEditor
