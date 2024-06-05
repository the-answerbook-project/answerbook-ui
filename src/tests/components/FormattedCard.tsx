import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'

import FormattedCard from '../../components/FormattedCard'

describe('FormattedCard', () => {
  it('renders correctly with its title', () => {
    render(<FormattedCard title="Context">...</FormattedCard>)

    const headingElement = screen.getByRole('heading', { name: /context/i })
    expect(headingElement).toBeInTheDocument()
  })

  it('renders the correct text passed as a prop', () => {
    const testText = 'Some text'
    render(
      <FormattedCard title="Context">
        <p>{testText}</p>
      </FormattedCard>
    )

    const textElement = screen.getByRole('paragraph')

    expect(textElement).toBeInTheDocument()
    expect(textElement).toHaveTextContent(testText)
  })
})
