import { useParams } from 'react-router-dom'

export const useAssessmentParams = () => {
  const { year, moduleCode, qualifier } = useParams()
  return {
    assessmentID: `y${year}_${moduleCode}_${qualifier}`,
  }
}
