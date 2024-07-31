import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import AuthWrapper from './pages/AuthWrapper'
import ExamRoot from './pages/ExamRoot'
import FrontCover from './pages/FrontCover'
import LoginPage from './pages/LoginPage'
import MarkingPage from './pages/MarkingPage'
import QuestionPage from './pages/QuestionPage'

const router = createBrowserRouter([
  {
    path: ':year/:moduleCode/:qualifier/',
    element: (
      <AuthWrapper>
        <ExamRoot />
      </AuthWrapper>
    ),
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
    element: (
      <AuthWrapper>
        <MarkingPage />
      </AuthWrapper>
    ),
  },
  {
    path: ':year/:moduleCode/:qualifier/login',
    element: <LoginPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
