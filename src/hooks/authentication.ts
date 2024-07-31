import { useState } from 'react'

import axiosInstance from '../api/axiosInstance'
import routes from '../api/routes'
import { useAssessmentParams } from './assessmentParams'

export interface Credentials {
  username: string
  password: string
}

export const useAuthentication = () => {
  const { assessmentID } = useAssessmentParams()
  const [authError, setAuthError] = useState()

  function saveToken(token: string) {
    localStorage.setItem('answerbook-access-token', token)
  }

  function getToken(credentials: Credentials) {
    axiosInstance
      .post(routes.login(assessmentID), credentials)
      .then(({ data }) => saveToken(data['accessToken']))
      .catch((error) => setAuthError(error?.response?.data?.detail ?? 'Authentication failed'))
  }

  return { authError, getToken }
}
