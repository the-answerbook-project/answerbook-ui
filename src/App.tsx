import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ExamRoot from './pages/ExamRoot'
import FrontCover from './pages/FrontCover'
import QuestionPage from './pages/QuestionPage'

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
