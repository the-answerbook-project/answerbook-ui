import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'

import { TaskType } from '../../../components/questionStructure/Task/constants'
import { CodeTask } from '../../../components/questionStructure/Task/editable/variants/CodeTask'
import { EssayTask } from '../../../components/questionStructure/Task/editable/variants/EssayTask'
import { FlagTask } from '../../../components/questionStructure/Task/editable/variants/FlagTask'
import {
  MCQMultiTask,
  MCQOneTask,
} from '../../../components/questionStructure/Task/editable/variants/MCQ'
import { NumberTask } from '../../../components/questionStructure/Task/editable/variants/NumberTask'
import { Answer } from '../../../types/exam'

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
]

describe('FlagTask', () => {
  it('renders with ornaments', () => {
    render(
      <FlagTask
        type={TaskType.FLAG}
        answer={{ answer: '' } as Answer}
        onAnswerUpdate={() => {}}
        showOrnament={true}
      />
    )
    expect(screen.getByText('FLAG {')).toBeInTheDocument()
    expect(screen.getByText('}')).toBeInTheDocument()
  })

  it('renders without ornaments', () => {
    render(
      <FlagTask
        type={TaskType.FLAG}
        answer={{ answer: '' } as Answer}
        onAnswerUpdate={() => {}}
        showOrnament={false}
      />
    )
    expect(screen.queryByText('FLAG {')).not.toBeInTheDocument()
    expect(screen.queryByText('}')).not.toBeInTheDocument()
  })

  it('handles input changes removing spaces', () => {
    render(
      <FlagTask type={TaskType.FLAG} answer={{ answer: '' } as Answer} onAnswerUpdate={() => {}} />
    )
    const input = screen.getByRole('textbox') // or use getByPlaceholderText if needed
    fireEvent.change(input, { target: { value: ' FLAG 123 ' } })
    expect(input).toHaveValue('FLAG123')
  })
})

describe('NumberTask', () => {
  it('renders correctly', () => {
    render(
      <NumberTask
        type={TaskType.INTEGER}
        answer={{ answer: '' } as Answer}
        onAnswerUpdate={() => {}}
      />
    )
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })
})

describe('EssayTask', () => {
  it('renders correctly', () => {
    render(
      <EssayTask
        type={TaskType.ESSAY}
        answer={{ answer: '' } as Answer}
        onAnswerUpdate={() => {}}
      />
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})

describe('CodeTask', () => {
  it('renders correctly', () => {
    render(
      <CodeTask type={TaskType.CODE} answer={{ answer: '' } as Answer} onAnswerUpdate={() => {}} />
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})

describe('MCQOneTask', () => {
  const mockOnAnswerUpdate = jest.fn()

  it('renders options correctly', () => {
    render(
      <MCQOneTask
        type={TaskType.MULTIPLE_CHOICE_SELECT_ONE}
        answer={{ answer: '' } as Answer}
        onAnswerUpdate={() => {}}
        choices={options}
      />
    )
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  })

  it('updates value correctly when a radio button is clicked', () => {
    render(
      <MCQOneTask
        type={TaskType.MULTIPLE_CHOICE_SELECT_ONE}
        answer={{ answer: '' } as Answer}
        onAnswerUpdate={mockOnAnswerUpdate}
        choices={options}
      />
    )

    const secondOption = screen.getByLabelText('Option 2')
    fireEvent.click(secondOption)
    expect(secondOption).toBeChecked()
    expect(mockOnAnswerUpdate).toHaveBeenCalledWith({ answer: '2' })
  })

  it('does not call () => {} if the same value is selected again', () => {
    render(
      <MCQOneTask
        type={TaskType.MULTIPLE_CHOICE_SELECT_ONE}
        answer={{ answer: '2' } as Answer}
        onAnswerUpdate={mockOnAnswerUpdate}
        choices={options}
      />
    )

    const secondOption = screen.getByLabelText('Option 2')
    fireEvent.click(secondOption)
    expect(mockOnAnswerUpdate).not.toHaveBeenCalled()
  })
})

describe('MCQMultiTask', () => {
  const mockOnAnswerUpdate = jest.fn()

  it('renders options correctly', () => {
    render(
      <MCQMultiTask
        type={TaskType.MULTIPLE_CHOICE_SELECT_SEVERAL}
        answer={{ answer: '' } as Answer}
        onAnswerUpdate={() => {}}
        choices={options}
      />
    )
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  })

  it('adds value to the selected values when a checkbox is clicked', () => {
    render(
      <MCQMultiTask
        type={TaskType.MULTIPLE_CHOICE_SELECT_SEVERAL}
        answer={{ answer: '' } as Answer}
        onAnswerUpdate={mockOnAnswerUpdate}
        choices={options}
      />
    )

    const firstCheckbox = screen.getByLabelText('Option 1')
    fireEvent.click(firstCheckbox)
    expect(firstCheckbox).toBeChecked()
    expect(mockOnAnswerUpdate).toHaveBeenCalledWith({ answer: '1' })
  })

  it('removes value from selected values when a checkbox is clicked again', () => {
    render(
      <MCQMultiTask
        type={TaskType.MULTIPLE_CHOICE_SELECT_SEVERAL}
        answer={{ answer: '1' } as Answer}
        onAnswerUpdate={mockOnAnswerUpdate}
        choices={options}
      />
    )

    const firstCheckbox = screen.getByLabelText('Option 1')
    fireEvent.click(firstCheckbox)
    expect(firstCheckbox).not.toBeChecked()
    expect(mockOnAnswerUpdate).toHaveBeenCalledWith({ answer: '' })
  })

  it('handles multiple selections correctly', () => {
    render(
      <MCQMultiTask
        type={TaskType.MULTIPLE_CHOICE_SELECT_SEVERAL}
        answer={{ answer: '' } as Answer}
        onAnswerUpdate={mockOnAnswerUpdate}
        choices={options}
      />
    )

    const firstCheckbox = screen.getByLabelText('Option 1')
    const secondCheckbox = screen.getByLabelText('Option 2')
    fireEvent.click(firstCheckbox)
    fireEvent.click(secondCheckbox)
    expect(firstCheckbox).toBeChecked()
    expect(secondCheckbox).toBeChecked()
    expect(mockOnAnswerUpdate).toHaveBeenCalledWith({ answer: '1,2' })
  })
})
