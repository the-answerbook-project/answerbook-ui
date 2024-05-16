import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ExamRoot from './ExamRoot'
import Frontcover from './Frontcover'
import Question from './Question'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExamRoot questionCount={3} />,
    children: [
      {
        path: 'frontcover',
        element: <Frontcover />,
      },
      {
        path: 'questions/:questionId',
        element: <Question />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
