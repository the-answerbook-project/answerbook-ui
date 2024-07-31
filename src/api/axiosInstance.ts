import axios from 'axios'
import { camelCase, isArray, isObject, mapKeys, mapValues, snakeCase } from 'lodash'

import { getToken } from '../hooks/authentication'

const convertKeys = (obj, convertFunc) => {
  if (isArray(obj)) {
    return obj.map((item) => convertKeys(item, convertFunc))
  } else if (isObject(obj)) {
    return mapKeys(
      mapValues(obj, (value) => convertKeys(value, convertFunc)),
      (value, key) => convertFunc(key)
    )
  }
  return obj
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENTRYPOINT,
})

axiosInstance.interceptors.request.use((config) => {
  if (config.data) config.data = convertKeys(config.data, snakeCase)
  if (getToken()) config.headers.set('Authentication', `Bearer: ${getToken()}`)
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = convertKeys(response.data, camelCase)
    }
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      error.response.data = convertKeys(error.response.data, camelCase)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
