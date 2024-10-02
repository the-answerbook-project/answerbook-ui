import { Card, Flex } from '@radix-ui/themes'
import React from 'react'

import Canvas from '../../components/Canvas'
import { GenericHandwritingEditorProps, RawHandwritingAnswer } from '../../types'
import './index.css'

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
      <Card className="excalidraw-canvas-card">
        <Canvas
          updateStrokes={onAnswerChange}
          // @ts-expect-error: Types of initialData and answer are essentially the same but TypeScript doesn't recognize it
          initialData={answer?.raw ?? {}}
          restricted={restricted}
        />
      </Card>
    </Flex>
  )
}

export default RawHandwritingEditor
