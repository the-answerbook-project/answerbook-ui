import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import { TaskType } from '../../../components/questionStructure/Task/constants'
import { EditableTaskFactory } from '../../../components/questionStructure/Task/editable'
import { EssayTask } from '../../../components/questionStructure/Task/editable/variants/EssayTask'
import { Answer } from '../../../types/exam'

jest.mock('../../../components/questionStructure/Task/editable/variants/EssayTask', () => ({
  EssayTask: jest.fn(),
}))

const answer = {
  answer: 'Test answer',
} as Answer

describe('Task Component', () => {
  afterEach(jest.clearAllMocks)
  const updateHandler = jest.fn()
  it('should render correctly according to requested task type', () => {
    render(
      <EditableTaskFactory type={TaskType.ESSAY} answer={answer} onAnswerUpdate={updateHandler} />
    )
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
      <EditableTaskFactory
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
