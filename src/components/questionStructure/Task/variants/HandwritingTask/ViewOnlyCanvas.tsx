import { Excalidraw } from '@excalidraw/excalidraw'
import {
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from '@excalidraw/excalidraw/types/types'
import { Box, Card } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'

interface ViewOnlyCanvasProps {
  initialData: ExcalidrawInitialDataState
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

  return initialData && initialData.elements?.length ? (
    <Card>
      <Box
        className="excalidraw-view-container"
        height="calc(100% - 4px)"
        style={{ margin: '2px' }}
      >
        <Excalidraw excalidrawAPI={setExcalidrawAPI} viewModeEnabled initialData={initialData} />
      </Box>
    </Card>
  ) : null
}
