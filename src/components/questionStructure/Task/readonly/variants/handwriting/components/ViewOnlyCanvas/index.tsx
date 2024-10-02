import { Excalidraw } from '@excalidraw/excalidraw'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'
import { Box, Card } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'

import './index.scss'

interface ViewOnlyCanvasProps {
  initialData: readonly ExcalidrawElement[]
  minHeight?: string
}

export const ViewOnlyCanvas: React.FC<ViewOnlyCanvasProps> = ({
  initialData,
  minHeight = '200px',
}) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)

  useEffect(() => {
    if (excalidrawAPI && initialData) {
      excalidrawAPI.updateScene({
        elements: initialData,
      })
    }
    setTimeout(() => {
      excalidrawAPI?.scrollToContent(undefined, {
        fitToContent: true,
      })
    })
  }, [excalidrawAPI, initialData])

  return (
    <Card>
      <Box minHeight={minHeight}>
        <Excalidraw
          excalidrawAPI={setExcalidrawAPI}
          viewModeEnabled
          initialData={{ elements: initialData }}
        />
      </Box>
    </Card>
  )
}
