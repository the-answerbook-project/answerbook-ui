import React from 'react'
import { Navigate } from 'react-router-dom'

import { getToken, useAuthentication } from '../hooks/authentication'

const AuthWrapper = ({ children }) => {
  const { hasValidToken } = useAuthentication()
  if (!hasValidToken(getToken())) return <Navigate to="login" replace />
  return children
}

export default AuthWrapper
