import { Card, Flex } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import React from 'react'

import Canvas from './Canvas'

const HandwritingEditor: React.FC<{
  username: string
  latex: string
  onAnswerChange: (value: string) => void
}> = ({ username, latex, onAnswerChange }) => {
  return (
    <Flex direction="column" flexGrow="1" align="center" gap="3">
      <Card
        style={{
          minHeight: '3.5em',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MathJax>{latex}</MathJax>
      </Card>
      <Card
        style={{
          flexGrow: 1,
          flexShrink: 0,
          width: '100%',
        }}
      >
        <Canvas username={username} onAnswerChange={onAnswerChange} />
      </Card>
    </Flex>
  )
}

export default HandwritingEditor
