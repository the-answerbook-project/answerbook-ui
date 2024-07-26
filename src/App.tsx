import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import ExamRoot from './pages/ExamRoot'
import FrontCover from './pages/FrontCover'
import MarkingPage from './pages/MarkingPage'
import QuestionPage from './pages/QuestionPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExamRoot />,
    children: [
      {
        index: true,
        element: <Navigate to="frontcover" replace />,
      },
      {
        path: 'frontcover',
        element: <FrontCover />,
      },
      {
        path: 'questions/:questionId/:username',
        element: <QuestionPage />,
      },
    ],
  },
  {
    path: 'marking',
    element: <MarkingPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
