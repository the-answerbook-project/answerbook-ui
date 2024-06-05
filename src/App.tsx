import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ExamRoot from './ExamRoot'
import FrontCover from './FrontCover'
import QuestionPage from './QuestionPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExamRoot />,
    children: [
      {
        path: 'frontcover',
        element: <FrontCover />,
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
