import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { toPairs } from 'lodash'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BASE_URL } from '../api/axiosInstance'
import routes from '../api/routes'
import { useAssessmentParams } from './assessmentParams'

export interface Credentials {
  username: string
  password: string
}

const ACCESS_TOKEN_KEY = 'answerbook-access-token'

export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const useAuthentication = () => {
  const navigate = useNavigate()
  const { assessmentID } = useAssessmentParams()
  const [authError, setAuthError] = useState()

  function hasValidToken(token: string | null) {
    if (!token) return false
    try {
      const decoded = jwtDecode(token)
      if (!decoded || !decoded.exp || !decoded.sub) return false
      const currentTime = Math.floor(Date.now() / 1000)
      return decoded.exp > currentTime && (decoded.sub as any).assessment_code === assessmentID
    } catch (error) {
      return false
    }
  }

  function saveToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  }

  function requestToken(credentials: Credentials) {
    const form = new FormData()
    toPairs(credentials).forEach(([k, v]) => form.set(k, v))
    axios
      .post(`${BASE_URL}${routes.login(assessmentID)}`, form)
      .then(({ data }) => {
        saveToken(data.access_token)
        navigate('../frontcover', { relative: 'path' })
      })
      .catch((error) => setAuthError(error?.response?.data?.detail ?? 'Authentication failed'))
  }

  return { authError, requestToken, hasValidToken }
}
