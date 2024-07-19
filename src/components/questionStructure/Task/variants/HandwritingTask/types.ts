import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { AppState } from '@excalidraw/excalidraw/types/types'

export interface HandwritingAnswer {
  raw: {
    elements: readonly ExcalidrawElement[]
    appState?: Omit<AppState, 'offsetTop' | 'offsetLeft' | 'width' | 'height'>
  }
  latex: string
}
