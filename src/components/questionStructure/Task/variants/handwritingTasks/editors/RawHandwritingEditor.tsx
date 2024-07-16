import { Card, Flex } from '@radix-ui/themes'
import React from 'react'

import Canvas from '../components/Canvas'
import { GenericHandwritingEditorProps, RawHandwritingAnswer } from '../types'

import './handwritingEditor.css'

type RawHandwritingEditorProps = GenericHandwritingEditorProps<RawHandwritingAnswer>

const RawHandwritingEditor: React.FC<RawHandwritingEditorProps> = ({
  answer,
  onAnswerChange,
  children,
  restricted,
}) => {
  return (
    <Flex direction="column" flexGrow="1" align="center" gap="3">
      {children}
      <Card
        className="excalidraw-canvas-card"
      >
        <Canvas
          updateStrokes={onAnswerChange}
          // @ts-expect-error: this is not just initialData
          initialData={answer?.excalidraw ?? {}}
          restricted={restricted}
        />
      </Card>
    </Flex>
  )
}

export default RawHandwritingEditor
