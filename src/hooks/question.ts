import { useEffect, useState } from 'react'

import axiosInstance from '../api/axiosInstance'
import routes from '../api/routes'

export const useQuestion = (number: number | undefined) => {
  const [question, setQuestion] = useState<any>()
  const [questionIsLoaded, setQuestionIsLoaded] = useState(false)
  useEffect(() => {
    if (number === undefined) return
    axiosInstance.get(routes.question(number)).then(console.log)
  }, [number])
  return { question, questionIsLoaded }
}
