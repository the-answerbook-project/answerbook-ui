import { Excalidraw, MainMenu } from '@excalidraw/excalidraw'
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'
import { Box, Flex } from '@radix-ui/themes'
import React, { useState } from 'react'

import useLiveUpdates from './live-updates.hook'

const Canvas: React.FC<{ username: string; onAnswerChange: (value: string) => void }> = ({
  username,
  onAnswerChange,
}) => {
  const { updateStrokes } = useLiveUpdates(username, onAnswerChange)
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)

  return (
    <Box
      flexGrow="1"
      flexShrink="0"
      width="100%"
      // onKeyDownCapture={keyDownHandler}
      onDoubleClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <Excalidraw
        zenModeEnabled
        UIOptions={{ tools: { image: false } }}
        gridModeEnabled
        // excalidrawAPI={setExcalidrawAPI}
        // initialData={excalidrawData}
        // onPaste={pasteHandler}
      >
        <MainMenu>
          {/* <MainMenu.Item onSelect={clearCanvas}>Clear canvas</MainMenu.Item> */}
        </MainMenu>
      </Excalidraw>
    </Box>
  )
}

export default Canvas
