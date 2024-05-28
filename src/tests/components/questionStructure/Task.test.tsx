import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import {
  CodeTask,
  EssayTask,
  FlagTask,
  MCQMultiTask,
  MCQOneTask,
  NumberTask,
  TaskType,
} from '../../../components/questionStructure/Task'

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
]

describe('FlagTask', () => {
  it('renders with ornaments', () => {
    render(
      <FlagTask type={TaskType.FLAG} answer="" onAnswerUpdate={() => {}} showOrnament={true} />
    )
    expect(screen.getByText('FLAG {')).toBeInTheDocument()
    expect(screen.getByText('}')).toBeInTheDocument()
  })

  it('renders without ornaments', () => {
    render(
      <FlagTask type={TaskType.FLAG} answer="" onAnswerUpdate={() => {}} showOrnament={false} />
    )
    expect(screen.queryByText('FLAG {')).not.toBeInTheDocument()
    expect(screen.queryByText('}')).not.toBeInTheDocument()
  })

  it('handles input changes and removes spaces', () => {
    const handleChange = jest.fn()
    render(
      <FlagTask type={TaskType.FLAG} answer="" onAnswerUpdate={handleChange} showOrnament={true} />
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: ' FLAG 123 ' } })
    expect(handleChange).toHaveBeenCalledWith('FLAG123')
  })

  it('renders as disabled', () => {
    render(<FlagTask type={TaskType.FLAG} answer="" onAnswerUpdate={() => {}} disabled={true} />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})

describe('NumberTask', () => {
  it('renders correctly', () => {
    render(<NumberTask type={TaskType.NUMBER} answer={0} onAnswerUpdate={() => {}} />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it('handles input changes', () => {
    const handleChange = jest.fn()
    render(<NumberTask type={TaskType.NUMBER} answer={0} onAnswerUpdate={handleChange} />)
    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, { target: { value: 5 } })
    expect(handleChange).toHaveBeenCalledWith(5)
  })

  it('renders as disabled', () => {
    render(
      <NumberTask type={TaskType.NUMBER} answer={0} onAnswerUpdate={() => {}} disabled={true} />
    )
    expect(screen.getByRole('spinbutton')).toBeDisabled()
  })
})

describe('EssayTask', () => {
  it('renders correctly', () => {
    render(<EssayTask type={TaskType.ESSAY} answer="" onAnswerUpdate={() => {}} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('handles input changes', () => {
    const handleChange = jest.fn()
    render(<EssayTask type={TaskType.ESSAY} answer="" onAnswerUpdate={handleChange} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'New text' } })
    expect(handleChange).toHaveBeenCalledWith('New text')
  })

  it('renders as disabled', () => {
    render(<EssayTask type={TaskType.ESSAY} answer="" onAnswerUpdate={() => {}} disabled={true} />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})

describe('CodeTask', () => {
  it('renders correctly', () => {
    render(<CodeTask type={TaskType.CODE} answer="" onAnswerUpdate={() => {}} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('handles input changes', () => {
    const handleChange = jest.fn()
    render(<CodeTask type={TaskType.CODE} answer="" onAnswerUpdate={handleChange} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'New code' } })
    expect(handleChange).toHaveBeenCalledWith('New code')
  })

  it('renders as disabled', () => {
    render(<CodeTask type={TaskType.CODE} answer="" onAnswerUpdate={() => {}} disabled={true} />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})

describe('MCQOneTask', () => {
  it('renders options correctly', () => {
    render(
      <MCQOneTask type={TaskType.MCQONE} answer="" onAnswerUpdate={() => {}} options={options} />
    )
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  })

  it('handles option selection', () => {
    const handleChange = jest.fn()
    render(
      <MCQOneTask
        type={TaskType.MCQONE}
        answer=""
        onAnswerUpdate={handleChange}
        options={options}
      />
    )
    const option1 = screen.getByLabelText('Option 1')
    fireEvent.click(option1)
    expect(handleChange).toHaveBeenCalledWith('1')
  })

  it('renders as disabled', () => {
    render(
      <MCQOneTask
        type={TaskType.MCQONE}
        answer=""
        onAnswerUpdate={() => {}}
        options={options}
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
        type={TaskType.MCQMULTI}
        answer={[]}
        onAnswerUpdate={() => {}}
        options={options}
      />
    )
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  })

  it('handles multiple option selection', () => {
    const handleChange = jest.fn()
    render(
      <MCQMultiTask
        type={TaskType.MCQMULTI}
        answer={[]}
        onAnswerUpdate={handleChange}
        options={options}
      />
    )
    const option1 = screen.getByLabelText('Option 1')
    const option2 = screen.getByLabelText('Option 2')
    fireEvent.click(option1)
    expect(handleChange).toHaveBeenCalledWith(['1'])
    fireEvent.click(option2)
    expect(handleChange).toHaveBeenCalledWith(['1', '2'])
  })

  it('renders as disabled', () => {
    render(
      <MCQMultiTask
        type={TaskType.MCQMULTI}
        answer={[]}
        onAnswerUpdate={() => {}}
        options={options}
        disabled={true}
      />
    )
    expect(screen.getByLabelText('Option 1')).toBeDisabled()
    expect(screen.getByLabelText('Option 2')).toBeDisabled()
  })
})
