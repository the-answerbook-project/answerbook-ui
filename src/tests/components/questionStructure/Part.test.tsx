import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import Part from '../../../components/questionStructure/Part'

describe('Part', () => {
  const partId = 'a'
  const description = 'This is a description'
  const marksContribution = 20
  const onSaveMock = jest.fn()

  afterEach(jest.clearAllMocks)

  it('renders correctly with all props', () => {
    render(
      <Part
        partId={partId}
        description={description}
        marksContribution={marksContribution}
        onSave={onSaveMock}
      >
        <div data-testid="children">Child Content</div>
      </Part>
    )

    const headingElement = screen.getByRole('heading')
    const saveButton = screen.getByRole('button', { name: /save/i })
    const descriptionElement = screen.getByRole('paragraph')
    const childContent = screen.getByTestId('children')
    const marksText = screen.getByText(/this part carries 20% of the marks/i)

    expect(headingElement).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()
    expect(childContent).toBeInTheDocument()
    expect(marksText).toBeInTheDocument()
  })

  it('renders without description and marksContribution', () => {
    render(
      <Part partId={partId} onSave={onSaveMock}>
        <div data-testid="children">Child Content</div>
      </Part>
    )

    const headingElement = screen.getByRole('heading')
    const saveButton = screen.getByRole('button', { name: /save/i })
    const childContent = screen.getByTestId('children')

    expect(headingElement).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
    expect(childContent).toBeInTheDocument()
    expect(screen.queryByText(description)).not.toBeInTheDocument()
    expect(screen.queryByText(/this part carries/i)).not.toBeInTheDocument()
  })

  it('calls onSave when save button is clicked', () => {
    render(
      <Part partId={partId} onSave={onSaveMock}>
        <div>Child Content</div>
      </Part>
    )

    const saveButton = screen.getByRole('button', { name: /save/i })
    fireEvent.click(saveButton)

    expect(onSaveMock).toHaveBeenCalledTimes(1)
    expect(onSaveMock).toHaveBeenCalledWith(partId)
  })
})
