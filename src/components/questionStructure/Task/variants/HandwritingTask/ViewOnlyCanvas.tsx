import { Excalidraw } from '@excalidraw/excalidraw'
import {
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from '@excalidraw/excalidraw/types/types'
import { Box, Card } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'

export const ViewOnlyCanvas: React.FC<{ initialData: ExcalidrawInitialDataState }> = ({
  initialData,
}) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)

  useEffect(() => {
    setTimeout(() => {
      excalidrawAPI?.scrollToContent(undefined, {
        fitToContent: true,
      })
    })
  }, [excalidrawAPI])

  return (
    <Card>
      <Box
        className="excalidraw-view-container"
        height="calc(100% - 4px)"
        style={{ margin: '2px' }}
      >
        <Excalidraw excalidrawAPI={setExcalidrawAPI} viewModeEnabled initialData={initialData} />
      </Box>
    </Card>
  )
}
