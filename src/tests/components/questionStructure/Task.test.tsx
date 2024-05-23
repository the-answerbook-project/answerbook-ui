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
} from '../../../components/questionStructure/Task'

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
]

describe('FlagTask', () => {
  it('renders with ornaments', () => {
    render(<FlagTask value="" onChange={() => {}} showOrnament={true} />)
    expect(screen.getByText('FLAG {')).toBeInTheDocument()
    expect(screen.getByText('}')).toBeInTheDocument()
  })

  it('renders without ornaments', () => {
    render(<FlagTask value="" onChange={() => {}} showOrnament={false} />)
    expect(screen.queryByText('FLAG {')).not.toBeInTheDocument()
    expect(screen.queryByText('}')).not.toBeInTheDocument()
  })

  it('handles input changes and removes spaces', () => {
    const handleChange = jest.fn()
    render(<FlagTask value="" onChange={handleChange} showOrnament={true} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: ' FLAG 123 ' } })
    expect(handleChange).toHaveBeenCalledWith('FLAG123')
  })

  it('renders as disabled', () => {
    render(<FlagTask value="" onChange={() => {}} disabled={true} />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})

describe('NumberTask', () => {
  it('renders correctly', () => {
    render(<NumberTask value={0} onChange={() => {}} />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it('handles input changes', () => {
    const handleChange = jest.fn()
    render(<NumberTask value={0} onChange={handleChange} />)
    const input = screen.getByRole('spinbutton')
    fireEvent.change(input, { target: { value: 5 } })
    expect(handleChange).toHaveBeenCalledWith(5)
  })

  it('renders as disabled', () => {
    render(<NumberTask value={0} onChange={() => {}} disabled={true} />)
    expect(screen.getByRole('spinbutton')).toBeDisabled()
  })
})

describe('EssayTask', () => {
  it('renders correctly', () => {
    render(<EssayTask value="" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('handles input changes', () => {
    const handleChange = jest.fn()
    render(<EssayTask value="" onChange={handleChange} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'New text' } })
    expect(handleChange).toHaveBeenCalledWith('New text')
  })

  it('renders as disabled', () => {
    render(<EssayTask value="" onChange={() => {}} disabled={true} />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})

describe('CodeTask', () => {
  it('renders correctly', () => {
    render(<CodeTask value="" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('handles input changes', () => {
    const handleChange = jest.fn()
    render(<CodeTask value="" onChange={handleChange} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'New code' } })
    expect(handleChange).toHaveBeenCalledWith('New code')
  })

  it('renders as disabled', () => {
    render(<CodeTask value="" onChange={() => {}} disabled={true} />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})

describe('MCQOneTask', () => {
  it('renders options correctly', () => {
    render(<MCQOneTask value="" onChange={() => {}} options={options} />)
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  })

  it('handles option selection', () => {
    const handleChange = jest.fn()
    render(<MCQOneTask value="" onChange={handleChange} options={options} />)
    const option1 = screen.getByLabelText('Option 1')
    fireEvent.click(option1)
    expect(handleChange).toHaveBeenCalledWith('1')
  })

  it('renders as disabled', () => {
    render(<MCQOneTask value="" onChange={() => {}} options={options} disabled={true} />)
    expect(screen.getByLabelText('Option 1')).toBeDisabled()
    expect(screen.getByLabelText('Option 2')).toBeDisabled()
  })
})

describe('MCQMultiTask', () => {
  it('renders options correctly', () => {
    render(<MCQMultiTask value={[]} onChange={() => {}} options={options} />)
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  })

  it('handles multiple option selection', () => {
    const handleChange = jest.fn()
    render(<MCQMultiTask value={[]} onChange={handleChange} options={options} />)
    const option1 = screen.getByLabelText('Option 1')
    const option2 = screen.getByLabelText('Option 2')
    fireEvent.click(option1)
    expect(handleChange).toHaveBeenCalledWith(['1'])
    fireEvent.click(option2)
    expect(handleChange).toHaveBeenCalledWith(['1', '2'])
  })

  it('renders as disabled', () => {
    render(<MCQMultiTask value={[]} onChange={() => {}} options={options} disabled={true} />)
    expect(screen.getByLabelText('Option 1')).toBeDisabled()
    expect(screen.getByLabelText('Option 2')).toBeDisabled()
  })
})
