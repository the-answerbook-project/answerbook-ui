import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { TaskFactory } from '../../../components/questionStructure/Task/assessment'
import { EssayTask } from '../../../components/questionStructure/Task/assessment/variants/EssayTask'
import { TaskType } from '../../../components/questionStructure/Task/constants'
import { Answer } from '../../../types/exam'

jest.mock('../../../components/questionStructure/Task/assessment/variants/EssayTask', () => ({
  EssayTask: jest.fn(),
}))

const answer = {
  answer: 'Test answer',
} as Answer

describe('Task Component', () => {
  afterEach(jest.clearAllMocks)
  const updateHandler = jest.fn()
  it('should render correctly according to requested task type', () => {
    render(<TaskFactory type={TaskType.ESSAY} answer={answer} onAnswerUpdate={updateHandler} />)
    expect(EssayTask).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TaskType.ESSAY,
        answer: answer,
        onAnswerUpdate: updateHandler,
      }),
      {}
    )
  })

  it('renders the description if provided', () => {
    render(
      <TaskFactory
        instructions="Test description"
        type={TaskType.ESSAY}
        answer={answer}
        onAnswerUpdate={updateHandler}
      />
    )
    const descriptionElement = screen.getByTestId('markdown')
    expect(descriptionElement).toBeInTheDocument()
  })
})
