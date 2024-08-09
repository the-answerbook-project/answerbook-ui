import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { getToken, useAuthentication } from '../hooks/authentication'

const AuthWrapper = ({ children }) => {
  const { pathname } = useLocation()
  const { hasValidToken } = useAuthentication()
  if (!hasValidToken(getToken())) return <Navigate to="login" replace state={{ prev: pathname }} />
  return children
}

export default AuthWrapper
