import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Task } from '../../../components/questionStructure/Task'
import { TaskType } from '../../../components/questionStructure/Task/constants'
import { EssayTask } from '../../../components/questionStructure/Task/variants/EssayTask'

jest.mock('../../../components/questionStructure/Task/variants/EssayTask', () => ({
  EssayTask: jest.fn(),
}))

describe('Task Component', () => {
  afterEach(jest.clearAllMocks)
  const updateHandler = jest.fn()
  it('should render correctly according to requested task type', () => {
    render(<Task type={TaskType.ESSAY} answer="Test answer" onAnswerUpdate={updateHandler} />)
    expect(EssayTask).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TaskType.ESSAY,
        answer: 'Test answer',
        onAnswerUpdate: updateHandler,
      }),
      {}
    )
  })

  it('renders the description if provided', () => {
    render(
      <Task
        description="Test description"
        type={TaskType.ESSAY}
        answer="Test answer"
        onAnswerUpdate={updateHandler}
      />
    )
    const descriptionElement = screen.getByTestId('markdown')
    expect(descriptionElement).toBeInTheDocument()
  })
})
