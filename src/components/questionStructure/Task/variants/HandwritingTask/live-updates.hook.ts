/**
 * This hook is used to get the live updates of handwriting from an Excalidraw canvas to LaTeX.
 * It uses the Mathpix API to convert the strokes to LaTeX whenever updateStrokes is called.
 */
import { ExcalidrawFreeDrawElement } from '@excalidraw/excalidraw/types/element/types'
import { SceneData } from '@excalidraw/excalidraw/types/types'
import axios, { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'

import axiosInstance from '../../../../../api/axiosInstance'

// Constant
/** Time to wait with user putting no stroks on the pages before API call */
const NO_STROKES_WAIT_DELAY = 1000

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
  updateStrokes: React.Dispatch<React.SetStateAction<Strokes>>
}

// MathPix API functions

/**
 * The token object that is used to authenticate with the Mathpix API.
 */
interface Token {
  appToken: string
  strokesSessionId: string
}

const transformStrokesForAPI = (strokes: Strokes): Record<string, number[][]> => {
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

const getLatexFromStrokes = (token: Token, strokes: Strokes, abortController: AbortController) => {
  return axios.post(
    `https://api.mathpix.com/v3/strokes`,
    {
      strokes: {
        strokes: transformStrokesForAPI(strokes),
      },
    },
    {
      signal: abortController.signal,
      headers: {
        app_token: token.appToken,
        strokes_session_id: token.strokesSessionId,
      },
    }
  )
}

const useLiveUpdates = (username: string, setLatex: (latex: string) => void): LiveUpdateHook => {
  const [token, setToken] = useState<Token>({
    appToken: '',
    strokesSessionId: '',
  })
  const [strokes, setStrokes] = useState<Strokes>({ elements: [] })

  // Get a token for a mathpix session for this user
  const getToken = useCallback(() => {
    axiosInstance.get(`/handwriting/${username}/mathpix-token`).then((res) => {
      setToken(res.data)
    })
  }, [username])

  // Get token on startup (or username change)
  useEffect(getToken, [getToken])

  // useEffect to handle strokes changes
  useEffect(() => {
    // We use abortController to cancel the request if the strokes change before the timeout
    const abortController = new AbortController()

    // We use a timeout so that an API request once the person has stopped drawing for 300 ms
    // this prevents constant requests to the API that can easier hit a rate limit
    const timeout = setTimeout(() => {
      if (strokes.elements?.length === 0) {
        setLatex('')
        return
      }

      const latexFetch = getLatexFromStrokes(token, strokes, abortController)
      latexFetch
        .then(({ data }) =>
          setLatex(`\\( ${data.latex_styled || '\\text{Failed to parse handwriting}'} \\)`)
        )
        .catch((error: Error | AxiosError) => {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            // Refresh the token
            getToken()
          } else {
            console.error(error)
          }
        })
    }, NO_STROKES_WAIT_DELAY)

    return () => {
      clearTimeout(timeout)
      abortController.abort('strokes changed')
    }
  }, [strokes, token, getToken, setLatex])

  return {
    updateStrokes: setStrokes,
  }
}

export default useLiveUpdates
