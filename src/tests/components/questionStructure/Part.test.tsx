import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'

import Part from '../../../components/questionStructure/Part'

describe('Part', () => {
  const description = 'This is a description'
  const marksContribution = 20

  afterEach(jest.clearAllMocks)

  it('renders correctly with all props', () => {
    render(
      <Part partId={1} description={description} marksContribution={marksContribution}>
        <div data-testid="children">Child Content</div>
      </Part>
    )

    const headingElement = screen.getByRole('heading')
    const descriptionElement = screen.getByTestId('markdown')
    const childContent = screen.getByTestId('children')
    const marksText = screen.getByText(/this part carries 20% of the marks/i)

    expect(headingElement).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()
    expect(childContent).toBeInTheDocument()
    expect(marksText).toBeInTheDocument()
  })

  it('renders without description and marksContribution', () => {
    render(
      <Part partId={1}>
        <div data-testid="children">Child Content</div>
      </Part>
    )

    const headingElement = screen.getByRole('heading')
    const childContent = screen.getByTestId('children')

    expect(headingElement).toBeInTheDocument()
    expect(childContent).toBeInTheDocument()
    expect(screen.queryByText(description)).not.toBeInTheDocument()
    expect(screen.queryByText(/this part carries/i)).not.toBeInTheDocument()
  })
})
