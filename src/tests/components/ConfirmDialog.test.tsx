import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { ConfirmDialog } from '../../components/ConfirmDialog'

describe('ConfirmDialog', () => {
  test('renders when open', () => {
    render(
      <ConfirmDialog
        open={true}
        title="Test Title"
        description="Test Description"
        setOpen={() => {}}
      />
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  test('displays title and description correctly', () => {
    render(
      <ConfirmDialog
        open={true}
        title="Unique Title"
        description="Unique Description"
        setOpen={() => {}}
      />
    )
    expect(screen.getByText('Unique Title')).toBeInTheDocument()
    expect(screen.getByText('Unique Description')).toBeInTheDocument()
  })

  test('calls onCancel when Cancel is clicked', () => {
    const onCancelMock = jest.fn()
    render(
      <ConfirmDialog
        open={true}
        title="Title"
        description="Description"
        setOpen={() => {}}
        onCancel={onCancelMock}
      />
    )
    fireEvent.click(screen.getByText('Cancel'))
    expect(onCancelMock).toHaveBeenCalled()
  })

  test('calls onConfirm when Confirm is clicked', () => {
    const onConfirmMock = jest.fn()
    render(
      <ConfirmDialog
        open={true}
        title="Title"
        description="Description"
        setOpen={() => {}}
        onConfirm={onConfirmMock}
      />
    )
    fireEvent.click(screen.getByText('Confirm'))
    expect(onConfirmMock).toHaveBeenCalled()
  })
})
