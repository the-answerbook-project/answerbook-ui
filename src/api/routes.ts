const routes = {
  summary: '/summary',
  questions: '/questions',
  students: '/students',
  marks: '/marks',
  studentAnswers: (studentID: string) => `/${studentID}/answers`,
  studentMarks: (studentID: string) => `/${studentID}/marks`,
  question: (number: number) => `/questions/${number}`,
  questionAnswers: (number: number, username: string) => `/answers/${username}/question/${number}`,
  getMathPixToken: '/proxy/mathpix-token',
}

export default routes
