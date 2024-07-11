import { Box, Flex } from '@radix-ui/themes'
import { MathJax } from 'better-react-mathjax'
import React from 'react'

import Canvas from './Canvas'

const HandwritingEditor = () => {
  return (
    <Flex direction="column" flexGrow="1" align="center">
      <Box>
        <MathJax>{'\\(x^1\\)'}</MathJax>
      </Box>
      <Canvas />
    </Flex>
  )
}

export default HandwritingEditor
