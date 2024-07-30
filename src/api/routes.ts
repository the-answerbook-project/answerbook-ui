const routes = {
  summary: '/summary',
  questions: '/questions',
  students: '/students',
  answers: '/answers',
  marks: '/marks',
  studentMarks: (studentID: string) => `/${studentID}/marks`,
  question: (number: number) => `/questions/${number}`,
  questionAnswers: (number: number, username: string) => `/answers/${username}/question/${number}`,
  getMathPixToken: '/proxy/mathpix-token',
}

export default routes
