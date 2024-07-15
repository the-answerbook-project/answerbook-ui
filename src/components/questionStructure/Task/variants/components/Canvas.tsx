import { Excalidraw, MainMenu } from '@excalidraw/excalidraw'
import { ClipboardData } from '@excalidraw/excalidraw/types/clipboard'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { AppState, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'
import { Box } from '@radix-ui/themes'
import React, {
  KeyboardEventHandler,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { ConfirmDialog } from '../../../../../components/ConfirmDialog'
import useLiveUpdates from '../HandwritingTask/live-updates.hook'
import { HandwritingAnswer, MathsSingleAnswer } from '../HandwritingTask/types'

const stopEvent = (e: SyntheticEvent | Event) => {
  e.preventDefault()
  e.stopPropagation()
}

interface CanvasProps {
  updateStrokes: (value: HandwritingAnswer['raw']) => void
  initialData: {
    elements?: readonly ExcalidrawElement[]
    appState?: AppState
  }
}

// Excalidraw keyboard shortcuts we allow in the canvas:
const CONTROL_COMMAND_ALLOWED_KEYBOARD_SHORTCUTS = [
  'KeyC', // copy
  'KeyV', // paste
  'KeyZ', // undo
  'KeyY', // redo
  'Equal', // zoom in
  'Minus', // zoom out
  'Digit0', // reset zoom
]
const ALLOWED_TOOL_SHORTCUTS = [
  'KeyH', // drag hand
  'KeyE', // eraser
  'KeyV', // selection
  'KeyP', // pen
  'Digit1', // selection
  'Digit0', // eraser
  'Digit7', // pen
]

const Canvas: React.FC<CanvasProps> = ({ updateStrokes, initialData }) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)
  const [clearDialogOpen, setClearDialogOpen] = useState(false)

  const clearCanvas = useCallback(() => {
    updateStrokes({ elements: [] })
    excalidrawAPI?.updateScene({ elements: [] })
  }, [excalidrawAPI, updateStrokes])

  const excalidrawWrapperRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!excalidrawAPI || !excalidrawWrapperRef.current) return

    const canvas = excalidrawWrapperRef.current.getElementsByClassName('interactive')[0]

    // Disable Excalidraw right click menu, to prevent users from using hidden tools
    // that we don't want them to use, as mathpix can't handle them
    canvas?.addEventListener('contextmenu', stopEvent)

    // Force a canvas resize when the dialog opens
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100)

    return () => canvas?.removeEventListener('contextmenu', stopEvent)
  }, [excalidrawAPI, excalidrawWrapperRef]) // wait for Excalidraw to load

  // Excalidraw API handlers
  useEffect(() => {
    // Call updateStrokes whenever the user finishes drawing/erasing/moving items
    const pointerUpHandler = ({ type }: AppState['activeTool']): void => {
      if (type === 'freedraw' || type === 'eraser' || type === 'selection') {
        setTimeout(() => {
          const elements = excalidrawAPI!.getSceneElements()!
          const appState = excalidrawAPI!.getAppState()!
          updateStrokes({ elements, appState })
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
      if (document.activeElement?.nodeName === 'TEXTAREA') stopEvent(event)

      // Only allow certain keys to be pressed in the canvas
      // This prevents access to hidden tools e.g. pressing "r" to enter rectangle mode
      if (
        event.code === 'Backspace' || // Allow backspace for deletions
        event.code.includes('Arrow') || // Allow arrow keys for moving elements
        ((event.ctrlKey || event.metaKey) && // Allow specific keyboard shortcuts
          CONTROL_COMMAND_ALLOWED_KEYBOARD_SHORTCUTS.includes(event.code))
      ) {
        // Wait for the key event to be processed before updating the strokes
        setTimeout(() => {
          updateStrokes({
            elements: excalidrawAPI?.getSceneElements() ?? [],
            appState: excalidrawAPI?.getAppState(),
          })
        })
      } else if (!ALLOWED_TOOL_SHORTCUTS.includes(event.code)) stopEvent(event)

    },
    [excalidrawAPI, updateStrokes]
  )

  return (
    <Box
      className="excalidraw-editor-container excalidraw-box"
      ref={excalidrawWrapperRef}
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
        initialData={{
          ...initialData,
          appState: { ...initialData.appState, collaborators: new Map() },
        }}
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
