import React from 'react'
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'

import AuthWrapper from './pages/AuthWrapper'
import ExamRoot from './pages/ExamRoot'
import FrontCover from './pages/FrontCover'
import LoginPage from './pages/LoginPage'
import MarkingPage from './pages/MarkingPage'
import QuestionPage from './pages/QuestionPage'

const AuthRoot = () => (
  <AuthWrapper>
    <Outlet />
  </AuthWrapper>
)

const router = createBrowserRouter([
  {
    path: ':year/:moduleCode/:qualifier/',
    children: [
      {
        element: <AuthRoot />,
        children: [
          {
            path: 'marking',
            element: <MarkingPage />,
          },
          {
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
                path: 'questions/:number',
                element: <QuestionPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
