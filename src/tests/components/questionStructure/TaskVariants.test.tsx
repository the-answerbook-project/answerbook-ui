import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'

import { TaskType } from '../../../components/questionStructure/Task/constants'
import { CodeTask } from '../../../components/questionStructure/Task/variants/CodeTask'
import { EssayTask } from '../../../components/questionStructure/Task/variants/EssayTask'
import { FlagTask } from '../../../components/questionStructure/Task/variants/FlagTask'
import { MCQMultiTask, MCQOneTask } from '../../../components/questionStructure/Task/variants/MCQ'
import { NumberTask } from '../../../components/questionStructure/Task/variants/NumberTask'
import { Answer } from '../../../types/exam'

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
]

const answer = { answer: '' } as Answer

describe('FlagTask', () => {
  it('renders with ornaments', () => {
    render(
      <FlagTask
        type={TaskType.FLAG}
        answer={answer}
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
        answer={answer}
        onAnswerUpdate={() => {}}
        showOrnament={false}
      />
    )
    expect(screen.queryByText('FLAG {')).not.toBeInTheDocument()
    expect(screen.queryByText('}')).not.toBeInTheDocument()
  })

  it.skip('handles input changes and removes spaces', () => {
    const handleChange = jest.fn()
    render(
      <FlagTask
        type={TaskType.FLAG}
        answer={answer}
        onAnswerUpdate={handleChange}
        showOrnament={true}
      />
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: ' FLAG 123 ' } })
    expect(input.innerHTML).toBe('FLAG123')
  })

  it('renders as disabled', () => {
    render(
      <FlagTask type={TaskType.FLAG} answer={answer} onAnswerUpdate={() => {}} disabled={true} />
    )
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})

describe('NumberTask', () => {
  it('renders correctly', () => {
    render(<NumberTask type={TaskType.INTEGER} answer={answer} onAnswerUpdate={() => {}} />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it.skip('handles input changes', () => {
    const handleChange = jest.fn()
    render(<NumberTask type={TaskType.INTEGER} answer={answer} onAnswerUpdate={handleChange} />)
    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, { target: { value: 5 } })
    expect(handleChange).toHaveBeenCalledWith('5')
  })

  it('renders as disabled', () => {
    render(
      <NumberTask
        type={TaskType.INTEGER}
        answer={answer}
        onAnswerUpdate={() => {}}
        disabled={true}
      />
    )
    expect(screen.getByRole('spinbutton')).toBeDisabled()
  })
})

describe('EssayTask', () => {
  it('renders correctly', () => {
    render(<EssayTask type={TaskType.ESSAY} answer={answer} onAnswerUpdate={() => {}} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it.skip('handles input changes', () => {
    const handleChange = jest.fn()
    render(<EssayTask type={TaskType.ESSAY} answer={answer} onAnswerUpdate={handleChange} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'New text' } })
    expect(handleChange).toHaveBeenCalledWith('New text')
  })

  it('renders as disabled', () => {
    render(
      <EssayTask type={TaskType.ESSAY} answer={answer} onAnswerUpdate={() => {}} disabled={true} />
    )
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})

describe('CodeTask', () => {
  it('renders correctly', () => {
    render(<CodeTask type={TaskType.CODE} answer={answer} onAnswerUpdate={() => {}} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it.skip('handles input changes', () => {
    const handleChange = jest.fn()
    render(<CodeTask type={TaskType.CODE} answer={answer} onAnswerUpdate={handleChange} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'New code' } })
    expect(handleChange).toHaveBeenCalledWith('New code')
  })

  it('renders as disabled', () => {
    render(
      <CodeTask type={TaskType.CODE} answer={answer} onAnswerUpdate={() => {}} disabled={true} />
    )
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})

describe('MCQOneTask', () => {
  it('renders options correctly', () => {
    render(
      <MCQOneTask
        type={TaskType.MULTIPLE_CHOICE_SELECT_ONE}
        answer={answer}
        onAnswerUpdate={() => {}}
        choices={options}
      />
    )
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  })

  it.skip('handles option selection', () => {
    const handleChange = jest.fn()
    render(
      <MCQOneTask
        type={TaskType.MULTIPLE_CHOICE_SELECT_ONE}
        answer={answer}
        onAnswerUpdate={handleChange}
        choices={options}
      />
    )
    const option1 = screen.getByLabelText('Option 1')
    fireEvent.click(option1)
    expect(handleChange).toHaveBeenCalledWith('1')
  })

  it('renders as disabled', () => {
    render(
      <MCQOneTask
        type={TaskType.MULTIPLE_CHOICE_SELECT_ONE}
        answer={answer}
        onAnswerUpdate={() => {}}
        choices={options}
        disabled={true}
      />
    )
    expect(screen.getByLabelText('Option 1')).toBeDisabled()
    expect(screen.getByLabelText('Option 2')).toBeDisabled()
  })
})

describe('MCQMultiTask', () => {
  it('renders options correctly', () => {
    render(
      <MCQMultiTask
        type={TaskType.MULTIPLE_CHOICE_SELECT_SEVERAL}
        answer={answer}
        onAnswerUpdate={() => {}}
        choices={options}
      />
    )
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  })

  it('renders as disabled', () => {
    render(
      <MCQMultiTask
        type={TaskType.MULTIPLE_CHOICE_SELECT_SEVERAL}
        answer={answer}
        onAnswerUpdate={() => {}}
        choices={options}
        disabled={true}
      />
    )
    expect(screen.getByLabelText('Option 1')).toBeDisabled()
    expect(screen.getByLabelText('Option 2')).toBeDisabled()
  })
})
