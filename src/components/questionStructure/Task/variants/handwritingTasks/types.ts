import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { AppState } from '@excalidraw/excalidraw/types/types'
import React from 'react'

export interface HandwritingAnswer {
  raw: {
    elements: readonly ExcalidrawElement[]
    appState?: Omit<AppState, 'offsetTop' | 'offsetLeft' | 'width' | 'height'>
  }
}

export interface MathsSingleAnswer extends HandwritingAnswer {
  latex: string
}

export interface GenericHandwritingEditorProps<T> {
  answer?: T
  onAnswerChange: (value: T) => void
  children?: React.ReactNode
}
