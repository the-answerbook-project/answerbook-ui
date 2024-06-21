const routes = {
  summary: '/summary',
  questions: '/questions',
  studentAnswers: (studentID: string) => `/${studentID}/answers`,
  studentMarks: (studentID: string) => `/${studentID}/marks`,
  question: (number: number) => `/questions/${number}`,
  questionAnswers: (number: number) => `/questions/${number}/answer`,
}

export default routes
