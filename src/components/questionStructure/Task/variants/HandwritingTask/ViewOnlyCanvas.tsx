import { Excalidraw } from '@excalidraw/excalidraw'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'
import { Box, Card } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'

interface ViewOnlyCanvasProps {
  initialData: readonly ExcalidrawElement[]
}

export const ViewOnlyCanvas: React.FC<ViewOnlyCanvasProps> = ({ initialData }) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)

  useEffect(() => {
    setTimeout(() => {
      excalidrawAPI?.scrollToContent(undefined, {
        fitToContent: true,
      })
    })
  }, [excalidrawAPI])

  useEffect(() => {
    if (excalidrawAPI && initialData) {
      excalidrawAPI.updateScene({
        elements: initialData,
      })
    }
  }, [excalidrawAPI, initialData])

  return initialData && initialData?.length ? (
    <Card>
      <Box
        className="excalidraw-view-container excalidraw-box"
        height="calc(100% - 4px)"
        style={{ margin: '2px' }}
      >
        <Excalidraw
          excalidrawAPI={setExcalidrawAPI}
          viewModeEnabled
          initialData={{ elements: initialData }}
        />
      </Box>
    </Card>
  ) : null
}
