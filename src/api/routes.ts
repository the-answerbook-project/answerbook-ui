const routes = {
  summary: '/summary',
  questions: '/questions',
  question: (number: number) => `/questions/${number}`,
  questionAnswers: (number: number) => `/questions/${number}/answer`,
}

export default routes
