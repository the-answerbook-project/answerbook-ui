const routes = {
  summary: '/summary',
  question: (number: number) => `/questions/${number}`,
  questionAnswers: (number: number) => `/questions/${number}/answer`,
}

export default routes
