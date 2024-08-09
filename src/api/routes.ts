const routes = {
  summary: (assessmentID: string) => `/${assessmentID}/summary`,
  questions: (assessmentID: string) => `/${assessmentID}/questions`,
  students: (assessmentID: string) => `/${assessmentID}/students`,
  answers: (assessmentID: string) => `/${assessmentID}/answers`,
  marks: (assessmentID: string) => `/${assessmentID}/marks`,
  login: (assesmentID: string) => `/${assesmentID}/auth/login`,
  question: (assessmentID: string, number: number) => `/${assessmentID}/questions/${number}`,
  questionAnswers: (number: number, username: string) => `/answers/${username}/question/${number}`,
  getMathPixToken: '/proxy/mathpix-token',
}

export default routes
