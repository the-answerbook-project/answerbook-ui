import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { AppState } from '@excalidraw/excalidraw/types/types'
import React from 'react'

export interface RawHandwritingAnswer {
  raw: {
    elements: readonly ExcalidrawElement[]
    appState?: Omit<AppState, 'offsetTop' | 'offsetLeft' | 'width' | 'height'>
  }
}

export interface MathsProcessedHandwritingAnswer extends RawHandwritingAnswer {
  latex: string
}

export interface GenericHandwritingEditorProps<T> {
  answer?: T
  onAnswerChange: (value: T) => void
  children?: React.ReactNode
  restricted?: boolean
}
