/**
 * This hook is used to get the live updates of handwriting from an Excalidraw canvas to LaTeX.
 * It uses the Mathpix API to convert the strokes to LaTeX whenever updateStrokes is called.
 */
import { ExcalidrawFreeDrawElement } from '@excalidraw/excalidraw/types/element/types'
import { SceneData } from '@excalidraw/excalidraw/types/types'
import axios, { AxiosError } from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'

import axiosInstance from '../../../../../../../api/axiosInstance'
import routes from '../../../../../../../api/routes'

// Constants
/** Time to wait with user putting no stroks on the pages before API call */
const NO_STROKES_WAIT_DELAY = 300
const MATHPIX_HANDWRITING_TO_LATEX = `https://api.mathpix.com/v3/strokes`

/**
 * The strokes object that is used to store the strokes from the Excalidraw canvas.
 * Note that elements can be anything that Excalidraw supports. We filter as required.
 */
interface Strokes {
  elements: SceneData['elements']
}

/**
 * This represents what the hook exports to the outside world.
 */
interface LiveUpdateHook {
  updateStrokes: (strokes: Strokes) => Promise<string>
}

// MathPix API functions

/**
 * The token object that is used to authenticate with the Mathpix API.
 */
interface Token {
  appToken: string
  strokesSessionId: string
}

const serialiseStrokes = (strokes: Strokes): Record<string, number[][]> => {
  const apiStrokes: Record<string, number[][]> = {
    x: [],
    y: [],
  }

  for (const element of strokes.elements ?? []) {
    const newStrokeX: number[] = []
    const newStrokeY: number[] = []

    if (element.type !== 'freedraw') continue

    for (const [x, y] of (element as ExcalidrawFreeDrawElement).points) {
      newStrokeX.push(x + element.x)
      newStrokeY.push(y + element.y)
    }

    apiStrokes.x.push(newStrokeX)
    apiStrokes.y.push(newStrokeY)
  }

  return apiStrokes
}

const getLatexFromStrokes = (token: Token, strokes: Strokes, signal: AbortSignal) => {
  return axios.post(
    MATHPIX_HANDWRITING_TO_LATEX,
    {
      strokes: {
        strokes: serialiseStrokes(strokes),
      },
    },
    {
      signal: signal,
      headers: {
        app_token: token.appToken,
        strokes_session_id: token.strokesSessionId,
      },
    }
  )
}

const useLiveUpdates = (): LiveUpdateHook => {
  const [token, setToken] = useState<Token>({
    appToken: '',
    strokesSessionId: '',
  })

  const abortControllerRef = useRef<AbortController | null>(null)
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Get a token for a mathpix session for this user
  const getToken = useCallback(() => {
    axiosInstance.get(routes.getMathPixToken).then((res) => setToken(res.data))
  }, [])

  // Get token on startup (or username change)
  useEffect(getToken, [getToken])

  // useEffect to handle strokes changes
  const updateStrokes: (strokes: Strokes) => Promise<string> = useCallback(
    (strokes: Strokes) =>
      new Promise((resolve, reject) => {
        // Cleanup previous actions
        if (abortControllerRef.current) abortControllerRef.current.abort()
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)

        // Setup for new action
        abortControllerRef.current = new AbortController()
        const { signal } = abortControllerRef.current

        // We use a timeout so that an API request is only sent once the person has stopped drawing for 300 ms.
        // This prevents constant requests to the API which might cause the rate limit to be hit
        timeoutIdRef.current = setTimeout(() => {
          if (strokes.elements?.length === 0) {
            resolve('')
            return
          }

          getLatexFromStrokes(token, strokes, signal)
            .then(({ data }) => resolve(data.latex_styled || '\\text{Failed to parse handwriting}'))
            .catch((error: Error | AxiosError) => {
              if (axios.isAxiosError(error) && error.response?.status === 401) getToken()
              else console.error(error)
            })
        }, NO_STROKES_WAIT_DELAY)
      }),
    [token, getToken]
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
    }
  }, [])

  return {
    updateStrokes,
  }
}

export default useLiveUpdates
