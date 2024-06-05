import { plainToInstance } from 'class-transformer'
import { useEffect, useState } from 'react'

import axiosInstance from '../api/axiosInstance'
import routes from '../api/routes'
import { Summary } from '../types/exam'

export const useAssessmentSummary = () => {
  const [summary, setSummary] = useState<Summary>()
  const [summaryIsLoaded, setSummaryIsLoaded] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(routes.summary)
      .then(({ data }) => setSummary(plainToInstance(Summary, data)))
      .finally(() => setSummaryIsLoaded(true))
  }, [])
  return { summary, summaryIsLoaded }
}
