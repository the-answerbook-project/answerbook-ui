import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ExamRoot from './ExamRoot'
import Frontcover from './Frontcover'
import QuestionPage from './QuestionPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExamRoot />,
    children: [
      {
        path: 'frontcover',
        element: <Frontcover />,
      },
      {
        path: 'questions/:questionId',
        element: <QuestionPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
