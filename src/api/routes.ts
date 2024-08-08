const routes = {
  summary: (assessmentID: string) => `/${assessmentID}/summary`,
  questions: '/questions',
  students: '/students',
  answers: '/answers',
  marks: '/marks',
  login: (assesmentID: string) => `/${assesmentID}/auth/login`,
  studentMarks: (studentID: string) => `/${studentID}/marks`,
  question: (assessmentID: string, number: number) => `/${assessmentID}/questions/${number}`,
  questionAnswers: (number: number, username: string) => `/answers/${username}/question/${number}`,
  getMathPixToken: '/proxy/mathpix-token',
}

export default routes
