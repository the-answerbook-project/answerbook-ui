import { Excalidraw, MainMenu } from '@excalidraw/excalidraw'
import { Box, Flex } from '@radix-ui/themes'
import React from 'react'

const Canvas = () => {
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
