import React from 'react'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'

import Answerbook from './pages/Answerbook'
import AuthWrapper from './pages/AuthWrapper'
import LoginPage from './pages/LoginPage'
import MarkingPage from './pages/MarkingPage'

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
            index: true,
            element: <Answerbook />,
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
