const routes = {
  summary: '/summary',
  questions: '/questions',
  studentAnswers: (studentID: string) => `/${studentID}/answers`,
  question: (number: number) => `/questions/${number}`,
  questionAnswers: (number: number) => `/questions/${number}/answer`,
}

export default routes
