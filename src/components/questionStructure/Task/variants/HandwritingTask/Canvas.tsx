import { Excalidraw, MainMenu } from '@excalidraw/excalidraw'
import { ClipboardData } from '@excalidraw/excalidraw/types/clipboard'
import { AppState, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'
import { Box, Flex } from '@radix-ui/themes'
import classNames from 'classnames'
import React, {
  KeyboardEventHandler,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import axiosInstance from '../../../../../api/axiosInstance'
import { ConfirmDialog } from './ConfirmDialog'
import useLiveUpdates from './live-updates.hook'

const stopEvent = (e: SyntheticEvent | Event) => {
  e.preventDefault()
  e.stopPropagation()
}

const Canvas: React.FC<{ username: string; onAnswerChange: (value: string) => void }> = ({
  username,
  onAnswerChange,
}) => {
  const { updateStrokes } = useLiveUpdates(username, onAnswerChange)
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)
  const [clearDialogOpen, setClearDialogOpen] = useState(false)

  const clearCanvas = useCallback(() => {
    updateStrokes({ elements: [] })
    excalidrawAPI?.updateScene({ elements: [] })
  }, [excalidrawAPI, updateStrokes])

  // HACK: Disable Excalidraw right click menu
  const excalidrawWrapperRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!excalidrawAPI || !excalidrawWrapperRef.current) return

    const canvas = excalidrawWrapperRef.current.getElementsByClassName('interactive')[0]
    canvas?.addEventListener('contextmenu', stopEvent)

    return () => canvas?.removeEventListener('contextmenu', stopEvent)
  }, [excalidrawAPI, excalidrawWrapperRef]) // wait for Excalidraw to load

  // Excalidraw API handlers
  useEffect(() => {
    // Call updateStrokes whenever the user finishes drawing/erasing/moving items
    const pointerUpHandler = ({ type }: AppState['activeTool']): void => {
      if (type === 'freedraw' || type === 'eraser' || type === 'selection') {
        setTimeout(() => {
          const elements = excalidrawAPI!.getSceneElements()!
          updateStrokes({ elements })
        })
      }
    }

    const pointerUpCleanup = excalidrawAPI?.onPointerUp(pointerUpHandler)

    return () => {
      if (pointerUpCleanup) pointerUpCleanup()
    }
  }, [excalidrawAPI, updateStrokes])

  // Disable pasting of text
  const pasteHandler = (data: ClipboardData): boolean => !data.text

  // Only allow specific keyboard actions
  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      // Prevent writing in text boxes
      if (document.activeElement?.nodeName === 'TEXTAREA') {
        stopEvent(event)
      }

      // Only allow certain keys to be pressed in the canvas
      // This prevents access to hidden tools e.g. pressing "r" to enter rectangle mode
      if (
        event.code === 'Backspace' || // Allow backspace for deletions
        event.code.includes('Arrow') || // Allow arrow keys for moving elements
        ((event.ctrlKey || event.metaKey) && // Allow specific keyboard shortcuts
          ['KeyC', 'KeyV', 'KeyZ', 'KeyY', 'Equal', 'Minus', 'Digit0'].includes(event.code))
      ) {
        // Wait for the key event to be processed before updating the strokes
        setTimeout(() => {
          updateStrokes({ elements: excalidrawAPI?.getSceneElements() })
        })
      } else if (
        // Excalidraw shortcuts for tools that should not be blocked
        !['KeyH', 'KeyE', 'KeyV', 'KeyP', 'Digit1', 'Digit0', 'Digit7'].includes(event.code)
      ) {
        stopEvent(event)
      }
    },
    [excalidrawAPI, updateStrokes]
  )

  return (
    <Box
      className={classNames('excalidraw-container')}
      ref={excalidrawWrapperRef}
      flexGrow="1"
      flexShrink="0"
      width="100%"
      onKeyDownCapture={keyDownHandler}
      onDoubleClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <Excalidraw
        zenModeEnabled
        UIOptions={{ tools: { image: false } }}
        gridModeEnabled
        excalidrawAPI={setExcalidrawAPI}
        // initialData={excalidrawData}
        onPaste={pasteHandler}
      >
        <MainMenu>
          <MainMenu.Item onSelect={() => setClearDialogOpen(true)} icon={<>🧽</>}>
            Clear canvas
          </MainMenu.Item>
        </MainMenu>
      </Excalidraw>
      <ConfirmDialog
        title="Clear Canvas?"
        description="This action cannot be undone!"
        open={clearDialogOpen}
        setOpen={setClearDialogOpen}
        onConfirm={clearCanvas}
      />
    </Box>
  )
}

export default Canvas
