const routes = {
  candidate: {
    heading: (assessmentID: string) => `/${assessmentID}/candidates/me/heading`,
    questions: (assessmentID: string) => `/${assessmentID}/candidates/me/questions`,
    answers: (assessmentID: string) => `/${assessmentID}/candidates/me/answers`,
  },
  questions: (assessmentID: string) => `/${assessmentID}/questions`,
  students: (assessmentID: string) => `/${assessmentID}/students`,
  answers: (assessmentID: string) => `/${assessmentID}/answers`,
  marks: (assessmentID: string) => `/${assessmentID}/marks`,
  login: (assesmentID: string) => `/${assesmentID}/auth/login`,
  question: (assessmentID: string, number: number) => `/${assessmentID}/questions/${number}`,
  getMathPixToken: '/proxy/mathpix-token',
}

export default routes
