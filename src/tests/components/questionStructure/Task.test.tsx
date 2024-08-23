import '@testing-library/jest-dom/extend-expect'

jest.mock('../../../components/questionStructure/Task/variants/EssayTask', () => ({
  EssayTask: jest.fn(),
}))
//
// describe('Task Component', () => {
//   afterEach(jest.clearAllMocks)
//   const updateHandler = jest.fn()
//   it('should render correctly according to requested task type', () => {
//     render(
//       <TaskFactory type={TaskType.ESSAY} answer="Test answer" onAnswerUpdate={updateHandler} />
//     )
//     expect(EssayTask).toHaveBeenCalledWith(
//       expect.objectContaining({
//         type: TaskType.ESSAY,
//         answer: 'Test answer',
//         onAnswerUpdate: updateHandler,
//       }),
//       {}
//     )
//   })
//
//   it('renders the description if provided', () => {
//     render(
//       <TaskFactory
//         instructions="Test description"
//         type={TaskType.ESSAY}
//         answer="Test answer"
//         onAnswerUpdate={updateHandler}
//       />
//     )
//     const descriptionElement = screen.getByTestId('markdown')
//     expect(descriptionElement).toBeInTheDocument()
//   })
// })
